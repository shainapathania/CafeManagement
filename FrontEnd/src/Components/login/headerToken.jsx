import axios from "axios";
import { getToken } from "./Auth";

// export async function saveInfo(regData){
//         try {
//             const response=await axios.post("http://localhost:8080/register",regData);
//             return response.data;
//         } catch (error) {
//             console.log(error);

//         }
//     }

// export function login(regData){

//     try{
//         const response = axios.post("http://localhost:8080/login/user",regData,{headers:{'Authorization':Bearer ${getToken()}}});
//         return response.data;

//     }catch(error){
//         console.log(error);
//     }
// }
// // //for update company detalis
// // export const updatecompany = async (userId, updatedUser ) => {
// //     try {

// //         console.log(userId);
// //         console.log(updatedUser);

// //         const form = new FormData();
// //      form.append("companyName", updatedUser?.companyName )

// //         const response=await axios.put(http://localhost:8090/updatecompany/${userId},updatedUser);

// //         return response.data;
// //     } catch (error) {
// //         console.log(error);
// //     }
// // }

// export const updatecompany = async (userId, updatedUser) => {
//     try {
//       console.log("called");
//       const response = await axios.put(http:localhost:8086/company/updateCompanyByUserId/${userId}, updatedUser/*, {headers:{'Authorization':Bearer ${getToken()}
//     }}*/);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   };

// export const findcompany = async (userId) => {
//     console.log(userId);
//     try {

//       const response = await axios.get(
//         http://localhost:8080/company/findcompany/${userId}/*,
//         {
//           headers: {
//             'Authorization': Bearer ${getToken()}
//           }
//         }*/
//       );

//         console.log(userId);
//         return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// }

// //   //for update company detalis
// //   export async function updatecompany(updatedUser, email) {
// //     try {
// //       const response = await axios.put(http://localhost:4880/User/${email},updatedUser);
// //       return response.data;
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }

// ////updateByAdminId

// export async function updateAdmin(userId,updatedUser ) {
//   try {
//     console.log(getToken);
//     const response = await axios.put(http://localhost:8080/admin/updateByAdminId/${userId}, updatedUser/*, {
//       headers: {
//         'Authorization': Bearer ${localStorage.getItem('token')}
//       }
//     }*/);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// // var tk=localStorage.getItem("token")

// export async function getAdminByUserId(userId) {
//   try {
//     const response = await axios.get(http://localhost:8080/admin/getoneAdmin/${userId}/*,{
//       headers: {
//         'Authorization': Bearer ${getToken()}
//       }
//     }*/
//      );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

//   export async function fetchcompanybyid(user_id) {
//     try {
//       const response = await axios.get(http://localhost:8080/User/${user_id});
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   export async function fetchStudentByid(userId) {
//     try {
//       const response = await axios.get(http://localhost:8080/getByUserId/${userId});
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   export async function updateStudent(updatedUser, userId) {
//     try {
//       console.log("Inside update:", userId);
//       console.log("Inside update:", updatedUser);
//       const response = await axios.put(http://localhost:8080/updateByUserId/${userId},updatedUser);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // export const findcompany = async (userId) => {
//   //   console.log(userId);
//   //   try {

//   //       const response=await axios.get(http://localhost:8090/findcompany/${userId});
//   //       console.log(userId);
//   //       return response.data;
//   //   } catch (error) {
//   //       console.log(error);

//   // JOB API
// //http://localhost:8080/jobcompany/20
//   export async function saveJob(regData){
//     try {
//         const response=await axios.post(http://localhost:8080/create,regData);
//         return response.data;
//     } catch (error) {
//         console.log(error);

//     }
// }
