import React, { useState, useEffect } from'react';

interface OptimizedImageProps {
 src: string;
 alt: string;
 className?: string;
 width?: number;
 height?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
 src,
 alt,
 className ='',
 width,
 height
}) => {
 const [loaded, setLoaded] = useState(false);
 const [error, setError] = useState(false);

 // Reset states when src changes
 useEffect(() => {
 setLoaded(false);
 setError(false);
 }, [src]);

 const handleLoad = () => {
 setLoaded(true);
 };

 const handleError = () => {
 setError(true);
 };

 return (
 <div className={`relative ${className}`}>
 {!loaded && !error && (
 <div className="absolute inset-0 bg-[var(--ud-gold-pale)] animate-pulse rounded" />
 )}
 {error && (
 <div className="absolute inset-0 bg-[var(--ud-gold-pale)] flex items-center justify-center">
 <span className="text-[var(--ud-muted)] text-sm">Image not available</span>
 </div>
 )}
 <img
 src={src}
 alt={alt}
 className={`${loaded ?'opacity-100' :'opacity-0'} transition-opacity duration-300 w-full h-full object-cover`}
 onLoad={handleLoad}
 onError={handleError}
 loading="lazy"
 width={width}
 height={height}
 />
 </div>
 );
};

export default OptimizedImage;