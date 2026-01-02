// Translation using Google Translate API (free)
// This service handles text translation via Google's API

export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  'zh-CN': { name: '中文', flag: '🇨🇳' },
  ja: { name: '日本語', flag: '🇯🇵' },
  pt: { name: 'Português', flag: '🇵🇹' },
  ar: { name: 'العربية', flag: '🇸🇦' },
};

// Using MyMemory Translation API (free, no key required)
const TRANSLATION_API = 'https://api.mymemory.translated.net/get';

export async function translateText(
  text: string,
  targetLanguage: string,
  sourceLanguage: string = 'en'
): Promise<string> {
  try {
    if (!text || text.trim().length === 0 || sourceLanguage === targetLanguage) {
      return text;
    }

    // Split text into sentences to avoid API limits
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let translatedText = '';

    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      if (!trimmed) continue;

      const params = new URLSearchParams({
        q: trimmed,
        langpair: `${sourceLanguage}|${targetLanguage}`,
      });

      const response = await fetch(`${TRANSLATION_API}?${params}`, {
        headers: {
          'User-Agent': 'Mid-Western-Bank',
        },
      });

      if (!response.ok) {
        console.error('Translation API error:', response.statusText);
        return text;
      }

      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData) {
        translatedText += data.responseData.translatedText;
      } else {
        console.warn('Translation failed for:', trimmed);
        translatedText += trimmed;
      }
    }

    return translatedText || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

export async function translatePageContent(
  elements: Element[],
  targetLanguage: string,
  sourceLanguage: string = 'en'
): Promise<void> {
  for (const element of elements) {
    const textNodes = Array.from(element.childNodes).filter(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
    );

    for (const node of textNodes) {
      if (node.textContent?.trim()) {
        const translatedText = await translateText(node.textContent, targetLanguage, sourceLanguage);
        node.textContent = translatedText;
      }
    }

    // Recursively translate child elements
    const childElements = Array.from(element.children) as Element[];
    if (childElements.length > 0) {
      await translatePageContent(childElements, targetLanguage, sourceLanguage);
    }
  }
}
