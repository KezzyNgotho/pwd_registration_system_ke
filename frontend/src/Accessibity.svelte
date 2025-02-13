<script>
  import { fade } from 'svelte/transition';
  import { FaUniversalAccess, FaEye, FaHandPaper, FaTextHeight, FaAdjust, FaMoon, FaKeyboard } from 'svelte-icons/fa';

  let showModal = false;
  let selectedOption = null;
  
  const accessibilityOptions = [
    { icon: FaEye, title: 'High Contrast', key: 'contrast' },
    { icon: FaHandPaper, title: 'Focus Mode', key: 'focus' },
    { icon: FaTextHeight, title: 'Text Size', key: 'textSize' },
    { icon: FaAdjust, title: 'Saturation', key: 'saturation' },
    { icon: FaMoon, title: 'Dark Mode', key: 'darkMode' },
    { icon: FaKeyboard, title: 'Keyboard Nav', key: 'keyboard' }
  ];

  function handleOptionSelect(key) {
    selectedOption = selectedOption === key ? null : key;
    // Add your accessibility implementation logic here
  }
</script>

<style>
  .accessibility-trigger {
    position: fixed;
    right: 20px;
    bottom: 20px;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    display: grid;
    place-items: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: transform 0.2s ease;
    z-index: 999;
  }

  .accessibility-trigger:hover {
    transform: scale(1.05);
  }

  .modal {
    position: fixed;
    right: 20px;
    bottom: 85px;
    background: white;
    border-radius: 12px;
    padding: 20px;
    width: 320px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    z-index: 1000;
  }

  .options-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-top: 15px;
  }

  .option {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }

  .option:hover {
    background: #f3f4f6;
  }

  .option.active {
    background: #e0e7ff;
    color: #4f46e5;
    border-color: #4f46e5;
  }

  .icon-wrapper {
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
  }

  .title {
    font-size: 12px;
    text-align: center;
    font-weight: 500;
  }
</style>

<button 
  class="accessibility-trigger" 
  on:click={() => showModal = !showModal}
  aria-label="Open accessibility options"
>
  <div class="icon-wrapper">
    <FaUniversalAccess />
  </div>
</button>

{#if showModal}
  <div 
    class="modal" 
    transition:fade={{ duration: 200 }}
    role="dialog"
    aria-labelledby="accessibility-modal-title"
  >
    <h3 id="accessibility-modal-title">Accessibility Options</h3>
    <div class="options-grid">
      {#each accessibilityOptions as option}
        <div 
          class="option"
          class:active={selectedOption === option.key}
          on:click={() => handleOptionSelect(option.key)}
          role="button"
          tabindex="0"
          on:keydown={(e) => e.key === 'Enter' && handleOptionSelect(option.key)}
          aria-pressed={selectedOption === option.key}
        >
          <div class="icon-wrapper">
            <svelte:component this={option.icon} />
          </div>
          <span class="title">{option.title}</span>
        </div>
      {/each}
    </div>
  </div>
{/if}