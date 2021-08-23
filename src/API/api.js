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
    return instance.get(`profile/following/?limit=${limit}`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  followers(limit) {
    return instance.get(`profile/followers/?limit=${limit}`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  usersFollowing(login, limit) {
    return instance.get(`/users/${login}/following/?limit=${limit}`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  usersFollowers(login, limit) {
    return instance.get(`/users/${login}/followers/?limit=${limit}`).then(response => {
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
    return instance.patch('/profile/', {birthday, location}).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  updateTheme(theme) {
    return instance.patch('/profile/', {theme}).then(response => {
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
      `profile/following/?page=${currentPage}&limit=${pageSize}`
    ).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  
    getFriends(currentPage, pageSize) {
      return instance.get(
        `profile/following/?page=${currentPage}&limit=${pageSize}`,
      ).then(response => {
        return response.data
      }).catch(response => {
        return response.data
      })
    },
    searchFriends(term, currentPage, limit) {
      return search(`profile/following/?q=${term}&page=${currentPage}&limit=${limit}`).then(response => {
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
    return instance.get(`profile/followers/?page=${page}&limit=${limit}`).then(response => {

      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  searchFollowers(q, page, limit) {
    return search(`profile/followers/?q=${q}&page=${page}&limit=${limit}/`).then(response => {

      return response
    }).catch(error => {
      return error.response.data
    })
  },
  userFollowers(login,page, limit) {
    return instance.get(`/users/${login}/followers/?page=${page}&limit=${limit}`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  searchUserFollowers(login,page, limit, q) {
    return search(`/users/${login}/followers/?q=${q}&page=${page}&limit=${limit}`).then(response => {
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
    return instance.delete(`profile/following/${login}/`).then(response => {
      return response
    }).catch(response => {
      return response
    })
  },
  followed(login) {
    return instance.get(`profile/following/${login}/`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  
  subscribe(login) {
    return instance.put(`profile/following/${login}/`).then(response => {
      return response
    }).catch(response => {
      return response
    })
  },
}

export const postsAPI = {
  createPost(title, body, attachments) {
    const formData = new FormData()
    for (let img of attachments) {
      formData.append("attachments", img)
    }
     
      formData.append('title', title)
      formData.append('body', body)
    
    return instance.post(`posts/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }).then(response => {
      return response.data
    }).catch(response => {
      return response
    })
  },
  updatePost(title, body, attachments, id) {
    if (attachments) {
      const formData = new FormData()
      for (let img of attachments) {
        formData.append("attachments", img)
      }
       
        formData.append('title', title)
        formData.append('body', body)
      
      return instance.patch(`posts/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then(response => {
        return response.data
      }).catch(response => {  
        return response
      })
    } else {
      return instance.patch(`posts/${id}/`, {title, body}).then(response => {
        return response.data
      }).catch(response => {
        return response
      })
    }
      
     
    
  },
  getPosts(limit, page, q) {
    return instance.get(`/profile/posts/?page=${page}&limit=${limit}&q=${q}`).then(response => {
      return response.data
    }).catch(response => {
      return response
    })
  },
  
  getAllPosts(limit, page, q) {
    return instance.get(`/posts/?page=${page}&limit=${limit}&q=${q}`).then(response => {
      return response.data
    }).catch(response => {
      return response
    })
  },
  getUserPosts(login, limit, page) {
    return instance.get(`users/${login}/posts/?page=${page}&limit=${limit}`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  deletePost(postId) {
    return instance.delete(`/posts/${postId}/`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  likePost(postId) {
    return instance.put(`/profile/liked/${postId}/`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  unlikePost(postId) {
    return instance.delete(`/profile/liked/${postId}/`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  }
}
export const bansAPI = {
  banUser(login, reason) {
    return instance.put(`/bans/${login}/`, {reason}).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  unblockUser(login) {
    return instance.delete(`/bans/${login}/`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  getBanUser(login) {
    return instance.get(`/bans/${login}/`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },

}