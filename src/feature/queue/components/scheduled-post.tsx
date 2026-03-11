import { mockPosts } from "@/core/data/mock-data.ts"
import { Calendar } from "lucide-react"
import { PlatformBadge } from "@/core/components/custom-components/platform-bage.tsx"

function ScheduledPost() {
  const scheduledPosts = mockPosts.filter((p) => p.status === "SCHEDULED")

  return (
    <>
      {scheduledPosts.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            <Calendar className="h-3.5 w-3.5" />
            Scheduled but not yet queued
          </h2>
          {scheduledPosts.map((post) => (
            <div
              key={post.id}
              className="mb-3 rounded-lg border border-border bg-card p-4"
            >
              <p className="mb-2 text-sm text-foreground">
                {post.masterContent}
              </p>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-muted-foreground">
                  {new Date(post.scheduledFor).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
                <div className="flex gap-1">
                  {post.variants.map((v) => (
                    <PlatformBadge key={v.platform} platform={v.platform} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ScheduledPost
