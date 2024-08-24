import { ProductDto } from "./ProductDto";

export interface CategoryDto {
    id: number;
    name: string;
    description?: string;
    imageUrl?: string;
    products: ProductDto[];
}