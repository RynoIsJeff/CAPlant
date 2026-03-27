# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-02-13

### Added
- Comprehensive SEO improvements (Open Graph, Twitter Cards, structured data)
- Unique page-specific meta descriptions for all pages
- robots.txt and sitemap.xml for search engine optimization
- manifest.json for PWA capabilities
- Skip-to-content link for accessibility
- ARIA labels and improved accessibility features
- Performance optimizations (preload, defer attributes)
- Theme color meta tags
- Canonical URLs for all pages
- Structured data (JSON-LD) for LocalBusiness schema
- .editorconfig for consistent code formatting
- .nvmrc for Node.js version consistency

### Changed
- Updated language attribute from `en` to `en-ZA` for South African locale
- Moved inline styles to external CSS file (_inline-styles.scss)
- Updated package.json author to "Ultimate Marketing Smash"
- Removed unused dependencies (gulp-header-comment)
- Added defer attributes to all JavaScript files for better performance
- Updated all email addresses to info@caplant.co.za
- Changed all public-facing "CAPlant" references to "Civils Agri Plant"

### Removed
- Unused HTML pages (team, testimonials, faq, pricing, projects, services, news, typography)
- Unused navigation-2.htm partial
- Broken links to terms-conditions.html and privacy-policy.html
- Unused gulp-header-comment dependency

### Fixed
- Fixed skip-to-content link target (now points to #main-container)
- Improved semantic HTML structure
- Enhanced meta tags for better SEO

## [1.0.0] - Initial Release

### Added
- Initial website structure
- Basic pages (Home, About, Contact, Services)
- Bootstrap-based responsive design
- Gulp build system
