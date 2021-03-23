function popupResult(result) {
    var html;
    if (result.html) {
        html = result.html;
    }
    if (result.src) {
        html = '<img src="' + result.src + '" />';
    }
    swal({ // not a library that is installed
        title: '',
        html: true,
        text: html,
        allowOutsideClick: true
    });
    setTimeout(function(){
        $('#avatar-crop').css('margin', function() {
            var top = -1 * ($(this).height() / 2),
                left = -1 * ($(this).width() / 2);

            return top + 'px 0 0 ' + left + 'px';
        });
    }, 1);
}

function cropSample() {
    var $tag = $('#avatar-crop');
    $tag.croppie({
        viewport: {
            width: 150,
            height: 200
        },
        boundary: {
            width: 300,
            height: 300
        }
    });

    $tag .croppie('bind', {
        url: '/images/avatar-sample.png',
        points: [77,469,280,739]
    });

    $('#avatar-crop').on('click', function() {
        size = 'viewport';
        $tag.croppie('result', {
            type: 'canvas',
                size: size,
                resultSize: {
                    width: 150,
                    height: 150
                }
        }).then(function (resp) {
            popupResult({
                src: resp
            });
        });
    });
}

// invoke cropSample AFTER page load
document.addEventListener('DOMContentLoaded', () => {
    new cropSample();
  });