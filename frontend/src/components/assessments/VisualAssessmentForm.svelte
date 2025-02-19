<script>
let formData = {
    assistiveDevice: '',
    medicalHistory: '',
    ocularHistory: '',
    visualAcuity: {
      withCorrection: {
        distance: { right: '', left: '' },
        near: { right: '', left: '' }
      },
      withCorrection1: {
        right: '',
        left: '',
        near: ''
      },
      withCorrection2: {
        right: '',
        left: '',
        near: ''
      },
      withoutCorrection: {
        distance: { right: '', left: '' },
        near: { right: '', left: '' },
        right: '',
        left: '',
        near: ''
      }
    },
    ophthalmicExam: {
      eyeball: { right: '', left: '' },
      squint: { right: '', left: '' },
      nystagmus: { right: '', left: '' },
      tearing: { right: '', left: '' },
      lids: { right: '', left: '' },
      conjunctiva: { right: '', left: '' },
      detailed: { right: '', left: '' }
    },
    specializedTests: {
      humphreysField: '',
      colourVision: '',
      stereopsis: ''
    },

    conclusion: {
    normal: { tick: false, cause: '' },
    mild: { tick: false, cause: '' },
    assessment: {
      percentage: '',
      intervention: '',
      recommendation: ''
    }
    },

     finalAssessment: {
    status: '',
    remarks: ''
  }
  };

  
</script>

<div class="assessment-form">
  <section class="form-section">
    <h3>Basic Information</h3>
    <div class="input-group">
      <label for="assistive-device">Assistive Device</label>
      <input id="assistive-device" type="text" bind:value={formData.assistiveDevice}>
    </div>
    <div class="input-group">
      <label for="medical-history">Medical History</label>
      <textarea id="medical-history" bind:value={formData.medicalHistory}></textarea>
    </div>
    <div class="input-group">
      <label for="ocular-history">Ocular History</label>
      <textarea id="ocular-history" bind:value={formData.ocularHistory}></textarea>
    </div>
  </section>

  <section class="form-section">
    <h3>Visual Acuity</h3>
    <table class="assessment-table">
      <thead>
        <tr>
          <th>Distance Visual Activity</th>
          <th>Right Eye</th>
          <th>Left Eye</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>With Correction (Distance)</td>
          <td><input type="text" bind:value={formData.visualAcuity.withCorrection.distance.right}></td>
          <td><input type="text" bind:value={formData.visualAcuity.withCorrection.distance.left}></td>
        </tr>
        <tr>
          <td>With Correction (Near)</td>
          <td><input type="text" bind:value={formData.visualAcuity.withCorrection.near.right}></td>
          <td><input type="text" bind:value={formData.visualAcuity.withCorrection.near.left}></td>
        </tr>
        <tr>
          <td>Without Correction</td>
          <td><input type="text" bind:value={formData.visualAcuity.withoutCorrection.distance.right}></td>
          <td><input type="text" bind:value={formData.visualAcuity.withoutCorrection.distance.left}></td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="form-section">
    <h3>Ophthalmic Examination</h3>
   <!-- Visual Acuity Table - Exactly 4 rows -->
<table class="assessment-table">
  <thead>
    <tr>
      <th>Distance Visual Activity</th>
      <th>Right Eye</th>
      <th>Left Eye</th>
      <th>Near Vision Test</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>With Correction</td>
      <td><input type="text" bind:value={formData.visualAcuity.withCorrection1.right}></td>
      <td><input type="text" bind:value={formData.visualAcuity.withCorrection1.left}></td>
      <td><input type="text" bind:value={formData.visualAcuity.withCorrection1.near}></td>
    </tr>
    <tr>
      <td>With Correction</td>
      <td><input type="text" bind:value={formData.visualAcuity.withCorrection2.right}></td>
      <td><input type="text" bind:value={formData.visualAcuity.withCorrection2.left}></td>
      <td><input type="text" bind:value={formData.visualAcuity.withCorrection2.near}></td>
    </tr>
    <tr>
      <td>Without Correction</td>
      <td><input type="text" bind:value={formData.visualAcuity.withoutCorrection.right}></td>
      <td><input type="text" bind:value={formData.visualAcuity.withoutCorrection.left}></td>
      <td><input type="text" bind:value={formData.visualAcuity.withoutCorrection.near}></td>
    </tr>
  </tbody>
</table>

