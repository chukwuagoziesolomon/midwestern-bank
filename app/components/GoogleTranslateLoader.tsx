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
    // ===== DIAGNOSTIC LOGGING =====
    console.log(`[GoogleTranslateLoader] Component mounted - isMobile: ${isMobile}, targetId: ${targetId}`);
    
    // --- Mutation Observer: Mobile Google Translate Dropdown Fix ---
    let mobileObserver: MutationObserver | undefined;
    if (isMobile && typeof window !== "undefined") {
      console.log('[GoogleTranslateLoader] Setting up mobile observer');
      mobileObserver = new MutationObserver(() => {
        const frame = document.querySelector('.goog-te-menu-frame') as HTMLElement | null;
        if (frame) {
          console.log('[GoogleTranslateLoader] Dropdown frame detected! Applying mobile styles...');
          frame.style.maxWidth = '96vw';
          frame.style.width = 'auto';
          frame.style.left = '50%';
          frame.style.transform = 'translateX(-50%)';
          frame.style.margin = '0 auto';
          frame.style.maxHeight = '380px';
          frame.style.padding = '0';
          frame.style.zIndex = '9999';
          frame.style.position = 'fixed';

          // Try to make language items inline/horizontal scroll (if Google ever lets us)
          const inner = frame.querySelector('.goog-te-menu2') as HTMLElement | null;
          if (inner) {
            inner.style.overflowX = 'auto';
            inner.style.whiteSpace = 'nowrap';
            Array.from(inner.querySelectorAll('.goog-te-menu2-item')).forEach((item: Element) => {
            const menuItem = item as HTMLElement;
              menuItem.style.display = 'inline-block';
            menuItem.style.minWidth = '90px';
            menuItem.style.width = 'auto';
            menuItem.style.textAlign = 'center';
            menuItem.style.verticalAlign = 'top';
            menuItem.style.margin = '0 4px 8px 0';
            });
          }
        }
      });
      mobileObserver.observe(document.body, { childList: true, subtree: true });
    }

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

        /* Add globe icon effect */
        .google-translate-desktop .goog-te-menu-value::before {
          content: "🌐";
          font-size: 18px;
          margin-right: 4px;
        }

        /* Mobile wrapper */
        .google-translate-mobile {
          display: block !important;
          width: 100% !important;
        }

        .google-translate-mobile .goog-te-gadget {
          width: 100% !important;
        }

        .google-translate-mobile .goog-te-gadget-simple {
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%) !important;
          border: 2px solid #d1d5db !important;
          border-radius: 12px !important;
          padding: 14px 20px !important;
          width: 100% !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          font-family: inherit !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
        }

        .google-translate-mobile .goog-te-gadget-simple:hover,
        .google-translate-mobile .goog-te-gadget-simple:active {
          background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%) !important;
          border-color: #0000FF !important;
          transform: scale(0.98) !important;
          box-shadow: 0 4px 8px rgba(0, 0, 255, 0.15) !important;
        }

        .google-translate-mobile .goog-te-menu-value {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }

        .google-translate-mobile .goog-te-menu-value span {
          color: #0000FF !important;
          font-size: 15px !important;
          font-weight: 700 !important;
          font-family: inherit !important;
        }

        /* Add globe icon for mobile */
        .google-translate-mobile .goog-te-menu-value::before {
          content: "🌐";
          font-size: 20px;
          margin-right: 4px;
        }

        /* Mobile compact version (outside hamburger menu) */
        .google-translate-mobile-compact {
          display: inline-block !important;
          position: relative !important;
          z-index: 1000 !important;
        }
        
        /* DEBUG: Visual border for mobile translate container */
        #google_translate_element_mobile {
          border: 2px solid red !important;
          min-height: 30px !important;
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
          overflow: hidden !important;
          background: white !important;
        }

        .goog-te-menu-frame.box {
          padding: 8px !important;
        }

        .goog-te-menu2 {
          border: none !important;
          background: white !important;
          max-height: 450px !important;
          overflow-y: auto !important;
          padding: 4px !important;
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
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
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

        /* Mobile specific adjustments with better positioning */
        @media (max-width: 768px) {
          .goog-te-menu-frame {
            max-width: calc(100vw - 2rem) !important;
            max-height: 400px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            margin: 0 auto !important;
            position: fixed !important;
            z-index: 99999 !important;
            top: 60px !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
          
          .goog-te-menu2 {
            max-height: 400px !important;
            padding: 6px !important;
          }

          .goog-te-menu2-item {
            padding: 16px 20px !important;
            font-size: 16px !important;
            margin: 4px 0 !important;
            border-radius: 12px !important;
            min-height: 52px !important;
            display: flex !important;
            align-items: center !important;
          }

          .goog-te-menu2-item:hover {
            transform: scale(0.98) !important;
            padding-left: 20px !important;
          }

          .goog-te-menu2-item:active {
            transform: scale(0.96) !important;
            background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%) !important;
          }

          /* Larger checkmark on mobile */
          .goog-te-menu2-item-selected::after {
            font-size: 20px;
          }

          /* Better scrollbar for mobile */
          .goog-te-menu2::-webkit-scrollbar {
            width: 8px;
          }
        }

        /* Animation for dropdown */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .goog-te-menu-frame {
          animation: fadeInDown 0.3s ease-out !important;
        }

        /* Improved language label styling */
        .goog-te-menu2-item span {
          font-family: inherit !important;
        }

        /* Hide the combo select if present */
        .goog-te-combo {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Separate initialization functions for desktop and mobile
    const initFunctionName = isMobile ? 'googleTranslateElementInitMobile' : 'googleTranslateElementInit';
    
    // Define initialization
    window[initFunctionName] = () => {
      console.log(`[GoogleTranslateLoader] Initialization function called: ${initFunctionName}`);
      const element = document.getElementById(targetId);
      console.log(`[GoogleTranslateLoader] Target element found:`, element);
      console.log(`[GoogleTranslateLoader] Google object exists:`, !!window.google);
      console.log(`[GoogleTranslateLoader] TranslateElement exists:`, !!window.google?.translate?.TranslateElement);
      
      if (!element) {
        console.error(`[GoogleTranslateLoader] ERROR: Target element with id "${targetId}" not found!`);
        return;
      }
      
      if (!window.google?.translate?.TranslateElement) {
        console.error(`[GoogleTranslateLoader] ERROR: Google Translate API not loaded yet!`);
        return;
      }
      
      try {
        // Clear existing content
        element.innerHTML = '';
        
        console.log(`[GoogleTranslateLoader] Creating TranslateElement...`);
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true,
            // To enable ALL LANGUAGES, do NOT use the 'includedLanguages' property here.
            // If you ever add 'includedLanguages', you will restrict available choices!
          },
          targetId
        );
        console.log(`[GoogleTranslateLoader] TranslateElement created successfully!`);
        
        // Check if widget was created after a short delay
        setTimeout(() => {
          const widget = element.querySelector('.goog-te-gadget');
          console.log(`[GoogleTranslateLoader] Widget created:`, !!widget);
          if (widget) {
            console.log(`[GoogleTranslateLoader] Widget HTML:`, widget.outerHTML.substring(0, 200));
          }
        }, 500);
      } catch (error) {
        console.error(`[GoogleTranslateLoader] ERROR creating TranslateElement:`, error);
      }
    };

    // Check if script already loaded
    const scriptId = `google-translate-script-${isMobile ? 'mobile' : 'desktop'}`;
    const existingScript = document.getElementById(scriptId);
    
    if (!existingScript) {
      console.log(`[GoogleTranslateLoader] Script not found, creating new script: ${scriptId}`);
      // Load script
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `//translate.google.com/translate_a/element.js?cb=${initFunctionName}`;
      script.async = true;
      script.onload = () => {
        console.log(`[GoogleTranslateLoader] Script loaded successfully: ${scriptId}`);
      };
      script.onerror = (error) => {
        console.error(`[GoogleTranslateLoader] ERROR loading script:`, error);
      };
      document.body.appendChild(script);
      console.log(`[GoogleTranslateLoader] Script element appended to body`);
    } else {
      console.log(`[GoogleTranslateLoader] Script already exists: ${scriptId}`);
      if (window.google?.translate?.TranslateElement) {
        console.log(`[GoogleTranslateLoader] Google API already available, initializing...`);
        // Script already loaded, just initialize
        window[initFunctionName]();
      } else {
        console.log(`[GoogleTranslateLoader] Script exists but Google API not ready yet`);
      }
    }
    
    // Visual debugging: Add border to target element on mobile
    if (isMobile) {
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          console.log(`[GoogleTranslateLoader] Adding debug border to target element`);
          (targetElement as HTMLElement).style.border = '2px solid red';
          (targetElement as HTMLElement).style.padding = '4px';
          (targetElement as HTMLElement).style.minHeight = '20px';
        } else {
          console.error(`[GoogleTranslateLoader] DEBUG: Target element ${targetId} not found for border!`);
        }
      }, 100);
    }

    return () => {
      // Cleanup
      console.log(`[GoogleTranslateLoader] Cleaning up - isMobile: ${isMobile}`);
      if (mobileObserver) {
        mobileObserver.disconnect();
        console.log(`[GoogleTranslateLoader] Mobile observer disconnected`);
      }
      const scriptElement = document.getElementById(scriptId);
      if (scriptElement) {
        scriptElement.remove();
        console.log(`[GoogleTranslateLoader] Script element removed: ${scriptId}`);
      }
    };
  }, [targetId, isMobile]);

  return null;
}