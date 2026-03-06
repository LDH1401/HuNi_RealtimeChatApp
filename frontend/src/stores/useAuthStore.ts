import {create} from 'zustand'
import {toast} from 'sonner'

export const useAuthStore = ((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    signUp: async (username, password, email, firstname, lastname) => {
        try {
            set({loading: true})
            // api
            toast.success("Đăng kí thành công")
        } catch (error) {
            console.error(error);
            toast.error("Đăng kí không thành công")
        } finally{
            set({loading: false})
        }
    }
}))