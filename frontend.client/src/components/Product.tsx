import { FC, useState, useEffect } from 'react';
import { ProductDto } from '../DTOs/ProductDto';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';

const CustomToggleButton = styled(ToggleButton)({
    textTransform: 'none',
});

export const Product: FC<ProductDto> = ({ id, name, productImageUrl, sizes }) => {
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    useEffect(() => {
        const defaultSize = sizes.find(size => size.defaultSize);
        if (defaultSize) {
            setSelectedSize(defaultSize.id);
        }
    }, [sizes]);

    const handleSizeChange = (event: React.MouseEvent<HTMLElement>, newSize: number | null) => {
        setSelectedSize(newSize);
    };

    return (
        <div>
            <Box sx={{ p: 2 }} className="product">
                <div className="productItemContainer">
                    <img src={`./img/${productImageUrl}`} className="itemIcon" alt={name}></img>
                    <p className="itemText">{name}</p>
                </div>
                <div className="productItemSizeContainer">
                    <ToggleButtonGroup
                        value={selectedSize}
                        exclusive
                        onChange={handleSizeChange}
                        aria-label="product size"
                    >
                        {sizes.map(size => (
                            <CustomToggleButton key={size.id} value={size.id}>
                                {size.name} - ${size.price?.toFixed(2) ?? "N/A"}
                            </CustomToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </div>
            </Box>
        </div>
    );
};
