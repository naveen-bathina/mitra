// // src/hooks/useFetchServices.js
// import { useEffect, useState } from 'react';
// import { fetchServices } from '../api';

// const useFetchServices = () => {
//     const [services, setServices] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const loadServices = async () => {
//             try {
//                 const data = await fetchServices();
//                 setServices(data);
//             } catch (err) {
//                 setError('Failed to fetch services');
//             }
//         };
//         loadServices();
//     }, []);

//     return { services, error };
// };

// export default useFetchServices;
