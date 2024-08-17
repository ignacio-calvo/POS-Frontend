import { FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CustomerDto } from '../DTOs/CustomerDto';

interface CustomerTableProps {
    customers: CustomerDto[];
    onEdit: (customer: CustomerDto) => void;
    onDelete: (id: number) => void;
}

const StyledTableContainer = styled(TableContainer)({
    minWidth: 650,
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
}));

const StyledTableHeaderCell = styled(StyledTableCell)({
    fontWeight: 'bold',
});

const CustomerTable: FC<CustomerTableProps> = ({ customers, onEdit, onDelete }) => (
    <StyledTableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableHeaderCell>ID</StyledTableHeaderCell>
                    <StyledTableHeaderCell>First Name</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Last Name</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Email</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Phone Number</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Actions</StyledTableHeaderCell>
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
                                Edit
                            </Button>
                            <Button onClick={() => onDelete(cust.id)} color="secondary">
                                Delete
                            </Button>
                        </StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </StyledTableContainer>
);

export default CustomerTable;