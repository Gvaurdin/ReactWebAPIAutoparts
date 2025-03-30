import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductDetails, updateProduct } from '../api';
import '../styles/EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    brand: '',
    category: '',
    stock: 0,
    image: '', 
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        console.log(`Fetching product details for ID: ${id}`);
        const response = await fetchProductDetails(id);
        console.log('Response from API:', response.data);

        if (response.data && response.data.data) {
          setProduct(response.data.data);
        } else {
          console.error('Ошибка: пустой объект продукта');
        }
      } catch (error) {
        console.error('Ошибка загрузки данных продукта:', error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting updated product:', product);

    try {
      const response = await updateProduct(id, {
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        category: product.category,
        stock: product.stock,
        image: product.image,
      });
      console.log('Update response:', response);
      alert('Запчасть успешно обновлена');
      navigate(`/product/${id}`);
    } catch (error) {
      console.error('Ошибка при обновлении запчасти:', error);
      alert('Ошибка при обновлении запчасти');
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="edit-product">
      <h2>Редактирование запчасти</h2>
      <form onSubmit={handleSubmit} method='PUT' className="product-form">
        <div className="form-group">
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={product.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <textarea
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="price">Цена:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={product.price}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="brand">Бренд:</label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={product.brand || ''}
            onChange={handleChange}
            className="form-control"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="category">Категория:</label>
          <input
            type="text"
            name="category"
            id="category"
            value={product.category || ''}
            onChange={handleChange}
            className="form-control"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="stock">Количество в наличии:</label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={product.stock}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="image">Изображение (URL):</label>
          <input
            type="text"
            name="image"
            id="image"
            value={product.image || ''}
            onChange={handleChange}
            className="form-control"
          />
        </div>
  
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">Сохранить изменения</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(`/product/${id}`)}>Отмена</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
