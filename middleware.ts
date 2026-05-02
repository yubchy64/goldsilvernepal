import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LINK_HEADERS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</docs/api>; rel="service-doc"',
  '</api/prices>; rel="service-desc"',
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const acceptHeader = request.headers.get('accept') || '';
  const wantsMarkdown = acceptHeader.includes('text/markdown');
  
  // Handle markdown requests (applies to all paths including homepage)
  if (wantsMarkdown) {
    // Exclude Next.js internals, APIs, and static files
    if (
      url.startsWith('/_next') ||
      url.startsWith('/api') ||
      url.includes('.')
    ) {
      return NextResponse.next();
    }
    
    // Rewrite to our markdown API handler
    return NextResponse.rewrite(new URL(`/api/markdown?path=${encodeURIComponent(url)}`, request.url));
  }
  
  // Add Link headers to homepage response (only for non-markdown requests)
  if (url === '/') {
    const response = NextResponse.next();
    LINK_HEADERS.forEach(header => {
      response.headers.append('Link', header);
    });
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
