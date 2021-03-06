class ApplicationController < ActionController::Base
    before_action :configure_permitted_parameters, if: :devise_controller?

    def after_sign_in_path_for(resource)
        request.env['omniauth.origin'] || stored_location_for(resource) || root_path
    end
    
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname, :avatar])
      devise_parameter_sanitizer.permit(:account_update, keys: [:nickname, :avatar])
    end
end
