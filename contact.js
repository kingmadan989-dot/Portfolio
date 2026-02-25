// Initialize EmailJS (assumes the supported SDK is loaded via index.html)
if (typeof emailjs === 'undefined') {
  console.error('EmailJS SDK not loaded. See https://www.emailjs.com/docs/sdk/installation/');
} else {
  try {
    emailjs.init('ZBES2S-Fj1Uqlsk0N');
    console.log('✓ EmailJS initialized');
  } catch (err) {
    console.error('Failed to initialize EmailJS:', err);
  }
}

// Get the form
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form submitted');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate fields
    if (!name || !email || !subject || !message) {
      alert('Please fill out all fields');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'SENDING...';

    // Template parameters - MUST match your template variables
    const templateParams = {
      'from_name': name,
      'reply_to': email,
      'subject': subject,
      'message': message
    };

    console.log('Sending:', templateParams);

    if (typeof emailjs !== 'undefined') {
      emailjs.send('service_sct2ngr', 'template_8txp9uf', templateParams)
        .then(function(response) {
          console.log('✓ Email sent:', response.status);
          alert('✓ Message sent successfully! I\'ll get back to you soon.');
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = 'SUBMIT';
        })
        .catch(function(error) {
          console.error('✗ Error:', error);
          alert('✗ Failed to send. Error: ' + (error.text || error.message || 'See console for details.'));
          submitBtn.disabled = false;
          submitBtn.textContent = 'SUBMIT';
        });
    } else {
      alert('Email service loading... Please try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'SUBMIT';
    }
  });
} else {
  console.error('Contact form not found');
}
