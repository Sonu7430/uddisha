// src/pages/CareersPage.tsx

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Search,
  Filter,
  Grid,
  List,
  DollarSign,
  TrendingUp,
  Clock,
  Briefcase,
  MapPin,
  Tag,
  X,
  ChevronDown,
  Star,
  FileText,
  ChevronRight,
  Download,
  Share2,
  Printer,
  ArrowLeft,
  Lightbulb,
  Compass,
  Award,
  ExternalLink,
  Target,
  Users,
  ArrowRight,
  Zap,
  Bookmark,
  Columns,
  Shield,
} from 'lucide-react';
import { allCareers, careerCategories, Career } from '../data/careers';
import CareerCard from '../components/CareerCard';

// Simple skeleton for loading state
const CareerSkeleton = ({ viewMode }: { viewMode: 'grid' | 'list' }) => (
  <div
    className={`animate-pulse ${viewMode === 'list' ? 'flex items-center p-4 mb-4' : 'p-6'
    } bg-[var(--ud-paper)] rounded-xl border border-[var(--ud-border)]`}
  >
    {viewMode === 'list' ? (
      <>
        <div className="w-24 h-24 bg-[var(--ud-gold-pale)] rounded-lg mr-4" />
        <div className="flex-1">
          <div className="h-6 bg-[var(--ud-gold-pale)] rounded mb-2" />
          <div className="h-4 bg-[var(--ud-gold-pale)] rounded mb-2 w-3/4" />
          <div className="flex space-x-4">
            <div className="h-3 bg-[var(--ud-gold-pale)] rounded w-20" />
            <div className="h-3 bg-[var(--ud-gold-pale)] rounded w-16" />
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="w-full h-48 bg-[var(--ud-gold-pale)] rounded-lg mb-4" />
        <div className="h-6 bg-[var(--ud-gold-pale)] rounded mb-2" />
        <div className="h-4 bg-[var(--ud-gold-pale)] rounded mb-4 w-3/4" />
        <div className="flex justify-between">
          <div className="h-3 bg-[var(--ud-gold-pale)] rounded w-20" />
          <div className="h-3 bg-[var(--ud-gold-pale)] rounded w-16" />
        </div>
      </>
    )}
  </div>
);

