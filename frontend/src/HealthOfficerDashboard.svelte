<script>

import { healthDashboardState } from '/home/keziah/pwd_reg_system/frontend/src/dashboardStore.js';
import { writable } from 'svelte/store';

let reportStartDate = new Date().toISOString().split('T')[0];
let reportEndDate = new Date().toISOString().split('T')[0];
let assessmentType = 'physical'; // Default assessment type




 // Initialize state
  let state = $healthDashboardState;
  let currentSection = 'overview';
  let userRole = 'health_officer';

  // Health Officer Stats
  const healthStats = {
    totalPatients: 156,
    pendingAssessments: 23,
    completedToday: 8,
    averageRating: 4.7
  };



function handleLogout() {
  // Clear user session
  localStorage.removeItem('userSession');
  // Redirect to login page
  window.location.href = '/login';
}






 // Subscribe to dashboard state
  
  export let isOpen = false;
  
  // PWD Assessment Data
  let pendingAssessments = [
    {
      id: 1,
      name: "Jane Doe",
      age: 28,
      disability: "Visual Impairment",
      status: "Pending",
      date: "2024-01-15"
    }
  ];

  let completedAssessments = [
    {
      id: 2,
      name: "John Smith",
      age: 35,
      disability: "Physical Disability",
      status: "Completed",
      date: "2024-01-10",
      assessment: {
        severity: "Moderate",
        recommendations: "Regular physiotherapy",
        nextReview: "2024-07-10"
      }
    }
  ];

  // Assessment Form
  let currentAssessment = {
    pwdId: "",
    generalHealth: "",
    mobilityLevel: "",
    assistiveDevices: [],
    recommendations: "",
    followUpDate: "",
    severity: "mild"
  };

  function handleAssessmentSubmit() {
    // Add assessment submission logic
    completedAssessments = [...completedAssessments, {
      id: Date.now(),
      ...currentAssessment,
      status: "Completed",
      date: new Date().toISOString().split('T')[0]
    }];
    currentAssessment = {}; // Reset form
  }

  // Add this section to your existing sections
  let sections = [
    { id: 'overview', icon: 'bi-grid', label: 'Overview' },
    { id: 'assessments', icon: 'bi-clipboard-check', label: 'PWD Assessments' },
    
    { id: 'reports', icon: 'bi-file-text', label: 'Assessment Reports' },
    { id: 'profile', icon: 'bi-person', label: 'Profile' }
  ];

  // Stats for overview
  const dashboardStats = {
    totalAssessments: 156,
    pendingReviews: 23,
    completedToday: 8,
    averageRating: 4.7
  };
  let currentUser = {
    name: 'Dr. Jane Smith',
    email: 'jane.smith@health.gov',
    role: 'Health Officer',
    department: 'PWD Assessment',
    phone: '+254 712 345 678',
    joinDate: '2023-06-15',
    avatar: '../src/assets/icons8-user-50.png',
    bio: 'Specialized in PWD assessments with 5+ years experience'
};


