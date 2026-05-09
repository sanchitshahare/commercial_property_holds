# HTML Components System

This directory contains reusable HTML components that are dynamically loaded into pages to avoid code duplication.

## Components

### 1. `nav.html` - Navigation Bar
The main navigation component used across all pages.

**Features:**
- Logo with link to homepage
- Navigation links to all main sections
- Mobile-responsive hamburger menu
- Theme toggle button (light/dark mode)

**Usage:**
Automatically loaded into any page with `<div id="nav-container"></div>` in the header.

### 2. `footer.html` - Footer
The site-wide footer component.

**Features:**
- Company branding and description
- Platform links
- Company links
- Legal links
- Social media links
- Copyright notice

**Usage:**
Automatically loaded into any page with `<div id="footer-container"></div>` in the footer.

### 3. `modals.html` - Modal Dialogs
Contains all modal dialog components.

**Includes:**
- Investment modal (for property investments)
- Alert modal (for form submissions and notifications)

**Usage:**
Automatically loaded into any page with `<div id="modals-container"></div>` before closing body tag.

## How It Works

The component system uses JavaScript to dynamically load HTML components:

1. **Component Loader** (`scripts/components.js`)
   - Detects the current page location
   - Determines the correct path to components directory
   - Fetches component HTML files
   - Replaces `{ROOT}` placeholder with actual path
   - Injects components into designated container elements

2. **Path Resolution**
   - For root pages (e.g., `index.html`): uses `./` path
   - For pages in subdirectories (e.g., `pages/about.html`): uses `../` path
   - The `{ROOT}` placeholder in component files is automatically replaced

3. **Automatic Loading**
   - Components are loaded when DOM is ready
   - No manual intervention required
   - Works seamlessly across all pages

## Adding New Components

To add a new reusable component:

1. Create a new HTML file in the `components/` directory
   ```html
   <!-- components/my-component.html -->
   <div class="my-component">
     <!-- Component content here -->
     <!-- Use {ROOT} for links that need path resolution -->
     <a href="{ROOT}some-page.html">Link</a>
   </div>
   ```

2. Add a container element in your pages where the component should appear:
   ```html
   <div id="my-component-container"></div>
   ```

3. Update `scripts/components.js` to load the new component:
   ```javascript
   function initComponents() {
     // ... existing components ...
     
     if (document.getElementById('my-component-container')) {
       loadComponent('my-component', 'my-component-container');
     }
   }
   ```

## Benefits

✅ **DRY Principle** - Write once, use everywhere
✅ **Easy Maintenance** - Update component in one place, changes reflect everywhere
✅ **Consistent Design** - Ensures uniform navigation and footer across all pages
✅ **Reduced File Size** - Smaller HTML files with less duplication
✅ **Scalable** - Easy to add new pages or modify existing components

## File Structure

```
property-hold/
├── components/
│   ├── nav.html          # Navigation component
│   ├── footer.html       # Footer component
│   ├── modals.html       # Modal dialogs component
│   └── README.md         # This file
├── scripts/
│   └── components.js     # Component loader script
├── index.html            # Homepage
└── pages/
    ├── about.html
    ├── contact.html
    ├── pricing.html
    ├── properties.html
    └── testimonials.html
```

## Troubleshooting

If components are not loading:

1. **Check Console** - Open browser developer tools and check for errors
2. **Verify Paths** - Ensure component files exist in `components/` directory
3. **Check Containers** - Verify container IDs match (`nav-container`, `footer-container`, `modals-container`)
4. **Script Loading** - Ensure `components.js` is loaded before other scripts
5. **Server Required** - Components are loaded via `fetch()`, so the site must be served via HTTP (won't work with `file://` protocol)

## Running Locally

To test the component system locally, you need to serve the files via HTTP:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.