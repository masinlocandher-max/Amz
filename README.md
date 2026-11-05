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
- About information identifies Aliah Monsalud Zaratan as CEO and explains that buying and selling are currently arranged by email, text, or phone call.
- Clickable email, SMS, and phone contacts in the footer, About dialog, and both inquiry dialogs: aliahfate13@gmail.com and +63 909 0931 983.
- Sell-gold and general inquiry builder with review, copy, and prefilled email or SMS handoff. Customers confirm sending in their own email or messaging app; the website never claims an inquiry was sent, and visitor contact details are not persisted.
- Dependency-free static build and tests covering corrupt browser storage, storage failure, saved-item validation, and truthful inquiry drafts.

## Delivery boundary

This is the first storefront implementation, not a live jewelry trading platform. The following must be supplied and verified before commerce launch:

1. AMZ's business identity, address, and opening hours. The owner-provided email and phone number are already added.
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

## Hosting

The selected custom address is `https://amzjewelry.sterlingsgrp.com/`.

The site is configured for a private hosted preview at `https://amz-jewelry.fbautisat23.chatgpt.site`. The tracked `.openai/hosting.json` identifies this hosting project and its static build directory. Publication status and custom-domain DNS verification must be checked in hosting before announcing either URL as available.

The custom domain uses GoDaddy nameservers. Connect only the `amzjewelry` subdomain and its hosting-provider validation records; preserve the parent domain and email records. The domain still needs DNS configuration and verification. A private preview requires the owner's sign-in; opening it to customers is a separate access change.

Vercel project creation was denied by the connected account on 4 November 2026. No Vercel project or deployment was created.