</script>
<div class="modal-overlay"  class:active={state.isOpen}>
  <div class="dashboard-modal">
    <div class="modal-content">
      <button class="close-modal" on:click={() => isOpen = false}>
        <i class="bi bi-x-lg"></i>
      </button>

      <div class="dashboard-layout">
        <nav class="dashboard-nav">
          <div class="county-brand">
            <img src="../src/assets/icons8-kenya-48.png" alt="Health Logo" />
            <h2>Health Officer Portal</h2>
          </div>

          <div class="nav-sections">
            <button class:active={currentSection === 'overview'} 
                    on:click={() => currentSection = 'overview'}>
              <i class="bi bi-grid"></i>
              Overview
            </button>
            
            <button class:active={currentSection === 'assessments'}
                    on:click={() => currentSection = 'assessments'}>
              <i class="bi bi-clipboard-check"></i>
              Assessments
            </button>


            <button class:active={currentSection === 'reports'}
                    on:click={() => currentSection = 'reports'}>
              <i class="bi bi-file-text"></i>
              Reports
            </button>

            <button class:active={currentSection === 'profile'} 
                    on:click={() => currentSection = 'profile'}>
              <i class="bi bi-person"></i>
              Profile
            </button>

            <div class="nav-divider"></div>
            
            <button class="logout-btn" on:click={handleLogout}>
              <i class="bi bi-box-arrow-right"></i>
              Logout
            </button>
          </div>
        </nav>

        <main class="dashboard-main">
          <header class="dashboard-header">
            <div class="header-search">
              <input type="search" placeholder="Search assessments..." />
            </div>
            <div class="header-actions">
              <button class="notifications">
                <i class="bi bi-bell"></i>
                <span class="badge">3</span>
              </button>
              <div class="user-menu">
                <img src={currentUser.avatar} alt="User" />
                <span>{currentUser.name}</span>
              </div>
            </div>
          </header>

          {#if currentSection === 'overview'}
            <div class="dashboard-stats">
              <div class="stat-card">
                <h3>Total Patients</h3>
                <p class="stat-value">{healthStats.totalPatients}</p>
                <span class="stat-change positive">+8% this month</span>
              </div>
              <div class="stat-card">
                <h3>Pending Assessments</h3>
                <p class="stat-value">{healthStats.pendingAssessments}</p>
                <span class="stat-change">Due today</span>
              </div>
              <div class="stat-card">
                <h3>Completed Today</h3>
                <p class="stat-value">{healthStats.completedToday}</p>
                <span class="stat-change positive">On track</span>
              </div>
              <div class="stat-card">
                <h3>Average Rating</h3>
                <p class="stat-value">{healthStats.averageRating}</p>
                <span class="stat-change positive">⭐️ Excellent</span>
              </div>
            </div>
          {/if}

          <!-- Add these sections inside your main dashboard-main content area -->

{#if currentSection === 'assessments'}
  <div class="assessments-container">
    <h2>PWD Assessment Forms</h2>
    
    <!-- PWD Search/Lookup -->
    <div class="pwd-lookup">
      <input type="text" placeholder="Enter PWD ID or National ID" bind:value={currentAssessment.pwdId} />
      <button class="search-btn">Retrieve PWD Details</button>
    </div>

    <!-- Assessment Type Selection -->
    <div class="assessment-type-selector">
      <button class:active={assessmentType === 'physical'} on:click={() => assessmentType = 'physical'}>
        Physical Disability
      </button>
      <button class:active={assessmentType === 'visual'} on:click={() => assessmentType = 'visual'}>
        Visual Impairment
      </button>
      <button class:active={assessmentType === 'hearing'} on:click={() => assessmentType = 'hearing'}>
        Hearing Impairment
      </button>
      <button class:active={assessmentType === 'cognitive'} on:click={() => assessmentType = 'cognitive'}>
        Cognitive Disability
      </button>
    </div>

    <!-- Dynamic Assessment Form based on type -->
    {#if assessmentType === 'physical'}
      <form class="assessment-form" on:submit|preventDefault={handleAssessmentSubmit}>
        <div class="form-group">
          <label>Mobility Level Assessment</label>
          <select bind:value={currentAssessment.mobilityLevel}>
            <option value="independent">Fully Independent</option>
            <option value="assisted">Requires Assistance</option>
            <option value="wheelchair">Wheelchair Dependent</option>
          </select>
        </div>

        <div class="form-group">
          <label>Required Assistive Devices</label>
          <div class="checkbox-group">
            <label><input type="checkbox" value="wheelchair"> Wheelchair</label>
            <label><input type="checkbox" value="crutches"> Crutches</label>
            <label><input type="checkbox" value="walker"> Walker</label>
          </div>
        </div>
          </form>
    {/if}

        
        <!-- Additional physical assessment fields -->
        {#if assessmentType === 'hearing'}
  <form class="assessment-form">
    <div class="form-grid">
      <div class="form-group">
        <label>Hearing Loss Level</label>
        <select bind:value={currentAssessment.hearingLevel}>
          <option value="mild">Mild (26-40 dB)</option>
          <option value="moderate">Moderate (41-70 dB)</option>
          <option value="severe">Severe (71-90 dB)</option>
          <option value="profound">Profound (91+ dB)</option>
        </select>
      </div>

      <div class="form-group">
        <label>Communication Method</label>
        <select bind:value={currentAssessment.communicationMethod}>
          <option value="sign">Sign Language</option>
          <option value="oral">Oral Communication</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div class="form-group">
        <label>Assistive Devices Needed</label>
        <div class="checkbox-group">
          <label><input type="checkbox" bind:group={currentAssessment.assistiveDevices} value="hearingAid"> Hearing Aid</label>
          <label><input type="checkbox" bind:group={currentAssessment.assistiveDevices} value="cochlearImplant"> Cochlear Implant</label>
          <label><input type="checkbox" bind:group={currentAssessment.assistiveDevices} value="alertingDevices"> Alerting Devices</label>
        </div>
      </div>
    </div>
  </form>
{/if}

{#if assessmentType === 'cognitive'}
  <form class="assessment-form">
    <div class="form-grid">
      <div class="form-group">
        <label>Cognitive Function Assessment</label>
        <select bind:value={currentAssessment.cognitiveLevel}>
          <option value="mild">Mild Impairment</option>
          <option value="moderate">Moderate Impairment</option>
          <option value="severe">Severe Impairment</option>
        </select>
      </div>

      <div class="form-group">
        <label>Support Requirements</label>
        <div class="checkbox-group">
          <label><input type="checkbox" bind:group={currentAssessment.supportNeeds} value="daily"> Daily Activities</label>
          <label><input type="checkbox" bind:group={currentAssessment.supportNeeds} value="learning"> Learning Support</label>
          <label><input type="checkbox" bind:group={currentAssessment.supportNeeds} value="behavioral"> Behavioral Support</label>
        </div>
      </div>

      <div class="form-group">
        <label>Recommended Interventions</label>
        <textarea bind:value={currentAssessment.recommendations} rows="4"></textarea>
      </div>
    </div>
  </form>
{/if}

{#if assessmentType === 'multiple'}
  <form class="assessment-form">
    <div class="form-grid">
      <div class="form-group">
        <label>Primary Disability</label>
        <select bind:value={currentAssessment.primaryDisability}>
          <option value="physical">Physical</option>
          <option value="visual">Visual</option>
          <option value="hearing">Hearing</option>
          <option value="cognitive">Cognitive</option>
        </select>
      </div>

      <div class="form-group">
        <label>Secondary Disabilities</label>
        <div class="checkbox-group">
          <label><input type="checkbox" bind:group={currentAssessment.secondaryDisabilities} value="physical"> Physical</label>
          <label><input type="checkbox" bind:group={currentAssessment.secondaryDisabilities} value="visual"> Visual</label>
          <label><input type="checkbox" bind:group={currentAssessment.secondaryDisabilities} value="hearing"> Hearing</label>
          <label><input type="checkbox" bind:group={currentAssessment.secondaryDisabilities} value="cognitive"> Cognitive</label>
        </div>
      </div>
    </div>
  </form>
{/if}
    
    {#if assessmentType === 'visual'}
      <!-- Visual impairment specific form -->
      <form class="assessment-form">
        <div class="form-group">
          <label>Vision Assessment</label>
          <select bind:value={currentAssessment.visionLevel}>
            <option value="partial">Partial Vision</option>
            <option value="lowVision">Low Vision</option>
            <option value="blind">Legally Blind</option>
          </select>
        </div>
        <!-- Additional visual assessment fields -->
      </form>
    {/if}

    <!-- Similar forms for other disability types -->
  </div>
{/if}

{#if currentSection === 'reports'}
  <div class="reports-container">
    <h2>Assessment Reports</h2>
    
    <!-- Report Generation Tools -->
    <div class="report-tools">
      <div class="date-range-picker">
        <input type="date" bind:value={reportStartDate} />
        <input type="date" bind:value={reportEndDate} />
      </div>
      <button class="generate-report">Generate Report</button>
    </div>

    <!-- Reports Table -->
    <table class="reports-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>PWD ID</th>
          <th>Type</th>
          <th>Severity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each completedAssessments as assessment}
          <tr>
            <td>{assessment.date}</td>
            <td>{assessment.pwdId}</td>
            <td>{assessment.type}</td>
            <td>
              <span class="severity-badge {assessment.severity}">
                {assessment.severity}
              </span>
            </td>
            <td>
              <button class="action-btn">View</button>
              <button class="action-btn">Print</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

{#if currentSection === 'profile'}
<div class="profile-container">
  <div class="profile-section">
    <div class="profile-section-header">Personal Information</div>
    
    <div class="profile-row">
      <div class="profile-label">Full Name</div>
      <div class="profile-value">{currentUser.name}</div>
    </div>
    
    <div class="profile-row">
      <div class="profile-label">Email</div>
      <div class="profile-value">{currentUser.email}</div>
    </div>
    
    <div class="profile-row">
      <div class="profile-label">Phone</div>
      <div class="profile-value">{currentUser.phone}</div>
    </div>
    
    <div class="profile-row">
      <div class="profile-label">Department</div>
      <div class="profile-value">{currentUser.department}</div>
    </div>
  </div>

  <div class="profile-section">
    <div class="profile-section-header">Performance Stats</div>
    <div class="stats-row">
      <div class="stat-box">
        <div class="stat-value">156</div>
        <div class="stat-label">Assessments</div>
      </div>
      <div class="stat-box">
        <div class="stat-value">23</div>
        <div class="stat-label">Pending</div>
      </div>
      <div class="stat-box">
        <div class="stat-value">4.8</div>
        <div class="stat-label">Rating</div>
      </div>
    </div>
  </div>
</div>

{/if}

        </main>
      </div>
    </div>
  </div>
</div>
<style>


.nav-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 1rem 0;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: #fee2e2;
  color: #dc2626;
  transition: all 0.2s;
  cursor: pointer;
}

.logout-btn:hover {
  background: #fecaca;
  transform: translateY(-1px);
}

.logout-btn i {
  font-size: 1.1rem;
}

 .modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: none; /* Initial state */
  place-items: center;
  z-index: 9999;
  padding: 2vh;
}
.dashboard-modal {
  background: #f8fafc;
  width: min(1400px, 95vw);
  height: min(800px, 95vh);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
.modal-overlay.active {
  display: grid; /* Shows when active */
}

/* Add these new styles */
.modal-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.dashboard-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  height: 100%;
}


.dashboard-main {
  padding: 2rem;
  overflow-y: auto;
  background: #f8fafc;
  height: 100%;
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  background: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Additional enhancement for stat cards */
.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}



/* Navigation Styling */
.dashboard-nav {
  background: #fff;
  padding: 2rem;
  border-right: 1px solid #e2e8f0;
}

.county-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.county-brand img {
  width: 48px;
  height: 48px;
}

.county-brand h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.nav-sections {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-sections button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #64748b;
  transition: all 0.2s;
  width: 100%;
  text-align: left;
}

.nav-sections button:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.nav-sections button.active {
  background: #27667B;
  color: white;
}

/* Main Content Styling */
.dashboard-main {
  padding: 2rem;
  overflow-y: auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-search input {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 300px;
  font-size: 0.875rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notifications {
  position: relative;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  background: #f1f5f9;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.75rem;
  display: grid;
  place-items: center;
}

/* Stats Cards */
.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.stat-change {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-change.positive {
  color: #10b981;
}

/* Officers Table */
.officers-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.officers-table table {
  width: 100%;
  border-collapse: collapse;
}

.officers-table th {
  background: #f8fafc;
  color: #64748b;
  font-weight: 500;
  text-align: left;
  padding: 1rem;
}

.officers-table td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.officer-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.officer-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

/* Action Buttons */
.action-buttons button {
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  color: #64748b;
  transition: all 0.2s;
}

.action-buttons button:hover {
  background: #f1f5f9;
  color: #0f172a;
}
.profile-container {
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.profile-header {
  position: relative;
}

.profile-cover-photo {
  height: 120px;
  background: linear-gradient(120deg, #27667B, #38A3A5);
}

.profile-quick-info {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background: white;
  margin-top: -30px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.avatar-wrapper {
  position: relative;
  margin-right: 1rem;
}

.avatar-wrapper img {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.user-brief {
  flex: 1;
}

.user-brief h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.role-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e2e8f0;
  border-radius: 20px;
  font-size: 0.75rem;
  color: #475569;
  margin-top: 0.25rem;
}

.edit-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: #27667B;
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
}

.info-card {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
}

.info-card h4 {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  font-size: 0.875rem;
}

.info-row i {
  color: #27667B;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  color: #27667B;
}

.stat-label {
  font-size: 0.75rem;
  color: #64748b;
}


  /* Add these styles to your existing styles */
  .assessments-container {
    padding: 1.5rem;
  }

  .assessment-form {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
  }

  .submit-btn {
    background: #27667B;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .severity-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
  }

  .severity-badge.mild { background: #86efac; }
  .severity-badge.moderate { background: #fde047; }
  .severity-badge.severe { background: #fca5a5; }

  .action-btn {
    padding: 0.25rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    margin-right: 0.5rem;
    background: white;
    cursor: pointer;
  }


  /* Assessment Section Styles */
.assessment-type-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.assessment-type-selector button {
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  transition: all 0.2s;
}

.assessment-type-selector button.active {
  background: #27667B;
  color: white;
  border-color: #27667B;
}

.pwd-lookup {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.pwd-lookup input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.search-btn {
  padding: 0.75rem 1.5rem;
  background: #27667B;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

/* Form Styles */
.assessment-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
}

/* Reports Section */
.reports-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
}

.report-tools {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.date-range-picker {
  display: flex;
  gap: 1rem;
}

.reports-table {
  width: 100%;
  border-collapse: collapse;
}

.reports-table th,
.reports-table td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

/* Severity Badges */
.severity-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
}

.severity-badge.mild { 
  background: #dcfce7;
  color: #166534;
}

.severity-badge.moderate { 
  background: #fef9c3;
  color: #854d0e;
}

.severity-badge.severe { 
  background: #fee2e2;
  color: #991b1b;
}

.form-actions {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
  width: auto;
}


.profile-container {
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.profile-row {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.profile-label {
  width: 180px;
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.profile-value {
  flex: 1;
  color: #1e293b;
  font-size: 0.875rem;
}

.profile-section {
  margin-bottom: 1.5rem;
}

.profile-section-header {
  padding: 1rem 1.5rem;
  background: #f8fafc;
  font-size: 0.875rem;
  font-weight: 600;
  color: #27667B;
  border-bottom: 1px solid #f1f5f9;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem 1.5rem;
}

.stat-box {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

</style>
