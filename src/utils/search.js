import axios from "axios"

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network-api-1.herokuapp.com/api/1.0`,
})

export const truncStr = (string, limit) => {
  return string.length > limit
    ? string
        .trim()
        .substring(0, limit - 3)
        .trim() + "..."
    : string
}

const resources = {}

const makeRequestCreator = () => {
  let cancel

  return async query => {
    if (cancel) {
      // Cancel the previous request before making a new request
      cancel.cancel()
    }
    // Create a new CancelToken
    cancel = axios.CancelToken.source()
    try {
      if (resources[query]) {
        // Return result if it exists
        return resources[query]
      }
      const res = await instance.get(query, { cancelToken: cancel.token })

      const result = res.data
      // Store response
      resources[query] = result

      return result
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        console.log("Request canceled", error.message)
      } else {
        // Handle usual errors
        console.log("Something went wrong: ", error.message)
      }
    }
  }
}

export const search = makeRequestCreator()
