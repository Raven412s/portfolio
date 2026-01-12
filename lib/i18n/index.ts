import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale ?? 'en'; // fallback

  return {
    locale: currentLocale,
    messages: (await import(`../../../data/messages/${currentLocale}.json`)).default
  };
});
