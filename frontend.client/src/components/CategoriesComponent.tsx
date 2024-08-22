import React, { useEffect, useState } from 'react';
import { TextField, Fab, Backdrop, CircularProgress, Snackbar, Alert, InputAdornment } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { fetchCategories, updateCategory, deleteCategory } from '../services/categoryService';
import { CategoryDto } from '../DTOs/CategoryDto';
import CategoriesTable from './CategoriesTable';
import CategoriesForm from './CategoriesForm';

const FloatingActionButton = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
}));

export const CategoriesComponent: React.FC<{ baseUrl: string }> = ({ baseUrl }) => {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<CategoryDto[]>([]);
    const [editingCategory, setEditingCategory] = useState<Partial<CategoryDto> | null>(null);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadCategories = async () => {
            setLoading(true);
            try {
                const data = await fetchCategories(baseUrl);
                setCategories(data);
                setFilteredCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, [baseUrl]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(query)
        );
        setFilteredCategories(filtered);
    };

    const handleEdit = (category: CategoryDto) => {
        setEditingCategory(category);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: number) => {
        setLoading(true);
        try {
            await deleteCategory(baseUrl, id);
            const data = await fetchCategories(baseUrl);
            setCategories(data);
            setFilteredCategories(data);
            setSnackbar({ open: true, message: 'Category deleted successfully', severity: 'success' });
        } catch (error) {
            console.error('Error deleting category:', error);
            setSnackbar({ open: true, message: 'Error deleting category', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (category: CategoryDto) => {
        setLoading(true);
        try {
            await updateCategory(baseUrl, category);
            setIsFormOpen(false);
            const data = await fetchCategories(baseUrl);
            setCategories(data);
            setFilteredCategories(data);
            setSnackbar({ open: true, message: 'Category saved successfully', severity: 'success' });
        } catch (error) {
            console.error('Error saving category:', error);
            setSnackbar({ open: true, message: 'Error saving category', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsFormOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editingCategory) {
            setEditingCategory({
                ...editingCategory,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div>
            <h2>Categories</h2>
            <TextField
                label="Search Categories"
                value={searchQuery}
                onChange={handleFilterChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
                fullWidth
                margin="normal"
            />
            <FloatingActionButton color="primary" onClick={() => { setEditingCategory({ id: '', name: '', description: '', imageUrl: '' }); setIsFormOpen(true); }}>
                <Add />
            </FloatingActionButton>
            <CategoriesTable categories={filteredCategories} onEdit={handleEdit} onDelete={handleDelete} />
            {isFormOpen && editingCategory && (
                <CategoriesForm
                    category={editingCategory}
                    isEditing={!!editingCategory.id}
                    isOpen={isFormOpen}
                    onClose={handleCancel}
                    onChange={handleChange}
                    onSubmit={() => handleSave(editingCategory as CategoryDto)}
                />
            )}
            <Backdrop open={loading} style={{ zIndex: 1300 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CategoriesComponent;
