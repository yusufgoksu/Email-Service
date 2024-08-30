# Email Automation with Nodemailer

This Node.js script is designed to send an email with an HTML-formatted table and an attached Excel file generated from a JSON data file. The script uses the `nodemailer` package for sending emails and the `xlsx` package for creating Excel files.

## Prerequisites

Before running the script, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Installation

1. **Clone the repository** or download the script files to your local machine.

2. **Navigate to the project directory**:
   ```bash
   cd path/to/your/project
3. **Install the required dependencies**:
   ```bash
     npm install nodemailer xlsx

## Configuration

1. **Update `sendEmail.js` File**

   - Open the `sendEmail.js` file.
   - Update the `auth` section with your Gmail account information:

     ```javascript
     auth: {
       user: 'your-email@gmail.com', // Replace with your Gmail address
       pass: 'your-email-password'    // Replace with your Gmail password or app-specific password
     }
     ```

   - Replace `your-email@gmail.com` with your actual Gmail email address.
   - Replace `your-email-password` with your Gmail password or app-specific password. For better security, use an app-specific password instead of your regular Gmail password. [Learn how to generate an app-specific password](https://support.google.com/accounts/answer/185833?hl=en).

   - Update the `to` field with the recipient's email address:

     ```javascript
     to: 'recipient-email@gmail.com', // Replace with recipient's email address
     ```

   - Replace `recipient-email@gmail.com` with the email address of the recipient.





2. **Ensure `emailData.json` File is Present**

   - Make sure that the `emailData.json` file is in the same directory as your `sendEmail.js` script.
   - This file should contain the JSON data you want to attach to the email.

   Example `emailData.json`:

   ```json
   {
     "key": "value",
     "anotherKey": "anotherValue"
   }

## Usage

To send the email with the attachment, follow these steps:

1. Open a terminal or command prompt.

2. Navigate to the directory where your `sendEmail.js` script is located.

3. Run the script using Node.js with the following command:

   ```bash
   node sendEmail.js

