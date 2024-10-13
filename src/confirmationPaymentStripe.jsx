import React, { useEffect, useState } from 'react';

const PaymentConfirmationStripe = () =>{
    const [paymentStatus, setPaymentStatus] = useState('');
    const [error, setError] = useState('');
    const [paymentDetails, setPaymentDetails] = useState(null); // New state for payment details


   useEffect(()=>{
    const fetchPaymentDetails = async () =>{
        console.log('window.location.search:', window.location.search);
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams)
        const token= urlParams.get('sessionId') 
console.log(token)
        if(token){
            try {
                const response= await fetch(`http://localhost:5000/success?sessionId=${token}`)
                const data = await response.json();
if (data) {
    console.log(data)

}else{
    console.log('No se encontro datos')
}
                
                if (data.payment_status === 'paid') {
                    setPaymentStatus('¡Pago completado con éxito!');
                    setPaymentDetails(data); 
                } else if (data.status === 'CAPTURED') {
                    setPaymentStatus('Pago ya capturado.');
         
                  }  else {
                    setPaymentStatus('Error al completar el pago.');
                    setError(data.message);
                }

            } catch (error) {
                console.error('Error al obtener los detalles del pago:', error);
                    setPaymentStatus('Error al obtener los detalles del pago.');
                    setError(error.message);
            }
        }
    }
    fetchPaymentDetails()
   },[])

  return (
    <div>
           <h1>Estado del Pago</h1>
          {paymentStatus && <p>{paymentStatus}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

      {paymentDetails && (
        <div>
        </div>
      )}

    </div>
  )  
}

export default PaymentConfirmationStripe