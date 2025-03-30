import { useState } from 'react';
import { createProduct } from '../api'; // Импортируем функцию для создания продукта
import '../styles/EditProduct.css';

const AddProduct = ({ onClose, refreshProductList }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: '',
    stock: '',
    image: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProduct(product);
      console.log('Ответ API:', response); // Проверяем, есть ли ответ от сервера
      if (response.data.success) {
        alert('Запчасть успешно добавлена!');
        onClose(); // Закрытие формы
        refreshProductList(); // Обновление списка продуктов
      } else {
        setError('Не удалось добавить запчасть.');
      }
    } catch (error) {
      setError('Произошла ошибка при добавлении запчасти.');
    }
  };

  return (
    <div className="edit-product">
      <h2>Добавление автозапчасти</h2>
      <form onSubmit={handleSubmit} method='POST' className="product-form">
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
            value={product.brand}
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
            value={product.category}
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
            value={product.image}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">Добавить</button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Отмена</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
