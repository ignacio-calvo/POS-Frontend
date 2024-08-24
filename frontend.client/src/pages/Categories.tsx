import { FC } from 'react';
import { CategoriesComponent } from '../components/CategoriesComponent';


interface Props {
    baseUrl: string;
}

export const Categories: FC<Props> = ({ baseUrl }) => {
    return (
        <div>
            <CategoriesComponent baseUrl={baseUrl} />
        </div>
    );
};