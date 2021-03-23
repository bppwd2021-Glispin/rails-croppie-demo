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
    $tag.croppie('destroy');
    $tag.croppie({
        viewport: {
            width: 150,
            height: 200
        },
        boundary: {
            width: 300,
            height: 300
        },
        showZoomer: false
    });
    
    var file = $('#file-upload').get(0).files[0];
    
    if(file){
        var reader = new FileReader();
        
        reader.onload = function(){
            $tag.croppie('bind', {
                url: reader.result
            });
        }

        reader.readAsDataURL(file);
    }
    else{
        $tag.croppie('destroy');
    }
    
    $('#save-crop').on('click', function() {
        size = 'viewport';
        $tag.croppie('result', {
            type: 'blob',
                size: size,
                resultSize: {
                    width: 150,
                    height: 150
                }
        }).then(function (resp) {
            document.getElementById('hidden-upload').value = resp;
            console.log(document.getElementById('hidden-upload').value)
            console.log(document.getElementById('file-upload').value)
        });
    });
}

// invoke cropSample AFTER page load
// document.addEventListener('DOMContentLoaded', () => {
//     new cropSample();
//   });

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('file-upload').onchange = function(){new cropSample();};
  });