// gallery page js
var allCars = [];
var filteredCars = [];

// get all the elements we need
var carsGrid = document.getElementById('carsGrid');
var loadingSpinner = document.getElementById('loadingSpinner');
var noResults = document.getElementById('noResults');
var resultsCount = document.getElementById('resultsCount');
var searchInput = document.getElementById('searchInput');
var brandFilter = document.getElementById('brandFilter');
var yearFilter = document.getElementById('yearFilter');
var categoryFilter = document.getElementById('categoryFilter');
var sortBy = document.getElementById('sortBy');
var clearFiltersBtn = document.getElementById('clearFilters');

// load cars from json file
function loadCars() {
  fetch('/static/data/cars.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      allCars = data;
      filteredCars = allCars.slice(); // copy array
      
      populateFilters();
      displayCars(filteredCars);
      
      if(loadingSpinner) {
        loadingSpinner.classList.add('d-none');
      }
      
      console.log('Loaded ' + allCars.length + ' cars');
    })
    .catch(function(error) {
      console.log('Error loading cars:', error);
      if(loadingSpinner) {
        loadingSpinner.innerHTML = '<div class="alert alert-danger">Failed to load cars. Please refresh.</div>';
      }
    });
}

// ===================================
// Populate Filter Dropdowns
// ===================================
function populateFilters() {
    // Get unique brands
    const brands = [...new Set(allCars.map(car => car.brand))].sort();
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });

    // Get unique years
    const years = [...new Set(allCars.map(car => car.year))].sort((a, b) => b - a);
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });

    // Get unique categories
    const categories = [...new Set(allCars.map(car => car.category))].sort();
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// ===================================
// Display Cars in Grid
// ===================================
function displayCars(cars) {
    // Add subtle loading feedback
    carsGrid.style.opacity = '0.5';

    // Clear grid
    carsGrid.innerHTML = '';

    // Update results count with animation
    resultsCount.textContent = `${cars.length} car${cars.length !== 1 ? 's' : ''} found`;
    resultsCount.style.animation = 'none';
    setTimeout(() => {
        resultsCount.style.animation = 'pulse 0.3s ease-out';
    }, 10);

    // Show/hide no results message
    if (cars.length === 0) {
        noResults.classList.remove('d-none');
        carsGrid.classList.add('d-none');
        carsGrid.style.opacity = '1';
        return;
    } else {
        noResults.classList.add('d-none');
        carsGrid.classList.remove('d-none');
    }

    // Create car cards
    cars.forEach((car, index) => {
        const carCard = createCarCard(car, index);
        carsGrid.appendChild(carCard);
    });

    // Restore opacity with smooth transition
    setTimeout(() => {
        carsGrid.style.opacity = '1';
    }, 50);
}

// ===================================
// Create Car Card Element
// ===================================
function createCarCard(car, index) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 col-xl-3';

    col.innerHTML = `
        <div class="car-card" style="animation-delay: ${index * 0.1}s">
            <div class="car-image-container">
                <span class="category-badge">${car.category}</span>
                <img src="${car.image}" alt="${car.brand} ${car.model}" class="car-image" 
                     loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80'">
                <div class="car-image-overlay">
                    <i class="bi bi-eye-fill overlay-icon"></i>
                </div>
            </div>
            <div class="car-info">
                <div class="car-brand">${car.brand}</div>
                <h3 class="car-model">${car.model}</h3>
                <div class="car-year">
                    <i class="bi bi-calendar3 me-1"></i>${car.year}
                </div>
                <div class="car-details">
                    <div class="car-price">${car.price}</div>
                    <a href="car_detail.html?id=${car.id}" class="btn-view-details">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    `;

    return col;
}

// ===================================
// Filter and Search Functions
// ===================================
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedBrand = brandFilter.value;
    const selectedYear = yearFilter.value;
    const selectedCategory = categoryFilter.value;

    filteredCars = allCars.filter(car => {
        // Search filter
        const matchesSearch = searchTerm === '' ||
            car.brand.toLowerCase().includes(searchTerm) ||
            car.model.toLowerCase().includes(searchTerm);

        // Brand filter
        const matchesBrand = selectedBrand === '' || car.brand === selectedBrand;

        // Year filter
        const matchesYear = selectedYear === '' || car.year === selectedYear;

        // Category filter
        const matchesCategory = selectedCategory === '' || car.category === selectedCategory;

        return matchesSearch && matchesBrand && matchesYear && matchesCategory;
    });

    // Apply sorting
    applySorting();

    // Display filtered cars
    displayCars(filteredCars);
}

// ===================================
// Sorting Function
// ===================================
function applySorting() {
    const sortValue = sortBy.value;

    switch (sortValue) {
        case 'price-low':
            filteredCars.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[$,]/g, ''));
                const priceB = parseInt(b.price.replace(/[$,]/g, ''));
                return priceA - priceB;
            });
            break;
        case 'price-high':
            filteredCars.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[$,]/g, ''));
                const priceB = parseInt(b.price.replace(/[$,]/g, ''));
                return priceB - priceA;
            });
            break;
        case 'year-new':
            filteredCars.sort((a, b) => parseInt(b.year) - parseInt(a.year));
            break;
        case 'year-old':
            filteredCars.sort((a, b) => parseInt(a.year) - parseInt(b.year));
            break;
        case 'brand':
            filteredCars.sort((a, b) => a.brand.localeCompare(b.brand));
            break;
        default:
            // Default order (as loaded from JSON)
            filteredCars.sort((a, b) => a.id - b.id);
    }
}

// ===================================
// Clear All Filters
// ===================================
function clearFilters() {
    searchInput.value = '';
    brandFilter.value = '';
    yearFilter.value = '';
    categoryFilter.value = '';
    sortBy.value = 'default';

    filteredCars = [...allCars];
    displayCars(filteredCars);
}

// ===================================
// Event Listeners
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Load cars on page load
    loadCars();

    // Search input - real-time filtering
    searchInput.addEventListener('input', applyFilters);

    // Filter dropdowns
    brandFilter.addEventListener('change', applyFilters);
    yearFilter.addEventListener('change', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);

    // Sort dropdown
    sortBy.addEventListener('change', applyFilters);

    // Clear filters button
    clearFiltersBtn.addEventListener('click', clearFilters);

    // Add keyboard shortcut for search (Ctrl/Cmd + K)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
});

// ===================================
// Scroll Animation for Cards
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards when they're added to the DOM
const observeCards = () => {
    const cards = document.querySelectorAll('.car-card');
    cards.forEach(card => {
        cardObserver.observe(card);
    });
};

// Call observeCards after displaying cars
const originalDisplayCars = displayCars;
displayCars = function (cars) {
    originalDisplayCars(cars);
    setTimeout(observeCards, 100);
};

// just some console stuff
console.log('Gallery page loaded!');
console.log('Tip: Press Ctrl+K to search');
