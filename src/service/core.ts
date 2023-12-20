import axios, { AxiosInstance, AxiosRequestConfig } from "axios";



const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});


const api = (axios: AxiosInstance) => {
  return {
    get<T>(url: string, config?: AxiosRequestConfig) {
      return axios.get<T>(url, config);
    },
  };
};

export default api(instance);
