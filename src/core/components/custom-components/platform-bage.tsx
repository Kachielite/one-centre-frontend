import {
  getPlatformBg,
  getPlatformColor,
  type Platform,
} from "@/core/data/mock-data"

const platformLabels: Record<Platform, string> = {
  X: "𝕏",
  LINKEDIN: "in",
  INSTAGRAM: "◎",
  FACEBOOK: "f",
}

export function PlatformBadge({
  platform,
  size = "sm",
}: {
  platform: Platform
  size?: "sm" | "md"
}) {
  const sizeClass = size === "sm" ? "w-5 h-5 text-[10px]" : "w-6 h-6 text-xs"
  return (
    <span
      className={`${sizeClass} rounded-full ${getPlatformBg(platform)} ${getPlatformColor(platform)} inline-flex items-center justify-center font-bold`}
    >
      {platformLabels[platform]}
    </span>
  )
}
