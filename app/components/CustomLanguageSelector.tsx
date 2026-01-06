"use client";
import { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const languages = [
  { code: "af", name: "Afrikaans" },
  { code: "sq", name: "Albanian" },
  { code: "am", name: "Amharic" },
  { code: "ar", name: "Arabic" },
  { code: "hy", name: "Armenian" },
  { code: "as", name: "Assamese" },
  { code: "ay", name: "Aymara" },
  { code: "az", name: "Azerbaijani" },
  { code: "bm", name: "Bambara" },
  { code: "eu", name: "Basque" },
  { code: "be", name: "Belarusian" },
  { code: "bn", name: "Bengali" },
  { code: "bho", name: "Bhojpuri" },
  { code: "bs", name: "Bosnian" },
  { code: "bg", name: "Bulgarian" },
  { code: "ca", name: "Catalan" },
  { code: "ceb", name: "Cebuano" },
  { code: "ny", name: "Chichewa" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "co", name: "Corsican" },
  { code: "hr", name: "Croatian" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "dv", name: "Dhivehi" },
  { code: "doi", name: "Dogri" },
  { code: "nl", name: "Dutch" },
  { code: "en", name: "English" },
  { code: "eo", name: "Esperanto" },
  { code: "et", name: "Estonian" },
  { code: "ee", name: "Ewe" },
  { code: "tl", name: "Filipino" },
  { code: "fi", name: "Finnish" },
  { code: "fr", name: "French" },
  { code: "fy", name: "Frisian" },
  { code: "gl", name: "Galician" },
  { code: "ka", name: "Georgian" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek" },
  { code: "gn", name: "Guarani" },
  { code: "gu", name: "Gujarati" },
  { code: "ht", name: "Haitian Creole" },
  { code: "ha", name: "Hausa" },
  { code: "haw", name: "Hawaiian" },
  { code: "iw", name: "Hebrew" },
  { code: "hi", name: "Hindi" },
  { code: "hmn", name: "Hmong" },
  { code: "hu", name: "Hungarian" },
  { code: "is", name: "Icelandic" },
  { code: "ig", name: "Igbo" },
  { code: "ilo", name: "Ilocano" },
  { code: "id", name: "Indonesian" },
  { code: "ga", name: "Irish" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "jw", name: "Javanese" },
  { code: "kn", name: "Kannada" },
  { code: "kk", name: "Kazakh" },
  { code: "km", name: "Khmer" },
  { code: "rw", name: "Kinyarwanda" },
  { code: "gom", name: "Konkani" },
  { code: "ko", name: "Korean" },
  { code: "kri", name: "Krio" },
  { code: "ku", name: "Kurdish (Kurmanji)" },
  { code: "ckb", name: "Kurdish (Sorani)" },
  { code: "ky", name: "Kyrgyz" },
  { code: "lo", name: "Lao" },
  { code: "la", name: "Latin" },
  { code: "lv", name: "Latvian" },
  { code: "ln", name: "Lingala" },
  { code: "lt", name: "Lithuanian" },
  { code: "lg", name: "Luganda" },
  { code: "lb", name: "Luxembourgish" },
  { code: "mk", name: "Macedonian" },
  { code: "mai", name: "Maithili" },
  { code: "mg", name: "Malagasy" },
  { code: "ms", name: "Malay" },
  { code: "ml", name: "Malayalam" },
  { code: "mt", name: "Maltese" },
  { code: "mi", name: "Maori" },
  { code: "mr", name: "Marathi" },
  { code: "mni-Mtei", name: "Meiteilon (Manipuri)" },
  { code: "lus", name: "Mizo" },
  { code: "mn", name: "Mongolian" },
  { code: "my", name: "Myanmar (Burmese)" },
  { code: "ne", name: "Nepali" },
  { code: "no", name: "Norwegian" },
  { code: "or", name: "Odia (Oriya)" },
  { code: "om", name: "Oromo" },
  { code: "ps", name: "Pashto" },
  { code: "fa", name: "Persian" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "pa", name: "Punjabi" },
  { code: "qu", name: "Quechua" },
  { code: "ro", name: "Romanian" },
  { code: "ru", name: "Russian" },
  { code: "sm", name: "Samoan" },
  { code: "sa", name: "Sanskrit" },
  { code: "gd", name: "Scots Gaelic" },
  { code: "nso", name: "Sepedi" },
  { code: "sr", name: "Serbian" },
  { code: "st", name: "Sesotho" },
  { code: "sn", name: "Shona" },
  { code: "sd", name: "Sindhi" },
  { code: "si", name: "Sinhala" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "so", name: "Somali" },
  { code: "es", name: "Spanish" },
  { code: "su", name: "Sundanese" },
  { code: "sw", name: "Swahili" },
  { code: "sv", name: "Swedish" },
  { code: "tg", name: "Tajik" },
  { code: "ta", name: "Tamil" },
  { code: "tt", name: "Tatar" },
  { code: "te", name: "Telugu" },
  { code: "th", name: "Thai" },
  { code: "ti", name: "Tigrinya" },
  { code: "ts", name: "Tsonga" },
  { code: "tr", name: "Turkish" },
  { code: "tk", name: "Turkmen" },
  { code: "ak", name: "Twi" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
  { code: "ug", name: "Uyghur" },
  { code: "uz", name: "Uzbek" },
  { code: "vi", name: "Vietnamese" },
  { code: "cy", name: "Welsh" },
  { code: "xh", name: "Xhosa" },
  { code: "yi", name: "Yiddish" },
  { code: "yo", name: "Yoruba" },
  { code: "zu", name: "Zulu" },
];

interface CustomLanguageSelectorProps {
  isMobile?: boolean;
}

export default function CustomLanguageSelector({ isMobile = false }: CustomLanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Restore selected language from localStorage
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('selectedLanguage');
      if (savedLang) {
        setSelectedLang(savedLang);
      }
    }
  }, []);

  useEffect(() => {
    // Load Google Translate script
    const loadGoogleTranslate = () => {
      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_element_hidden"
        );
      }
    };

    loadGoogleTranslate();

    // Hide Google Translate UI
    const style = document.createElement("style");
    style.innerHTML = `
      #google_translate_element_hidden {
        display: none !important;
      }
      .skiptranslate, .goog-te-banner-frame, body > .skiptranslate {
        display: none !important;
      }
      body {
        top: 0 !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const changeLanguage = (langCode: string) => {
    // Don't do anything if already on this language
    if (langCode === selectedLang) {
      setIsOpen(false);
      return;
    }

    setSelectedLang(langCode);
    setIsOpen(false);
    setSearchTerm("");

    // Store the selected language in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', langCode);
      
      // Reload the page with the language parameter
      const url = new URL(window.location.href);
      url.hash = `#googtrans(en|${langCode})`;
      window.location.href = url.toString();
      window.location.reload();
    }
  };

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLanguage = languages.find((lang) => lang.code === selectedLang);

  return (
    <>
      <div id="google_translate_element_hidden"></div>
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${
            isMobile
              ? "px-3 py-2 text-sm"
              : "px-6 py-2.5"
          } bg-white border-2 border-[#0000FF] rounded-full font-semibold text-[#0000FF] hover:bg-[#0000FF] hover:text-white transition-all duration-200 flex items-center gap-2`}
        >
          <span>🌐</span>
          <span>{selectedLanguage?.name || "English"}</span>
          <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
        </button>

        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            {isMobile && (
              <div
                className="fixed inset-0 bg-black bg-opacity-25 z-40"
                onClick={() => {
                  setIsOpen(false);
                  setSearchTerm("");
                }}
              />
            )}

            {/* Dropdown */}
            <div
              className={`${
                isMobile
                  ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[400px] z-50"
                  : "absolute right-0 mt-2 w-72 z-50"
              } bg-white border-2 border-gray-200 rounded-2xl shadow-2xl overflow-hidden`}
            >
              {/* Search box */}
              <div className="p-3 border-b border-gray-200 sticky top-0 bg-white z-10">
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0000FF] focus:ring-2 focus:ring-blue-100 text-black placeholder-black"
                  autoFocus
                />
              </div>

              {/* Language list */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredLanguages.length > 0 ? (
                  filteredLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-black font-medium ${
                        selectedLang === lang.code
                          ? "bg-gradient-to-r from-blue-100 to-blue-200 text-[#0000FF] font-bold border-l-4 border-[#0000FF]"
                          : "hover:bg-blue-50 hover:text-[#0000FF] hover:translate-x-1"
                      }`}
                    >
                      {lang.name}
                      {selectedLang === lang.code && (
                        <span className="ml-2 text-[#0000FF]">✓</span>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No languages found
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
