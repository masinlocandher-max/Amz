# AMZ Jewelry

A responsive, working homepage built from the approved burgundy-and-gold AMZ Jewelry reference supplied on 4 November 2026. The reference determines the desktop layout, copy, imagery, branding, typography, and section order.

## Run

Requires Node.js 22 or later. No package installation is required.

```sh
npm run dev
# http://127.0.0.1:4173
npm run check
```

`npm run build` creates `dist/`, ready for a static hosting provider. All paths are relative, including scripts and image assets, so the build also works under a subpath such as `/Amz/`. No secrets, paid APIs, or external runtime services are required.

## Implemented

- Reference-matched burgundy satin hero, original AMZ logo artwork, gold buttons, trust strips, four collection cards, and branded box section.
- Responsive mobile navigation and two-column collections; touch controls, visible keyboard focus, reduced-motion support, native modal focus handling, semantic headings, and image descriptions.
- Search by collection/style, category previews, carousel image controls, and a local shortlist with add/remove and persistence.
- Sell-gold and general inquiry draft builder, downloadable text drafts, and copy controls. Drafts are not submitted, and contact information is not stored.
- Dependency-free static build and tests covering corrupt browser storage, storage failure, saved-item validation, and truthful inquiry drafts.

## Delivery boundary

This is the first storefront implementation, not a live jewelry trading platform. The following must be supplied and verified before commerce launch:

1. AMZ's official contact channel, business identity, address, and opening hours.
2. Actual inventory photos, gold purity, weight, condition, prices, and availability.
3. Account authentication, order management, a payment provider, and a verified delivery process.
4. Server-side inquiry handling with consent, validation, spam protection, and appropriate retention rules.
5. Approved privacy, returns, sales, gold valuation, and shipping terms; evidence supporting authenticity, value, and transaction claims copied from the reference.

Until then, category art is explicitly illustrative inside collection previews; the bag is a shortlist, not checkout; the profile control opens local saved selections; and forms label their output as unsent drafts. No prices, stock quantities, contact details, completed orders, login, or messages are fabricated.

## Source and assets

- `index.html`: semantic homepage and icon symbols.
- `styles.css`: design tokens, desktop and mobile layouts, interaction states.
- `app.js`: dialogs, search, shortlist, navigation, carousel, and draft UI.
- `lib/store.js`: validated local persistence and pure draft formatting.
- `assets/`: local WebP photography and original reference logo crop.
- `docs/design.md`: reference interpretation and image provenance.
- `_headers`: security headers for hosts supporting this convention. Configure equivalent headers on other hosts.

No deployment has been performed by adding this source. Deploy only after selecting the hosting destination and reviewing the delivery boundary above.
