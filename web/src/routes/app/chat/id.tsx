import MainPanel from "@/routes/app/chat/main-panel"
import RightPanel from "@/routes/app/chat/right-panel"

const ChatId = () => {
  return (
    <div className="grid h-screen min-h-0 grid-cols-12">
      <MainPanel />
      <RightPanel />
    </div>
  )
}

export default ChatId
