export type Platform = "X" | "LINKEDIN" | "INSTAGRAM" | "FACEBOOK"

export interface BrandProfile {
  id: string
  name: string
  description: string
  tags: string[]
  isActive: boolean
}

export interface PostVariant {
  platform: Platform
  content: string
  charCount: number
  tone: string
  status: "DRAFT" | "QUEUED" | "PUBLISHED" | "FAILED"
}

export interface Post {
  id: string
  masterContent: string
  brandProfile: string
  status: "DRAFT" | "SCHEDULED" | "PARTIAL" | "COMPLETED"
  scheduledFor: string
  variants: PostVariant[]
  stats?: {
    totalReach: number
    totalLikes: number
    totalShares: number
    platformBreakdown: Record<
      Platform,
      { reach: number; likes: number; shares: number }
    >
  }
}

export interface QueueItem {
  id: string
  time: string
  day: string
  title: string
  platforms: Platform[]
}

export const mockBrandProfiles: BrandProfile[] = [
  {
    id: "1",
    name: "Founder Voice",
    description:
      "Direct, no-fluff. Builds in public. Treats audience as peers, not followers.",
    tags: ["PUNCHY", "DIRECT", "HONEST", "BUILDER"],
    isActive: true,
  },
  {
    id: "2",
    name: "Thought Leader",
    description:
      "Insightful, data-driven. Shares frameworks and mental models.",
    tags: ["ANALYTICAL", "CALM", "STRUCTURED"],
    isActive: false,
  },
  {
    id: "3",
    name: "Casual Creator",
    description:
      "Relatable, meme-friendly. Talks like a friend over coffee, not a CEO on stage.",
    tags: ["FUNNY", "RELATABLE", "GEN-Z", "AUTHENTIC"],
    isActive: false,
  },
  {
    id: "4",
    name: "Technical Expert",
    description:
      "Deep dives into code, architecture, and engineering decisions. Teaches by showing.",
    tags: ["CODE", "TUTORIAL", "DEEP-DIVE", "PRECISE"],
    isActive: false,
  },
]

export const mockQueue: QueueItem[] = [
  {
    id: "1",
    time: "9AM",
    day: "Tomorrow",
    title: "The hidden tax killing solopreneurs: context switching...",
    platforms: ["X", "LINKEDIN"],
  },
  {
    id: "2",
    time: "2PM",
    day: "Friday",
    title: "Why I stopped using Buffer and what I built instead...",
    platforms: ["X", "INSTAGRAM"],
  },
  {
    id: "3",
    time: "10AM",
    day: "Saturday",
    title: "The 15-minute social media system for solo founders...",
    platforms: ["LINKEDIN"],
  },
  {
    id: "4",
    time: "8AM",
    day: "Monday",
    title: "Your content strategy shouldn't need a spreadsheet...",
    platforms: ["X", "LINKEDIN", "FACEBOOK"],
  },
  {
    id: "5",
    time: "12PM",
    day: "Monday",
    title: "I asked 50 founders how they handle content. Most said 'badly'...",
    platforms: ["LINKEDIN", "INSTAGRAM"],
  },
  {
    id: "6",
    time: "3PM",
    day: "Tuesday",
    title: "The myth of 'post every day' — what the data actually says...",
    platforms: ["X"],
  },
  {
    id: "7",
    time: "9AM",
    day: "Wednesday",
    title: "Thread: 7 tools I replaced with one workflow...",
    platforms: ["X", "LINKEDIN"],
  },
]

