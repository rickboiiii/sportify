"use client";
import { GlobalStyle } from '@/styles/GlobalStyle';
import { useEffect } from 'react';

export default function BootstrapContainer({ children }) {
  useEffect(() => {
    // Load Bootstrap CSS when the component mounts
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Bootstrap JavaScript when the component mounts
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Remove the link and script when the component unmounts
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="">
      <GlobalStyle/>{children}
    </div>
  );
}