<!-- Ophthalmic Examination Table - Exactly 6 rows -->
<table class="assessment-table">
  <thead>
    <tr>
      <th>Examination</th>
      <th>Right Eye</th>
      <th>Left Eye</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Present Eyeball</td>
      <td><input type="text" bind:value={formData.ophthalmicExam.eyeball.right}></td>
      <td><input type="text" bind:value={formData.ophthalmicExam.eyeball.left}></td>
    </tr>
    <tr>
      <td>Squint</td>
      <td><input type="text" bind:value={formData.ophthalmicExam.squint.right}></td>
      <td><input type="text" bind:value={formData.ophthalmicExam.squint.left}></td>
    </tr>
    <tr>
      <td>Nystagmus</td>
      <td><input type="text" bind:value={formData.ophthalmicExam.nystagmus.right}></td>
      <td><input type="text" bind:value={formData.ophthalmicExam.nystagmus.left}></td>
    </tr>
    <tr>
      <td>Tearing</td>
      <td><input type="text" bind:value={formData.ophthalmicExam.tearing.right}></td>
      <td><input type="text" bind:value={formData.ophthalmicExam.tearing.left}></td>
    </tr>
    <tr>
      <td>Lids</td>
      <td><input type="text" bind:value={formData.ophthalmicExam.lids.right}></td>
      <td><input type="text" bind:value={formData.ophthalmicExam.lids.left}></td>
    </tr>
    <tr>
      <td>Conjunctiva</td>
      <td><input type="text" bind:value={formData.ophthalmicExam.conjunctiva.right}></td>
      <td><input type="text" bind:value={formData.ophthalmicExam.conjunctiva.left}></td>
    </tr>
  </tbody>
</table>

<!-- Second Ophthalmic Examination Table - Exactly 2 rows -->
<table class="assessment-table">
  <thead>
    <tr>
      <th>Examination</th>
      <th>Right Eye</th>
      <th>Left Eye</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cornea, Anterior Chamber, Iris, Pupil, Lens, Fundus</td>
      <td><input type="text" bind:value={formData.ophthalmicExam.detailed.right}></td>
      <td><input type="text" bind:value={formData.ophthalmicExam.detailed.left}></td>
    </tr>
  </tbody>
</table>

  </section>
  <!-- Specialized Tests Table -->
<section class="form-section">
  <h3>Specialized Tests</h3>
  <table class="assessment-table">
    <thead>
      <tr>
        <th>Test</th>
        <th>Findings/Defect</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Humphreys Visual Field</td>
        <td><input type="text" bind:value={formData.specializedTests.humphreysField}></td>
      </tr>
      <tr>
        <td>Colour Vision</td>
        <td><input type="text" bind:value={formData.specializedTests.colourVision}></td>
      </tr>
      <tr>
        <td>Stereopsis</td>
        <td><input type="text" bind:value={formData.specializedTests.stereopsis}></td>
      </tr>
    </tbody>
  </table>
</section>

<section class="form-section">
  <h3>Conclusion</h3>
  <table class="assessment-table conclusion-table">
    <thead>
      <tr>
        <th>Category</th>
        <th>Tick</th>
        <th>Cause of Vision</th>
        <th>Disability Percentage</th>
        <th>Possible Intervention</th>
        <th>Yes/No</th>
        <th>Recommendation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Normal</td>
        <td><input type="checkbox" bind:checked={formData.conclusion.normal.tick}></td>
        <td><input type="text" bind:value={formData.conclusion.normal.cause}></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Mild Impairment</td>
        <td><input type="checkbox" bind:checked={formData.conclusion.mild.tick}></td>
        <td><input type="text" bind:value={formData.conclusion.mild.cause}></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Disability Assessment</td>
        <td></td>
        <td><input type="text" bind:value={formData.conclusion.assessment.percentage}></td>
        <td></td>
        <td><input type="text" bind:value={formData.conclusion.assessment.intervention}></td>
        <td></td>
        <td><input type="text" bind:value={formData.conclusion.assessment.recommendation}></td>
      </tr>
      <tr>
        <td>Intervention Required</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>Yes</td>
        <td></td>
      </tr>
      <tr>
        <td>Follow Up</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>No</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</section>
<section class="form-section">
    <h3>Final Assessment</h3>
    <div class="assessment-box">
      <div class="radio-group">
        <label class="radio-label">
          <input 
            type="radio" 
            name="finalStatus" 
            value="temporary" 
            bind:group={formData.finalAssessment.status}
          >
          <span>Temporary</span>
        </label>
        <label class="radio-label">
          <input 
            type="radio" 
            name="finalStatus" 
            value="permanent" 
            bind:group={formData.finalAssessment.status}
          >
          <span>Permanent</span>
        </label>
      </div>
      <div class="remarks-box">
        <label for="assessment-remarks">Remarks</label>
        <textarea 
          id="assessment-remarks" 
          bind:value={formData.finalAssessment.remarks}
          rows="4"
          placeholder="Enter assessment remarks"
        ></textarea>
      </div>
    </div>
  </section>
</div>
<style>
  .assessment-form {
    max-width: 800px;
    margin: 0 auto;
  }

  .form-section {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .assessment-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  .assessment-table th,
  .assessment-table td {
    border: 1px solid #ddd;
    padding: 0.75rem;
  }

  .assessment-table th {
    background: #f5f5f5;
    font-weight: 600;
  }

 

  input[type="text"],
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }

  .input-group {
    margin-bottom: 1rem;
  }

  .input-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
   .conclusion-table td {
    text-align: center;
  }
  
  .conclusion-table input[type="text"] {
    width: 100%;
    min-width: 100px;
  }
  
  .conclusion-table input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }

   .assessment-box {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 6px;
  }

  .radio-group {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }

  .radio-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .remarks-box {
    margin-top: 1rem;
  }

  .remarks-box label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
</style>
