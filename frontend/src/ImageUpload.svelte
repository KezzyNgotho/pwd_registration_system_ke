<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let imageUrl = "../src/assets/icons8-user-50.png";
  
  let fileInput;

  function triggerFileInput() {
    if (fileInput) {
      fileInput.click();
    }
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      imageUrl = URL.createObjectURL(file);
    }
  }

  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageUrl = e.target.result;
        dispatch('imageSelected', { file, imageUrl });
      };
      reader.readAsDataURL(file);
    }
  }

   
</script>

<div class="image-upload">
  <div 
  class="avatar-container" 
  role="button"
  tabindex="0"
  aria-label="Upload profile picture"
  on:click={triggerFileInput} 
  on:keydown={(e) => e.key === 'Enter' && triggerFileInput()}
>
  <img src={imageUrl} alt="User avatar" class="avatar-image"/>
  <div class="upload-overlay">
    <i class="bi bi-camera" aria-hidden="true"></i>
  </div>
</div>

  <input
    bind:this={fileInput}
    type="file"
    accept="image/*"
    on:change={handleFileSelect}
    style="display: none"
  />
</div>

<style>
  .image-upload {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }

  .avatar-container {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
  }

  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .upload-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .upload-overlay i {
    color: white;
    font-size: 1.5rem;
  }

  .avatar-container:hover .upload-overlay {
    opacity: 1;
  }
</style>
