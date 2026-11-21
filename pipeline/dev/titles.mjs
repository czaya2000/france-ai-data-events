// Print titles from the fixtures to craft dedupe test pairs.
import { readFileSync } from 'node:fs';
import { parseIcs } from '../lib/ical.mjs';
import { parseRss } from '../lib/feeds.mjs';
import { extractJsonLdEvents } from '../lib/jsonld.mjs';
const rd = (f) => readFileSync(new URL('../fixtures/' + f, import.meta.url), 'utf8');
const show = (label, rows) => console.log(label + '\n' + rows.map((r) => '  ' + r).join('\n'));
show('hi-paris', parseIcs(rd('hi-paris.ics')).events.slice(0, 14).map((e) => e.start + ' ' + e.title + ' | ' + e.location));
show('aieventlist', parseRss(rd('aieventlist.xml')).slice(0, 14).map((e) => e.title));
show('brainberg', JSON.parse(rd('brainberg.json')).events.map((e) => e.event.startsAt.slice(0, 10) + ' ' + e.event.title + ' | ' + e.city?.name));
show('luma', JSON.parse(rd('luma-paris.json')).entries.map((e) => e.event.start_at.slice(0, 10) + ' ' + e.event.name));
show('briefia', extractJsonLdEvents(rd('briefia.html')).map((e) => e.startDate.slice(0, 10) + ' ' + e.name));
show('agentconfs', parseIcs(rd('agentconfs.ics')).events.filter((e) => /France/.test(e.location)).slice(0, 8).map((e) => e.start + ' ' + e.title + ' | ' + e.location));
