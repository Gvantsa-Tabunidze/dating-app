import React, { useEffect, useState } from 'react'

const AvatarPreview = ({file}:{file:File}) => {
    const [preview, setPreview] = useState<string>('')
    useEffect(()=>{
        const imgURL = URL.createObjectURL(file)
        setPreview(imgURL)

        return ()=>{
            URL.revokeObjectURL(imgURL)
        }

    },[file])

  return (
     <div className="mt-4">
      <img
        src={preview}
        className="h-40 w-40 rounded-full object-cover border"
        alt="preview"
      />
    </div>
  )
}

export default AvatarPreview
