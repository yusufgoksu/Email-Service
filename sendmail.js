const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx'); 

// JSON dosyasının yolunu belirleyin
const dataPath = path.join(__dirname, 'emailData.json');

// JSON dosyasını oku
const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// HTML tablosunu oluştur
const generateHtmlTable = (data) => {
  if (data.length === 0) return '';

  // Tablo başlıklarını al
  const headers = Object.keys(data[0]);

  let html = `
    <h1 style="color: #4CAF50; font-family: Arial, sans-serif;">Unlimitedbiking API Automation Test Results</h1>
    <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
      <thead>
        <tr style="background-color: #f2f2f2;">
  `;

  headers.forEach(header => {
    html += `<th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${header.charAt(0).toUpperCase() + header.slice(1)}</th>`;
  });

  html += `</tr></thead><tbody>`;

  data.forEach((item, index) => {
    html += `<tr style="background-color: ${index % 2 === 0 ? '#f9f9f9' : '#ffffff'};">`;
    headers.forEach(header => {
      html += `<td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item[header] || 'N/A'}</td>`;
    });
    html += `</tr>`;
  });

  html += `</tbody></table>`;

  return html;
};

// Excel dosyasını oluştur
const generateExcelFile = (data) => {
  const workSheet = xlsx.utils.json_to_sheet(data);
  const workBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workBook, workSheet, 'TestResults');
  
  // Excel dosyasını kaydet
  const excelPath = path.join(__dirname, 'TestResults.xlsx');
  xlsx.writeFile(workBook, excelPath);

  return excelPath;
};

// Excel dosyasını oluştur ve kaydet
const excelFilePath = generateExcelFile(jsonData);

// Bir transporter oluştur
const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail e-posta servisi
  auth: {
    user: 'your mail here',
    pass: 'password here ' 
  }
});

// E-posta seçeneklerini ayarla
const mailOptions = {
  from: '',
  to: '', 
  subject: '',
  html: generateHtmlTable(jsonData), // HTML tablosunu e-posta gövdesine ekleyin
  attachments: [
    {
      filename: 'TestResults.xlsx',
      path: excelFilePath,
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  ]
};

// E-postayı gönder
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log('Hata oluştu:', error);
  } else {
    console.log('E-posta gönderildi: ' + info.response);
  }
});
module.exports = sendmail;


