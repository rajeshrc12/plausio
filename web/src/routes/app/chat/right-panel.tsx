import { Button } from "@/components/ui/button"
import Preview from "@/routes/app/components/preview"
import { Code } from "lucide-react"
import { useState } from "react"

const RightPanel = () => {
  const [tab, setTab] = useState("preview")
  const handleTab = (value: string) => {
    setTab(value)
  }
  return (
    <div className="col-span-7 min-h-0">
      <div className="flex border-b py-3">
        <Button
          variant={tab === "code" ? "secondary" : "ghost"}
          onClick={() => handleTab("code")}
        >
          Code
        </Button>
        <Button
          variant={tab === "preview" ? "secondary" : "ghost"}

          onClick={() => handleTab("preview")}
        >
          Preview
        </Button>
      </div>
      {tab === "code" && <Code />}
      {tab === "preview" && <Preview />}
    </div>
  )
}

export default RightPanel
