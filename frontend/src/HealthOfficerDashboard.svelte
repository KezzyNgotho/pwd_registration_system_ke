<script>
  import { slide } from 'svelte/transition';
  import { healthDashboardState } from '../src/dashboardStore.js';
  import { writable } from 'svelte/store';
  import PhysicalAssessmentForm from './components/assessments/physicalAssessmentForm.svelte';
  import VisualAssessmentForm from './components/assessments/VisualAssessmentForm.svelte';
  import HearingAssessmentForm from './components/assessments/HearingImpairmentForm.svelte';
  import ChronicprogressionForm from './components/assessments/ChronicProgressiveForm.svelte';
  import speechlanguageswallowingForm from "./components/assessments/speechlanguageswallowingForm.svelte";
  import mentalintellectualautismForm from "./components/assessments/speechlanguageswallowingForm.svelte";
  import maxillofacialForm from "./components/assessments/maxillofacialForm.svelte";
    function handleNotifications() {
    console.log("Handling notifications...");
    // Add your notification logic here
  }

  // State Management
  let state = $healthDashboardState;
  let currentSection = 'overview';
  let showTypeSelector = false;
  let pwdId = '';
  let pwdRecord = null;
  let pwdIdVerified = false;
  let assessmentType = writable('physical');
  let reportStartDate = writable(new Date().toISOString().split('T')[0]);
  let reportEndDate = writable(new Date().toISOString().split('T')[0]);

 

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

  // Dashboard Data
  const healthStats = {
    totalPatients: 156,
    pendingAssessments: 23,
    completedToday: 8,
    averageRating: 4.7
  };

  const sections = [
    { id: 'overview', icon: 'bi-grid', label: 'Overview' },
    { id: 'assessments', icon: 'bi-clipboard-check', label: 'PWD Assessments' },
    { id: 'profile', icon: 'bi-person', label: 'Profile' }
  ];

  // Assessment Data
  const disabilityTypes = [
    { id: 'physical', label: 'Physical Disability', icon: 'bi-person-walking' },
    { id: 'visual', label: 'Visual Impairment', icon: 'bi-eye' },
    { id: 'hearing', label: 'Hearing Impairment', icon: 'bi-ear' },
    //{ id: 'mental', label: 'Mental Health Conditions', icon: 'bi-brain-half' },
    { id: 'chronicprogression', label: 'Chronic Progression Disability', icon: 'bi-activity' },
   
  { id: 'maxillofacial', label: 'Maxillofacial Disabilities', icon: 'bi-person-square' },
  { id: 'mentalintellectualautism', label: 'Mental,Intellectual,Autism Spectrum ,Disorders', icon: 'bi-brain' },
  { id: 'speechlanguageswallowing', label: 'Speech, Language, Communication, and Swallowing Disabilities', icon: 'bi-chat-dots' }

  ];

function getAssessmentForm(type) {
    const forms = {
      physical: PhysicalAssessmentForm,
      visual: VisualAssessmentForm,
      hearing: HearingAssessmentForm,
      chronicprogression:ChronicprogressionForm,
      maxillofacial:maxillofacialForm,
      mentalintellectualautism:mentalintellectualautismForm,
      speechlanguageswallowing:speechlanguageswallowingForm
    };
    return forms[type];
  }



function handleSave() {
  const success = saveAssessment(assessment);
  if (success) {
    // You can add notification logic here
    console.log('Assessment saved successfully');
  }
}