const CareersPage: React.FC = () => {
  // --- State ---
  const [searchInput, setSearchInput] = useState(''); // immediate input
  const [searchTerm, setSearchTerm] = useState(''); // debounced term used for filtering
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [selectedEducation, setSelectedEducation] = useState('All');
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 200000]);
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'salary' | 'growth'>(
    'name'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<{
    relevantCategories: string[];
    relevantSubcategories: string[];
    expandedKeywords: string[];
    reasoning: string;
  } | null>(null);

  // extras
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('cc_bookmarks');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [compareIds, setCompareIds] = useState<number[]>([]);

  // refs
  const searchTimeoutRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // --- Utilities ---
  // Deduplicate careers at the source to ensure consistency across the component
  const uniqueCareers = useMemo(() => {
    const seen = new Set<string>();
    return allCareers.filter(career => {
      const lowerCaseName = career.name.toLowerCase();
      return seen.has(lowerCaseName) ? false : seen.add(lowerCaseName);
    });
  }, []);

  const parseSalary = useCallback((salary: string): number => {
    if (!salary) return 0;
    const cleaned = salary.replace(/[^\d.-]/g, '');
    if (!cleaned) return 0;
    if (cleaned.includes('-')) {
      const parts = cleaned.split('-').map((p) => p.trim());
      const a = parseFloat(parts[0]) || 0;
      const b = parseFloat(parts[1]) || 0;
      return (a + b) / 2;
    }
    return parseFloat(cleaned) || 0;
  }, []);

  const isAnyFilterActive = useMemo(() => {
    return (
      searchTerm !== '' ||
      selectedCategory !== 'All' ||
      selectedSubcategory !== 'All' ||
      selectedEducation !== 'All'
    );
  }, [searchTerm, selectedCategory, selectedSubcategory, selectedEducation]);

  // debounced search: update searchTerm after user stops typing
  const debouncedSearch = useCallback(
    (term: string) => {
      if (searchTimeoutRef.current) {
        window.clearTimeout(searchTimeoutRef.current);
      }
      // Standard local search debounce (300ms)
      // @ts-ignore
      searchTimeoutRef.current = window.setTimeout(() => {
        setSearchTerm(term);
        setCurrentPage(1);
      }, 300);

      // AI Search background debounce (1200ms)
      if (term.trim().length >= 3) {
        // @ts-ignore
        const aiTimeout = window.setTimeout(async () => {
          setIsAiLoading(true);
          try {
            const response = await fetch('/.netlify/functions/ai-search', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ query: term })
            });
            if (response.ok) {
              const data = await response.json();
              setAiInsights(data);
            }
          } catch (e) {
            console.error('AI background search error:', e);
          } finally {
            setIsAiLoading(false);
          }
        }, 1200);
      } else {
        setAiInsights(null);
      }
    },
    []
  );

  // --- Derived data / memoized computations ---
  const salaryBounds = useMemo(() => {
    let min = Infinity;
    let max = 0;
    uniqueCareers.forEach((c) => {
      if (c.salary && c.salary !== 'N/A') {
        const val = parseSalary(c.salary);
        if (!isNaN(val)) {
          min = Math.min(min, val);
          max = Math.max(max, val);
        }
      }
    });
    // round
    const lo = min === Infinity ? 0 : Math.floor(min / 1000) * 1000;
    const hi = max === 0 ? 200000 : Math.ceil(max / 1000) * 1000;
    return [lo, hi] as [number, number];
  }, [parseSalary, uniqueCareers]);

  useEffect(() => {
    setSalaryRange(salaryBounds);
  }, [salaryBounds]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: 1800 };
    careerCategories.forEach((cat) => {
      counts[cat] = uniqueCareers.filter((c) => c.category === cat).length;
    });
    return counts;
  }, [uniqueCareers]);

  const subcategoryOptions = useMemo(() => {
    if (selectedCategory === 'All') {
      return ['All', ...Array.from(new Set(uniqueCareers.map((c) => c.subcategory)))];
    }
    return [
      'All',
      ...Array.from(
        new Set(
          uniqueCareers
            .filter((c) => c.category === selectedCategory)
            .map((c) => c.subcategory)
        )
      ),
    ];
  }, [selectedCategory, uniqueCareers]);

  const educationLevels = useMemo(() => {
    const s = new Set<string>();
    uniqueCareers.forEach((c) => {
      if (c.education) s.add(c.education);
    });
    return ['All', ...Array.from(s).sort()];
  }, [uniqueCareers]);

  // Main filtering
  const filteredCareers = useMemo(() => {
    let items = uniqueCareers;

    if (searchTerm) {
      const q = searchTerm.toLowerCase().trim();
      const IN_SYNONYMS: Record<string, string[]> = {
        "coder": ["software", "technology", "developer", "programmer", "coding", "web"],
        "coding": ["software", "technology", "developer", "programmer", "web"],
        "developer": ["software", "technology", "programmer", "web"],
        "it": ["technology", "software", "information technology", "computer"],
        "tech": ["technology", "software", "computer", "engineering"],
        "computer": ["technology", "software", "it"],
        "hacker": ["cybersecurity", "security", "technology", "software"],
        "bca": ["software", "technology", "computer"],
        "mca": ["software", "technology", "computer"],
        "doctor": ["healthcare", "surgeon", "physician", "medical", "clinical", "hospital", "dentist", "pediatrician"],
        "dr": ["healthcare", "surgeon", "physician", "medical", "clinical", "hospital"],
        "nurse": ["healthcare", "nursing", "medical", "hospital", "practitioner"],
        "chemist": ["healthcare", "pharmacy", "pharmacist", "medical"],
        "mbbs": ["healthcare", "doctor", "physician", "surgeon", "medical"],
        "bds": ["healthcare", "dentist", "dental", "medical"],
        "ayurveda": ["healthcare", "medical", "doctor"],
        "clinic": ["healthcare", "medical", "hospital"],
        "btech": ["engineering", "technology", "software", "mechanical", "electrical", "civil"],
        "mtech": ["engineering", "technology"],
        "diploma": ["engineering", "manufacturing", "technician", "mechanic"],
        "polytechnic": ["engineering", "technician", "mechanic"],
        "engineer": ["engineering", "technology", "civil", "mechanical"],
        "ca": ["finance", "accountant", "accounting", "audit", "tax", "chartered accountant", "business"],
        "banker": ["finance", "banking", "investment", "financial", "business"],
        "bank": ["finance", "banking", "accountant", "clerk", "business"],
        "business": ["finance", "management", "entrepreneur", "startup", "sales", "marketing"],
        "vyapar": ["business", "retail", "sales", "commerce"],
        "marketing": ["business", "sales", "advertising", "pr", "media"],
        "hr": ["business", "human resources", "management"],
        "bcom": ["finance", "accounting", "business", "commerce"],
        "mba": ["business", "management", "finance", "marketing", "hr"],
        "manager": ["business", "management", "director", "executive"],
        "teacher": ["education", "professor", "tutor", "instructor", "faculty", "school", "teaching"],
        "sir": ["education", "teacher", "professor"],
        "madam": ["education", "teacher", "professor"],
        "guruji": ["education", "teacher"],
        "masterji": ["education", "teacher"],
        "tuition": ["education", "tutor", "teacher"],
        "school": ["education", "teacher", "administration"],
        "college": ["education", "professor", "faculty"],
        "bed": ["education", "teacher", "teaching"],
        "art": ["arts", "design", "creative", "entertainment", "artist"],
        "artist": ["arts", "design", "creative", "performing"],
        "painter": ["arts", "design", "creative", "construction", "painting"],
        "fashion": ["arts", "design", "boutique", "creative"],
        "designer": ["arts", "design", "creative", "graphics"],
        "lawyer": ["legal", "attorney", "advocate", "judge", "court", "law"],
        "advocate": ["legal", "lawyer", "attorney", "court"],
        "vakil": ["legal", "lawyer", "attorney"],
        "judge": ["legal", "court", "law"],
        "court": ["legal", "lawyer", "judge", "clerk"],
        "llb": ["legal", "lawyer", "advocate", "law"],
        "llm": ["legal", "lawyer", "advocate", "law"],
        "factory": ["manufacturing", "production", "plant", "assembly", "industrial"],
        "mazdoor": ["construction", "manufacturing", "labor", "worker"],
        "builder": ["construction", "architect", "civil"],
        "thekedar": ["construction", "contractor"],
        "mistri": ["construction", "mechanic", "technician", "carpenter", "mason"],
        "carpenter": ["construction", "woodworking", "manufacturing"],
        "plumber": ["construction", "plumbing", "maintenance"],
        "electrician": ["construction", "electrical", "maintenance", "manufacturing"],
        "mechanic": ["manufacturing", "repair", "automotive", "technician"],
        "transport": ["transportation", "logistics", "driving", "delivery", "aviation"],
        "driver": ["transportation", "driving", "logistics", "delivery", "truck"],
        "pilot": ["aviation", "transportation", "aerospace", "aircraft"],
        "railway": ["transportation", "train", "rail"],
        "tc": ["transportation", "railway", "ticket"],
        "sarkari": ["government", "public administration", "defense", "federal", "civil service"],
        "sarkari naukri": ["government", "public administration", "defense"],
        "govt": ["government", "public administration", "federal"],
        "babu": ["public administration", "government", "clerk", "administrative", "bureaucrat"],
        "ias": ["public administration", "government", "civil service", "collector"],
        "ips": ["police", "law enforcement", "public administration"],
        "upsc": ["government", "public administration", "civil service", "ias", "ips"],
        "police": ["law enforcement", "security", "officer", "government"],
        "daroga": ["police", "law enforcement", "government"],
        "fauj": ["military", "defense", "army", "government"],
        "jawan": ["military", "defense", "army", "government"],
        "army": ["military", "defense", "government", "armed forces"],
        "navy": ["military", "defense", "government", "armed forces"],
        "air force": ["military", "defense", "aviation", "aerospace"],
        "agriculture": ["farming", "farm", "crop", "livestock", "agronomy"],
        "kisan": ["agriculture", "farming", "farmer"],
        "krishi": ["agriculture", "farming", "farmer"],
        "vet": ["agriculture", "veterinary", "animal", "healthcare"],
        "dairy": ["agriculture", "animal", "food", "farming"],
        "bijli": ["energy", "electricity", "power", "electrical"],
        "solar": ["energy", "renewable", "power"],
        "retail": ["shop", "store", "sales", "merchandising", "commerce"],
        "dukan": ["retail", "shop", "store", "business"],
        "salesman": ["retail", "sales", "shop", "commerce"],
        "hotel": ["hospitality", "tourism", "restaurant", "accommodation"],
        "restaurant": ["hospitality", "food", "chef", "cook", "waiter"],
        "chef": ["hospitality", "food", "cook", "restaurant", "culinary"],
        "bawarji": ["hospitality", "food", "cook", "chef"],
        "tourism": ["hospitality", "travel", "guide", "tour"],
        "science": ["scientist", "research", "laboratory", "biology", "chemistry", "physics"],
        "scientist": ["science", "research", "laboratory"],
        "vaigyanik": ["science", "scientist", "research"],
        "lab": ["science", "laboratory", "research", "healthcare", "testing"],
        "bsc": ["science", "research", "mathematics", "biology"],
        "msc": ["science", "research", "chemistry", "physics"],
        "news": ["media", "journalism", "reporter", "broadcast", "anchor"],
        "patrakar": ["media", "journalism", "reporter", "news"],
        "tv": ["media", "television", "broadcast", "entertainment"],
        "film": ["media", "entertainment", "movie", "arts", "cinema"],
        "acting": ["media", "entertainment", "actor", "theater", "arts"],
        "hero": ["media", "entertainment", "actor", "arts"],
        "ngo": ["nonprofit", "charity", "social work", "volunteer", "community"],
        "social work": ["nonprofit", "community", "welfare", "ngo"],
        "samaj sevak": ["nonprofit", "social work", "community"],
        "sports": ["athletics", "fitness", "coach", "trainer", "khel"],
        "khel": ["sports", "athletics", "fitness", "game"],
        "coach": ["sports", "training", "fitness", "athletics"],
        "gym": ["sports", "fitness", "health", "trainer"]
      };

      const queriesToCheck = [q];
      if (IN_SYNONYMS[q]) {
        queriesToCheck.push(...IN_SYNONYMS[q]);
      }

      items = items.map((c) => {
        const texts = [
          c.name.toLowerCase(),
          c.description?.toLowerCase() || '',
          c.category.toLowerCase(),
          c.subcategory?.toLowerCase() || '',
          ...(Array.isArray(c.skills) ? c.skills.map((s: string) => s.toLowerCase()) : [])
        ];

        const keywordMatch = queriesToCheck.some(query => texts.some(text => text.includes(query)));
        
        let aiMatch = false;
        if (aiInsights) {
          const catMatch = aiInsights.relevantCategories.some(cat => 
            c.category.toLowerCase() === cat.toLowerCase()
          );
          const subMatch = aiInsights.relevantSubcategories.some(sub => 
            c.subcategory?.toLowerCase() === sub.toLowerCase()
          );
          const keywordExtendMatch = aiInsights.expandedKeywords.some(kw => 
            texts.some(text => text.includes(kw.toLowerCase()))
          );
          aiMatch = catMatch || subMatch || keywordExtendMatch;
        }

        return { ...c, isAiMatch: aiMatch, isKeywordMatch: keywordMatch };
      }).filter(c => (c as any).isKeywordMatch || (c as any).isAiMatch);
    }

    if (selectedCategory !== 'All') {
      items = items.filter((c) => c.category === selectedCategory);
    }
    if (selectedSubcategory !== 'All') {
      items = items.filter((c) => c.subcategory === selectedSubcategory);
    }
    if (selectedEducation !== 'All') {
      items = items.filter((c) => c.education === selectedEducation);
    }

    items = items.filter((c) => {
      if (c.salary && c.salary !== 'N/A') {
        const val = parseSalary(c.salary);
        return val >= salaryRange[0] && val <= salaryRange[1];
      }
      return true;
    });

    items.sort((a: any, b: any) => {
      // 1. Boost AI Matches to the top
      if (a.isAiMatch && !b.isAiMatch) return -1;
      if (!a.isAiMatch && b.isAiMatch) return 1;

      // 2. Standard sorting
      let va: string | number = '';
      let vb: string | number = '';
      switch (sortBy) {
        case 'name':
          va = a.name.toLowerCase();
          vb = b.name.toLowerCase();
          break;
        case 'category':
          va = a.category.toLowerCase();
          vb = b.category.toLowerCase();
          break;
        case 'salary':
          va = parseSalary(a.salary || '0');
          vb = parseSalary(b.salary || '0');
          break;
        case 'growth':
          va = parseFloat((a.growth || '0').toString().replace(/[%+]/g, '')) || 0;
          vb = parseFloat((b.growth || '0').toString().replace(/[%+]/g, '')) || 0;
          break;
        default:
          va = a.name.toLowerCase();
          vb = b.name.toLowerCase();
      }

      if (typeof va === 'string' && typeof vb === 'string') {
        return sortOrder === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      } else if (typeof va === 'number' && typeof vb === 'number') {
        return sortOrder === 'asc' ? va - vb : vb - va;
      }
      return 0;
    });

    return items;
  }, [
    searchTerm,
    selectedCategory,
    selectedSubcategory,
    selectedEducation,
    salaryRange,
    sortBy,
    sortOrder,
    parseSalary,
    uniqueCareers,
    aiInsights
  ]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredCareers.length / itemsPerPage));
  const paginatedCareers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredCareers.slice(start, end);
  }, [filteredCareers, currentPage, itemsPerPage]);

  // --- Handlers ---
  const clearFilters = useCallback(() => {
    setSearchInput('');
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedSubcategory('All');
    setSelectedEducation('All');
    setSalaryRange(salaryBounds);
    setSortBy('name');
    setSortOrder('asc');
    setCurrentPage(1);
  }, [salaryBounds]);

  const handleSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setSearchInput(v);
      debouncedSearch(v);
    },
    [debouncedSearch]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [totalPages]);

  // bookmark + compare features
  const toggleBookmark = useCallback((careerId: number) => {
    setBookmarks((prev) => {
      const next = prev.includes(careerId.toString()) ? prev.filter((id) => id !== careerId.toString()) : [...prev, careerId.toString()];
      try {
        localStorage.setItem('cc_bookmarks', JSON.stringify(next));
      } catch { }
      return next;
    });
  }, []);

  const toggleCompare = useCallback((careerId: number) => {
    setCompareIds((prev) => {
      const already = prev.includes(careerId);
      const next = already ? prev.filter((id) => id !== careerId) : [...prev.slice(0, 2), careerId].slice(-3); // max 3
      return next;
    });
  }, []);

  // sync bookmarks to storage when they change
  useEffect(() => {
    try {
      localStorage.setItem('cc_bookmarks', JSON.stringify(bookmarks));
    } catch { }
  }, [bookmarks]);

  // share a career
  const shareCareer = useCallback((career: any) => {
    const url = `${window.location.origin}/career/${career.id}`;
    if ((navigator as any).share) {
      (navigator as any).share({
        title: career.name,
        text: `Check out this career on Uddisha: ${career.name}`,
        url,
      }).catch(() => { });
    } else {
      navigator.clipboard?.writeText(url).then(() => {
        alert('Career link copied to clipboard!');
      });
    }
  }, []);

  // cleanup timers
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        window.clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // --- Render ---
  return (
    <div className="min-h-screen ud-main text-[var(--ud-ink)]">
      <Helmet>
        <title>Explore 1800+ Career Paths | Uddisha Career Database</title>
        <meta name="description" content="Browse our comprehensive database of 1800+ career options across all industries. Filter by category, salary, education level, and growth potential." />
        <meta property="og:title" content="Explore 1800+ Career Paths | Uddisha" />
        <meta property="og:description" content="Discover your ideal career from 1800+ options with detailed salary, growth, and skill insights." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.uddisha.com/careers" />
      </Helmet>

      {/* Header */}
      <div className="bg-[var(--ud-paper)] border-b border-[var(--ud-border)] z-40 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-[var(--ud-gold-pale)] text-[var(--ud-gold)] rounded-full text-sm font-semibold tracking-wide uppercase animate-fade-in">
            <TrendingUp className="w-4 h-4 mr-2" />
            1,800+ Career Paths Analyzed
          </div>
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--ud-ink)] leading-tight">
              Your Professional Future, <span className="text-[var(--ud-gold)]">Decoded</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--ud-muted)] font-medium leading-relaxed">
              Navigate the complex landscape of modern careers with data-driven insights and AI-powered recommendations.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-[var(--ud-border)] w-full max-w-2xl">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[var(--ud-gold)]">1800+</span>
              <span className="text-xs font-bold text-[var(--ud-muted)] uppercase tracking-widest">Careers</span>
            </div>
            <div className="w-px h-10 bg-[var(--ud-border)]"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[var(--ud-gold)]">{careerCategories.length}</span>
              <span className="text-xs font-bold text-[var(--ud-muted)] uppercase tracking-widest">Categories</span>
            </div>
            <div className="w-px h-10 bg-[var(--ud-border)]"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[var(--ud-gold)]">95%</span>
              <span className="text-xs font-bold text-[var(--ud-muted)] uppercase tracking-widest">Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Controls */}
      <div className="sticky top-0 bg-[var(--ud-paper)]/80 backdrop-blur-md border-b border-[var(--ud-border)] z-30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative mb-6">
            <div className="relative group/search flex-1">
              <div className={`absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors ${isAiLoading ? 'text-[var(--ud-gold)]' : 'text-gray-400 group-focus-within/search:text-[var(--ud-gold)]'}`}>
                <Search className={`h-6 w-6 ${isAiLoading ? 'animate-pulse' : ''}`} />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInput}
                placeholder="Search for your future career (e.g. 'high paying creative jobs')"
                className={`w-full pl-14 pr-4 py-5 rounded-2xl border border-[var(--ud-border)] bg-[var(--ud-paper)] transition-all outline-none text-lg ${isAiLoading ? 'ring-2 ring-[var(--ud-gold)] ring-opacity-20 border-[var(--ud-gold)] shadow-lg' : 'hover:border-[var(--ud-gold)] focus:ring-4 focus:ring-[var(--ud-gold-pale)] focus:border-[var(--ud-gold)] focus:outline-none focus:shadow-md'}`}
              />
              {isAiLoading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-[var(--ud-gold)]">
                  <Zap className="h-4 w-4 animate-bounce" />
                  <span className="text-xs font-semibold animate-pulse uppercase tracking-wider">Smart Search Active</span>
                </div>
              )}
              {aiInsights && !isAiLoading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ud-gold)]" title="Uddisha AI Insights">
                  <span className="text-[11px] font-bold tracking-tight px-2 py-1 rounded" style={{ fontFamily: 'var(--ud-serif)', border: '1px solid var(--ud-gold-pale)' }}>Uddisha</span>
                </div>
              )}
              {!isAiLoading && searchInput && (
                <button
                  aria-label="Clear search"
                  onClick={() => {
                    setSearchInput('');
                    setSearchTerm('');
                    setAiInsights(null);
                    setCurrentPage(1);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ud-muted)] hover:text-[var(--ud-gold)]"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-[var(--ud-gold-pale)] hover:bg-[var(--ud-gold-pale)] px-4 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base font-semibold text-[var(--ud-gold)]"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {isAnyFilterActive && (
                <button
                  onClick={clearFilters}
                  className="text-sm font-bold text-[var(--ud-gold)] hover:underline flex items-center"
                >
                  Reset all
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex bg-[var(--ud-gold-pale)] rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center px-3 py-1.5 rounded-md transition-all duration-200 text-sm font-bold ${viewMode === 'grid' ? 'bg-[var(--ud-paper)] text-[var(--ud-gold)] shadow-sm' : 'text-[var(--ud-muted)]'}`}
                >
                  <Grid className="h-4 w-4 mr-1.5" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center px-3 py-1.5 rounded-md transition-all duration-200 text-sm font-bold ${viewMode === 'list' ? 'bg-[var(--ud-paper)] text-[var(--ud-gold)] shadow-sm' : 'text-[var(--ud-muted)]'}`}
                >
                  <List className="h-4 w-4 mr-1.5" />
                  List
                </button>
              </div>

              <select
                aria-label="Sort careers"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-[var(--ud-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ud-gold)] text-sm bg-[var(--ud-paper)] font-semibold"
              >
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
                <option value="salary">Sort by Salary</option>
                <option value="growth">Sort by Growth</option>
              </select>

              <button
                onClick={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
                className="p-2 border border-[var(--ud-border)] rounded-lg hover:bg-[var(--ud-gold-pale)] text-[var(--ud-gold)]"
                aria-label="Toggle sort order"
              >
                {sortOrder === 'asc' ? <TrendingUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Expandable filters panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-[var(--ud-paper)] rounded-2xl border border-[var(--ud-border)] shadow-xl animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[var(--ud-muted)] mb-2 uppercase tracking-widest">Industry Category</label>
                  <select
                    className="w-full p-3 border border-[var(--ud-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--ud-gold)] bg-[var(--ud-paper)] font-medium"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedSubcategory('All');
                      setCurrentPage(1);
                    }}
                  >
                    <option value="All">All Categories</option>
                    {careerCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat} ({categoryCounts[cat]})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--ud-muted)] mb-2 uppercase tracking-widest">Specialization</label>
                  <select
                    className="w-full p-3 border border-[var(--ud-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--ud-gold)] bg-[var(--ud-paper)] font-medium"
                    value={selectedSubcategory}
                    onChange={(e) => {
                      setSelectedSubcategory(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    {subcategoryOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--ud-muted)] mb-2 uppercase tracking-widest">Education Level</label>
                  <select
                    className="w-full p-3 border border-[var(--ud-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--ud-gold)] bg-[var(--ud-paper)] font-medium"
                    value={selectedEducation}
                    onChange={(e) => {
                      setSelectedEducation(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    {educationLevels.map((lvl) => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--ud-muted)] mb-2 uppercase tracking-widest">Salary Threshold</label>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min={salaryBounds[0]}
                      max={salaryBounds[1]}
                      value={salaryRange[1]}
                      onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value, 10)])}
                      className="w-full h-2 bg-[var(--ud-gold-pale)] rounded-lg appearance-none cursor-pointer accent-[var(--ud-gold)]"
                    />
                    <div className="flex justify-between text-xs font-bold text-[var(--ud-gold)]">
                      <span>${salaryBounds[0].toLocaleString()}</span>
                      <span>MAX ${salaryRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-8 border-b border-[var(--ud-border)] pb-6 gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold flex items-center text-[var(--ud-ink)]">
              <Target className="h-6 w-6 text-[var(--ud-gold)] mr-2" />
              {isAnyFilterActive ? 'Search Results' : 'Premium Career Database'}
            </h2>
            <p className="text-[var(--ud-muted)] font-medium">
              Found {isAnyFilterActive ? filteredCareers.length : '1,800+'} careers matching your preference.
            </p>
          </div>
          <div className="text-sm font-bold text-[var(--ud-muted)] uppercase tracking-widest pb-1">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* No results */}
        {filteredCareers.length === 0 && (
          <div className="text-center py-24 bg-[var(--ud-paper)] rounded-3xl border-2 border-dashed border-[var(--ud-border)]">
            <div className="w-20 h-20 bg-[var(--ud-gold-pale)] rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
              <Star className="w-5 h-5 text-[var(--ud-gold)]" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--ud-ink)] mb-3">No career matches found</h3>
            <p className="text-[var(--ud-muted)] max-w-md mx-auto mb-8 font-medium">
              We couldn't find any careers matching your specific filters. Try expanding your search or resetting all filters.
            </p>
            <button
              onClick={clearFilters}
              className="bg-[var(--ud-gold)] text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Career grid/list */}
        {paginatedCareers.length > 0 && (
          <div
            ref={containerRef}
            className={`grid gap-8 transition-all duration-500 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}
          >
            {paginatedCareers.map((career, index) => (
              <div
                key={career.id}
                className="group relative"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
              >
                <CareerCard career={career} viewMode={viewMode} />
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => toggleBookmark(career.id)}
                    className={`p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-2 transition-all ${bookmarks.includes(career.id.toString()) ? 'border-[var(--ud-gold)] text-[var(--ud-gold)]' : 'border-transparent text-gray-400 hover:text-[var(--ud-gold)]'}`}
                    title="Bookmark"
                  >
                    <Bookmark className="h-5 w-5 fill-current" />
                  </button>
                  <button
                    onClick={() => shareCareer(career)}
                    className="p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-2 border-transparent text-gray-400 hover:text-[var(--ud-gold)] transition-all"
                    title="Share"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && paginatedCareers.length > 0 && (
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between bg-[var(--ud-paper)] rounded-2xl p-6 border border-[var(--ud-border)] shadow-sm gap-6">
            <div className="text-sm font-bold text-[var(--ud-muted)] uppercase tracking-widest">
              Showing {Math.min(((currentPage - 1) * itemsPerPage) + 1, filteredCareers.length)} - {Math.min(currentPage * itemsPerPage, filteredCareers.length)} of {filteredCareers.length}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 border border-[var(--ud-border)] rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--ud-gold-pale)] text-[var(--ud-gold)] transition-all"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5) {
                    if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;
                  }
                  if (pageNum < 1 || pageNum > totalPages) return null;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-12 h-12 rounded-xl text-sm font-bold transition-all duration-300 ${currentPage === pageNum ? 'bg-[var(--ud-gold)] text-white shadow-lg scale-110' : 'bg-[var(--ud-gold-pale)] text-[var(--ud-gold)] hover:bg-[var(--ud-gold)] hover:text-white'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 border border-[var(--ud-border)] rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--ud-gold-pale)] text-[var(--ud-gold)] transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-sm font-bold text-[var(--ud-muted)] uppercase tracking-widest">
              {itemsPerPage} Per Page
            </div>
          </div>
        )}

        {/* Global CTA */}
        <div className="mt-24 relative overflow-hidden bg-[var(--ud-ink)] rounded-[2.5rem] p-10 sm:p-16 text-center text-white space-y-8 animate-fade-in group">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--ud-gold)]/10 to-transparent pointer-events-none"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--ud-gold)]/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="relative space-y-4 max-w-2xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Ready to find your <span className="text-[var(--ud-gold)]">True Calling?</span>
            </h3>
            <p className="text-gray-400 text-lg sm:text-xl font-medium">
              Don't just browse. Take our scientific career assessment to match your personality with the perfect career path in our database.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/assessment"
              className="w-full sm:w-auto bg-[var(--ud-gold)] text-[var(--ud-ink)] px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-[0_0_40px_rgba(200,146,42,0.4)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
            >
              <Zap className="w-6 h-6" />
              <span>Start Free Assessment</span>
            </Link>
            <Link
              to="/counselling"
              className="w-full sm:w-auto bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <Users className="w-6 h-6" />
              <span>Talk to an Expert</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CareersPage;
