<script>
import { user } from '../src/authstore';
 import { pwdDashboardState } from '../src/dashboardStore.js';

 // Subscribe to dashboard state
  
// Enhanced menu click handler
function handleMenuClick(item) {
  if (item.view === 'logout') {
    handleLogout();
  } else {
    currentView = item.view;
  }
}

// Robust logout handler
function handleLogout() {
  localStorage.removeItem('userSession');
  user.set(null);
  window.location.href = '/login';
}


 // Initialize state
  let state = $pwdDashboardState;
  // Single declaration of isOpen
  export let isOpen = false;

  function toggleSidebar() {
    isOpen = !isOpen;
  }

 
// Update userData when store changes
  $: if ($user) {
    userData = $user;
  }

// Default user data
 // Enhanced user data structure
let userData = {
  personalInfo: {
    name: '',
    id: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: '',
    civilStatus: '',
    nationality: '',
    religion: ''
  },
  contactInfo: {
    mobileNumber: '',
    email: '',
    address: {
      street: '',
      barangay: '',
      city: '',
      province: '',
      zipCode: ''
    }
  },
  nextOfKin: {
    name: '',
    relationship: '',
    contactNumber: '',
    address: ''
  },
  educationStatus: {
    highestAttainment: '',
    school: '',
    yearCompleted: '',
    currentlyEnrolled: false
  },
  disabilityInfo: {
    type: '',
    cause: '',
    congenital: false,
    acquired: false,
    status: '',
    lastAssessment: ''
  },
  employmentInfo: {
    status: '',
    occupation: '',
    employer: '',
    monthlyIncome: ''
  }
};
function formatLabel(key) {
  return key
    .split(/(?=[A-Z])/)
    .join(' ')
    .split('_')
    .join(' ')
    .replace(/^\w/, c => c.toUpperCase());
}
// Add this to your script section
function formatAddress(address) {
  if (!address) return '';
  
  return [
    address.street,
    address.barangay,
    address.city,
    address.province,
    address.zipCode
  ]
    .filter(Boolean)
    .join(', ');
}



  
  let currentView = 'profile';
  
  const menuItems = [
    { icon: 'bi-person-circle', label: 'My Profile', view: 'profile' },
    { icon: 'bi-clipboard-check', label: 'Assessments', view: 'assessments' },
    { icon: 'bi-calendar-event', label: 'Appointments', view: 'appointments' },
    { icon: 'bi-file-earmark-text', label: 'Documents', view: 'documents' },
    { icon: 'bi-bell', label: 'Notifications', view: 'notifications' },
    { icon: 'bi-gear', label: 'Settings', view: 'settings' },
    { icon: 'bi-box-arrow-right', label: 'Logout', view: 'logout', action: handleLogout }
   
  ];

  function setView(view) {
    dashboardState.update(s => ({ ...s, currentView: view }));
  }

  // Add missing handlers
function handleClose() {
  isOpen = false;
}

