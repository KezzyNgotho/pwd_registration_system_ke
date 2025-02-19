<script>
  let referralReason = '';
  let referredBy = '';
  let medicalDiagnosis = '';
  let historyCondition = '';
  let remarks = '';
  // Add this to initialize the form
document.addEventListener('DOMContentLoaded', () => {
  // Enable smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Auto-resize textareas
  document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  });
});


  // Initial Assessment Data
  const assessmentData = {
    referral: {
      reason: '',
      referredBy: '',
      medicalDiagnosis: ''
    },
    history: {
      condition: '',
      remarks: ''
    },
    domains: {
      language: false,
      speech: false,
      dysphagia: false,
      communication: false
    },
    developmental: {
      motorMilestones: false,
      sensoryImpairment: false,
      other: ''
    },
    milestones: '',
    preLinguistic: {
      eyeContact: false,
      attentionSpan: false,
      imitationSkills: false
    }
  };
  
  let domainsToAssess = {
    language: false,
    speech: false,
    dysphagia: false,
    communication: false
  };
  
  let developmentalInfo = {
    motorMilestones: false,
    sensoryImpairment: false,
    other: ''
  };
  
  let speechMilestones = '';
  
  let preLinguisticSkills = {
    eyeContact: false,
    attentionSpan: false,
    imitationSkills: false
  };

  let receptiveLanguage = {
    attention: '',
    listening: '',
    phonologicalAwareness: '',
    syntacticComprehension: '',
    semanticComprehension: '',
    readingComprehension: ''
  };
  const receptiveLanguageData = [
    { category: "Attention, Memory", remarks: "" },
    { category: "Listening, Auditory Processing", remarks: "" },
    { category: "Phonological Awareness", remarks: "" },
    { category: "Syntactic Comprehension (no. of information carrying words that applicant can understand in 1 sentence)", remarks: "" },
    { category: "Semantic Comprehension", remarks: "" },
    { category: "Reading Comprehension", remarks: "" }
  ];


  const expressiveLanguageData = [
    { category: "Sound, word, sentence level production", remarks: "" },
    { category: "Non-verbal Communication", remarks: "" },
    { category: "Pragmatics", remarks: "" },
    { category: "Play/Work", remarks: "" },
    { category: "Written output", remarks: "" }
  ];

   const speechData = [
    { category: "", checkFor: "Stuttering", remarks: "", type: "fluency" },
    { category: "", checkFor: "Cluttering", remarks: "", type: "fluency" },
    { category: "", checkFor: "Aphonia", remarks: "", type: "voice" },
    { category: "", checkFor: "Dysphonia", remarks: "", type: "voice" },
    { category: "", checkFor: "Speech Sound Disorder", remarks: "", type: "articulation" },
    { category: "", checkFor: "Motor Speech Disorder", remarks: "", type: "articulation" },
    { category: "", checkFor: "", remarks: "", type: "" }
  ];
// Standardized Test Results section
  let standardizedTestResults = '';

  // Dysphagia checklist data
  const dysphagiaCategories = {
    possibleSymptoms: [
      "History of recurrent chest infections with or without hospitalization",
      "Current chest infection that are related to difficulties swallowing",
      "Dehydration and malnutrition related to difficulties eating & drinking",
      "Unintentional weight loss short or long term",
      "Taking a long time to eat/drink a small amount of food or unable to manage a normal amount of food/drink",
      "Avoidance of particular foods or drinks",
      "Avoidance of eating/drinking in social situations",
      "Distress before/during/after eating and/or drinking"
    ],
    preOralStage: [
      "Difficulty with self- feeding (as appropriate to age)",
      "Difficulty with cleaning own mouth/ teeth (as appropriate to age)"
    ],
    oralStage: [
      "Difficulty closing lips when eating and drinking. (Age appropriate)",
      "Difficulty taking food off a spoon or fork. (Age appropriate)",
      "Losing food or drink from the mouth (oral escape), age appropriate",
      "Restricted oral movements due to neurological/ neuromuscular problem",
      "Food residue in mouth after swallowing",
      "Difficulty managing saliva/ drooling"
    ],
    pharyngealStage: [
      "Blinking, eye bulging, squeezing eyes, tearing up/ crying, red eyes, or grimacing associated with swallowing",
      "Coughing, throat clearing during or soon after swallowing",
      "Changing colour (flushed or blue/ grey) or breath pattern changes, just after swallowing",
      "Nasal/ oral regurgitation of food/ drinks during/ just after swallowing",
      "'Wet' or gurgly voice after swallowing"
    ],
    esophagealStage: [
      "Reflux (heartburn, chest pain, acid) during or after (up to 30 minutes) swallow",
      "Coughing after eating/ drinking or regurgitating food",
      "Coughing when lying down",
      "Breathing difficulties or choking episodes, sometimes on saliva or on no oral intake"
    ]
  };

  let checkedItems = new Set();
  
  function updateScore() {
    return checkedItems.size;
  }

   let diagnosis = '';
  let impactOnRoles = '';
  let impactOnCareer = '';
  let recommendations = '';
  
  let severityOptions = ['Mild', 'Moderate', 'Severe', 'Profound'];
  let selectedSeverity = '';
  
  let recommendationChecklist = {
    management: false,
    referral: false,
    communicationAids: false
  };

  let causeData = {
    cause: '',
    dateOfOnset: '',
    isAcute: false,
    isChronic: false,
    lastIntervention: ''
  };
   // Add these new variables to the existing script
  let recommendedProducts = '';
  let otherServices = '';
