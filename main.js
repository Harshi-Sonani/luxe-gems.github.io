// Common JavaScript for all pages

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mainNav = document.getElementById('main-nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
        }
    });
});

// Update active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('nav a');
    
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref === currentPage) {
            item.classList.add('active');
            // Remove active from other items
            navItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
        }
    });
}

// Product data
const products = {
    1: {
        id: 1,
        name: "Diamond Solitaire Necklace",
        price: "$2,499.00",
        rating: "4.8",
        category: "Necklaces",
        description: "This exquisite diamond solitaire necklace features a brilliant 1.5 carat diamond set in 18k white gold. The diamond is ethically sourced and certified for quality and authenticity.",
        longDescription: "<p>Our Diamond Solitaire Necklace is the epitome of timeless elegance. The centerpiece is a brilliant 1.5 carat diamond, expertly cut to maximize its fire and brilliance. Set in lustrous 18k white gold, this necklace is designed to catch the light from every angle.</p><p>The diamond is ethically sourced and comes with a GIA certification, ensuring its quality and authenticity. The necklace chain is 18 inches long with a secure lobster clasp, making it comfortable for everyday wear while ensuring the safety of your precious gem.</p>",
        specs: [
            {label: "Material", value: "18k White Gold"},
            {label: "Diamond Carat", value: "1.5 ct"},
            {label: "Diamond Color", value: "D (Colorless)"},
            {label: "Diamond Clarity", value: "VS1 (Very Slightly Included)"},
            {label: "Chain Length", value: "18 inches"},
            {label: "Closure", value: "Lobster Clasp"},
            {label: "Certification", value: "GIA Certified"}
        ],
        features: [
            "Ethically sourced diamond",
            "GIA certification included",
            "18k white gold setting",
            "Secure lobster clasp",
            "18-inch chain length"
        ],
        images: [
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://plus.unsplash.com/premium_photo-1669835163351-785a187cdf95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        reviews: [
            {
                author: "Sarah Johnson",
                rating: 5,
                date: "August 15, 2023",
                comment: "Absolutely stunning! The diamond sparkles beautifully and the craftsmanship is exceptional."
            },
            {
                author: "Michael Chen",
                rating: 4,
                date: "July 28, 2023",
                comment: "Beautiful necklace. The chain is sturdy and the clasp is secure."
            }
        ]
    },
    2: {
        id: 2,
        name: "Gold Pearl Earrings",
        price: "$349.00",
        rating: "4.2",
        category: "Earrings",
        description: "Elegant gold pearl earrings featuring lustrous freshwater pearls set in 14k yellow gold.",
        images: [
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    3: {
        id: 3,
        name: "Sapphire & Diamond Ring",
        price: "$1,899.00",
        rating: "5.0",
        category: "Rings",
        description: "A stunning sapphire and diamond ring featuring a vibrant blue sapphire surrounded by brilliant diamonds.",
        images: [
            "https://plus.unsplash.com/premium_photo-1669835163351-785a187cdf95??ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    4: {
        id: 4,
        name: "Emerald Tennis Bracelet",
        price: "$3,250.00",
        rating: "4.7",
        category: "Bracelets",
        description: "A luxurious emerald tennis bracelet featuring alternating emeralds and diamonds set in 18k white gold.",
        images: [
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    }
};

// All products for shop page
const allProducts = [
    {id: 1, name: "Diamond Solitaire Necklace", price: "$2,499.00", category: "Necklaces", rating: 4.8, badge: "Bestseller"},
    {id: 2, name: "Gold Pearl Earrings", price: "$349.00", category: "Earrings", rating: 4.2, badge: "New"},
    {id: 3, name: "Sapphire & Diamond Ring", price: "$1,899.00", category: "Rings", rating: 5.0},
    {id: 4, name: "Emerald Tennis Bracelet", price: "$3,250.00", category: "Bracelets", rating: 4.7, badge: "Limited"},
    {id: 5, name: "Ruby Pendant Necklace", price: "$1,250.00", category: "Necklaces", rating: 4.5},
    {id: 6, name: "Diamond Stud Earrings", price: "$1,750.00", category: "Earrings", rating: 4.9, badge: "Bestseller"},
    {id: 7, name: "Pearl & Diamond Ring", price: "$1,150.00", category: "Rings", rating: 4.3},
    {id: 8, name: "Diamond Bangle Bracelet", price: "$2,800.00", category: "Bracelets", rating: 4.6}
];

// Helper function to generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Helper function to generate product cards HTML
function generateProductCards(productsArray) {
    return productsArray.map(product => {
        const productData = products[product.id] || product;
        return `
            <div class="product-card">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <div class="product-img">
                    <img src="${productData.images ? productData.images[0] : 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        ${generateStarRating(product.rating)}
                        <span>(${product.rating})</span>
                    </div>
                    <p class="product-price">${product.price}</p>
                    <button class="btn quick-view-btn" data-product="${product.id}">Quick View</button>
                </div>
                <a href="product-detail.html?product=${product.id}" class="product-card-link"></a>
            </div>
        `;
    }).join('');
}

// Setup product card links
function setupProductCardLinks() {
    document.querySelectorAll('.product-card-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't navigate if the click was on a button inside the card
            if (e.target.classList.contains('btn') || 
                e.target.classList.contains('quick-view-btn') ||
                e.target.closest('.btn')) {
                return;
            }
            // Get product ID from the card
            const card = this.closest('.product-card');
            const quickViewBtn = card.querySelector('.quick-view-btn');
            const productId = quickViewBtn.getAttribute('data-product');
            // Navigate to product detail page
            window.location.href = `product-detail.html?product=${productId}`;
        });
    });
}

// Setup quick view modal
function setupQuickViewModal() {
    const modal = document.getElementById('productModal');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    
    if (!modal || quickViewBtns.length === 0) return;
    
    const closeModal = document.querySelector('.close-modal');
    const modalContent = document.getElementById('modalContent');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = this.getAttribute('data-product');
            const product = products[productId];
            
            if (product) {
                // Build modal content
                let specsHtml = '';
                if (product.specs) {
                    product.specs.forEach(spec => {
                        specsHtml += `
                            <div class="spec-item">
                                <div class="spec-label">${spec.label}</div>
                                <div class="spec-value">${spec.value}</div>
                            </div>
                        `;
                    });
                }
                
                modalContent.innerHTML = `
                    <div class="product-detail-container">
                        <div class="product-gallery">
                            <div class="main-image">
                                <img src="${product.images ? product.images[0] : 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}" alt="${product.name}">
                            </div>
                        </div>
                        <div class="product-info-detail">
                            <h1>${product.name}</h1>
                            <div class="product-rating-detail">
                                ${generateStarRating(product.rating)}
                                <span>(${product.rating})</span>
                            </div>
                            <div class="product-price-detail">${product.price}</div>
                            <div class="product-description">
                                <p>${product.description}</p>
                            </div>
                            ${specsHtml ? `
                                <div class="product-specs">
                                    <h3>Specifications</h3>
                                    ${specsHtml}
                                </div>
                            ` : ''}
                            <div class="product-actions">
                                <a href="product-detail.html?product=${product.id}" class="btn">View Full Details</a>
                                <a href="contact.html" class="btn btn-outline">Make an Inquiry</a>
                            </div>
                            <div class="product-meta">
                                <div class="meta-item">
                                    <i class="fas fa-shipping-fast"></i>
                                    <span>Free Shipping</span>
                                </div>
                                <div class="meta-item">
                                    <i class="fas fa-undo"></i>
                                    <span>30-Day Returns</span>
                                </div>
                                <div class="meta-item">
                                    <i class="fas fa-gem"></i>
                                    <span>Certified Quality</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Show modal
                modal.style.display = "block";
            }
        });
    });
    
    // Close modal when clicking X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    setupQuickViewModal();
    setupProductCardLinks();
});