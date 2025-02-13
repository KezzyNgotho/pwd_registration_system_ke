<script>
import {  countyDashboardState } from '/home/keziah/pwd_reg_system/frontend/src/dashboardStore.js';
import { writable } from 'svelte/store';



function handleLogout() {
  // Clear user session
  localStorage.removeItem('userSession');
  // Redirect to login page
  window.location.href = '/login';
}


 // Initialize state
  let state = $countyDashboardState;
  let currentSection = 'overview';
  
  
 export let isOpen = true;
 
  let userRole = 'admin'; // Can be 'admin', 'manager', 'officer'

  // Add to your script section


  
  const countyStats = {
    totalOfficers: 156,
    activeProjects: 23,
    pendingApprovals: 8,
    monthlyBudget: '$2.4M'
  };

let currentUser = {
  name: 'John Doe',
  email: 'john.doe@county.gov',
  role: 'Admin',
  department: 'Public Health',
  phone: '+254 712 345 678',
  joinDate: '2022-01-15',
  avatar: '../src/assets/icons8-user-50.png',
  bio: 'Senior Health Administrator with 10+ years experience'
};

let isEditing = false;

  const healthOfficers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      department: 'Public Health',
      status: 'active',
      cases: 145,
      rating: 4.8
    },
    // Add more officers
  ];

  const departments = [
    'Public Health',
    'Emergency Services',
    'Mental Health',
    'Environmental Health',
    'Community Health'
  ];

  function handleOfficerAction(officerId, action) {
    // Handle actions like approve, suspend, etc.
  }
</script>

<div class="modal-overlay" class:active={isOpen}>
  <div class="dashboard-modal">
    <div class="modal-content">
      <!-- Close button -->
      <button class="close-modal" on:click={() => isOpen = false}>
        <i class="bi bi-x-lg"></i>
      </button>

      <div class="dashboard-layout">
 <nav class="dashboard-nav">
    <div class="county-brand">
      <img src="../src/assets/icons8-kenya-48.png" alt="County Logo" />
      <h2>County Health Services</h2>
    </div>

    <div class="nav-sections">
      <button class:active={currentSection === 'overview'} 
              on:click={() => currentSection = 'overview'}>
        <i class="bi bi-grid"></i>
        Overview
      </button>
      
      <button class:active={currentSection === 'officers'}
              on:click={() => currentSection = 'officers'}>
        <i class="bi bi-people"></i>
        Health Officers
      </button>

      <button class:active={currentSection === 'departments'}
              on:click={() => currentSection = 'departments'}>
        <i class="bi bi-building"></i>
        Departments
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
<!-- Add this to your nav-sections, preferably at the bottom -->




      {#if userRole === 'admin'}
        <button class:active={currentSection === 'settings'}
                on:click={() => currentSection = 'settings'}>
          <i class="bi bi-gear"></i>
          Settings
        </button>

        <div class="nav-divider"></div>
      <button class="logout-btn" on:click={handleLogout}>
        <i class="bi bi-box-arrow-right"></i>
        Logout
      </button>
      {/if}
    </div>
  </nav>

  

  <!-- Main Content Area -->
 <main class="dashboard-main">
    <header class="dashboard-header">
      <div class="header-search">
        <input type="search" placeholder="Search..." />
      </div>
      <div class="header-actions">
        <button class="notifications">
          <i class="bi bi-bell"></i>
          <span class="badge">3</span>
        </button>
        <div class="user-menu">
          <img src="../src/assets/icons8-kenya-48.png" alt="User" />
          <span>Admin Name</span>
        </div>
      </div>
    </header>

    <!-- Dynamic Content Based on Section -->
    {#if currentSection === 'overview'}
      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Total Health Officers</h3>
          <p class="stat-value">{countyStats.totalOfficers}</p>
          <span class="stat-change positive">+12% this month</span>
        </div>
        <!-- Add more stat cards -->
      </div>

      <div class="quick-actions">
        <button class="action-btn">
          <i class="bi bi-plus-circle"></i>
          Add New Officer
        </button>
        <button class="action-btn">
          <i class="bi bi-file-earmark-text"></i>
          Generate Report
        </button>
      </div>
    {/if}
    {#if currentSection === 'profile'}
  <div class="profile-container">
  <div class="profile-header">
    <div class="profile-cover-photo"></div>
    <div class="profile-quick-info">
      <div class="avatar-wrapper">
        <img src={currentUser.avatar} alt="Profile" />
        {#if isEditing}
          <button class="edit-avatar"><i class="bi bi-camera"></i></button>
        {/if}
      </div>
      <div class="user-brief">
        <h3>{currentUser.name}</h3>
        <span class="role-badge">{currentUser.role}</span>
      </div>
      <button class="edit-btn" on:click={() => isEditing = !isEditing}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  </div>

  <div class="profile-grid">
    <div class="info-card">
      <h4>Contact</h4>
      <div class="info-row">
        <i class="bi bi-envelope"></i>
        <span>{currentUser.email}</span>
      </div>
      <div class="info-row">
        <i class="bi bi-phone"></i>
        <span>{currentUser.phone}</span>
      </div>
    </div>

    <div class="info-card">
      <h4>Department</h4>
      <div class="info-row">
        <i class="bi bi-building"></i>
        <span>{currentUser.department}</span>
      </div>
    </div>

    <div class="info-card">
      <h4>Stats</h4>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-value">127</span>
          <span class="stat-label">Cases</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">4.8</span>
          <span class="stat-label">Rating</span>
        </div>
      </div>
    </div>
  </div>
</div>

{/if}


    {#if currentSection === 'officers'}
      <div class="officers-grid">
        <div class="filters">
          <select>
            <option>All Departments</option>
            {#each departments as dept}
              <option>{dept}</option>
            {/each}
          </select>
          <select>
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
        </div>

        <div class="officers-table">
          <table>
            <thead>
              <tr>
                <th>Officer</th>
                <th>Department</th>
                <th>Status</th>
                <th>Cases</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each healthOfficers as officer}
                <tr>
                  <td>
                    <div class="officer-info">
                      <img src={officer.avatar} alt={officer.name} />
                      <div>
                        <strong>{officer.name}</strong>
                        <span>{officer.role}</span>
                      </div>
                    </div>
                  </td>
                  <td>{officer.department}</td>
                  <td>
                    <span class="status-badge {officer.status}">
                      {officer.status}
                    </span>
                  </td>
                  <td>{officer.cases}</td>
                  <td>{officer.rating}</td>
                  <td>
                    <div class="action-buttons">
                      <button on:click={() => handleOfficerAction(officer.id, 'view')}>
                        <i class="bi bi-eye"></i>
                      </button>
                      <button on:click={() => handleOfficerAction(officer.id, 'edit')}>
                        <i class="bi bi-pencil"></i>
                      </button>
                      {#if userRole === 'admin'}
                        <button on:click={() => handleOfficerAction(officer.id, 'delete')}>
                          <i class="bi bi-trash"></i>
                        </button>
                      {/if}
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
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


</style>
