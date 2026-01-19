import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";


const layout = ({children}: Readonly<{children:React.ReactNode}>) => {
  return (
     <SidebarProvider>
           <div className="flex min-h-screen w-full">
                <Sidebar/>
                <main className="flex-1 flex flex-col">
                    <Header />
                    <div className="p-4">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
  )
}

export default layout