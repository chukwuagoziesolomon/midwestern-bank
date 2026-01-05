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

        /* Dropdown menu styling */
        .goog-te-menu-frame {
          border: 2px solid #e5e7eb !important;
          border-radius: 16px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          max-height: 450px !important;
          max-width: 400px !important;
          overflow: hidden !important;
          background: white !important;
          animation: fadeInDown 0.3s ease-out !important;
        }

        .goog-te-menu-frame.box {
          padding: 8px !important;
        }

        .goog-te-menu2 {
          border: none !important;
          background: white !important;
          max-height: 450px !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          padding: 8px !important;
        }

        /* Force single-column layout for ALL screen sizes (desktop + mobile) */
        .goog-te-menu2 table {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          table-layout: fixed !important;
          border-collapse: separate !important;
        }

        .goog-te-menu2 tbody {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
        }

        .goog-te-menu2 tr {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          float: none !important;
          clear: both !important;
        }

        .goog-te-menu2 td {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          float: none !important;
          clear: both !important;
          padding: 0 !important;
        }
        
        /* Override any inline styles Google might add - more aggressive */
        .goog-te-menu2 td[style] {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          float: none !important;
        }
        
        .goog-te-menu2 tr[style] {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          float: none !important;
        }

        .goog-te-menu2 table[style] {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        /* Language items with enhanced styling - SINGLE COLUMN */
        .goog-te-menu2-item {
          width: 100% !important;
          display: block !important;
          box-sizing: border-box !important;
          white-space: normal !important;
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
          position: relative !important;
          float: none !important;
          clear: both !important;
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

        /* Add checkmark to selected language */
        .goog-te-menu2-item-selected::after {
          content: "✓";
          margin-left: 8px;
          color: #0000FF;
          font-weight: bold;
          font-size: 18px;
        }

        /* Add hover indicator */
        .goog-te-menu2-item:hover::before {
          content: "▶";
          position: absolute;
          left: 8px;
          color: #0000FF;
          font-size: 12px;
          opacity: 0.7;
        }

        /* Custom scrollbar with enhanced styling */
        .goog-te-menu2::-webkit-scrollbar {
          width: 10px;
        }

        .goog-te-menu2::-webkit-scrollbar-track {
          background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%);
          border-radius: 10px;
          margin: 8px 0;
          border: 1px solid #e5e7eb;
        }

        .goog-te-menu2::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #0000FF 0%, #5a8cff 100%);
          border-radius: 10px;
          border: 2px solid #f9fafb;
          transition: all 0.3s ease;
        }

        .goog-te-menu2::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #5a8cff 0%, #0000FF 100%);
          border: 2px solid #e5e7eb;
          box-shadow: 0 0 6px rgba(0, 0, 255, 0.4);
        }

         /* Mobile specific - force single column & fit viewport */
         @media (max-width: 768px) {
           .goog-te-menu-frame {
             width: 100vw !important;
             max-width: 100vw !important;
             left: 0 !important;
             right: 0 !important;
             transform: none !important;
             position: fixed !important;
             z-index: 2147483647 !important;
             top: 80px !important;
             max-height: 70vh !important;
             overflow-y: auto !important;
             overflow-x: hidden !important;
             margin: 0 !important;
             border-radius: 12px !important;
             padding: 0 !important;
           }
           
           .goog-te-menu2 {
             max-height: 70vh !important;
             width: 100% !important;
             padding: 8px !important;
             overflow-x: hidden !important;
           }

           /* Force table to single column */
           .goog-te-menu2 table,
           .goog-te-menu2 tbody,
           .goog-te-menu2 tr,
           .goog-te-menu2 td {
             display: block !important;
             width: 100% !important;
           }
           
           .goog-te-menu2-item {
             width: 100% !important;
             display: block !important;
             padding: 12px 14px !important;
             font-size: 16px !important;
             min-height: 48px !important;
             box-sizing: border-box !important;
             white-space: normal !important;
           }

           .goog-te-menu2-item-selected::after {
             font-size: 20px !important;
           }

           .goog-te-menu2::-webkit-scrollbar {
             width: 10px !important;
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

        /* Hide the combo select if present */
        .goog-te-combo {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Dropdown fix with MutationObserver (runs AFTER widget loads) - Works for both desktop and mobile
    let observer: MutationObserver | null = null;
    
    // Function to force single-column layout
    const forceSingleColumn = () => {
      const menu2 = document.querySelector('.goog-te-menu2');
      if (!menu2) return;
      
      // Force table structure to block layout
      const tables = menu2.querySelectorAll('table');
      tables.forEach((el) => {
        const element = el as HTMLElement;
        element.style.display = 'block';
        element.style.width = '100%';
        element.style.tableLayout = 'fixed';
      });
      
      const tbodies = menu2.querySelectorAll('tbody');
      tbodies.forEach((el) => {
        const element = el as HTMLElement;
        element.style.display = 'block';
        element.style.width = '100%';
      });
      
      const rows = menu2.querySelectorAll('tr');
      rows.forEach((el) => {
        const element = el as HTMLElement;
        element.style.display = 'block';
        element.style.width = '100%';
        element.style.float = 'none';
        element.style.clear = 'both';
      });
      
      const cells = menu2.querySelectorAll('td');
      cells.forEach((el) => {
        const element = el as HTMLElement;
        element.style.display = 'block';
        element.style.width = '100%';
        element.style.float = 'none';
      });
      
      // Force items to be block-level
      const items = menu2.querySelectorAll('.goog-te-menu2-item');
      items.forEach((item) => {
        const element = item as HTMLElement;
        element.style.width = '100%';
        element.style.display = 'block';
        element.style.boxSizing = 'border-box';
        element.style.whiteSpace = 'normal';
        element.style.float = 'none';
        element.style.clear = 'both';
      });
    };
    
    if (typeof window !== 'undefined') {
      observer = new MutationObserver(() => {
        const menuFrame = document.querySelector('.goog-te-menu-frame');
        const menu2 = document.querySelector('.goog-te-menu2');
        
        if (menuFrame && menu2) {
          // Apply fix immediately and with delays to catch all render cycles
          forceSingleColumn();
          setTimeout(forceSingleColumn, 50);
          setTimeout(forceSingleColumn, 150);
          setTimeout(forceSingleColumn, 300);
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      // Also check periodically when dropdown might be opening
      const checkInterval = setInterval(() => {
        const menu2 = document.querySelector('.goog-te-menu2');
        if (menu2 && menu2.children.length > 0) {
          forceSingleColumn();
        }
      }, 200);
      
      // Store interval for cleanup
      (window as any).__googleTranslateInterval = checkInterval;
    }

    // Separate initialization functions for desktop and mobile
    const initFunctionName = isMobile ? 'googleTranslateElementInitMobile' : 'googleTranslateElementInit';
    
    // Define initialization
    window[initFunctionName] = () => {
      const element = document.getElementById(targetId);
      if (element && window.google?.translate?.TranslateElement) {
        // Clear existing content
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
      // Load script
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `//translate.google.com/translate_a/element.js?cb=${initFunctionName}`;
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      // Script already loaded, just initialize
      window[initFunctionName]();
    }

    return () => {
      // Cleanup
      if (observer) {
        observer.disconnect();
      }
      if ((window as any).__googleTranslateInterval) {
        clearInterval((window as any).__googleTranslateInterval);
        delete (window as any).__googleTranslateInterval;
      }
      const scriptElement = document.getElementById(scriptId);
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [targetId, isMobile]);

  return null;
}