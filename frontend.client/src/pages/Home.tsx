import { FC } from 'react';
import { MenuCategoriesComponent } from '../components/MenuCategoriesComponent';
import { CategoryDto } from '../DTOs/CategoryDto';


interface Props {
    categories: CategoryDto[];
}

export const Home: FC<Props> = ({ categories }) => {
    return (
        <div>
            <MenuCategoriesComponent categories={categories} />
        </div>
    );
};