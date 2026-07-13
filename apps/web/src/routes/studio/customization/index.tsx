import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { useMyChannel } from "@/hooks/useMyChannel"

const Customization = () => {
  const { data: channel, isLoading } = useMyChannel()

  if (isLoading || !channel) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
  }
  return (
    <div className="pb-10">
      {/* Header */}
      <div className="flex justify-between px-6 pt-10">
        <h1 className="text-3xl font-bold">Channel customization</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b px-6">
        <button className="border-b-2 border-primary py-4 font-medium">
          Profile
        </button>

        <div className="flex gap-2">
          <Button variant="secondary">View channel</Button>
          <Button variant="secondary" disabled>
            Cancel
          </Button>
          <Button disabled>Publish</Button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-10 px-6 py-8">
        {/* Banner */}
        <section className="grid grid-cols-[240px_1fr] gap-6">
          <div className="h-40 overflow-hidden rounded-lg border bg-muted">
            <img
              src={channel.bannerImage}
              alt="Banner"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-medium">Banner image</h3>
              <p className="text-sm text-muted-foreground">
                This image will appear across the top of your channel.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                For the best results on all devices, use an image that's at
                least 2048 × 1152 pixels and 6 MB or less.
              </p>
            </div>

            <Button variant="secondary">Upload</Button>
          </div>
        </section>

        {/* Profile Picture */}
        <section className="grid grid-cols-[240px_1fr] gap-6 pt-8">
          <div className="flex h-40 items-center justify-center rounded-lg border bg-muted">
            <Avatar className={"h-35 w-35"}>
              <AvatarImage src={channel.profileImage} />
              <AvatarFallback>name</AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-medium">Picture</h3>
              <p className="text-sm text-muted-foreground">
                Your profile picture will appear where your channel is presented
                on Plausio, like next to your videos and comments.
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                It's recommended to use a picture that's at least 98 × 98 pixels
                and 4 MB or less. Use a PNG or GIF (no animations) file. Make
                sure your picture follows the Plausio Community Guidelines.
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="secondary">Change</Button>
              <Button variant="outline">Remove</Button>
            </div>
          </div>
        </section>

        {/* Name */}
        <section className="space-y-2 pt-8">
          <h3 className="font-medium">Name</h3>

          <p className="text-sm text-muted-foreground">
            Choose a channel name that represents you and your content. Changes
            made to your name and picture are visible only on Plausio and not
            other Google services. You can change your name twice in 14 days.
          </p>

          <Input defaultValue={channel.name} />
        </section>

        {/* Handle */}
        <section className="space-y-2 pt-8">
          <h3 className="font-medium">Handle</h3>

          <p className="text-sm text-muted-foreground">
            Your handle is a unique @name that helps people find your channel,
            different from your channel name. You can change your handle twice
            within a 14-day period. We hold your previous handle for 14 days in
            case you'd like to switch back.
          </p>

          <Input defaultValue={`@${channel.handle}`} />

          <p className="text-xs text-muted-foreground">
            https://www.Plausio.com/@{channel.handle}
          </p>
        </section>

        {/* Description */}
        <section className="space-y-2 pt-8">
          <h3 className="font-medium">Description</h3>

          <Textarea
            defaultValue={channel.description}
            className="min-h-35 resize-none"
            placeholder="Tell viewers about your channel. Your description will appear in the About section of your channel and search results, among other places."
          />
        </section>
      </div>
    </div>
  )
}

export default Customization
