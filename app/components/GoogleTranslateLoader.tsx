"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
    googleTranslateElementInitMobile: () => void;
  }
}

interface GoogleTranslateLoaderProps {
  targetId?: string;
  isMobile?: boolean;
}

export default function GoogleTranslateLoader({ 
  targetId = "google_translate_element",
  isMobile = false
}: GoogleTranslateLoaderProps) {
  useEffect(() => {
    // Add comprehensive styles
    const styleId = "google-translate-custom-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        /* Hide Google Translate banner and branding */
        .skiptranslate iframe,
        .goog-te-banner-frame,
        .goog-te-banner,
        .goog-logo-link,
        .goog-te-balloon-frame,
        #goog-gt-tt,
        .goog-te-gadget span:first-child {
          display: none !important;
        }
        
        body {
          top: 0 !important;
          position: static !important;
        }

        /* Base gadget styling */
        .goog-te-gadget {
          font-family: inherit !important;
          font-size: 0 !important;
          line-height: 0 !important;
        }

        .goog-te-gadget-icon {
          display: none !important;
        }

        /* Desktop wrapper */
        .google-translate-desktop {
          display: inline-block !important;
        }

        .google-translate-desktop .goog-te-gadget-simple {
          background-color: white !important;
          border: 2px solid #0000FF !important;
          border-radius: 9999px !important;
          padding: 10px 20px !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          font-family: inherit !important;
        }

        .google-translate-desktop .goog-te-gadget-simple:hover {
          background-color: #0000FF !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 255, 0.3) !important;
        }

        .google-translate-desktop .goog-te-menu-value {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
        }

        .google-translate-desktop .goog-te-menu-value span {
          color: #0000FF !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          font-family: inherit !important;
        }

        .google-translate-desktop .goog-te-menu-value span:last-child {
          font-size: 12px !important;
          opacity: 0.8 !important;
        }

        .google-translate-desktop .goog-te-gadget-simple:hover .goog-te-menu-value span {
          color: white !important;
        }

        /* Add "Select Language" label */
        .google-translate-desktop .goog-te-menu-value::before {
          content: "Select Language: 🌐";
          font-size: 14px;
          margin-right: 6px;
          font-weight: 600;
        }

        /* Mobile compact version (outside hamburger menu) */
        .google-translate-mobile-compact {
          display: inline-block !important;
        }

        .google-translate-mobile-compact .goog-te-gadget {
          font-family: inherit !important;
          font-size: 0 !important;
          line-height: 0 !important;
        }

        .google-translate-mobile-compact .goog-te-gadget-simple {
          background-color: white !important;
          border: 2px solid #0000FF !important;
          border-radius: 8px !important;
          padding: 8px 10px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          font-family: inherit !important;
          min-width: 45px !important;
        }

        .google-translate-mobile-compact .goog-te-gadget-simple:hover,
        .google-translate-mobile-compact .goog-te-gadget-simple:active {
          background-color: #0000FF !important;
          transform: scale(0.95) !important;
        }

        .google-translate-mobile-compact .goog-te-menu-value {
          display: flex !important;
          align-items: center !important;
          gap: 4px !important;
        }

        .google-translate-mobile-compact .goog-te-menu-value span {
          color: #0000FF !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          font-family: inherit !important;
        }

        .google-translate-mobile-compact .goog-te-gadget-simple:hover .goog-te-menu-value span {
          color: white !important;
        }

        /* Globe icon for compact mobile */
        .google-translate-mobile-compact .goog-te-menu-value::before {
          content: "🌐";
          font-size: 16px;
        }

        .google-translate-mobile-compact .goog-te-gadget-icon {
          display: none !important;
        }

        /* Dropdown menu styling - DESKTOP */
        .goog-te-menu-frame {
          border: 2px solid #e5e7eb !important;
          border-radius: 16px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          background: white !important;
          animation: fadeInDown 0.3s ease-out !important;
        }

        .goog-te-menu-frame.box {
          padding: 8px !important;
        }

        .goog-te-menu2 {
          border: none !important;
          background: white !important;
          padding: 8px !important;
        }

        /* Language items with enhanced styling */
        .goog-te-menu2-item {
          padding: 14px 18px !important;
          margin: 3px 0 !important;
          font-size: 15px !important;
          font-weight: 500 !important;
          color: #374151 !important;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
          border-radius: 10px !important;
          cursor: pointer !important;
          font-family: inherit !important;
          border: none !important;
        }

        .goog-te-menu2-item:hover {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%) !important;
          color: #0000FF !important;
          transform: translateX(6px) !important;
          padding-left: 24px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 255, 0.1), 0 2px 4px -1px rgba(0, 0, 255, 0.06) !important;
        }

        .goog-te-menu2-item-selected {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%) !important;
          color: #0000FF !important;
          font-weight: 700 !important;
          border-left: 4px solid #0000FF !important;
          padding-left: 18px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 255, 0.15), 0 2px 4px -1px rgba(0, 0, 255, 0.1) !important;
        }

        .goog-te-menu2-item div {
          color: inherit !important;
          font-family: inherit !important;
        }

        .goog-te-menu2-item-selected::after {
          content: "✓";
          margin-left: 8px;
          color: #0000FF;
          font-weight: bold;
          font-size: 18px;
        }

        .goog-te-menu2-item:hover::before {
          content: "▶";
          position: absolute;
          left: 8px;
          color: #0000FF;
          font-size: 12px;
          opacity: 0.7;
        }

        /* MOBILE SPECIFIC - HORIZONTAL SCROLLING */
        @media (max-width: 768px) {
          /* Create a wrapper with scroll indicator */
          .goog-te-menu-frame {
            position: fixed !important;
            left: 50% !important;
            top: 100px !important;
            transform: translateX(-50%) !important;
            width: 90vw !important;
            max-width: 90vw !important;
            max-height: 65vh !important;
            z-index: 999999 !important;
            overflow: hidden !important;
            border-radius: 12px !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
          }

          /* Add scroll instruction banner */
          .goog-te-menu-frame::before {
            content: "👆 SCROLL UP TO SEE ALL LANGUAGES 👆";
            display: block;
            position: sticky;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: linear-gradient(135deg, #0000FF 0%, #5a8cff 100%);
            color: white;
            text-align: center;
            padding: 12px 8px;
            font-weight: 700;
            font-size: 11px;
            letter-spacing: 0.5px;
            border-radius: 8px 8px 0 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            animation: pulse 2s ease-in-out infinite;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }

          /* Make menu2 scrollable horizontally */
          .goog-te-menu2 {
            overflow-x: auto !important;
            overflow-y: auto !important;
            max-height: calc(65vh - 48px) !important;
            padding: 12px 8px 8px 8px !important;
            -webkit-overflow-scrolling: touch;
          }

          /* Make table full width for vertical stacking */
          .goog-te-menu2 table {
            width: 100% !important;
            min-width: unset !important;
            border-collapse: separate !important;
            border-spacing: 4px !important;
          }

          .goog-te-menu2-item {
            white-space: normal !important;
            min-width: unset !important;
            padding: 14px 16px !important;
            font-size: 15px !important;
            touch-action: manipulation;
            display: block !important;
            width: 100% !important;
          }

          /* Prominent scrollbars for mobile */
          .goog-te-menu2::-webkit-scrollbar {
            width: 14px !important;
            height: 14px !important;
          }

          .goog-te-menu2::-webkit-scrollbar-track {
            background: #f1f5f9 !important;
            border-radius: 10px !important;
            margin: 4px !important;
          }

          .goog-te-menu2::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #0000FF 0%, #5a8cff 100%) !important;
            border-radius: 10px !important;
            border: 3px solid #f1f5f9 !important;
          }

          .goog-te-menu2::-webkit-scrollbar-thumb:active {
            background: #0000CC !important;
          }

          /* Corner scrollbar */
          .goog-te-menu2::-webkit-scrollbar-corner {
            background: #f1f5f9 !important;
          }
        }

        /* Animation for dropdown */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .goog-te-combo {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Minimal observer - just ensure mobile scrolling works
    let observer: MutationObserver | null = null;
    
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      observer = new MutationObserver(() => {
        const menu2 = document.querySelector('.goog-te-menu2');
        if (menu2) {
          const element = menu2 as HTMLElement;
          element.style.setProperty('overflow-x', 'auto', 'important');
          element.style.setProperty('overflow-y', 'auto', 'important');
          element.style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    // Separate initialization functions for desktop and mobile
    const initFunctionName = isMobile ? 'googleTranslateElementInitMobile' : 'googleTranslateElementInit';
    
    // Define initialization
    window[initFunctionName] = () => {
      const element = document.getElementById(targetId);
      if (element && window.google?.translate?.TranslateElement) {
        element.innerHTML = '';
        
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true,
          },
          targetId
        );
      }
    };

    // Check if script already loaded
    const scriptId = `google-translate-script-${isMobile ? 'mobile' : 'desktop'}`;
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `//translate.google.com/translate_a/element.js?cb=${initFunctionName}`;
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window[initFunctionName]();
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
      const scriptElement = document.getElementById(scriptId);
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [targetId, isMobile]);

  return null;
}