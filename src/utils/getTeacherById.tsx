import axios from 'axios';
import { API_ENDPOINTS } from '../appConfig';
import { toast } from 'react-toastify';

// export const getTeacherById = async (teacherId:any) => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await axios.get(`${API_ENDPOINTS.GETTEACHERBYID}/${teacherId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });


//     if ('error' in response.data) {
//       return null;
//     }

//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
//       localStorage.removeItem('token');
//           localStorage.removeItem('tokenTimestamp');
//           localStorage.removeItem('nickName');
//           localStorage.removeItem('teacher_id');
//           localStorage.removeItem('user');
//           localStorage.removeItem('id');
//           localStorage.removeItem('score');
//           localStorage.removeItem('par');
//       toast.error("Session expired. Please log in again.");
//     } else {
//       toast.error("An error occurred. Please try again.");
//     }
//   }
// };
