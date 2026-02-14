'use client'
import { useEffect } from "react"
import useAuthStore from "./useAuthStore"
import { supabase } from "@/api/supabaseClient"


interface IAuthProviderProps {
    children: React.ReactNode
}



const AuthProvider = ({children}:IAuthProviderProps) => {
    const setUser = useAuthStore((state)=>state.setUser)
    const setLoading = useAuthStore((state)=> state.setLoading)

    useEffect(()=>{
        //get session
        supabase.auth.getSession().then(({data})=>{
            
            setUser(data.session?.user ?? null)
            setLoading(false)
        })

        //listen for state changes
        const {data:listener} = supabase.auth.onAuthStateChange((_event, session)=>{
            setUser(session?.user ?? null)
        })

        //clean up listenet
        return ()=>{
            listener.subscription.unsubscribe()
        }
    },[setUser, setLoading])

  return (
    <div>
      {children}
    </div>
  )
}

export default AuthProvider
