import api from "@lib/axios"

export const authService = {
    signUp: async (
        username: string,
        password: string,
        email: string,
        firstname: string,
        lastname: string
    ) => {
        const res = await api.post(
            "/auth/signup",
            {username, password, email, firstname, lastname},
            {withCredentials: true}
        )
        return res.data
    }
}

