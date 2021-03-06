import axios from "axios";

const state = {
    user_token: localStorage.getItem("auth") || null,
    user: {},
    user_message: [],
    unverified_email: ""
};
const getters = {
    current_user: state => state.user,
    is_login: state => state.user_token,
    alert_users: state => state.user_message,
    email_to_verify: state => state.unverified_email
};
const actions = {
    closeAlert: ({ commit }) => commit("clearAlert"),
    showAlert: ({ commit }, content) => {
        // content.message & content.error
        commit("setAlert", content);
    },
    registerUser: async ({ commit }, user) => {
        const result = await axios
            .post("/register", {
                name: user.username,
                email: user.email,
                password: user.password,
                password_confirmation: user.confirm
            })
            .then(res => {
                const alert = [
                    {
                        message: res.data.message,
                        error: 0
                    },
                    {
                        message: "we sent email verification",
                        error: 0
                    }
                ];
                commit("setAlert", alert);
                return res.data;
            })
            .catch(err => {
                return err.response.data;
            });
        return result;
    },
    loginUser: async ({ commit }, user) => {
        const result = await axios.post('/login', {
            email: user.email,
            password: user.password
        })
            .then(res => {
                const login_user = {};
                login_user.token = res.data.access_token;
                login_user.email = user.email;
                commit("setUser", login_user);
                localStorage.setItem("auth", login_user.token);
                return res;
            })
            .catch(err => {
                // alert(err)
                return err.response;
            })
        return result;
    },
    logoutUser: async ({ commit, rootState }) => {
        return await axios.get(`/logout`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${rootState.users.user_token}`
            }
        })
            .then(res => {
                localStorage.removeItem("auth");
                commit("removeUsersData");
                return res.data;
            })
            .catch(err => {
                return err.response;
            })

    },
    getUserInfo: async ({ commit, state }) => {
        if (state.user_token) {
            axios.get(`/user`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${state.user_token}`
                }
            })
                .then(res => {
                    const user = {}
                    user.token = state.user_token;
                    user.id = res.data.id;
                    user.email = res.data.email;
                    user.username = res.data.name;
                    commit("setUser", user);
                    // console.log("getting user info");
                })
                .catch(err => {
                    alert(err.response.data.message);
                })

        }
    },
    getAccountInfo: async ({ commit, state }) => {
        await axios.get(`/user/account`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${state.user_token}`
            }
        })
            .then(res => {
                const user = res.data;
                user.token = state.user_token;
                commit("setUser", user);
                // console.log("getting user info");
            })
            .catch(err => {
                alert(err.response.data.message);
            });
    },
    unverifiedEmail: async ({ commit }, email) => {
        commit("setUnverifiedEmail", email);
    },
};
const mutations = {
    setUser: (state, user) => {
        state.user_token = user.token; // set user token
        state.user = user;
    },
    removeUsersData: (state) => {
        state.user_token = null;
        state.user = {}
    },
    clearAlert: (state) => {
        state.user_message = [];
    },
    setAlert: (state, alert) => {
        state.user_message = [];
        if (alert.constructor == Object) {
            state.user_message.push(alert);
        } else {
            state.user_message = alert;
        }

    },
    setUnverifiedEmail: (state, email) => state.unverified_email = email
};
export default {
    state,
    getters,
    actions,
    mutations
};
