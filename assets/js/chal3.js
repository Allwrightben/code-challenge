// Initialize Ace Editor
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html");
editor.setFontSize(14);

const initialContent = `<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
</head>
<body>
    <h2>Boldly Go, With Emphasis!</h2>
    

</body>
</html>`;

// Load the initial content into the editor
editor.setValue(initialContent, -1);

// Run Code Button
document.getElementById("runButton").addEventListener("click", () => {
    let userCode = editor.getValue(); // Get user code from the editor

    // Inject the user's code into the iframe
    const outputIframe = document.getElementById("outputBox");
    const iframeDocument = outputIframe.contentDocument || outputIframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(userCode);
    iframeDocument.close();
});

// Check Code Button
document.getElementById('checkButton').addEventListener('click', () => {
    const outputIframe = document.getElementById('outputBox');
    const iframeDocument = outputIframe.contentDocument || outputIframe.contentWindow.document;

    const pElements = iframeDocument.querySelectorAll('p');

    if (pElements.length === 2) {
        const firstP = pElements[0];
        const secondP = pElements[1];

        // Check the first paragraph
        const emElement = firstP.querySelector('em');
        const isFirstPCorrect =
            firstP.textContent === 'The quick brown fox jumps over the lazy dog' &&
            emElement &&
            emElement.textContent === 'quick';

        // Check the second paragraph
        const strongElement = secondP.querySelector('strong');
        const isSecondPCorrect =
            secondP.textContent === 'Please remember to bring your laptop tomorrow' &&
            strongElement &&
            strongElement.textContent === 'laptop';

        if (isFirstPCorrect && isSecondPCorrect) {
            document.getElementById('feedback').innerHTML =
                '<div class="alert alert-success" role="alert">Well done! you got it right! move on to the next one.</div>';
        } else {
            document.getElementById('feedback').innerHTML =
                '<div class="alert alert-danger" role="alert">Oops! Your code is incorrect. Please try again.</div>';
        }
    } else {
        document.getElementById('feedback').innerHTML =
            '<div class="alert alert-danger" role="alert">Make sure you have exactly two <code>&lt;p&gt;</code> elements!</div>';
    }
});