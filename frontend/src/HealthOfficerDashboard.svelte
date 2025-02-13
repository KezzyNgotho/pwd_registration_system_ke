<script>
  import { healthDashboardState } from '../src/dashboardStore.js';
  import { writable } from 'svelte/store';

  // Date initialization
  let reportStartDate = writable(new Date().toISOString().split('T')[0]);
  let reportEndDate = writable(new Date().toISOString().split('T')[0]);

  function handleNotifications() {
    console.log("Handling notifications...");
    // Add your notification logic here
  }

  // Dashboard state initialization
  let state = $healthDashboardState;
  let currentSection = 'overview';

  export const role = 'health_officer';
  export let isOpen = false;

  // Health Officer Stats
  const healthStats = {
    totalPatients: 156,
    pendingAssessments: 23,
    completedToday: 8,
    averageRating: 4.7
  };

  // User profile data
  const currentUser = {
    name: 'Dr. Jane Smith',
    email: 'jane.smith@health.gov',
    role: 'Health Officer',
    department: 'PWD Assessment',
    phone: '+254 712 345 678',
    joinDate: '2023-06-15',
    avatar: '../src/assets/icons8-user-50.png',
    bio: 'Specialized in PWD assessments with 5+ years experience'
  };

  // Navigation sections
  const sections = [
    { id: 'overview', icon: 'bi-grid', label: 'Overview' },
    { id: 'assessments', icon: 'bi-clipboard-check', label: 'PWD Assessments' },
    { id: 'reports', icon: 'bi-file-text', label: 'Assessment Reports' },
    { id: 'profile', icon: 'bi-person', label: 'Profile' }
  ];

  // Assessment data
  const pendingAssessments = writable([{
    id: 1,
    name: "Jane Doe",
    age: 28,
    disability: "Visual Impairment",
    status: "Pending",
    date: "2024-01-15"
  }]);

  const completedAssessments = writable([{
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
  }]);

  // Form state
  let currentAssessment = writable({
    pwdId: "",
    generalHealth: "",
    mobilityLevel: "",
    assistiveDevices: [],
    recommendations: "",
    followUpDate: "",
    severity: "mild"
  });

  // Handler functions
  function handleLogout() {
    localStorage.removeItem('userSession');
    window.location.href = '/login';
  }

  function handleAssessmentSubmit() {
    $completedAssessments = [...$completedAssessments, {
      id: Date.now(),
      ...$currentAssessment,
      status: "Completed",
      date: new Date().toISOString().split('T')[0]
    }];
    $currentAssessment = {};
  }

  let assessmentType = writable('physical');

  function updateAssessmentType(type) {
    $assessmentType = type;
  }
</script>

<div class="modal-overlay" class:active={state.isOpen}>
  <div class="dashboard-modal">
    <div class="modal-content">
      <button class="close-modal" aria-label="Close dashboard modal" on:click={() => isOpen = false}>
        <i class="bi bi-x-lg"></i>
      </button>

      <div class="dashboard-layout">
        <nav class="dashboard-nav">
          <div class="county-brand">
            <img src="../src/assets/icons8-kenya-48.png" alt="Health Logo" />
            <h2>Health Officer Portal</h2>
          </div>

          <div class="nav-sections">
            <button class:active={currentSection === 'overview'} on:click={() => currentSection = 'overview'}>
              <i class="bi bi-grid"></i>
              Overview
            </button>
            <button class:active={currentSection === 'assessments'} on:click={() => currentSection = 'assessments'}>
              <i class="bi bi-clipboard-check"></i>
              Assessments
            </button>
            <button class:active={currentSection === 'reports'} on:click={() => currentSection = 'reports'}>
              <i class="bi bi-file-text"></i>
              Reports
            </button>
            <button class:active={currentSection === 'profile'} on:click={() => currentSection = 'profile'}>
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
              <button class="notifications" aria-label="View notifications" on:click={handleNotifications}>
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

          {#if currentSection === 'assessments'}
            <div class="assessments-container">
              <h2>PWD Assessment Forms</h2>
              <div class="pwd-lookup">
                <input type="text" placeholder="Enter PWD ID or National ID" bind:value={currentAssessment.pwdId} />
                <button class="search-btn">Retrieve PWD Details</button>
              </div>

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

              {#if assessmentType === 'physical'}
                <form class="assessment-form" on:submit|preventDefault={handleAssessmentSubmit}>
                  <div class="form-group">
                    <label for="mobility-level">Mobility Level</label>
                    <select id="mobility-level" bind:value={currentAssessment.mobilityLevel}>
                      <option value="independent">Fully Independent</option>
                      <option value="assisted">Requires Assistance</option>
                      <option value="wheelchair">Wheelchair Dependent</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <fieldset>
                      <legend>Required Assistive Devices</legend>
                      <div class="checkbox-group">
                        <div class="checkbox-item">
                          <input type="checkbox" id="wheelchair-device" bind:group={currentAssessment.assistiveDevices} value="wheelchair">
                          <label for="wheelchair-device">Wheelchair</label>
                        </div>
                        <div class="checkbox-item">
                          <input type="checkbox" id="crutches-device" bind:group={currentAssessment.assistiveDevices} value="crutches">
                          <label for="crutches-device">Crutches</label>
                        </div>
                        <div class="checkbox-item">
                          <input type="checkbox" id="walker-device" bind:group={currentAssessment.assistiveDevices} value="walker">
                          <label for="walker-device">Walker</label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </form>
              {/if}
            </div>
          {/if}
        </main>
      </div>
    </div>
  </div>
</div>



<style>
  /* General Styles */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: none;
    place-items: center;
    z-index: 9999;
    padding: 2vh;
  }

  .modal-overlay.active {
    display: grid;
  }

  .dashboard-modal {
    background: #f8fafc;
    width: min(1400px, 95vw);
    height: min(800px, 95vh);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Navigation Styles */
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
    background: #27667b;
    color: white;
  }

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

  /* Header Styles */
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

  /* Stats Card Styles */
  .dashboard-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
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

  /* Form Styles */
  .assessments-container {
    padding: 1.5rem;
  }

  .assessment-form {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  .form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
  }

  .checkbox-group {
    display: flex;
    gap: 1rem;
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .checkbox-item input[type="checkbox"] {
    width: auto;
  }

  fieldset {
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  legend {
    padding: 0 0.5rem;
    font-weight: 500;
    color: #64748b;
  }
</style>