export const mockPosts: Post[] = [
  {
    id: "1",
    masterContent:
      "solopreneurs waste hours switching between tools. there's a better way — one idea, everywhere, in minutes",
    brandProfile: "Founder Voice",
    status: "COMPLETED",
    scheduledFor: "2024-03-08T09:00:00",
    variants: [
      {
        platform: "X",
        content:
          "The hidden tax killing solopreneurs: context switching.\n\nChatGPT → Google Docs → Buffer → back...",
        charCount: 247,
        tone: "BRAND MATCHED",
        status: "PUBLISHED",
      },
      {
        platform: "LINKEDIN",
        content:
          "Most solopreneurs I talk to have the same problem: great ideas, fragmented execution.\n\nYou're writing in ChatGPT, editing in Docs,...",
        charCount: 512,
        tone: "NARRATIVE TONE",
        status: "PUBLISHED",
      },
      {
        platform: "INSTAGRAM",
        content:
          "one idea. four platforms. ten minutes. ✨\n\nstop switching tabs and start shipping content that actually sounds like you 👇",
        charCount: 188,
        tone: "CASUAL HOOK",
        status: "PUBLISHED",
      },
      {
        platform: "FACEBOOK",
        content:
          "If you're posting manually across platforms, you're spending 3-4 hours a week just on distribution.",
        charCount: 390,
        tone: "COMMUNITY TONE",
        status: "PUBLISHED",
      },
    ],
    stats: {
      totalReach: 14200,
      totalLikes: 342,
      totalShares: 89,
      platformBreakdown: {
        X: { reach: 5400, likes: 120, shares: 45 },
        LINKEDIN: { reach: 6200, likes: 156, shares: 32 },
        INSTAGRAM: { reach: 1800, likes: 52, shares: 8 },
        FACEBOOK: { reach: 800, likes: 14, shares: 4 },
      },
    },
  },
  {
    id: "2",
    masterContent:
      "why most content calendars fail (and what actually works for solo founders)",
    brandProfile: "Founder Voice",
    status: "COMPLETED",
    scheduledFor: "2024-03-07T14:00:00",
    variants: [
      {
        platform: "X",
        content:
          "Content calendars are broken for solopreneurs.\n\nHere's what I do instead (takes 15 min/week):",
        charCount: 180,
        tone: "BRAND MATCHED",
        status: "PUBLISHED",
      },
      {
        platform: "LINKEDIN",
        content:
          "I used to spend Sunday nights filling out a content calendar. It felt productive. But I'd abandon it by Wednesday.",
        charCount: 480,
        tone: "STORY ARC",
        status: "PUBLISHED",
      },
    ],
    stats: {
      totalReach: 8900,
      totalLikes: 210,
      totalShares: 56,
      platformBreakdown: {
        X: { reach: 3200, likes: 89, shares: 28 },
        LINKEDIN: { reach: 5700, likes: 121, shares: 28 },
        INSTAGRAM: { reach: 0, likes: 0, shares: 0 },
        FACEBOOK: { reach: 0, likes: 0, shares: 0 },
      },
    },
  },
  {
    id: "3",
    masterContent:
      "the real reason your posts get no engagement (it's not the algorithm)",
    brandProfile: "Thought Leader",
    status: "SCHEDULED",
    scheduledFor: "2024-03-10T10:00:00",
    variants: [
      {
        platform: "X",
        content:
          "Everyone blames the algorithm.\n\nBut the real reason your posts flop? You're writing for everyone and reaching no one.",
        charCount: 210,
        tone: "CONTRARIAN",
        status: "QUEUED",
      },
      {
        platform: "LINKEDIN",
        content:
          "I analyzed 200+ posts from solopreneurs.\n\nThe ones that performed had one thing in common: specificity over generality.",
        charCount: 420,
        tone: "DATA-BACKED",
        status: "QUEUED",
      },
      {
        platform: "FACEBOOK",
        content:
          "Quick thought: if your posts aren't landing, it might not be the algorithm. It might be that you're trying to talk to everyone at once.",
        charCount: 290,
        tone: "CONVERSATIONAL",
        status: "QUEUED",
      },
    ],
  },
  {
    id: "4",
    masterContent:
      "I built a SaaS in public for 6 months. here's every number, including the ugly ones",
    brandProfile: "Founder Voice",
    status: "COMPLETED",
    scheduledFor: "2024-03-05T08:00:00",
    variants: [
      {
        platform: "X",
        content:
          "6 months of building in public.\n\nRevenue: $2,400 MRR\nFollowers gained: 3,200\nTimes I wanted to quit: 11\n\nThread 🧵",
        charCount: 220,
        tone: "RAW TRANSPARENCY",
        status: "PUBLISHED",
      },
      {
        platform: "LINKEDIN",
        content:
          "Everyone shows the highlight reel. Here's my full dashboard — revenue, churn, the weeks where nothing worked, and what I'd do differently.",
        charCount: 540,
        tone: "VULNERABLE LEADER",
        status: "PUBLISHED",
      },
      {
        platform: "INSTAGRAM",
        content:
          "6 months. $2.4k MRR. 11 near-quits.\n\nBuilding in public isn't glamorous — but it's honest. Swipe for the real numbers →",
        charCount: 165,
        tone: "CAROUSEL HOOK",
        status: "PUBLISHED",
      },
    ],
    stats: {
      totalReach: 22400,
      totalLikes: 580,
      totalShares: 145,
      platformBreakdown: {
        X: { reach: 12000, likes: 310, shares: 98 },
        LINKEDIN: { reach: 8200, likes: 210, shares: 40 },
        INSTAGRAM: { reach: 2200, likes: 60, shares: 7 },
        FACEBOOK: { reach: 0, likes: 0, shares: 0 },
      },
    },
  },
  {
    id: "5",
    masterContent:
      "stop writing 'content' and start writing things people actually want to read",
    brandProfile: "Casual Creator",
    status: "COMPLETED",
    scheduledFor: "2024-03-04T12:00:00",
    variants: [
      {
        platform: "X",
        content:
          "hot take: the word 'content' is why your posts are boring.\n\nYou're not creating content. You're starting conversations.",
        charCount: 195,
        tone: "SPICY TAKE",
        status: "PUBLISHED",
      },
      {
        platform: "LINKEDIN",
        content:
          "I stopped calling my writing 'content' 3 months ago. Here's what happened: my engagement tripled. Not because I wrote more, but because I started writing like a person.",
        charCount: 410,
        tone: "REFLECTION",
        status: "PUBLISHED",
      },
      {
        platform: "FACEBOOK",
        content:
          "Does anyone else cringe at the word 'content'? I switched to 'conversations' and my whole approach changed. Here's how...",
        charCount: 320,
        tone: "COMMUNITY ASK",
        status: "PUBLISHED",
      },
    ],
    stats: {
      totalReach: 11300,
      totalLikes: 298,
      totalShares: 72,
      platformBreakdown: {
        X: { reach: 4800, likes: 145, shares: 38 },
        LINKEDIN: { reach: 5100, likes: 120, shares: 28 },
        INSTAGRAM: { reach: 0, likes: 0, shares: 0 },
        FACEBOOK: { reach: 1400, likes: 33, shares: 6 },
      },
    },
  },
  {
    id: "6",
    masterContent:
      "your first 1000 followers don't come from going viral. they come from being consistent and useful",
    brandProfile: "Thought Leader",
    status: "COMPLETED",
    scheduledFor: "2024-03-03T09:00:00",
    variants: [
      {
        platform: "X",
        content:
          "Chasing virality is a trap.\n\nYour first 1,000 followers come from:\n→ Showing up daily\n→ Solving real problems\n→ Being the same person every post",
        charCount: 240,
        tone: "FRAMEWORK",
        status: "PUBLISHED",
      },
      {
        platform: "LINKEDIN",
        content:
          "I didn't go viral to get my first 1,000 followers. I just posted something useful every weekday for 4 months. No hacks. No tricks. Just consistency.",
        charCount: 460,
        tone: "HUMBLE PROOF",
        status: "PUBLISHED",
      },
    ],
    stats: {
      totalReach: 6700,
      totalLikes: 178,
      totalShares: 34,
      platformBreakdown: {
        X: { reach: 2900, likes: 82, shares: 18 },
        LINKEDIN: { reach: 3800, likes: 96, shares: 16 },
        INSTAGRAM: { reach: 0, likes: 0, shares: 0 },
        FACEBOOK: { reach: 0, likes: 0, shares: 0 },
      },
    },
  },
  {
    id: "7",
    masterContent:
      "the tools don't matter. your workflow does. here's mine for publishing to 4 platforms in under 15 minutes",
    brandProfile: "Founder Voice",
    status: "COMPLETED",
    scheduledFor: "2024-03-01T10:00:00",
    variants: [
      {
        platform: "X",
        content:
          "People keep asking about my tech stack for social.\n\nIt's not the tools. It's the workflow.\n\nHere's my exact 15-min process for 4 platforms:",
        charCount: 260,
        tone: "PROCESS REVEAL",
        status: "PUBLISHED",
      },
      {
        platform: "LINKEDIN",
        content:
          "I used to spend 3 hours distributing one post across platforms. Now it takes 15 minutes. The difference? I stopped thinking about tools and started thinking about systems.",
        charCount: 520,
        tone: "TRANSFORMATION",
        status: "PUBLISHED",
      },
      {
        platform: "INSTAGRAM",
        content:
          "15 min. 4 platforms. zero stress.\n\nmy exact posting workflow — save this for later 📌",
        charCount: 140,
        tone: "SAVE BAIT",
        status: "PUBLISHED",
      },
      {
        platform: "FACEBOOK",
        content:
          "Anyone else tired of spending more time distributing content than actually creating it? Here's the workflow that fixed it for me.",
        charCount: 350,
        tone: "PAIN POINT",
        status: "PUBLISHED",
      },
    ],
    stats: {
      totalReach: 18600,
      totalLikes: 445,
      totalShares: 112,
      platformBreakdown: {
        X: { reach: 7200, likes: 190, shares: 62 },
        LINKEDIN: { reach: 8100, likes: 185, shares: 38 },
        INSTAGRAM: { reach: 2100, likes: 48, shares: 8 },
        FACEBOOK: { reach: 1200, likes: 22, shares: 4 },
      },
    },
  },
  {
    id: "8",
    masterContent:
      "AI won't replace creators. but creators who use AI will replace those who don't",
    brandProfile: "Thought Leader",
    status: "SCHEDULED",
    scheduledFor: "2024-03-12T08:00:00",
    variants: [
      {
        platform: "X",
        content:
          "AI isn't coming for your writing job.\n\nBut the creator who ships 4x faster using AI? They might.",
        charCount: 185,
        tone: "PROVOCATIVE",
        status: "QUEUED",
      },
      {
        platform: "LINKEDIN",
        content:
          "The debate isn't 'AI vs. humans.' It's 'humans with AI vs. humans without it.' The gap is already showing.",
        charCount: 390,
        tone: "INDUSTRY TAKE",
        status: "QUEUED",
      },
    ],
  },
  {
    id: "9",
    masterContent:
      "every founder should have a personal brand. but not the kind you think",
    brandProfile: "Casual Creator",
    status: "DRAFT",
    scheduledFor: "",
    variants: [
      {
        platform: "X",
        content:
          "Your personal brand isn't a logo.\nIt's not a color palette.\n\nIt's the thing people say about you when you're not in the room.",
        charCount: 200,
        tone: "REFRAME",
        status: "DRAFT",
      },
    ],
  },
]
export const mockWeeklyStats = {
  reach: { value: 14200, change: 23, label: "people saw your stuff" },
  posts: { value: 12, change: 4, label: "pieces shipped this week" },
  engagement: { value: 4.2, unit: "%", label: "people actually cared" },
  bestDay: { value: "Tuesday", label: "your audience wakes up on" },
  bestPlatform: { value: "LinkedIn", label: "where you're loudest" },
  topPost: {
    content: "The hidden tax killing solopreneurs...",
    reach: 5400,
    platform: "X" as Platform,
  },
}

