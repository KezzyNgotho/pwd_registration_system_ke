<script>
  import { onMount } from 'svelte';
import { AssistiveTools } from '../src/Assistive.js';

  // Props
  export const role = '';
  export let disability;
  let assistiveTools;

onMount(() => {
  assistiveTools = new AssistiveTools(disability);
});

  // Add missing voice recognition initialization
  let recognition;
  onMount(() => {
    if ('webkitSpeechRecognition' in window) {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = handleVoiceResult;
      recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
      };
    }
  });


  // Form Data Arrays
  const maritalStatus = [
    'Single', 'Married', 'Divorced', 'Widowed', 'Separated', 'Domestic Partnership'
  ];

  const counties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Kiambu', 'Machakos', 'Kajiado', 'Uasin Gishu'
  ];

  const educationLevels = [
    'Primary School', 'Secondary School', 'Certificate', 'Diploma', 
    'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate', 'Other'
  ];

  const relationshipTypes = [
    'Parent', 'Spouse', 'Sibling', 'Child', 'Guardian', 'Other Family Member', 'Friend'
  ];

  const locationData = {
    'Nairobi': {
      subCounties: ['Westlands', 'Dagoretti', 'Langata', 'Kibra', 'Roysambu', 'Kasarani', 'Ruaraka', 'Embakasi']
    },
    'Mombasa': {
      subCounties: ['Mvita', 'Nyali', 'Kisauni', 'Likoni', 'Changamwe', 'Jomvu']
    }
  };

  // Form Navigation
  let currentSection = 'personal';
  const sections = [
    { id: 'personal', title: 'Personal Info', icon: 'bi-person-circle' },
    { id: 'education', title: 'Education', icon: 'bi-book' },
    { id: 'nextOfKin', title: 'Next of Kin', icon: 'bi-people' }
  ];

  // Form State Management
  let isListening = false;
  let formProgress = 0;

  // Initial Form Data Structure
  const userResponses = {
    personalInfo: {
      name: '',
      idNumber: '',
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
      mobileNumber: '',
      emailAddress: '',
      county: '',
      subCounty: '',
     
    },
    educationInfo: {
      noFormalEducation: false,
      highestLevel: '',
      institution: '',
      yearCompleted: '',
      specialization: '',
      skills: '',
      certificates: [],
      additionalInfo: ''
    },
    nextOfKin: {
      name: '',
      relationship: '',
      mobileNumber: '',
      alternativeContact: ''
    }
  };

  // Helper Functions
  function createInputProps(name, type, value) {
    return {
      id: name,
      type,
      value,
      class: 'form-control',
      'on:input': (e) => handleInputChange(name, e.target.value),
      'on:focus': handleFieldFocus,
      'on:blur': (e) => assistiveTools?.handleFieldValidation(e.target)
    };
  }

  function createSelectProps(name, value) {
    return {
      id: name,
      value,
      class: 'form-select',
      'on:change': (e) => handleInputChange(name, e.target.value),
      'on:focus': handleFieldFocus,
      'on:blur': (e) => assistiveTools?.handleFieldValidation(e.target)
    };
  }

 
  function previousSection() {
    const currentIndex = sections.findIndex(s => s.id === currentSection);
    if (currentIndex > 0) {
      currentSection = sections[currentIndex - 1].id;
      updateProgress();
    }
  }



  function toggleVoiceInput() {
    if (!isListening) {
      recognition?.start();
    } else {
      recognition?.stop();
    }
    isListening = !isListening;
  }

  function handleVoiceResult(event) {
    const transcript = event.results[0][0].transcript;
    const focusedElement = document.activeElement;
    if (focusedElement && focusedElement.tagName !== 'BUTTON') {
      focusedElement.value = transcript;
      handleInputChange(focusedElement.id, transcript);
    }
  }

  function handleInputChange(field, value) {
    const section = getSectionForField(field);
    userResponses[section][field] = value;
    updateProgress();
  }

  function handleFieldFocus(event) {
    if (disability === 'visual') {
      speakText(event.target.getAttribute('aria-label') || event.target.placeholder);
    }
  }

  function updateProgress() {
    formProgress = calculateProgress(userResponses);
  }

  function handleCertificateUpload(event) {
    const file = event.target.files[0];
    if (file) {
      userResponses.educationInfo.certificates = [
        ...userResponses.educationInfo.certificates,
        { name: file.name, file }
      ];
    }
  }

  function removeCertificate(index) {
    userResponses.educationInfo.certificates = userResponses.educationInfo.certificates
      .filter((_, i) => i !== index);
  }



  function getSectionForField(field) {
    const fieldMappings = {
      fullName: 'personalInfo',
      idNumber: 'personalInfo',
      dateOfBirth: 'personalInfo',
      gender: 'personalInfo',
      maritalStatus: 'personalInfo',
     
      mobileNumber: 'personalInfo',
      emailAddress: 'personalInfo',
      county: 'personalInfo',
      subCounty: 'personalInfo',
     
      
      highestLevel: 'educationInfo',
      institution: 'educationInfo',
      yearCompleted: 'educationInfo',
      specialization: 'educationInfo',
      skills: 'educationInfo',
      
      kinName: 'nextOfKin',
      kinRelationship: 'nextOfKin',
      
      kinMobileNumber: 'nextOfKin',
      
      kinAlternativeContact: 'nextOfKin'
    };
    
    return fieldMappings[field] || 'personalInfo';
  }

  

  function getContextualHelp(section) {
    const helpTexts = {
      personal: 'Fill in your personal information including name, ID number, and contact details.',
      education: 'Provide information about your education background and qualifications.',
      nextOfKin: 'Enter details of your emergency contact person.'
    };
    return helpTexts[section] || 'Please fill in all required fields.';
  }

  

  function speakText(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  }

  // Add to your existing script section
