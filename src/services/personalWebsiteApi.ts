import axios from 'axios'

const baseUrl = import.meta.env.VITE_PERSONAL_WEBSITE_SERVICE

const axiosInstance = axios.create()

export const fetchWork = () => {
    return axiosInstance.get(`${baseUrl}/api/v1/work`)
}