export const mockChatMessages = [
  {
    id: "1",
    role: "assistant" as const,
    content:
      "Good evening, Derrick. You're using your **Founder Voice** profile. What's the idea you want to push today?",
    time: "10:01 PM",
  },
  {
    id: "2",
    role: "user" as const,
    content:
      "solopreneurs waste hours switching between tools. there's a better way — one idea, everywhere, in minutes",
    time: "10:02 PM",
  },
  {
    id: "3",
    role: "assistant" as const,
    content:
      "Got it. Generating 4 platform-optimized drafts with your Founder Voice tone — direct, punchy, no fluff.",
    time: "10:02 PM",
  },
]

export function getPlatformColor(platform: Platform): string {
  const map: Record<Platform, string> = {
    X: "text-platform-x",
    LINKEDIN: "text-platform-linkedin",
    INSTAGRAM: "text-platform-instagram",
    FACEBOOK: "text-platform-facebook",
  }
  return map[platform]
}

export function getPlatformBorder(platform: Platform): string {
  const map: Record<Platform, string> = {
    X: "border-gradient-x",
    LINKEDIN: "border-gradient-linkedin",
    INSTAGRAM: "border-gradient-instagram",
    FACEBOOK: "border-gradient-facebook",
  }
  return map[platform]
}

export function getPlatformBg(platform: Platform): string {
  const map: Record<Platform, string> = {
    X: "bg-platform-x",
    LINKEDIN: "bg-platform-linkedin",
    INSTAGRAM: "bg-platform-instagram",
    FACEBOOK: "bg-platform-facebook",
  }
  return map[platform]
}
