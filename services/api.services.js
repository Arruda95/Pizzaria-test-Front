import axios from 'axios';

   const apiUrl = 'http://localhost:3000/api';

   export const getAllProducts = () => {
     return axios.get(${apiUrl}/products);
   };

   export const createProduct = (productData) => {
     return axios.post(${apiUrl}/products, productData);
   };

