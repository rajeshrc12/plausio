import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
const Comments = () => {
  const comments = [
    {
      id: 1,
      userName: "rajesh",
      content: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nisi, culpa vitae sit aspernatur eligendi natus laudantium iusto voluptates? Asperiores dignissimos, quam praesentium cumque quas quod dolore tempore consequatur architecto.
        
        `,
      createdAt: "2 hours ago",
    },
    {
      id: 2,
      userName: "carryminati",
      content: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nisi, culpa vitae sit aspernatur eligendi natus laudantium iusto voluptates? Asperiores dignissimos, quam praesentium cumque quas quod dolore tempore consequatur architecto.
        
        `,
      createdAt: "3 hours ago",
    },
  ]
  return (
    <div className="flex flex-col gap-4 pt-2">
      {comments.map(({ id, userName, content, createdAt }) => (
        <div className="flex gap-5" key={id}>
          <Avatar className={"h-10 w-10"}>
            <AvatarImage src={`https://i.pravatar.cc/150?img=${id}`} />
            <AvatarFallback>name</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div> @{userName}</div>
              <div className="text-xs font-thin text-muted-foreground">
                {createdAt}
              </div>
            </div>
            <div className="text-sm">{content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comments
