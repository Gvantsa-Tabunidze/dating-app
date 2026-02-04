import { supabase } from "@/lib/supabaseClient"

const CheckEmailExists = async (email:string) => {
  const {data, error} = await supabase
  .from("users")
  .select("id")
  .eq("email", email)
  .single()

  if (error) {
    console.error("Supabase error:", error)
    throw new Error("Unable to check email")
  }
  return !!data
}

export default CheckEmailExists
