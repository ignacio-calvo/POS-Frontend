import { OrderLineStatusDto } from './OrderLineStatusDto';
import { ProductDto } from './ProductDto';

export interface OrderLineDto {
    id: number;
    sequence: number;
    deleted: boolean;
    status?: OrderLineStatusDto;
    quantity: number;
    product?: ProductDto;
    beingModified: boolean;
    comments?: string;
}
