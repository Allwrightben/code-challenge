// Initialize Ace Editor
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html");
editor.setFontSize(14);

const initialContent = `<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
    <style>
        body {background: gold}
        
    </style>
</head>
<body>
    <h1>Adding Some Style!</h1>
    <h2>A splash of colour?</h2>
    <h3>Why not make things smaller?</h3>
    <h4>Or bigger?</h4>
    <h5>How about a different font?</h5>
    <h6>Maybe uppercase?</h6>
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

// Hide the "Next" button initially
document.getElementById("nextButton").style.display = "none";

// Check Code Button
document.getElementById('checkButton').addEventListener('click', () => {
    const outputIframe = document.getElementById('outputBox');
    const iframeDocument = outputIframe.contentDocument || outputIframe.contentWindow.document;

    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.innerHTML = ''; // Clear previous feedback

    const errors = [];

    // Check body background color
    const bodyStyle = getComputedStyle(iframeDocument.body).backgroundColor;

    // Normalize 'pink' to its RGB equivalent
    const pinkRGB = 'rgb(255, 192, 203)';

    if (bodyStyle !== pinkRGB) {
        errors.push("The background color of the webpage should be 'pink'.");
    }

    // Check h2 color
    const h2Element = iframeDocument.querySelector('h2');
    const h2Style = getComputedStyle(h2Element).color;
    if (h2Style !== 'rgb(255, 0, 0)') { // 'red' as rgb
        errors.push("The color of the h2 element should be 'red'.");
    }

    // Check h3 font size
    const h3Element = iframeDocument.querySelector('h3');
    const h3Style = getComputedStyle(h3Element).fontSize;
    if (h3Style !== '15px') {
        errors.push("The font size of the h3 element should be '15px'.");
    }

    // Check h4 font size
    const h4Element = iframeDocument.querySelector('h4');
    const h4Style = getComputedStyle(h4Element).fontSize;
    if (h4Style !== '30px') {
        errors.push("The font size of the h4 element should be '30px'.");
    }

    // Check h5 font family
    const h5Element = iframeDocument.querySelector('h5');
    const h5Style = getComputedStyle(h5Element).fontFamily;
    if (!h5Style.toLowerCase().includes('arial')) {
        errors.push("The font family of the h5 element should be 'Arial'.");
    }

    // Check h6 text transform
    const h6Element = iframeDocument.querySelector('h6');
    const h6Style = getComputedStyle(h6Element).textTransform;
    if (h6Style !== 'uppercase') {
        errors.push("The text transform of the h6 element should be 'uppercase'.");
    }

    // Provide feedback to the user
    if (errors.length === 0) {
        document.getElementById('feedback').innerHTML =
            '<div class="alert alert-success" role="alert">That is correct! Well done!</div>';
            document.getElementById("nextButton").style.display = "block";
    } else {
        feedbackDiv.innerHTML = "<div class='text-danger'>" + errors.join('<br>') + "</div>";
    }
});