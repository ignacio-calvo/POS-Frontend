# POS Frontend

Frontend solution for supporting Point Of Sale (POS) business. 

Written in React using TypeScript and Vite. 
Also using Material UI, formik and yup for UI, styling, forms and validations. Implemented i18n for enabling localization. 

## Architecture
![Component Diagram](https://github.com/ignacio-calvo/POS-Services/blob/develop/Documentation/POSitive-Components.png)

*This solution relies on backend APIs that can be found in <https://github.com/ignacio-calvo/POS-Services>*

## Getting Started

I've used Visual Studio 2022 Template for React with TypeScript for bootstraping the solution so you should be able to get everything going by running the POS-Frontend.sln with VS 2022. 

### Backend considerations

You will need to have the backend APIs running and available. You can configure the API URLs by modifying the Environment variables within the .env file <https://github.com/ignacio-calvo/POS-Frontend/blob/master/frontend.client/.env>
