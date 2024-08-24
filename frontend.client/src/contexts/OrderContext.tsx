import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderDto } from '../DTOs/OrderDto';
import { OrderLineDto } from '../DTOs/OrderLineDto';

interface OrderContextType {
    order: OrderDto;
    addOrderLine: (orderLine: OrderLineDto) => void;
    removeOrderLine: (orderLineId: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const loadOrderFromStorage = (): OrderDto => {
    const storedOrder = localStorage.getItem('order');
    return storedOrder ? JSON.parse(storedOrder) : new Order(0);
};

const saveOrderToStorage = (order: OrderDto) => {
    localStorage.setItem('order', JSON.stringify(order));
};

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [order, setOrder] = useState<OrderDto>(loadOrderFromStorage);

    useEffect(() => {
        saveOrderToStorage(order);
    }, [order]);

    const addOrderLine = (orderLine: OrderLineDto) => {
        const newOrder = new Order(0);
        Object.assign(newOrder, order);
        newOrder.addOrderLine(orderLine);
        setOrder(newOrder);
    };

    const removeOrderLine = (orderLineId: number) => {
        const newOrder = new Order(0);
        Object.assign(newOrder, order);
        newOrder.removeOrderLine(orderLineId);
        setOrder(newOrder);
    };

    return (
        <OrderContext.Provider value={{ order, addOrderLine, removeOrderLine }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = (): OrderContextType => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};
