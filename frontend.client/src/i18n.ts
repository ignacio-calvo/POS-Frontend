import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'es'],
        fallbackLng: 'en',
        // lng: 'es', // Force Spanish language for testing. Delete or comment this to change dinamically based on browser settings.
        debug: true,
        ns: ['common', 'Navbar', 'MenuProductComponent', 'LoginForm', 'CustomerTable', 'CategoriesComponent', 'CartDetailComponent', 'MenuProductsComponent',
            'CustomerRegistrationForm', 'CustomerForm', 'CustomerComponent', 'CategoriesTable', 'CategoriesForm','Cart'], 
        defaultNS: 'common',
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

export default i18n;
