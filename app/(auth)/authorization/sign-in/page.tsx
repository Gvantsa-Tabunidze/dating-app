import { Input } from "@/components/ui/input"
import Link from "next/link"


const page = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold text-xl">Welcome to Dating app!</h1>
      <h2>Sign in or <Link href='/authorization/sign-up' className="text-blue-500">Create an account</Link></h2>
        <form className="flex flex-col gap-2">
          <Input placeholder="Email" />
          <Input placeholder="Password" />
        </form>
    </div>
  )
}

export default page