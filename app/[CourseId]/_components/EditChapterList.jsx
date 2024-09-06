import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { CourseList } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

const EditChapterList = ({course , index , refreshData}) => {
    const [name , setName] = useState("");
    const [desc , setDesc] = useState("")

    const onUpdateHandler =async () => {
        course.courseOutput.course.chapters[index].name = name;
        course.courseOutput.course.chapters[index].about = desc
        const response = await db.update(CourseList).set({
            courseOutput:course?.courseOutput
        }).where(eq(CourseList?.id, course?.id))
        .returning({id:CourseList.id})
        refreshData(true)
        // console.log(response)
    }
  return (
    <Dialog>
      <DialogTrigger>
        <HiMiniPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter Details</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label htmlFor="">Chapter Title</label>
              <Input defaultValue={course?.courseOutput?.course?.chapters[index].name} onChange={e=>setName(e.target.value)}/>
            </div>
            <div className="mt-3">
              <label htmlFor="">Chapter Description</label>
              <Textarea className="h-40" defaultValue={course?.courseOutput?.course?.chapters[index].about} onChange={e=>setDesc(e.target.value)}/>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <DialogClose>
                <Button onClick={onUpdateHandler}>Update</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditChapterList