<script>
import { user } from '../src/authstore';
 import { pwdDashboardState } from '../src/dashboardStore.js';
  import ImageUpload from '../src/ImageUpload.svelte';

   let imageUrl = "../src/assets/icons8-user-50.png";
  let fileInput;

  function triggerFileInput() {
    if (fileInput) {
      fileInput.click();
    }
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      imageUrl = URL.createObjectURL(file);
    }
  }

  
  function handleImageUpload(event) {
    const { file, imageUrl } = event.detail;
    // Here you can handle the uploaded file
    // For example, send it to your server or store it
    userData = {
      ...userData,
      profileImage: imageUrl
    };
  }
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
    //{ icon: 'bi-bell', label: 'Notifications', view: 'notifications' },
    //{ icon: 'bi-gear', label: 'Settings', view: 'settings' },
    { icon: 'bi-box-arrow-right', label: 'Logout', view: 'logout', action: handleLogout }
   
  ];

  function setView(view) {
    dashboardState.update(s => ({ ...s, currentView: view }));
  }
</script>


  <div class="modal-overlay" class:active={state.isOpen}>
    
 
  <div class="dashboard-modal">
    <div class="modal-content">
      <div class="modal-sidebar">
       <div class="user-profile">
      <div class="image-upload">
      <input
        type="file"
        accept="image/*"
        bind:this={fileInput}
        on:change={handleFileChange}
        style="display: none"
      />
      <div 
        class="avatar-container" 
        role="button"
        tabindex="0"
        aria-label="Upload profile picture"
        on:click={triggerFileInput} 
        on:keydown={(e) => e.key === 'Enter' && triggerFileInput()}
      >
        <img src={imageUrl} alt="User avatar" class="avatar-image"/>
        <div class="upload-overlay">
          <i class="bi bi-camera" aria-hidden="true"></i>
          <span>Change Photo</span>
        </div>
      </div>
    </div>

