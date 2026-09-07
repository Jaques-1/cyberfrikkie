import { Hono } from "hono";
import { XMLParser } from "fast-xml-parser";

const app = new Hono<{ Bindings: Env }>();

// Interface for parsed blog post
interface BlogPost {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  author: string;
  description: string;
  content: string;
  categories: string[];
  imageUrl?: string;
  readTime: string;
}

// Curated Fallback Blog Posts (if RSS fetch is unreachable/offline)
const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    id: "cf-blog-1",
    title: "Leaked Credentials Insights & Broadened Bot Telemetry on Cloudflare Radar",
    link: "https://blog.cloudflare.com/cloudflare-radar-ddos-leaked-credentials-bots/",
    pubDate: "2026-03-18T10:00:00Z",
    author: "Cloudflare Radar Team",
    description: "Cloudflare Radar now provides real-time visibility into aggregate authentication trends, leaked credential attempts, and enhanced bot classification.",
    content: "Radar has expanded its security insights, providing visibility into aggregate trends in authentication requests, including the detection of leaked credentials through WAF scans. Learn how global bot traffic patterns are evolving across edge nodes.",
    categories: ["Radar", "Security", "Bots"],
    imageUrl: "https://blog.cloudflare.com/_emdash/api/media/file/01M1JDYW2RHXMJDDXS13K6VESF.01M1JDYX370D7EV4BHCDQS4C6J.png",
    readTime: "5 min read"
  },
  {
    id: "cf-blog-2",
    title: "Routing & BGP Security Insights on Cloudflare Radar",
    link: "https://blog.cloudflare.com/radar-routing-bgp-widgets/",
    pubDate: "2026-03-10T14:30:00Z",
    author: "Celso Martinho & Radar Team",
    description: "Explore new BGP routing widgets and RPKI ROA validation coverage metrics across top autonomous systems globally.",
    content: "We're releasing brand new BGP insights on Cloudflare Radar. Track IPv4 and IPv6 prefix announcements, RPKI coverage by AS, and route leaks across global internet service providers in real time.",
    categories: ["Radar", "Network", "BGP"],
    imageUrl: "https://blog.cloudflare.com/_emdash/api/media/file/01M1JDYW2RHXMJDDXS13K6VESF.01M1JDYX370D7EV4BHCDQS4C6J.png",
    readTime: "7 min read"
  },
  {
    id: "cf-blog-3",
    title: "AI Search Crawl vs Refer Ratios: Analyzing the Impact of AI Bots",
    link: "https://blog.cloudflare.com/ai-search-crawl-refer-ratio-on-radar/",
    pubDate: "2026-02-27T09:15:00Z",
    author: "Cloudflare Data & AI Team",
    description: "How much web traffic do AI crawlers generate compared to web referrals? A deep dive into Cloudflare Radar's AI bot telemetry.",
    content: "With the rise of generative AI search engines, understanding bot crawl activity versus direct traffic refer ratios is essential for publishers. We break down traffic from GPTBot, ClaudeBot, Perplexity, and Bytespider.",
    categories: ["AI", "Radar", "Bots"],
    imageUrl: "https://blog.cloudflare.com/_emdash/api/media/file/01M1JDYW2RHXMJDDXS13K6VESF.01M1JDYX370D7EV4BHCDQS4C6J.png",
    readTime: "6 min read"
  },
  {
    id: "cf-blog-4",
    title: "Cloudflare Workers & Agents SDK: Building Stateful AI Agents at Scale",
    link: "https://blog.cloudflare.com/building-stateful-ai-agents-on-workers/",
    pubDate: "2026-02-14T11:00:00Z",
    author: "Workers & AI Platform Team",
    description: "Combine Durable Objects, Workflows, and WebSockets to create real-time autonomous AI agents deployed across 330+ edge locations.",
    content: "The Cloudflare Agents SDK simplifies building agentic systems with persistent memory, transactional SQLite storage, and background RPC capabilities. Explore how developers are building next-gen web applications.",
    categories: ["Workers", "AI", "Developers"],
    imageUrl: "https://blog.cloudflare.com/_emdash/api/media/file/01M1JDYW2RHXMJDDXS13K6VESF.01M1JDYX370D7EV4BHCDQS4C6J.png",
    readTime: "8 min read"
  },
  {
    id: "cf-blog-5",
    title: "DNS Insights & Speed Analytics on Cloudflare Radar",
    link: "https://blog.cloudflare.com/radar-dns-insights/",
    pubDate: "2026-01-20T16:45:00Z",
    author: "Radar Analytics Team",
    description: "Discover DNS request distributions, DNSSEC adoption rates, and regional latency metrics powered by Cloudflare 1.1.1.1 network.",
    content: "Cloudflare Radar DNS Insights gives engineers and network operators granular access to query protocol distribution, root server queries, and domain popularity metrics across 180+ countries.",
    categories: ["DNS", "Radar", "Performance"],
    imageUrl: "https://blog.cloudflare.com/_emdash/api/media/file/01M1JDYW2RHXMJDDXS13K6VESF.01M1JDYX370D7EV4BHCDQS4C6J.png",
    readTime: "4 min read"
  }
];

