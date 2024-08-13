// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
document.addEventListener('DOMContentLoaded', function() {
    tinymce.init({
        selector: 'textarea.form-textarea',
        plugins: 'advlist autolink lists link image charmap preview anchor pagebreak searchreplace visualblocks code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor colorpicker textpattern',
        toolbar: 'undo redo | formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image media table code preview fullscreen | help',
        menubar: 'file edit view insert format tools table help',
        content_css: '/path/to/your/custom.css', // Adicione o caminho para seu arquivo CSS personalizado
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'image media',
        file_picker_callback: function (cb, value, meta) {
            if (meta.filetype === 'image') {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.onchange = function () {
                    var file = this.files[0];
                    var reader = new FileReader();
                    reader.onload = function () {
                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                        var base64 = reader.result.split(',')[1];
                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);
                        cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                };
                input.click();
            }
            if (meta.filetype === 'media') {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'video/*');
                input.onchange = function () {
                    var file = this.files[0];
                    var reader = new FileReader();
                    reader.onload = function () {
                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                        var base64 = reader.result.split(',')[1];
                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);
                        cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                };
                input.click();
            }
        }
    });
});
