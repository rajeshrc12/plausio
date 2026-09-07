import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const Message = ({ children }: { children: string }) => {
  return (
    <div className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  )
}

export default Message
