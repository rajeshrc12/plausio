import { MessageSquareText, ThumbsUp, Upload, View } from "lucide-react"

const Dashboard = () => {
  return (
    <div>
      <div className="flex justify-between px-6 pt-10">
        <div className="text-3xl font-bold">Channel dashboard</div>
        <div>
          <button className="rounded-full border p-2">
            <Upload />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 p-6">
        <div className="flex flex-col gap-3 rounded-xl border p-6">
          <div className="font-bold">Latest video performance</div>
          <div className="overflow-hidden rounded-xl">
            <img
              src="https://picsum.photos/seed/picsum/320/180"
              className="aspect-video w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <View /> 12
            <MessageSquareText /> 5
            <ThumbsUp /> 6
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-xl border p-6">
          <div className="font-bold">Channel analytics</div>
          <div>Current subscribers</div>
          <div className="text-4xl font-bold">12</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
