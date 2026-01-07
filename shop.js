// Shop page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load all products
    const productsGrid = document.getElementById('all-products');
    const productCount = document.getElementById('product-count');
    
    if (productsGrid) {
        productsGrid.innerHTML = generateProductCards(allProducts);
        productCount.textContent = `Showing ${allProducts.length} products`;
    }
    
    // Setup shop filters
    setupShopFilters();
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
});

function setupShopFilters() {
    const applyPriceFilter = document.getElementById('applyPriceFilter');
    const clearFilters = document.getElementById('clearFilters');
    const sortSelect = document.getElementById('sortProducts');
    
    if (applyPriceFilter) {
        applyPriceFilter.addEventListener('click', function() {
            const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
            const maxPrice = parseFloat(document.getElementById('maxPrice').value) || 5000;
            
            // Filter products by price (in a real app, this would filter actual data)
            const filteredCount = allProducts.filter(p => {
                const price = parseFloat(p.price.replace('$', '').replace(',', ''));
                return price >= minPrice && price <= maxPrice;
            }).length;
            
            alert(`Found ${filteredCount} products within $${minPrice} - $${maxPrice} price range. In a real application, products would be filtered.`);
        });
    }
    
    if (clearFilters) {
        clearFilters.addEventListener('click', function() {
            document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = true;
            });
            document.getElementById('minPrice').value = 0;
            document.getElementById('maxPrice').value = 5000;
            alert('Filters cleared!');
        });
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            let sortedProducts = [...allProducts];
            
            switch(sortValue) {
                case 'price-low':
                    sortedProducts.sort((a, b) => {
                        const priceA = parseFloat(a.price.replace('$', '').replace(',', ''));
                        const priceB = parseFloat(b.price.replace('$', '').replace(',', ''));
                        return priceA - priceB;
                    });
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => {
                        const priceA = parseFloat(a.price.replace('$', '').replace(',', ''));
                        const priceB = parseFloat(b.price.replace('$', '').replace(',', ''));
                        return priceB - priceA;
                    });
                    break;
                case 'rating':
                    sortedProducts.sort((a, b) => b.rating - a.rating);
                    break;
                case 'newest':
                    // For demo, just reverse the array
                    sortedProducts.reverse();
                    break;
            }
            
            const productsGrid = document.getElementById('all-products');
            if (productsGrid) {
                productsGrid.innerHTML = generateProductCards(sortedProducts);
                // Re-attach event listeners for new buttons
                setupQuickViewModal();
                setupProductCardLinks();
            }
        });
    }
}