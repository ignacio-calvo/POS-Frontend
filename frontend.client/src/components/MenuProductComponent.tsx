import { FC, useState, useEffect } from 'react';
import { ProductDto } from '../DTOs/ProductDto';
import { ProductTypeDto } from '../DTOs/ProductTypeDto';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import { useOrder } from '../contexts/OrderContext';
import { OrderLineDto } from '../DTOs/OrderLineDto';
import '../App.css'; 
import { useTranslation } from 'react-i18next';

export const MenuProductComponent: FC<ProductDto> = ({ id, name, productImageUrl, sizes, description, productType }) => {
    const { t } = useTranslation('MenuProductComponent');
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { addOrderLine } = useOrder();

    useEffect(() => {
        const defaultSize = sizes.find(size => size.defaultSize);
        if (defaultSize) {
            setSelectedSize(defaultSize.id);
        }
    }, [sizes]);

    const handleSizeChange = (sizeId: number | null) => {
        setSelectedSize(sizeId);
    };

    const handleAddToCart = () => {
        if (selectedSize !== null) {
            const selectedSizeObj = sizes.find(size => size.id === selectedSize);
            if (selectedSizeObj) {
                const orderLine: OrderLineDto = {
                    id: 0, 
                    sequence: 1, 
                    deleted: false,
                    status: undefined, // Set appropriate status 
                    quantity: 1,
                    product: {
                        id,
                        name,
                        description,
                        productImageUrl,
                        productType,
                        sizes: [selectedSizeObj] // Only include the selected size
                    },
                    beingModified: false,
                    comments: undefined, 
                };
                addOrderLine(orderLine);
                setOpenBackdrop(true);
                setOpenSnackbar(true);
                setTimeout(() => setOpenBackdrop(false), 1000); // Close backdrop after 1 second
                console.log(`Product ${id} added to cart with price ${selectedSizeObj.price}`);
            }
        } else {
            console.log('Please select a size');
        }
    };

    const handleCustomize = () => {
        console.log(`Product ${id} customization started`);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardMedia
                component="img"
                height="140"
                image={`./img/${productImageUrl}`}
                alt={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Box className="sizeButtonContainer">
                    {sizes.map(size => (
                        <Button
                            key={size.id}
                            className="sizeButton"
                            variant={selectedSize === size.id ? 'contained' : 'outlined'}
                            onClick={() => handleSizeChange(size.id)}
                        >
                            {size.name} <br /> ${size.price.toFixed(2)}
                        </Button>
                    ))}
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleAddToCart}>
                        {t("addtocart")}
                    </Button>
                    {productType !== ProductTypeDto.Generic && (
                        <Button variant="outlined" color="secondary" onClick={handleCustomize} sx={{ ml: 2 }}>
                            {t("customize")}
                        </Button>
                    )}
                </Box>
            </CardContent>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <Typography variant="h6">{t("addingtocart")}</Typography>
            </Backdrop>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={t("productadded")}
            />
        </Card>
    );
};
