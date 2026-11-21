// schema.org JSON-LD extraction from HTML pages (Eventbrite lists, Brief IA, Meetup city pages, Toulouse Tech Hub...).

const isEventType = (t) => [].concat(t ?? []).some((x) => /(^|\/)[A-Za-z]*Event$/.test(String(x)));

/** Every schema.org Event object found in the page's ld+json blocks (ItemList, @graph, arrays and plain blocks). */
export function extractJsonLdEvents(html) {
	const events = [];
	const seen = new Set();
	const visit = (node, depth = 0) => {
		if (!node || typeof node !== 'object' || depth > 6) return;
		if (Array.isArray(node)) { for (const n of node) visit(n, depth + 1); return; }
		if (isEventType(node['@type'])) {
			const key = node['@id'] ?? node.url ?? `${node.name}|${node.startDate}`;
			if (!seen.has(key)) { seen.add(key); events.push(node); }
			return; // sub-events are not separate listings
		}
		for (const k of ['@graph', 'itemListElement', 'item', 'mainEntity', 'event']) if (node[k]) visit(node[k], depth + 1);
	};
	for (const m of String(html).matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
		let j;
		try { j = JSON.parse(m[1]); } catch { continue; }
		visit(j);
	}
	return events;
}
