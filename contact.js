// Contact page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real app, this would send data to a server
            console.log('Contact form submitted:', { name, email, phone, subject, message });
            
            // Show success message
            alert(`Thank you for your message, ${name}! Our jewelry specialists will contact you at ${email} within 24 hours.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                alert(`Thank you for subscribing to our newsletter! You'll receive our next update at ${email}.`);
                this.reset();
            }
        });
    }
    
    // Consultation modal
    const consultationModal = document.getElementById('inquiryModal');
    if (consultationModal) {
        const closeModal = consultationModal.querySelector('.close-modal');
        const consultationForm = document.getElementById('consultationForm');
        
        // Show consultation modal on certain actions (could be triggered elsewhere)
        // For now, we'll add a button in the contact info section
        const scheduleBtn = document.createElement('button');
        scheduleBtn.className = 'btn';
        scheduleBtn.innerHTML = '<i class="fas fa-calendar-alt"></i> Schedule Consultation';
        scheduleBtn.style.marginTop = '20px';
        scheduleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            consultationModal.style.display = "block";
        });
        
        // Add button to contact info section
        const contactInfo = document.querySelector('.contact-info');
        if (contactInfo) {
            contactInfo.appendChild(scheduleBtn);
        }
        
        // Close modal
        closeModal.addEventListener('click', function() {
            consultationModal.style.display = "none";
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === consultationModal) {
                consultationModal.style.display = "none";
            }
        });
        
        // Handle consultation form submission
        if (consultationForm) {
            consultationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('consultName').value;
                const email = document.getElementById('consultEmail').value;
                const phone = document.getElementById('consultPhone').value;
                const date = document.getElementById('consultDate').value;
                const type = document.getElementById('consultType').value;
                
                if (!name || !email || !phone) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                // In a real app, this would send data to a server
                console.log('Consultation scheduled:', { name, email, phone, date, type });
                
                alert(`Thank you for scheduling a consultation, ${name}! We will confirm your ${type} appointment within 24 hours.`);
                consultationForm.reset();
                consultationModal.style.display = "none";
            });
        }
    }
    
    // Get Directions button
    const directionsBtn = document.querySelector('a.btn[href="#"]:has(.fa-directions)');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('In a real application, this would open Google Maps with directions to our store at: 123 Luxury Avenue, Diamond District, New York, NY 10001');
        });
    }
});