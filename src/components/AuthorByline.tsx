import React from'react';

const AuthorByline = ({ date, lastUpdated, authorName ="Uddisha Editorial Team", authorRole ="Career Counselors & Industry Experts" }: { date?: string, lastUpdated?: string, authorName?: string, authorRole?: string }) => {
 return (
 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-b border-[var(--ud-border)] py-4 my-6">
 <div className="flex items-center space-x-3 mb-4 sm:mb-0">
 <div className="h-12 w-12 rounded-full bg-[var(--ud-gold-pale)] flex items-center justify-center text-[var(--ud-gold)] font-bold text-xl">
 CC
 </div>
 <div>
 <p className="font-semibold text-[var(--ud-ink)] text-sm sm:text-base">{authorName}</p>
 <p className="text-xs text-[var(--ud-muted)]">{authorRole}</p>
 </div>
 </div>
 <div className="text-left sm:text-right">
 {date && <p className="text-xs sm:text-sm text-[var(--ud-muted)]">Published: <span className="font-medium">{date}</span></p>}
 <p className="text-xs sm:text-sm text-[var(--ud-muted)]">Last Updated: <span className="font-medium">{lastUpdated || new Date().toLocaleDateString('en-US', { month:'long', year:'numeric'})}</span></p>
 </div>
 </div>
 );
};

export default AuthorByline;
