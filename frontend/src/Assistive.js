export class AssistiveTools {
  constructor(disability) {
    this.disability = disability;
    this.currentFieldIndex = 0;
    this.isReading = false;
    this.currentField = null;
    // @ts-ignore
    this.recognition = 'webkitSpeechRecognition' in window ? new webkitSpeechRecognition() : null;
    
    this.fieldSequence = [
      { id: 'fullName', section: 'personal', required: true },
      { id: 'idNumber', section: 'personal', required: true }, 
      { id: 'dateOfBirth', section: 'personal', required: true },
      { id: 'gender', section: 'personal', required: true },
      { id: 'maritalStatus', section: 'personal', required: false },
      { id: 'nationality', section: 'personal', required: true },
      { id: 'religion', section: 'personal', required: false },
      { id: 'mobileNumber', section: 'personal', required: true },
      { id: 'emailAddress', section: 'personal', required: true },
      { id: 'county', section: 'personal', required: true },
      { id: 'subCounty', section: 'personal', required: true },
      { id: 'ward', section: 'personal', required: false },
      { id: 'postalAddress', section: 'personal', required: false },
      { id: 'residentialAddress', section: 'personal', required: true }
    ];

    this.helpText = {
      fullName: "Please state your full name clearly",
      idNumber: "Your national ID number should be 8 digits",
      dateOfBirth: "State your date of birth in day month year format",
      gender: "Please specify male, female or other",
      maritalStatus: "State your marital status from the available options",
      nationality: "Please state your nationality",
      mobileNumber: "Provide your mobile number starting with 7",
      emailAddress: "State your email address including the @ symbol",
      county: "Select your county of residence",
      subCounty: "Select your sub-county within the chosen county"
    };

    this.voiceCommands = {
      'next field': () => this.nextField(),
      'previous field': () => this.previousField(),
      'repeat': () => this.readNextField(),
      'help': () => this.getHelp()
    };

    if (this.recognition) {
      this.recognition.continuous = true;
      this.recognition.onend = () => {
        if (this.isReading) {
          this.recognition.start();
        }
      };
    }
  }

  startAssistiveReading() {
    this.currentFieldIndex = 0;
    this.readNextField();
  }

  readNextField() {
    if (this.currentFieldIndex < this.fieldSequence.length) {
      const field = this.fieldSequence[this.currentFieldIndex];
      this.currentField = field;
      
      const element = document.getElementById(field.id);
      const label = document.querySelector(`label[for="${field.id}"]`).textContent;
      
      this.speakText(`${label}. ${field.required ? 'This field is required.' : ''} Please speak after the beep.`);
      
      setTimeout(() => {
        this.playBeep();
        this.toggleVoiceInput();
      }, 3000);
    } else {
      this.speakText("Registration complete. Thank you.");
    }
  }

  handleVoiceResult(event) {
    const transcript = event.results[0][0].transcript;
    
    if (this.currentField) {
      const element = document.getElementById(this.currentField.id);
      // @ts-ignore
      element.value = transcript;
      
      if (this.validateField(element)) {
        this.speakText(`You said: ${transcript}. Is this correct? Say yes to confirm or no to try again.`);
        
        this.recognition.onresult = (event) => {
          const response = event.results[0][0].transcript.toLowerCase();
          if (response === 'yes') {
            this.handleInputChange(this.currentField.id, transcript);
            this.currentFieldIndex++;
            this.readNextField();
          } else if (response === 'no') {
            this.speakText("Let's try again.");
            this.readNextField();
          }
        };
      } else {
        this.speakText("That input appears invalid. Let's try again.");
        this.readNextField();
      }
    }
  }

  nextField() {
    this.currentFieldIndex++;
    this.readNextField();
  }

  previousField() {
    this.currentFieldIndex--;
    this.readNextField();
  }

  getHelp() {
    const field = this.fieldSequence[this.currentFieldIndex];
    this.speakText(this.getFieldHelp(field.id));
  }

  getFieldHelp(fieldId) {
    return this.helpText[fieldId] || "Please provide the requested information";
  }

  speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  playBeep() {
    const beep = new Audio('path/to/beep.mp3');
    beep.play();
  }

  toggleVoiceInput() {
    if (!this.isReading) {
      this.recognition?.start();
    } else {
      this.recognition?.stop();
    }
    this.isReading = !this.isReading;
  }

  validateField(element) {
    // Add your field validation logic here
    return true;
  }

  handleInputChange(fieldId, value) {
    // Add your input change handling logic here
  }

  initialize() {
    if (this.disability === 'visual') {
      this.startAssistiveReading();
    }
  }
}
