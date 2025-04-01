import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api';
import AddProduct from './AddProduct';
import '../styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();

        // Логируем полный ответ для диагностики
        console.log(response);

        // Извлекаем данные из response.data.data
        if (response.data.success && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error('Error:', response.data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleAddProductClick = () => {
    setShowAddProductForm(true); // Показываем форму добавления
  };

  const handleCloseForm = () => {
    setShowAddProductForm(false); // Закрываем форму
  };

  const refreshProductList = async () => {
    setLoading(true); // Чтобы отображалась загрузка
    try {
      const response = await fetchProducts();
      if (response.data.success && Array.isArray(response.data.data)) {
        setProducts(response.data.data); // Обновляем состояние с новыми продуктами
      }
    } catch (error) {
      console.error('Error refreshing products', error);
    } finally {
      setLoading(false); // Скрываем индикатор загрузки
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="product-list-container">
      <button className="add-product-button" onClick={handleAddProductClick}>
        Добавить автозапчасть
      </button>
      <h2>Список автозапчастей</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id.$oid}>
            <Link to={`/product/${product._id.$oid}`} className="product-link">
              {product.name} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>

      {/* Если состояние showAddProductForm true, показываем форму для добавления продукта */}
      {showAddProductForm && <AddProduct onClose={handleCloseForm} refreshProductList={refreshProductList} />}
    </div>
  );
};

export default ProductList;
