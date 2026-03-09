import { Clock } from "lucide-react"
import { mockQueue } from "@/core/data/mock-data.ts"
import { PlatformBadge } from "@/core/components/custom-components/platform-bage.tsx"

function Timeline() {
  return (
    <div className="space-y-1">
      {mockQueue.map((item, i) => (
        <div key={item.id} className="group flex gap-4">
          {/* Time column */}
          <div className="w-20 shrink-0 pt-4 text-right">
            <p className="font-mono text-sm text-foreground">{item.time}</p>
            <p className="text-[10px] text-muted-foreground">{item.day}</p>
          </div>

          {/* Line */}
          <div className="flex flex-col items-center">
            <div className="mt-5 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-primary bg-primary/40" />
            {i < mockQueue.length - 1 && (
              <div className="w-px flex-1 bg-border" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-6">
            <div className="rounded-lg border border-border bg-card p-4 transition-colors group-hover:border-primary/30">
              <p className="mb-3 text-sm leading-relaxed text-foreground">
                {item.title}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {item.platforms.map((p) => (
                    <PlatformBadge key={p} platform={p} size="md" />
                  ))}
                </div>
                <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  queued
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Timeline
