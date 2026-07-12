import { Link } from "react-router"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { useSidebar } from "@/hooks/useSidebar"
import { HomeIcon, TvIcon } from "lucide-react"

const menu = [
  {
    path: "/",
    name: "Home",
    Icon: HomeIcon,
  },
  {
    path: "/channel",
    name: "Channel",
    Icon: TvIcon,
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

const AppSidebar = () => {
  const appSidebar = useSidebar((state) => state.appSidebar)

  if (appSidebar)
    return (
      <div className="sidebar-scrollbar flex h-full w-60 shrink-0 flex-col gap-2 overflow-y-auto py-2">
        {menu?.map(({ path, name, Icon }) => (
          <Link
            key={name}
            to={path}
            className="mx-4 flex items-center gap-5 rounded-lg p-2 text-sm hover:bg-sidebar-accent"
          >
            <Icon />
            <div>{name}</div>
          </Link>
        ))}
        <div className="text-md p-2 font-medium">Subscriptions</div>
        {subscriptions?.map(({ id, userName, name }) => (
          <Link
            key={id}
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
