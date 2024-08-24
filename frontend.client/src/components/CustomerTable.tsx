import { FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { CustomerDto } from '../DTOs/CustomerDto';
import { useTranslation } from 'react-i18next';
import { StyledTableContainer, StyledTableCell, StyledTableHeaderCell } from './StyledTableComponents';

interface CustomerTableProps {
    customers: CustomerDto[];
    onEdit: (customer: CustomerDto) => void;
    onDelete: (id: number) => void;
}

const CustomerTable: FC<CustomerTableProps> = ({ customers, onEdit, onDelete }) => {
    const { t } = useTranslation('CustomerTable');

    return (
        <StyledTableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableHeaderCell>{t('id')}</StyledTableHeaderCell>
                        <StyledTableHeaderCell>{t('firstName')}</StyledTableHeaderCell>
                        <StyledTableHeaderCell>{t('lastName')}</StyledTableHeaderCell>
                        <StyledTableHeaderCell>{t('email')}</StyledTableHeaderCell>
                        <StyledTableHeaderCell>{t('phoneNumber')}</StyledTableHeaderCell>
                        <StyledTableHeaderCell>{t('actions')}</StyledTableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((cust) => (
                        <TableRow key={cust.id}>
                            <StyledTableCell>{cust.id}</StyledTableCell>
                            <StyledTableCell>{cust.firstName}</StyledTableCell>
                            <StyledTableCell>{cust.lastName}</StyledTableCell>
                            <StyledTableCell>{cust.email}</StyledTableCell>
                            <StyledTableCell>{cust.phoneNumber}</StyledTableCell>
                            <StyledTableCell>
                                <Button onClick={() => onEdit(cust)} color="primary">
                                    {t('edit')}
                                </Button>
                                <Button onClick={() => onDelete(cust.id)} color="secondary">
                                    {t('delete')}
                                </Button>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    )
};

export default CustomerTable;