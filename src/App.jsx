// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentForm from './paymentForm';
import PaymentConfirmation from './confirmationPayment';
import PaymentConfirmationStripe from './confirmationPaymentStripe';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PaymentForm/>} />
                <Route path="/payment-confirmation" element={<PaymentConfirmation/>} />
                <Route path="/payment-stripe-confirmation" element={<PaymentConfirmationStripe/>}/>
            </Routes>
        </Router>
    );
}

export default App;
