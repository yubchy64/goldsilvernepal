import { NextRequest, NextResponse } from 'next/server';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '/';
  
  const targetUrl = new URL(path, request.url);
  
  try {
    const res = await fetch(targetUrl.toString(), {
      headers: {
        'Accept': 'text/html',
      }
    });

    if (!res.ok) {
      return new NextResponse('Error fetching content', { status: res.status });
    }

    const html = await res.text();

    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      emDelimiter: '*',
    });

    turndownService.use(gfm);

    turndownService.remove(['script', 'style', 'noscript', 'iframe', 'form', 'button', 'input']);

    turndownService.addRule('imageAlt', {
      filter: 'img',
      replacement: function(content, node) {
        const alt = node.getAttribute('alt') || '';
        const src = node.getAttribute('src') || '';
        if (src.startsWith('data:') || src.startsWith('//') || src.startsWith('http')) {
          return `![${alt}](${src})`;
        }
        return '';
      }
    });

    turndownService.addRule('anchorText', {
      filter: 'a',
      replacement: function(content, node) {
        const href = node.getAttribute('href') || '';
        if (href.startsWith('#') || href.startsWith('javascript:')) {
          return content;
        }
        return `[${content}](${href})`;
      }
    });

    turndownService.addRule('headingId', {
      filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      replacement: function(content, node) {
        const level = node.nodeName.charAt(1);
        const hashes = '#'.repeat(parseInt(level));
        const text = content.trim();
        return `${hashes} ${text}\n\n`;
      }
    });

    turndownService.addRule('cleanPre', {
      filter: 'pre',
      replacement: function(content, node) {
        const code = node.textContent || '';
        const langMatch = node.querySelector('code');
        const lang = langMatch?.className?.replace('language-', '') || '';
        const langPrefix = lang ? '```' + lang + '\n' : '```\n';
        return '\n' + langPrefix + code.trim() + '\n```\n';
      }
    });

    let markdown = turndownService.turndown(html);

    markdown = markdown
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\s+$/gm, '')
      .trim();

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