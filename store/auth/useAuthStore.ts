import { create } from 'zustand'
import { authState } from './interface'
import { supabase } from "@/api/supabaseClient"


const initialState = {
    user: null,
    loading:true,
    }

 const useAuthStore = create<authState>()((set) => ({
  ...initialState,
  signUp: async (email, password)=> {
    set({loading:true})
    const {error, data} = await supabase.auth.signUp({
      email,
      password
    })
    if (!error && data?.user) {
    set({ user: data.user, loading: false }) 
    return {success: true, error: null, data}   
    }
    return {success: false, error: error, data:undefined} 
  },
  signIn: async (email, password)=> {
    const {error, data} = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (!error && data?.user) {
    set({ user: data.user, loading: false }) 
    return {success: true, error: null, data}   
  }
  return {success: false, error: error, data:undefined} 
  },
  signOut: async()=>{
    const {error} = await supabase.auth.signOut()
    if(error) throw error
  }, 
  setUser:(user)=> set({
    user
  }),
  setLoading:(value)=>set({loading:value})
}))

export default useAuthStore