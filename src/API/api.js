import axios from "axios"
import { loginIn } from "../redux/AuthReducer/auth-reducer"
import { search } from "../utils/search"

axios.defaults.withCredentials = true

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://mosset.herokuapp.com/api/v1`,
  //  baseURL: `https://social-network-api-1.herokuapp.com/api/1.0`,
  //  baseURL: `https://mosset.pagekite.me/api/1.0`,
 })

export const usersAPI = {
  getUsers(pageNumber, pageSize) {
    return instance
      .get(`users/?page=${pageNumber}&limit=${pageSize}`)
      .then(response => {
        return response.data
      }).catch(response => {
        return response.data
      })
  },

  searchUsers(q, page) {
    return search(`users/?q=${q}&page=${page}`).then(response => {
      return response
    }).catch(response => {
      return response
    })
  },

  getUsersFollowingAll(login) {
    return instance.get(`users/${login}/following/`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
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
    }).catch(error => {
      return error.response.data
    })  
  },
  register(email, login, password1, password2, aboutMe, birthday, location) {
    return instance.post(`/auth/`, {email, login, password1, password2, aboutMe, birthday, location}).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  logOut() {
    return instance.delete(`auth/`)
  },
}

export const profileAPI = {
  getProfile() {
    return instance.get(`profile/`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  getUsersProfile(login) {
    return instance.get(`/users/${login}`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },

  following(limit) {
    return instance.get(`/following/?limit=${limit}`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  followers(limit) {
    return instance.get(`/followers/?limit=${limit}`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  usersFollowing(login, limit) {
    return instance.get(`/users/${login}/following?limit=${limit}`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  usersFollowers(login, limit) {
    return instance.get(`/users/${login}/followers?limit=${limit}`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
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
  updateAboutMe(aboutMe) {
    return instance.patch('/profile/', { aboutMe }).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  updateFullName(fullname) {
    return instance.patch('/profile/', { fullname }).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  updateStatus(status) {
    return instance.patch('/profile/', { status }).then(response => {
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
  changePassword(oldPassword, newPassword1, newPassword2) {
    return instance.put(
      `/profile/password/`, {oldPassword, newPassword1, newPassword2}
    ).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  }
  // getFollow(id) {
  //     return instance.get(`/follow/${id}`)
  // }
}
export const friendsAPI = {
  followings(currentPage, pageSize) {
    return instance.get(
      `following/?page=${currentPage}&limit=${pageSize}`
    ).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
    getFriends(currentPage, pageSize) {
      return instance.get(
        `following/?page=${currentPage}&limit=${pageSize}`
      ).then(response => {
        return response.data
      }).catch(response => {
        return response.data
      })
    },
    searchFriends(term, currentPage, limit) {
      return search(`following/?q=${term}&page=${currentPage}&limit=${limit}`).then(response => {
        return response
      }).catch(response => {
        return response
      })
    },
    userFollowings(login, page, limit) {
      return instance.get(`/users/${login}/following/?page=${page}&limit=${limit}`).then(response => {
        return response.data
      }).catch(response => {
        return response.data
      })
    },
    searchUserFollowings(login, page, limit, q) {
      return search(`/users/${login}/following/?page=${page}&limit=${limit}&q=${q}`).then(response => {
        return response
      }).catch(response => {
        return response
      })
    },
}
export const followersAPI = {
  followers(page, limit) {
    return instance.get(`/followers?page=${page}&limit=${limit}`).then(response => {

      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  searchFollowers(q, page, limit) {
    return search(`/followers?q=${q}&page=${page}&limit=${limit}/`).then(response => {

      return response
    }).catch(error => {
      return error.response.data
    })
  },
  userFollowers(login,page, limit) {
    return instance.get(`/users/${login}/followers?page=${page}&limit=${limit}`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  searchUserFollowers(login,page, limit, q) {
    return search(`/users/${login}/followers?q=${q}&page=${page}&limit=${limit}`).then(response => {
      return response
    }).catch(error => {
      return error.response.data
    })
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
  unsubscribe(login) {
    return instance.delete(`/following/${login}/`).then(response => {
      return response
    }).catch(response => {
      return response
    })
  },
  followed(login) {
    return instance.get(`following/${login}/`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  
  subscribe(login) {
    return instance.put(`following/${login}/`).then(response => {
      return response
    }).catch(response => {
      return response
    })
  },
}
