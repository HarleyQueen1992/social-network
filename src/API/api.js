import axios from "axios"
import { search } from "../utils/search"

axios.defaults.withCredentials = true

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://mosset.herokuapp.com/api/v1`,
  //  baseURL: `https://social-network-api-1.herokuapp.com/api/1.0`,
  //  baseURL: `https://mosset.pagekite.me/api/1.0`,
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
    return search(`users/?term=${term}&page=${currentPage}`)
  },
  searchFriends(term, currentPage) {
    return search(`users/?term=${term}&page=${currentPage}&friend=true`)
  },
}

export const authAPI = {
  getAuthMe() {
    return instance.get(`/profile/`).then(response => {
      return response.data
    })
    .catch(response => response.response.data)
  },
  loginIn(email, password) {

    return instance.put(`auth/`, { email, password }).then(response => {
      
      return response.data
    })
    .catch(response => response.data)
  },
  logOut() {
    return instance.delete(`auth/`)
  },
}

export const profileAPI = {
  getProfile(id) {
    return instance.get(`profile/`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },


  updateStatus(status) {
    return instance.put(`/profile/status/`, { status })
  },
  saveProfileInfo(profileInfo) {
    return instance.put(`/profile/`, profileInfo)
  },
  updateProfileAvatar(photoFile) {
    const formData = new FormData()
    formData.append("avatar", photoFile)

    return instance.put(`/profile/avatar/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  updateProfileInfo(birthday, location) {
    return instance.patch('/profile', {birthday, location}).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  updateProfileBanner(bannerFile) {
    const formData = new FormData()
    formData.append("banner", bannerFile)

    return instance.put(`/profile/banner/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(response => {
      return response.data
    }).catch(response => {
      return response.data
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
