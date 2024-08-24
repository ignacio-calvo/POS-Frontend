import { FC } from 'react';
import { CustomerComponent } from '../components/CustomerComponent';


interface Props {
    baseUrl: string;
}

export const Customers: FC<Props> = ({ baseUrl }) => {
    return (
        <div>
            <CustomerComponent baseUrl={baseUrl} />
        </div>
    );
};