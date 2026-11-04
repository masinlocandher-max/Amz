export const collections = Object.freeze([
  {id:'rings', name:'Rings', image:'assets/ring.webp', alt:'Floral gold ring on burgundy satin', description:'Discover gold rings with intricate details and a timeless finish.', keywords:'ring floral band gold'},
  {id:'necklaces', name:'Necklaces', image:'assets/necklace.webp', alt:'Round sunburst gold pendant on a chain', description:'Explore gold necklaces and pendants, from a simple finishing touch to a statement piece.', keywords:'necklace pendant chain sunburst gold'},
  {id:'earrings', name:'Earrings', image:'assets/earrings.webp', alt:'Engraved gold hoop earrings', description:'Explore gold earrings with delicate details and enduring appeal.', keywords:'earring hoops studs floral gold'},
  {id:'bracelets', name:'Bracelets', image:'assets/bracelet.webp', alt:'Floral engraved gold bangle', description:'Discover gold bracelets and bangles with beautiful, considered details.', keywords:'bracelet bangles bangle wrist gold'},
]);

const storageKey = 'amz-shortlist-v1';
const knownIds = new Set(collections.map(item => item.id));

export function readSaved(storage) {
  try {
    const parsed = JSON.parse((storage ?? globalThis.localStorage).getItem(storageKey) || '[]');
    return Array.isArray(parsed) ? [...new Set(parsed.filter(id => knownIds.has(id)))] : [];
  } catch { return []; }
}

export function writeSaved(ids, storage) {
  try {
    (storage ?? globalThis.localStorage).setItem(storageKey, JSON.stringify([...new Set(ids.filter(id => knownIds.has(id)))]));
    return true;
  } catch { return false; }
}

export function buildInquiry(kind, data) {
  const fields = [
    'AMZ JEWELRY — INQUIRY DRAFT',
    'This draft has not been sent.',
    '',
    `Inquiry: ${kind === 'sell' ? 'Sell gold jewelry' : 'Buy / general inquiry'}`,
  ];
  if (data.name?.trim()) fields.push(`Name: ${data.name.trim().slice(0,100)}`);
  if (kind === 'sell' && data.type) fields.push(`Jewelry type: ${data.type}`);
  if (kind === 'sell' && data.gold?.trim()) fields.push(`Purity / weight (unverified): ${data.gold.trim().slice(0,160)}`);
  fields.push('', (data.message || '').trim().slice(0,2000));
  if (kind === 'sell') fields.push('', 'Final valuation is subject to inspection and verification.');
  return fields.join('\n');
}
