// Function to execute commands like bold, underline, center-align, etc.
function execCmd(command, value = null) {
    document.execCommand(command, false, value);
}

// Custom function to clear all formatting
function clearFormatting() {
    // Remove basic text formatting like bold, italic, underline, etc.
    document.execCommand('removeFormat', false, null);

    // Reset alignment to default (left)
    document.execCommand('justifyLeft', false, null);

    // Convert all headings (h1, h2, etc.) back to normal text (paragraph)
    document.execCommand('formatBlock', false, 'div');

    // Remove lists and indentation
    document.execCommand('outdent', false, null);

    // Loop through and remove all custom styles like lists
    const editor = document.getElementById('editor');
    editor.innerHTML = editor.innerHTML.replace(/<ul.*?>.*?<\/ul>/g, '');  // Remove unordered lists
    editor.innerHTML = editor.innerHTML.replace(/<ol.*?>.*?<\/ol>/g, '');  // Remove ordered lists

    // Additional cleanup for inline styles (optional)
    clearInlineStyles();
}

function indent() {
    document.execCommand('indent', false, null);
}

// Function to wrap the selected text in a paragraph and apply CSS indent
function p() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.extractContents();

    // Create a new paragraph and apply the extracted content
    const p = document.createElement('p');
    p.appendChild(selectedText);

    // Insert the paragraph into the document at the selection point
    range.insertNode(p);

    // Clear the selection after applying
    selection.removeAllRanges();
}

// Optional function to remove inline styles
function clearInlineStyles() {
    const editor = document.getElementById('editor');
    const elements = editor.querySelectorAll('*');  // Select all elements within the editor

    elements.forEach((el) => {
        el.removeAttribute('style');  // Remove inline styles from each element
    });
}

// Function to add tab indentation by inserting non-breaking spaces
function addTabIndent() {
    const tabSpace = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; // Five non-breaking spaces
    document.execCommand('insertHTML', false, tabSpace);
}

// Add event listener to capture the Tab key press inside the editor
document.getElementById('editor').addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
        event.preventDefault();  // Prevent default Tab key behavior (changing focus)
        addTabIndent();  // Execute the tab indent function
    }
});

