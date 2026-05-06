# Commercial Property Holds

A refactored static frontend for the Commercial Property Holds marketing and listings experience.

## Structure

- `index.html`: primary landing page shell
- `pages/`: supporting standalone pages
- `styles/`: split CSS architecture by concern and section
- `scripts/`: modular JavaScript for interactions
- `data/properties.json`: starter structured property data for future backend integration
- `assets/`: reserved directories for static media, icons, SVGs, and fonts
- `server.js`: tiny static preview server for module-safe local testing

## Run locally

Use `node server.js` and open `http://127.0.0.1:4173`.
