import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"

const Profile = () => {
  return (
    <Avatar>
      <AvatarImage src={`https://i.pravatar.cc/150?img=1`} />
      <AvatarFallback>Rajesh</AvatarFallback>
    </Avatar>
  )
}

export default Profile
