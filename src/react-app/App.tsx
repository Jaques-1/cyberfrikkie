import { useState, useEffect } from 'react';
import { BlogPost, RadarData, ProfileData, TabType } from './types';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { OverviewCards } from './components/OverviewCards';
import { BlogFeed } from './components/BlogFeed';
import { BlogDetailModal } from './components/BlogDetailModal';
import { RadarDashboard } from './components/RadarDashboard';
import { AboutSection } from './components/AboutSection';
import { Zap, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Data states
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [radarData, setRadarData] = useState<RadarData | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Loading states
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(true);
  const [, setIsLoadingRadar] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Fetch Profile
  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (e) {
      console.warn('Profile fetch fallback active');
    }
  };

  // Fetch Blog Posts
  const fetchPosts = async () => {
    setIsLoadingPosts(true);
    try {
      const res = await fetch('/api/blog/posts');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        }
      }
    } catch (e) {
      console.warn('Blog fetch error:', e);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  // Fetch Radar Metrics
  const fetchRadar = async () => {
    setIsLoadingRadar(true);
    try {
      const res = await fetch('/api/radar/summary');
      if (res.ok) {
        const data = await res.json();
        setRadarData(data);
      }
    } catch (e) {
      console.warn('Radar fetch error:', e);
    } finally {
      setIsLoadingRadar(false);
    }
  };

  // Global Refresh Action
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchProfile(), fetchPosts(), fetchRadar()]);
    setIsRefreshing(false);
  };

  // Initial Fetch
  useEffect(() => {
    fetchProfile();
    fetchPosts();
    fetchRadar();
  }, []);

  return (
    <div className="min-h-screen bg-[#14100D] text-[#E8E2D4] pb-20 font-serif">
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onRefreshData={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Profile Hero Banner */}
        <HeroBanner profile={profile} />

        {/* Overview Metric Cards Row */}
        <OverviewCards
          posts={posts}
          radarData={radarData}
          onSelectTab={setActiveTab}
        />

        {/* Main Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Latest Cloudflare Intelligence & Posts
              </h2>
              <button
                onClick={() => setActiveTab('blog')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                View All Posts <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <BlogFeed
              posts={posts.slice(0, 6)}
              onSelectPost={setSelectedPost}
              isLoading={isLoadingPosts}
            />

            <RadarDashboard radarData={radarData} />
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Cloudflare Official Blog Feed
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Real-time RSS updates from blog.cloudflare.com parsed at the edge.
              </p>
            </div>

            <BlogFeed
              posts={posts}
              onSelectPost={setSelectedPost}
              isLoading={isLoadingPosts}
            />
          </div>
        )}

        {activeTab === 'radar' && (
          <RadarDashboard radarData={radarData} />
        )}

        {activeTab === 'about' && (
          <AboutSection profile={profile} />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-[#4A453B] py-8 text-center text-xs font-mono text-[#4A453B] bg-[#14100D]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#39FF8A]" />
            <span className="font-bold">
              <span className="text-[#39FF8A]">cyber</span>
              <span className="text-[#E8672C]">frikkie</span>
            </span>
            <span className="text-[#E8E2D4]"> — Tech, translated for the rest of us</span>
          </div>

          <p className="text-[#4A453B]">
            Data sourced from <a href="https://blog.cloudflare.com" target="_blank" rel="noreferrer" className="text-[#39FF8A] underline">blog.cloudflare.com</a> & <a href="https://radar.cloudflare.com" target="_blank" rel="noreferrer" className="text-[#E8672C] underline">radar.cloudflare.com</a>
          </p>
        </div>
      </footer>

      {/* Article Detail Drawer Modal */}
      <BlogDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

    </div>
  );
}
