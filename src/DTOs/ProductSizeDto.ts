import { ProductDto } from "./ProductDto";

export interface ProductSizeDto {
    productId: number;
    product: ProductDto;
    id: number;
    name: string;
    displayOrder: number;
    statusCode: number;
    price: number;
    defaultSize: boolean;
    priceByWeight: boolean;
    tareWeight: number;
}