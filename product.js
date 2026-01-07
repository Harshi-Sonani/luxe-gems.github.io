// Product detail page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product') || 1;
    const product = products[productId] || products[1];
    
    // Update product details
    updateProductDetails(product);
    
    // Load related products (excluding current product)
    loadRelatedProducts(productId);
    
    // Setup product detail interactions
    setupProductDetailInteractions(product);
    
    // Setup inquiry modal
    setupInquiryModal(product);
});

function updateProductDetails(product) {
    // Update basic product info
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-description').innerHTML = `<p>${product.description}</p>`;
    
    // Update rating
    const ratingElement = document.getElementById('product-rating');
    if (ratingElement) {
        ratingElement.innerHTML = `${generateStarRating(product.rating)}<span>(${product.rating})</span>`;
    }
    
    // Update specifications
    const specsElement = document.getElementById('product-specs');
    const detailedSpecsElement = document.getElementById('detailed-specs');
    if (product.specs && specsElement) {
        let specsHtml = '';
        product.specs.forEach(spec => {
            specsHtml += `
                <div class="spec-item">
                    <div class="spec-label">${spec.label}</div>
                    <div class="spec-value">${spec.value}</div>
                </div>
            `;
        });
        specsElement.innerHTML = specsHtml;
        if (detailedSpecsElement) {
            detailedSpecsElement.innerHTML = specsHtml;
        }
    }
    
    // Update full description
    const fullDescriptionElement = document.getElementById('full-description');
    if (fullDescriptionElement && product.longDescription) {
        fullDescriptionElement.innerHTML = product.longDescription;
    }
    
    // Update images
    const mainImage = document.getElementById('mainProductImage');
    const thumbnailsContainer = document.getElementById('product-thumbnails');
    
    if (mainImage && product.images) {
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
        
        if (thumbnailsContainer) {
            let thumbnailsHtml = '';
            product.images.forEach((img, index) => {
                thumbnailsHtml += `
                    <div class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}">
                        <img src="${img}" alt="${product.name} - View ${index + 1}">
                    </div>
                `;
            });
            thumbnailsContainer.innerHTML = thumbnailsHtml;
        }
    }
    
    // Update reviews
    const reviewsElement = document.getElementById('customer-reviews');
    if (reviewsElement && product.reviews) {
        let reviewsHtml = '';
        product.reviews.forEach(review => {
            reviewsHtml += `
                <div class="review-item">
                    <div class="review-header">
                        <div class="review-author">${review.author}</div>
                        <div class="review-rating">
                            ${generateStarRating(review.rating)}
                            <span>${review.date}</span>
                        </div>
                    </div>
                    <p>${review.comment}</p>
                </div>
            `;
        });
        reviewsElement.innerHTML = reviewsHtml;
    }
}

function loadRelatedProducts(currentProductId) {
    const relatedProductsContainer = document.getElementById('related-products');
    if (relatedProductsContainer) {
        const relatedProducts = allProducts.filter(p => p.id != currentProductId).slice(0, 4);
        relatedProductsContainer.innerHTML = generateProductCards(relatedProducts);
        
        // Re-attach event listeners for new buttons
        setupQuickViewModal();
        setupProductCardLinks();
    }
}

function setupProductDetailInteractions(product) {
    // Thumbnail click to change main image
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', function() {
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const mainImage = document.getElementById('mainProductImage');
            const newImage = this.getAttribute('data-image') || this.querySelector('img').src;
            mainImage.src = newImage;
        });
    });
    
    // Quantity controls
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
    }
    
    // Wishlist button
    const wishlistBtn = document.getElementById('wishlistBtn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            alert('Product saved for later!');
        });
    }
    
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Review form
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        // Star rating
        const stars = reviewForm.querySelectorAll('.star');
        let selectedRating = 0;
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                selectedRating = parseInt(this.getAttribute('data-value'));
                stars.forEach((s, index) => {
                    if (index < selectedRating) {
                        s.style.color = 'var(--accent-gold)';
                    } else {
                        s.style.color = 'var(--border-light)';
                    }
                });
            });
        });
        
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (selectedRating === 0) {
                alert('Please select a rating');
                return;
            }
            alert('Thank you for your review! It will be published after moderation.');
            this.reset();
            // Reset stars
            stars.forEach(star => {
                star.style.color = 'var(--border-light)';
            });
            selectedRating = 0;
        });
    }
}

function setupInquiryModal(product) {
    const inquiryBtn = document.getElementById('inquiry-btn');
    const inquiryModal = document.getElementById('inquiryModal');
    
    if (inquiryBtn && inquiryModal) {
        const closeModal = inquiryModal.querySelector('.close-modal');
        const inquiryForm = document.getElementById('inquiryForm');
        
        // Open inquiry modal
        inquiryBtn.addEventListener('click', function() {
            inquiryModal.style.display = "block";
        });
        
        // Close modal
        closeModal.addEventListener('click', function() {
            inquiryModal.style.display = "none";
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === inquiryModal) {
                inquiryModal.style.display = "none";
            }
        });
        
        // Handle inquiry form submission
        if (inquiryForm) {
            inquiryForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('inquiryName').value;
                const email = document.getElementById('inquiryEmail').value;
                const phone = document.getElementById('inquiryPhone').value;
                const message = document.getElementById('inquiryMessage').value;
                
                // In a real app, this would send data to a server
                console.log('Inquiry submitted:', {
                    product: product.name,
                    name,
                    email,
                    phone,
                    message
                });
                
                alert(`Thank you for your inquiry about "${product.name}". We will contact you at ${email} within 24 hours.`);
                inquiryForm.reset();
                inquiryModal.style.display = "none";
            });
        }
    }
}