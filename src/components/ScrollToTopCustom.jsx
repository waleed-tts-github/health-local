import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTopCustom() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = (duration = 1000) => {
      const start = window.pageYOffset;
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

        window.scrollTo(0, start * (1 - easeInOutQuad(progress)));

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    };

    scrollToTop(1000); // 1000ms for a slower scroll
  }, [pathname]);

  return null;
}

export default ScrollToTopCustom;