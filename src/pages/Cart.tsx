import { FC } from 'react';
import CartDetailComponent from '../components/CartDetailComponent';
import CartDetailSummaryComponent from '../components/CartDetailSummaryComponent';
import { useOrder } from '../contexts/OrderContext';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@mui/material'; 
import { useCustomer } from '../contexts/CustomerContext'; // Import the useCustomer hook

export const Cart: FC = () => {
    const { t } = useTranslation('Cart');
    const { order, emptyOrder } = useOrder(); 
    const { customer } = useCustomer(); // Get the logged-in customer

    const handleEmptyCart = () => {
        emptyOrder(); 
    };

    const handleSubmitOrder = () => {
        // Implement order submission logic here
        console.log('Order submitted');
    };

    const isEmpty = order.orderLines.length === 0;
    const isCustomerLoggedIn = customer.id !== 0; // Check if a customer is logged in

    return (
        <div>
            <h1>{t('title')}</h1>
            {isEmpty ? (
                <p>{t('cartIsEmpty')}</p>
            ) : (
                <>
                    <Box mb={2}>
                        <Button variant="contained" color="secondary" onClick={handleEmptyCart}>
                            {t('emptyCart')}
                        </Button>
                    </Box>
                    <CartDetailComponent orderLines={order.orderLines} />
                    <CartDetailSummaryComponent total={order.finalTotal} />
                    {isCustomerLoggedIn && (
                        <Box mt={2}>
                            <Button variant="contained" color="primary" onClick={handleSubmitOrder}>
                                {t('submitOrder')}
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </div>
    );
};

export default Cart;
