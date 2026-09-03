/* ======================================
   Product Gallery JavaScript
   ====================================== */

document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initLightbox();
});

/* ======================================
   Gallery Initialization
   ====================================== */
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('loadMoreGallery');
    
    if (!galleryGrid) return;
    
    // Gallery data - Add your images here
    const galleryData = [
        { id: 1, src: 'images/products/300ml-bottle.png', title: '300ml Water Bottle', category: 'bottles' },
        { id: 2, src: 'images/products/500ml-bottle.png', title: '500ml Water Bottle', category: 'bottles' },
        { id: 3, src: 'images/products/1l-bottle.png', title: '1L Water Bottle', category: 'bottles' },
        { id: 4, src: 'images/products/2l-bottle.png', title: '2L Water Bottle', category: 'bottles' },
        { id: 5, src: 'images/products/20l-can.png', title: '20L Water Can', category: 'cans' },
        { id: 6, src: 'images/products/custom-bottle.png', title: 'Custom Branded Bottle', category: 'custom' },
        // Add more images as needed
    ];
    
    let currentFilter = 'all';
    let displayedItems = 8;
    
    // Render gallery items
    function renderGallery(filter = 'all') {
        const filteredData = filter === 'all' 
            ? galleryData 
            : galleryData.filter(item => item.category === filter);
        
        const itemsToShow = filteredData.slice(0, displayedItems);
        
        galleryGrid.innerHTML = '';
        
        if (itemsToShow.length === 0) {
            galleryGrid.innerHTML = `
                <div class="gallery-empty">
                    <i class="fas fa-images"></i>
                    <p>No images found in this category.</p>
                </div>
            `;
            return;
        }
        
        itemsToShow.forEach(function(item, index) {
            const galleryItem = createGalleryItem(item, index);
            galleryGrid.appendChild(galleryItem);
        });
        
        // Show/hide load more button
        if (loadMoreBtn) {
            loadMoreBtn.style.display = filteredData.length > displayedItems ? 'inline-flex' : 'none';
        }
    }
    
    // Create gallery item element
    function createGalleryItem(item, index) {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.setAttribute('data-category', item.category);
        div.setAttribute('data-index', index);
        div.style.animationDelay = (index * 0.05) + 's';
        
        div.innerHTML = `
            <img src="${item.src}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <span class="gallery-category">${item.category}</span>
                <span class="gallery-title">${item.title}</span>
            </div>
            <div class="gallery-zoom">
                <i class="fas fa-search-plus"></i>
            </div>
            <span class="gallery-counter">${index + 1}</span>
        `;
        
        // Click event for lightbox
        div.addEventListener('click', function() {
            openLightbox(item.src, item.title);
        });
        
        return div;
    }
    
    // Filter functionality
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.getAttribute('data-filter');
            displayedItems = 8; // Reset displayed items
            renderGallery(currentFilter);
        });
    });
    
    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            displayedItems += 4;
            renderGallery(currentFilter);
        });
    }
    
    // Initial render
    renderGallery();
}

/* ======================================
   Lightbox Functionality
   ====================================== */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    
    if (!lightbox) return;
    
    let currentIndex = 0;
    let images = [];
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Open lightbox
    window.openLightbox = function(src, title) {
        lightboxImage.src = src;
        lightboxCaption.textContent = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Get all gallery items for navigation
        const galleryItems = document.querySelectorAll('.gallery-item');
        images = Array.from(galleryItems).map(item => ({
            src: item.querySelector('img').src,
            title: item.querySelector('.gallery-title')?.textContent || ''
        }));
        
        currentIndex = images.findIndex(img => img.src === src);
    };
    
    // Navigation
    function navigate(direction) {
        currentIndex += direction;
        
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        } else if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        
        lightboxImage.src = images[currentIndex].src;
        lightboxCaption.textContent = images[currentIndex].title;
    }
    
    // Event listeners
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            navigate(-1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            navigate(1);
        });
    }
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigate(-1);
                break;
            case 'ArrowRight':
                navigate(1);
                break;
        }
    });
}

