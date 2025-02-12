<script>
  let officerData = {
    name: 'Dr. James Wilson',
    licenseNumber: 'MED-2024-1234',
    specialty: 'Physical Rehabilitation',
    pendingAssessments: 8,
    totalPatients: 156
  };

  const menuItems = [
    { icon: 'bi-activity', label: 'Dashboard', view: 'dashboard' },
    { icon: 'bi-person-lines-fill', label: 'Patient Records', view: 'patients' },
    { icon: 'bi-clipboard-pulse', label: 'Assessments', view: 'assessments' },
    { icon: 'bi-calendar-check', label: 'Appointments', view: 'appointments' },
    { icon: 'bi-shield-check', label: 'Access Rights', view: 'rights' },
    { icon: 'bi-file-earmark-text', label: 'Reports', view: 'reports' }
  ];

  let currentView = 'dashboard';
  
  // Sample patient data
  let recentPatients = [
    { id: 'PWD-001', name: 'John Doe', status: 'Pending Assessment', date: '2024-02-15' },
    { id: 'PWD-002', name: 'Jane Smith', status: 'Follow-up', date: '2024-02-16' }
  ];
</script>

<div class="dashboard-container">
  <aside class="sidebar">
    <div class="officer-profile">
      <div class="profile-image">
        <img src="/doctor-avatar.png" alt="Officer profile" />
        <span class="status-indicator"></span>
      </div>
      <h3>{officerData.name}</h3>
      <span class="license-number">{officerData.licenseNumber}</span>
      <span class="specialty">{officerData.specialty}</span>
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
  </aside>

  <main class="main-content">
    <header class="content-header">
      <div class="header-search">
        <i class="bi bi-search"></i>
        <input type="search" placeholder="Search patients by ID or name..." />
      </div>
      <div class="header-actions">
        <button class="btn-new-assessment">
          <i class="bi bi-plus-circle"></i>
          New Assessment
        </button>
      </div>
    </header>

    {#if currentView === 'dashboard'}
      <div class="quick-stats">
        <div class="stat-card pending">
          <div class="stat-content">
            <h4>Pending Assessments</h4>
            <span class="stat-number">{officerData.pendingAssessments}</span>
          </div>
          <div class="stat-icon">
            <i class="bi bi-clipboard-pulse"></i>
          </div>
        </div>

        <div class="stat-card total">
          <div class="stat-content">
            <h4>Total Patients</h4>
            <span class="stat-number">{officerData.totalPatients}</span>
          </div>
          <div class="stat-icon">
            <i class="bi bi-people"></i>
          </div>
        </div>
      </div>

      <div class="recent-assessments">
        <div class="section-header">
          <h3>Recent Patients</h3>
          <button class="btn-view-all">View All</button>
        </div>
        
        <div class="assessment-table">
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each recentPatients as patient}
                <tr>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>
                    <span class="status-badge {patient.status.toLowerCase().replace(' ', '-')}">
                      {patient.status}
                    </span>
                  </td>
                  <td>{patient.date}</td>
                  <td>
                    <div class="action-buttons">
                      <button class="btn-icon" title="View Details">
                        <i class="bi bi-eye"></i>
                      </button>
                      <button class="btn-icon" title="Edit">
                        <i class="bi bi-pencil"></i>
                      </button>
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

<style>
  .dashboard-container {
    display: grid;
    grid-template-columns: 280px 1fr;
    min-height: 100vh;
    background: #f8f9fa;
  }

  .sidebar {
    background: #2c3e50;
    color: white;
    padding: 2rem;
  }

  .officer-profile {
    text-align: center;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .profile-image {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 1rem;
  }

  .profile-image img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .status-indicator {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 12px;
    height: 12px;
    background: #2ecc71;
    border-radius: 50%;
    border: 2px solid white;
  }

  .quick-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    border-radius: 15px;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }

  .stat-card.pending {
    border-left: 4px solid #f39c12;
  }

  .stat-card.total {
    border-left: 4px solid #3498db;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: #2c3e50;
  }

  .assessment-table {
    background: white;
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e9ecef;
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
  }

  .status-badge.pending-assessment {
    background: #fff3cd;
    color: #856404;
  }

  .status-badge.follow-up {
    background: #d1e7dd;
    color: #0f5132;
  }

  .btn-new-assessment {
    background: #2ecc71;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
  }

  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .btn-icon {
    background: none;
    border: none;
    color: #6c757d;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .btn-icon:hover {
    background: #f8f9fa;
    color: #2c3e50;
  }
</style>