// Profile route
app.get("/api/profile", (c) => {
  return c.json({
    username: "cyberfrikkie",
    displayName: "cyberfrikkie",
    title: "Tech, translated for the rest of us",
    location: "South Africa • Global Edge Network",
    bio: "The smart friend at the braai who happens to know how AI works. No jargon. Just Frikkie.",
    avatar: "https://avatars.githubusercontent.com/u/1024097?v=4",
    status: "Online • Edge Worker Active",
    stats: {
      workerUptime: "99.99%",
      globalLocations: 330,
      radarDataFeeds: 12,
      activeProjects: 8
    }
  });
});

// Cloudflare Blog Posts RSS route
app.get("/api/blog/posts", async (c) => {
  try {
    const response = await fetch("https://blog.cloudflare.com/rss/", {
      headers: {
        "User-Agent": "CyberFrikkieWorker/1.0 (Cloudflare Personal Site)"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const xmlText = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    
    const parsed = parser.parse(xmlText);
    const items = parsed?.rss?.channel?.item;

    if (!Array.isArray(items) || items.length === 0) {
      return c.json({ posts: FALLBACK_BLOG_POSTS, source: "fallback" });
    }

    const posts: BlogPost[] = items.slice(0, 15).map((item: any, idx: number) => {
      const title = item.title || "Cloudflare Blog Post";
      const link = item.link || "https://blog.cloudflare.com";
      const pubDate = item.pubDate || new Date().toISOString();
      const author = item["dc:creator"] || item.creator || "Cloudflare Team";
      
      // Clean HTML from description
      const rawDesc = item.description || item["content:encoded"] || "";
      const cleanDesc = rawDesc.replace(/<[^>]*>?/gm, "").slice(0, 260) + "...";
      
      // Extract categories
      let categories: string[] = [];
      if (Array.isArray(item.category)) {
        categories = item.category.map((cat: any) => typeof cat === 'string' ? cat : cat['#text'] || '');
      } else if (typeof item.category === 'string') {
        categories = [item.category];
      }
      if (categories.length === 0) categories = ["Cloudflare", "Blog"];

      // Extract image enclosure
      let imageUrl = item.enclosure?.["@_url"] || undefined;

      // Calculate estimate reading time
      const wordCount = rawDesc.split(/\s+/).length;
      const minutes = Math.max(2, Math.ceil(wordCount / 200));

      return {
        id: `rss-${idx}-${Date.now()}`,
        title,
        link,
        pubDate,
        author,
        description: cleanDesc,
        content: rawDesc,
        categories: categories.slice(0, 4),
        imageUrl,
        readTime: `${minutes} min read`
      };
    });

    return c.json({ posts, source: "live_rss" });
  } catch (error: any) {
    console.error("RSS fetch error:", error);
    return c.json({ posts: FALLBACK_BLOG_POSTS, source: "fallback", error: error.message });
  }
});

// Cloudflare Radar Metrics route
app.get("/api/radar/summary", (c) => {
  return c.json({
    updatedAt: new Date().toISOString(),
    globalNetflows: [
      { timestamp: "Mon", trafficIndex: 88, humanPercentage: 62, botPercentage: 38 },
      { timestamp: "Tue", trafficIndex: 94, humanPercentage: 64, botPercentage: 36 },
      { timestamp: "Wed", trafficIndex: 100, humanPercentage: 61, botPercentage: 39 },
      { timestamp: "Thu", trafficIndex: 96, humanPercentage: 65, botPercentage: 35 },
      { timestamp: "Fri", trafficIndex: 92, humanPercentage: 63, botPercentage: 37 },
      { timestamp: "Sat", trafficIndex: 78, humanPercentage: 72, botPercentage: 28 },
      { timestamp: "Sun", trafficIndex: 82, humanPercentage: 70, botPercentage: 30 }
    ],
    attackVectors: [
      { name: "Layer 3/4 DDoS", percentage: 48, color: "#6366f1" },
      { name: "Layer 7 HTTP Floods", percentage: 32, color: "#8b5cf6" },
      { name: "Credential Stuffing", percentage: 12, color: "#ec4899" },
      { name: "WAF Exploits", percentage: 8, color: "#f43f5e" }
    ],
    protocolAdoption: [
      { protocol: "TLS 1.3", adoptionRate: 78.4, color: "#10b981" },
      { protocol: "HTTP/3 (QUIC)", adoptionRate: 34.2, color: "#06b6d4" },
      { protocol: "IPv6 Traffic", adoptionRate: 42.8, color: "#3b82f6" },
      { protocol: "Mobile Traffic", adoptionRate: 58.6, color: "#f59e0b" }
    ],
    aiBotActivity: [
      { botName: "GPTBot (OpenAI)", requestShare: 38.5, status: "Active Crawler" },
      { botName: "ClaudeBot (Anthropic)", requestShare: 24.1, status: "Active Crawler" },
      { botName: "Bytespider (ByteDance)", requestShare: 18.7, status: "High Frequency" },
      { botName: "PerplexityBot", requestShare: 11.2, status: "Active Search" },
      { botName: "Applebot-Extended", requestShare: 7.5, status: "Periodic Crawl" }
    ],
    keyStats: {
      globalMitigatedRequestsSec: "74.5 Million",
      activeBgpRoutes: "948,210",
      avgEdgeLatencyMs: "18ms",
      rpkiValidationShare: "91.4%"
    }
  });
});

export default app;

