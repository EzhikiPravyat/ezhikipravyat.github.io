document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('input-text');
    const outputDisplay = document.getElementById('output-display');
    const formatRadios = document.querySelectorAll('input[name="format"]');
    
    let currentFormat = 'json'; // Default format
    
    // Function to format and display the output12
    function updateOutput() {
        const text = inputText.value.trim();
        if (!text) {
            outputDisplay.textContent = '';
            return;
        }
        
        try {
            if (currentFormat === 'json') {
                // Parse and stringify JSON to format it
                const parsedJson = JSON.parse(text);
                const formattedJson = JSON.stringify(parsedJson, null, 4);
                outputDisplay.textContent = formattedJson;
                outputDisplay.className = 'hljs language-json';
            } else { // XML format
                // For XML, we'll use a simple formatting approach
                const formattedXml = formatXML(text);
                outputDisplay.textContent = formattedXml;
                outputDisplay.className = 'hljs language-xml';
            }
            
            // Apply syntax highlighting
            hljs.highlightElement(outputDisplay);
        } catch (error) {
            outputDisplay.textContent = `Error: ${error.message}`;
            outputDisplay.className = 'hljs';
        }
    }
    
    // Function to format XML
    function formatXML(xml) {
        // Check if it's already formatted
        if (xml.includes('\n')) return xml;
        
        try {
            // Simple XML formatter
            let formatted = '';
            let indent = 0;
            let inTag = false;
            let inContent = false;
            let inQuotes = false;
            let tagContent = '';
            
            for (let i = 0; i < xml.length; i++) {
                const char = xml.charAt(i);
                
                // Handle quotes
                if (char === '"' && xml.charAt(i-1) !== '\\') {
                    inQuotes = !inQuotes;
                }
                
                if (inQuotes) {
                    formatted += char;
                    continue;
                }
                
                // Handle tags and content
                if (char === '<' && !inTag) {
                    // Starting a new tag
                    if (tagContent.trim()) {
                        formatted += tagContent.trim();
                    }
                    tagContent = '';
                    
                    // Check if it's a closing tag
                    if (xml.charAt(i+1) === '/') {
                        indent--;
                        formatted += '\n' + ' '.repeat(indent * 4);
                    } else if (xml.charAt(i+1) !== '!' && xml.charAt(i+1) !== '?') {
                        formatted += '\n' + ' '.repeat(indent * 4);
                        // Only increase indent for normal opening tags
                        if (xml.charAt(i+1) !== '/' && xml.substr(i+1, 4) !== '!--') {
                            indent++;
                        }
                    }
                    
                    inTag = true;
                    inContent = false;
                    formatted += char;
                } else if (char === '>' && inTag) {
                    // Ending a tag
                    inTag = false;
                    formatted += char;
                    
                    // Check if it's a self-closing tag
                    if (xml.charAt(i-1) === '/' || xml.charAt(i-1) === '?') {
                        // Self-closing tag, don't increase indent
                    } else {
                        inContent = true;
                    }
                } else if (inTag) {
                    // Inside a tag
                    formatted += char;
                } else if (inContent) {
                    // Collecting content between tags
                    tagContent += char;
                } else {
                    formatted += char;
                }
            }
            
            return formatted;
        } catch (e) {
            // If formatting fails, return the original XML
            return xml;
        }
    }
    
    // Listen for input changes
    inputText.addEventListener('input', updateOutput);
    
    // Listen for format changes
    formatRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            currentFormat = this.value;
            updateOutput();
        });
    });
    
    // Initial update
    updateOutput();
});