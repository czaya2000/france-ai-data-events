import type { APIRoute } from 'astro';
import { buildRss } from '../../lib/rss';

/* English RSS feed (French: /rss.xml). See src/lib/rss.ts. */
export const GET: APIRoute = async () =>
	new Response(await buildRss('en'), { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
