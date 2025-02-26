 <script>
 import AccessibilityWidget from '../src/Accessibity.svelte'
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { onMount } from 'svelte';
  import 'bootstrap-icons/font/bootstrap-icons.css';
  import Reg from '../src/registration.svelte';
  import CountyOfficerReg from '../src/CountyRegistration.svelte';
  import HealthOfficerReg from "../src/HealthOfficerRegistration.svelte";
  import Login from "../src/login.svelte";
  import { Router, Link, Route } from 'svelte-routing';

  
  
  
  import PWDDashboard from "../src/PWDDashboard.svelte"
  import CountyDashboard from "../src/CountyDashboard.svelte";
  import HealthDashboard from "../src/HealthOfficerDashboard.svelte";
  import { routes } from '../src/route.js';
   let showLogin = false;
  
  let dashboardOpen = true; // Control the dashboard visibility
  let dashboardoneOpen = true;
  let dashboardtwoOpen = true;
  // Create base URL for router


 // Add these functions to handle navigation
  function handleClose() {
    window.location.href = '/';
  }

  function handleBack() {
    showRoleSelection = true;
    showDisabilitySelection = false;
  }

  let showRoleSelection = false;
  let showDisabilitySelection = false;
  let showReg = false;
   let showCountyOfficerReg = false;
   let showHealthOfficerReg = false;
   
  let selectedRole = '';
  let selectedDisability = '';



const roles = [
  { 
    id: 'pwd', 
    label: 'Person with Disability',
    icon: 'bi-person-fill',
    description: 'Register and access PWD services'
  },
  { 
    id: 'proxy', 
    label: 'Register on Behalf',
    icon: 'bi-people-fill',
    description: 'Register for a PWD as a caregiver or guardian'
  },
  { 
    id: 'county Officer', 
    label: 'County officer',
    icon: 'bi-building-fill-check',
    description: 'Manage county-level PWD services'
  },
  { 
    id: 'Health Officer', 
    label: 'Health officer',
    icon: 'bi-hospital-fill',
    description: 'Provide medical assessments'
  }
];


  const disabilities = [
  { 
    id: 'visual', 
    label: 'Visual Impairment',
    icon: 'bi-eye-fill',
    description: 'Visual assistance and screen reader support'
  },
  { 
    id: 'hearing', 
    label: 'Hearing Impairment',
    icon: 'bi-ear-fill',
    description: 'Sign language and visual communication tools'
  },
  { 
    id: 'physical', 
    label: 'Physical Disability',
    icon: 'bi-person-wheelchair',
    description: 'Mobility assistance and accessibility features'
  },
  { 
    id: 'mental', 
    label: 'Mental Disability',
    icon: 'bi-brain',
    description: 'Cognitive support and simplified interface'
  }
];


  function handleGetStarted() {
    showRoleSelection = true;
  }




// Update handleRoleSelect function
function handleRoleSelect(role) {
  selectedRole = role;
  showRoleSelection = false;

  if (role === 'pwd' || role === 'proxy') {
    showDisabilitySelection = true;
  } else if (role === 'county Officer') {
    showCountyOfficerReg = true;
  } else if (role === 'Health Officer') {
    showHealthOfficerReg = true;
  }
}

function handleDisabilitySelect(disability) {
  selectedDisability = disability;
  showDisabilitySelection = false;
  showReg = true; // Replace with the actual component/flag for Person with Disability registration
}

  import image from "../src/assets/image.png"

  
 onMount(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then(() => {
      // Initialize dropdowns after Bootstrap JS is loaded
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
          toggle.addEventListener('mouseenter', () => {
            menu.classList.add('show');
          });
          
          dropdown.addEventListener('mouseleave', () => {
            menu.classList.remove('show');
          });
        }
      });
    });
  });


  function handleSignUpClick() {
    // Add your signup logic here
  }

  function handleLoginClick() {
    showLogin = true;
  }

  const services = [
    {
      id: 'service1',
      title: 'PWD Registration',
      description: 'Easy and accessible registration process for Persons with Disabilities',
      icon: 'bi bi-person-badge'
    },
    {
      id: 'service2',
      title: 'Benefits Management',
      description: 'Track and manage your PWD benefits and privileges',
      icon: 'bi bi-gift'
    },
    {
      id: 'service3',
      title: 'Support Services',
      description: 'Access to various support services and assistance programs',
      icon: 'bi bi-heart-pulse'
    }
  ];

  const benefits = [
    {
      title: "20% Discount on Basic Commodities",
      content: "Access discounts on medicines, food, transportation, and essential services."
    },
    {
      title: "Priority Lanes & Services",
      content: "Enjoy priority access in public establishments and government offices."
    },
    {
      title: "Educational Assistance",
      content: "Get support for educational needs and skills development programs."
    }
  ];

  const footerLinks = {
    quickLinks: ["About Us", "Services", "Benefits", "Contact"],
    support: ["FAQ", "Help Center", "Privacy Policy", "Terms of Service"],
    contact: {
      email: "support@pwdconnect.com",
      phone: "+254 7 871 567 890",
      address: "123 PWD Street, Nairobi Kenya"
    }
  };