// Save document as a .doc file
function saveDoc() {
    const editorContent = document.getElementById('editor').innerHTML;
    const fileTitle = document.getElementById('fileTitle').value.trim() || "Untitled";

    const preHtml = "<html><head><meta charset='utf-8'></head><body>";
    const postHtml = "</body></html>";
    const htmlContent = preHtml + editorContent + postHtml;

    // Create a Blob with the document content
    const blob = new Blob([htmlContent], { type: "application/msword" });

    // Create a download link and trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileTitle + ".doc";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Save document as a .pdf file
function savePdf() {
    const editor = document.getElementById('editor'); // Get the editor element & Select the content to convert
    const originalBorderColor = editor.style.borderColor; // Save the original border color

    // Temporarily change the border color to white
    editor.style.borderColor = '#ffffff';
    const fileTitle = document.getElementById('fileTitle').value.trim() || "Untitled"; // Get the file title
    const opt = {
        margin:       0.5,        // Margins for the PDF
        filename:     fileTitle + '.pdf', // Default filename
        image:        { type: 'jpeg', quality: 0.98 }, // Image quality
        html2canvas:  { scale: 2 },  // Canvas resolution
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' } // PDF format settings
    };

    // Use the html2pdf library to generate and download the PDF
        // then(()) function used to say, after save then set back style to original.
    html2pdf().from(editor).set(opt).save().then(() => {
        // After the PDF is saved, restore the original border color
        editor.style.borderColor = originalBorderColor;
    });
}

// Save document as a .txt file
function saveTxt() {
    const editorContent = document.getElementById('editor').innerText; // Get plain text content
    const fileTitle = document.getElementById('fileTitle').value.trim() || "Untitled";
    // Create a Blob with the text content
    const blob = new Blob([editorContent], { type: "text/plain" });
    // Create a download link and trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileTitle + ".txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Function to capitalize the first letter of each word (Capitalize case)
function capitalizeText(text) {
    return text.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

// Function to convert text to Sentence Case (first letter capitalized)
function toSentenceCase(text) {
return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Function to apply the selected capitalization style to the selected text in the editor
function applyCapitalization() {
    const selectedOption = document.getElementById('capitalizeOptions').value;

    // Get the selected text
    const selection = window.getSelection();
    if (!selection.rangeCount) return; // If no selection, return early

    const range = selection.getRangeAt(0); // Get the selected range
    const selectedText = range.toString(); // Get the selected text

    if (selectedText.length === 0) {
        alert("Please select some text first.");
        return;
    }

    // Apply the selected capitalization style to the selected text
    let modifiedText = selectedText;
    switch (selectedOption) {
        case 'uppercase':
            modifiedText = selectedText.toUpperCase(); // Uppercase all letters
            break;
        case 'lowercase':
            modifiedText = selectedText.toLowerCase(); // Lowercase all letters
            break;
        case 'sentencecase':
            modifiedText = toSentenceCase(selectedText); // Sentence case
            break;
        case 'capitalize':
            modifiedText = capitalizeText(selectedText); // Capitalize case (first letter of each word)
            break;
        default:
            return;
    }

    // Replace the selected text with the modified text
    range.deleteContents(); // Remove the old selected text
            range.insertNode(document.createTextNode(modifiedText)); // Insert the modified text

    // Clear the selection after the change
    selection.removeAllRanges();
}

// Save both editor content and title to localStorage periodically
function saveToLocalStorage() {
    const editorContent = document.getElementById('editor').innerHTML;
    const fileTitle = document.getElementById('fileTitle').value.trim();
    
    localStorage.setItem('editorContent', editorContent);  // Store the editor content
    localStorage.setItem('fileTitle', fileTitle);  // Store the title
}

// Load both editor content and title from localStorage when the page is loaded
function loadFromLocalStorage() {
    const savedContent = localStorage.getItem('editorContent');
    const savedTitle = localStorage.getItem('fileTitle');
    
    if (savedContent) {
        document.getElementById('editor').innerHTML = savedContent;  // Load saved content into editor
    }
    
    if (savedTitle) {
        document.getElementById('fileTitle').value = savedTitle;  // Load saved title into title input
    }
}

// Function to add keyboard shortcuts
document.addEventListener('keydown', function (event) {
    // Detect if Ctrl key (or Cmd key on Mac) is pressed
    if (event.ctrlKey || event.metaKey) {
        // Bold: Ctrl + B
        if (event.key.toLowerCase() === 'b') {
            event.preventDefault(); // Prevent the default browser action
            document.execCommand('bold', false, null); // Execute bold formatting
        }
        // Italic: Ctrl + I
        if (event.key.toLowerCase() === 'i') {
            event.preventDefault(); // Prevent the default browser action
            document.execCommand('italic', false, null); // Execute italic formatting
        }
        // Indent: Ctrl + Q
        if (event.key.toLowerCase() === 'q') {
            event.preventDefault(); // Prevent the default browser action
            document.execCommand('indent', false, null); // Execute indent formatting
        }
    }

    // Center Align: Ctrl + Shift + E
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'e') {
        event.preventDefault(); // Prevent the default browser action
        document.execCommand('justifyCenter', false, null); // Execute center alignment
    }

    // Center Align: Ctrl + Shift + L
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'l') {
        event.preventDefault(); // Prevent the default browser action
        document.execCommand('justifyLeft', false, null); // Execute center alignment
    }

    // Center Align: Ctrl + Shift + R
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'r') {
        event.preventDefault(); // Prevent the default browser action
        document.execCommand('justifyRight', false, null); // Execute center alignment
    }

    // Clear Formatting: Ctrl + Shift + C
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'c') {
        event.preventDefault(); // Prevent the default browser action
        clearFormatting(); // Call your custom clearFormatting function
    }

});

// Function to apply alignment based on selected option
        function applyAlignment() {
            const selectedOption = document.getElementById('alignOptions').value;

            switch (selectedOption) {
                case 'left':
                    document.execCommand('justifyLeft', false, null);
                    break;
                case 'center':
                    document.execCommand('justifyCenter', false, null);
                    break;
                case 'right':
                    document.execCommand('justifyRight', false, null);
                    break;
                default:
                    break;
            }
        }

function outdent() {
    // Execute the default outdent command for lists and block elements
    document.execCommand('outdent', false, null);

    // Get the current selection
    const selection = window.getSelection();
    if (!selection.rangeCount) return; // If no selection, exit

    const range = selection.getRangeAt(0); // Get the selected range
    const commonAncestor = range.commonAncestorContainer;

    // Check if the selected text is inside a paragraph
    const parentElement = (commonAncestor.nodeType === Node.ELEMENT_NODE) 
                            ? commonAncestor 
                            : commonAncestor.parentElement;

    if (parentElement.tagName === 'P') {
        // Remove the text-indent style from the paragraph without affecting other styles
        parentElement.style.textIndent = '0'; 
    }

}

// Event listener to save content and title when typing or editing
document.getElementById('editor').addEventListener('input', saveToLocalStorage);
document.getElementById('fileTitle').addEventListener('input', saveToLocalStorage);

// Load content and title when the page loads
window.onload = loadFromLocalStorage;

// Save content and title when the user closes the tab or refreshes the page
window.onbeforeunload = saveToLocalStorage;
