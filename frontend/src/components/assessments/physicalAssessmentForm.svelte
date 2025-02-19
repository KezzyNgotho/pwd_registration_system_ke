<script>
  // Constants
  const BODY_STRUCTURES = [
    { id: 's710', label: 'Head and neck region' },
    { id: 's720', label: 'Shoulder region' },
    { id: 's730', label: 'Upper extremity (arm, hand)' },
    { id: 's740', label: 'Pelvis' },
    { id: 's750', label: 'Lower extremity (leg, foot)' },
    { id: 's760', label: 'Trunk' },
    { id: 's8', label: 'Skin and related structures' },
    { id: 'other', label: 'Any other body structures' }
  ];

  const FUNCTIONAL_AREAS = [
    'Mobility',
    'Self-Care',
    'Domestic Life',
    'Major Life Areas',
    'Community, Social, Civic Life'
  ];

  const ASSESSMENT_AREAS = [
    'Muscle Power of affected muscle groups',
    'Range of motion of joints affected',
    'Degree of structural angulation/deviation',
    'Level of limb Amputation',
    'Bilateral Lower Limb Length',
    'Balance and coordination',
    'Other Physical Impairments (Specify)'
  ];

  const IMPAIRMENT_LEVELS = [
    'No impairment',
    'Mild impairment',
    'Moderate impairment',
    'Severe impairment',
    'Complete impairment'
  ];

  // Form data initialization
  let formData = {
    assessmentScores: {},
    totalScores: {},
    basicInfo: {
      onsetDate: '',
      lastIntervention: '',
      disabilityCause: ''
    },
    structuralDetails: {
      impairments: '',
      selectedStructures: []
    },
    assessments: {},
    functionalScores: {},
    conclusion: {
      disabilityRating: '',
      status: '',
      assistiveProducts: '',
      otherServices: ''
    }
  };

  // Initialize assessment scores
  ASSESSMENT_AREAS.forEach(area => {
    formData.assessmentScores[area] = {
      findings: '',
      scores: Object.fromEntries(IMPAIRMENT_LEVELS.map(level => [level, ''])),
      remarks: ''
    };
  });

  // Initialize functional scores
  FUNCTIONAL_AREAS.forEach(area => {
    formData.functionalScores[area] = {
      score: '',
      remarks: ''
    };
  });

  // Initialize total scores
  formData.totalScores = Object.fromEntries(IMPAIRMENT_LEVELS.map(level => [level, '']));
</script>

