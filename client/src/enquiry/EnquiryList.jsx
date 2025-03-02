
"use client";

import axios from "axios";
import { Button, Table } from "flowbite-react";
import { ToastContainer } from "react-toastify";
export function EnquiryList({data, getAllEnquiry, Swal, setFormData}) {

    let deleteRow = (delid) =>{
        Swal.fire({
            title: "Are you sure to delete?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
          }).then((result) => {
            if (result.isConfirmed) {
                 axios.delete(`http://localhost:8000/api/website/enquiry/delete/${delid}`)
                .then((res) =>{
                    getAllEnquiry()
                })
              Swal.fire("Deleted!", "", "success");
            } 
            else if (result.isDenied) {
              Swal.fire("Changes are not deleted", "", "info");
            }
          });
    }

    let editRow = (editid)=>{
        axios.get(`http://localhost:8000/api/website/enquiry/single/${editid}`)
        .then((res) =>{
            let data = res.data.enquiry
            setFormData(data)
            getAllEnquiry()
        })
    }

    return (

        <div className="bg-gray-200 p-4"> 
            <ToastContainer/>
            <h2 className="font-bold mb-4 text-[20px]"> Enquiry List </h2>
            <div className="overflow-x-auto" >
                
                <Table>
                    <Table.Head>
                        <Table.HeadCell>SL</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Phone</Table.HeadCell>
                        <Table.HeadCell>Message</Table.HeadCell>
                        <Table.HeadCell>
                            Delete
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Edit
                        </Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y divide-x">
                            {
                                data.length >= 1 ?
                                    data.map((item, index)=>{
                                        return(
                                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <Table.Cell>{index+1}</Table.Cell>
                                                <Table.Cell>{item.name}</Table.Cell>
                                                <Table.Cell>{item.email}</Table.Cell>
                                                <Table.Cell>{item.phone}</Table.Cell>
                                                <Table.Cell>{item.message}</Table.Cell>
                                                <Table.Cell> 
                                                    <Button onClick={() => deleteRow(item._id)}className="bg-red-500 text-white px-4 py-2 rounded-md"> Delete </Button>
                                                </Table.Cell>
                                                <Table.Cell> 
                                                    <Button onClick={()=>editRow(item._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md"> Edit </Button>
                                                </Table.Cell>
                                            </Table.Row> 
                                        )
                                    })
                                    :
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell colSpan={7} className="text-center" >No Data Found </Table.Cell>
                                    </Table.Row>
                            }
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}
