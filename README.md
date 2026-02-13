# Civils Agri Plant Website

Website for Civils Agri Plant, a construction and agricultural company based in Paarl, Western Cape, South Africa. The site showcases services including plant hire, sand & stone supply, bricks, and features a gallery of completed projects.

## Pages

* **Home** (index.html)
* **Plant Hire**
* **Sand & Stone**
* **Bricks**
* **Gallery**
* **About Us**
* **Contact Us**
* **404** (Error page)

## Setup & development

### Basic usage

Edit the HTML and CSS in the `theme` folder and open `theme/index.html` in a browser to preview.

### Advanced usage (Gulp)

#### Prerequisites

* **Node:** [Install Node.js](https://nodejs.org/en/download/)
* **Gulp:** Install globally:

```
npm install --global gulp-cli
```

See [Gulp docs](https://gulpjs.com/docs/en/getting-started/quick-start) for more.

#### Local setup

1. Open the project in an editor (e.g. [VS Code](https://code.visualstudio.com/)).
2. In the project terminal:

```bash
npm install
npm run dev
```

This runs a local preview with live reload when source files change.

#### Build commands

**Development build:**
```bash
npm run build
```

**Production build (with minification and optimization):**
```bash
npm run build:prod
```

**Code quality:**
```bash
npm run lint      # Check JavaScript for errors
npm run format    # Format code with Prettier
```

The `theme` folder will contain the built site ready for deployment.

## Deployment

### Vercel

The project includes a `vercel.json` configuration file. To deploy:

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will automatically detect the configuration and deploy

The `theme` folder will be served as the root directory.

### Netlify

If deploying to Netlify, ensure your build command is `npm run build` and publish directory is `theme`.

### Manual Deployment

After running `npm run build`, upload the contents of the `theme` folder to your web server.

## Reporting issues

Use this repository's [GitHub Issues](https://github.com/) for bugs or feature requests.

## License

**Code:** MIT (see [LICENSE](LICENSE)).

**Images:** For demonstration only; see their respective licenses.

## Credits

Website designed and developed by [Ultimate Marketing Smash](https://ultimatemarketingsmash.com).

## Features

* **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, structured data (JSON-LD)
* **Accessible**: WCAG compliant with proper ARIA labels, focus styles, and skip links
* **Performance**: Minified assets, image optimization, service worker for caching
* **Security**: Security headers, XSS protection, content security policies
* **Progressive Web App**: Service worker for offline functionality
* **Form Validation**: Client-side validation with accessible error messages
* **Responsive**: Mobile-first design that works on all devices

## Resources

Third-party libraries used in this project:

* **Bootstrap v4.5**: <https://getbootstrap.com/docs/4.5/getting-started/introduction/>
* **jQuery v3.5.1**: <https://jquery.com/download/>
* **Google Fonts**: <http://fonts.google.com/>
* **Font Awesome Free**: <https://fontawesome.com/>
* **Animate CSS**: <https://animate.style/>
* **Colorbox**: <https://www.jacklmoore.com/colorbox/>
* **Slick**: <https://kenwheeler.github.io/slick/>
* **Shuffle**: <https://vestride.github.io/Shuffle/>
* **Leaflet**: <https://leafletjs.com/> (for maps)
