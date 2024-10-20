import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcStripe, faPaypal } from '@fortawesome/free-brands-svg-icons';
import Modal from './modal';
import CartModal from './CartModal'
import ProductCard from './components/ProductCard';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Asegúrate de importar desde el paquete correcto


const  PaymentForm= ()=>{
/*const [items] = useState([
        { product_id: 1, name: 'Telefono', description: 'Descripción A', amount: 5230, quantity: 1 ,image:'../src/img/iphone.jpg'},
        { product_id: 2, name: 'Producto B', description: 'Descripción B', amount: 3000, quantity: 2, image:'../src/img/dell-laptop.jpg' },

    ])
*/
    const [items,setItems] = useState([])
    const [cart,setCart]= useState([])
     const [isOpen, setIsOpen] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false); // Estado para el modal del carrito



   useEffect(()=>{
   const fetchProdcuts= async ()=>{
    try{
  
      const response = await fetch('http://localhost:5000/products')
      const data = await response.json();
      setItems(data);
      console.log(data)

    }catch(error){
      console.error(error);


    }
   }

   fetchProdcuts()


   },[])
 /* const handleOpenModal = (method) => {
    setIsOpen(true);
    setPaymentMethod(method);
  };*/

  const addToCart = (product) => {
    setCart((prevCart) => {
        const existingProduct = prevCart.find(item => item.product_id === product.product_id);

        if (existingProduct) {
            // Si el producto ya existe, actualizar la cantidad
            return prevCart.map(item => 
                item.product_id === product.product_id 
                ? { ...item,
                   quantity: item.quantity + product.quantity,
                } // Crear un nuevo objeto
                : item
            );
        } else {
            // Si no existe, agregar el nuevo producto
            return [...prevCart, { ...product, amount: (product.amount * product.quantity) }];
        }
    });
};

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.amount * item.quantity), 0) / 100; // Dividir por 100 para obtener el valor en USD
};

const handleOpenCartModal = () => {
  setIsCartModalOpen(true);
};

const handleCloseCartModal = () => {
  setIsCartModalOpen(false);
};



   return (
   
    <div>
        <div className="container">
      <h1 className="my-4">Nuestros Productos</h1>


    
        {/* Ícono del carrito */}
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
          <FontAwesomeIcon icon={faShoppingCart} size="2x" onClick={handleOpenCartModal} />
          {cart.length > 0 && (
            <span style={{ position: 'absolute', top: 0, right: 0, background: 'blue', color: 'white', borderRadius: '50%', padding: '5px 10px' }}>
              {cart.length}
            </span>
          )}
        </div>



      <div className="row">
        {items.map((item) => (
          <div className="col-sm-6" key={item.id}>
            <ProductCard product={item} addToCart={addToCart} />
          </div>
        ))}
      </div>
      </div>



   
           {/* Modal del carrito */}
           <CartModal
        isOpen={isCartModalOpen}
        onClose={handleCloseCartModal}
        cart={cart}
        calculateTotal={calculateTotal}
      />

    


    </div>

   )

}

export default PaymentForm;