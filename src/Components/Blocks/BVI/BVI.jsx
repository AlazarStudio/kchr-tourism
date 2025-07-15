import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useAccessibilityScript() {
  const location = useLocation();

  useEffect(() => {
    const scriptId = 'accessibility-script';
    const existingScript = document.getElementById(scriptId);

    if (!location.pathname.startsWith('/admin')) {
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://lidrekon.ru/slep/js/uhpv-full.min.js';
        script.async = true;
        script.id = scriptId;
        document.body.appendChild(script);
      }
    } else {
      if (existingScript) {
        existingScript.parentNode.removeChild(existingScript);
      }
    }
  }, [location.pathname]);
}
