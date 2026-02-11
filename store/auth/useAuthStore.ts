import { create } from 'zustand'
import { authState } from './interface'
import { supabase } from "@/api/supabaseClient"
import { AuthError } from '@supabase/supabase-js'

const initialState = {
    user: null,
    loading:true,
    }

 const useAuthStore = create<authState>()((set) => ({
  ...initialState,
  signUp: async (email, password)=> {
    const {error, data} = await supabase.auth.signUp({
      email,
      password
    })
    return error ? {success: false, error, data:undefined} :  {success: true, error: null, data}   
  },
  signIn: async (email, password)=> {
    const {error, data} = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return error ? {success: false, data:undefined, error} : {success: true,  data, error: null};      
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