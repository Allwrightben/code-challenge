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
        h1 {text-align: center; text-transform: uppercase}
    </style>
</head>

<body>

    <h1>The Emergence of Artificial Intelligence</h1>

    <h2>1. The Rise of AI</h2>
    <p>
        Artificial intelligence has rapidly evolved, transforming industries and redefining the way we interact with
        technology. From early rule-based systems to modern deep learning models, AI continues to push the boundaries of
        innovation.
    </p>

    <h2>2. AI in Everyday Life</h2>
    <p>
        From voice assistants like Siri and Alexa to personalized recommendations on streaming platforms, AI has
        seamlessly integrated into our daily routines, making life more convenient and efficient.
    </p>

    <h2>3. The Power of Machine Learning</h2>
    <p>
        Machine learning, a subset of AI, allows computers to learn from data and improve over time without explicit
        programming. This capability powers applications such as fraud detection, language translation, and autonomous
        vehicles.
    </p>

    <h2>4. Ethical Concerns and the Future</h2>
    <p>
        As AI grows more powerful, ethical considerations become crucial. Issues like data privacy, bias in algorithms,
        and the impact on jobs require careful thought to ensure AI benefits society as a whole. Not to mention the
        potential for AI to be used in harmful ways, such as surveillance or autonomous weapons. And then there is the 
        question of whether AI will ever be able to think and feel like humans do, and the ethical ramification of
        AI living in servitude to humans. 
    </p>

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

document.getElementById("checkButton").addEventListener("click", () => {
    const iframe = document.getElementById("outputBox");
    const doc = iframe.contentDocument || iframe.contentWindow.document; // ⬅️ Move it here
    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.innerHTML = "";

    const errors = [];

    try {
        // Use a short timeout to ensure styles are applied before checking
        setTimeout(() => {
            const h2s = doc.querySelectorAll("h2");
            if (h2s.length !== 4) {
                errors.push("There should be exactly four &lt;h2&gt elements.");
            }

            // Check first 2 are red
            const firstTwoRed = Array.from(h2s).slice(0, 2).every(el => {
                const style = getComputedStyle(el).color;
                console.log("Red check:", style);
                return style === "rgb(255, 0, 0)";
            });

            if (!firstTwoRed) {
                errors.push("The first two &lt;h2&gt elements should have red text using the 'textred' class.");
            }

            // Check last 2 are blue
            const lastTwoBlue = Array.from(h2s).slice(2).every(el => {
                const style = getComputedStyle(el).color;
                console.log("Blue check:", style);
                return style === "rgb(0, 0, 255)";
            });

            if (!lastTwoBlue) {
                errors.push("The last two &lt;h2&gt elements should have blue text using the 'textblue' class.");
            }

            // Final feedback
            if (errors.length === 0) {
                feedbackDiv.innerHTML = `<div class="alert alert-success" role="alert">Great job! You've completed the challenge!</div>`;
                document.getElementById("nextButton").style.display = "block";
            } else {
                feedbackDiv.innerHTML = `<div class="alert alert-danger" role="alert">${errors.join("<br>")}</div>`;
            }
        }, 300);
    } catch (err) {
        console.error("Error checking code:", err);
        feedbackDiv.innerHTML = `<div class="alert alert-danger" role="alert">Something went wrong while checking your code.</div>`;
    }
});