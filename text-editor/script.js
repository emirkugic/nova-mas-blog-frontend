document.addEventListener("DOMContentLoaded", function() {
    tinymce.init({
        selector: '#editor',
        plugins: 'advlist autolink lists link image charmap print preview anchor',
        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
        height: 400
    });

    document.getElementById('saveButton').addEventListener('click', function() {
        const content = tinymce.get('editor').getContent();
        const blob = new Blob([content], { type: 'text/plain' });
        const anchor = document.createElement('a');
        anchor.download = 'text-editor-content.txt';
        anchor.href = window.URL.createObjectURL(blob);
        anchor.target = '_blank';
        anchor.style.display = 'none'; // Ensure it is not displayed on the UI

        document.body.appendChild(anchor);
        anchor.click();

        // Remove the anchor from the document after clicking
        document.body.removeChild(anchor);
    });
});
