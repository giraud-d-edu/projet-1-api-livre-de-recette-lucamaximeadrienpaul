import type { Category } from '../types/category.ts';
import { API_URL } from '../../Shared/services/const.ts';
import { ServiceError } from '$lib/Shared/models/service-error.js';

const URL = `${API_URL}/category/`;

async function request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });

    if (!response.ok) {
        throw new ServiceError((await response.json()).message, response.status);
    }

    return response.json() as Promise<T>;
}

export const categoryService = {
    getAllCategorys: (): Promise<Category[]> => request(URL, { method: 'GET' }),
    getCategory: (id: string): Promise<Category> => request(`${URL}${id}`, { method: 'GET' }),
    createCategory: (category: Omit<Category, 'id'>): Promise<Category> => request(URL, {
        method: 'POST',
        body: JSON.stringify(category),
    }),
    updateCategory: (category: Category): Promise<Category> => request(`${URL}${category.id}`, {
        method: 'PUT',
        body: JSON.stringify(category),
    }),
    deleteCategory: (id: string): Promise<void> => request(`${URL}${id}`, { method: 'DELETE' }),
};