<script>
  import { onMount } from 'svelte';
  import { AssistiveTools } from '../src/Assistive.js';
  import { counties } from '/home/keziah/pwd_reg_system/frontend/src/data/counties.js';

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
    county: ''
  };

  function handleSubmit() {
    // Handle county officer registration
    console.log('Form Data Submitted:', formData);
  }

  // Helper Functions from the first example
  function createInputProps(name, type, value) {
    return {
      id: name,
      type,
      value,
      class: 'form-control',
      'on:input': (e) => formData[name] = e.target.value,
      'on:focus': handleFieldFocus,
      'on:blur': (e) => assistiveTools?.handleFieldValidation(e.target)
    };
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

<div class="page-container {disability}-mode" role="form">
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

  <div class="registration-container animate-in">
    <div class="form-section">
      <div class="illustration">
        <img src="/assets/register-illustration.svg" alt="Registration Illustration">
      </div>
      
      <h2 class="form-label text-center">County Officer Registration</h2>
      <p class="text-muted text-center">Complete your registration to access the system</p>

      <form class="registration-form" on:submit|preventDefault={handleSubmit}>
        <div class="row g-4">
          <div class="col-md-6">
            <div class="form-floating">
              <input {...createInputProps('nationalId', 'text', formData.nationalId)} placeholder="National ID" required pattern="[0-9]{8}">
              <label for="nationalId"><i class="bi bi-person-badge me-2"></i> National ID Number</label>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-floating">
              <input {...createInputProps('mobile', 'tel', formData.mobile)} placeholder="Mobile Number" required pattern="[0-9]{10}">
              <label for="mobile"><i class="bi bi-phone me-2"></i> Mobile Number</label>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-floating">
              <input {...createInputProps('email', 'email', formData.email)} placeholder="Email Address" required>
              <label for="email"><i class="bi bi-envelope me-2"></i> Email Address</label>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-floating">
              <select class="form-select" id="county" bind:value={formData.county} required>
                <option value="">Select your county</option>
                {#each counties as county}
                  <option value={county.id}>{county.name}</option>
                {/each}
              </select>
              <label for="county"><i class="bi bi-geo-alt me-2"></i> County</label>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-floating">
              <input {...createInputProps('password', 'password', formData.password)} placeholder="Password" required minlength="8">
              <label for="password"><i class="bi bi-lock me-2"></i> Password</label>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-floating">
              <input {...createInputProps('confirmPassword', 'password', formData.confirmPassword)} placeholder="Confirm Password" required>
              <label for="confirmPassword"><i class="bi bi-lock-check me-2"></i> Confirm Password</label>
            </div>
          </div>
        </div>

        <div class="text-center mt-4">
          <button type="submit" class="btn btn-primary w-100 py-3 mb-3">
            <i class="bi bi-check-circle me-2"></i> Complete Registration
          </button>
          <p class="mb-0">Already registered? <a href="/login" class="text-decoration-none">Login here</a></p>
        </div>
      </form>
    </div>
  </div>
</div>

<style>
  /* Full-page container */
  .page-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #e3f2fd, #bbdefb);
    padding: 2rem;
  }

  /* Registration Container */
  .registration-container {
    max-width: 600px;
    padding: 3rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  /* Illustration */
  .illustration {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .illustration img {
    max-width: 150px;
    opacity: 0.9;
  }

  /* Glassmorphism Form */
  .form-section {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
  }

  /* Floating Labels */
  .form-control, .form-select {
    padding: 1rem 1.2rem;
    border: 2px solid #e0e0e0;
    border-radius: 15px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .form-control:focus, .form-select:focus {
    border-color: #27667B;
    box-shadow: 0 0 0 4px rgba(39, 102, 123, 0.15);
    transform: translateY(-2px);
  }

  /* Buttons */
  .btn {
    padding: 1rem 2rem;
    border-radius: 15px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .btn-primary {
    background: linear-gradient(135deg, #27667B, #1e4f5f);
    border: none;
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(39, 102, 123, 0.3);
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

  /* Responsive */
  @media (max-width: 768px) {
    .registration-container {
      padding: 2rem;
    }

    .form-section {
      padding: 2rem;
    }
  }
</style>