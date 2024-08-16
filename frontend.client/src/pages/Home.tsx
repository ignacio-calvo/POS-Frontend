import { FC } from 'react';
import { Categories } from '../components/Categories';
import { CategoryDto } from '../DTOs/CategoryDto';


interface Props {
    categories: CategoryDto[];
}

export const Home: FC<Props> = ({ categories }) => {
    return (
        <div>
            <Categories categories={categories} />
        </div>
    );
};