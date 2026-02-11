
import { AuthError, Session, User } from "@supabase/supabase-js";





export interface authState {
    user:User | null
    loading: boolean
    signUp:(email:string, password:string)=>Promise<{
        success: boolean
        data?:{
            user: User | null
            session: Session |null
        },
        error?: AuthError | null
    }>
    signIn:(email:string, password:string)=>Promise<{
        success: boolean
        data?:{
            user: User | null
            session: Session |null
        },
        error?: AuthError | null
    }>
    signOut:()=>Promise<void>
    setUser:(user:User |null)=>void
    setLoading:(val:boolean)=> void
}