let showSuccessMessage = false;
let countdown = 8;
let countdownInterval;
let registrationNumber = Math.floor(100000 + Math.random() * 900000); // Generate random reg number

function handleSubmit() {
  showSuccessMessage = true;
  startCountdown();
  console.log('Form Data:', userResponses);
}

function startCountdown() {
  countdownInterval = setInterval(() => {
    countdown--;
    if (countdown === 0) {
      clearInterval(countdownInterval);
      window.location.href = '/login';
    }
  }, 1000);
}

onMount(() => {
  return () => {
    if (countdownInterval) clearInterval(countdownInterval);
  };
});


  function validateForm() {
  const requiredSections = ['personalInfo', 'nextOfKin'];
  let isValid = true;
  
  requiredSections.forEach(section => {
    const fields = document.querySelectorAll(`[data-section="${section}"][required]`);
    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
  });

  return isValid;
}


  async function submitFormData(data) {
    // Implement your API call here
    return { success: true };
  }




let formErrors = {
    personal: {},
    education: {},
    nextOfKin: {}
  };

  let formTouched = {
    personal: false,
    education: false,
    nextOfKin: false
  };

  function validateField(field, value, rules = {}) {
    const errors = [];
    if (rules.required && !value) errors.push('This field is required');
    if (rules.pattern && value && !new RegExp(rules.pattern).test(value)) errors.push('Invalid format');
    if (rules.minLength && value.length < rules.minLength) errors.push(`Minimum ${rules.minLength} characters required`);
    return errors;
  }

  function isSectionComplete(sectionId) {
    const section = userResponses[sectionId];
    return Object.values(section).every(value => value !== '' && value !== null);
  }

  function getStepStatus(sectionId) {
    if (currentSection === sectionId) return 'active';
    if (isSectionComplete(sectionId)) return 'complete';
    return '';
  }

  function nextSection() {
    const currentIndex = sections.findIndex(s => s.id === currentSection);
    if (currentIndex < sections.length - 1) {
      const formSection = document.querySelector('.form-section');
      formSection.classList.add('sliding-out');
      
      setTimeout(() => {
        currentSection = sections[currentIndex + 1].id;
        formSection.classList.remove('sliding-out');
        formSection.classList.add('sliding-in');
      }, 300);
    }
  }







