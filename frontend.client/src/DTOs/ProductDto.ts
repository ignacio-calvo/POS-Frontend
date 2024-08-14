import { ProductSizeDto } from "./ProductSizeDto";

export interface ProductDto {
    id: number;
    name: string;
    description?: string;
    orderDescription?: string;
    receiptDescription?: string;
    labelDescription?: string;
    kitchenDescription?: string;
    displayOrder: number;
    isTaxable?: number;
    isPrepared?: boolean;
    isPizza?: boolean;
    isSpecialtyPizza?: boolean;
    statusCode: number;
    shouldPromptForSize: boolean;
    productTypeCode: number;
    productImageUrl?: string;
    sizes: ProductSizeDto[];
}
