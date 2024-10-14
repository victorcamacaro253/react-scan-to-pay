import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={product.image} className="card-img-top img-fluid" alt={product.name} style={{ maxHeight: '350px', objectFit: 'cover' }} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">
          <strong>Monto:</strong> {product.amount / 100} 
        </p>
        <p className="card-text">
          <strong>Cantidad:</strong> {product.quantity}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;