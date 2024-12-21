const API_BASE_URL = 'http://localhost:3001/api';

export async function fetchData<T>(endpoint: string): Promise<T[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function updateData<T>(endpoint: string, id: string, data: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
}

export async function addData<T>(endpoint: string, data: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
}

export const api = {
  getStudents: () => fetchData('students'),
  getRecords: () => fetchData('records'),
  getTeachers: () => fetchData('teachers'),
  updateStudent: (id: string, data: any) => updateData('students', id, data),
  addStudent: (data: any) => addData('students', data)
};