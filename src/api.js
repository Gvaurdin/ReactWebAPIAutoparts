import axios from 'axios';

const api = axios.create({
    baseURL: 'https://gsa-top.ru/api'
});

export const fetchProducts = () => api.get('/products');
export const fetchProductDetails = (id) => api.get(`/product/${id}`);
export const createProduct = (data) => api.post(`/product`, data);
export const updateProduct = (id, data) => api.put(`/product/${id}`, data);
export const deleteProduct = (id) => api.delete(`/product/${id}`);
export const createOrder = (orderData) => api.post('/orders', orderData);