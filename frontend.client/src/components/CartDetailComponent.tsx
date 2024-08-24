import React from 'react';
import { OrderLineDto } from '../DTOs/OrderLineDto';
import { Table, TableBody, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { useOrder } from '../contexts/OrderContext';
import { useTranslation } from 'react-i18next';
import { StyledTableContainer, StyledTableCell, StyledTableHeaderCell } from './StyledTableComponents';

interface CartDetailProps {
    orderLines: OrderLineDto[];
}

const CartDetailComponent: React.FC<CartDetailProps> = ({ orderLines }) => {
    const { t } = useTranslation('CartDetailComponent');
    const { removeOrderLine } = useOrder();

    return (
        <Box>
            <Paper>
                <StyledTableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableHeaderCell>{t('quantity')}</StyledTableHeaderCell>
                                <StyledTableHeaderCell>{t('product')}</StyledTableHeaderCell>
                                <StyledTableHeaderCell>{t('size')}</StyledTableHeaderCell>
                                <StyledTableHeaderCell>{t('price')}</StyledTableHeaderCell>
                                <StyledTableHeaderCell>{t('subtotal')}</StyledTableHeaderCell>
                                <StyledTableHeaderCell>{t('actions')}</StyledTableHeaderCell>
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
                                            {t('remove')}
                                        </Button>
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
            </Paper>
        </Box>
    );
};

export default CartDetailComponent;
