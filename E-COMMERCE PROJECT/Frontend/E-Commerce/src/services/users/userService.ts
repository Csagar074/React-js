import axios from "axios";
import type { userForm } from "../../Pages/Users/AddUserPage";
import type { userEditForm } from "../../Pages/Users/EditUserPage";

const BASE_URL = "http://localhost:8000/api/user";
const AUTH_ADD_USER = "http://localhost:8000/api/auth/user/register";

export const getAuthToken = () => {
    return localStorage.getItem('authAdminToken') || "";
}


export const fetchAllUsers = async () => {
    try {
        const res = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Fetch All Users Failed");
        console.log("Error : ", error);
    }
}

export const addUser = async (body: userForm) => {
    try {


        const formData = new FormData();

        formData.append('first_name', body.first_name);
        formData.append('last_name', body.last_name);
        formData.append('email', body.email);
        formData.append('password', body.password);
        formData.append('phone', body.phone);
        formData.append('gender', body.gender);
        formData.append('address', body.address);

        if (body.profile_image !== null) {
            formData.append('profile_image', body.profile_image);
        }

        const res = await axios.post(AUTH_ADD_USER,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Add User Failed");
        console.log("Error : ", error);
    }
}

export const deleteSingleUser = async (id: string) => {
    try {

        const res = await axios.delete(BASE_URL + `?id=${id}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Delete Admin Failed");
        console.log("Error : ", error);
    }
}

export const fetchSingleUser = async (id: string) => {
    try {
        const res = await axios.get(BASE_URL + `/${id}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Fetch Single Admin Failed");
        console.log("Error : ", error);
    }
}

export const updateUser = async (body: userEditForm) => {
    try {

        const formData = new FormData();

        formData.append('first_name', body.first_name);
        formData.append('last_name', body.last_name);
        formData.append('email', body.email);
        formData.append('phone', body.phone);
        formData.append('gender', body.gender);
        formData.append('address', body.address);


        if (typeof (body.profile_image) !== "string") {
            formData.append('profile_image', body.profile_image);
        }

        const res = await axios.patch(BASE_URL + `?id=${body._id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Update User Failed");
        console.log("Error : ", error);
    }
}

export const userActiveOrInactive = async (id: string) => {
    try {
        const res = await axios.put(BASE_URL + `?id=${id}`, {},
            {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Active Or Inactive Admin Failed");
        console.log("Error : ", error);
    }
}