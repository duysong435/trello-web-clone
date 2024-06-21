import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  // withCredentials: true
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // gắn token vào header
    let accessToken =
      window.localStorage.getItem('persist:auth') &&
      JSON.parse(
        window.localStorage.getItem('persist:auth'),
      )?.accessToken.slice(1, -1)
    let refreshToken =
      window.localStorage.getItem('persist:auth') &&
      JSON.parse(
        window.localStorage.getItem('persist:auth'),
      )?.refreshToken.slice(1, -1)
    let userId =
      window.localStorage.getItem('persist:auth') &&
      JSON.parse(window.localStorage.getItem('persist:auth'))?.userId.slice(
        1,
        -1,
      )
    config.headers = {
      authorization: accessToken ? accessToken : null,
      'x-client-id': userId ? userId : null,
      'x-rtoken-id': refreshToken ? refreshToken : null,
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use((response) => {
  return response.data
})

export default instance