</div>

              {#each menuItems as menuItem}
        <button 
          class="menu-item {currentView === menuItem.view ? 'active' : ''}"
          on:click={() => menuItem.view === 'logout' ? handleLogout() : currentView = menuItem.view}>
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
              <h3>Medical Assessments</h3>
              <div class="assessment-list">
                <div class="assessment-card">
                  <div class="assessment-header">
                    <span class="date">January 15, 2024</span>
                    <span class="status approved">Approved</span>
                  </div>
                  <h4>General Medical Assessment</h4>
                  <p>Conducted by Dr. Sarah Johnson</p>
                </div>
                <!-- Add more assessment cards -->
              </div>
            </div>
          {/if}

          {#if currentView === 'appointments'}
            <div class="appointments-section">
              <h3>Upcoming Appointments</h3>
              <div class="appointment-calendar">
                <!-- Add calendar or appointment list -->
                <div class="appointment-item">
                  <div class="appointment-time">
                    <i class="bi bi-clock"></i>
                    Feb 1, 2024 - 10:00 AM
                  </div>
                  <div class="appointment-details">
                    <h4>Medical Review</h4>
                    <p>With Dr. Michael Smith</p>
                  </div>
                </div>
              </div>
            </div>
          {/if}

          {#if currentView === 'documents'}
            <div class="documents-section">
              <h3>My Documents</h3>
              <div class="document-grid">
                <div class="document-card">
                  <i class="bi bi-file-pdf"></i>
                  <span>Medical Certificate</span>
                  <button class="download-btn">Download</button>
                </div>
                <!-- Add more document cards -->
              </div>
            </div>
          {/if}

          {#if currentView === 'notifications'}
            <div class="notifications-section">
              <h3>Recent Notifications</h3>
              <div class="notification-list">
                <div class="notification-item unread">
                  <i class="bi bi-bell-fill"></i>
                  <div class="notification-content">
                    <h4>Appointment Reminder</h4>
                    <p>Your appointment is scheduled for tomorrow</p>
                    <span class="time">2 hours ago</span>
                  </div>
                </div>
                <!-- Add more notifications -->
              </div>
            </div>
          {/if}

          {#if currentView === 'settings'}
            <div class="settings-section">
              <h3>Account Settings</h3>
              <div class="settings-grid">
                <div class="settings-card">
                  <h4>Personal Information</h4>
                  <button class="edit-btn">Edit</button>
                </div>
                <div class="settings-card">
                  <h4>Notification Preferences</h4>
                  <button class="edit-btn">Manage</button>
                </div>
                <!-- Add more settings options -->
              </div>
            </div>
          {/if}



          
        </div>
      </div>
    </div>
  </div>
</div>


<style>
   .modal-overlay {

    display: none;
  place-items: center;
  padding: 1vh 0;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    display: none;
    place-items: center;
    z-index: 9999;
  }

  .modal-overlay.active {
    display: grid;
  }

 .dashboard-modal {
    background: white;
    width: min(1400px, 98vw);  /* Increased from 95vw for better small screen usage */
  height: min(760px, 95vh); 
    border-radius: 8px;
    box-shadow: 
      0 20px 40px rgba(0,0,0,0.3),
      0 0 0 1px rgba(255,255,255,0.1);
    transform: translateY(0);
    animation: modalSlide 0.3s ease-out;
  }

  @keyframes modalSlide {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

 .modal-content {
  display: grid;
   grid-template-columns: min-content 1fr; /* Allow sidebar to shrink */
  height: 100%;
  overflow: hidden;
}

.modal-sidebar {
  background: #f8f9fa;
  padding: 1rem;
  border-right: 1px solid #e9ecef;
  height: 100%;
  overflow-y: auto;
   width: min(220px, 30vw); /* Adapt width for smaller screens */
  
}

.image-upload {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 1.5rem;
}

.avatar-container {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  border: 3px solid #27667B;
  transition: all 0.3s ease;
}

.avatar-container:hover .upload-overlay,
.avatar-container:focus .upload-overlay {
  opacity: 1;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.upload-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(39, 102, 123, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
}

.upload-overlay i {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.upload-overlay span {
  font-size: 0.875rem;
  text-align: center;
}

/* Focus styles for accessibility */
.avatar-container:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(39, 102, 123, 0.3);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin: 2px 0;
  border-radius: 8px;
  transition: all 0.2s ease;
  color: #000;
  border: none;
  background: transparent;
  width: 100%;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-item.active {
  background: #27667B;
  color: white;
  font-weight: 500;
}

.user-profile {
  padding: 2rem 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom:  1rem;
}



.info-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.info-section:hover {
  transform: translateY(-2px);
}

.info-section h4 {
  color: #27667B;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.75rem;
}

.info-item {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: none;
}

.label {
  font-weight: 600;
  color: #27667B;
}

.value {
  color: #1f2937;
}

/* Enhanced buttons */
.btn-edit, .download-btn {
  background: #27667B;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-edit:hover, .download-btn:hover {
  background: #1e4f5f;
  transform: translateY(-1px);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.content-body {
  animation: fadeIn 0.3s ease-out;
}


.menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}



  .modal-main {
     padding: 1.5rem;
    overflow-y: auto;
  }

  .dashboard-container {
    display: grid;
    grid-template-columns: 280px 1fr;
    min-height: 100vh;
    background: #f8f9fa;
  }

  .sidebar {
    background: white;
    padding: 2rem;
    border-right: 1px solid #e9ecef;
  }

  .user-profile {
    text-align: center;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e9ecef;
  }



  .menu-item.active {
    background: #27667B;
    color: white;
  }

  .main-content {
    padding: 2rem;
  }

  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .info-card {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin: 1.5rem 0;
  }

  .status-badge {
    background: #198754;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
  }

  .btn-edit {
    background: #27667B;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
  }
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #27667B;
    color: white;
    border-radius: 12px 12px 0 0;
  }

  .top-bar-title {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .logout-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .logout-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  /* Add styles for new sections */
  .assessment-card, .appointment-item, .document-card, .notification-item, .settings-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .document-grid, .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
.profile-section {
  padding: 1rem;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.profile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.profile-card {
  background: #e9ecef;
  border-radius: 2px;
  padding: 2rem;
  display: flex;
  gap: 2rem;
}



.profile-info {
  flex: 1;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #e9ecef;
}

.profile-details {
  display: grid;
  gap: 1rem;
}

.details-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.btn-view {
  background: #27667B;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  cursor: pointer;
}
.section-grid {
  display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Reduced from 400px */
  gap: 1rem; /* Reduced gap for smaller screens */
  padding: 1rem;
}

.info-section {
  background: white;
   border-radius: 6px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  
  flex-direction: column; /* Stack on small screens */
  gap: 0.5rem;
}


.subsection {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #e5e7eb;
}

.label {
  font-weight: 500;
  color: #4b5563;
}

.value {
  color: #111827;
}
@media (max-width: 768px) {
  .modal-content {
    grid-template-columns: 1fr; /* Stack sidebar and content */
  }
  
  .modal-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e9ecef;
  }
  
  .menu-item {
    padding: 8px 12px; /* Smaller padding */
  }
  
  
  .section-grid {
    grid-template-columns: 1fr; /* Single column */
  }
}

@media (max-width: 480px) {
  .dashboard-modal {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
  
  .info-section {
    padding: 1rem;
  }
  
  .menu-item {
    font-size: 0.9rem;
  }
  
  .info-item {
    padding: 0.5rem;
  }
}

/* Touch device optimizations */
@media (hover: none) {
  .menu-item:hover {
    background: #000;
  }
  
  .info-section:hover {
    transform: none;
  }
}

</style>
