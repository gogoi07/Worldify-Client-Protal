// Worldify Overseas Client Portal JavaScript

// Sample data (in a real application, this would come from an API)
const clientData = {
  sampleClient: {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    applicationId: "WO2024-0892",
    service: "Study Abroad - Masters in Computer Science",
    destination: "United Kingdom",
    applicationDate: "2024-10-15",
    currentStage: "Visa Processing",
    consultant: "Ms. Arti Sharma",
    consultantEmail: "arti.sharma@worldifyoverseas.com"
  },
  applicationStages: [
    {
      id: 1,
      name: "Initial Consultation",
      status: "completed",
      date: "2024-10-15",
      description: "Initial assessment and consultation completed",
      duration: "1-2 days"
    },
    {
      id: 2,
      name: "Profile Assessment",
      status: "completed",
      date: "2024-10-17",
      description: "Academic and professional profile evaluated",
      duration: "2-3 days"
    },
    {
      id: 3,
      name: "Documentation Collection",
      status: "completed",
      date: "2024-10-25",
      description: "All required documents collected and verified",
      duration: "7-10 days"
    },
    {
      id: 4,
      name: "Application Preparation",
      status: "completed",
      date: "2024-11-02",
      description: "University applications prepared and reviewed",
      duration: "5-7 days"
    },
    {
      id: 5,
      name: "Application Submission",
      status: "completed",
      date: "2024-11-05",
      description: "Applications submitted to selected universities",
      duration: "1-2 days"
    },
    {
      id: 6,
      name: "Offer Letter Received",
      status: "completed",
      date: "2024-12-18",
      description: "Conditional offer received from University of Manchester",
      duration: "4-8 weeks"
    },
    {
      id: 7,
      name: "Visa Processing",
      status: "in-progress",
      date: "2025-01-10",
      description: "Student visa application submitted and under review",
      duration: "3-4 weeks"
    },
    {
      id: 8,
      name: "Pre-departure Briefing",
      status: "pending",
      date: null,
      description: "Pre-departure orientation and guidance session",
      duration: "1 day"
    },
    {
      id: 9,
      name: "Post-arrival Support",
      status: "pending",
      date: null,
      description: "Support with settling in the destination country",
      duration: "Ongoing"
    }
  ],
  documents: [
    {
      name: "Academic Transcripts",
      status: "approved",
      uploadDate: "2024-10-20",
      required: true
    },
    {
      name: "IELTS Certificate",
      status: "approved",
      uploadDate: "2024-10-22",
      required: true
    },
    {
      name: "Passport Copy",
      status: "approved",
      uploadDate: "2024-10-18",
      required: true
    },
    {
      name: "Statement of Purpose",
      status: "approved",
      uploadDate: "2024-10-28",
      required: true
    },
    {
      name: "Financial Documents",
      status: "pending-review",
      uploadDate: "2025-01-08",
      required: true
    },
    {
      name: "Medical Certificate",
      status: "needs-revision",
      uploadDate: "2025-01-05",
      required: true,
      notes: "Please provide updated medical certificate dated within last 3 months"
    }
  ],
  messages: [
    {
      id: 1,
      from: "Ms. Arti Sharma",
      to: "Priya Sharma",
      date: "2025-01-28",
      subject: "Visa Processing Update",
      message: "Dear Priya, Your student visa application is progressing well. The UK Embassy has acknowledged receipt and it's currently under review. Expected processing time is 2-3 more weeks. Please ensure you have your medical certificate updated as requested.",
      type: "received"
    },
    {
      id: 2,
      from: "Priya Sharma",
      to: "Ms. Arti Sharma",
      date: "2025-01-25",
      subject: "Medical Certificate Query",
      message: "Hi Arti, I uploaded my medical certificate but noticed it needs revision. Could you please clarify what specific updates are required? I want to ensure I provide the correct documentation.",
      type: "sent"
    },
    {
      id: 3,
      from: "Ms. Arti Sharma",
      to: "Priya Sharma",
      date: "2025-01-20",
      subject: "Congratulations on Visa Submission",
      message: "Dear Priya, Congratulations! Your student visa application has been successfully submitted to the UK Embassy. Reference number: GWF0987654321. You should receive an acknowledgment within 2-3 working days.",
      type: "received"
    }
  ]
};

