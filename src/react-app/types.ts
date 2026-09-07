export interface BlogPost {
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

export interface ProfileData {
  username: string;
  displayName: string;
  title: string;
  location: string;
  bio: string;
  avatar: string;
  status: string;
  stats: {
    workerUptime: string;
    globalLocations: number;
    radarDataFeeds: number;
    activeProjects: number;
  };
}

export interface NetflowPoint {
  timestamp: string;
  trafficIndex: number;
  humanPercentage: number;
  botPercentage: number;
}

export interface AttackVector {
  name: string;
  percentage: number;
  color: string;
}

export interface ProtocolAdoption {
  protocol: string;
  adoptionRate: number;
  color: string;
}

export interface AiBotActivity {
  botName: string;
  requestShare: number;
  status: string;
}

export interface RadarData {
  updatedAt: string;
  globalNetflows: NetflowPoint[];
  attackVectors: AttackVector[];
  protocolAdoption: ProtocolAdoption[];
  aiBotActivity: AiBotActivity[];
  keyStats: {
    globalMitigatedRequestsSec: string;
    activeBgpRoutes: string;
    avgEdgeLatencyMs: string;
    rpkiValidationShare: string;
  };
}

export type TabType = 'overview' | 'blog' | 'radar' | 'about';
