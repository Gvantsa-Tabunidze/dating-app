import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instant date",
  description: "Dating app",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
      </body>
    </html>
  );
}
