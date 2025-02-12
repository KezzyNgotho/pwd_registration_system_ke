<script>
import { user } from '../src/authstore';


  function handleLogout() {
    logout();
    navigate('/login');
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


  // Update userData when store changes
  $: if ($user) {
    userData = $user;
  }
  
  export let isOpen = false;
  
  let currentView = 'profile';
  
  const menuItems = [
    { icon: 'bi-person-circle', label: 'My Profile', view: 'profile' },
    { icon: 'bi-clipboard-check', label: 'Assessments', view: 'assessments' },
    { icon: 'bi-calendar-event', label: 'Appointments', view: 'appointments' },
    { icon: 'bi-file-earmark-text', label: 'Documents', view: 'documents' },
    { icon: 'bi-bell', label: 'Notifications', view: 'notifications' },
    { icon: 'bi-gear', label: 'Settings', view: 'settings' }
  ];
</script>

<div class="modal-overlay" class:active={isOpen}>
  
    
 
  <div class="dashboard-modal">
    <div class="modal-content">
      <div class="modal-sidebar">
        <div class="user-profile">
          <div class="avatar">
            <img src="../src/assets/download.png" alt="User avatar" />
          </div>
          <h3>{user.name}</h3>
          <span class="user-id">ID: {user.id}</span>
        </div>

        <nav class="menu">
          {#each menuItems as item}
            <button 
              class="menu-item {currentView === item.view ? 'active' : ''}"
              on:click={() => currentView = item.view}>
              <i class="bi {item.icon}"></i>
              <span>{item.label}</span>
            </button>
          {/each}
        </nav>
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
  padding: 2vh 0;

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
     width: min(1400px, 95vw);
  height: min(760px, 90vh);
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

.menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  cursor: pointer;
  width: 100%;
  text-align: left;
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

  .avatar img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
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
  background: white;
  border-radius: 6px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  display: flex;
  gap: 2rem;
}

.profile-avatar {
  position: relative;
}

.profile-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
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
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  padding: 1.5rem;
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


</style>
