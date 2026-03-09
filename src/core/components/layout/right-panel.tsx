import {
  mockBrandProfiles,
  mockPosts,
  mockQueue,
  mockWeeklyStats,
} from "@/core/data/mock-data.ts"
import { Clock, Eye, Heart, Target, TrendingUp, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { PlatformBadge } from "@/core/components/custom-components/platform-bage.tsx"

export function RightPanel() {
  const activeProfile = mockBrandProfiles.find((p) => p.isActive)
  const recentPost = mockPosts.find((p) => p.status === "COMPLETED")
  const completedPosts = mockPosts.filter((p) => p.status === "COMPLETED")
  const navigate = useNavigate()

  const totalReachAllTime = completedPosts.reduce(
    (sum, p) => sum + (p.stats?.totalReach || 0),
    0
  )
  const totalPostsShipped = completedPosts.length

  return (
    <div className="sticky top-0 hidden h-screen w-80 space-y-5 overflow-auto border-l border-border p-4 xl:block">
      {/* Active Brand Profile */}
      {activeProfile && (
        <div>
          <h3 className="mb-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Active Brand Profile
          </h3>
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">
                {activeProfile.name}
              </h4>
              <span className="h-2 w-2 rounded-full bg-green-500" />
            </div>
            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
              {activeProfile.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {activeProfile.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] tracking-wider text-muted-foreground uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Post */}
      {recentPost && (
        <div>
          <h3 className="mb-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Latest Drop
          </h3>
          <button
            onClick={() => navigate("/posts")}
            className="w-full rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/30"
          >
            <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-foreground/80">
              &#34;{recentPost.masterContent}&#34;
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {recentPost.variants.slice(0, 3).map((v) => (
                  <PlatformBadge key={v.platform} platform={v.platform} />
                ))}
              </div>
              {recentPost.stats && (
                <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Eye className="h-2.5 w-2.5" />
                    {recentPost.stats.totalReach.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Heart className="h-2.5 w-2.5" />
                    {recentPost.stats.totalLikes}
                  </span>
                </div>
              )}
            </div>
          </button>
        </div>
      )}

      {/* This Week */}
      <div>
        <h3 className="mb-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          This Week
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="mb-2 flex h-8 items-end gap-0.5">
              {[40, 65, 55, 80, 70, 45, 60].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-primary/30"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground">Reach</p>
            <p className="font-mono text-lg font-semibold text-foreground">
              14.2k
            </p>
            <p className="text-[10px] text-green-500">
              ↑ {mockWeeklyStats.reach.change}%
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="mb-2 flex h-8 items-end gap-0.5">
              {[30, 50, 70, 40, 80, 60, 50].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-primary/30"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground">Posts</p>
            <p className="font-mono text-lg font-semibold text-foreground">
              {mockWeeklyStats.posts.value}
            </p>
            <p className="text-[10px] text-green-500">
              ↑ {mockWeeklyStats.posts.change} more
            </p>
          </div>
        </div>
      </div>

      {/* Quick Pulse */}
      <div>
        <h3 className="mb-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          Quick Pulse
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">All-time reach</p>
              <p className="font-mono text-sm font-semibold text-foreground">
                {totalReachAllTime.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Posts shipped</p>
              <p className="font-mono text-sm font-semibold text-foreground">
                {totalPostsShipped}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Best platform</p>
              <p className="font-mono text-sm font-semibold text-foreground">
                {mockWeeklyStats.bestPlatform.value}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Best posting day</p>
              <p className="font-mono text-sm font-semibold text-foreground">
                {mockWeeklyStats.bestDay.value}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement rate */}
      <div>
        <h3 className="mb-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          Engagement Rate
        </h3>
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="mb-2 flex items-baseline gap-1">
            <span className="font-mono text-2xl font-semibold text-foreground">
              {mockWeeklyStats.engagement.value}%
            </span>
            <span className="text-[10px] text-green-500">↑ 12%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary/60"
              style={{ width: "42%" }}
            />
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            {mockWeeklyStats.engagement.label}
          </p>
        </div>
      </div>

      {/* Upcoming Queue */}
      <div>
        <h3 className="mb-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          Upcoming Queue
        </h3>
        <div className="space-y-3">
          {mockQueue.slice(0, 4).map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-12 shrink-0 text-right">
                <p className="font-mono text-xs text-muted-foreground">
                  {item.time}
                </p>
                <p className="text-[10px] text-muted-foreground/60">
                  {item.day}
                </p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-xs leading-relaxed text-foreground/80">
                  {item.title}
                </p>
                <div className="mt-1.5 flex gap-1">
                  {item.platforms.map((p) => (
                    <PlatformBadge key={p} platform={p} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
