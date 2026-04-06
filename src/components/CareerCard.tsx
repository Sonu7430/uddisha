import React from'react';
import { Link } from'react-router-dom';
import { DollarSign, TrendingUp, Clock, Briefcase, ChevronRight, MapPin, Star, Users, Brain, Zap } from'lucide-react';
import OptimizedImage from'./OptimizedImage';

interface CareerCardProps {
 career: any;
 viewMode:'grid' |'list';
}

const CareerCard: React.FC<CareerCardProps> = ({ career, viewMode }) => {
 const getStressLevelColor = (level: string) => {
 switch (level) {
 case'Low': return'text-[var(--ud-ink)] bg-[var(--ud-gold-pale)]';
 case'Medium': return'text-[var(--ud-gold)] bg-yellow-100';
 case'High': return'text-[var(--ud-ink)] bg-red-100';
 default: return'text-[var(--ud-muted)] bg-[var(--ud-gold-pale)]';
 }
 };

 const getGrowthColor = (growth: string) => {
 const rate = parseFloat(growth.replace(/[%+]/g,''));
 if (rate > 10) return'text-[var(--ud-ink)]';
 if (rate > 5) return'text-[var(--ud-gold)]';
 if (rate > 0) return'text-[var(--ud-gold)]';
 return'text-[var(--ud-ink)]';
 };

 return (
 <Link to={`/career/${career.id}`}>
 <div
 className={`relative group bg-[var(--ud-paper)] rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-[var(--ud-border)] hover:border-[var(--ud-gold)] transform hover:-translate-y-1 ${
 viewMode ==='list' ?'flex items-center p-4 sm:p-6' :'p-4 sm:p-6'
 }`}
 >
 {/* Category Badge */}
 <div className={`absolute top-3 right-3 ${viewMode ==='list' ?'hidden' :'block'}`}>
 <span className="bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] text-xs font-medium px-2 py-1 rounded-full">
 {career.category}
 </span>
 </div>

 {/* AI Match Badge */}
 {career.isAiMatch && (
 <div className={`absolute top-3 left-3 z-10 flex items-center bg-gradient-to-r from-blue-500 to-[var(--ud-gold)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse`}>
 <Zap className="h-3 w-3 mr-1" />
 AI MATCH
 </div>
 )}

 {career.image && (
 <div className={viewMode ==='list' ?'w-20 h-20 sm:w-24 sm:h-24 mr-4 flex-shrink-0' :'w-full h-40 sm:h-48 mb-4'}>
 <OptimizedImage 
 src={career.image} 
 alt={career.name} 
 className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" 
 />
 </div>
 )}
 
 <div className={viewMode ==='list' ?'flex-grow' :''}>
 {/* Career Title and Category */}
 <div className="mb-3">
 <h2 className="text-lg sm:text-xl font-bold text-[var(--ud-ink)] mb-1 group-hover:text-[var(--ud-gold)] transition-colors line-clamp-2">
 {career.name}
 </h2>
 {viewMode ==='list' && (
 <div className="flex items-center space-x-2 mb-2">
 <span className="bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] text-xs font-medium px-2 py-1 rounded-full">
 {career.category}
 </span>
 <span className="bg-[var(--ud-gold-pale)] text-[var(--ud-muted)] text-xs px-2 py-1 rounded-full">
 {career.subcategory}
 </span>
 </div>
 )}
 </div>

 {/* Description */}
 <p className="text-[var(--ud-muted)] text-sm mb-4 line-clamp-2 leading-relaxed">
 {career.description}
 </p>

 {/* Career Attributes */}
 <div className="grid grid-cols-2 gap-2 mb-4">
 <div className="flex items-center text-xs text-[var(--ud-muted)]">
 <Brain className="h-3 w-3 mr-1 text-[var(--ud-gold)]" />
 <span>Analytical: {career.analytical}/10</span>
 </div>
 <div className="flex items-center text-xs text-[var(--ud-muted)]">
 <Users className="h-3 w-3 mr-1 text-purple-500" />
 <span>Social: {career.social}/10</span>
 </div>
 <div className="flex items-center text-xs text-[var(--ud-muted)]">
 <Star className="h-3 w-3 mr-1 text-yellow-500" />
 <span>Creative: {career.creative}/10</span>
 </div>
 <div className="flex items-center text-xs text-[var(--ud-muted)]">
 <Briefcase className="h-3 w-3 mr-1 text-green-500" />
 <span>Leadership: {career.leadership}/10</span>
 </div>
 </div>

 {/* Key Stats */}
 <div className="space-y-2 mb-4">
 <div className="flex items-center justify-between text-sm">
 <span className="flex items-center text-[var(--ud-muted)]">
 <DollarSign className="h-4 w-4 mr-1 text-[var(--ud-ink)]" />
 Salary
 </span>
 <span className="font-semibold text-[var(--ud-ink)]">{career.salary}</span>
 </div>
 
 <div className="flex items-center justify-between text-sm">
 <span className="flex items-center text-[var(--ud-muted)]">
 <TrendingUp className="h-4 w-4 mr-1 text-[var(--ud-gold)]" />
 Growth
 </span>
 <span className={`font-semibold ${getGrowthColor(career.growth)}`}>
 {career.growth}
 </span>
 </div>
 
 <div className="flex items-center justify-between text-sm">
 <span className="flex items-center text-[var(--ud-muted)]">
 <Clock className="h-4 w-4 mr-1 text-[var(--ud-gold)]" />
 Education
 </span>
 <span className="font-medium text-[var(--ud-ink)]">{career.education}</span>
 </div>
 </div>

 {/* Additional Info */}
 <div className="flex items-center justify-between text-xs text-[var(--ud-muted)] mb-4">
 <div className="flex items-center space-x-3">
 {career.remote && (
 <span className="flex items-center bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] px-2 py-1 rounded-full">
 <MapPin className="h-3 w-3 mr-1" />
 Remote OK
 </span>
 )}
 <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStressLevelColor(career.stressLevel)}`}>
 {career.stressLevel} Stress
 </span>
 </div>
 </div>

 {/* Action Button */}
 <div className="flex items-center justify-between">
 <div className="text-[var(--ud-gold)] hover:text-[var(--ud-gold)] font-medium text-sm group-hover:underline transition-all duration-200">
 Learn More
 </div>
 <ChevronRight className="h-4 w-4 text-[var(--ud-muted)] group-hover:text-[var(--ud-gold)] group-hover:translate-x-1 transition-all duration-200" />
 </div>
 </div>
 </div>
 </Link>
 );
};

export default CareerCard;