import React, { useEffect, useState } from "react";
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

const EditCourseBasicInfo = ({ course, refreshData }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if(course?.courseOutput?.course){
        setName(course.courseOutput.course.name);
    setDesc(course.courseOutput.course.description);
    }
  }, [course]);

  const onUpdateHandler = async () => {
    course.courseOutput.course.name = name;
    course.courseOutput.course.description = desc;
    const response = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id });
    refreshData(true);
    // console.log(response)
  };
  return (
    <Dialog>
      <DialogTrigger>
        <HiMiniPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Basic Info</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label htmlFor="">Coarse Title</label>
              <Input
                defaultValue={course?.courseOutput?.course?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="">Coarse Description</label>
              <Textarea
                className="h-40"
                defaultValue={course?.courseOutput?.course?.description}
                onChange={(e) => setDesc(e.target.value)}
              />
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
  );
};

export default EditCourseBasicInfo;
