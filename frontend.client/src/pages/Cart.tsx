import { FC } from 'react';
import CartDetailComponent from '../components/CartDetailComponent';
import { useOrder } from '../contexts/OrderContext';
import { useTranslation } from 'react-i18next';

export const Cart: FC = () => {
    const { t } = useTranslation('Cart');
    const { order } = useOrder();

    return (
        <div>
            <h1>{t('title')}</h1>
            <CartDetailComponent orderLines={order.orderLines} />
        </div>
    );
};
