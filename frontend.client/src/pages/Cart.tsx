import React, { FC } from 'react';
import CartDetailComponent from '../components/CartDetailComponent';
import { useOrder } from '../contexts/OrderContext';

export const Cart: FC = () => {
    const { order } = useOrder();

    return (
        <div>
            <h1>Shopping Cart</h1>
            <CartDetailComponent orderLines={order.orderLines} />
        </div>
    );
};
