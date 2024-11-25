
$(document).ready(function() {
    var $codeTextarea = $('#code');
    var $outputIframe = $('#output');

    $codeTextarea.on('input', function() {
        var htmlCode = $(this).val();
        updateIframeContent(htmlCode);
    });

    function updateIframeContent(htmlCode) {
        $outputIframe.attr('src', 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlCode));
    }
});