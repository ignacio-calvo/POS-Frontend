import { useState } from 'react';
import { Order, OrderDto } from '../DTOs/OrderDto';
import { OrderLineDto } from '../DTOs/OrderLineDto';

const initialOrder: OrderDto = new Order();

export const useOrderState = () => {
    const [order, setOrder] = useState<OrderDto>(initialOrder);

    const addOrderLine = (orderLine: OrderLineDto) => {
        setOrder((prevOrder) => ({
            ...prevOrder,
            orderLines: [...prevOrder.orderLines, orderLine],
        }));
    };

    const removeOrderLine = (orderLineId: number) => {
        setOrder((prevOrder) => ({
            ...prevOrder,
            orderLines: prevOrder.orderLines.filter(line => line.id !== orderLineId),
        }));
    };

    const updateOrderLine = (updatedOrderLine: OrderLineDto) => {
        setOrder((prevOrder) => ({
            ...prevOrder,
            orderLines: prevOrder.orderLines.map(line =>
                line.id === updatedOrderLine.id ? updatedOrderLine : line
            ),
        }));
    };

    return {
        order,
        addOrderLine,
        removeOrderLine,
        updateOrderLine,
    };
};
