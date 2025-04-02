import type { Category } from '../types/category.ts';
import { API_URL } from '../../Shared/services/const';
import { ServiceError } from '$lib/Shared/models/service-error.js';

const _URL = `${API_URL}/category/`;

async function request<T>(endpoint: string | URL, options: RequestInit): Promise<T> {
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
    getAllCategorys: (filter = {}): Promise<Category[]> => {
        const url = new URL(_URL);
        url.search = new URLSearchParams(filter).toString();
        return request(url, {
            method: 'GET',
        })
    },
    getCategory: (id: string): Promise<Category> => request(`${_URL}${id}`, { method: 'GET' }),
    createCategory: (category: Omit<Category, 'id'>): Promise<Category> => request(_URL, {
        method: 'POST',
        body: JSON.stringify(category),
    }),
    updateCategory: (category: Category): Promise<Category> => request(`${_URL}${category.id}`, {
        method: 'PUT',
        body: JSON.stringify(category),
    }),
    deleteCategory: (id: string): Promise<void> => request(`${_URL}${id}`, { method: 'DELETE' }),
};