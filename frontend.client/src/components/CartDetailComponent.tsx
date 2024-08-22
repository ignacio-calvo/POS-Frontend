import React from 'react';
import { OrderLineDto } from '../DTOs/OrderLineDto';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useOrder } from '../contexts/OrderContext';

interface CartDetailProps {
    orderLines: OrderLineDto[];
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
    backgroundColor: theme => theme.palette.primary.main,
    color: theme => theme.palette.primary.contrastText,
});

const CartDetailComponent: React.FC<CartDetailProps> = ({ orderLines }) => {
    const { order, removeOrderLine } = useOrder();

    return (
        <Box>
            <StyledTableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableHeaderCell>Quantity</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Product</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Size</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Price</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Subtotal</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Actions</StyledTableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderLines.map((orderLine) => (
                            <TableRow key={orderLine.id}>
                                <StyledTableCell>{orderLine.quantity}</StyledTableCell>
                                <StyledTableCell>{orderLine.product?.name}</StyledTableCell>
                                <StyledTableCell>
                                    {orderLine.product?.sizes && orderLine.product.sizes.length > 0
                                        ? orderLine.product.sizes[0].name
                                        : 'N/A'}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {orderLine.product?.sizes && orderLine.product.sizes.length > 0
                                        ? orderLine.product.sizes[0].price
                                        : 'N/A'}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {orderLine.product?.sizes && orderLine.product.sizes.length > 0
                                        ? (orderLine.quantity * orderLine.product.sizes[0].price).toFixed(2)
                                        : 'N/A'}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => removeOrderLine(orderLine.id)}
                                    >
                                        Remove
                                    </Button>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant="h6">Total: ${order.finalTotal.toFixed(2)}</Typography>
            </Box>
        </Box>
    );
};

export default CartDetailComponent;
