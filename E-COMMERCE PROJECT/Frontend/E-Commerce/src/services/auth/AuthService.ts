import axios from "axios";

const BASE_URL = "http://localhost:8001/api/auth/admin";
const LOGIN = "/login";
const FORGOT_PASSWORD = "/forgot-password";
const VERIFY_OTP = "/verify-otp";
const NEW_PASSWORD = "/new-password";

export const loginAdmin = async (data: any) => {
    try {
        const res = await axios.post(BASE_URL + LOGIN, data);

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Admin Login Failed");
        console.log("Error : ", error);
    }
}

export const forgotPasswordAdmin = async (email: string) => {
    try {

        const res = await axios.post(BASE_URL + FORGOT_PASSWORD, { email });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Admin Forgot Password Failed");
        console.log("Error : ", error);
    }
}

export const OTPVerifyAdmin = async (OTP: string) => {
    try {

        const email = sessionStorage.getItem('email') || "";

        const res = await axios.post(BASE_URL + VERIFY_OTP, { email, OTP: Number(OTP) });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Admin Forgot Password Failed");
        console.log("Error : ", error);
    }
}

export const setNewPasswordAdmin = async (new_password: string) => {
    try {

        const email = sessionStorage.getItem('email') || "";

        const res = await axios.post(BASE_URL + NEW_PASSWORD, { email, new_password });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Admin Forgot Password Failed");
        console.log("Error : ", error);
    }
}