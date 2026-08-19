import { useMe } from "@/queries/user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getProfileUrl } from "@/utils/movie"
import { Button } from "@/components/ui/button"
import { signOut } from "@/api/auth"
const MyAccount = () => {
  const { data } = useMe()
  if (data?.id)
    return (
      <div className="mt-10 flex flex-col gap-5 px-4 py-3 sm:px-6 sm:py-4 md:px-10 lg:px-14">
        <div className="text-xl font-bold sm:text-2xl">My Account</div>

        <div className="flex flex-col items-start gap-4 rounded-md bg-accent p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6 md:p-8 lg:p-10">
          <Avatar className="size-16 shrink-0 sm:size-20">
            <AvatarImage src={getProfileUrl(data.id)} />
            <AvatarFallback>
              {data?.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="truncate text-lg font-bold sm:text-xl">
              {data.name}
            </div>

            <div className="text-sm break-all text-muted-foreground sm:break-normal">
              {data.email}
            </div>
          </div>
        </div>

        <div>
          <Button onClick={signOut} className="w-full sm:w-auto">
            Log out
          </Button>
        </div>
      </div>
    )
}

export default MyAccount
