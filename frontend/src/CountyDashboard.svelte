<script>
  import { countyDashboardState } from '../src/dashboardStore.js';
  import { writable } from 'svelte/store';

  // Initialize state
  let state = $countyDashboardState;
  let currentSection = 'overview';
  export let isOpen = true;

  let userRole = 'admin'; // Can be 'admin', 'manager', 'officer'

  // Logout function
  function handleLogout() {
    localStorage.removeItem('userSession');
    window.location.href = '/login';
  }

  // User data
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

  // County stats
  const countyStats = {
    totalOfficers: 156,
    activeProjects: 23,
    pendingApprovals: 8,
    monthlyBudget: '$2.4M'
  };

  // Health officers data
  const healthOfficers = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Chief Medical Officer',
    department: 'Public Health',
    status: 'active',
    cases: 145,
    rating: 4.8,
    avatar: '/avatars/sarah.jpg',
    specialization: 'Epidemiology',
    certifications: ['MPH', 'PhD'],
    availability: 'On Duty'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    role: 'Senior Health Officer',
    department: 'Emergency Services',
    status: 'active',
    cases: 98,
    rating: 4.6,
    avatar: '/avatars/michael.jpg',
    specialization: 'Emergency Medicine',
    certifications: ['MD'],
    availability: 'On Call'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    role: 'Community Health Lead',
    department: 'Community Health',
    status: 'active',
    cases: 112,
    rating: 4.9,
    avatar: '/avatars/emily.jpg',
    specialization: 'Public Health',
    certifications: ['MPH', 'DrPH'],
    availability: 'Available'
  }
];


  // Departments data
  const departments = [
    'Public Health',
    'Emergency Services',
    'Mental Health',
    'Environmental Health',
    'Community Health'
  ];

  // Handle officer actions
  function handleOfficerAction(officerId, action) {
    console.log(`Action: ${action} on officer ID: ${officerId}`);
  }
</script>

