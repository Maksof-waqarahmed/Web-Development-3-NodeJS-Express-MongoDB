import axios from "axios";
import { baseURL } from "../constant";

interface RegisterData {
    name: string;
    email: string;
    password: string;
}
export const registerUser = async (userData: RegisterData) => axios.post(baseURL + "/users/register", userData)
