import { Link } from "react-router"
import HomeIcon from "@/assets/icons/home.svg?react"
import ChannelIcon from "@/assets/icons/channel.svg?react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"

const AppSidebar = () => {
  const menu = [
    {
      path: "/",
      name: "Home",
      Icon: HomeIcon,
    },
    {
      path: "/channel",
      name: "Channel",
      Icon: ChannelIcon,
    },
  ]
  const subscriptions = [
    {
      id: 1,
      img: "",
      name: "Rajesh Charhajari",
      userName: "rajeshcharhajari",
    },
    {
      id: 2,
      img: "",
      name: "CarryMinati",
      userName: "carryminati",
    },
  ]
  return (
    <div className="sidebar-scrollbar flex h-full w-60 shrink-0 flex-col gap-2 overflow-y-auto py-2">
      {menu.map(({ path, name, Icon }) => (
        <Link
          to={path}
          className="mx-4 flex items-center gap-5 rounded-lg p-2 text-sm hover:bg-sidebar-accent"
        >
          <Icon />
          <div>{name}</div>
        </Link>
      ))}
      <div className="text-md p-2 font-medium">Subscriptions</div>
      {subscriptions.map(({ id, userName, name }) => (
        <Link
          to={userName}
          className="mx-4 flex items-center gap-5 rounded-lg p-2 text-sm hover:bg-sidebar-accent"
        >
          <Avatar className={"h-6 w-6"}>
            <AvatarImage src={`https://i.pravatar.cc/150?img=${id}`} />
            <AvatarFallback>name</AvatarFallback>
          </Avatar>
          <div>{name}</div>
        </Link>
      ))}
    </div>
  )
}

export default AppSidebar
