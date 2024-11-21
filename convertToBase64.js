const fs = require('fs');
const path = require('path');

// Define the path to the PDF file
const pdfPath = './Empty.pdf'; // Adjust this path if your PDF is located elsewhere

try {
    // Check if the file exists
    if (!fs.existsSync(pdfPath)) {
        console.error(`Error: The file "${pdfPath}" does not exist.`);
        process.exit(1); // Exit the process with a non-zero status
    }

    // Check if the file is a PDF
    const fileExtension = path.extname(pdfPath).toLowerCase();
    if (fileExtension !== '.pdf') {
        console.error('Error: The specified file is not a PDF.');
        process.exit(1);
    }

    // Read the file as a binary buffer
    const fileBuffer = fs.readFileSync(pdfPath);

    // Convert the binary buffer to a Base64 string
    const base64String = fileBuffer.toString('base64');

    // Log a preview of the Base64 string
    console.log('Base64 Encoded PDF (length:', base64String.length, '):');
    console.log(base64String.slice(0, 100) + '...'); // Truncate for console display

    // Save the full Base64 string to a file
    const outputPath = 'output_base64.txt';
    fs.writeFileSync(outputPath, base64String);
    console.log(`Base64 string saved to "${outputPath}".`);
} catch (error) {
    console.error('Error processing the PDF file:', error.message);
    process.exit(1); // Exit the process with a non-zero status
}