/* ======================================
   Dynamic Image Loading from Folder
   ====================================== */

// This function can be used to load images dynamically from a folder
// Useful for when you add new product images to the folder
function loadImagesFromFolder(folderPath, callback) {
    // For static sites, you would need to maintain a list of images
    // This is a helper function for future implementation with a backend
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const images = [];
    
    // In a real implementation, this would fetch from a server
    // For now, we use the predefined gallery data
    if (callback) {
        callback(images);
    }
    
    return images;
}

/* ======================================
   Image Upload Handler (Admin)
   ====================================== */

// Function to handle new image uploads (for admin interface)
function handleImageUpload(files) {
    const formData = new FormData();
    
    Array.from(files).forEach(function(file) {
        formData.append('images', file);
    });
    
    // In a real implementation, this would upload to a server
    // For now, we'll show a preview
    const previewContainer = document.createElement('div');
    previewContainer.className = 'upload-preview';
    
    Array.from(files).forEach(function(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.createElement('div');
            preview.className = 'preview-item';
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <span class="preview-name">${file.name}</span>
            `;
            previewContainer.appendChild(preview);
        };
        reader.readAsDataURL(file);
    });
    
    return previewContainer;
}

/* ======================================
   Gallery Search Functionality
   ====================================== */

function initGallerySearch() {
    const searchInput = document.querySelector('.gallery-search');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(function(item) {
            const title = item.querySelector('.gallery-title')?.textContent.toLowerCase() || '';
            const category = item.getAttribute('data-category') || '';
            
            if (title.includes(searchTerm) || category.includes(searchTerm)) {
                item.style.display = '';
                item.style.opacity = '1';
            } else {
                item.style.opacity = '0.3';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initGallerySearch);

/* ======================================
   Gallery View Toggle
   ====================================== */

function initGalleryViewToggle() {
    const viewBtns = document.querySelectorAll('.gallery-view-btn');
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!viewBtns.length || !galleryGrid) return;
    
    viewBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active state
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update grid class
            galleryGrid.classList.remove('grid-view', 'list-view', 'masonry');
            galleryGrid.classList.add(view + '-view');
        });
    });
}

document.addEventListener('DOMContentLoaded', initGalleryViewToggle);

/* ======================================
   Gallery Performance Optimization
   ====================================== */

// Intersection Observer for lazy loading gallery images
function initGalleryLazyLoad() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        galleryImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
}

document.addEventListener('DOMContentLoaded', initGalleryLazyLoad);

/* ======================================
   Gallery Keyboard Shortcuts
   ====================================== */

function initGalleryKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Only work when gallery is in view and lightbox is not open
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) return;
        
        const gallerySection = document.getElementById('gallery');
        if (!gallerySection) return;
        
        const rect = gallerySection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isInView) return;
        
        switch (e.key) {
            case 'ArrowLeft':
                scrollGallery(-1);
                break;
            case 'ArrowRight':
                scrollGallery(1);
                break;
        }
    });
}

function scrollGallery(direction) {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    const scrollAmount = 300 * direction;
    galleryGrid.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', initGalleryKeyboardShortcuts);

/* ======================================
   Gallery Export for Admin
   ====================================== */

// Function to export gallery data (useful for admin)
function exportGalleryData() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const data = [];
    
    galleryItems.forEach(function(item) {
        data.push({
            src: item.querySelector('img')?.src || '',
            title: item.querySelector('.gallery-title')?.textContent || '',
            category: item.getAttribute('data-category') || ''
        });
    });
    
    return JSON.stringify(data, null, 2);
}

// Make functions available globally for admin use
window.GalleryAdmin = {
    handleImageUpload: handleImageUpload,
    exportGalleryData: exportGalleryData,
    loadImagesFromFolder: loadImagesFromFolder
};