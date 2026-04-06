import React, { useRef, useEffect, useState } from'react';
import { Career } from'../data/careers';

interface VirtualizedCareerListProps {
 careers: Career[];
 renderItem: (career: Career, index: number) => React.ReactNode;
 itemHeight: number;
 viewMode:'grid' |'list';
 columns?: number;
}

const VirtualizedCareerList: React.FC<VirtualizedCareerListProps> = ({
 careers,
 renderItem,
 itemHeight,
 viewMode,
 columns = 3
}) => {
 const containerRef = useRef<HTMLDivElement>(null);
 const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
 const [containerHeight, setContainerHeight] = useState(0);
 const [scrollPosition, setScrollPosition] = useState(0);

 // Calculate the effective item height based on view mode
 const effectiveItemHeight = viewMode ==='grid' ? itemHeight : itemHeight;

 // Calculate how many items to render based on viewport
 const calculateVisibleRange = () => {
 if (!containerRef.current) return;

 const container = containerRef.current;
 const scrollTop = container.scrollTop;
 const viewportHeight = container.clientHeight;

 // Add buffer for smooth scrolling
 const buffer = 5;

 // Calculate visible items
 const itemsPerRow = viewMode ==='grid' ? columns : 1;
 const rowHeight = effectiveItemHeight;

 const startRow = Math.floor(scrollTop / rowHeight) - buffer;
 const endRow = Math.ceil((scrollTop + viewportHeight) / rowHeight) + buffer;

 const start = Math.max(0, startRow * itemsPerRow);
 const end = Math.min(careers.length, endRow * itemsPerRow);

 setVisibleRange({ start, end });
 setScrollPosition(scrollTop);
 };

 // Handle scroll events
 useEffect(() => {
 const container = containerRef.current;
 if (!container) return;

 const handleScroll = () => {
 window.requestAnimationFrame(calculateVisibleRange);
 };

 container.addEventListener('scroll', handleScroll);
 window.addEventListener('resize', calculateVisibleRange);

 calculateVisibleRange();

 return () => {
 container.removeEventListener('scroll', handleScroll);
 window.removeEventListener('resize', calculateVisibleRange);
 };
 }, [careers.length, effectiveItemHeight, viewMode, columns]);

 // Update container height when careers or view mode changes
 useEffect(() => {
 if (!containerRef.current) return;

 const itemsPerRow = viewMode ==='grid' ? columns : 1;
 const rowCount = Math.ceil(careers.length / itemsPerRow);
 const totalHeight = rowCount * effectiveItemHeight;

 setContainerHeight(totalHeight);
 calculateVisibleRange();
 }, [careers.length, effectiveItemHeight, viewMode, columns]);

 // Render only visible items
 const visibleItems = careers.slice(visibleRange.start, visibleRange.end);

 return (
 <div
 ref={containerRef}
 className="scroll-container"
 style={{
 height:'70vh',
 overflowY:'auto',
 position:'relative',
 WebkitOverflowScrolling:'touch'
 }}
 >
 <div
 style={{
 height: containerHeight,
 position:'relative'
 }}
 >
 <div
 style={{
 position:'absolute',
 top: 0,
 left: 0,
 right: 0,
 transform: `translateY(${Math.floor(visibleRange.start / (viewMode ==='grid' ? columns : 1)) * effectiveItemHeight}px)`,
 }}
 className={viewMode ==='grid' ?
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" :
"space-y-3 sm:space-y-4"
 }
 >
 {visibleItems.map((career, index) => (
 renderItem(career, visibleRange.start + index)
 ))}
 </div>
 </div>
 </div>
 );
};

export default VirtualizedCareerList;