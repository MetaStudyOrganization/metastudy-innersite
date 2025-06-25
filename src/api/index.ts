import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER,
    withCredentials: true,
    headers: {
        'ngrok-skip-browser-warning': 'true',
    },
});

// axiosInstance.interceptors.response.use(
//     (res) => res,
//     async (error) => {
//         if (error.response?.status === 401) {
//             try {
//                 const refreshRes = await axios.post(
//                     `${import.meta.env.VITE_BACK_URL}/member/refresh`,
//                     {},
//                     { withCredentials: true }
//                 );

//                 const newAccessToken = refreshRes.data.accessToken;

//                 const setIsLoggedIn = useAuthStore(
//                     (state) => state.setIsLoggedIn
//                 );
//                 const setUserImg = useAuthStore((state) => state.setUserImg);
//                 setIsLoggedIn(true);
//                 setUserImg(refreshRes.data.imgUrl);

//                 // eslint-disable-next-line no-param-reassign
//                 error.config.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return await axiosInstance(error.config);
//             } catch (refreshError) {
//                 const setIsLoggedIn = useAuthStore(
//                     (state) => state.setIsLoggedIn
//                 );
//                 setIsLoggedIn(false);
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
