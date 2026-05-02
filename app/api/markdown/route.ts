import { NextRequest, NextResponse } from 'next/server';
import TurndownService from 'turndown';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '/';
  
  // Reconstruct the full URL to fetch the original HTML
  const targetUrl = new URL(path, request.url);
  
  try {
    // Fetch the HTML content
    // We make sure NOT to send the 'Accept: text/markdown' header to avoid loops
    const res = await fetch(targetUrl.toString(), {
      headers: {
        'Accept': 'text/html',
      }
    });

    if (!res.ok) {
      return new NextResponse('Error fetching content', { status: res.status });
    }

    const html = await res.text();

    // Convert HTML to Markdown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced'
    });
    // Remove scripts, styles, and noscripts from markdown output
    turndownService.remove(['script', 'style', 'noscript']);
    
    const markdown = turndownService.turndown(html);
    
    // Calculate an approximate token count (very rough estimate: 1 token ~= 4 characters)
    const tokenCount = Math.ceil(markdown.length / 4);

    return new NextResponse(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'x-markdown-tokens': tokenCount.toString(),
      },
    });
  } catch (error) {
    console.error('Error in markdown API:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