function handleKeyClose(e) {
  if (e.key === 'Escape') handleClose();
}
</script>


 
<div class="modal-overlay" class:active={isOpen} 
     on:click|self={handleClose}
     on:keydown={handleKeyClose}
     role="button"
     tabindex="0"
     aria-label="Close dashboard modal">
  
  <div class="dashboard-modal">
    <div class="modal-content">
      <div class="modal-sidebar">
        <div class="user-profile">
          <!-- Fixed profile avatar -->
          <div class="profile-avatar">
            <img src="../src/assets/download.png" alt="User avatar" />
          </div>
          <h3>{$user?.name}</h3>
          <span class="user-id">ID: {$user?.id}</span>
        </div>


        {#each menuItems as menuItem}
          <button 
            class="menu-item {currentView === menuItem.view ? 'active' : ''}"
            on:click={() => menuItem.view === 'logout' ? handleLogout() : currentView = menuItem.view}
            aria-label={menuItem.label}
          >
            <i class="bi {menuItem.icon}"></i>
            <span>{menuItem.label}</span>
          </button>
        {/each}
      </div>

     <div class="modal-main">
        <div class="content-body">
          <!-- In your existing modal-main section, add this for the profile view -->
            {#if currentView === 'profile'}
<!-- Enhanced Profile Section -->
<div class="profile-section">
  <div class="section-grid">
    <!-- Personal Information Card -->
    <div class="info-section">
      <h4>Personal Information</h4>
      <div class="info-content">
        {#each Object.entries(userData.personalInfo) as [key, value]}
          <div class="info-item">
            <span class="label">{formatLabel(key)}</span>
            <span class="value">{value}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Contact Information Card -->
    <div class="info-section">
      <h4>Contact Information</h4>
      <div class="info-content">
        <div class="info-item">
          <span class="label">Mobile Number</span>
          <span class="value">{userData.contactInfo.mobileNumber}</span>
        </div>
        <div class="info-item">
          <span class="label">Email</span>
          <span class="value">{userData.contactInfo.email}</span>
        </div>
        <div class="info-item address">
          <span class="label">Complete Address</span>
          <span class="value">
            {formatAddress(userData.contactInfo.address)}
          </span>
        </div>
      </div>
    </div>

    <!-- Next of Kin Information -->
    <div class="info-section">
      <h4>Emergency Contact</h4>
      <div class="info-content">
        {#each Object.entries(userData.nextOfKin) as [key, value]}
          <div class="info-item">
            <span class="label">{formatLabel(key)}</span>
            <span class="value">{value}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Education & Employment Status -->
    <div class="info-section">
      <h4>Education & Employment</h4>
      <div class="info-content">
        <div class="subsection">
          <h5>Education</h5>
          {#each Object.entries(userData.educationStatus) as [key, value]}
            <div class="info-item">
              <span class="label">{formatLabel(key)}</span>
              <span class="value">{value}</span>
            </div>
          {/each}
        </div>
        <div class="subsection">
          <h5>Employment</h5>
          {#each Object.entries(userData.employmentInfo) as [key, value]}
            <div class="info-item">
              <span class="label">{formatLabel(key)}</span>
              <span class="value">{value}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
{/if}

{#if currentView === 'assessments'}
  <div class="assessments-section">
    <div class="section-header">
      <h3>Medical Assessments</h3>
      <button class="btn-primary">Schedule New Assessment</button>
    </div>
    
    <div class="assessment-list">
      <div class="assessment-card">
        <div class="assessment-header">
          <span class="date">January 15, 2024</span>
          <span class="status approved">Approved</span>
        </div>
        <h4>General Medical Assessment</h4>
        <p>Conducted by Dr. Sarah Johnson</p>
        <div class="assessment-details">
          <p><strong>Diagnosis:</strong> Partial Visual Impairment</p>
          <p><strong>Recommendations:</strong> Regular check-ups every 3 months</p>
        </div>
        <button class="btn-view">View Full Report</button>
      </div>

      <div class="assessment-card">
        <div class="assessment-header">
          <span class="date">December 1, 2023</span>
          <span class="status completed">Completed</span>
        </div>
        <h4>Physical Therapy Evaluation</h4>
        <p>Conducted by Dr. James Wilson</p>
        <div class="assessment-details">
          <p><strong>Focus Area:</strong> Mobility Assessment</p>
          <p><strong>Next Review:</strong> March 1, 2024</p>
        </div>
        <button class="btn-view">View Full Report</button>
      </div>
    </div>
  </div>
{/if}

{#if currentView === 'appointments'}
  <div class="appointments-section">
    <div class="section-header">
      <h3>Appointments</h3>
      <button class="btn-primary">Book New Appointment</button>
    </div>

    <div class="appointments-grid">
      <div class="upcoming-appointments">
        <h4>Upcoming Appointments</h4>
        <div class="appointment-card">
          <div class="appointment-date">
            <span class="day">15</span>
            <span class="month">FEB</span>
          </div>
          <div class="appointment-details">
            <h5>Medical Check-up</h5>
            <p>Dr. Michael Smith</p>
            <p><i class="bi bi-clock"></i> 10:00 AM</p>
            <p><i class="bi bi-geo-alt"></i> Main Clinic, Room 204</p>
          </div>
          <div class="appointment-actions">
            <button class="btn-reschedule">Reschedule</button>
            <button class="btn-cancel">Cancel</button>
          </div>
        </div>
      </div>

      <div class="appointment-history">
        <h4>Past Appointments</h4>
        <!-- Add past appointments list -->
      </div>
    </div>
  </div>
{/if}

{#if currentView === 'documents'}
  <div class="documents-section">
    <div class="section-header">
      <h3>My Documents</h3>
      <button class="btn-primary">Upload New Document</button>
    </div>

    <div class="document-grid">
      <div class="document-card">
        <div class="document-icon">
          <i class="bi bi-file-pdf"></i>
        </div>
        <div class="document-info">
          <h4>Medical Certificate</h4>
          <p>Uploaded on Jan 15, 2024</p>
          <span class="document-size">2.4 MB</span>
        </div>
        <div class="document-actions">
          <button class="btn-view">View</button>
          <button class="btn-download">Download</button>
        </div>
      </div>

      <!-- Add more document cards -->
    </div>
  </div>
{/if}

{#if currentView === 'notifications'}
  <div class="notifications-section">
    <div class="section-header">
      <h3>Notifications</h3>
      <button class="btn-clear">Clear All</button>
    </div>

    <div class="notification-filters">
      <button class="filter-btn active">All</button>
      <button class="filter-btn">Appointments</button>
      <button class="filter-btn">Documents</button>
      <button class="filter-btn">Updates</button>
    </div>

    <div class="notification-list">
      <!-- Add notification items -->
    </div>
  </div>
{/if}

{#if currentView === 'settings'}
  <div class="settings-section">
    <div class="settings-grid">
      <div class="settings-card">
        <h4>Account Settings</h4>
        <div class="settings-options">
          <div class="setting-item">
            <span>Email Notifications</span>
            <label class="switch">
              <input type="checkbox" checked>
              <span class="slider"></span>
            </label>
          </div>
          <div class="setting-item">
            <span>SMS Notifications</span>
            <label class="switch">
              <input type="checkbox">
              <span class="slider"></span>
            </label>
          </div>
          <!-- Add more settings options -->
        </div>
      </div>

      <div class="settings-card">
        <h4>Privacy Settings</h4>
        <!-- Add privacy settings -->
      </div>
    </div>
  </div>
{/if}

          
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Global Accessibility Fixes */
  [role="button"] {
    cursor: pointer;
    outline: none;
  }

  .menu-item:focus-visible {
    outline: 2px solid #27667B;
    outline-offset: 2px;
  }

  /* Modal Overlay */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    display: none;
    place-items: center;
    z-index: 9999;
    padding: 2vh 0;
  }

  .modal-overlay.active {
    display: grid;
  }

  /* Dashboard Modal */
  .dashboard-modal {
    background: white;
    width: min(1400px, 95vw);
    height: min(760px, 90vh);
    border-radius: 8px;
    box-shadow: 
      0 20px 40px rgba(0,0,0,0.3),
      0 0 0 1px rgba(255,255,255,0.1);
    animation: modalSlide 0.3s ease-out;
  }

  @keyframes modalSlide {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Modal Layout */
  .modal-content {
    display: grid;
    grid-template-columns: 220px 1fr;
    height: 100%;
    overflow: hidden;
  }

  .modal-sidebar {
    background: #f8f9fa;
    padding: 1rem;
    border-right: 1px solid #e9ecef;
    height: 100%;
    overflow-y: auto;
  }

  /* Profile Section Fixes */
  .profile-avatar img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #27667B;
    padding: 4px;
  }

  .user-profile {
    padding: 2rem 1rem;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 2rem;
  }

  /* Menu Items */
  .menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    margin: 4px 0;
    border-radius: 8px;
    transition: all 0.2s ease;
    color: #000;
    border: none;
    background: transparent;
    width: 100%;
  }

  .menu-item:hover {
    background: rgba(39, 102, 123, 0.1);
  }

  .menu-item.active {
    background: #27667B;
    color: white;
    font-weight: 500;
  }

  /* Main Content Area */
  .modal-main {
    padding: 1.5rem;
    overflow-y: auto;
  }

  /* Information Sections */
  .section-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    padding: 1.5rem;
  }

  .info-section {
    background: white;
    border-radius: 6px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    transition: transform 0.2s ease;
  }

  .info-section:hover {
    transform: translateY(-2px);
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
    background: #f8fafc;
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }

  /* Buttons & Interactions */
  .btn-primary {
    background: #27667B;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-primary:hover {
    background: #1e4f5f;
    transform: translateY(-1px);
  }

  /* Status Indicators */
  .status {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .status.approved { background: #10B981; color: white; }
  .status.completed { background: #6366F1; color: white; }

  /* Form Elements */
  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #27667B;
  }

  /* Accessibility Improvements */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .modal-content {
      grid-template-columns: 1fr;
    }
    
    .modal-sidebar {
      border-right: none;
      border-bottom: 1px solid #e9ecef;
    }
    
    .section-grid {
      grid-template-columns: 1fr;
    }
  }
</style>