import { ProductSizeDto } from "./ProductSizeDto";
import { ProductTypeDto } from "./ProductTypeDto";

export interface ProductDto {
    id: number;
    name: string | null;
    sizes: ProductSizeDto[];
    description: string | null;
    orderDescription: string | null;
    receiptDescription: string | null;
    labelDescription: string | null;
    kitchenDescription: string | null;
    displayOrder: number;
    isTaxable: number | null;
    isPrepared: boolean | null;
    isPizza: boolean | null;
    isSpecialtyPizza: boolean | null;
    statusCode: number;
    shouldPromptForSize: boolean;
    productType: ProductTypeDto;
    productImageUrl: string | null;
}
