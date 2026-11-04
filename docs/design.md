# Approved design implementation

Reference: user-supplied `D8103992-00C6-435F-8D23-C7F3A9482DB0.jpeg`, 1199 × 1312 px, 4 November 2026.

## Visual contract

The desktop reference has a 521 px hero including header, a 77 px service strip, a 318 px collection section, a 278 px box/about section, and a 118 px closing strip. The primary composition and native text follow these proportions at the reference width. The interface uses real HTML elements, not a screenshot with clickable hotspots.

Colors: dark burgundy `#2f0004`, wine `#480009`, gold `#ecc774`, cream `#f7e7bc`, and warm text `#fff4e7`. Serif navigation, headings, and body copy contrast with sans-serif gold-button labels. Pill-shaped buttons, thin gold outline icons, and lightly rounded collection photographs follow the reference.

## Photography and logo provenance

The supplied reference was edited with the built-in image generator to remove website text, buttons, navigation, and icons while preserving jewelry composition, satin folds, lighting, and the AMZ branding on the physical presentation box. This clean photographic plate was cropped into separate hero, collection, satin, and about assets and encoded as local WebP files.

Image prompt: “Preserve exactly all photography, composition, coordinates, jewelry designs, lighting, satin folds, burgundy and gold palette. Remove all website interface overlays and inpaint those areas naturally. Preserve the brand embossed on the physical jewelry box. Do not move or resize photographic subjects.”

The header logo uses a crop of the original supplied reference to preserve the actual approved symbol and wordmark. Regenerated logo candidates were rejected because their glow did not match the supplied mark. The original source image itself is not shipped as a page background or as an interface.

Assets are visual illustrations, not verified product inventory. Product names refer to categories only. High-resolution original inventory and vector logo files can replace these assets without changing the UI.

## Responsive extension

At 768 px and below, navigation becomes a collapsible menu, the gold jewelry photograph sits above the headline, buttons stack, and categories form a two-column grid. The physical box precedes the about copy. The reference has no mobile view, so this is a responsive adaptation, not a second approved screenshot.

## Interaction boundary

Navigation, search, collection previews, saved categories, image selection, and draft preparation work locally. Three hero images can be selected manually; there is no autoplay. Sell and contact dialogs create explicitly unsent drafts; they never simulate a successful submission. The shortlist stores only known collection identifiers. Personal inquiry text is held only in current page memory unless the visitor deliberately downloads or copies it.

## Validation at first delivery

Browser comparison covered the supplied 1199 px desktop width and a 390 × 844 px phone frame. Desktop section heights measured 521 / 78 / 318 / 278 / 118 px. Mobile document width and scroll width both measured 390 px, with no horizontal overflow. Header placement, hero line widths, CTA sizing, collection spacing, and gold icon proportions were refined against the reference. The physical logo was preserved from the source; all interface copy remains native text. Above-the-fold copy is unchanged.

Browser interactions verified keyword search ("pendant" → Necklaces), saving a category, persistence after reload, removal, the empty shortlist, opening the sell form, producing an explicitly unsent draft, and downloading that draft. Mobile navigation expanded and collapsed and its Collections link reached the two-column grid. Application console errors were absent; the browser extension emitted unrelated metadata warnings.

`npm run check` passes syntax checks, all five storage/draft tests, and the static build. Photography is derived from the supplied mockup and font rasterization varies by platform; original full-resolution product assets and a supplied font would be required for a literal pixel-identical rendering. Mobile is an intentional responsive extension of the desktop reference. Commerce, authentication, actual inventory, and message delivery remain outside this first delivery.

## Contact information update

The owner supplied `aliahfate13@gmail.com` and `+63 909 0931 983`. Both appear as clickable email and telephone links in the footer, Contact dialog, and Sell Your Gold dialog. The footer is the single source for the reused contact markup. The unavailable-contact notice was removed; inquiry forms still prepare unsent drafts. No email or call is initiated automatically.
