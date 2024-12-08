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
    <h1></h1>
    <p></p>
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
document.getElementById("checkButton").addEventListener("click", () => {
    const userCode = editor.getValue();
    let feedback = "";

    // Check for the required content
    if (userCode.includes("<h1>Hello, World!</h1>") && userCode.includes("<p>This is my first webpage</p>")) {
        feedback = `<div class="alert alert-success" role="alert">Great job! You've completed the challenge! move on to the next one.</div>`;
    } else {
        feedback = `<div class="alert alert-danger" role="alert">Hmm, something's not right. Remember to write the correct text in the h1 and p elements.</div>`;
    }

    document.getElementById("feedback").innerHTML = feedback;
});