// Global variables for DOM elements
let loginPage, mainApp, loginForm, logoutBtn, sidebarToggle, sidebar, navLinks, contentSections;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  initializeApp();
});

function initializeApp() {
  // Get DOM elements
  loginPage = document.getElementById('loginPage');
  mainApp = document.getElementById('mainApp');
  loginForm = document.getElementById('loginForm');
  logoutBtn = document.getElementById('logoutBtn');
  sidebarToggle = document.getElementById('sidebarToggle');
  sidebar = document.getElementById('sidebar');
  navLinks = document.querySelectorAll('.nav-link');
  contentSections = document.querySelectorAll('.content-section');

  console.log('DOM elements found:', {
    loginPage: !!loginPage,
    mainApp: !!mainApp,
    loginForm: !!loginForm
  });

  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem('worldify_logged_in') === 'true';
  
  if (isLoggedIn) {
    showMainApp();
    populateContent();
  } else {
    showLoginPage();
  }
  
  setupEventListeners();
}

function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Login form - multiple ways to ensure it works
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      console.log('Form submit event triggered');
      handleLogin(e);
    });
    
    // Also add click handler to submit button as backup
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.addEventListener('click', function(e) {
        console.log('Submit button clicked');
        if (e.target.closest('form')) {
          e.preventDefault();
          handleLogin(e);
        }
      });
    }
  }
  
  // Logout button
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      handleLogout();
    });
  }
  
  // Sidebar toggle for mobile
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function(e) {
      e.preventDefault();
      toggleSidebar();
    });
  }
  
  // Navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      handleNavigation(e);
    });
  });
  
  // File upload handlers
  setupFileUpload();
  
  // Message form
  const messageForm = document.getElementById('messageForm');
  if (messageForm) {
    messageForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleSendMessage(e);
    });
  }
  
  // Profile form
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleProfileUpdate(e);
    });
  }
  
  // Forgot password link
  const forgotPasswordLink = document.querySelector('.forgot-password');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      showNotification('Password reset functionality would be implemented here. For demo, use: priya.sharma@email.com / password123', 'info');
    });
  }
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && sidebar && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
  
  console.log('Event listeners setup complete');
}

function handleLogin(e) {
  e.preventDefault();
  console.log('Login handler called');
  
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  if (!emailInput || !passwordInput) {
    console.error('Email or password input not found');
    showNotification('Form elements not found', 'error');
    return;
  }
  
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  
  console.log('Login attempt with email:', email);
  
  // Show loading state
  const submitBtn = loginForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Signing In...';
  submitBtn.disabled = true;
  
  // Simulate network delay
  setTimeout(() => {
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Simple login validation
    if (email === 'priya.sharma@email.com' && password === 'password123') {
      console.log('Login successful - proceeding with redirect');
      localStorage.setItem('worldify_logged_in', 'true');
      
      // Show success notification first
      showNotification('Welcome back, Priya! Login successful.', 'success');
      
      // Delay the redirect slightly to let the notification show
      setTimeout(() => {
        console.log('Redirecting to main app...');
        showMainApp();
        populateContent();
      }, 500);
      
    } else {
      console.log('Login failed - invalid credentials');
      showNotification('Invalid credentials. Please use: priya.sharma@email.com / password123', 'error');
      
      // Shake animation for visual feedback
      loginForm.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => {
        loginForm.style.animation = '';
      }, 500);
    }
  }, 800);
}

function handleLogout() {
  console.log('Logout handler called');
  localStorage.removeItem('worldify_logged_in');
  
  // Clear form fields
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  if (emailInput) emailInput.value = '';
  if (passwordInput) passwordInput.value = '';
  
  showLoginPage();
  showNotification('You have been logged out successfully', 'success');
}

function showLoginPage() {
  console.log('Showing login page');
  if (loginPage) {
    loginPage.classList.remove('hidden');
    loginPage.style.display = 'flex';
  }
  if (mainApp) {
    mainApp.classList.add('hidden');
    mainApp.style.display = 'none';
  }
}

