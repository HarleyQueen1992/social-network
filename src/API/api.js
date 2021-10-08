import axios from "axios"

//? Utils 
import { search } from "../utils/search"

let axiosConfig = {
  baseURL: `https://mosset.herokuapp.com/api/v1`,

}

if (localStorage.getItem('accessToken')) {
  axiosConfig.headers = {'Authorization': 'Bearer '+ localStorage.getItem('accessToken')}  
}

export const axiosInstance = axios.create(axiosConfig)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
        const refresh_token = localStorage.getItem('refreshToken');
        delete axiosInstance.defaults.headers['Authorization'];

        return axiosInstance
            .post('/token/refresh/', {refresh: refresh_token})
            .then((response) => {

                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);

                axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                originalRequest.headers['Authorization'] = "Bearer " + response.data.access;

                return axiosInstance(originalRequest);
            })
    }
    return Promise.reject(error);
}
);
export const usersAPI = {
  getUsers(pageNumber, pageSize) {
    return axiosInstance
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
    return axiosInstance.get(`users/${login}/following/`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },

}

export const authAPI = {
  getAuthMe() {
    return axiosInstance.get(`/profile/`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
  })
  },
  loginIn(email, password) {
    return axiosInstance.post(`token/`, { email, password }).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })  
  },
  register(email, login, password1, password2, aboutMe, birthday, location) {
    return axiosInstance.post(`/users/`, {email, login, password1, password2, aboutMe, birthday, location}).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  verification(code) {
    return axiosInstance.post(`/verification/`, {code}).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  logOut() {
    return axiosInstance.delete(`auth/`)
  },
}

export const profileAPI = {
  getProfile() {
    return axiosInstance.get(`profile/`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  getUsersProfile(login) {
    return axiosInstance.get(`/users/${login}/`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },

  following(limit) {
    return axiosInstance.get(`profile/following/?limit=${limit}`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  followers(limit) {
    return axiosInstance.get(`profile/followers/?limit=${limit}`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  usersFollowing(login, limit) {
    return axiosInstance.get(`/users/${login}/following/?limit=${limit}`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  usersFollowers(login, limit) {
    return axiosInstance.get(`/users/${login}/followers/?limit=${limit}`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },

  saveProfileInfo(profileInfo) {
    return axiosInstance.put(`/profile/`, profileInfo)
  },
  
  updateProfileAvatar(photoFile) {
    const formData = new FormData()
    formData.append("avatar", photoFile)

    return axiosInstance.put(`/profile/avatar/`, formData, {
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
    return axiosInstance.patch('/profile/', { aboutMe }).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  updateFullName(fullname) {
    return axiosInstance.patch('/profile/', { fullname }).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  updateStatus(status) {
    return axiosInstance.patch('/profile/', { status }).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  updateProfileInfo(birthday, location) {
    return axiosInstance.patch('/profile/', {birthday, location}).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  updateTheme(theme) {
    return axiosInstance.patch('/profile/', {theme}).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  updateProfileBanner(bannerFile) {
    const formData = new FormData()
    formData.append("banner", bannerFile)
    return axiosInstance.put(`/profile/banner/`, formData, {
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
    return axiosInstance.put(
      `/profile/password/`, {oldPassword, newPassword1, newPassword2}
    ).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  }
  // getFollow(id) {
  //     return axiosInstance.get(`/follow/${id}`)
  // }
}
 
export const friendsAPI = {
  followings(currentPage, pageSize) {
    return axiosInstance.get(
      `profile/following/?page=${currentPage}&limit=${pageSize}`
    ).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  
    getFriends(currentPage, pageSize) {
      return axiosInstance.get(
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
      return axiosInstance.get(`/users/${login}/following/?page=${page}&limit=${limit}`).then(response => {
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
    return axiosInstance.get(`profile/followers/?page=${page}&limit=${limit}`).then(response => {

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
    return axiosInstance.get(`/users/${login}/followers/?page=${page}&limit=${limit}`).then(response => {
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
//     return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
//         .then(response => {
//             return response.data;
//         })
// }
export const followAPI = {
  unsubscribe(login) {
    return axiosInstance.delete(`profile/following/${login}/`).then(response => {
      return response
    }).catch(response => {
      return response
    })
  },
  followed(login) {
    return axiosInstance.get(`profile/following/${login}/`).then(response => {
      return response.data
    }).catch(response => {
      return response.data
    })
  },
  
  subscribe(login) {
    return axiosInstance.put(`profile/following/${login}/`).then(response => {
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
    
    return axiosInstance.post(`posts/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }).then(response => {
      return response.data
    }).catch(response => {
      return response
    })
  },
  getSpecifiedPost(postId) {
    return axiosInstance.get(`/posts/${postId}/`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
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
      
      return axiosInstance.patch(`posts/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then(response => {
        return response.data
      }).catch(response => {  
        return response
      })
    } else {
      return axiosInstance.patch(`posts/${id}/`, {title, body}).then(response => {
        return response.data
      }).catch(response => {
        return response
      })
    }
      
     
    
  },
  getPosts(limit, page, q, ordering) {
    return axiosInstance.get(`/profile/posts/?page=${page}&limit=${limit}&q=${q}&ordering=${ordering}`).then(response => {
      return response.data
    }).catch(error => {
      return  error.response.data
    })
  },
  
  getAllPosts(limit, page, q, ordering) {
    return axiosInstance.get(`/posts/?page=${page}&limit=${limit}&q=${q}&ordering=${ordering}`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  getUserPosts(login, limit, page, ordering) {
    return axiosInstance.get(`users/${login}/posts/?page=${page}&limit=${limit}&ordering=${ordering}`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  deletePost(postId) {
    return axiosInstance.delete(`/posts/${postId}/`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  likePost(postId) {
    return axiosInstance.put(`/profile/liked/${postId}/`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  unlikePost(postId) {
    return axiosInstance.delete(`/profile/liked/${postId}/`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  }
}
export const bansAPI = {
  banUser(login, reason) {
    return axiosInstance.put(`/bans/${login}/`, {reason}).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  unblockUser(login) {
    return axiosInstance.delete(`/bans/${login}/`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  getBanUser(login) {
    return axiosInstance.get(`/bans/${login}/`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },

}
export const newsAPI = {
  getNews(limit, page, q) {
    return axiosInstance.get(`/news/?page=${page}&limit=${limit}&q=${q}`).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  }
}