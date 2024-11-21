const express = require('express');
const bodyParser = require('body-parser');
const pdfParse = require('pdf-parse'); // For PDF text extraction
const axios = require('axios'); // For downloading files from URLs
const mammoth = require('mammoth'); // For Word document processing

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Middleware to log all incoming requests
app.use((req, res, next) => {
    console.log(`Exact URL received: '${req.url}'`);
    console.log(`Request Method: ${req.method}`);
    next();
});

// Helper function to apply bold formatting
function applyBoldFormatting(text, boldIntensity, boldAmount) {
    const words = text.split(' ');
    return words.map(word => {
        if (boldAmount === 'first_half') {
            const splitIndex = Math.ceil(word.length / 2);
            const part1 = `<strong>${word.slice(0, splitIndex)}</strong>`;
            const part2 = word.slice(splitIndex);
            return part1 + part2;
        } else if (boldAmount === 'all') {
            return `<strong>${word}</strong>`;
        }
        return word; // No bold if not specified
    }).join(' ');
}

// Endpoint to process visible text
app.post('/processText', (req, res) => {
    const { text, boldIntensity, boldAmount } = req.body;

    // Validate input
    if (!text || !boldIntensity || !boldAmount) {
        return res.status(400).json({ error: 'Missing required fields: text, boldIntensity, or boldAmount' });
    }

    const validBoldIntensity = ['low', 'medium', 'high'];
    const validBoldAmount = ['first_half', 'all'];

    if (!validBoldIntensity.includes(boldIntensity) || !validBoldAmount.includes(boldAmount)) {
        return res.status(400).json({ error: 'Invalid boldIntensity or boldAmount value.' });
    }

    // Apply bold formatting
    const processedText = applyBoldFormatting(text, boldIntensity, boldAmount);

    // Return the formatted text
    res.json({ processedText });
});

// Endpoint to extract text from PDF
app.post('/extractFromPDF', async (req, res) => {
    const { pdfUrl, pdfData, boldIntensity, boldAmount } = req.body;

    // Validate input
    if (!boldIntensity || !boldAmount || (!pdfUrl && !pdfData)) {
        return res.status(400).json({ error: 'Missing required fields: pdfUrl/pdfData, boldIntensity, or boldAmount' });
    }

    const validBoldIntensity = ['low', 'medium', 'high'];
    const validBoldAmount = ['first_half', 'all'];

    if (!validBoldIntensity.includes(boldIntensity) || !validBoldAmount.includes(boldAmount)) {
        return res.status(400).json({ error: 'Invalid boldIntensity or boldAmount value.' });
    }

    try {
        let pdfBuffer;

        // Handle PDF from URL
        if (pdfUrl) {
            const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
            pdfBuffer = Buffer.from(response.data);
        } 
        // Handle Base64-encoded PDF
        else if (pdfData) {
            pdfBuffer = Buffer.from(pdfData, 'base64');
        }

        // Extract text from PDF
        const pdfContent = await pdfParse(pdfBuffer);
        const text = pdfContent.text;

        // Apply bold formatting
        const processedText = applyBoldFormatting(text, boldIntensity, boldAmount);

        // Return the formatted text
        res.json({ processedText });
    } catch (error) {
        console.error('Error processing PDF:', error.message);
        res.status(500).json({ error: 'Failed to process the PDF file.', details: error.message });
    }
});

// Endpoint to extract text from Word documents
app.post('/extractFromWord', async (req, res) => {
    const { wordData, wordUrl, boldIntensity, boldAmount } = req.body;

    // Validate input
    if (!boldIntensity || !boldAmount || (!wordData && !wordUrl)) {
        return res.status(400).json({ error: 'Missing required fields: wordData/wordUrl, boldIntensity, or boldAmount' });
    }

    // Ensure only one input method is used
    if (wordData && wordUrl) {
        return res.status(400).json({ error: 'Provide only one of wordData or wordUrl, not both.' });
    }

    const validBoldIntensity = ['low', 'medium', 'high'];
    const validBoldAmount = ['first_half', 'all'];

    if (!validBoldIntensity.includes(boldIntensity) || !validBoldAmount.includes(boldAmount)) {
        return res.status(400).json({ error: 'Invalid boldIntensity or boldAmount value.' });
    }

    try {
        let wordBuffer;

        // Handle Word document from URL
        if (wordUrl) {
            const response = await axios.get(wordUrl, { responseType: 'arraybuffer' });
            wordBuffer = Buffer.from(response.data);
        }
        // Handle Base64-encoded Word document
        else if (wordData) {
            wordBuffer = Buffer.from(wordData, 'base64');
        }

        // Extract text from the Word document
        const { value: extractedText } = await mammoth.extractRawText({ buffer: wordBuffer });

        // Apply bold formatting
        const processedText = applyBoldFormatting(extractedText, boldIntensity, boldAmount);

        // Return the formatted text
        res.json({ processedText });
    } catch (error) {
        console.error('Error processing Word document:', error.message);
        res.status(500).json({ error: 'Failed to process the Word document.', details: error.message });
    }
});

// Default GET route for debugging
app.get('/', (req, res) => {
    res.send('Welcome to Microservice A! Use POST endpoints to process text or extract text from PDFs and Word documents.');
});

// Start the server
app.listen(port, () => {
    console.log(`Microservice A is running on http://localhost:${port}`);
});
