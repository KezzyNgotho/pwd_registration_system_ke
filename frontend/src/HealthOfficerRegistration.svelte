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

  // Form Data
  let formData = {
    nationalId: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    email: '',
    hospitalId: '',
    medicalLicenseNumber: '',
    specialization: ''
  };

  const specializations = [
    'General Medicine',
    'Orthopedics',
    'Ophthalmology',
    'Psychiatry',
    'Neurology',
    'Physical Medicine'
  ];

  function handleSubmit() {
    // Handle health officer registration
    console.log('Form submitted:', formData);
  }

  function handleInputChange(field, value) {
    formData[field] = value;
  }

  function handleFieldFocus(event) {
    if (disability === 'visual') {
      speakText(event.target.getAttribute('aria-label') || event.target.placeholder);
    }
  }

  function speakText(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  }
</script>

<div class="container-fluid bg-light min-vh-100 d-flex align-items-center py-5">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10 col-lg-8">
        <div class="card border-0 shadow-lg">
          <div class="card-body p-5">
            <!-- Header Section remains unchanged -->

            <!-- Registration Form -->
            <form on:submit|preventDefault={handleSubmit}>
              <div class="row g-4">
                <!-- First Row -->
                <div class="col-md-6">
                  <div class="form-floating">
                    <input 
                      type="text" 
                      class="form-control" 
                      id="nationalId"
                      placeholder="National ID"
                      bind:value={formData.nationalId}
                      required
                      pattern="[0-9]{8}"
                      on:focus={handleFieldFocus}
                      on:blur={(e) => assistiveTools?.handleFieldValidation(e.target)}
                    >
                    <label for="nationalId">
                      <i class="bi bi-person-badge me-2"></i>
                      National ID Number
                    </label>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-floating">
                    <input 
                      type="text" 
                      class="form-control" 
                      id="medicalLicenseNumber"
                      placeholder="Medical License Number"
                      bind:value={formData.medicalLicenseNumber}
                      required
                      on:focus={handleFieldFocus}
                      on:blur={(e) => assistiveTools?.handleFieldValidation(e.target)}
                    >
                    <label for="medicalLicenseNumber">
                      <i class="bi bi-file-medical me-2"></i>
                      Medical License Number
                    </label>
                  </div>
                </div>

                <!-- Second Row -->
                <div class="col-md-6">
                  <div class="form-floating">
                    <input 
                      type="text" 
                      class="form-control" 
                      id="hospitalId"
                      placeholder="Hospital ID"
                      bind:value={formData.hospitalId}
                      required
                      on:focus={handleFieldFocus}
                      on:blur={(e) => assistiveTools?.handleFieldValidation(e.target)}
                    >
                    <label for="hospitalId">
                      <i class="bi bi-building-add me-2"></i>
                      Hospital ID
                    </label>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-floating">
                    <select 
                      class="form-select" 
                      id="specialization"
                      bind:value={formData.specialization}
                      required
                      on:focus={handleFieldFocus}
                      on:blur={(e) => assistiveTools?.handleFieldValidation(e.target)}
                    >
                      <option value="">Select specialization</option>
                      {#each specializations as specialization}
                        <option value={specialization}>{specialization}</option>
                      {/each}
                    </select>
                    <label for="specialization">
                      <i class="bi bi-stars me-2"></i>
                      Specialization
                    </label>
                  </div>
                </div>

                <!-- Third Row -->
                <div class="col-md-6">
                  <div class="form-floating">
                    <input 
                      type="password" 
                      class="form-control" 
                      id="password"
                      placeholder="Password"
                      bind:value={formData.password}
                      required
                      minlength="8"
                      on:focus={handleFieldFocus}
                      on:blur={(e) => assistiveTools?.handleFieldValidation(e.target)}
                    >
                    <label for="password">
                      <i class="bi bi-lock me-2"></i>
                      Password
                    </label>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-floating">
                    <input 
                      type="password" 
                      class="form-control" 
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      bind:value={formData.confirmPassword}
                      required
                      on:focus={handleFieldFocus}
                      on:blur={(e) => assistiveTools?.handleFieldValidation(e.target)}
                    >
                    <label for="confirmPassword">
                      <i class="bi bi-lock-check me-2"></i>
                      Confirm Password
                    </label>
                  </div>
                </div>

                <!-- Fourth Row -->
                <div class="col-md-6">
                  <div class="form-floating">
                    <input 
                      type="tel" 
                      class="form-control" 
                      id="mobile"
                      placeholder="Mobile Number"
                      bind:value={formData.mobile}
                      required
                      pattern="[0-9]{10}"
                      on:focus={handleFieldFocus}
                      on:blur={(e) => assistiveTools?.handleFieldValidation(e.target)}
                    >
                    <label for="mobile">
                      <i class="bi bi-phone me-2"></i>
                      Mobile Number
                    </label>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-floating">
                    <input 
                      type="email" 
                      class="form-control" 
                      id="email"
                      placeholder="Email Address"
                      bind:value={formData.email}
                      required
                      on:focus={handleFieldFocus}
                      on:blur={(e) => assistiveTools?.handleFieldValidation(e.target)}
                    >
                    <label for="email">
                      <i class="bi bi-envelope me-2"></i>
                      Email Address
                    </label>
                  </div>
                </div>
              </div>

              <!-- Submit Button and Login Link remain unchanged -->
                <button type="submit" class="btn btn-primary w-100 py-3 mb-3">
                <i class="bi bi-check-circle me-2"></i>
                Complete Registration
              </button>

              <!-- Login Link -->
              <p class="text-center mb-0">
                Already registered? 
                <a href="/login" class="text-decoration-none">Login here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
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
</style>