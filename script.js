// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.service-card, .tool-item, .about-content, .hero-content, .portfolio-item, .testimonial-card, .blog-card');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Animate Hero Stats Counter
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    if (element.textContent.includes('%')) {
      element.textContent = Math.floor(current) + '%';
    } else if (element.textContent.includes('+')) {
      element.textContent = Math.floor(current) + '+';
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const text = stat.textContent;
        if (text.includes('150')) {
          animateCounter(stat, 150);
        } else if (text.includes('40')) {
          animateCounter(stat, 40);
        } else if (text.includes('5')) {
          animateCounter(stat, 5);
        }
      });
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroObserver.observe(heroSection);
  }
});

// Animate Hero Card Metrics
const metricsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const metricFills = entry.target.querySelectorAll('.metric-fill');
      metricFills.forEach((fill, index) => {
        setTimeout(() => {
          fill.style.width = fill.style.width || '0%';
          const targetWidth = fill.style.width;
          fill.style.width = '0%';
          setTimeout(() => {
            fill.style.width = targetWidth;
          }, 100);
        }, index * 200);
      });
      metricsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    metricsObserver.observe(heroCard);
  }
});

// Form Handling
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.consultation-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = {};
      
      // Convert FormData to regular object
      for (let [key, value] of formData.entries()) {
        if (data[key]) {
          // Handle multiple values (like checkboxes)
          if (Array.isArray(data[key])) {
            data[key].push(value);
          } else {
            data[key] = [data[key], value];
          }
        } else {
          data[key] = value;
        }
      }
      
      // Handle checkboxes separately
      const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
      const services = Array.from(checkboxes).map(cb => cb.value);
      data.services = services;
      
      // Create email content
      const emailSubject = 'SEO Consultation Request from ' + data.name;
      const emailBody = `
Name: ${data.name}
Email: ${data.email}
Website: ${data.website || 'Not provided'}
Platform: ${data.platform || 'Not specified'}
Services Needed: ${services.join(', ') || 'Not specified'}

Project Details:
${data.message || 'No additional details provided'}
      `.trim();
      
      // Create mailto link
      const mailtoLink = `mailto:tea@teapisacbenes.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      showNotification('Email client opened! Please send the email to complete your consultation request.', 'success');
      
      // Reset form
      form.reset();
    });
  }
});

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#667eea'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 400px;
    animation: slideInRight 0.3s ease;
  `;
  
  // Add close functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    margin-left: auto;
  `;
  
  closeBtn.addEventListener('click', () => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(notificationStyles);

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const heroCard = document.querySelector('.hero-card');
  
  if (heroCard && scrolled < window.innerHeight) {
    const rate = scrolled * -0.5;
    heroCard.style.transform = `translateY(${rate}px)`;
  }
});

// Tool Item Hover Effects
document.addEventListener('DOMContentLoaded', function() {
  const toolItems = document.querySelectorAll('.tool-item');
  
  toolItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Service Card Interaction
document.addEventListener('DOMContentLoaded', function() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
    });
  });
});

// Lazy Loading for Images (if any are added later)
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(e) {
  // ESC key closes mobile menu
  if (e.key === 'Escape') {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }
});

// Portfolio Item Interactions
document.addEventListener('DOMContentLoaded', function() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px)';
      this.style.boxShadow = '0 16px 50px rgba(0, 0, 0, 0.2)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
    });
  });
});

// Blog Card Interactions
document.addEventListener('DOMContentLoaded', function() {
  const blogCards = document.querySelectorAll('.blog-card');
  
  blogCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
    });
  });
});

// Testimonial Card Rotation Effect
document.addEventListener('DOMContentLoaded', function() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  testimonialCards.forEach((card, index) => {
    // Add slight rotation for visual interest
    const rotation = (index % 2 === 0) ? 1 : -1;
    card.style.transform = `rotate(${rotation}deg)`;
    
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'rotate(0deg) translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = `rotate(${rotation}deg) translateY(0)`;
    });
  });
});

// Animate Portfolio Metrics on Scroll
const portfolioMetricsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const metricValues = entry.target.querySelectorAll('.metric-value');
      metricValues.forEach((value, index) => {
        setTimeout(() => {
          value.style.transform = 'scale(1.1)';
          value.style.color = '#667eea';
          setTimeout(() => {
            value.style.transform = 'scale(1)';
          }, 200);
        }, index * 100);
      });
      portfolioMetricsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
  const portfolioMetrics = document.querySelectorAll('.portfolio-metrics');
  portfolioMetrics.forEach(metrics => {
    portfolioMetricsObserver.observe(metrics);
  });
});

// Calendly Modal Functions
function openCalendlyModal() {
  document.getElementById('calendly-modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeCalendlyModal() {
  document.getElementById('calendly-modal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Newsletter Modal Functions
function openNewsletterModal() {
  document.getElementById('newsletter-modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeNewsletterModal() {
  document.getElementById('newsletter-modal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function handleNewsletterSignup(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const email = formData.get('email');
  const interests = formData.getAll('interests');
  
  // Create email content for newsletter signup
  const emailSubject = 'Newsletter Subscription Request';
  const emailBody = `
