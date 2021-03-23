class User < ApplicationRecord

  has_one_attached :avatar
  validate :acceptable_avatar
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def acceptable_avatar
    # is it attached?
    return unless avatar.attached?

    # Validate File Size
    unless avatar.byte_size <= 1.megabyte
      errors.add(:avatar, "is too big")
    end

    # Validate File Extension
    acceptable_types = ["image/jpeg", "image/png"]
    unless acceptable_types.include?(avatar.content_type)
      errors.add(:avatar, "must be a JPEGG or PNG File")
    end

  end 
  
end
