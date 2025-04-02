import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductDetails, deleteProduct } from '../api';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetchProductDetails(id);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Ошибка загрузки продукта', error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить эту запчасть?')) {
      try {
        await deleteProduct(id);
        alert('Запчасть удалена');
        navigate('/');
      } catch (error) {
        alert('Ошибка удаления');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit-product/${id}`);
  };

  if (loading) return <div>Загрузка...</div>;
  if (!product) return <div>Продукт не найден</div>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <p><strong>Описание:</strong> {product.description}</p>
      <p><strong>Цена:</strong> ${product.price}</p>
      <p><strong>В наличии:</strong> {product.stock} шт.</p>

      {product.brand && <p><strong>Бренд:</strong> {product.brand}</p>}
      {product.category && <p><strong>Категория:</strong> {product.category}</p>}

      {product.image && (
        <div className="image-card">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
      )}

      <div className="button-container">
        <button className="edit-button" onClick={handleEdit}>Редактировать</button>
        <button className="delete-button" onClick={handleDelete}>Удалить</button>
      </div>
    </div>
  );
};

export default ProductDetail;

