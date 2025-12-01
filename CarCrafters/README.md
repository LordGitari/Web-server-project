# CarCrafters - Car Dealership Website

A modern car dealership website where you can browse cars, check details, and schedule test drives. Built for car enthusiasts and people looking to buy their next vehicle.

## What's Inside

### Main Features
- Car gallery with search and filters
- Detailed car pages with specs and photos
- Financing calculator to estimate payments
- Test drive scheduling system
- Color picker for different car colors
- Video showcase of featured vehicles
- Dark mode toggle
- Contact forms and dealer info

### Pages
- Homepage with featured cars
- Gallery page with all available cars
- Individual car detail pages
- 404 error page

## How to Run

You need Python installed on your computer.

1. Download or clone this project
2. Open terminal/command prompt
3. Go to the CarCrafters folder:
   ```
   cd CarCrafters
   ```
4. Run the server:
   ```
   python server.py
   ```
5. Open your browser and go to: http://localhost:8000
6. Press Ctrl+C to stop the server when done

## File Structure

```
CarCrafters/
├── templates/          # HTML pages
│   ├── index.html
│   ├── gallery.html
│   ├── car_detail.html
│   └── error.html
├── static/
│   ├── css/           # Stylesheets
│   ├── js/            # JavaScript files
│   ├── data/          # JSON data files
│   └── images/        # Car images
├── server.py          # Simple web server
└── README.md
```

## Tech Stack

- HTML5 for structure
- CSS3 for styling (with some fancy glass effects)
- JavaScript for interactive stuff
- Bootstrap 5 for responsive layout
- Python for the local server
- JSON files for car data

## Features Breakdown

### Car Gallery
- Search by brand or model
- Filter by year, category, brand
- Sort by price, year, or name
- Responsive grid layout

### Car Details
- Image carousel with multiple photos
- Complete specifications
- Customer reviews section
- Financing calculator
- Color selector
- Related car suggestions
- Quick action buttons

### Interactive Elements
- Working contact forms
- Test drive booking
- Favorites system
- Share functionality
- Dark/light mode switch

## Customizing

### Adding New Cars
Edit the `static/data/cars.json` file and add your car data.

### Changing Colors
Look for CSS variables in `static/css/style.css` and modify them.

### Adding Images
Put new images in the `images/` folder and update the HTML files.

## Browser Compatibility

Works on all modern browsers including Chrome, Firefox, Safari, and Edge. Also works on mobile devices.

## Notes

- This is a demo website, not connected to real databases
- Car images are from Unsplash (free stock photos)
- Forms don't actually send emails (just show alerts)
- All data is stored locally in JSON files

## Credits

- Car images from Unsplash
- Icons from Bootstrap Icons
- Fonts from Google Fonts
- Built with Bootstrap framework

Feel free to use this code for your own projects or learning purposes.