import React,{useState} from 'react'

const  PaymentForm= ()=>{
    const [items] = useState([
        { product_id: 1, name: 'Telefono', description: 'Descripción A', amount: 5230, quantity: 1 },
        { product_id: 2, name: 'Producto B', description: 'Descripción B', amount: 3000, quantity: 2 },

    ])


   const handlePaymentStripe = async ()=>{
    try {

        const response = await fetch('http://localhost:5000/payments',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({items,user_id:1})
        });
        
        const data=  await response.json();

        if (data.url) {
            window.location.href = data.url; // Redirige a Stripe Checkout
        } else {
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
            window.location.href = data.approvalUrl; // Redirige a Stripe Checkout
        } else {
            console.error('Error al crear la sesión de pago:', data);
        }

    } catch (error) {
        console.error('Error al procesar el pago:', error);

    }
   } 


   return (
   
    <div>
        <h1>Simulacion de Pagos </h1>

        <ul>
            {items.map((item)=>(
      <li key={item.product_id}>
        {item.name}- {item.description} - {item.amount/100} x {item.quantity}

      </li>
            ))}
        </ul>
        <button onClick={handlePaymentStripe}>Pagar con Stripe</button>
        <button onClick={handlePaymentPaypal}>Pagar con Paypal</button>


    </div>

   )

}

export default PaymentForm;