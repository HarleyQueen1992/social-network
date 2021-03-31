import axios from "axios";

axios.defaults.withCredentials = true

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0`,
    headers: {
        "API-KEY": "505604b6-4616-49b3-a97c-c92fd8b13d58"
    }



})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },
    deleteFollow(id) {
        return instance.delete(`follow/${id}`)
    },
    postFollow(id) {
        return instance.post(`follow/${id}`)
    },
    searchUsers(term) {
        return instance.get(`users?term=${term}`)
            .then(response => {
                return response.data
            })
    }
}

export const authAPI = {
    getAuthMe() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            })
    },
    loginIn(email, password) {
        return instance.post(`auth/login?email=${email}&password=${password}`)
            // .then(data => {
            //     debugger
            // })
    },
    logOut() {
        return instance.delete(`auth/login`)
    }
}

export const profileAPI = {
    getProfile(id = 2) {
        return instance.get(`profile/${id}`)

    },
    getStatus(userId = 2) {
        return instance.get(`/profile/status/` + userId)
    },

    updateStatus(status) {
        return instance.put(`/profile/status/`, { status })
    }
}

export const friendsAPI = {
        getFriends(currentPage = 1, pageSize = 5) {
            return instance.get(`users?friend=true&page=${currentPage}&count=${pageSize}`)
                // .then(response => {
                //     return response.data;
                // })
        },
        getAllFriends() {
            return instance.get(`users?friend=true&count=100`)
        }
    }
    // export const getUsers = (currentPage = 1, pageSize = 10) => {
    //     debugger;
    //     return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    //         .then(response => {
    //             return response.data;
    //         })
    // }