import SignIn from "@/components/sign-in"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSubscriptionStatus } from "@/queries/channel"
import { useHandleSubscription } from "@/mutations/channel"

const Subscribe = ({ id }: { id: number }) => {
  const { data, isLoading, isError } = useSubscriptionStatus(id)
  const handleSubscription = useHandleSubscription()
  const handle = () => {
    handleSubscription.mutate({ isSubscribed: !!data?.isSubscribed, id })
  }
  if (isLoading) return
  if (isError)
    return (
      <Popover>
        <PopoverTrigger
          render={<Button className={"rounded-full p-5"}>Subscribe </Button>}
        ></PopoverTrigger>
        <PopoverContent className={"p-4 shadow"}>
          <PopoverHeader>
            <PopoverTitle className={"text-xl font-bold"}>
              Want to subscribe to this channel?
            </PopoverTitle>
            <PopoverDescription>
              Sign in to subscribe to this channel.
            </PopoverDescription>
            <SignIn />
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    )

  return (
    <Button
      variant={data?.isSubscribed ? "secondary" : "default"}
      disabled={handleSubscription.isPending}
      className={"rounded-full p-5"}
      onClick={handle}
    >
      {data?.isSubscribed ? "Unsubscribe" : "Subscribe"}
    </Button>
  )
}

export default Subscribe
