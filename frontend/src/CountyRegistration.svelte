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
    countyOfBirth: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    mobile: ''
  };

  // Counties Data
  const counties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Kiambu', 'Machakos', 'Kajiado', 'Uasin Gishu'
  ];

  // Helper Functions
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

  function handleSubmit() {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Form Data Submitted:', formData);
  }
</script>

<div class="page-wrapper">
  <div class="header-section">
    <div class="form-header">
      <h2>County Registration</h2>
      <p>Complete your registration details below</p>
    </div>
    <button class="close-button"  on:click={() => window.location.href = '/'}>
      <i class="bi bi-x-lg"></i>
    </button>
  </div>

    <form class="registration-form" on:submit|preventDefault={handleSubmit}>
    <div class="form-header-container">
 
</div>
      <!-- Row 1: ID and County -->
      <div class="form-row">
        <div class="form-group">
          <div class="form-floating">
            <input {...createInputProps('nationalId', 'text', formData.nationalId)} 
                   placeholder="National ID" required pattern="[0-9]{8}"/>
            <label for="nationalId">
              <i class="bi bi-person-badge"></i> National ID
            </label>
          </div>
        </div>

        <div class="form-group">
          <div class="form-floating">
            <select id="countyOfBirth" class="form-select" 
                    bind:value={formData.countyOfBirth} required>
              <option value="">Select County</option>
              {#each counties as county}
                <option value={county}>{county}</option>
              {/each}
            </select>
            <label for="countyOfBirth">
              <i class="bi bi-geo-alt"></i> County of Birth
            </label>
          </div>
        </div>
      </div>

      <!-- Row 2: Name and Email -->
      <div class="form-row">
        <div class="form-group">
          <div class="form-floating">
            <input {...createInputProps('fullName', 'text', formData.fullName)} 
                   placeholder="Full Name" required/>
            <label for="fullName">
              <i class="bi bi-person"></i> Full Name
            </label>
          </div>
        </div>

        <div class="form-group">
          <div class="form-floating">
            <input {...createInputProps('email', 'email', formData.email)} 
                   placeholder="Email" required/>
            <label for="email">
              <i class="bi bi-envelope"></i> Email Address
            </label>
          </div>
        </div>
      </div>

      <!-- Row 3: Mobile -->
     <!-- Row 3: Mobile -->
      <div class="form-row mobile-row">
        <div class="form-group mobile-group">
          <div class="form-floating mobile-container">
            <div class="input-group">
              <span class="input-group-text">+254</span>
              <input {...createInputProps('mobile', 'tel', formData.mobile)} 
                    placeholder="Mobile Number" 
                    required 
                    pattern="[0-9]{9}"
                    maxlength="9"/>
            </div>
          </div>
        </div>
      </div>

      

      <!-- Row 4: Passwords -->
      <div class="form-row">
        <div class="form-group">
          <div class="form-floating">
            <input {...createInputProps('password', 'password', formData.password)} 
                   placeholder="Password" required minlength="8"/>
            <label for="password">
              <i class="bi bi-lock"></i> Password
            </label>
          </div>
        </div>

        <div class="form-group">
          <div class="form-floating">
            <input {...createInputProps('confirmPassword', 'password', formData.confirmPassword)} 
                   placeholder="Confirm Password" required/>
            <label for="confirmPassword">
              <i class="bi bi-lock-check"></i> Confirm Password
            </label>
          </div>
        </div>
      </div>

      <button type="submit" class="submit-button">
        <i class="bi bi-check-circle"></i> Complete Registration
      </button>

      <div class="login-link">
        Already registered? <a href="/login">Login here</a>
      </div>
    </form>
  </div>

<style>

.header-section {
  width: 100%;
  max-width: 2000px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.8rem;
  padding: 0 1rem;
}

.close-button {
  background: none;
  border: none;
  color: #27667B;
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
}

.close-button:hover {
  background: rgba(39, 102, 123, 0.1);
  transform: scale(1.1);
}

.form-header {
  text-align: center;
  flex-grow: 1;
}
  .page-wrapper {
    min-height: 85vh;
    width: 100%;
    background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 0.5rem;
  }

 

  .form-header h2 {
    font-size: 2.4rem;
    color: #27667B;
    margin-bottom: 0.4rem;
    font-weight: 600;
    letter-spacing: -0.5px;
  }

  .registration-form {
    width: 99%;
    max-width: 2000px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }

  .form-row {
    display: flex;
    gap: 2.5rem;
    margin-bottom: 1.8rem;
    width: 100%;
  }
 .form-row1 {
    display: flex;
    gap: 4.5rem;
    margin-bottom: 1.8rem;
    width: 100%;
  }
  .form-group {
    flex: 1;
    min-width: 450px;
  }

  .form-control, .form-select {
    width: 100%;
    height: 3.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid #27667B;
    border-radius: 8px;
    font-size: 1.05rem;
    transition: all 0.2s ease;
    background: #ffffff;
  }

  .input-group {
    display: flex;
    height: 3.4rem;
    width: 100%;
  }

  .input-group-text {
    min-width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    border: 1px solid #27667B;
    border-right: none;
    border-radius: 8px 0 0 8px;
    color: #64748b;
    font-weight: 500;
    font-size: 1.05rem;
  }

  .submit-button {
    width: 100%;
    padding: 1.1rem;
    background: #27667B;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.15rem;
    font-weight: 500;
    margin-top: 2.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  @media (max-width: 1600px) {
    .form-group {
      min-width: 400px;
    }
    .registration-form {
      max-width: 1800px;
    }
  }

  @media (max-width: 1200px) {
    .form-group {
      min-width: 350px;
    }
  }
  .mobile-row {
    margin-bottom: 2.5rem;
    width: 100%;
  }

  .mobile-group {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .mobile-container {
    width: 100%;
  }

  .mobile-container .input-group {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .mobile-container .input-group-text {
    min-width: 80px;
    background: #f8fafc;
    border: 1px solid #e0e0e0;
    border-right: none;
    border-radius: 8px 0 0 8px;
    height: 3.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: #64748b;
  }

  .mobile-container .form-control {
    flex: 1;
    border-left: none;
    border-radius: 0 8px 8px 0;
  }

   /* Responsive Design Updates */
  @media (max-width: 1600px) {
    .registration-form {
      max-width: 1400px;
      padding: 2rem;
    }
    .form-group {
      min-width: 350px;
    }
    .form-header h2 {
      font-size: 2.2rem;
    }
  }

  @media (max-width: 1200px) {
    .registration-form {
      max-width: 1000px;
      padding: 1.8rem;
    }
    .form-group {
      min-width: 300px;
    }
    .form-row {
      gap: 1.5rem;
    }
  }

  @media (max-width: 992px) {
    .registration-form {
      width: 95%;
      padding: 1.5rem;
    }
    .form-row {
      flex-direction: column;
      gap: 1.2rem;
    }
    .form-group {
      min-width: 100%;
    }
    .form-header h2 {
      font-size: 2rem;
    }
  }

  @media (max-width: 768px) {
    .page-wrapper {
      padding: 1rem 0.5rem;
    }
    .registration-form {
      width: 92%;
      padding: 1.2rem;
    }
    .form-header h2 {
      font-size: 1.8rem;
    }
    .header-section {
      padding: 0 0.5rem;
    }
    .close-button {
      font-size: 1.5rem;
      width: 40px;
      height: 40px;
    }
    .submit-button {
      padding: 0.9rem;
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .registration-form {
      width: 90%;
      padding: 1rem;
    }
    .form-control, .form-select {
      height: 3rem;
      font-size: 0.95rem;
    }
    .input-group-text {
      min-width: 60px;
      font-size: 0.9rem;
    }
    .form-header h2 {
      font-size: 1.6rem;
    }
  }
</style>
