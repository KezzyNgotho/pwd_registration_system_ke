<script>
  import { onMount } from 'svelte';
import { AssistiveTools } from '../src/Assistive.js';

  // Props
  export let disability;
  export let role;
  let assistiveTools;

onMount(() => {
  assistiveTools = new AssistiveTools(disability);
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
      nationality: '',
      religion: '',
      mobileNumber: '',
      emailAddress: '',
      county: '',
      subCounty: '',
      ward: '',
      postalAddress: '',
      residentialAddress: ''
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
      county: '',
      subCounty: '',
      mobileNumber: '',
      emailAddress: '',
      postalAddress: '',
      physicalAddress: '',
      occupation: '',
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

  // Voice Recognition Setup
  let recognition;
  

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

  function calculateProgress(responses) {
    let totalFields = 0;
    let filledFields = 0;

    for (const section in responses) {
      for (const field in responses[section]) {
        if (field !== 'certificates') {
          totalFields++;
          if (responses[section][field]) filledFields++;
        }
      }
    }

    return Math.round((filledFields / totalFields) * 100);
  }

  function getSectionForField(field) {
    const fieldMappings = {
      fullName: 'personalInfo',
      idNumber: 'personalInfo',
      dateOfBirth: 'personalInfo',
      gender: 'personalInfo',
      maritalStatus: 'personalInfo',
      nationality: 'personalInfo',
      religion: 'personalInfo',
      mobileNumber: 'personalInfo',
      emailAddress: 'personalInfo',
      county: 'personalInfo',
      subCounty: 'personalInfo',
      ward: 'personalInfo',
      postalAddress: 'personalInfo',
      residentialAddress: 'personalInfo',
      
      highestLevel: 'educationInfo',
      institution: 'educationInfo',
      yearCompleted: 'educationInfo',
      specialization: 'educationInfo',
      skills: 'educationInfo',
      
      kinName: 'nextOfKin',
      kinRelationship: 'nextOfKin',
      kinCounty: 'nextOfKin',
      kinSubCounty: 'nextOfKin',
      kinMobileNumber: 'nextOfKin',
      kinEmailAddress: 'nextOfKin',
      kinPostalAddress: 'nextOfKin',
      kinPhysicalAddress: 'nextOfKin',
      kinOccupation: 'nextOfKin',
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

  async function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await submitFormData(userResponses);
        if (response.success) {
          alert('Registration successful!');
        }
      } catch (error) {
        console.error('Submission error:', error);
        alert('Registration failed. Please try again.');
      }
    }
  }

  function validateForm() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    requiredFields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
        field.classList.add('is-invalid');
      }
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












  
</script>




