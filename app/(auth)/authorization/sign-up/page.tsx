
'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import {  useForm } from '@tanstack/react-form'
import { Gender, Interests } from "@/interfaces/enums"
import { Checkbox } from "@/components/ui/checkbox"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Stepper from "@/components/Stepper"
import FetchQuery from "@/TanStackQuery/queries/FetchQuery"

interface formProps {
    email:string
    password: string
    fullname: string
    avatar:File | null
    gender: Gender
    age:string
    country: string
    city:string
    interests: Interests[]
    imgs: File []
}

const steps = ['Account data', 'Peronal info', 'Additional info']




const MultiStepForm = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [step, setStep]= useState(0)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const form = useForm({
        defaultValues:{
            email:'',
            password:'',
            fullname:'',
            avatar: null,
            gender: Gender.Male as Gender,
            age:'',
            country:'',
            city:'',
            interests:[] as Interests[],
            imgs:[] as File[]
        } satisfies formProps,
        onSubmit:({value})=>{
            console.log(value)
        }
    })
   

    // Helper function to validate entire step
    const validateStep = async () => {
    if (step === 0) {
        const emailErrors = await form.validateField('email', 'change')
        console.log(emailErrors)
        const passwordErrors = await form.validateField('password', 'change')

        if (emailErrors.length === 0 && passwordErrors.length === 0) {
        setStep((prev) => prev + 1)
        }
    }
    }


  return (
  <>
    <Stepper currentStep={step} steps={steps}/>
    <>
        <form className='flex flex-col md:min-h-115' onSubmit={(e)=>{
            e.preventDefault(),
            e.stopPropagation(),
            form.handleSubmit()
        }}>
          <div className="flex flex-col items-start flex-1">
            {/* STEP 1 Account data */}
            {step===0 && (
                <div className="space-y-4">
                    <h2>Account data</h2>
                    <form.Field name="email" validators={{
                    onChange:({value})=>
                      !value 
                      ? 'Field is required'
                      : !emailRegex.test(value) 
                      ? 'Invalid email'
                      : undefined,
                     onSubmit: async ({ value }) => {
                        if (!value) return 'Field is required'
                        if (!emailRegex.test(value)) return 'Invalid email'

                        const userExists = await FetchQuery(value)
                        if (userExists) return 'User already exists'
                        },              
                      onBlur: async ({value})=> 
                        !value? 'Field is required'
                        : !emailRegex.test(value)
                        ? 'Invalid email' 
                        : undefined
                    }} 
                    children={(field)=>(
                      <>
                        <Input placeholder="Email" value={field.state.value} onBlur={field.handleBlur} onChange={(e)=>field.handleChange(e.target.value)}/>
                        {field.state.meta.errors.length > 0 && (<p className="text-sm text-red-500">{field.state.meta.errors[0]}</p>)}
                      </>
                    )}/>
                    
                    <form.Field name="password" children={(field)=>(
                        <Input placeholder="Password" value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}/>
                    )}/>
                </div>
                )}
            
            {/* STEP 2 Personal info */}
            {step===1 && (
                <div className="space-y-4">
                     <h2>Personal Info</h2>
                     <form.Field name="fullname" children={(field)=>(
                        <Input placeholder="Full name" value={field.state.value} onChange={(e)=> field.handleChange(e.target.value)} />
                     )}/>
                     <form.Field name="gender" children={(field)=>(
                        <RadioGroup value={field.state.value} onValueChange={(val)=>field.handleChange(val as Gender)} className="flex">
                            <div className="flex gap-1">
                            <RadioGroupItem value="Male" id="r1" />
                            <Label htmlFor="r1">Male</Label>
                            </div>
                            <div className="flex gap-1">
                            <RadioGroupItem value="Female" id="r2" />
                            <Label htmlFor="r2">Female</Label>
                            </div>
                        </RadioGroup>
                     )}/>
                     <form.Field name="age" children={(field)=>(
                        <Input placeholder="Age" value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}/>
                     )}/>
                       <form.Field name="country" children={(field)=>(
                        <Input placeholder="Country" value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}/>
                     )}/>
                       <form.Field name="city" children={(field)=>(
                        <Input placeholder="City" value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}/>
                     )}/>
                </div>
            )}

            {/* STEP 3 Additional info */}
            {step===2 &&(
                <div className="space-y-4">
                     <h2>Additional info</h2>
                     <form.Field name="interests" children={(field)=>(
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h3 className="mb-3">Interests</h3>
                                    <div className="flex flex-wrap gap-6">
                                        {Object.values(Interests).map((interest)=>(
                                            <div key={interest} className="flex items-center gap-2 mb-0 md:shrink-0">
                                            <Checkbox checked={field.state.value.includes(interest)} onCheckedChange={(checked)=>{
                                                if(checked){
                                                    field.handleChange([...field.state.value, interest])
                                                } else{
                                                    field.handleChange(field.state.value.filter((i) => i !== interest))
                                                }
                                            }
                                            }/>
                                            <label className="Label" htmlFor={interest}>{interest}</label>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                                </div>
                     )}/>

                      <form.Field name="imgs" children={(field)=>{
                        return (
                                <>
                                <h3>Photos</h3>
                                <Button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" 
                                onClick={()=>inputRef.current?.click()}>
                                    Upload
                                </Button>
                                    <Input type="file" accept="image/jpeg, image/png"
                                     multiple ref={inputRef} className="hidden" 
                                     onChange={(e)=>{
                                        const files = Array.from(e.target.files ?? [])
                                        field.handleChange([...field.state.value, ...files].slice(0,6))
                                        e.target.value=''
                                    }}/>
                                    <div className="flex flex-wrap gap-4">
                                    {field.state.value.map((file, index)=>{
                                        const previewURL = URL.createObjectURL(file)
                                        return (
                                            <div key={file.name} className="relative w-fit h-fit">
                                                <Button type="button" size="icon" className="absolute top-2 right-2"
                                                onClick={()=>field.removeValue(index)}
                                                ><X /></Button>
                                                <img src={previewURL} alt="preview" className="h-48 w-48 rounded-md object-cover" 
                                                onLoad={()=>URL.revokeObjectURL(previewURL)}/>
                                            </div>
                                        )
                                    })}
                                    </div>
                                </>
                               )
                      }}/>
                    </div>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <div className="flex gap-2">
                <Button variant='outline' disabled={step===0} onClick={()=>setStep(prev=>prev -1)}><ChevronLeft /></Button>
                <Button variant='outline' disabled={step===2} onClick={()=>{ 
                    validateStep()
                    }}>
                        <ChevronRight />
                </Button>
              </div>
              {step === 2 && <Button variant="default">Submit</Button>}
          </div>

        </form>
    </>
  </>
  )
}

export default MultiStepForm