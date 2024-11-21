Microservice A - Setup Guide
Overview
This document provides detailed instructions for setting up and running Microservice A, which processes text and extracts content from PDF and Word documents to apply bold formatting based on user-defined preferences.
1. Prerequisites
Before starting, ensure you have the following installed on your system:
1. Node.js:
   - Download and install the latest stable version from Node.js Official Website (https://nodejs.org/).
   - Verify installation:
     ```
     node -v
     ```
     The command should return the installed Node.js version.
2. npm (Node Package Manager):
   - Comes with Node.js. Verify installation:
     ```
     npm -v
     ```
3. Postman or any API testing tool to test the microservice endpoints.
2. Clone the Repository
1. Open a terminal or command prompt.
2. Clone the GitHub repository containing the microservice:
   ```
   git clone https://github.com/your-repo-name.git
   ```
3. Navigate to the project directory:
   ```
   cd microservice-a
   ```
3. Install Required npm Packages
Run the following command to install all the dependencies specified in the package.json file:
```
npm install
```
If you need to install the packages individually, here’s the list of required npm packages and their purpose:
Required npm Packages
**express**:
- Purpose: Sets up the server and endpoints.
- Install Command:
  ```
  npm install express
  ```
**body-parser**:
- Purpose: Parses incoming JSON request bodies.
- Install Command:
  ```
  npm install body-parser
  ```
**axios**:
- Purpose: Makes HTTP requests to download files (PDF/Word) from URLs.
- Install Command:
  ```
  npm install axios
  ```
**pdf-parse**:
- Purpose: Extracts text from PDF files (buffer or Base64).
- Install Command:
  ```
  npm install pdf-parse
  ```
**mammoth**:
- Purpose: Extracts text from Word .docx files.
- Install Command:
  ```
  npm install mammoth
  ```
4. Set Up the Microservice
Starting the Server
1. In the terminal, run the following command:
   ```
   node index.js
   ```
2. You should see the following message:
   ```
   Microservice A is running on http://localhost:3000
   ```
   This confirms the server is running.
Testing the Setup
1. Open Postman or any HTTP client.
2. Send a test request to the `/` endpoint to verify the server is responding:
   - **Method**: GET
   - **URL**: http://localhost:3000/
   - **Expected Response**: Welcome to Microservice A!
5. Testing the Endpoints
Endpoint 1: /processText
- **Description**: Formats plain text with bolding.
- **Method**: POST
- **URL**: http://localhost:3000/processText
- **Body (raw)**:
  ```json
  {
      "text": "This is a sample text.",
      "boldIntensity": "medium",
      "boldAmount": "first_half"
  }
  ```
- **Expected Response**:
  ```json
  {
      "processedText": "<strong>This</strong> is a <strong>sample</strong> text."
  }
  ```
Endpoint 2: /extractFromPDF
1. **Using a PDF URL**:
- **Description**: Extracts text from a PDF via URL.
- **Method**: POST
- **URL**: http://localhost:3000/extractFromPDF
- **Body (raw)**:
  ```json
  {
      "pdfUrl": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      "boldIntensity": "medium",
      "boldAmount": "first_half"
  }
  ```
- **Expected Response**: Text from the PDF, formatted with bolding.
