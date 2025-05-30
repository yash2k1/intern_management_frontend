import React, { useEffect, useRef, useState } from 'react';
import MainButtons from './MainButtons';

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowTopBtn(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when at least 10% of footer is visible
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#004785] bottom-0 text-white text-sm py-6 px-4 md:px-12"
    >
      <div className="flex flex-wrap justify-center space-x-2 mb-3 text-center">
        {[
          'Contact Us',
          'Terms & Conditions',
          'Privacy Policy',
          'Copyright Policy',
          'Hyperlink Policy',
          'Accessibility Statement',
          'Website Policy',
          'Help',
          'STQC Certificate',
          'RTI Third Party Audit',
          'Public Grievances',
          'Web Information Manager',
          'Archives',
        ].map((item, index) => (
          <React.Fragment key={index}>
            <a href="#" className="hover:underline whitespace-nowrap">{item}</a>
            {index !== 12 && <span className="mx-1">|</span>}
          </React.Fragment>
        ))}
      </div>

      <div className="text-center mt-2">
        <p className="mb-1">Last Updated: 13/05/2025 &nbsp; | &nbsp; Visitors: 28,436,582</p>
        <p className="font-medium">
          © 2025, DRDO, Ministry of Defence, Government of India
        </p>
      </div>

      
        <MainButtons
          title={
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          }
          onClick={scrollToTop}
          className="sticky left-full bottom-6  p-3 bg-primary hover:bg-secondary cursor-pointer rounded-0 shadow-lg transition"
          aria-label="Scroll to top"
        />
      
    </footer>
  );
};

export default Footer;