function showMainApp() {
  console.log('Showing main app');
  if (loginPage) {
    loginPage.classList.add('hidden');
    loginPage.style.display = 'none';
  }
  if (mainApp) {
    mainApp.classList.remove('hidden');
    mainApp.style.display = 'grid';
  }
  
  // Ensure dashboard is the active section
  if (contentSections && contentSections.length > 0) {
    contentSections.forEach(section => section.classList.remove('active'));
    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
      dashboard.classList.add('active');
    }
  }
  
  // Ensure dashboard nav link is active
  if (navLinks && navLinks.length > 0) {
    navLinks.forEach(link => link.classList.remove('active'));
    const dashboardLink = document.querySelector('[data-section="dashboard"]');
    if (dashboardLink) {
      dashboardLink.classList.add('active');
    }
  }
  
  console.log('Main app display completed');
}

function toggleSidebar() {
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

function handleNavigation(e) {
  const targetSection = e.currentTarget.dataset.section;
  console.log('Navigating to section:', targetSection);
  
  // Update active nav link
  navLinks.forEach(link => link.classList.remove('active'));
  e.currentTarget.classList.add('active');
  
  // Show target section
  contentSections.forEach(section => section.classList.remove('active'));
  const targetElement = document.getElementById(targetSection);
  if (targetElement) {
    targetElement.classList.add('active');
  }
  
  // Close sidebar on mobile
  if (window.innerWidth <= 768 && sidebar) {
    sidebar.classList.remove('open');
  }
}

function populateContent() {
  console.log('Populating content...');
  populateTimeline();
  populateDocuments();
  populateMessages();
}

function populateTimeline() {
  const timeline = document.getElementById('applicationTimeline');
  if (!timeline) return;
  
  timeline.innerHTML = '';
  
  clientData.applicationStages.forEach(stage => {
    const timelineItem = document.createElement('div');
    timelineItem.className = `timeline-item ${stage.status}`;
    
    const formattedDate = stage.date ? formatDate(stage.date) : 'Pending';
    
    timelineItem.innerHTML = `
      <div class="timeline-content">
        <div class="timeline-header">
          <h3 class="timeline-title">${stage.name}</h3>
          <span class="timeline-date">${formattedDate}</span>
        </div>
        <p class="timeline-description">${stage.description}</p>
        <p class="timeline-duration">Expected duration: ${stage.duration}</p>
      </div>
    `;
    
    timeline.appendChild(timelineItem);
  });
  
  console.log('Timeline populated with', clientData.applicationStages.length, 'items');
}

function populateDocuments() {
  const documentsList = document.getElementById('documentsList');
  if (!documentsList) return;
  
  documentsList.innerHTML = '';
  
  clientData.documents.forEach(doc => {
    const documentItem = document.createElement('div');
    documentItem.className = 'document-item';
    
    let statusClass = 'pending';
    let statusText = 'Pending';
    
    switch(doc.status) {
      case 'approved':
        statusClass = 'approved';
        statusText = 'Approved';
        break;
      case 'pending-review':
        statusClass = 'pending';
        statusText = 'Under Review';
        break;
      case 'needs-revision':
        statusClass = 'revision';
        statusText = 'Needs Revision';
        break;
    }
    
    const uploadDate = doc.uploadDate ? formatDate(doc.uploadDate) : 'Not uploaded';
    const notes = doc.notes ? `<p class="document-notes" style="color: var(--color-error); font-size: var(--font-size-sm); margin-top: 8px;">${doc.notes}</p>` : '';
    
    documentItem.innerHTML = `
      <div class="document-info">
        <h4>${doc.name}</h4>
        <p class="document-meta">Uploaded: ${uploadDate}</p>
        ${notes}
      </div>
      <div class="document-status ${statusClass}">
        ${statusText}
      </div>
    `;
    
    documentsList.appendChild(documentItem);
  });
  
  console.log('Documents populated with', clientData.documents.length, 'items');
}

function populateMessages() {
  const messagesList = document.getElementById('messagesList');
  if (!messagesList) return;
  
  messagesList.innerHTML = '';
  
  // Sort messages by date (newest first)
  const sortedMessages = [...clientData.messages].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  sortedMessages.forEach(message => {
    const messageItem = document.createElement('div');
    messageItem.className = `message-item ${message.type}`;
    
    messageItem.innerHTML = `
      <div class="message-header">
        <span class="message-from">${message.from}</span>
        <span class="message-date">${formatDate(message.date)}</span>
      </div>
      <h4 class="message-subject">${message.subject}</h4>
      <p class="message-content">${message.message}</p>
    `;
    
    messagesList.appendChild(messageItem);
  });
  
  console.log('Messages populated with', sortedMessages.length, 'items');
}

function setupFileUpload() {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  const uploadBtn = document.querySelector('.upload-btn');
  
  if (uploadArea && fileInput && uploadBtn) {
    uploadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      fileInput.click();
    });
    
    uploadArea.addEventListener('dragover', function(e) {
      e.preventDefault();
      this.style.borderColor = 'var(--worldify-blue)';
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
      e.preventDefault();
      this.style.borderColor = 'var(--color-border)';
    });
    
    uploadArea.addEventListener('drop', function(e) {
      e.preventDefault();
      this.style.borderColor = 'var(--color-border)';
      const files = e.dataTransfer.files;
      handleFiles(files);
    });
    
    fileInput.addEventListener('change', function(e) {
      const files = e.target.files;
      handleFiles(files);
    });
  }
}

