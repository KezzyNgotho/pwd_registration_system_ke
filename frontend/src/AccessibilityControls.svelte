<script>
// Add these to your existing script
let currentFieldIndex = 0;
let isReading = false;
let currentField = null;

const fieldSequence = [
  { id: 'fullName', section: 'personal', required: true },
  { id: 'idNumber', section: 'personal', required: true },
  { id: 'dateOfBirth', section: 'personal', required: true },
  // Add all form fields in sequence
];

function startAssistiveReading() {
  currentFieldIndex = 0;
  readNextField();
}

function readNextField() {
  if (currentFieldIndex < fieldSequence.length) {
    const field = fieldSequence[currentFieldIndex];
    currentField = field;
    
    const element = document.getElementById(field.id);
    const label = document.querySelector(`label[for="${field.id}"]`).textContent;
    
    speakText(`${label}. ${field.required ? 'This field is required.' : ''} Please speak after the beep.`);
    
    setTimeout(() => {
      playBeep();
      toggleVoiceInput();
    }, 3000);
  } else {
    speakText("Registration complete. Thank you.");
  }
}

function handleVoiceResult(event) {
  const transcript = event.results[0][0].transcript;
  
  if (currentField) {
    const element = document.getElementById(currentField.id);
    element.value = transcript;
    
    // Validate input
    if (validateField(element)) {
      speakText(`You said: ${transcript}. Is this correct? Say yes to confirm or no to try again.`);
      
      // Wait for confirmation
      recognition.onresult = (event) => {
        const response = event.results[0][0].transcript.toLowerCase();
        if (response === 'yes') {
          handleInputChange(currentField.id, transcript);
          currentFieldIndex++;
          readNextField();
        } else if (response === 'no') {
          speakText("Let's try again.");
          readNextField();
        }
      };
    } else {
      speakText("That input appears invalid. Let's try again.");
      readNextField();
    }
  }
}

// Voice commands for navigation
const voiceCommands = {
  'next field': () => {
    currentFieldIndex++;
    readNextField();
  },
  'previous field': () => {
    currentFieldIndex--;
    readNextField();
  },
  'repeat': () => readNextField(),
  'help': () => {
    const field = fieldSequence[currentFieldIndex];
    speakText(getFieldHelp(field.id));
  }
};

function getFieldHelp(fieldId) {
  const helpText = {
    fullName: "Please state your full name clearly",
    idNumber: "Your national ID number should be 8 digits",
    dateOfBirth: "State your date of birth in day month year format",
    // Add help text for all fields
  };
  return helpText[fieldId] || "Please provide the requested information";
}

// Add to your existing onMount
onMount(() => {
  if (disability === 'visual') {
    recognition.continuous = true;
    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };
    startAssistiveReading();
  }
});
</script>