export function saveAssessment(assessment) {
  try {
    const savedData = {
      ...assessment,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(`assessment_${assessment.pwdId}`, JSON.stringify(savedData));
    return true;
  } catch (error) {
    console.error('Error saving assessment:', error);
    return false;
  }
}



  let assessment = {
    pwdId: '',
    medicalHistory: '',
    onsetDate: '',
    lastInterventionDate: '',
    interventions: '',
    disabilityCause: '',
    structuralImpairments: '',
    affectedRegions: [],
    diagnostics: {},
    findings: {},
    impairmentLevel: {},
    difficultyScores: {},
    functionalRemarks: {}
  };

  // Functions
  function searchPwdRecord() {
    pwdRecord = {
      fullName: 'John Doe',
      age: 35,
      gender: 'Male',
      contact: '+254 712 345 678'
    };
  }

  function updateAssessmentType(type) {
    $assessmentType = type;
  }

  function getDisabilityLabel(typeId) {
    const disability = disabilityTypes.find(type => type.id === typeId);
    return disability ? disability.label : '';
  }

  function handleLogout() {
    localStorage.removeItem('userSession');
    window.location.href = '/login';
  }

  
</script>


<div class="modal-overlay" class:active={state.isOpen}>
  <div class="dashboard-modal">
    <div class="modal-content">

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
              <div class="assessment-wrapper">
                <header class="compact-header">
                  <div class="title-bar">
                    <h2>Assessment</h2>
                    <div class="mini-steps">
                      <span class="dot {pwdIdVerified ? 'done' : 'current'}"></span>
                      <span class="dot {pwdIdVerified && !$assessmentType ? 'current' : ''}"></span>
                      <span class="dot {$assessmentType ? 'current' : ''}"></span>
                    </div>
                  </div>
                  
                  <div class="quick-search">
                    <input type="text" bind:value={pwdId} placeholder="PWD ID" />
                                <button 
                on:click={searchPwdRecord} 
                aria-label="Search PWD Record"
                class="search-btn"
              >
                <i class="bi bi-search" aria-hidden="true"></i>
                <span class="visually-hidden">Search</span>
              </button>

                  </div>
                </header>

                {#if pwdRecord}
                  <div class="mini-profile">
                    <div class="avatar">{pwdRecord.fullName[0]}</div>
                    <div class="brief-info">
                      <h4>{pwdRecord.fullName}</h4>
                      <div class="tags">
                        <span>{pwdRecord.age}y</span>
                        <span>{pwdRecord.gender}</span>
                      </div>
                    </div>
                    <button class="contact-chip">
                      <i class="bi bi-telephone"></i>
                      {pwdRecord.contact}
                    </button>
                  </div>
                {/if}

                <div class="action-strip">
                  <button 
                    class="select-type"
                    on:click={() => showTypeSelector = true}
                  >
                    {$assessmentType ? getDisabilityLabel($assessmentType) : 'Choose Disability Type'}
                  </button>
                  
                  <div class="quick-actions">
                    
                     <button aria-label="Save assessment" on:click={handleSave} class="save-btn">
                  <i class="bi bi-save"></i>
                </button>
                <button aria-label="Print assessment">
                <i class="bi bi-printer"></i>
                </button>
                  </div>
                </div>

               <!-- Update the floating selector section -->
              {#if showTypeSelector}
              <div class="compact-selector" transition:slide>
                <div class="type-list">
                  {#each disabilityTypes as type}
                    <button 
                      class="type-option {$assessmentType === type.id ? 'selected' : ''}"
                      on:click={() => {
                        updateAssessmentType(type.id);
                        showTypeSelector = false;
                      }}
                    >
                      <i class={type.icon}></i>
                      <span>{type.label}</span>
                    </button>
                  {/each}
                </div>
              </div>
            {/if}


                {#if $assessmentType && pwdRecord}
                  <div class="form-container">
                    <svelte:component 
                      this={getAssessmentForm($assessmentType)} 
                      {assessment} 
                      {pwdRecord}
                    />
                  </div>
                {/if}
              </div>
            {/if}

{#if currentSection === 'profile'}
  <div class="profile-container">
    <div class="profile-header">
      <div class="profile-avatar">
        <img src={currentUser.avatar} alt={currentUser.name} />
        <div class="profile-status active"></div>
      </div>
      <div class="profile-info">
        <h2>{currentUser.name}</h2>
        <p>{currentUser.role} · {currentUser.department}</p>
      </div>
    </div>

    <div class="profile-grid">
      <div class="profile-card">
        <h3>Personal Information</h3>
        <div class="profile-fields">
          <div class="field-item">
            <label for="name">Name</label>
            <input id="name" type="text" value={currentUser.name} readonly />
          </div>
          <div class="field-item">
            <label for="email">Email</label>
            <input id="email" type="email" value={currentUser.email} readonly />
          </div>
          <div class="field-item">
            <label for="phone">Phone</label>
            <input id="phone" type="tel" value={currentUser.phone} readonly />
          </div>
        </div>
      </div>

      <div class="profile-card">
        <h3>Professional Details</h3>
        <div class="profile-fields">
          <div class="field-item">
            <label for="role">Role</label>
            <input id="role" type="text" value={currentUser.role} readonly />
          </div>
          <div class="field-item">
            <label for="department">Department</label>
            <input id="department" type="text" value={currentUser.department} readonly />
          </div>
          <div class="field-item">
            <label for="joinDate">Join Date</label>
            <input id="joinDate" type="text" value={currentUser.joinDate} readonly />
          </div>
        </div>
      </div>

      <div class="profile-card">
        <h3>Biography</h3>
        <div class="profile-fields">
          <div class="field-item">
            <label for="bio">Bio</label>
            <textarea id="bio" readonly>{currentUser.bio}</textarea>
          </div>
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

.profile-container,
.reports-container {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}




.patient-info {
  display: grid;
  gap: 1.5rem;
}

.search-section {
  display: flex;
  gap: 1rem;
}

.patient-details {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}





.primary-btn {
  background: #27667b;
  color: white;
  border: none;
}

.secondary-btn {
  background: #f1f5f9;
  color: #64748b;
  border: 1px solid #e2e8f0;
}



.scale-item {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border-radius: 6px;
}

.profile-grid,
.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.profile-card,
.report-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
}

.field-item,
.report-field {
  margin-bottom: 1rem;
}

.field-item label {
  display: block;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.generate-btn {
  background: #27667b;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.generate-btn:hover {
  background: #1e4f63;
  transform: translateY(-1px);
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



    .assessment-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
}

.compact-header {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.mini-steps {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e0e0e0;
}

.dot.current { background: #2196F3; }
.dot.done { background: #4CAF50; }

.quick-search {
  display: flex;
  gap: 0.5rem;
}

.quick-search input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #eee;
  border-radius: 6px;
}

.mini-profile {
  background: #fff;
  margin: 1rem 0;
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.avatar {
  width: 40px;
  height: 40px;
  background: #f0f0f0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: bold;
}

.brief-info {
  flex: 1;
}

.tags {
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.tags span {
  background: #f5f5f5;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
}

.contact-chip {
  background: #f0f0f0;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
}

.action-strip {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.select-type {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  text-align: left;
}

.quick-actions {
  display: flex;
  gap: 0.5rem;
}


.form-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.floating-selector {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  margin: 1rem 0;
}


.type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.25rem;
}

.type-card {
  position: relative;
  padding: 1.5rem;
  border-radius: 12px;
  background: #f8fafc;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}



.type-card:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
}

.type-card.selected {
  background: #f0f9ff;
  border-color: #27667b;
}



.selected-indicator {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  color: #27667b;
  font-size: 1.25rem;
}




.compact-selector {
  background: white;
  padding: 0.75rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  max-width: 600px;
  margin: 0.5rem 0;
}

.type-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.type-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 6px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
}

.type-option:hover {
  background: #f1f5f9;
}

.type-option.selected {
  background: #27667b;
  color: white;
}

.type-option i {
  font-size: 1rem;
}
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 2rem;
}

.profile-avatar {
  position: relative;
}

.profile-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.profile-status {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #10b981;
  border: 2px solid white;
}

.profile-info h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.profile-info p {
  color: #64748b;
  font-size: 1.1rem;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.save-btn {
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  background: #27667b;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.save-btn:hover {
  background: #1e4f63;
  transform: translateY(-1px);
}


.profile-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.2s;
}

.profile-card:hover {
  transform: translateY(-2px);
}

.profile-card h3 {
  color: #27667b;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e2e8f0;
}

.profile-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-item label {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

.field-item input,
.field-item textarea {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #1e293b;
  font-size: 0.95rem;
}

.field-item textarea {
  min-height: 120px;
  resize: vertical;
}

.field-item input:read-only,
.field-item textarea:read-only {
  background: #f1f5f9;
  cursor: default;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .profile-grid {
    grid-template-columns: 1fr;
  }
}


</style>