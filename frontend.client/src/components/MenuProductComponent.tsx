import { FC, useState, useEffect } from 'react';
import { ProductDto } from '../DTOs/ProductDto';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '../App.css'; // Import the CSS file

export const MenuProductComponent: FC<ProductDto> = ({ id, name, productImageUrl, sizes, description }) => {
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    useEffect(() => {
        const defaultSize = sizes.find(size => size.defaultSize);
        if (defaultSize) {
            setSelectedSize(defaultSize.id);
        }
    }, [sizes]);

    const handleSizeChange = (sizeId: number | null) => {
        setSelectedSize(sizeId);
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
                            {size.name} <br /> ${size.price?.toFixed(2) ?? "N/A"}
                        </Button>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};
