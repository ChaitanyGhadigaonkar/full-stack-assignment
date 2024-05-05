import axios from "axios"
import toast from "react-hot-toast"

const host = "http://localhost:5500"

const useFetch = async (endpoint, method, body) => {
  const url = `${host}${endpoint}`
  const headers = {
    "Content-Type": "application/json",
  }

  try {
    if (method === "get" || method === "delete") {
      const response = await axios({
        method,
        url,
        headers,
        withCredentials: true,
      })
      return response.data
    }

    if (method === "post" || method === "put") {
      const response = await axios({
        method,
        url,
        data: JSON.stringify(body),
        headers,
        withCredentials: true,
      })

      return response.data
    }

    if (method === "delete") {
      const response = await axios({
        method: "delete",
        url,
        headers,
        withCredentials: true,
      })
      return response.data
    }
  } catch (error) {
    toast.error(error.response.data.error)
    console.log(error)
  }
}

export default useFetch