New newsletter subscription request:

Email: ${email}
Interests: ${interests.join(', ') || 'None selected'}

Please add this email to the newsletter list.
  `.trim();
  
  // Create mailto link
  const mailtoLink = `mailto:tea@teapisacbenes.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  window.location.href = mailtoLink;
  
  showNotification('Thank you! Your subscription request has been sent.', 'success');
  closeNewsletterModal();
  event.target.reset();
}

// SEO Audit Modal Functions
function openAuditModal() {
  document.getElementById('audit-tool-modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeAuditModal() {
  document.getElementById('audit-tool-modal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function handleAuditRequest(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const url = formData.get('url');
  const email = formData.get('email');
  const focus = formData.get('focus');
  
  // Create email content for audit request
  const emailSubject = 'Free SEO Audit Request';
  const emailBody = `
New SEO audit request:

Website URL: ${url}
Contact Email: ${email}
Primary Focus: ${focus}

Please conduct a free SEO audit for this website and send the results to the provided email.
  `.trim();
  
  // Create mailto link
  const mailtoLink = `mailto:tea@teapisacbenes.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  window.location.href = mailtoLink;
  
  showNotification('Audit request submitted! You\'ll receive results within 24 hours.', 'success');
  closeAuditModal();
  event.target.reset();
}

// Chat Widget Functions
let chatOpen = false;

function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  const chatToggle = document.querySelector('.chat-toggle');
  
  if (chatOpen) {
    closeChat();
  } else {
    chatWindow.style.display = 'block';
    chatToggle.style.display = 'none';
    chatOpen = true;
    
    // Add welcome message if first time opening
    if (!localStorage.getItem('chatOpened')) {
      setTimeout(() => {
        addBotMessage('Feel free to ask me about technical SEO, e-commerce optimization, or any questions about my services! 😊');
      }, 1000);
      localStorage.setItem('chatOpened', 'true');
    }
  }
}

function closeChat() {
  const chatWindow = document.getElementById('chat-window');
  const chatToggle = document.querySelector('.chat-toggle');
  
  chatWindow.style.display = 'none';
  chatToggle.style.display = 'flex';
  chatOpen = false;
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (message) {
    addUserMessage(message);
    input.value = '';
    
    // Simulate bot response
    setTimeout(() => {
      handleBotResponse(message);
    }, 1000);
  }
}

function sendQuickMessage(message) {
  addUserMessage(message);
  
  setTimeout(() => {
    handleBotResponse(message);
  }, 1000);
}

function addUserMessage(message) {
  const messagesContainer = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'chat-message user-message';
  messageDiv.innerHTML = `
    <div class="message-content">
      <p>${message}</p>
    </div>
    <div class="message-time">${getCurrentTime()}</div>
  `;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addBotMessage(message) {
  const messagesContainer = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'chat-message bot-message';
  messageDiv.innerHTML = `
    <div class="message-content">
      <p>${message}</p>
    </div>
    <div class="message-time">${getCurrentTime()}</div>
  `;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleBotResponse(userMessage) {
  let response = '';
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('audit') || lowerMessage.includes('seo')) {
    response = 'I\'d be happy to help with a technical SEO audit! You can request a free audit using the floating button, or we can schedule a consultation to discuss your specific needs. What\'s your website URL?';
  } else if (lowerMessage.includes('migration') || lowerMessage.includes('platform')) {
    response = 'Platform migrations are one of my specialties! I\'ve successfully migrated 50+ e-commerce sites with zero traffic loss. Would you like to discuss your current platform and migration goals?';
  } else if (lowerMessage.includes('cro') || lowerMessage.includes('conversion')) {
    response = 'Conversion rate optimization is crucial for e-commerce success! I combine technical SEO with CRO strategies to maximize both traffic and conversions. What\'s your current conversion rate?';
  } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    response = 'My pricing depends on the scope and complexity of your project. I offer free consultations where we can discuss your needs and provide a custom quote. Would you like to schedule a call?';
  } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    response = 'Hello! Great to meet you! I\'m Tea, and I specialize in technical SEO for e-commerce businesses. How can I help you grow your online store today?';
  } else {
    response = 'Thanks for your message! For detailed questions like this, I\'d recommend scheduling a free consultation where we can discuss your specific situation in depth. Would you like me to send you my calendar link?';
  }
  
  addBotMessage(response);
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
}

function handleChatKeypress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
  const modals = ['calendly-modal', 'newsletter-modal', 'audit-tool-modal'];
  
  modals.forEach(modalId => {
    const modal = document.getElementById(modalId);
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});

// Auto-show newsletter popup after 30 seconds (first visit only)
document.addEventListener('DOMContentLoaded', function() {
  if (!localStorage.getItem('newsletterShown')) {
    setTimeout(() => {
      if (!document.getElementById('newsletter-modal').style.display) {
        openNewsletterModal();
        localStorage.setItem('newsletterShown', 'true');
      }
    }, 30000); // 30 seconds
  }
});

// Floating Action Button Animations
document.addEventListener('DOMContentLoaded', function() {
  const fabs = document.querySelectorAll('.fab');
  
  // Stagger animation on page load
  fabs.forEach((fab, index) => {
    fab.style.opacity = '0';
    fab.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      fab.style.transition = 'all 0.5s ease';
      fab.style.opacity = '1';
      fab.style.transform = 'translateY(0)';
    }, 2000 + (index * 200));
  });
});

// Chat Widget Pulse Animation
document.addEventListener('DOMContentLoaded', function() {
  const chatToggle = document.querySelector('.chat-toggle');
  
  // Add pulse animation every 10 seconds
  setInterval(() => {
    if (!chatOpen) {
      chatToggle.style.animation = 'pulse 1s ease-in-out';
      setTimeout(() => {
        chatToggle.style.animation = '';
      }, 1000);
    }
  }, 10000);
});

// Add pulse animation CSS
const pulseStyles = document.createElement('style');
pulseStyles.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(pulseStyles);

// Enhanced Form Validation
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
          validateField(this);
        }
      });
    });
  });
});

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  // Remove existing error styling
  field.classList.remove('error');
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Validate based on field type
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'This field is required';
  } else if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  } else if (field.type === 'url' && value) {
    try {
      new URL(value);
    } catch {
      isValid = false;
      errorMessage = 'Please enter a valid URL (including http:// or https://)';
    }
  }
  
  if (!isValid) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = errorMessage;
    errorDiv.style.cssText = `
      color: #f56565;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    `;
    field.parentNode.appendChild(errorDiv);
  }
  
  return isValid;
}

// Add error styling
const errorStyles = document.createElement('style');
errorStyles.textContent = `
  input.error, select.error {
    border-color: #f56565 !important;
    box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.1) !important;
  }
`;
document.head.appendChild(errorStyles);

// Performance Monitoring and Core Web Vitals
window.addEventListener('load', function() {
  // Log page load time for optimization
  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
  console.log(`Page loaded in ${loadTime}ms`);
  
  // Core Web Vitals monitoring
  if ('PerformanceObserver' in window) {
    try {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log('LCP:', entry.startTime);
          // Send to analytics if needed
          if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
              name: 'LCP',
              value: Math.round(entry.startTime),
              event_category: 'Web Vitals'
            });
          }
        }
      }).observe({entryTypes: ['largest-contentful-paint']});

      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log('FID:', entry.processingStart - entry.startTime);
          if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
              name: 'FID',
              value: Math.round(entry.processingStart - entry.startTime),
              event_category: 'Web Vitals'
            });
          }
        }
      }).observe({entryTypes: ['first-input']});

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        console.log('CLS:', clsValue);
        if (typeof gtag !== 'undefined') {
          gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(clsValue * 1000),
            event_category: 'Web Vitals'
          });
        }
      }).observe({entryTypes: ['layout-shift']});

    } catch (e) {
      console.log('Performance monitoring not supported');
    }
  }

  // Page visibility tracking
  document.addEventListener('visibilitychange', function() {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_visibility', {
        event_category: 'engagement',
        value: document.hidden ? 'hidden' : 'visible'
      });
    }
  });
});

