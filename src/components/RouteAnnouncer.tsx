import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const RouteAnnouncer: React.FC = () => {
  const { pathname } = useLocation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => setMessage(document.title), 120);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  );
};
