<script>
  let medicalHistory = {
    condition: '',
    duration: '',
    treatment: '',
    currentStatus: ''
  };

  let dentalHistory = {
    previousTreatments: '',
    oralHygiene: '', 
    currentComplaints: ''
  };

  let dentalAssessment = {
    occlusion: '',
    tmj: '',
    softTissues: ''
  };

  let conclusion = {
    temporary: '',
    permanent: '',
    assistiveProducts: '',
    otherServices: ''
  };
</script>

<!-- Medical History Table -->
<div class="summary-table">
  <h3>Medical History</h3>
  <table>
    <thead>
      <tr>
        <th id="condition-header">Condition</th>
        <th id="duration-header">Duration</th>
        <th id="treatment-header">Treatment</th>
        <th id="status-header">Current Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <input 
            type="text" 
            id="condition-input"
            aria-labelledby="condition-header"
            bind:value={medicalHistory.condition}
          >
        </td>
        <td>
          <input 
            type="text" 
            id="duration-input"
            aria-labelledby="duration-header"
            bind:value={medicalHistory.duration}
          >
        </td>
        <td>
          <input 
            type="text" 
            id="treatment-input"
            aria-labelledby="treatment-header"
            bind:value={medicalHistory.treatment}
          >
        </td>
        <td>
          <input 
            type="text" 
            id="status-input"
            aria-labelledby="status-header"
            bind:value={medicalHistory.currentStatus}
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Dental History Table -->
<div class="summary-table">
  <h3>Dental History</h3>
  <table>
    <thead>
      <tr>
        <th id="prev-treatments-header">Previous Treatments</th>
        <th id="oral-hygiene-header">Oral Hygiene</th>
        <th id="complaints-header">Current Complaints</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <input 
            type="text" 
            id="prev-treatments-input"
            aria-labelledby="prev-treatments-header"
            bind:value={dentalHistory.previousTreatments}
          >
        </td>
        <td>
          <input 
            type="text" 
            id="oral-hygiene-input"
            aria-labelledby="oral-hygiene-header"
            bind:value={dentalHistory.oralHygiene}
          >
        </td>
        <td>
          <input 
            type="text" 
            id="complaints-input"
            aria-labelledby="complaints-header"
            bind:value={dentalHistory.currentComplaints}
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Dental Assessment Table -->
<div class="summary-table">
  <h3>Dental Assessment</h3>
  <table>
    <thead>
      <tr>
        <th id="occlusion-header">Occlusion</th>
        <th id="tmj-header">TMJ</th>
        <th id="soft-tissues-header">Soft Tissues</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <input 
            type="text" 
            id="occlusion-input"
            aria-labelledby="occlusion-header"
            bind:value={dentalAssessment.occlusion}
          >
        </td>
        <td>
          <input 
            type="text" 
            id="tmj-input"
            aria-labelledby="tmj-header"
            bind:value={dentalAssessment.tmj}
          >
        </td>
        <td>
          <input 
            type="text" 
            id="soft-tissues-input"
            aria-labelledby="soft-tissues-header"
            bind:value={dentalAssessment.softTissues}
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Conclusion Section -->
<div class="conclusion">
  <h3>CONCLUSION</h3>
  <div class="conclusion-grid">
    <div class="conclusion-box">
      <label for="temporary-conclusion">TEMPORARY</label>
      <textarea 
        id="temporary-conclusion"
        bind:value={conclusion.temporary}
      ></textarea>
    </div>
    
    <div class="conclusion-box">
      <label for="permanent-conclusion">PERMANENT</label>
      <textarea 
        id="permanent-conclusion"
        bind:value={conclusion.permanent}
      ></textarea>
    </div>
  </div>

  <div class="recommendations">
    <div class="dotted-field">
      <label for="assistive-products">RECOMMENDED ASSISTIVE PRODUCT(S)</label>
      <input 
        type="text" 
        id="assistive-products"
        bind:value={conclusion.assistiveProducts}
      >
    </div>

    <div class="dotted-field">
      <label for="other-services">OTHER SERVICES REQUIRED</label>
      <input 
        type="text" 
        id="other-services"
        bind:value={conclusion.otherServices}
      >
    </div>
  </div>
</div>

<style>
 
  .summary-table {
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

  th {
    background: #f5f5f5;
    text-align: left;
  }

  input[type="text"] {
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

  textarea {
    width: 100%;
    min-height: 100px;
    padding: 0.5rem;
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
