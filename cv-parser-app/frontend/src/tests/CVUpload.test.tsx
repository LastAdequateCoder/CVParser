import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CVUpload from '../components/CVUpload';
import * as api from '../services/api';

jest.mock('../services/api');

describe('CVUpload Component', () => {
    test('renders upload input', () => {
        render(<CVUpload />);
        const uploadInput = screen.getByLabelText(/upload cv/i);
        expect(uploadInput).toBeInTheDocument();
    });

    test('calls upload function on file upload', async () => {
        const mockFile = new File(['dummy content'], 'dummy.cv', { type: 'application/pdf' });
        const uploadInput = screen.getByLabelText(/upload cv/i);
        
        api.uploadCV.mockResolvedValueOnce({ success: true });

        render(<CVUpload />);
        fireEvent.change(uploadInput, { target: { files: [mockFile] } });

        const uploadButton = screen.getByRole('button', { name: /upload/i });
        fireEvent.click(uploadButton);

        expect(api.uploadCV).toHaveBeenCalledWith(mockFile);
    });

    test('displays success message on successful upload', async () => {
        const mockFile = new File(['dummy content'], 'dummy.cv', { type: 'application/pdf' });
        const uploadInput = screen.getByLabelText(/upload cv/i);
        
        api.uploadCV.mockResolvedValueOnce({ success: true });

        render(<CVUpload />);
        fireEvent.change(uploadInput, { target: { files: [mockFile] } });

        const uploadButton = screen.getByRole('button', { name: /upload/i });
        fireEvent.click(uploadButton);

        const successMessage = await screen.findByText(/upload successful/i);
        expect(successMessage).toBeInTheDocument();
    });

    test('displays error message on failed upload', async () => {
        const mockFile = new File(['dummy content'], 'dummy.cv', { type: 'application/pdf' });
        const uploadInput = screen.getByLabelText(/upload cv/i);
        
        api.uploadCV.mockRejectedValueOnce(new Error('Upload failed'));

        render(<CVUpload />);
        fireEvent.change(uploadInput, { target: { files: [mockFile] } });

        const uploadButton = screen.getByRole('button', { name: /upload/i });
        fireEvent.click(uploadButton);

        const errorMessage = await screen.findByText(/upload failed/i);
        expect(errorMessage).toBeInTheDocument();
    });
});