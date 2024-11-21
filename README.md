# Microservice A - Text Formatting and Document Processing

## **Overview**
This microservice processes text and extracts content from PDF and Word documents to apply bold formatting based on user-defined preferences. It is designed to help users with ADHD or Autism improve readability.

The service includes three endpoints:
1. `/processText` - Format visible text with bolding.
2. `/extractFromPDF` - Extract and format text from PDFs.
3. `/extractFromWord` - Extract and format text from Word documents.

---

## **How to Use the Microservice**

### **General Information**
- **Base URL**: `http://localhost:3000`
- **Content-Type**: `application/json`
- Use **Postman** or any HTTP client to send `POST` requests.

---

### **1. `/processText`**

#### **Description**
Processes plain text to apply bold formatting.

#### **Request**
- **Method**: `POST`
- **Endpoint**: `/processText`
- **Body**:
  ```json
  {
      "text": "This is a sample text.",
      "boldIntensity": "medium",
      "boldAmount": "first_half"
  }

Fields:
text (string, required): The text to be formatted.
boldIntensity (string, required): The intensity of bold formatting ("low", "medium", "high").
boldAmount (string, required): The portion of the word to bold ("first_half", "all").

Response:
{
    "processedText": "<strong>This</strong> is a <strong>sample</strong> text."
}

Example Postman Configuration:
Method: POST
URL: http://localhost:3000/processText
Headers:
Content-Type: application/json

Body (raw):
{
    "text": "This is a sample text.",
    "boldIntensity": "medium",
    "boldAmount": "first_half"
}

2. /extractFromPDF
Description
Extracts and formats text from a PDF file.

Request
Method: POST
Endpoint: /extractFromPDF

Body (Base64 Input)
{
    "pdfData": "BASE64_ENCODED_PDF_STRING",
    "boldIntensity": "high",
    "boldAmount": "all"
}

Body (URL Input)
{
    "pdfUrl": "https://example.com/sample.pdf",
    "boldIntensity": "medium",
    "boldAmount": "first_half"
}

Fields:
pdfData (string, optional): The Base64-encoded PDF file.
pdfUrl (string, optional): A URL pointing to the PDF file.
boldIntensity (string, required): The intensity of bold formatting ("low", "medium", "high").
boldAmount (string, required): The portion of the word to bold ("first_half", "all").

Response

Format:
{
    "processedText": "<strong>This</strong> is a <strong>sample</strong> document."
}

Example Postman Configuration:
Method: POST
URL: http://localhost:3000/extractFromPDF
Headers:
Content-Type: application/json
Body (raw) (for Base64 input)

{
    "pdfData": "BASE64_ENCODED_PDF_STRING",
    "boldIntensity": "high",
    "boldAmount": "all"
}

Body (raw) (for URL input):
{
    "pdfUrl": "https://example.com/sample.pdf",
    "boldIntensity": "medium",
    "boldAmount": "first_half"
}

3. /extractFromWord
Description
Extracts and formats text from Word documents (.docx files).

Request
Method: POST
Endpoint: /extractFromWord

Body (Base64 Input):
{
    "wordData": "BASE64_ENCODED_DOCX_STRING",
    "boldIntensity": "medium",
    "boldAmount": "first_half"
}

Body (URL Input):
{
    "wordUrl": "https://example.com/sample.docx",
    "boldIntensity": "high",
    "boldAmount": "all"
}
Fields:
wordData (string, optional): The Base64-encoded .docx file.
wordUrl (string, optional): A URL pointing to the .docx file.
boldIntensity (string, required): The intensity of bold formatting ("low", "medium", "high").
boldAmount (string, required): The portion of the word to bold ("first_half", "all").

Response
Format:
{
    "processedText": "<strong>This</strong> is a <strong>Word</strong> document."
}

Example Postman Configuration:
Method: POST
URL: http://localhost:3000/extractFromWord
Headers:
Content-Type: application/json
Body (raw) (for Base64 input):

{
    "wordData": "BASE64_ENCODED_DOCX_STRING",
    "boldIntensity": "medium",
    "boldAmount": "first_half"
}
Body (raw) (for URL input):
{
    "wordUrl": "https://example.com/sample.docx",
    "boldIntensity": "high",
    "boldAmount": "all"
}

Error Handling
Missing Fields
Response:
{
    "error": "Missing required fields: text/pdfData/pdfUrl/wordData/wordUrl, boldIntensity, or boldAmount."
}
Invalid File
Response:
{
    "error": "Failed to process the file.",
    "details": "Invalid file format."
}

## Test Script
A test script (`test_microservice.js`) is included to demonstrate the functionality of the microservice. This script:
- Tests all endpoints (`/processText`, `/extractFromPDF`, `/extractFromWord`).
- Logs the responses for validation.

### How to Use:
1. Ensure the microservice is running (`node index.js`).
2. Run the test script using:
   ```bash
   node test_microservice.js


