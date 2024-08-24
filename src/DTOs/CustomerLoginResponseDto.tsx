import { CustomerDto } from './CustomerDto';

export interface CustomerLoginResponseDto {
    isSuccess: boolean;
    token: string;
    errorMessage: string;
    customer: CustomerDto;
}
