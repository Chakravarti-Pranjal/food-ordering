import toast from "react-hot-toast";

export const baseUrl = "http://localhost:4000/api/v1";

export const notifySuccess = (msg) => toast.success(msg);
export const notifyError = (msg) => toast.error(msg);
