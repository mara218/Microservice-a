const fs = require('fs');
const path = require('path');

// Path to your Word document
const docxPath = './Sample1.docx'; // Update this to match your file name and location

try {
    // Check if the file exists
    if (!fs.existsSync(docxPath)) {
        console.error(`Error: The file "${docxPath}" does not exist.`);
        process.exit(1);
    }

    // Validate the file extension
    const fileExtension = path.extname(docxPath).toLowerCase();
    if (fileExtension !== '.docx') {
        console.error('Error: The specified file is not a .docx file.');
        process.exit(1);
    }

    // Read the file and convert to Base64
    const fileBuffer = fs.readFileSync(docxPath);
    const base64String = fileBuffer.toString('base64');

    // Save the Base64 string to a file for testing
    fs.writeFileSync('output_word_base64.txt', base64String);
    console.log(`Base64 string saved to "output_word_base64.txt".`);

    // Optionally log the first 100 characters for confirmation
    console.log('Base64 Encoded Word Document (preview):', base64String.slice(0, 100) + '...');
} catch (error) {
    console.error('Error converting Word document to Base64:', error.message);
}
