import React from 'react'

const layout = ({children}:Readonly<{children:React.ReactNode}>) => {
    return (
        <div className="flex min-h-screen w-full">
            <main className="flex-1 flex flex-col">
                <div className="p-4">
                    {children}
                </div>
            </main>
        </div> 
    )
}

export default layout