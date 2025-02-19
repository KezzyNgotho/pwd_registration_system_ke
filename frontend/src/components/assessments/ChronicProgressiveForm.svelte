<script>
  let formData = {
    medicalHistory: {
      onsetDate: '',
      lastIntervention: '',
      interventions: '',
      disabilityCause: ''
    },
    structuralDetails: {
      impairments: '',
      affectedRegions: ''
    },
    impairmentAssessment: {
      cardiopulmonary: { findings: '', score: '', remarks: '' },
      respiratory: { findings: '', score: '', remarks: '' },
      musculoskeletal: { findings: '', score: '', remarks: '' },
      neurological: { findings: '', score: '', remarks: '' }
    },
    healthConditions: {
      vascular: false,
      genitoUrinary: false,
      frailty: false,
      other: ''
    },
    functioning: {
      mobility: { score: '', remarks: '' },
      selfCare: { score: '', remarks: '' },
      domesticLife: { score: '', remarks: '' },
      majorLifeAreas: { score: '', remarks: '' },
      communityLife: { score: '', remarks: '' }
    },
    disabilityRating: '',
    conclusion: {
      status: '',
      assistiveProducts: '',
      otherServices: '',
      verification: ''
    }
  };

  const impairmentLevels = ['No Impairment', 'Mild Impairment', 'Moderate Impairment', 'Severe Impairment', 'Complete Impairment'];
  const difficultyLevels = ['No Difficulty', 'Mild', 'Moderate', 'Severe', 'Complete'];
  const assessmentAreas = ['cardiopulmonary', 'respiratory', 'musculoskeletal', 'neurological'];
  const functioningAreas = ['mobility', 'selfCare', 'domesticLife', 'majorLifeAreas', 'communityLife'];
