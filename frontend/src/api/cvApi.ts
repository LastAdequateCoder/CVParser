import type { Candidate } from '../types/Candidate';

const API_BASE = 'http://localhost:8080/api/cv';

export async function uploadCv(file: File): Promise<Candidate> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
}

export async function getAllCandidates(): Promise<Candidate[]> {
  const response = await fetch(`${API_BASE}/candidates`);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
} 