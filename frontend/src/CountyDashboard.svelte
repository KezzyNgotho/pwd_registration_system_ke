<script>

 export let isOpen = false;
  let currentSection = 'overview';
  let userRole = 'admin'; // Can be 'admin', 'manager', 'officer'
  
  const countyStats = {
    totalOfficers: 156,
    activeProjects: 23,
    pendingApprovals: 8,
    monthlyBudget: '$2.4M'
  };

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

      {#if userRole === 'admin'}
        <button class:active={currentSection === 'settings'}
                on:click={() => currentSection = 'settings'}>
          <i class="bi bi-gear"></i>
          Settings
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
    padding: 2vh;
  }

  .modal-overlay.active {
    display: grid;
  }

  .dashboard-modal {
    background: white;
    width: min(1400px, 95vw);
    height: min(800px, 95vh);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    animation: modalSlide 0.3s ease-out;
  }

  .modal-content {
    height: 100%;
    overflow: hidden;
  }

  .dashboard-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    height: 100%;
  }

  .close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    cursor: pointer;
    z-index: 1;
    transition: all 0.2s;
  }

  .close-modal:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
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

  .dashboard-nav {
    background: white;
    padding: 2rem;
    border-right: 1px solid #e9ecef;
  }

  .dashboard-main {
    padding: 2rem;
  }

  .dashboard-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .officers-table table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 10px;
    overflow: hidden;
  }

  .officers-table th,
  .officers-table td {
    padding: 1rem;
    border-bottom: 1px solid #e9ecef;
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
  }

  .status-badge.active {
    background: #d1fae5;
    color: #065f46;
  }

  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .action-buttons button {
    padding: 0.5rem;
    border: none;
    border-radius: 6px;
    background: #f3f4f6;
    cursor: pointer;
    transition: all 0.2s;
  }

  .action-buttons button:hover {
    background: #e5e7eb;
  }
</style>
