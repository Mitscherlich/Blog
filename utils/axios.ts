import axios from 'axios'

export const axiosJson = axios.create({
  headers: {
    Accepts: 'application/json',
  },
})

axiosJson.interceptors.response.use((response) => response.data)
