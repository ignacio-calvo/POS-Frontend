import { OrderLineDto } from './OrderLineDto';

export interface OrderDto {
    id: number;
    orderLines: OrderLineDto[];
    customerId?: number;
    date: Date;
    beingModified: boolean;
    delayedOrder: boolean;
    expectedDate: Date;
    statusId?: number;
    orderTypeId?: number;
    comments?: string;
    deliveryFee: number;
    subTotal: number;
    finalTotal: number;
    routedOutDate: Date;
    deliveredDate: Date;
    kitchenDisplayDate: Date;

    addOrderLine(orderLine: OrderLineDto): void;
    removeOrderLine(orderLineId: number): void;
}

export class Order implements OrderDto {
    id: number;
    orderLines: OrderLineDto[] = [];
    customerId?: number;
    date: Date = new Date();
    beingModified: boolean = false;
    delayedOrder: boolean = false;
    expectedDate: Date = new Date();
    statusId?: number;
    orderTypeId?: number;
    comments?: string;
    deliveryFee: number = 0;
    subTotal: number = 0;
    finalTotal: number = 0;
    routedOutDate: Date = new Date();
    deliveredDate: Date = new Date();
    kitchenDisplayDate: Date = new Date();

    addOrderLine(orderLine: OrderLineDto): void {
        orderLine.id = this.orderLines.length + 1;
        this.orderLines.push(orderLine);
        this.updateTotals();
    }

    removeOrderLine(orderLineId: number): void {
        this.orderLines = this.orderLines.filter(line => line.id !== orderLineId);
        this.renumberOrderLines();
        this.updateTotals();
    }

    private renumberOrderLines(): void {
        this.orderLines.forEach((line, index) => {
            line.id = index + 1;
        });
    }

    private updateTotals(): void {
        this.subTotal = this.orderLines.reduce((total, line) => {
            const size = line.product.sizes[0]; // Product within an order line should only have one size being the selected size
            return total + size.price * line.quantity;
        }, 0);
        this.finalTotal = this.subTotal + this.deliveryFee;
    }
}
