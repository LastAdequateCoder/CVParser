import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Adjust the base URL as needed

export const uploadCV = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error uploading CV: ' + error.message);
    }
};

export const getParsedCV = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cv/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching parsed CV: ' + error.message);
    }
};