// Blog page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('blog-search');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // In a real app, this would search through blog posts
                alert(`Searching for: "${searchTerm}". In a real application, this would filter blog posts.`);
                // Reset search
                searchInput.value = '';
            } else {
                alert('Please enter a search term');
            }
        });
        
        // Allow Enter key to trigger search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchBtn.click();
            }
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.getElementById('sidebar-newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                alert(`Thank you for subscribing to our newsletter! A confirmation has been sent to ${email}.`);
                this.reset();
            }
        });
    }
    
    // Read more links
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, this would navigate to full article
            const articleTitle = this.closest('.blog-post-content').querySelector('h2').textContent;
            alert(`In a real application, this would open the full article: "${articleTitle}"`);
        });
    });
    
    // Category links
    const categoryLinks = document.querySelectorAll('.widget-categories a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.textContent.split(' (')[0];
            alert(`In a real application, this would filter blog posts by category: ${category}`);
        });
    });
});