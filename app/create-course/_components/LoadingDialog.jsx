import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
  

const LoadingDialog = ({loading}) => {
  return (
    <AlertDialog open={loading}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogDescription>
        <div className='flex flex-col py-10 items-center'>
            <Image src={'/business-development.gif'} width={100} height={100}/>
            <div>Please wait .... AI is working on your course</div>
        </div>
        
      </AlertDialogDescription>
    </AlertDialogHeader>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default LoadingDialog