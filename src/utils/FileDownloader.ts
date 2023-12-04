import { AxiosResponse } from 'axios';
import axios from '../api/axios'

export const handleFileDownload = async (fileUrl: string): Promise<void> => {
  try {
    // Add your base URL from the .env file
    const baseUrl: string = import.meta.env.VITE_BASE_URL || '';

    // Make a GET request to download the file
    const response: AxiosResponse<Blob> = await axios.get(baseUrl + fileUrl, {
      responseType: 'blob', // Important for binary data like files
    });

    // Extract the original file name from the URL
    const originalFileName: string = fileUrl.split('/').pop() || 'file';

    // Create a link element to trigger the download
    const url: string = window.URL.createObjectURL(response.data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.setAttribute('download', originalFileName);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};