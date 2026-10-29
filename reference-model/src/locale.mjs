const rtlLanguages = new Set(['ar', 'fa', 'he', 'ur']);

export function localeDirection(locale) {
  const language = String(locale ?? '').toLowerCase().split(/[-_]/)[0];
  return rtlLanguages.has(language) ? 'rtl' : 'ltr';
}
