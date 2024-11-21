const axios = require('axios');

const baseURL = 'http://localhost:3000';

// Test `/processText` endpoint
async function testProcessText() {
    try {
        const response = await axios.post(`${baseURL}/processText`, {
            text: "This is a sample text.",
            boldIntensity: "medium",
            boldAmount: "first_half",
        });
        console.log("Response from /processText:", response.data);
    } catch (error) {
        console.error("Error testing /processText:", error.response?.data || error.message);
    }
}

// Test `/extractFromPDF` endpoint with URL
async function testExtractFromPDF_URL() {
    try {
        const response = await axios.post(`${baseURL}/extractFromPDF`, {
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            boldIntensity: "high",
            boldAmount: "all",
        });
        console.log("Response from /extractFromPDF with URL:", response.data);
    } catch (error) {
        console.error("Error testing /extractFromPDF with URL:", error.response?.data || error.message);
    }
}

// Test `/extractFromPDF` endpoint with Base64
async function testExtractFromPDF_Base64() {
    const pdfData = "BASE64_ENCODED_PDF_STRING"; // Replace with actual Base64 string
    try {
        const response = await axios.post(`${baseURL}/extractFromPDF`, {
            pdfData,
            boldIntensity: "medium",
            boldAmount: "first_half",
        });
        console.log("Response from /extractFromPDF with Base64:", response.data);
    } catch (error) {
        console.error("Error testing /extractFromPDF with Base64:", error.response?.data || error.message);
    }
}

// Test `/extractFromWord` endpoint with URL
async function testExtractFromWord_URL() {
    try {
        const response = await axios.post(`${baseURL}/extractFromWord`, {
            wordUrl: "https://example.com/sample.docx", // Replace with a real .docx URL
            boldIntensity: "low",
            boldAmount: "first_half",
        });
        console.log("Response from /extractFromWord with URL:", response.data);
    } catch (error) {
        console.error("Error testing /extractFromWord with URL:", error.response?.data || error.message);
    }
}

// Test `/extractFromWord` endpoint with Base64
async function testExtractFromWord_Base64() {
    const wordData = "BASE64_ENCODED_DOCX_STRING"; // Replace with actual Base64 string
    try {
        const response = await axios.post(`${baseURL}/extractFromWord`, {
            wordData,
            boldIntensity: "high",
            boldAmount: "all",
        });
        console.log("Response from /extractFromWord with Base64:", response.data);
    } catch (error) {
        console.error("Error testing /extractFromWord with Base64:", error.response?.data || error.message);
    }
}

// Run all tests
async function runTests() {
    console.log("Starting tests...");
    await testProcessText();
    await testExtractFromPDF_URL();
    await testExtractFromPDF_Base64(); // Ensure Base64 data is available before running this test
    await testExtractFromWord_URL();
    await testExtractFromWord_Base64(); // Ensure Base64 data is available before running this test
    console.log("All tests completed.");
}

runTests();
