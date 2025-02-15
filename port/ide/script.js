// Save the code into localStorage when the user types
document.getElementById("htmlCode").addEventListener("input", saveCode);
document.getElementById("cssCode").addEventListener("input", saveCode);
document.getElementById("jsCode").addEventListener("input", saveCode);
// Get the font input and the textarea element
const fontInput = document.getElementById('font');

// Load saved code from localStorage when the page is loaded
window.onload = function() {
    if (localStorage.getItem("htmlCode")) {
        document.getElementById("htmlCode").value = localStorage.getItem("htmlCode");
    }

    if (localStorage.getItem("cssCode")) {
        document.getElementById("cssCode").value = localStorage.getItem("cssCode");
    }

    if (localStorage.getItem("jsCode")) {
        document.getElementById("jsCode").value = localStorage.getItem("jsCode");
    }

    // Automatically run the saved code upon loading
    runCode();
};

// Save the current code to localStorage
function saveCode() {
    localStorage.setItem("htmlCode", document.getElementById("htmlCode").value);
    localStorage.setItem("cssCode", document.getElementById("cssCode").value);
    localStorage.setItem("jsCode", document.getElementById("jsCode").value);
    localStorage.setItem("font", document.getElementById("font").value);
}

function runCode() {
    const htmlCode = document.getElementById("htmlCode").value;
    const cssCode = `<style>${document.getElementById("cssCode").value}</style>`;
    const jsCode = `<script>${document.getElementById("jsCode").value}<\/script>`;
    const output = document.getElementById("outputFrame").contentWindow.document;
    output.open();
    output.write(htmlCode + cssCode + jsCode);
    output.close();
}

document.getElementById("htmlCode").addEventListener("input", runCode);
document.getElementById("cssCode").addEventListener("input", runCode);
document.getElementById("jsCode").addEventListener("input", runCode);

function downloadFile() {
    const htmlCode = document.getElementById("htmlCode").value;
    const cssCode = document.getElementById("cssCode").value;
    const jsCode = document.getElementById("jsCode").value;

    // HTML File
    const htmlBlob = new Blob([htmlCode], { type: "text/html" });
    const cssBlob = new Blob([cssCode], { type: "text/css" });
    const jsBlob = new Blob([jsCode], { type: "text/javascript" });

    // Create download links
    downloadBlob(htmlBlob, 'index.html');
    downloadBlob(cssBlob, 'style.css');
    downloadBlob(jsBlob, 'script.js');
}

function downloadBlob(blob, filename) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Listen for changes in the font input
fontInput.addEventListener('input', function() {
    const selectedFont = font.value;  // Get the input value (font name)
    htmlCode.style.fontFamily = selectedFont;  // Apply the font to the textarea
    cssCode.style.fontFamily = selectedFont;  // Apply the font to the textarea
    jsCode.style.fontFamily = selectedFont;  // Apply the font to the textarea
});
