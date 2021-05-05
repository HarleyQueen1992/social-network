import axios from "axios"

axios.defaults.withCredentials = true

const instance = axios.create({
  withCredentials: true,
  // baseURL: `https://social-network.samuraijs.com/api/1.0`,
  baseURL: `https://social-network-api-1.herokuapp.com/api/1.0`,
  // baseURL: 'https://15ceffe2a08d.ngrok.io/api/1.0'
  // baseURL: `https://5cf77382dbb5.ngrok.io/api/1.0`,
  // headers: {
  //     "API-KEY": "505604b6-4616-49b3-a97c-c92fd8b13d58"
  // }
})

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users/?page=${currentPage}&count=${pageSize}`)
      .then(response => {
        return response.data
      })
  },
  // deleteFollow(id) {
  //     return instance.delete(`follow/${id}/`)
  // },
  // postFollow(id) {
  //     return instance.post(`follow/${id}/`)
  // },
  searchUsers(term, currentPage) {
    return instance
      .get(`users/?term=${term}&page=${currentPage}`)
      .then(response => {
        return response.data
      })
  },
  searchFriends(term, currentPage) {
    return instance
      .get(`users/?term=${term}&page=${currentPage}&friend=true`)
      .then(response => {
        return response.data
      })
  },
}

export const authAPI = {
  getAuthMe() {
    return instance.get(`auth/me/`).then(response => {
      return response.data
    })
  },
  loginIn(email, password, rememberMe = false) {
    return instance.post(`auth/login/`, { email, password, rememberMe })
  },
  logOut() {
    return instance.delete(`auth/login/`)
  },
}

export const profileAPI = {
  getProfile(id) {
    return instance.get(`profile/${id}/`)
  },
  getStatus(userId) {
    return instance.get(`/profile/status/` + userId)
  },
  updateStatus(status) {
    return instance.put(`/profile/status/`, { status })
  },
  saveProfileInfo(profileInfo) {
    return instance.put(`/profile/`, profileInfo)
  },
  savePhoto(photoFile) {
    const formData = new FormData()
    formData.append("image", photoFile)

    return instance.put(`/profile/photo/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  // getFollow(id) {
  //     return instance.get(`/follow/${id}`)
  // }
}

export const friendsAPI = {
  getFriends(currentPage = 1, pageSize = 6) {
    return instance.get(
      `users/?friend=true&page=${currentPage}&count=${pageSize}`
    )
    // .then(response => {
    //     return response.data;
    // })
  },
  getAllFriends() {
    return instance.get(`users/?friend=true&count=100`)
  },
}
// export const getUsers = (currentPage = 1, pageSize = 10) => {
//     debugger;
//     return instance.get(`users?page=${currentPage}&count=${pageSize}`)
//         .then(response => {
//             return response.data;
//         })
// }
export const followAPI = {
  getFollow(id) {
    return instance.get(`/follow/${id}`)
  },
  deleteFollow(id) {
    return instance.delete(`follow/${id}/`)
  },
  postFollow(id) {
    return instance.post(`follow/${id}/`)
  },
}