</script>

<div class="assessment-container">
  <h1 class="assessment-title">Speech & Language Assessment Form</h1>

  <div class="assessment-grid">
    <!-- Referral Section -->
    <div class="assessment-container">
  <!-- Referral Section -->
  <section class="card">
    <div class="card-header">
      <h2>Referral Information</h2>
    </div>
    <div class="card-body">
      <div class="input-group">
        <label for="referral-reason">Reason for Referral</label>
        <input 
          type="text" 
          id="referral-reason"
          bind:value={assessmentData.referral.reason} 
          aria-required="true"
        />
      </div>

      <div class="input-group">
        <label for="referred-by">Referred By</label>
        <input 
          type="text" 
          id="referred-by"
          bind:value={assessmentData.referral.referredBy} 
          aria-required="true"
        />
      </div>
    </div>
  </section>

  <!-- Medical Information -->
  <section class="card">
    <div class="card-header">
      <h2>Medical Information</h2>
    </div>
    <div class="card-body">
      <div class="input-group">
        <label for="medical-diagnosis">Medical Diagnosis</label>
        <input 
          type="text" 
          id="medical-diagnosis"
          bind:value={assessmentData.referral.medicalDiagnosis} 
          aria-required="true"
        />
      </div>

      <div class="input-group">
        <label for="condition-history">History of Condition</label>
        <textarea 
          id="condition-history"
          bind:value={assessmentData.history.condition}
          rows="4"
          aria-required="true"
        ></textarea>
      </div>
    </div>
  </section>

  <!-- Assessment Domains -->
  <section class="card">
    <div class="card-header">
      <h2>Assessment Areas</h2>
    </div>
    <div class="card-body">
      <div class="checkbox-grid">
        {#each Object.entries(assessmentData.domains) as [domain, checked]}
          <label class="checkbox-label" for={`domain-${domain}`}>
            <input 
              type="checkbox" 
              id={`domain-${domain}`}
              bind:checked={assessmentData.domains[domain]}
              aria-label={`${domain.charAt(0).toUpperCase() + domain.slice(1)} assessment domain`}
            >
            <span>{domain.charAt(0).toUpperCase() + domain.slice(1)}</span>
          </label>
        {/each}
      </div>
    </div>
  </section>

  <!-- Developmental Info -->
  <section class="card">
    <div class="card-header">
      <h2>Developmental Information</h2>
    </div>
    <div class="card-body">
      <div class="developmental-info">
        <div class="checkbox-grid">
          <label for="motor-milestones" class="checkbox-label">
            <input 
              type="checkbox" 
              id="motor-milestones"
              bind:checked={developmentalInfo.motorMilestones}
              aria-label="Delay in Motor Milestones"
            >
            <span>Delay in Motor Milestones</span>
          </label>
          
          <label for="sensory-impairment" class="checkbox-label">
            <input 
              type="checkbox" 
              id="sensory-impairment"
              bind:checked={developmentalInfo.sensoryImpairment}
              aria-label="Sensory Impairment"
            >
            <span>Sensory Impairment</span>
          </label>
        </div>
        
        <div class="input-group">
          <label for="other-info">Other:</label>
          <input 
            type="text" 
            id="other-info"
            bind:value={developmentalInfo.other}
            aria-label="Other developmental information"
          >
        </div>
      </div>
    </div>
  </section>

  <!-- Speech Language Milestones -->
  <section class="card">
    <div class="card-header">
      <h2>Speech Language Milestones</h2>
    </div>
    <div class="card-body">
      <div class="input-group">
        <label for="speech-milestones">Speech Language Milestones Achieved Thus Far:</label>
        <textarea 
          id="speech-milestones"
          bind:value={speechMilestones} 
          rows="4"
          aria-required="true"
        ></textarea>
      </div>
    </div>
  </section>

  <!-- Pre-Linguistic Skills -->
  <section class="card">
    <div class="card-header">
      <h2>Pre-Linguistic Skills</h2>
    </div>
    <div class="card-body">
      <div class="checkbox-grid">
        {#each Object.entries(preLinguisticSkills) as [skill, value]}
          <label class="checkbox-label" for={`skill-${skill}`}>
            <input 
              type="checkbox" 
              id={`skill-${skill}`}
              bind:checked={preLinguisticSkills[skill]}
              aria-label={skill.split(/(?=[A-Z])/).join(' ')}
            >
            <span>{skill.split(/(?=[A-Z])/).join(' ')}</span>
          </label>
        {/each}
      </div>
    </div>
  </section>
</div>

    <!-- Language Impairments Section -->
    <section class="space-y-4">
      <h2 class="text-xl font-bold">A. LANGUAGE IMPAIRMENTS</h2>
      <p class="italic">
        This section is common for applicants with developmental or acquired disorders. 
        Please complete briefly and use findings from standardized test scored to inform further.
      </p>

      <table>
      <thead>
  <tr>
    <th>RECEPTIVE LANGUAGE</th>
    <th>REMARKS</th>
  </tr>
  {#each receptiveLanguageData as row}
    <tr>
      <td>{row.category}</td>
      <td>{row.remarks}</td>
    </tr>
  {/each}
  </thead>
</table>

<table>
<thead>
  <tr>
    <th>EXPRESSIVE LANGUAGE</th>
    <th>REMARKS</th>
  </tr>
  {#each expressiveLanguageData as row}
    <tr>
      <td>{row.category}</td>
      <td>{row.remarks}</td>
    </tr>
  {/each}
  </thead>
</table>

<table>
<thead>
  <tr>
    <th colspan="3">SPEECH IMPAIRMENTS</th>
  </tr>
  <tr>
    <th></th>
    <th>Check for</th>
    <th>Remarks</th>
  </tr>
  {#each speechData as row}
    <tr>
      <td>
        {#if row.type === "fluency" && speechData.indexOf(row) === 0}
          FLUENCY
        {:else if row.type === "voice" && speechData.indexOf(row) === 2}
          VOICE
        {:else if row.type === "articulation" && speechData.indexOf(row) === 4}
          ARTICULATION
        {/if}
      </td>
      <td>{row.checkFor}</td>
      <td>{row.remarks}</td>
    </tr>
  {/each}
  </thead>
</table>
    </section>

  <section class="standardized-test">
    <h2>STANDARDISED TEST RESULTS AND INTERPRETATION</h2>
    <textarea 
      bind:value={standardizedTestResults}
      rows="4"
      placeholder="Enter test results and interpretation here"
    ></textarea>
  </section>

  <section class="dysphagia-section">
  <div class="dysphagia-header">
    <h2>C. DYSPHAGIA</h2>
    <div class="alert info">
      <span class="alert-icon">ℹ️</span>
      <p>SLTs who are not dysphagia trained should use the checklist below to provide more information on applicant's swallow. 
      If objective swallow assessment findings are available, attach report and skip the checklist.</p>
    </div>
  </div>

  <div class="checklist-container">
    <div class="checklist-header">
      <h3>Basic Signs & Symptoms of Dysphagia Checklist</h3>
      <span class="badge">ASLTK 2021</span>
    </div>

    {#each Object.entries(dysphagiaCategories) as [category, items]}
      <div class="category-card">
        <div class="category-header">
          <h4>{category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
          <span class="item-count">{items.length} items</span>
        </div>
        
        <div class="checklist-grid">
          {#each items as item}
            <div class="checkbox-wrapper">
              <input 
                type="checkbox" 
                id={item}
                class="custom-checkbox"
                on:change={(e) => {
                  if (e.target.checked) {
                    checkedItems.add(item);
                  } else {
                    checkedItems.delete(item);
                  }
                  checkedItems = checkedItems;
                }}
              >
              <label for={item}>{item}</label>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    <div class="score-card">
      <div class="score-display">
        <span class="score-label">Total Score:</span>
        <span class="score-value">{updateScore()}</span>
      </div>
      <p class="score-note">* Person with dysphagia may present with one or more of these symptoms</p>
    </div>
  </div>
</section>

  <section class="conclusion">
  <h2>CONCLUSION</h2>
  
  <!-- SLT Diagnosis Section -->
  <div class="diagnosis-section">
    <h3>SLT DIAGNOSIS:</h3>
    <table class="severity-table">
    <thead>
      <tr>
        <td>Severity:</td>
        {#each severityOptions as option}
          <td>
            <label>
              <input 
                type="radio" 
                name="severity" 
                value={option} 
                bind:group={selectedSeverity}
              >
              {option}
            </label>
          </td>
        {/each}
      </tr>
      </thead>
    </table>
  </div>

  <!-- Impact Sections -->
  <div class="impact-section">
    <label>
      Impact of disability on fulfilling PWD's roles and responsibilities:
      <textarea bind:value={impactOnRoles} rows="4"></textarea>
    </label>

    <label>
      Impact on Career:
      <textarea bind:value={impactOnCareer} rows="4"></textarea>
    </label>
  </div>

  <!-- Recommendations Section -->
  <div class="recommendations-section">
    <h3>Recommendations:</h3>
    <div class="checkbox-group">
      <label>
        <input 
          type="checkbox" 
          bind:checked={recommendationChecklist.management}
        >
        Further management of speech, language, communication, swallowing disorder
      </label>
      <label>
        <input 
          type="checkbox" 
          bind:checked={recommendationChecklist.referral}
        >
        Referral to other professionals
      </label>
      <label>
        <input 
          type="checkbox" 
          bind:checked={recommendationChecklist.communicationAids}
        >
        Communication aids
      </label>
    </div>
    <textarea 
      bind:value={recommendations} 
      placeholder="Additional recommendations..."
      rows="4"
    ></textarea>
  </div>

  <!-- Final Details Table -->
  <table class="details-table">
  <thead>
    <tr>
      <td>Cause of disability</td>
      <td colspan="3">
        <input type="text" bind:value={causeData.cause}>
      </td>
    </tr>
    <tr>
      <td>Date of injury/onset of illness</td>
      <td>
        <input type="date" bind:value={causeData.dateOfOnset}>
      </td>
      <td>
        <label>
          <input type="radio" bind:group={causeData.isAcute} value={true}>
          Acute
        </label>
      </td>
      <td>
        <label>
          <input type="radio" bind:group={causeData.isChronic} value={true}>
          Chronic
        </label>
      </td>
    </tr>
    <tr>
      <td>Date of last intervention</td>
      <td colspan="3">
        <input type="date" bind:value={causeData.lastIntervention}>
      </td>
    </tr>
    </thead>
  </table>

<div class="additional-recommendations">
  <div class="recommendation-field">
    <label for="assistive-products">RECOMMENDED ASSISTIVE PRODUCT(S)</label>
    <input 
      type="text" 
      id="assistive-products"
      bind:value={recommendedProducts}
      class="dotted-input"
      aria-required="true"
    />
  </div>

  <div class="recommendation-field">
    <label for="required-services">OTHER REQUIRED SERVICES</label>
    <input 
      type="text" 
      id="required-services"
      bind:value={otherServices}
      class="dotted-input"
      aria-required="true"
    />
  </div>
</div>

</section>
  </div>
</div>

<style>
.assessment-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

.assessment-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.assessment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.card-header {
  background: #f8fafc;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.card-header h2 {
  font-size: 1.25rem;
  font-weight: 500;
  color: #334155;
  margin: 0;
}

.card-body {
  padding: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 0.875rem;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #475569;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

th, td {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  font-size: 0.875rem;
}

th {
  background: #f8fafc;
  font-weight: 500;
  text-align: left;
}

.standardized-test textarea,
.conclusion textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  resize: vertical;
}

.severity-table {
  margin: 1rem 0;
}

.severity-table label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dotted-input {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-bottom: 1px dotted #cbd5e1;
  margin: 0.5rem 0;
}

.additional-recommendations {
  margin-top: 2rem;
}

.recommendation-field {
  margin-bottom: 1rem;
}

.recommendation-field label {
  display: block;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 0.5rem;
}

    .dysphagia-section {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 2rem;
  margin: 2rem 0;
}

.dysphagia-header {
  margin-bottom: 2rem;
}

.dysphagia-header h2 {
  color: #1a365d;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.alert {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: #ebf8ff;
  border-radius: 8px;
}

.alert-icon {
  font-size: 1.25rem;
}

.checklist-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.checklist-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.badge {
  background: #e2e8f0;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
}

.category-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.item-count {
  font-size: 0.875rem;
  color: #64748b;
}

.checklist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.custom-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 4px;
  border: 2px solid #cbd5e1;
  cursor: pointer;
}

.custom-checkbox:checked {
  background: #3b82f6;
  border-color: #3b82f6;
}

.score-card {
  background: #f1f5f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
}

.score-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.score-value {
  background: #3b82f6;
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 16px;
}

.score-note {
  color: #64748b;
  font-size: 0.875rem;
  font-style: italic;
}

</style>
