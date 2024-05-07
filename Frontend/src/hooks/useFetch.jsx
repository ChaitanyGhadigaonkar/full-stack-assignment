import axios from "axios"
import toast from "react-hot-toast"

const host = "http://localhost:5500"

const useFetch = async (endpoint, method, body) => {
  const url = `${host}${endpoint}`
  axios.defaults.withCredentials = true
  const headers = {
    "Content-Type": "application/json",
  }

  try {
    if (method === "get" || method === "delete") {
      const response = await axios({
        method,
        url,
        headers,
      })
      return response.data
    }

    if (method === "post" || method === "put") {
      const response = await axios({
        method,
        url,
        data: JSON.stringify(body),
        headers,
      })

      return response.data
    }

    if (method === "delete") {
      const response = await axios({
        method: "delete",
        url,
        headers,
      })
      return response.data
    }
  } catch (error) {
    toast.error(error.response.data.error)
    console.log(error)
  }
}

export default useFetch