## **Mitigation Plan**

### **1. For Which Teammate Did You Implement “Microservice A”?**
This microservice was implemented for **Samuel Jamieson**. The microservice handles text formatting to improve readability and includes endpoints for processing plain text, PDF files, and Word documents.

---

### **2. What Is the Current Status of the Microservice?**
- **Status**: The microservice is fully implemented and tested.
- **Tested Endpoints**:
  1. `/processText`: Formats plain text with bolding preferences.
  2. `/extractFromPDF`: Extracts and formats text from PDF files (via Base64 or URL).
  3. `/extractFromWord`: Extracts and formats text from Word documents (via Base64 or URL).
- The microservice is ready for integration.

---

### **3. If the Microservice Isn’t Done, Which Parts Aren’t Done and When Will They Be Done?**
- **Completion**: The microservice is fully functional; no parts are pending.
- **Testing Status**: All endpoints have been tested using Postman and a custom test script (`test_microservice.js`).

---

### **4. How Is Your Teammate Going to Access Your Microservice?**
#### **Access Options**:
1. **From GitHub**:
   - Clone the repository using the following link: [GitHub Repository](https://github.com/mara218/microservice-a). 
   - Ensure Node.js and npm are installed locally.

2. **Run Locally**:
   - **Instructions**:
     1. Clone the repository from GitHub.
     2. Install dependencies:
        ```bash
        npm install
        ```
     3. Start the server:
        ```bash
        node index.js
        ```
     4. Use the base URL `http://localhost:3000` to make API calls.


#### **Testing**:
- Use the test script (`test_microservice.js`) provided in the repository or test the endpoints via Postman.

---

### **5. If Your Teammate Cannot Access/Call Your Microservice, What Should They Do?**
#### **Steps to Take**:
1. **Ensure Setup**:
   - Verify that the microservice is running locally by checking the logs for the message:
     ```
     Microservice A is running on http://localhost:3000
     ```
   - Confirm that the required dependencies (e.g., Node.js) are installed.

2. **Check Requests**:
   - Ensure that API requests are formatted correctly (refer to the `README.md` for examples).
   - Test the microservice using Postman or the provided `test_microservice.js` script.

3. **Contact Me for Help**:
   - If issues persist, Samuel can contact me via:
     - **Email**: hashmia@oregonstate.edu
     
   - **Availability**:
     - Tues to Thurs: 10 AM – 2 PM.
     - Weekends: Available for urgent issues via email.

---

### **6. If Your Teammate Cannot Access/Call Your Microservice, By When Do They Need to Tell You?**
- **Deadline for Reporting Issues**: Samuel must report any access or functionality issues by November 30, 2024.
- **Why This Deadline?**
  - This allows sufficient time to debug and resolve issues before the final project submission or integration deadline.

---

### **7. Is There Anything Else Your Teammate Needs to Know?**
#### **Additional Notes**:
1. **Assumptions**:
   - It is assumed that Samuel has basic familiarity with API testing tools (e.g., Postman) or is willing to use the `test_microservice.js` script.
   - Samuel will set up the microservice locally unless a hosted version is explicitly provided.

2. **Known Issues**:
   - Scanned PDFs may not extract text correctly unless OCR is applied (not implemented in this microservice).
   - Ensure that provided URLs are publicly accessible and correctly formatted.

3. **Backup Plan**:
   - If Samuel encounters issues and I am unavailable, detailed usage instructions in the `README.md` and test cases in `test_microservice.js` should serve as a fallback.
   - As a last resort, Samuel can provide sample input files, and I can process them manually and return results.

---

## **Summary**
This mitigation plan ensures that Samuel Jamieson has clear instructions for accessing, testing, and using Microservice A. It provides detailed fallback steps and points of contact to handle integration issues efficiently.