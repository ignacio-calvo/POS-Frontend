import { FC, useState } from 'react';
import { TextField, Drawer, IconButton, AppBar, Toolbar, Typography, Button, InputAdornment } from '@mui/material';
import { ArrowBack, Description, Image, Label } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { CategoryDto } from '../DTOs/CategoryDto';
import { useTranslation } from 'react-i18next';

interface CategoriesFormProps {
    category: Partial<CategoryDto>;
    isEditing: boolean;
    isOpen: boolean;
    onClose: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const Form = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    overflowY: 'auto',
    height: 'calc(100vh - 64px)', // Adjust height to account for AppBar
}));

const CategoriesForm: FC<CategoriesFormProps> = ({ category, isEditing, isOpen, onClose, onChange, onSubmit }) => {
    const { t } = useTranslation('CategoriesForm');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newErrors: { [key: string]: string } = { ...errors };

        if ((name === 'name' || name === 'description') && !value.trim()) {
            newErrors[name] = t('fieldRequired');
        } else {
            delete newErrors[name];
        }

        setErrors(newErrors);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!category.name?.trim()) {
            newErrors.name = t('nameRequired');
        }

        if (!category.description?.trim()) {
            newErrors.description = t('descriptionRequired');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            onSubmit(e);
        }
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {isEditing ? t('updateCategory') : t('createCategory')}
                    </Typography>
                    <Button color="inherit" onClick={handleSubmit}>
                        {t('save')}
                    </Button>
                </Toolbar>
            </AppBar>
            <Form onSubmit={handleSubmit}>
                <TextField
                    label={t('name')}
                    name="name"
                    value={category.name || ''}
                    onChange={onChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Label />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label={t('description')}
                    name="description"
                    value={category.description || ''}
                    onChange={onChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.description}
                    helperText={errors.description}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Description />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label={t('imageUrl')}
                    name="imageUrl"
                    value={category.imageUrl || ''}
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Image />
                            </InputAdornment>
                        ),
                    }}
                />
            </Form>
        </Drawer>
    );
};

export default CategoriesForm;
