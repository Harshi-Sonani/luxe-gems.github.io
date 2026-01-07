// Homepage specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load featured products
    const featuredProductsContainer = document.getElementById('featured-products');
    if (featuredProductsContainer) {
        const featuredProducts = allProducts.slice(0, 4);
        featuredProductsContainer.innerHTML = generateProductCards(featuredProducts);
    }
    
    // Load featured blogs
    const featuredBlogsContainer = document.getElementById('featured-blogs');
    if (featuredBlogsContainer) {
        const blogPosts = [
            {
                title: "How to Care for Your Diamond Jewelry",
                excerpt: "Learn the best practices to keep your diamonds sparkling for generations with our comprehensive care guide.",
                category: "Care Guide",
                date: "August 18, 2023",
                image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            {
                title: "2023 Jewelry Trends to Watch",
                excerpt: "Discover the top jewelry trends for 2023, from statement pieces to minimalist designs.",
                category: "Trends",
                date: "July 30, 2023",
                image: "https://plus.unsplash.com/premium_photo-1669835163351-785a187cdf95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            {
                title: "Gemstone Meanings and Symbolism",
                excerpt: "Explore the meanings behind popular gemstones and how to choose the right one for you.",
                category: "Guide",
                date: "July 15, 2023",
                image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            }
        ];
        
        const blogsHtml = blogPosts.map(post => `
            <div class="blog-card">
                <div class="blog-img">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="blog-info">
                    <div class="blog-meta">
                        <span>${post.date}</span>
                        <span>${post.category}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="blog.html" class="btn btn-outline">Read More</a>
                </div>
            </div>
        `).join('');
        
        featuredBlogsContainer.innerHTML = blogsHtml;
    }
});