</script>
<div class="assessment-form">
  <!-- Medical History Section -->
  <section aria-labelledby="medical-history-title">
    <h3 id="medical-history-title">Medical History</h3>
    <table>
      <tbody>
        <tr>
          <td><label for="onset-date">Date of Onset</label></td>
          <td>
            <input 
              type="date" 
              id="onset-date"
              bind:value={formData.medicalHistory.onsetDate}
              aria-required="true"
            >
          </td>
        </tr>
        <tr>
          <td><label for="last-intervention">Last Intervention</label></td>
          <td>
            <input 
              type="date" 
              id="last-intervention"
              bind:value={formData.medicalHistory.lastIntervention}
              aria-required="true"
            >
          </td>
        </tr>
        <tr>
          <td><label for="interventions">Interventions</label></td>
          <td>
            <textarea 
              id="interventions"
              bind:value={formData.medicalHistory.interventions}
              aria-required="true"
            ></textarea>
          </td>
        </tr>
        <tr>
          <td><label for="disability-cause">Cause</label></td>
          <td>
            <input 
              type="text" 
              id="disability-cause"
              bind:value={formData.medicalHistory.disabilityCause}
              aria-required="true"
            >
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <!-- Structural Details Section -->
  <section aria-labelledby="structural-details-title">
    <h3 id="structural-details-title">Structural Details</h3>
    <div class="input-group">
      <label for="structural-impairments">Structural Impairments</label>
      <textarea 
        id="structural-impairments"
        bind:value={formData.structuralDetails.impairments}
        aria-required="true"
      ></textarea>
    </div>
    <div class="input-group">
      <label for="affected-regions">Affected Regions</label>
      <textarea 
        id="affected-regions"
        bind:value={formData.structuralDetails.affectedRegions}
        aria-required="true"
      ></textarea>
    </div>
  </section>

  <!-- Impairment Assessment Section -->
  <section aria-labelledby="impairment-assessment-title">
    <h3 id="impairment-assessment-title">Impairment Assessment</h3>
    <table>
      <thead>
        <tr>
          <th scope="col">Area</th>
          <th scope="col">Findings</th>
          <th scope="col">Score</th>
          <th scope="col">Remarks</th>
        </tr>
      </thead>
      <tbody>
        {#each assessmentAreas as area}
          <tr>
            <th scope="row">{area}</th>
            <td>
              <input 
                type="text" 
                id={`${area}-findings`}
                bind:value={formData.impairmentAssessment[area].findings}
                aria-label={`${area} findings`}
              >
            </td>
            <td>
              <select 
                id={`${area}-score`}
                bind:value={formData.impairmentAssessment[area].score}
                aria-label={`${area} score`}
              >
                {#each impairmentLevels as level}
                  <option value={level}>{level}</option>
                {/each}
              </select>
            </td>
            <td>
              <input 
                type="text" 
                id={`${area}-remarks`}
                bind:value={formData.impairmentAssessment[area].remarks}
                aria-label={`${area} remarks`}
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>

  <!-- Health Conditions Section -->
  <section aria-labelledby="health-conditions-title">
    <h3 id="health-conditions-title">Additional Health Conditions</h3>
    <div class="checkbox-group" role="group" aria-labelledby="health-conditions-title">
      <label for="vascular-condition">
        <input 
          type="checkbox" 
          id="vascular-condition"
          bind:checked={formData.healthConditions.vascular}
        >
        Vascular Conditions
      </label>
      <label for="genito-urinary">
        <input 
          type="checkbox" 
          id="genito-urinary"
          bind:checked={formData.healthConditions.genitoUrinary}
        >
        Genito-Urinary
      </label>
      <label for="frailty">
        <input 
          type="checkbox" 
          id="frailty"
          bind:checked={formData.healthConditions.frailty}
        >
        Frailty
      </label>
      <div class="input-group">
        <label for="other-conditions">Other</label>
        <input 
          type="text" 
          id="other-conditions"
          bind:value={formData.healthConditions.other}
        >
      </div>
    </div>
  </section>

  <!-- Function and Participation Section -->
  <section aria-labelledby="function-participation-title">
    <h3 id="function-participation-title">Function and Participation</h3>
    <table>
      <thead>
        <tr>
          <th scope="col">Area</th>
          <th scope="col">Difficulty Level</th>
          <th scope="col">Remarks</th>
        </tr>
      </thead>
      <tbody>
        {#each functioningAreas as area}
          <tr>
            <th scope="row">{area}</th>
            <td>
              <select 
                id={`${area}-difficulty`}
                bind:value={formData.functioning[area].score}
                aria-label={`${area} difficulty level`}
              >
                {#each difficultyLevels as level}
                  <option value={level}>{level}</option>
                {/each}
              </select>
            </td>
            <td>
              <input 
                type="text" 
                id={`${area}-remarks`}
                bind:value={formData.functioning[area].remarks}
                aria-label={`${area} remarks`}
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>

  <!-- Disability Rating Section -->
  <section aria-labelledby="disability-rating-title">
    <h3 id="disability-rating-title">Disability Rating</h3>
    <select 
      id="disability-rating"
      bind:value={formData.disabilityRating}
      aria-required="true"
    >
      {#each impairmentLevels as level}
        <option value={level}>{level}</option>
      {/each}
    </select>
  </section>

  <!-- Conclusion Section -->
  <section aria-labelledby="conclusion-title">
    <h3 id="conclusion-title">Conclusion</h3>
    <div class="radio-group" role="radiogroup" aria-labelledby="conclusion-title">
      <label for="temporary-status">
        <input 
          type="radio" 
          id="temporary-status"
          bind:group={formData.conclusion.status} 
          value="temporary"
        >
        Temporary
      </label>
      <label for="permanent-status">
        <input 
          type="radio" 
          id="permanent-status"
          bind:group={formData.conclusion.status} 
          value="permanent"
        >
        Permanent
      </label>
    </div>
    <div class="input-group">
      <label for="assistive-products">Assistive Products</label>
      <textarea 
        id="assistive-products"
        bind:value={formData.conclusion.assistiveProducts}
        aria-required="true"
      ></textarea>
    </div>
    <div class="input-group">
      <label for="other-services">Other Services</label>
      <textarea 
        id="other-services"
        bind:value={formData.conclusion.otherServices}
        aria-required="true"
      ></textarea>
    </div>
    <div class="input-group">
      <label for="verification">Verification</label>
      <input 
        type="text" 
        id="verification"
        bind:value={formData.conclusion.verification}
        aria-required="true"
      >
    </div>
  </section>
</div>


<style>
  .assessment-form {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
  section {
    margin-bottom: 30px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 12px;
    border: 1px solid #ddd;
  }
  th {
    background: #f5f5f5;
  }
  .input-group {
    margin-bottom: 15px;
  }
  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }
  input[type="text"],
  input[type="date"],
  select,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  textarea {
    min-height: 80px;
  }
  .checkbox-group,
  .radio-group {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
  }
</style>
