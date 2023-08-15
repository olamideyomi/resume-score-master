// services/fileParser.js

import { getDocument } from 'pdfjs-dist';
import mammoth from 'mammoth';

export const parsePDFFile = async (file) => {
  try {
    const fileReader = new FileReader();
    const promise = new Promise((resolve, reject) => {
      fileReader.onload = async (event) => {
        const pdfData = event.target.result;
        const pdf = await getDocument({ data: pdfData }).promise;
        let resumeText = '';

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          resumeText += textContent.items.map(item => item.str).join(' ') + ' ';
        }

        resolve(resumeText.trim());
      };

      fileReader.onerror = () => {
        reject(new Error('Error reading file.'));
      };
    });
    
    fileReader.readAsArrayBuffer(file);
    
    return promise;
  } catch (error) {
    throw error;
  }
};

export const parseWordFile = async (file) => {
  try {
    const fileReader = new FileReader();
    const promise = new Promise((resolve, reject) => {
      fileReader.onload = async (event) => {
        const docxData = event.target.result;
        const convertResult = await mammoth.convertToPlainText({ arrayBuffer: docxData });

        resolve(convertResult.value);
      };

      fileReader.onerror = () => {
        reject(new Error('Error reading file.'));
      };
    });

    fileReader.readAsArrayBuffer(file);

    return promise;
  } catch (error) {
    throw error;
  }
};

export const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) {
    throw new Error('No file selected.');
  }

  let fileContent;

  if (file.type === 'application/pdf') {
    fileContent = await parsePDFFile(file);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    fileContent = await parseWordFile(file);
  } else {
    throw new Error('Invalid file type. Please upload a PDF or Word document.');
  }

  return fileContent;
};
