'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

interface WrapperProps {
  children: ReactNode
}

const QueryWrapper = ({children}:WrapperProps) => {
    const [queryClient] = useState(()=> new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default QueryWrapper