<div class="assessment-form" role="form" aria-label="Physical Assessment Form">
<h1>Physical Assessment Form</h1>
  <!-- Medical Summary Section -->
  <section class="form-section" aria-labelledby="medical-summary-title">
    <h2 id="medical-summary-title">Summary Findings</h2>
    <div class="grid-2">
      <div class="input-group">
        <label for="onset-date">Date of Injury/Onset</label>
        <input 
          type="date" 
          id="onset-date"
          bind:value={formData.basicInfo.onsetDate}
          aria-required="true"
        />
      </div>
      <div class="input-group">
        <label for="intervention-date">Last Intervention Date</label>
        <input 
          type="date" 
          id="intervention-date"
          bind:value={formData.basicInfo.lastIntervention}
          aria-required="true"
        />
      </div>
    </div>
    <div class="input-group">
      <label for="disability-cause">Cause of Disability</label>
      <input 
        type="text" 
        id="disability-cause"
        bind:value={formData.basicInfo.disabilityCause}
        aria-required="true"
      />
    </div>
  </section>

  <!-- Structural Impairments Section -->
  <section class="form-section" aria-labelledby="structural-impairments-title">
    <h2 id="structural-impairments-title">Structural Impairments</h2>
    <div class="input-group">
      <label for="structural-impairments">Description of Impairments</label>
      <textarea 
        id="structural-impairments"
        bind:value={formData.structuralDetails.impairments}
        aria-required="true"
      ></textarea>
    </div>
  </section>

  <!-- Body Structures Section -->
  <section class="form-section" aria-labelledby="body-structures-title">
    <h2 id="body-structures-title">Affected Body Structures</h2>
    <div class="checkbox-grid" role="group" aria-labelledby="body-structures-title">
      {#each BODY_STRUCTURES as structure}
        <label class="checkbox-item" for={structure.id}>
          <input 
            type="checkbox" 
            id={structure.id}
            bind:group={formData.structuralDetails.selectedStructures} 
            value={structure.id}
          />
          <span>{structure.label}</span>
        </label>
      {/each}
    </div>
  </section>

  <!-- Assessment Areas Section -->
  <section class="form-section" aria-labelledby="assessment-areas-title">
    <h2 id="assessment-areas-title">Assessment Areas</h2>
    <div class="compact-table">
      <table role="grid">
        <thead>
          <tr>
            <th scope="col" rowspan="2">Assessment Area</th>
            <th scope="col" rowspan="2">Findings</th>
            <th scope="col" colspan="5">Score for Nature of Impairments</th>
            <th scope="col" rowspan="2">Remarks</th>
          </tr>
          <tr>
            {#each IMPAIRMENT_LEVELS as level}
              <th scope="col">{level.split(' ')[0]}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each ASSESSMENT_AREAS as area}
            <tr>
              <th scope="row">{area}</th>
              <td>
                <input 
                  type="text"
                  aria-label={`Findings for ${area}`}
                  bind:value={formData.assessmentScores[area].findings}
                />
              </td>
              {#each IMPAIRMENT_LEVELS as level}
                <td class="score-cell">
                  <input 
                    type="number"
                    min="0"
                    max="100"
                    aria-label={`${level} score for ${area}`}
                    bind:value={formData.assessmentScores[area].scores[level]}
                    class="score-input"
                  />
                </td>
              {/each}
              <td>
                <input 
                  type="text"
                  aria-label={`Remarks for ${area}`}
                  bind:value={formData.assessmentScores[area].remarks}
                />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Conclusion Section -->
  <section class="form-section" aria-labelledby="conclusion-title">
    <h2 id="conclusion-title">Conclusion</h2>
    <div class="conclusion-content">
      <div class="input-group">
        <label for="disability-rating">Disability Rating</label>
        <select 
          id="disability-rating"
          bind:value={formData.conclusion.disabilityRating}
          class="rating-select"
          aria-required="true"
        >
          <option value="">Select rating</option>
          {#each IMPAIRMENT_LEVELS as level}
            <option value={level}>{level}</option>
          {/each}
        </select>
      </div>

      <div class="radio-group" role="radiogroup" aria-label="Disability Status">
        <label for="temporary-status">
          <input 
            type="radio"
            id="temporary-status"
            bind:group={formData.conclusion.status}
            value="temporary"
          />
          Temporary
        </label>
        <label for="permanent-status">
          <input 
            type="radio"
            id="permanent-status"
            bind:group={formData.conclusion.status}
            value="permanent"
          />
          Permanent
        </label>
      </div>
    </div>
  </section>

  <!-- Recommendations Section -->
  <section class="form-section" aria-labelledby="recommendations-title">
    <h2 id="recommendations-title">Recommendations</h2>
    <div class="input-group">
      <label for="assistive-products">Assistive Products</label>
      <textarea 
        id="assistive-products"
        bind:value={formData.conclusion.assistiveProducts}
        aria-required="true"
      ></textarea>
    </div>
    <div class="input-group">
      <label for="other-services">Other Required Services</label>
      <textarea 
        id="other-services"
        bind:value={formData.conclusion.otherServices}
        aria-required="true"
      ></textarea>
    </div>
  </section>
</div>

<style>
  .assessment-form {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .form-section {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  h2 {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .input-group {
    margin-bottom: 1.5rem;
  }

  .input-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #4a5568;
  }

  input[type="text"],
  input[type="date"],
  select,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }

  .checkbox-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .compact-table {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 1rem;
  }

  th, td {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
  }

  th {
    background: #f7fafc;
    font-weight: 600;
    text-align: left;
  }

  .score-input {
    width: 60px;
    text-align: center;
  }

  .conclusion-content {
    display: grid;
    gap: 1.5rem;
  }

  .radio-group {
    display: flex;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    .form-section {
      padding: 1rem;
    }

    .grid-2 {
      grid-template-columns: 1fr;
    }
  }
</style>
