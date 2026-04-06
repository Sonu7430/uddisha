import React from'react';

interface LoadingFallbackProps {
 size?:'small' |'medium' |'large';
 message?: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({
 size ='medium',
 message ='Loading...'
}) => {
 // Size mapping for spinner
 const spinnerSizes = {
 small:'h-8 w-8',
 medium:'h-12 w-12',
 large:'h-16 w-16'
 };

 return (
 <div className="min-h-screen flex flex-col items-center justify-center" style={{ background:'var(--ud-paper)' }}>
 <div className={`animate-spin rounded-full ${spinnerSizes[size]} border-t-2 border-b-2 mb-4`} style={{ borderColor:'var(--ud-gold)' }}></div>
 <h1 className="sr-only">Loading Content</h1>
 {message && <p className="animate-pulse" style={{ color:'var(--ud-muted)' }}>{message}</p>}
 </div>
 );
};

export default LoadingFallback;