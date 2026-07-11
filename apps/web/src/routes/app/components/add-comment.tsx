import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { useState } from "react"

const AddComment = () => {
  const [btn, setBtn] = useState(false)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Avatar className={"h-6 w-6"}>
          <AvatarImage src={`https://i.pravatar.cc/150?img=1`} />
          <AvatarFallback>name</AvatarFallback>
        </Avatar>
        <input
          onFocus={() => setBtn(true)}
          type="text"
          className="w-full border-b outline-none focus:border-b-2 focus:border-primary focus:p-1"
          placeholder="Add a comment"
        />
      </div>
      {btn && (
        <div className="flex justify-end">
          <Button variant={"ghost"} onClick={() => setBtn(false)}>
            Cancel
          </Button>
          <Button>Comment</Button>
        </div>
      )}
    </div>
  )
}

export default AddComment
