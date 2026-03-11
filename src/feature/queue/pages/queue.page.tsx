import Timeline from "@/feature/queue/components/timeline.tsx"
import ScheduledPost from "@/feature/queue/components/scheduled-post.tsx"

function QueuePage() {
  return (
    <div className="p-6">
      <Timeline />
      <ScheduledPost />
    </div>
  )
}

export default QueuePage
