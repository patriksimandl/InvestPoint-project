import { useEffect, useState } from 'react';

export function RateLimitMessage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleRateLimitError = () => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 4000);
    };

    window.addEventListener('rateLimitError', handleRateLimitError);
    return () => window.removeEventListener('rateLimitError', handleRateLimitError);
  }, []);

  return (
    <div 
      className="fixed bottom-6 left-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[999] transition-all duration-500 ease-out"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(-50%)' : 'translateX(-50%) translateY(20px)',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      Too many requests. Please try again later.
    </div>
  );
}
