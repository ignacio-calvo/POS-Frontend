import { FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CategoryDto } from '../DTOs/CategoryDto';

interface CategoriesTableProps {
    categories: CategoryDto[];
    onEdit: (category: CategoryDto) => void;
    onDelete: (id: number) => void;
}

const StyledTableContainer = styled(TableContainer)({
    minWidth: 650,
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
}));

const CategoriesTable: FC<CategoriesTableProps> = ({ categories, onEdit, onDelete }) => {
    return (
        <StyledTableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell>Image</StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <StyledTableCell>{category.id}</StyledTableCell>
                            <StyledTableCell>{category.name}</StyledTableCell>
                            <StyledTableCell>{category.description}</StyledTableCell>
                            <StyledTableCell>
                                <img src={`./img/${category.imageUrl}`} alt={category.name} style={{ width: '30px', height: '30px' }} />
                            </StyledTableCell>
                            <StyledTableCell>
                                <Button onClick={() => onEdit(category)} color="primary">
                                    Edit
                                </Button>
                                <Button onClick={() => onDelete(category.id)} color="secondary">
                                    Delete
                                </Button>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
};

export default CategoriesTable;
