# Gagan Aqua Industries Website

A professional single-page website for Gagan Aqua Industries - a leading manufacturer of packaged drinking water bottles.

## Features

- Modern, responsive design
- Mobile-first approach
- WhatsApp integration for lead generation
- Product showcase with hover effects
- Product gallery with lightbox
- Contact form with inquiry types
- Google Maps integration
- SEO optimized with schema markup
- Fast loading performance

## File Structure

```
gagan-aqua/
├── index.html          # Main HTML file
├── css/
│   ├── style.css       # Main styles
│   ├── products.css    # Product section styles
│   └── gallery.css     # Gallery styles
├── js/
│   ├── main.js         # Main JavaScript
│   └── gallery.js      # Gallery functionality
└── images/
    ├── logo.png        # Company logo (add your own)
    ├── favicon.png     # Favicon (add your own)
    ├── about/
    │   └── factory.png # About section image
    ├── products/
    │   ├── 300ml-bottle.png
    │   ├── 500ml-bottle.png
    │   ├── 1l-bottle.png
    │   ├── 2l-bottle.png
    │   ├── 20l-can.png
    │   └── custom-bottle.png
    └── custom/
        └── custom-showcase.png
```

## Setup Instructions

1. **Add Your Logo**: Replace `images/logo.png` with your actual logo file
2. **Add Product Images**: Add your product images to the `images/products/` folder
3. **Update Contact Info**: Edit the phone numbers, email, and address in `index.html`
4. **Update WhatsApp Number**: Replace `919876543210` with your actual WhatsApp number
5. **Google Maps**: Update the Google Maps embed URL with your actual location

## Customization

### Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary: #0077B6;      /* Main brand color */
    --primary-dark: #005D92; /* Darker shade */
    --primary-light: #00A8E8;/* Lighter shade */
    --accent: #48CAE4;       /* Accent color */
}
```

### Products
To add or modify products, edit the product cards in `index.html` or update the gallery data in `js/gallery.js`.

### WhatsApp Number
Find and replace all instances of `919876543210` with your actual WhatsApp number (with country code).

## Performance

- Single page application
- Lazy loading for images
- Optimized CSS and JavaScript
- Minified external libraries
- Schema markup for SEO

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

© 2024 Gagan Aqua Industries. All Rights Reserved.