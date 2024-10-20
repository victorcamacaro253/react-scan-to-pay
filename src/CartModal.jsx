import React from "react";
import PropTypes from "prop-types";


const CartModal = ({ isOpen, onClose, cart, calculateTotal }) => {
    if (!isOpen) return null;
  
    return (
      <div className=" modal modal-overlay">
        <div className="modal-content">
     
         {/* Mostrar el contenido del carrito */}
      <h2>Carrito de Compras</h2>
                {cart.length === 0 ? (
                    <p>El carrito está vacío.</p>
                ) : (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                                 {item.name} - Cantidad: {item.quantity} - Monto por Producto: ${(item.amount / 100).toFixed(2)} - Total: ${(item.amount * item.quantity / 100).toFixed(2)}

                            </li>
                        ))}
                    </ul>
                )}
                <h3>Total: ${(calculateTotal()).toFixed(2)}</h3>
                <button className="btn btn-primary" onClick={() => {
          onClose();
          // Redirigir a la interfaz de pago
          localStorage.setItem('cart', JSON.stringify(cart));

          window.location.href = '/payment-interface';

        }}>
          Continuar con el pago
        </button>


          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  };

  CartModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    cart: PropTypes.array.isRequired,
    calculateTotal: PropTypes.func.isRequired,
};

  
  export default CartModal;
  