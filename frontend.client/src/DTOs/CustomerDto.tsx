export interface CustomerDto {
    id: number;
    phoneNumber: string;
    phoneExtension?: string;
    lastName: string;
    firstName: string;
    companyName?: string;
    addressLine1?: string;
    streetNumber?: string;
    addressLine2?: string;
    state?: string;
    city?: string;
    postalCode?: string;
    email: string;
}
