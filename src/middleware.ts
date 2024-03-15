import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  /**
   * A list of all locales that are supported
   * Can be imported from a shared config
   */
  locales: ['en', 'de'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};