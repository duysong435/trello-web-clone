import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL
  // withCredentials: true
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  // gắn token vào header
  let token = window.localStorage.getItem('persist:auth') && JSON.parse(window.localStorage.getItem('persist:auth'))?.token?.slice(1, -1)
  config.headers = {
    authorization: token ? `Bearer ${token}` : null
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(
  (response) => {
    const { data } = response
    return response.data
  }
)

export default instance
