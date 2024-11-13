// import axios from "axios";
// import { API_ENDPOINTS } from "../appConfig";

// export const getAllTeams = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const headers:any= {}
//       let endpoint = API_ENDPOINTS.GETALLTEAMS;

//       if (token && token !== null)  {
//         headers["Authorization"] = `Bearer ${token}`;
//       }
      
//       const response = await axios.get(endpoint, {
//         headers,
//       });
//       console.log(response.data);
//       (response.data);
//     } catch (error) {
//       throw error; 
//     }
//   };