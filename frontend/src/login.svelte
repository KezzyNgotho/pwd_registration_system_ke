<script>
  import { navigate } from 'svelte-routing';
  import { user } from "../src/authstore.js";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let loading = false;
  let error = null;
  let successMessage = null;

  let userType = 'pwd';
  let formData = {
    identifier: '',
    password: '',
    county: ''
  };
  let showPassword = false;

  const userTypes = [
    { id: 'pwd', label: 'Person with Disability', icon: 'bi-person-wheelchair' },
    { id: 'county', label: 'County Official', icon: 'bi-building' },
    { id: 'health', label: 'Health Officer', icon: 'bi-hospital' }
  ];

  async function handleLogin() {
    loading = true;
    error = null;
    successMessage = null;

    const dashboardRoutes = {
      pwd: '/pwd-dashboard',
      county: '/county-dashboard',
      health: '/health-dashboard'
    };

    try {
      // Simulate login logic
      user.set({
        type: userType,
        ...formData
      });

      // Simulate a delay for the login process
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Set success message
      successMessage = "Login successful! Redirecting...";

      // Redirect to the appropriate dashboard after a short delay
      setTimeout(() => {
        window.location.href = dashboardRoutes[userType];
        dispatch('close');
      }, 1500);
    } catch (err) {
      error = "Login failed. Please try again.";
    } finally {
      loading = false;
    }
  }

  function togglePassword() {
    showPassword = !showPassword;
  }

  function handleClose() {
    dispatch('close');
  }

  // Add keyboard close handler
  function handleKeyClose(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClose();
    }
  }
</script>

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: max(1rem, 2vw);
    z-index: 1050;
    animation: fadeIn 0.3s ease-out;
  }

  .login-modal {
    position: relative;
    width: min(95%, 900px);
    display: grid;
    grid-template-columns: minmax(250px, 1fr) minmax(300px, 1.5fr);
    gap: clamp(1rem, 2vw, 2rem);
    background: white;
    border-radius: clamp(16px, 2vw, 24px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    animation: slideIn 0.3s ease-out;
  }

  .login-left {
    padding: clamp(1.25rem, 3vw, 2.5rem);
    background: linear-gradient(145deg, #27667b, #1e5163);
    color: white;
    display: flex;
    flex-direction: column;
    gap: clamp(1rem, 2vw, 2rem);
  }

  .login-right {
    padding: clamp(1.25rem, 3vw, 2.5rem);
    overflow-y: auto;
    max-height: 85vh;
  }

  .login-header h2 {
    font-size: clamp(1.25rem, 4vw, 1.75rem);
    margin-bottom: 0.5rem;
  }

  .user-type-selector {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .type-button {
    display: flex;
    align-items: center;
    padding: clamp(0.75rem, 1.5vw, 1rem);
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid transparent;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: clamp(0.875rem, 2vw, 1rem);
  }

  .type-button.active {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
  }

  .type-button i {
    font-size: 1.25rem;
    margin-right: 1rem;
  }

  .type-button:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(4px);
  }

  .login-form {
    display: grid;
    gap: 1rem;
  }

  .form-group {
    margin-bottom: 0.5rem;
  }

  .form-group.full-width {
    grid-column: 1/-1;
  }

  .input-wrapper {
    position: relative;
    width: 100%;
  }

  input,
  select {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
  }

  .input-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
  }

  .password-toggle {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
  }

  .login-button {
    width: 100%;
    padding: 0.75rem;
    background: #27667b;
    color: white;
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #27667b;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 10;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  @media (max-width: 768px) {
    .login-modal {
      grid-template-columns: 1fr;
      max-width: 500px;
    }
  }

  @media (max-width: 480px) {
    .modal-overlay {
      padding: 0.5rem;
    }

    input,
    select,
    .type-button {
      padding: 0.75rem;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .login-button {
    width: 100%;
    padding: 0.875rem;
    background: #27667b;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .login-button:not(:disabled):hover {
    background: #1e5163;
    transform: translateY(-1px);
  }

  .login-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .loading-state,
  .default-state {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .error-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.75rem;
    background: #fee2e2;
    color: #dc2626;
    border-radius: 8px;
    font-size: 0.875rem;
    animation: slideIn 0.3s ease-out;
  }

  .success-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.75rem;
    background: #dcfce7;
    color: #16a34a;
    border-radius: 8px;
    font-size: 0.875rem;
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
<div 
  class="modal-overlay" 
  on:click|self={handleClose}
  on:keydown={handleKeyClose}
  role="button"
  tabindex="0"
>
  <div class="login-modal">
    <button class="close-button" aria-label="Close login modal" on:click={handleClose}>×</button>
    <div class="login-left">
      <div class="login-header">
        <h2>Welcome Back</h2>
        <p>Choose your login type</p>
      </div>

      <div class="user-type-selector">
        {#each userTypes as type}
          <button
            class="type-button {userType === type.id ? 'active' : ''}"
            on:click={() => userType = type.id}
            aria-label={`Login as ${type.label}`}
          >
            <i class="bi {type.icon}"></i>
            <span>{type.label}</span>
          </button>
        {/each}
      </div>
    </div>

    <div class="login-right">
      <form on:submit|preventDefault={handleLogin} class="login-form">
        <div class="form-group full-width">
          <label for="identifier">
            {#if userType === 'pwd'}
              National ID Number
            {:else if userType === 'county'}
              County Official ID
            {:else}
              Medical License Number
            {/if}
          </label>
          <div class="input-wrapper">
            <i class="bi bi-person-badge input-icon"></i>
            <input
              type="text"
              id="identifier"
              bind:value={formData.identifier}
              required
              aria-label="Enter your identifier"
            />
          </div>
        </div>

        {#if userType === 'county'}
          <div class="form-group">
            <label for="county">County</label>
            <div class="input-wrapper">
              <i class="bi bi-geo-alt input-icon"></i>
              <select
                id="county"
                bind:value={formData.county}
                required
                aria-label="Select your county"
              >
                <option value="">Select County</option>
                <option value="nairobi">Nairobi</option>
                <option value="mombasa">Mombasa</option>
              </select>
            </div>
          </div>
        {/if}

        <div class="form-group full-width">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <i class="bi bi-lock input-icon"></i>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              bind:value={formData.password}
              required
              aria-label="Enter your password"
            />
            <button
              type="button"
              class="password-toggle"
              on:click={togglePassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <i class="bi {showPassword ? 'bi-eye-slash' : 'bi-eye'}"></i>
            </button>
          </div>
        </div>

        <div class="form-group">
          <label class="remember-me">
            <input type="checkbox" aria-label="Remember me" />
            <span>Remember me</span>
          </label>
        </div>

        <div class="form-group">
          <a href="/forgot-password" class="forgot-link">Forgot Password?</a>
        </div>

        <div class="form-group full-width">
          <button
            type="submit"
            class="login-button"
            disabled={loading}
            aria-label="Login"
          >
            {#if loading}
              <div class="loading-state">
                <i class="bi bi-arrow-repeat spin"></i>
                <span>Logging in...</span>
              </div>
            {:else}
              <div class="default-state">
                <span>Login</span>
                <i class="bi bi-arrow-right"></i>
              </div>
            {/if}
          </button>
        </div>

        {#if error}
          <div class="error-message" role="alert">
            <i class="bi bi-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        {/if}

        {#if successMessage}
          <div class="success-message" role="alert">
            <i class="bi bi-check-circle"></i>
            <span>{successMessage}</span>
          </div>
        {/if}

        <div class="form-group full-width">
          <div class="register-link">
            Don't have an account? <a href="/register">Register Now</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>