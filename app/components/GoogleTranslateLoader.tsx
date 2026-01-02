"use client";
import { useEffect } from "react";

export default function GoogleTranslateLoader({ targetId = "google_translate_element" }: { targetId?: string }) {
  useEffect(() => {
    console.log('GoogleTranslateLoader useEffect running for', targetId);
    if (!document.getElementById(targetId)) {
      console.log('Target element not found for', targetId);
      return;
    }
    if (!(window as any).googleTranslateElementInit) {
      console.log('Setting up Google Translate');
      (window as any).googleTranslateElementInit = function () {
        console.log('Initializing Google Translate for', targetId);
        new (window as any).google.translate.TranslateElement({
          pageLanguage: "en",
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        }, targetId);
      };
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if ((window as any).google && (window as any).google.translate) {
      console.log('Google Translate already loaded, initializing for', targetId);
      (window as any).googleTranslateElementInit();
    }
  }, [targetId]);
  return null;
}