// Intersection Observer for lazy loading and performance
const lazyLoadObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      
      // Lazy load images
      if (element.dataset.src) {
        element.src = element.dataset.src;
        element.removeAttribute('data-src');
      }
      
      // Lazy load background images
      if (element.dataset.bg) {
        element.style.backgroundImage = `url(${element.dataset.bg})`;
        element.removeAttribute('data-bg');
      }
      
      lazyLoadObserver.unobserve(element);
    }
  });
}, {
  rootMargin: '50px 0px',
  threshold: 0.01
});

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function() {
  const lazyElements = document.querySelectorAll('[data-src], [data-bg]');
  lazyElements.forEach(el => lazyLoadObserver.observe(el));
});

// Debounce function for performance
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Optimized scroll handler
const optimizedScrollHandler = throttle(function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
}, 16); // ~60fps

// Replace the existing scroll handler
window.removeEventListener('scroll', function() {}); // Remove old handler
window.addEventListener('scroll', optimizedScrollHandler);

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful');
      })
      .catch(function(err) {
        console.log('ServiceWorker registration failed');
      });
  });
}

// Preload critical resources
function preloadCriticalResources() {
  const criticalResources = [
    '/styles.css',
    '/script.js'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.endsWith('.css') ? 'style' : 'script';
    document.head.appendChild(link);
  });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', preloadCriticalResources);