<div class="registration-container {disability}-mode" role="form">
  <!-- Assistive Controls -->
  <div class="assistive-controls" class:visible={disability}>
    {#if disability === 'visual'}
      <button 
        class="btn btn-voice" 
        class:active={isListening} 
        on:click={toggleVoiceInput}
        aria-label="Toggle voice input">
        <i class="bi bi-mic" aria-hidden="true"></i>
      </button>
    {/if}
    <button 
      class="btn btn-help" 
      on:click={() => assistiveTools?.provideContextualHelp()}
      aria-label="Get help">
      <i class="bi bi-question-circle" aria-hidden="true"></i>
    </button>
  </div>

  <!-- Progress Bar -->
  <div class="progress-wrapper mb-4">
    <div class="progress" role="progressbar" aria-valuenow={formProgress} aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar" style="width: {formProgress}%"></div>
    </div>
    <div class="progress-steps">
      {#each sections as section}
        <div 
          class="step {currentSection === section.id ? 'active' : ''}"
          on:click={() => currentSection = section.id}
          role="tab"
          aria-selected={currentSection === section.id}>
          <i class="bi {section.icon}" aria-hidden="true"></i>
          <span>{section.title}</span>
        </div>
      {/each}
    </div>
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
          <label for="nationality" class="form-label">Nationality</label>
          <input 
            {...createInputProps('nationality', 'text', userResponses.personalInfo.nationality)}
            placeholder="Enter your nationality"
          />
        </div>

        <div class="col-md-6">
          <label for="religion" class="form-label">Religion</label>
          <input 
            {...createInputProps('religion', 'text', userResponses.personalInfo.religion)}
            placeholder="Enter your religion"
          />
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

        <div class="col-md-4">
          <label for="ward" class="form-label">Ward</label>
          <input 
            {...createInputProps('ward', 'text', userResponses.personalInfo.ward)}
            placeholder="Enter your ward"
          />
        </div>

        <div class="col-md-6">
          <label for="postalAddress" class="form-label">Postal Address</label>
          <input 
            {...createInputProps('postalAddress', 'text', userResponses.personalInfo.postalAddress)}
            placeholder="P.O. Box XXX-XXXXX"
          />
        </div>

        <div class="col-md-6">
          <label for="residentialAddress" class="form-label">Residential Address</label>
          <input 
            {...createInputProps('residentialAddress', 'text', userResponses.personalInfo.residentialAddress)}
            placeholder="Enter your physical address"
          />
        </div>
      </div>
    </div>
  {/if}



    {#if currentSection === 'education'}
  <div class="form-section animate-in" role="tabpanel">
    <h3><i class="bi bi-book" aria-hidden="true"></i> Education & Skills</h3>
    <div class="row g-4">
      <div class="col-12">
        <div class="form-check">
          <input 
            type="checkbox"
            id="noEducation"
            class="form-check-input"
            bind:checked={userResponses.educationInfo.noFormalEducation}
            on:focus={handleFieldFocus}
            on:blur={(e) => assistiveTools?.handleFieldValidation(e.target)}
          />
          <label class="form-check-label" for="noEducation">
            No Formal Education
          </label>
        </div>
      </div>

      {#if !userResponses.educationInfo.noFormalEducation}
        <div class="col-md-6">
          <label for="highestLevel" class="form-label">Highest Education Level</label>
          <select {...createSelectProps('highestLevel', userResponses.educationInfo.highestLevel)}>
            <option value="">Select Level</option>
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
            placeholder="YYYY"
          />
        </div>

        <div class="col-md-6">
          <label for="specialization" class="form-label">Field of Study/Specialization</label>
          <input 
            {...createInputProps('specialization', 'text', userResponses.educationInfo.specialization)}
            placeholder="Enter your field of study"
          />
        </div>
      {/if}

      <div class="col-12">
        <label for="skills" class="form-label">Skills & Training</label>
        <textarea 
          class="form-control"
          id="skills"
          rows="3"
          bind:value={userResponses.educationInfo.skills}
          placeholder="List your skills, training, or practical experience"
          on:focus={handleFieldFocus}
          on:blur={(e) => assistiveTools?.handleFieldValidation(e.target)}
        ></textarea>
      </div>

      <div class="col-12">
        <label class="form-label">Certificates & Qualifications</label>
        <div class="certificate-uploads">
          {#each userResponses.educationInfo.certificates as cert, index}
            <div class="certificate-item">
              <span>{cert.name}</span>
              <button 
                type="button" 
                class="btn btn-sm btn-danger"
                on:click={() => removeCertificate(index)}
                aria-label="Remove certificate">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          {/each}
          
          <div class="upload-new">
            <input 
              type="file"
              id="certificateUpload"
              accept=".pdf,.jpg,.png"
              on:change={handleCertificateUpload}
              class="form-control"
              aria-label="Upload certificate"
            />
          </div>
        </div>
      </div>

      <div class="col-12">
        <label for="additionalInfo" class="form-label">Additional Information</label>
        <textarea 
          class="form-control"
          id="additionalInfo"
          rows="2"
          bind:value={userResponses.educationInfo.additionalInfo}
          placeholder="Any additional information about your education or training"
          on:focus={handleFieldFocus}
          on:blur={(e) => assistiveTools?.handleFieldValidation(e.target)}
        ></textarea>
      </div>
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
        <label for="kinCounty" class="form-label">County</label>
        <select {...createSelectProps('kinCounty', userResponses.nextOfKin.county)}>
          <option value="">Select County</option>
          {#each counties as county}
            <option value={county}>{county}</option>
          {/each}
        </select>
      </div>

      <div class="col-md-4">
        <label for="kinSubCounty" class="form-label">Sub-County</label>
        <select {...createSelectProps('kinSubCounty', userResponses.nextOfKin.subCounty)}>
          <option value="">Select Sub-County</option>
          {#each locationData[userResponses.nextOfKin.county]?.subCounties || [] as subCounty}
            <option value={subCounty}>{subCounty}</option>
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
            pattern="[0-9]{9}"
            aria-required="true"
          />
        </div>
      </div>

      <div class="col-md-6">
        <label for="kinEmailAddress" class="form-label">Email Address</label>
        <input 
          {...createInputProps('kinEmailAddress', 'email', userResponses.nextOfKin.emailAddress)}
          placeholder="example@email.com"
        />
      </div>

      <div class="col-md-6">
        <label for="kinPostalAddress" class="form-label">Postal Address</label>
        <input 
          {...createInputProps('kinPostalAddress', 'text', userResponses.nextOfKin.postalAddress)}
          placeholder="P.O. Box XXX-XXXXX"
        />
      </div>

      <div class="col-md-12">
        <label for="kinPhysicalAddress" class="form-label">Physical Address</label>
        <input 
          {...createInputProps('kinPhysicalAddress', 'text', userResponses.nextOfKin.physicalAddress)}
          placeholder="Enter physical address"
        />
      </div>

      <div class="col-md-6">
        <label for="kinOccupation" class="form-label">Occupation</label>
        <input 
          {...createInputProps('kinOccupation', 'text', userResponses.nextOfKin.occupation)}
          placeholder="Enter occupation"
        />
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
</div>
<style>

/* Add styles for gesture feedback */
  .gesture-feedback {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 1rem 2rem;
    border-radius: 2rem;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  .gesture-feedback.active {
    opacity: 1;
  }

  /* Add styles for assistive controls */
  .assistive-controls {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    display: flex;
    gap: 1rem;
    z-index: 1000;
  }

  .btn-voice, .btn-help {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #27667B;
    color: white;
    box-shadow: 0 4px 15px rgba(39, 102, 123, 0.3);
  }
  /* Modern Container Styles */
  .registration-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 3rem;
    background: linear-gradient(145deg, #ffffff, #f8f9fa);
    border-radius: 30px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  }

  /* Glassmorphism Form Sections */
  .form-section {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  /* Enhanced Progress Bar */
  .progress-wrapper {
    background: rgba(255, 255, 255, 0.9);
    padding: 2rem;
    border-radius: 20px;
    margin-bottom: 2rem;
  }

  .progress {
    height: 15px !important;
    background: #e9ecef;
    border-radius: 15px;
    overflow: hidden;
  }

  .progress-bar {
    background: linear-gradient(90deg, #27667B, #4CAF50);
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Modern Form Controls */
  .form-control, .form-select {
    padding: 1rem 1.2rem;
    border: 2px solid #e0e0e0;
    border-radius: 15px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.9);
  }

  .form-control:focus, .form-select:focus {
    border-color: #27667B;
    box-shadow: 0 0 0 4px rgba(39, 102, 123, 0.15);
    transform: translateY(-2px);
  }

  /* Floating Labels */
  .form-label {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.7rem;
    transition: all 0.3s ease;
  }

  /* Enhanced Buttons */
  .btn {
    padding: 1rem 2rem;
    border-radius: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-transform: uppercase;
    font-size: 0.9rem;
  }

  .btn-primary {
    background: linear-gradient(135deg, #27667B, #1e4f5f);
    border: none;
    box-shadow: 0 4px 15px rgba(39, 102, 123, 0.2);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(39, 102, 123, 0.3);
  }

  /* Section Navigation */
  .progress-steps {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
    padding: 0 1rem;
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    cursor: pointer;
    transition: all 0.4s ease;
    padding: 1rem;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.6);
  }

  .step.active {
    background: rgba(39, 102, 123, 0.1);
    transform: scale(1.05);
    color: #27667B;
    font-weight: 600;
  }

  /* Animations */
  .animate-in {
    animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .registration-container {
      padding: 1.5rem;
      margin: 1rem;
    }

    .form-section {
      padding: 1.5rem;
    }

    .btn {
      width: 100%;
      margin: 0.5rem 0;
    }
  }

  .form-control.is-valid {
    border-color: #198754;
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
  }

  .completion-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #198754;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .step-icon {
    position: relative;
    width: 40px;
    height: 40px;
    background: #f8f9fa;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }

  .step.complete .step-icon {
    background: #198754;
    color: white;
  }

  .form-section {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .form-section.sliding-out {
    transform: translateX(-100%);
    opacity: 0;
  }

  .form-section.sliding-in {
    transform: translateX(0);
    opacity: 1;
  }

  /* Additional modern styling */
  .invalid-feedback {
    display: block;
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  .form-group {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .form-control:focus {
    box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
  }

  .step.active .step-icon {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

</style>