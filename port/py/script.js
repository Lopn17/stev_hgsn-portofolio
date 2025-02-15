document.addEventListener("DOMContentLoaded", () => {
    const copyButton = document.querySelector("#text-container button");
    const codeBlock = document.querySelector("#text-container pre.py");

    copyButton.addEventListener("click", () => {
        // Create a temporary textarea to hold the text
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = codeBlock.textContent.trim(); // Get text from the <pre>
        document.body.appendChild(tempTextArea);

        // Select and copy the text
        tempTextArea.select();
        document.execCommand("copy");

        // Remove the temporary textarea
        document.body.removeChild(tempTextArea);

        // Provide feedback (optional)
        alert("Code copied to clipboard!");
    });
});