</script>
<AccessibilityWidget />


<style>


 

  /* Modern Reset & Base Styles */
  :global(body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100vw;
    background-color: white;
    font-family: 'Inter', sans-serif;
  }

  /* Navbar Styles */
  .navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.navbar-brand {
  gap: 0.5rem;
}

.brand-icon {
  color: #27667B;
  font-size: 1.5rem;
}

.brand-text {
  color: #27667B;
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: -0.5px;
}

.nav-link {
  color: #2c3e50;
  font-weight: 500;
  padding: 0.5rem 1.2rem;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #27667B;
}

.dropdown-menu {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 0.8rem 0;
}

.dropdown-item {
  padding: 0.6rem 1.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #27667B;
  transform: translateX(5px);
}

.nav-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn {
  padding: 0.6rem 1.5rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-login {
  color: #27667B;
  border: 2px solid #27667B;
  background: transparent;
}

.btn-login:hover {
  background: rgba(39, 102, 123, 0.1);
  transform: translateY(-2px);
}

.btn-register {
  background: #27667B;
  color: white;
  border: none;
}

.btn-register:hover {
  background: #1e4f5f;
  transform: translateY(-2px);
}

/* Mobile Responsiveness */
@media (max-width: 991px) {
  .navbar-collapse {
    background: white;
    padding: 1rem;
    border-radius: 12px;
    margin-top: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  .nav-buttons {
    margin-top: 1rem;
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
  }
}


  

  /* Container & Card Styles */
  .image-container {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
  }

  .feature-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid rgba(39, 102, 123, 0.1);
  }

  /* Interactive Elements */
  .icon-wrapper {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid rgba(39, 102, 123, 0.1);
  }

  /* Button Styles */
  :global(.btn) {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 12px;
    padding: 0.75rem 1.5rem;
    font-weight: 500;
  }

  :global(.btn-primary) {
    background-color: #27667B;
    border: 2px solid #27667B;
  }

  :global(.btn-primary:hover) {
    background-color: #1e5163;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(39, 102, 123, 0.15);
  }

  :global(.btn-outline-primary) {
    border: 2px solid #27667B;
  }

 .hero-content {
    position: relative;
  }

  .custom-badge {
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    background: rgba(39, 102, 123, 0.08);
    border: 1px solid rgba(39, 102, 123, 0.2);
    border-radius: 100px;
    font-size: 14px;
    color: #27667B;
    font-weight: 500;
  }

  .hero-title {
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
  }

  .highlight {
    color: #27667B;
    position: relative;
    display: inline-block;
  }

  .highlight::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: rgba(39, 102, 123, 0.2);
    z-index: -1;
  }

  .features-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    color: #4a4a4a;
  }

  .feature-item i {
    color: #27667B;
    font-size: 18px;
  }

  .cta-wrapper {
    display: flex;
    gap: 16px;
    margin-top: 2rem;
  }

  .btn {
    padding: 12px 24px;
    font-size: 15px;
    font-weight: 500;
    border-radius: 8px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
  }

  .btn:hover {
    transform: translateY(-2px);
  }

  .trust-indicators {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .indicator {
    display: flex;
    flex-direction: column;
  }

  .number {
    font-size: 24px;
    font-weight: 700;
    color: #27667B;
  }

  .label {
    font-size: 14px;
    color: #666;
    margin-top: 4px;
  }

  .divider {
    width: 1px;
    height: 40px;
    background: rgba(0, 0, 0, 0.1);
  }




  /* Animations */
  @keyframes dropdownFade {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }





 .image-container {
    position: relative;
    max-width: 480px;
    margin: 0 auto;
  }

  /* Option 1: Classic Sharp Oval */
  .sharp-oval {
    border-radius: 50% / 50%;
    background:white;
    padding: 1.5rem;
     border: 3px solid #27667B;
  }

  

  .main-image {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: inherit;
  }

  .feature-card {
    position: absolute;
    bottom: -10px;
    right: 10px;
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
















  .feature-header {
    display: flex;
    align-items: center;
    gap: 16px;
  }




  .feature-text h4 {
    font-size: 16px;
    font-weight: 600;
    color: #27667B;
    margin: 0;
  }

  .feature-text p {
    font-size: 14px;
    color: rgba(39, 102, 123, 0.7);
    margin: 4px 0 0;
  }

  .feature-stats {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 2px solid rgba(39, 102, 123, 0.1);
  }

  .stat-item {
    text-align: center;
  }


   .logo-container {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .logo-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .custom-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #f8f9fa;
    padding: 8px 16px;
    border-radius: 50px;
  }

  .badge-text {
    font-size: 14px;
    font-weight: 500;
  }

  .main-image {
    max-width: 50%;
    height: auto;
    border-radius: 1px;
  }

  .stat-number {
    display: block;
    font-size: 18px;
    font-weight: 600;
    color: #27667B;
  }

  .stat-label {
    display: block;
    font-size: 12px;
    color: rgba(39, 102, 123, 0.7);
    margin-top: 4px;
  }

  .stat-divider {
    width: 2px;
    height: 24px;
    background: rgba(39, 102, 123, 0.1);
  }

  /* Hover effects */
  .image-container:hover .feature-card {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(39, 102, 123, 0.15);
  }

  



   .modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: grid;
  place-items: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #27667B;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
}

.close-button:hover {
  transform: scale(1.1);
  color: #1a4d5c;
}

.close-text {
  font-size: 0.9rem;
  font-weight: 500;
}



.close-button i {
  font-size: 1.5rem;
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.header-icon {
  font-size: 2.5rem;
  color: #27667B;
  margin-bottom: 1rem;
}

.header-accent {
  height: 4px;
  width: 60px;
  background: #27667B;
  margin: 1rem auto;
  border-radius: 2px;
}

.icon-wrapper, .icon-container {
  position: relative;
  width: 60px;
  height: 60px;
  display: grid;
  place-items: center;
  margin-bottom: 1rem;
}

.icon-background {
  position: absolute;
  inset: 0;
  background: #fff;
  border-radius: 50%;
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.role-button:hover .icon-background,
.disability-card:hover .icon-pulse {
  transform: scale(1.2);
}

.icon-pulse {
  position: absolute;
  inset: 0;
  border: 2px solid #27667B;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}



  .modal-content {
    padding: 2rem;
  }

 
  .title {
    color: #1F2937;
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
  }

 
  .role-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .role-button {
    background: #F3F4F6;
    border: 2px solid transparent;
    border-radius: 0.75rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .role-button:hover {
    background: rgba(39, 102, 123, 0.1);
    border-color: #27667B;
    transform: translateY(-2px);
  }

 

  .role-label {
    color: #27667B;
  }

  .role-description {
    color: #6B7280;
  }

   .disability-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    padding: 1rem;
  }

  .disability-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: #F3F4F6;
    border: 2px solid transparent;
    border-radius: 1rem;
    transition: all 0.3s ease;
    text-align: left;
  }

  .disability-card:hover {
    background: rgba(39, 102, 123, 0.1);
    border-color: #27667B;
    transform: translateY(-2px);
  }

  .icon-container {
    min-width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 12px;
    font-size: 24px;
  }

  

  .disability-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .disability-label {
    font-size: 1.1rem;
    font-weight: 600;
    color: #27667B;
  }

  .disability-description {
    font-size: 0.875rem;
    color: #6B7280;
  }

  @media (max-width: 640px) {
    .disability-grid {
      grid-template-columns: 1fr;
    }
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-container {
    background: white;
    width: 90%;
    max-width: 1200px; /* Increased width */
    height: 90vh;
    border-radius: 20px;
    padding: 2rem;
    position: relative;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .ai-educator {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.section-title {
  color: #27667B;
  font-size: 2.5rem;
  font-weight: 700;
}

.section-description {
  color: #6c757d;
  font-size: 1.1rem;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.feature-item i {
  font-size: 1.5rem;
  color: #27667B;
}

.chat-box {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.chat-message {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.chat-message.ai i {
  font-size: 1.5rem;
  color: #27667B;
}

.chat-input {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.chat-input input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  outline: none;
}

.send-btn {
  background: #27667B;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.send-btn:hover {
  background: #1e4f5f;
}

.ai-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.ai-icon {
  font-size: 3rem;
  color: #27667B;
  margin-bottom: 2rem;
}

.ai-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.stat h4 {
  color: #27667B;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat p {
  color: #6c757d;
  margin: 0;
}
</style>

<Router>
  <div>
    <Route path="/pwd-dashboard" component={PWDDashboard} />
    <Route path="/county-dashboard" component={CountyDashboard} />
    <Route path="/health-dashboard" component={HealthDashboard} />
  </div>
</Router>

{#if showLogin}
  <Login on:close={() => showLogin = false} />

  {/if}

// Update the registration component rendering
{#if showReg}
  <Reg 
    role={selectedRole} 
    disability={selectedDisability}
    isProxy={selectedRole === 'proxy'} 
  />


  
    {:else if showRoleSelection}
<div class="modal-overlay">
  <div class="modal-container">
    <button class="close-button" on:click={() => window.location.href = '/'}>
      <i class="bi bi-x-circle-fill"></i>
      <span class="close-text">Close</span>
    </button>

    <div class="modal-content">
      <div class="modal-header">
        <div class="header-icon">
          <i class="bi bi-person-badge-fill"></i>
        </div>
        <h2 class="title">Choose Your Role To Register</h2>
        <div class="header-accent"></div>
      </div>

      <div class="role-grid">
        {#each roles as role}
          <button class="role-button" on:click={() => handleRoleSelect(role.id)}>
            <div class="icon-container">
              <i class="bi {role.icon}"></i>
          
            </div>
            <span class="role-label">{role.label}</span>
            <span class="role-description">{role.description}</span>
          </button>
        {/each}

      </div>
    </div>
  </div>
</div>

{:else if showDisabilitySelection}
<div class="modal-overlay">
  <div class="modal-container">
     <button class="close-button" on:click={handleClose}>
      <i class="bi bi-x-circle-fill"></i>
      <span class="close-text">Close</span>
    </button>

    <div class="modal-content">
      <div class="modal-header">
        <div class="header-icon">
          <i class="bi bi-heart-pulse-fill"></i>
        </div>
        <h2 class="title">Select Disability Type</h2>
        <div class="header-accent"></div>
      </div>

      <div class="disability-grid">
        {#each disabilities as disability}
          <button class="disability-card" on:click={() => handleDisabilitySelect(disability.id)}>
            <div class="icon-container">
              <i class="bi {disability.icon}"></i>
              <div class="icon-pulse"></div>
            </div>
            <div class="disability-info">
              <span class="disability-label">{disability.label}</span>
              <span class="disability-description">{disability.description}</span>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
{:else}

<nav class="navbar navbar-expand-lg fixed-top py-2">
  <div class="container">
    <!-- Brand -->
    <a class="navbar-brand d-flex align-items-center" href="/">
     <i class="bi bi-person-wheelchair brand-icon"></i>
      <span class="brand-text">PWD Connect</span>
    </a>

    <!-- Mobile Toggle -->
    <button 
    class="navbar-toggler" 
    type="button" 
    data-bs-toggle="collapse" 
    data-bs-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation menu"
    >
  <span class="navbar-toggler-icon" aria-hidden="true"></span>
</button>

    <!-- Nav Items -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item">
          <a class="nav-link" href="/home">Home</a>
        </li>
        
        <!-- Services Dropdown -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="/services" role="button" data-bs-toggle="dropdown">
            Services
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/services/registration">Registration</a></li>
            <li><a class="dropdown-item" href="/services/benefits">Benefits</a></li>
          </ul>
        </li>

        <!-- AI Educator -->
        <li class="nav-item">
          <a class="nav-link" href="/ai-educator">
            <i class="bi bi-robot"></i> Personal AI Educator
          </a>
        </li>
      </ul>

      <!-- Auth Buttons -->
      <div class="nav-buttons">
        <button class="btn btn-login" on:click={handleLoginClick}>Login</button>
        <button class="btn btn-register" on:click={handleGetStarted}>Register</button>
      </div>
    </div>
  </div>
</nav>

<!-- Hero Section with improved layout -->
<section class="hero min-vh-100 d-flex align-items-center bg-white" style="padding-top: 5rem;">
  <div class="container">
    <div class="row align-items-center justify-content-between g-5">
      <div class="col-lg-5">
  <div class="hero-content">
    <!-- Badge -->
    <div class="badge-wrapper mb-4">
      <span class="custom-badge">
        <i class="bi bi-stars me-2"></i>
        Trusted by 10,000+ PWDs
      </span>
    </div>

    <!-- Main Title -->
    <h1 class="hero-title">
      Empowering <span class="highlight">PWDs</span> Through Digital Innovation
    </h1>

    <!-- Subtitle with Icons -->
    <div class="features-list my-4">
      <div class="feature-item">
        <i class="bi bi-check-circle-fill"></i>
        <span>Quick Registration Process</span>
      </div>
      <div class="feature-item">
        <i class="bi bi-shield-check"></i>
        <span>Secure Data Protection</span>
      </div>
      <div class="feature-item">
        <i class="bi bi-clock"></i>
        <span>24/7 Support Available</span>
      </div>
    </div>

    <!-- CTA Buttons -->
    <div class="cta-wrapper">
     <button class="btn btn-primary" on:click={handleGetStarted}>
  Get Started Now
  <i class="bi bi-arrow-right ms-2"></i>
</button>
      <button class="btn btn-outline-primary">
        Watch Demo
        <i class="bi bi-play-circle ms-2"></i>
      </button>
    </div>

    <!-- Trust Indicators -->
    <div class="trust-indicators mt-5">
      <div class="indicator">
        <span class="number">98%</span>
        <span class="label">Success Rate</span>
      </div>
      <div class="divider"></div>
      <div class="indicator">
        <span class="number">5min</span>
        <span class="label">Process Time</span>
      </div>
    </div>
  </div>
</div>
  
 <div class="col-lg-6">
  <div class="image-container">
    <div class="sharp-oval">
      <img 
        src={image} 
        alt="PWD Support" 
        class="main-image"
      >
 
    </div>
    
    <div class="feature-card">
      <div class="feature-text">
        <h4>Easy Registration</h4>
        <p>Get your PWD ID in 3 simple steps</p>
      </div>
      
      <div class="feature-stats">
        <div class="stat-item">
          <span class="stat-number">5min</span>
          <span class="stat-label">Process Time</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">24/7</span>
          <span class="stat-label">Support</span>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  </div>
</section>


<!-- Services Section with enhanced cards -->
<section class="py-5 bg-light">
  <div class="container py-5">
    <h2 class="text-center h2 fw-bold mb-5" style="color: #27667B">Our Services</h2>
    <div class="row g-4">
      {#each services as service}
        <div class="col-md-4">
          <div class="card h-100 border-0 shadow-sm hover-lift">
            <div class="card-body p-4">
              <div class="icon-wrapper mb-4 p-3 rounded-3" style="background: #27667B10">
                <i class="{service.icon} fs-2" style="color: #27667B"></i>
              </div>
              <h3 class="h5 mb-3">{service.title}</h3>
              <p class="text-muted small">{service.description}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Benefits Section with accordion -->
<section class="py-5 bg-white">
  <div class="container py-5">
    <h2 class="text-center h2 fw-bold mb-5" style="color: #27667B">PWD Benefits</h2>
    <div class="row align-items-center g-5">
      <div class="col-lg-6">
        <div class="accordion" id="benefitsAccordion">
          {#each benefits as benefit, index}
            <div class="accordion-item border-0 mb-3 shadow-sm">
              <h2 class="accordion-header">
                <button class="accordion-button {index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#benefit{index}">
                  {benefit.title}
                </button>
              </h2>
              <div id="benefit{index}" class="accordion-collapse collapse {index === 0 ? 'show' : ''}" data-bs-parent="#benefitsAccordion">
                <div class="accordion-body">
                  {benefit.content}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
      <div class="col-lg-6">
        <img src={image} alt="Benefits" class="img-fluid rounded-4 shadow-lg">
      </div>
    </div>
  </div>
</section>

<!-- AI Educator Section -->
<section class="ai-educator py-5 bg-gradient">
  <div class="container">
    <div class="row align-items-center g-5">
      <div class="col-lg-6">
        <div class="ai-content">
          <div class="badge-wrapper mb-4">
            <span class="custom-badge">
              <i class="bi bi-robot"></i>
              AI-Powered Support
            </span>
          </div>
          
          <h2 class="section-title mb-4">
            Your Personal AI Educator
          </h2>
          
          <p class="section-description mb-4">
            Get instant answers to your questions about PWD services, rights, and benefits. Our AI educator is available 24/7 to assist you.
          </p>

          <div class="features-grid">
            <div class="feature-item">
              <i class="bi bi-translate"></i>
              <span>Multiple Language Support</span>
            </div>
            <div class="feature-item">
              <i class="bi bi-clock-history"></i>
              <span>24/7 Availability</span>
            </div>
            <div class="feature-item">
              <i class="bi bi-shield-check"></i>
              <span>Verified Information</span>
            </div>
          </div>

          <div class="chat-preview mt-5">
            <div class="chat-box">
              <div class="chat-message ai">
                <i class="bi bi-robot"></i>
                <p>Hello! How can I help you today?</p>
              </div>
              <div class="chat-input">
              <input 
                type="text" 
                placeholder="Ask me anything about PWD services..."
                aria-label="Type your question about PWD services"
              >
              <button 
                class="send-btn"
                aria-label="Send message"
              >
                <i class="bi bi-send-fill" aria-hidden="true"></i>
              </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="ai-visual">
          <div class="ai-card">
            <div class="ai-icon">
              <i class="bi bi-cpu"></i>
            </div>
            <div class="ai-stats">
              <div class="stat">
                <h4>1M+</h4>
                <p>Questions Answered</p>
              </div>
              <div class="stat">
                <h4>98%</h4>
                <p>Accuracy Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Enhanced Footer -->
<footer class="bg-light py-5">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-4">
        <h5 class="fw-bold mb-4" style="color: #27667B">PWD Connect</h5>
        <p class="text-muted small">Empowering lives through accessible support and comprehensive services for Persons with Disabilities.</p>
        <div class="social-links mt-4">
  <a href="/social/facebook" class="text-muted me-3" aria-label="Visit our Facebook page">
    <i class="bi bi-facebook" aria-hidden="true"></i>
  </a>
  <a href="/social/twitter" class="text-muted me-3" aria-label="Visit our Twitter page">
    <i class="bi bi-twitter" aria-hidden="true"></i>
  </a>
  <a href="/social/instagram" class="text-muted" aria-label="Visit our Instagram page">
    <i class="bi bi-instagram" aria-hidden="true"></i>
  </a>
</div>
      </div>

      <div class="col-lg-2">
        <h6 class="fw-bold mb-4">Quick Links</h6>
        <ul class="list-unstyled">
          {#each footerLinks.quickLinks as link}
            <li class="mb-2">
              <a href="/links/{link.toLowerCase().replace(/\s+/g, '-')}" class="text-muted text-decoration-none">
                {link}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <div class="col-lg-2">
        <h6 class="fw-bold mb-4">Support</h6>
        <ul class="list-unstyled">
          {#each footerLinks.support as link}
            <li class="mb-2">
              <a href="/support/{link.toLowerCase().replace(/\s+/g, '-')}" class="text-muted text-decoration-none">
                {link}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <div class="col-lg-4">
        <h6 class="fw-bold mb-4">Contact Us</h6>
        <ul class="list-unstyled">
          <li class="mb-2">
            <i class="bi bi-envelope me-2" aria-hidden="true"></i>
            <a href="mailto:{footerLinks.contact.email}" class="text-muted text-decoration-none">
              {footerLinks.contact.email}
            </a>
          </li>
          <li class="mb-2">
            <i class="bi bi-telephone me-2" aria-hidden="true"></i>
            <a href="tel:{footerLinks.contact.phone}" class="text-muted text-decoration-none">
              {footerLinks.contact.phone}
            </a>
          </li>
          <li class="mb-2">
            <i class="bi bi-geo-alt me-2" aria-hidden="true"></i>
            <a href="/location" class="text-muted text-decoration-none">
              {footerLinks.contact.address}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-top mt-5 pt-4 text-center">
      <p class="small text-muted mb-0">&copy; 2025 PWD Access. All rights reserved.</p>
    </div>
  </div>
</footer>

{/if}  