import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { CustomerDto } from '../DTOs/CustomerDto';

interface CustomerComponentProps {
    baseUrl: string;
}

export const CustomerComponent: FC<CustomerComponentProps> = ({ baseUrl }) => {
    const [customers, setCustomers] = useState<CustomerDto[]>([]);
    const [customer, setCustomer] = useState<Partial<CustomerDto>>({});
    const [isEditing, setIsEditing] = useState(false);

    const apiUrl = `${baseUrl}/api/customers`;

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get<CustomerDto[]>(apiUrl);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            await updateCustomer(customer as CustomerDto);
        } else {
            await createCustomer(customer as CustomerDto);
        }
        setCustomer({});
        setIsEditing(false);
        fetchCustomers();
    };

    const createCustomer = async (newCustomer: CustomerDto) => {
        try {
            await axios.post(apiUrl, newCustomer);
        } catch (error) {
            console.error('Error creating customer:', error);
        }
    };

    const updateCustomer = async (updatedCustomer: CustomerDto) => {
        try {
            await axios.put(`${apiUrl}/${updatedCustomer.id}`, updatedCustomer);
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const deleteCustomer = async (id: number) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const editCustomer = (customer: CustomerDto) => {
        setCustomer(customer);
        setIsEditing(true);
    };

    return (
        <div>
            <h2>Customers</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={customer.firstName || ''}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    value={customer.lastName || ''}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="text"
                    name="phoneNumber"
                    value={customer.phoneNumber || ''}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={customer.email || ''}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
                <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
            </form>
            <ul>
                {customers.map((cust) => (
                    <li key={cust.id}>
                        {cust.firstName} {cust.lastName} - {cust.email}
                        <button onClick={() => editCustomer(cust)}>Edit</button>
                        <button onClick={() => deleteCustomer(cust.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