function calculateProgress(responses) {
  const sections = {
    personalInfo: {
      required: ['name', 'idNumber', 'dateOfBirth', 'gender', 'mobileNumber', 'county'],
      optional: ['maritalStatus', 'emailAddress', 'subCounty']
    },
    educationInfo: {
      required: ['highestLevel'],
      optional: ['institution', 'yearCompleted', 'specialization', 'skills', 'certificates']
    },
    nextOfKin: {
      required: ['name', 'relationship', 'mobileNumber'],
      optional: ['alternativeContact']
    }
  };

  let totalFields = 0;
  let completedFields = 0;

  for (const section in sections) {
    const required = sections[section].required;
    const optional = sections[section].optional;
    
    totalFields += required.length;
    
    required.forEach(field => {
      if (responses[section][field]) completedFields++;
    });

    optional.forEach(field => {
      if (responses[section][field]) {
        totalFields++;
        completedFields++;
      }
    });
  }

  return Math.round((completedFields / totalFields) * 100);
}





  
</script>



<div class="modal-overlay">
  <div class="modal-container">
    <!-- Header -->
    <div class="modal-header">
      <h2>Registration Form for PWD'S</h2>
      <button 
        class="close-button" 
        on:click={() => window.location.href = '/'} 
        aria-label="Close and return to home page"
      >
        <i class="bi bi-x-lg" aria-hidden="true"></i>
      </button>
    </div>

    <!-- Progress bar -->
    <div class="progress-wrapper">
      <div class="progress" role="progressbar" aria-valuenow={formProgress} aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width: {formProgress}%">
          {formProgress}%
        </div>
      </div>
    </div>

    <!-- Section navigation -->
    <div class="section-tabs">
      {#each sections as section}
        <button 
          class="section-tab {currentSection === section.id ? 'active' : ''}"
          on:click={() => currentSection = section.id}
        >
          <i class={section.icon}></i>
          {section.title}
        </button>
      {/each}
    </div>

    <!-- Form Sections -->
    <form class="registration-form" on:submit|preventDefault={handleSubmit}>
      {#if currentSection === 'personal'}
        <div class="form-section animate-in" role="tabpanel">
          <h3><i class="bi bi-person-circle" aria-hidden="true"></i> Personal Information</h3>
          <div class="row g-4">
          
        <div class="col-md-6">
          <label for="fullName" class="form-label">Full Name</label>
          <input 
            {...createInputProps('fullName', 'text', userResponses.personalInfo.name)}
            placeholder="Enter your full name"
            aria-required="true"
          />
        </div>

        <div class="col-md-6">
          <label for="idNumber" class="form-label">ID Number</label>
          <input 
            {...createInputProps('idNumber', 'text', userResponses.personalInfo.idNumber)}
            placeholder="Enter your ID number"
            pattern="[0-9]{8}"
          />
        </div>

        <div class="col-md-4">
          <label for="dateOfBirth" class="form-label">Date of Birth</label>
          <input 
            {...createInputProps('dateOfBirth', 'date', userResponses.personalInfo.dateOfBirth)}
          />
        </div>

        <div class="col-md-4">
          <label for="gender" class="form-label">Gender</label>
          <select {...createSelectProps('gender', userResponses.personalInfo.gender)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="col-md-4">
          <label for="maritalStatus" class="form-label">Marital Status</label>
          <select {...createSelectProps('maritalStatus', userResponses.personalInfo.maritalStatus)}>
            <option value="">Select Status</option>
            {#each maritalStatus as status}
              <option value={status}>{status}</option>
            {/each}
          </select>
        </div>

      
        <div class="col-md-6">
          <label for="mobileNumber" class="form-label">Mobile Number</label>
          <div class="input-group">
            <span class="input-group-text">+254</span>
            <input 
              {...createInputProps('mobileNumber', 'tel', userResponses.personalInfo.mobileNumber)}
              placeholder="7XXXXXXXX"
              pattern="[0-9]{9}"
            />
          </div>
        </div>

        <div class="col-md-6">
          <label for="emailAddress" class="form-label">Email Address</label>
          <input 
            {...createInputProps('emailAddress', 'email', userResponses.personalInfo.emailAddress)}
            placeholder="example@email.com"
          />
        </div>

        <div class="col-md-4">
          <label for="county" class="form-label">County</label>
          <select {...createSelectProps('county', userResponses.personalInfo.county)}>
            <option value="">Select County</option>
            {#each counties as county}
              <option value={county}>{county}</option>
            {/each}
          </select>
        </div>

        <div class="col-md-4">
          <label for="subCounty" class="form-label">Sub-County</label>
          <select {...createSelectProps('subCounty', userResponses.personalInfo.subCounty)}>
            <option value="">Select Sub-County</option>
            {#each locationData[userResponses.personalInfo.county]?.subCounties || [] as subCounty}
              <option value={subCounty}>{subCounty}</option>
            {/each}
          </select>
        </div>
      
      </div>
    </div>
  {/if}

  {#if currentSection === 'education'}
   <div class="form-section animate-in" role="region" aria-labelledby="education-heading">
          <h3 id="education-heading"><i class="bi bi-book"></i> Education & Skills</h3>
          <div class="row g-4">
      <div class="col-12">
        <div class="checkbox-wrapper">
          <input 
            type="checkbox" 
            class="custom-checkbox" 
            id="noFormalEducation"
            bind:checked={userResponses.educationInfo.noFormalEducation}
          />
          <label class="custom-checkbox-label" for="noFormalEducation">
            No Formal Education
          </label>
        </div>
      </div>

      {#if !userResponses.educationInfo.noFormalEducation}
        <div class="col-md-6">
          <label for="highestLevel" class="form-label">Highest Level of Education</label>
          <select {...createSelectProps('highestLevel', userResponses.educationInfo.highestLevel)}>
            <option value="">Select Education Level</option>
            {#each educationLevels as level}
              <option value={level}>{level}</option>
            {/each}
          </select>
        </div>

        <div class="col-md-6">
          <label for="institution" class="form-label">Institution Name</label>
          <input 
            {...createInputProps('institution', 'text', userResponses.educationInfo.institution)}
            placeholder="Enter institution name"
          />
        </div>

        <div class="col-md-6">
          <label for="yearCompleted" class="form-label">Year Completed</label>
          <input 
            {...createInputProps('yearCompleted', 'number', userResponses.educationInfo.yearCompleted)}
            min="1950"
            max={new Date().getFullYear()}
          />
        </div>

        <div class="col-md-6">
          <label for="specialization" class="form-label">Field of Study/Specialization</label>
          <input 
            {...createInputProps('specialization', 'text', userResponses.educationInfo.specialization)}
            placeholder="Enter your field of study"
          />
        </div>

        <div class="col-12">
          <label for="skills" class="form-label">Skills & Certifications</label>
          <textarea 
            class="form-control"
            id="skills"
            rows="3"
            placeholder="List your relevant skills and certifications"
            bind:value={userResponses.educationInfo.skills}
          ></textarea>
        </div>

         <!-- Certificate upload section with proper label association -->
        <div class="col-12">
          <label for="certificateUpload" class="form-label">Upload Your Educational Certificates</label>
          <div class="certificate-upload">
            <input 
              id="certificateUpload"
              type="file"
              class="form-control"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              on:change={handleCertificateUpload}
              aria-describedby="certificateHint"
              multiple
            />
          </div>
          <div id="certificateHint" class="form-text">
            Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG
          </div>
        </div>

        <!-- Certificate list with accessible remove buttons -->
        {#if userResponses.educationInfo.certificates?.length > 0}
          <div class="certificate-list mt-3">
            {#each userResponses.educationInfo.certificates as cert, index}
              <div class="certificate-item">
                <span>{cert.name}</span>
                <button 
                  type="button" 
                  class="btn btn-sm btn-danger"
                  on:click={() => removeCertificate(index)}
                  aria-label={`Remove ${cert.name} certificate`}
                >
                  <i class="bi bi-trash" aria-hidden="true"></i>
                </button>
              </div>
            {/each}
          </div>
        {/if}


      {/if}
    </div>
  </div>
{/if}




   {#if currentSection === 'nextOfKin'}
  <div class="form-section animate-in" role="tabpanel">
    <h3><i class="bi bi-people" aria-hidden="true"></i> Next of Kin Details</h3>
    <div class="row g-4">
      <div class="col-md-6">
        <label for="kinName" class="form-label">Full Name</label>
        <input 
          {...createInputProps('kinName', 'text', userResponses.nextOfKin.name)}
          placeholder="Enter next of kin name"
          aria-required="true"
        />
      </div>

      <div class="col-md-6">
        <label for="kinRelationship" class="form-label">Relationship</label>
        <select {...createSelectProps('kinRelationship', userResponses.nextOfKin.relationship)}>
          <option value="">Select Relationship</option>
          {#each relationshipTypes as type}
            <option value={type}>{type}</option>
          {/each}
        </select>
      </div>


      <div class="col-md-4">
        <label for="kinMobileNumber" class="form-label">Mobile Number</label>
        <div class="input-group">
          <span class="input-group-text">+254</span>
          <input 
            {...createInputProps('kinMobileNumber', 'tel', userResponses.nextOfKin.mobileNumber)}
            placeholder="7XXXXXXXX"
           
            aria-required="true"
          />
        </div>
      </div>


      <div class="col-md-6">
        <label for="kinAlternativeContact" class="form-label">Alternative Contact</label>
        <div class="input-group">
          <span class="input-group-text">+254</span>
          <input 
            {...createInputProps('kinAlternativeContact', 'tel', userResponses.nextOfKin.alternativeContact)}
            placeholder="7XXXXXXXX"
            pattern="[0-9]{9}"
          />
        </div>
      </div>
    </div>
  </div>
{/if}


    <!-- Navigation Buttons -->
    <div class="form-navigation mt-4">
      {#if currentSection !== sections[0].id}
        <button type="button" 
                class="btn btn-outline-primary" 
                on:click={previousSection}>
          <i class="bi bi-arrow-left" aria-hidden="true"></i> Previous
        </button>
      {/if}
      
      {#if currentSection !== sections[sections.length - 1].id}
        <button type="button" 
                class="btn btn-primary" 
                on:click={nextSection}>
          Next <i class="bi bi-arrow-right" aria-hidden="true"></i>
        </button>
      {:else}
        <button type="submit" 
                class="btn btn-success">
          Complete Registration <i class="bi bi-check-circle" aria-hidden="true"></i>
        </button>
      {/if}
    </div>
  </form>

 
 <!-- Success Message -->
    {#if showSuccessMessage}
      <div class="success-modal">
        <div class="success-content">
          <i class="bi bi-check-circle-fill success-icon"></i>
          <h3>Welcome to Our Community!</h3>
          <p>Your registration was successful.</p>
          <div class="registration-details">
            <p>Registration Number: <strong>REG-{registrationNumber}</strong></p>
            <p>Please check your SMS for this registration number.</p>
          </div>
          <p>Login to complete your profile setup and access our services.</p>
          <p class="countdown">Redirecting to login in {countdown} seconds...</p>
        </div>
      </div>
    {/if}
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
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-container {
    background: white;
    width: 90%;
    max-width: 1800px; /* Increased width */
    height: 90vh;
    border-radius: 5px;
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

  .modal-header h2 {
    font-size: 1.75rem;
    color: #27667B;
    margin: 0;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #27667B;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .close-button:hover {
    color: #1e4f5f;
  }

  .progress-wrapper {
    background: rgba(255, 255, 255, 0.9);
    padding: 1rem;
    border-radius: 20px;
    margin-bottom: 1.5rem;
  }

  .progress {
    height: 15px;
    background: #e9ecef;
    border-radius: 15px;
    overflow: hidden;
  }

  .progress-bar {
    background: linear-gradient(90deg, #27667B, #4CAF50);
    transition: width 0.3s ease-in-out;
  }

  .section-tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .section-tab {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    background: #f8f9fa;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .section-tab.active {
    background: #27667B;
    color: white;
  }

  .form-section {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 20px;
    margin-bottom: 1rem;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .form-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .btn-primary {
    background: linear-gradient(135deg, #27667B, #1e4f5f);
    border: none;
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(39, 102, 123, 0.3);
  }

  .btn-outline-primary {
    border: 2px solid #27667B;
    color: #27667B;
  }

  .btn-outline-primary:hover {
    background: #27667B;
    color: white;
  }

  .btn-success {
    background: linear-gradient(135deg, #28a745, #1e7e34);
    border: none;
    color: white;
  }

  .btn-success:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
  }

  .success-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
  }

  .success-content {
    background: white;
    padding: 2.5rem;
    border-radius: 15px;
    text-align: center;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease-out;
  }

  .success-icon {
    font-size: 4rem;
    color: #28a745;
    margin-bottom: 1.5rem;
  }

  .registration-details {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 10px;
    margin: 1.5rem 0;
  }

  .registration-details strong {
    color: #27667B;
    font-size: 1.2rem;
  }

  .countdown {
    margin-top: 1.5rem;
    color: #666;
    font-size: 0.9rem;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { transform: translateY(-20px); }
    to { transform: translateY(0); }
  }
</style>