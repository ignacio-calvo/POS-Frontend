import { FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CategoryDto } from '../DTOs/CategoryDto';
import { useTranslation } from 'react-i18next';

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

const StyledTableHeaderCell = styled(StyledTableCell)({
    fontWeight: 'bold',
});

const CategoriesTable: FC<CategoriesTableProps> = ({ categories, onEdit, onDelete }) => {
    const { t } = useTranslation('CategoriesTable');
    return (
        <StyledTableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableHeaderCell>{t('id')}</StyledTableHeaderCell>
                        <StyledTableHeaderCell>{t('name')}</StyledTableHeaderCell>
                        <StyledTableHeaderCell>{t('description')}</StyledTableHeaderCell>
                        <StyledTableHeaderCell>{t('image')}</StyledTableHeaderCell>
                        <StyledTableHeaderCell>{t('actions')}</StyledTableHeaderCell>
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
                                    {t('edit')}
                                </Button>
                                <Button onClick={() => onDelete(category.id)} color="secondary">
                                    {t('delete')}
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