<div class="modal-overlay" class:active={isOpen}>
  <div class="dashboard-modal">
    <div class="modal-content">
      <!-- Close button -->
      

      <div class="dashboard-layout">
        <!-- Navigation -->
        <nav class="dashboard-nav">
          <div class="county-brand">
            <img src="../src/assets/icons8-kenya-48.png" alt="County Logo" />
            <h2>County Health Services</h2>
          </div>

          <div class="nav-sections">
            <button class:active={currentSection === 'overview'} on:click={() => currentSection = 'overview'}>
              <i class="bi bi-grid"></i>
              Overview
            </button>

            <button class:active={currentSection === 'officers'} on:click={() => currentSection = 'officers'}>
              <i class="bi bi-people"></i>
              Health Officers
            </button>



            <button class:active={currentSection === 'profile'} on:click={() => currentSection = 'profile'}>
              <i class="bi bi-person"></i>
              Profile
            </button>

            {#if userRole === 'admin'}
              <button class:active={currentSection === 'settings'} on:click={() => currentSection = 'settings'}>
                <i class="bi bi-gear"></i>
                Settings
              </button>
            {/if}

            <div class="nav-divider"></div>
            <button class="logout-btn" on:click={handleLogout}>
              <i class="bi bi-box-arrow-right"></i>
              Logout
            </button>
          </div>
        </nav>

        <!-- Main Content -->
        <main class="dashboard-main">
          <header class="dashboard-header">
            <div class="header-search">
              <input type="search" placeholder="Search..." aria-label="Search" />
            </div>
            <div class="header-actions">
              <button class="notifications" aria-label="Notifications">
                <i class="bi bi-bell"></i>
                <span class="badge">3</span>
              </button>
              <div class="user-menu">
                <img src={currentUser.avatar} alt="User" />
                <span>{currentUser.name}</span>
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
              <div class="stat-card">
                <h3>Active Projects</h3>
                <p class="stat-value">{countyStats.activeProjects}</p>
                <span class="stat-change">Ongoing</span>
              </div>
              <div class="stat-card">
                <h3>Pending Approvals</h3>
                <p class="stat-value">{countyStats.pendingApprovals}</p>
                <span class="stat-change">Due today</span>
              </div>
              <div class="stat-card">
                <h3>Monthly Budget</h3>
                <p class="stat-value">{countyStats.monthlyBudget}</p>
                <span class="stat-change positive">On track</span>
              </div>
            </div>

            <div class="quick-actions">
              <button class="action-btn" aria-label="Add New Officer">
                <i class="bi bi-plus-circle"></i>
                Add New Officer
              </button>
              <button class="action-btn" aria-label="Generate Report">
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
                      <button class="edit-avatar" aria-label="Edit Avatar">
                        <i class="bi bi-camera"></i>
                      </button>
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
                <select aria-label="Filter by Department">
                  <option>All Departments</option>
                  {#each departments as dept}
                    <option>{dept}</option>
                  {/each}
                </select>
                <select aria-label="Filter by Status">
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
                            <button on:click={() => handleOfficerAction(officer.id, 'view')} aria-label="View Officer">
                              <i class="bi bi-eye"></i>
                            </button>
                            <button on:click={() => handleOfficerAction(officer.id, 'edit')} aria-label="Edit Officer">
                              <i class="bi bi-pencil"></i>
                            </button>
                            {#if userRole === 'admin'}
                              <button on:click={() => handleOfficerAction(officer.id, 'delete')} aria-label="Delete Officer">
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
          {#if currentSection === 'settings'}
  <div class="settings-container">
    <!-- System Settings -->
    <div class="settings-section">
      <h3>System Settings</h3>
      <div class="settings-grid">
        <div class="setting-card">
          <div class="setting-header">
            <i class="bi bi-bell"></i>
            <h4>Notifications</h4>
          </div>
          <div class="setting-controls">
            <label class="switch">
              <input type="checkbox" checked>
              <span class="slider"></span>
            </label>
            <span>Email Notifications</span>
          </div>
          <div class="setting-controls">
            <label class="switch">
              <input type="checkbox">
              <span class="slider"></span>
            </label>
            <span>SMS Alerts</span>
          </div>
        </div>

        <div class="setting-card">
          <div class="setting-header">
            <i class="bi bi-shield-lock"></i>
            <h4>Security</h4>
          </div>
          <div class="setting-controls">
            <label class="switch">
              <input type="checkbox" checked>
              <span class="slider"></span>
            </label>
            <span>Two-Factor Authentication</span>
          </div>
          <button class="setting-btn">Change Password</button>
        </div>
      </div>
    </div>

    <!-- User Management -->
    <div class="settings-section">
      <h3>User Management</h3>
      <div class="user-roles-table">
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Access Level</th>
              <th>Users</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Administrator</td>
              <td>Full Access</td>
              <td>3 Users</td>
              <td>
                <button class="edit-role">Edit</button>
              </td>
            </tr>
            <tr>
              <td>Manager</td>
              <td>Limited Access</td>
              <td>8 Users</td>
              <td>
                <button class="edit-role">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
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

  /* Quick Actions */
  .quick-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    background: #27667b;
    color: white;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .action-btn:hover {
    background: #1e4f63;
  }

  /* Profile Section */
  .profile-container {
    max-width: 900px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .profile-header {
    position: relative;
  }

  .profile-cover-photo {
    height: 120px;
    background: linear-gradient(120deg, #27667b, #38a3a5);
  }

  .profile-quick-info {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    background: white;
    margin-top: -30px;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
    background: #27667b;
    color: white;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .edit-btn:hover {
    background: #1e4f63;
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
    color: #27667b;
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
    color: #27667b;
  }

  .stat-label {
    font-size: 0.75rem;
    color: #64748b;
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

  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }

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

  .settings-container {
  padding: 1.5rem;
}

.settings-section {
  margin-bottom: 2rem;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.setting-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.setting-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.setting-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #27667B;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
.user-management {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.user-roles-table {
  width: 100%;
  overflow-x: auto;
}

.user-roles-table table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.user-roles-table th {
  background: #f8fafc;
  padding: 1rem;
  font-weight: 600;
  color: #1e293b;
  text-align: left;
  border-bottom: 2px solid #e2e8f0;
}

.user-roles-table td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #475569;
}

.role-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.role-badge.admin {
  background: #fee2e2;
  color: #dc2626;
}

.role-badge.manager {
  background: #e0f2fe;
  color: #0284c7;
}

.role-badge.officer {
  background: #f0fdf4;
  color: #16a34a;
}

.access-level {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.access-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.full-access {
  background: #22c55e;
}

.limited-access {
  background: #f59e0b;
}

.edit-role {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: #27667b;
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-role:hover {
  background: #1e4f63;
  transform: translateY(-1px);
}

.user-count {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: #f1f5f9;
  border-radius: 20px;
  font-size: 0.875rem;
}


</style>