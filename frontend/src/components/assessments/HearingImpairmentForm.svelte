<script>
  let history = {
    hearingLoss: '',
    deviceUsage: ''
  };

  let hearingTest = {
    right: {
      type: '',
      degree: ''
    },
    left: {
      type: '',
      degree: ''
    }
  };

  let disabilityCalculation = {
    rightEar: {
      hearingLevel: '',
      monoauralPercentage: ''
    },
    leftEar: {
      hearingLevel: '',
      monoauralPercentage: ''
    },
    binauralPercentage: ''
  };

  let conclusion = {
    temporary: '',
    permanent: '',
    assistiveProducts: '',
    requiredServices: ''
  };
</script>

<div class="hearing-section">
  <h2>Hearing Impairment Assessment</h2>

  <!-- History Table -->
  <!-- History Table -->
<div class="assessment-table">
  <h3>1. History</h3>
  <table>
    <tbody>
      <tr>
        <td class="header-cell">History of Hearing Loss</td>
        <td>
          <textarea rows="2" bind:value={history.hearingLoss}></textarea>
        </td>
      </tr>
      <tr>
        <td class="header-cell">History of Hearing Devices Usage</td>
        <td>
          <textarea rows="2" bind:value={history.deviceUsage}></textarea>
        </td>
      </tr>
    </tbody>
  </table>
</div>

  <!-- Hearing Test Results -->
  <div class="assessment-table">
    <h3>3.0 Hearing Test Results</h3>
    <table>
      <thead>
        <tr>
          <th>Hearing Test</th>
          <th>Right Ear</th>
          <th>Left Ear</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Type of Hearing Loss</td>
          <td><input type="text" bind:value={hearingTest.right.type}></td>
          <td><input type="text" bind:value={hearingTest.left.type}></td>
        </tr>
        <tr>
          <td>Degree (Grade) of Hearing Loss</td>
          <td><input type="text" bind:value={hearingTest.right.degree}></td>
          <td><input type="text" bind:value={hearingTest.left.degree}></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Disability Calculation -->
  <div class="assessment-table">
    <h3>4.0 Calculation of Hearing Disability</h3>
    <table>
      <thead>
        <tr>
          <th>Ear</th>
          <th>Hearing Level in dBHL</th>
          <th>Monoaural Percentage of Disability</th>
          <th>Overall (Binaural) Percentage of Disability</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Right Ear</td>
          <td><input type="text" bind:value={disabilityCalculation.rightEar.hearingLevel}></td>
          <td><input type="text" bind:value={disabilityCalculation.rightEar.monoauralPercentage}></td>
          <td rowspan="2"><input type="text" bind:value={disabilityCalculation.binauralPercentage}></td>
        </tr>
        <tr>
          <td>Left Ear</td>
          <td><input type="text" bind:value={disabilityCalculation.leftEar.hearingLevel}></td>
          <td><input type="text" bind:value={disabilityCalculation.leftEar.monoauralPercentage}></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Conclusion Section -->
  <div class="conclusion">
    <h3>CONCLUSION</h3>
    
    <div class="conclusion-grid">
      <div class="conclusion-box">
        <h4>TEMPORARY</h4>
        <textarea bind:value={conclusion.temporary}></textarea>
      </div>
      
      <div class="conclusion-box">
        <h4>PERMANENT</h4>
        <textarea bind:value={conclusion.permanent}></textarea>
      </div>
    </div>

    <div class="recommendations">
      <div class="dotted-field">
    <label for="assistive-products">RECOMMENDED ASSISTIVE PRODUCT(S)</label>
    <input 
      id="assistive-products"
      type="text" 
      bind:value={conclusion.assistiveProducts}
    >
      </div>

      <div class="dotted-field">
  <label for="required-services">OTHER REQUIRED SERVICES</label>
    <input 
      id="required-services"
      type="text" 
      bind:value={conclusion.requiredServices}
    >
      </div>
    </div>
  </div>
</div>
<style>
  .hearing-section {
    padding: 2rem;
  }

  .assessment-table {
    margin-bottom: 2rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  th, td {
    padding: 0.75rem;
    border: 1px solid #ddd;
  }

  .header-cell {
    background: #f5f5f5;
    font-weight: bold;
    width: 30%;
  }

  th {
    background: #f5f5f5;
    text-align: left;
  }

  input[type="text"], textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
  }

  .conclusion-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 1rem 0;
  }

  .conclusion-box {
    padding: 1rem;
    background: #f9f9f9;
  }

  .dotted-field {
    margin: 1rem 0;
  }

  .dotted-field input {
    width: 100%;
    border: none;
    border-bottom: 1px dotted #000;
    padding: 0.5rem 0;
  }

  .dotted-field label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
</style>
