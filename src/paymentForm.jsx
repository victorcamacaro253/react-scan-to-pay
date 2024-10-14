import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcStripe, faPaypal } from '@fortawesome/free-brands-svg-icons';
import Modal from './modal';
import ProductCard from './components/ProductCard';


const  PaymentForm= ()=>{
    const [items] = useState([
        { product_id: 1, name: 'Telefono', description: 'Descripción A', amount: 5230, quantity: 1 ,image:'../src/img/iphone.jpg'},
        { product_id: 2, name: 'Producto B', description: 'Descripción B', amount: 3000, quantity: 2, image:'../src/img/dell-laptop.jpg' },

    ])
    
    const [isOpen, setIsOpen] = useState(false);
    const [qrCode,setQrCode] = useState(null)
    const [paymentUrl,setPaymentUrl] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState('');

   
 /* const handleOpenModal = (method) => {
    setIsOpen(true);
    setPaymentMethod(method);
  };*/

  const handleCloseModal = () => {
    setIsOpen(false);
  };

   /*
    const handlePaymentStripe = async ()=>{
    try {

        const response = await fetch('http://localhost:5000/payments',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({items,user_id:1})
        });
        
        const data=  await response.json();

        if (data.url) {
            setPaymentUrl(data.url);
            setQrCode(data.qrCode);        } else {
            console.error('Error al crear la sesión de pago:', data);
        }

    } catch (error) {
        console.error('Error al procesar el pago:', error);

    }
   } 


   const handlePaymentPaypal = async ()=>{
    try {

        const response = await fetch('http://localhost:5000/payments/paypal',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({items,user_id:1})
        });
        
        const data=  await response.json();

        if (data.approvalUrl) {
            setPaymentUrl(data.approvalUrl);
            setQrCode(data.qrCode);    
            } else {
            console.error('Error al crear la sesión de pago:', data);
        }

    } catch (error) {
        console.error('Error al procesar el pago:', error);

    }
   } */

   const handleOpenModal = (method) => {
    setIsOpen(true);
    setPaymentMethod(method);
    generateQrCode(method); // Llamar a la función generateQrCode aquí
  };
  
  const generateQrCode = async (method) => {
    try {
      let response;
      if (method === 'stripe') {
        response = await fetch('http://localhost:5000/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items, user_id: 1 }),
        });
      } else if (method === 'paypal') {
        response = await fetch('http://localhost:5000/payments/paypal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items, user_id: 1 }),
        });
      }
  
      const data = await response.json();
     console.log(data)
      if (data.qrCode) {
        setQrCode(data.qrCode);
        setPaymentUrl(data.url || data.approvalUrl);
      } else {
        console.error('Error al crear la sesión de pago:', data);
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };


   return (
   
    <div>
        <div className="container">
      <h1 className="my-4">Simulacion de Pagos</h1>
      <div className="row">
        {items.map((item) => (
          <div className="col-sm-6" key={item.product_id}>
            <ProductCard product={item} />
          </div>
        ))}
      </div>
      </div>



        <button className='btn btn-outline-primary' onClick={() => handleOpenModal('stripe')}>
        <FontAwesomeIcon icon={faCcStripe} />
        Pagar con Stripe
      </button>
      <button className='btn btn-outline-primary' onClick={() => handleOpenModal('paypal')}>
        <FontAwesomeIcon icon={faPaypal} />
        Pagar con PayPal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        qrCode={qrCode}
        paymentUrl={paymentUrl}
        paymentMethod={paymentMethod}
        handlePayment={paymentMethod}
      />
    
    


    
       



    </div>

   )

}

export default PaymentForm;