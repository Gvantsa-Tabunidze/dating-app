import Link from "next/link"
import NotificationBell from "./NotificationBell"
import ModeToggle from "./ModeToggle"
import Search from "./Search"

const Header = () => {
  return (
     <div className="flex">
            <nav
                className="sticky top-0 w-full border-b bg-background/95 z-50 flex items-center justify-between px-40 py-2">
                <Link href="/">Logo</Link>
                <div className="flex items-center justify-between gap-5">
                    <div className="flex items-start gap-2">
                        <Search/>
                        <NotificationBell/>
                        <ModeToggle/>
                    </div>
                </div>
            </nav>
        </div>
  )
}

export default Header