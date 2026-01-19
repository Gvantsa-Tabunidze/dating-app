'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { useForm } from '@tanstack/react-form'
import { Divide } from "lucide-react"


const MultiStepForm = () => {
    const [step, setStep]= useState(0)
    const form = useForm({
        defaultValues:{
            email:'',
            password:'',
            fullname:'',
            gender:'' as 'Male' | 'Female',
            age:'',
            country:'',
            city:'',
            interests:[],
            imgs:[]
        },
        onSubmit:({value})=>{
            console.log(value)
        }
    })

  return (
    
    <div>
        <form onSubmit={(e)=>{
            e.preventDefault(),
            e.stopPropagation(),
            form.handleSubmit()
        }}>
            {/* STEP 1 Account data */}
            {step===0 && (
                <div className="space-y-4">
                    <h2>Account data</h2>
                    <form.Field name="email" children={(field)=>(
                        <Input placeholder="Email" value={field.state.value} onChange={(e)=>field.handleChange(e.target.value)}/>
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
                </div>
            )}

            <Input placeholder="Full name"/>
            <RadioGroup>
                <div className="flex gap-1">
                <RadioGroupItem value="Male" id="r1" />
                <Label htmlFor="r1">Male</Label>
                </div>
                <div className="flex gap-1">
                <RadioGroupItem value="Female" id="r2" />
                <Label htmlFor="r2">Female</Label>
                </div>
            </RadioGroup>
            <Input placeholder="Age"/>
            <Input placeholder="Country"/>
            <Input placeholder="City"/>

            <Input placeholder="Interests"/>
            <Input placeholder="Photos"/>
        </form>
    </div>
  )
}

export default MultiStepForm