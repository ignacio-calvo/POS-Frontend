import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface CartDetailSummaryProps {
    total: number;
}

const CartDetailSummaryComponent: React.FC<CartDetailSummaryProps> = ({ total }) => {
    const { t } = useTranslation('CartDetailSummaryComponent');

    return (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="h6">{t('total')}: ${total.toFixed(2)}</Typography>
        </Box>
    );
};

export default CartDetailSummaryComponent;