function handleSendMessage(e) {
  const subject = document.getElementById('messageSubject').value.trim();
  const content = document.getElementById('messageContent').value.trim();
  
  if (!subject || !content) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  // Simulate sending message
  const newMessage = {
    id: clientData.messages.length + 1,
    from: clientData.sampleClient.name,
    to: clientData.sampleClient.consultant,
    date: new Date().toISOString().split('T')[0],
    subject: subject,
    message: content,
    type: 'sent'
  };
  
  clientData.messages.unshift(newMessage);
  populateMessages();
  
  // Clear form
  document.getElementById('messageSubject').value = '';
  document.getElementById('messageContent').value = '';
  
  showNotification('Message sent successfully to your consultant!', 'success');
}

function handleProfileUpdate() {
  showNotification('Profile updated successfully!', 'success');
}

function handleFiles(files) {
  Array.from(files).forEach(file => {
    if (validateFile(file)) {
      showNotification(`File "${file.name}" uploaded successfully!`, 'success');
    }
  });
}

function validateFile(file) {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (!allowedTypes.includes(file.type)) {
    showNotification(`Invalid file type: ${file.name}. Only PDF, JPG, and PNG files are allowed.`, 'error');
    return false;
  }
  
  if (file.size > maxSize) {
    showNotification(`File too large: ${file.name}. Maximum size is 10MB.`, 'error');
    return false;
  }
  
  return true;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function showNotification(message, type = 'info') {
  // Remove any existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles for notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
    border: 1px solid;
  `;
  
  const contentDiv = notification.querySelector('.notification-content');
  contentDiv.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  
  // Set colors based on type
  switch(type) {
    case 'success':
      notification.style.backgroundColor = 'rgba(33, 128, 141, 0.1)';
      notification.style.borderColor = 'var(--worldify-blue)';
      notification.style.color = 'var(--worldify-blue)';
      break;
    case 'error':
      notification.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
      notification.style.borderColor = '#ef4444';
      notification.style.color = '#ef4444';
      break;
    default:
      notification.style.backgroundColor = 'var(--color-surface)';
      notification.style.borderColor = 'var(--color-border)';
      notification.style.color = 'var(--color-text)';
  }
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Handle close button
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    margin-left: 16px;
    color: currentColor;
    opacity: 0.7;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  closeBtn.addEventListener('click', () => {
    removeNotification(notification);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(notification);
  }, 5000);
}

function removeNotification(notification) {
  if (notification && notification.parentNode) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
}

// Responsive handling
window.addEventListener('resize', function() {
  if (window.innerWidth > 768 && sidebar) {
    sidebar.classList.remove('open');
  }
});

// Add CSS for shake animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);