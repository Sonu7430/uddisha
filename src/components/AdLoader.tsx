import { useEffect } from'react';

const AdLoader = () => {
 useEffect(() => {
 const loadAds = () => {
 // AdSense
 const adSenseScript = document.createElement('script');
 adSenseScript.src ="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4031853904730913";
 adSenseScript.async = true;
 adSenseScript.crossOrigin ="anonymous";
 document.body.appendChild(adSenseScript);

 // Monetag
 const monetagScript = document.createElement('script');
 monetagScript.src ="//pl20140375.highrevenuegate.com/75/c9/fb/75c9fbd2c6e63d7401e71f843a7c63ce.js";
 monetagScript.defer = true;
 document.body.appendChild(monetagScript);

 // Ezoic
 const ezoicScript = document.createElement('script');
 ezoicScript.src ="//www.ezojs.com/ezoic/sa.min.js";
 ezoicScript.async = true;
 document.body.appendChild(ezoicScript);

 const ezoicConfig = document.createElement('script');
 ezoicConfig.innerHTML = `
 window.ezstandalone = window.ezstandalone || {};
 ezstandalone.cmd = ezstandalone.cmd || [];
 `;
 document.body.appendChild(ezoicConfig);
 };

 // Defer loading by 3 seconds or until idle
 if ('requestIdleCallback' in window) {
 requestIdleCallback(() => setTimeout(loadAds, 3000));
 } else {
 setTimeout(loadAds, 3000);
 }
 }, []);

 return null;
};

export default AdLoader;
