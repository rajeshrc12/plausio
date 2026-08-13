import { useMe } from "@/queries/user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getProfileUrl } from "@/utils/movie"
import { Button } from "@/components/ui/button"
import { signOut } from "@/api/auth"
const MyAccount = () => {
  const { data } = useMe()
  if (data?.id)
    return (
      <div className="flex flex-col gap-5 px-20">
        <div className="text-2xl font-bold">My Account</div>
        <div className="flex gap-5 rounded-md bg-accent p-10">
          <Avatar className="h-20 w-20">
            <AvatarImage src={getProfileUrl(data.id)} />
            <AvatarFallback>{data?.name}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-xl font-bold">{data.name}</div>
            <div className="text-sm">not member yet</div>
          </div>
        </div>
        <div>
          <Button onClick={signOut}>Log out</Button>
        </div>
      </div>
    )
}

export default MyAccount
