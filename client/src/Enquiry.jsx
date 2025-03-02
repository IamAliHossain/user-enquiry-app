import { Button , Label, Textarea, TextInput } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import { EnquiryList } from "./enquiry/enquiryList";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default function Enquiry(){
    let [enquiryList, setEnquiryList] = useState([])
    let [formData, setFormData] = useState({
        name : '',
        email:'',
        phone:'',
        message:'',
        _id:''
    })
    //enquiry save button click korle save korar jonno
    let saveEnquiry = (e)=>{
    
        e.preventDefault()

        // let formData = {
        //     name :e.target.name.value,
        //     email:e.target.email.value,
        //     phone :e.target.phone.value,
        //     message:e.target.message.value
        // }
        if(formData._id){
            axios.put(`http://localhost:8000/api/website/enquiry/update/${formData._id}`,formData)
                .then((res)=>{
                toast.success('Enquiry updated successfully')
                setFormData({
                    name : '',
                    email:'',
                    phone:'',
                    message:'',
                    _id:''
                })
                getAllEnquiry()
            })
        }
        else{ 
            axios.post(`http://localhost:8000/api/website/enquiry/insert`,formData).then((res)=>{
                console.log(res.data)
                toast.success('Enquiry saved successfully')
                setFormData({
                    name : '',
                    email:'',
                    phone:'',
                    message:''
                })
                getAllEnquiry()
            })
        }
    }
    
    let getAllEnquiry=()=>{
        axios.get('http://localhost:8000/api/website/enquiry/view')
        .then((res) =>{
            return res.data
        })
        .then((finalData) =>{
            if(finalData.status){
                setEnquiryList(finalData.enquiryList)
            }
        })
    }

    // let deleteEnquiry = () =>{
    //     axios.delete('http://localhost:8000/api/website/enquiry/delete')
    //     .then((res)=>{
    //         return res.data
    //     })
    // }
    let getValue= (e)=>{
        let inputName = e.target.name
        let inputValue = e.target.value
        let oldData = {...formData}
        oldData[inputName] = inputValue
        setFormData(oldData)
    }

    useEffect(()=>{
        getAllEnquiry()
    },[])

    return(
        <div>
            <ToastContainer/>
            <h2 className="font-bold py-6 text-center text-[40px]">User Enquiry </h2>
            
            <div className="grid grid-cols-[30%_auto] gap-10">
                <div className="bg-gray-200 p-4">
                    <h2 className="text-[20px] font-bold"> Enquriy Form </h2>
                    <form action="" onSubmit={saveEnquiry}>
                        <div className="py-3">
                            <Label htmlFor="name" value="Your name :" />
                            <TextInput type="text" value={formData.name} onChange={getValue} name="name" placeholder="Enter your name" required />
                        </div>
                        <div className="py-3">
                            <Label htmlFor="email" value="Your email : " />
                            <TextInput type="email" value={formData.email} onChange={getValue} name="email" placeholder="Enter your name" required />
                        </div>
                        <div className="py-3">
                            <Label htmlFor="phone" value="Your number :" />
                            <TextInput type="text" value={formData.phone} onChange={getValue} name="phone" placeholder="Enter your number" required />
                        </div>
                        <div className="py-3">
                            <Label htmlFor="message" value="Your message :" />
                            <Textarea name="message" value={formData.message} onChange={getValue} placeholder="Leave your message..." required rows={4} />
                        </div>
                        <div className="py-3">
                           <Button type="submit" className="w-[100%]" color="red">
                                {formData._id ? 'Update' : 'Save'}
                           </Button>
                        </div>
                    </form>
                </div>
                <EnquiryList data ={enquiryList} getAllEnquiry = {getAllEnquiry} Swal = {Swal} setFormData={setFormData} />
            </div>

        </div>

    )
}
