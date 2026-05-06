const telegram_bot_id = '8704884272:AAEnUKOWIJjxOnh5QDW3xc7SlVXCI9056Nk';
const chat_id = 5211441236;

function getContactField(id) {
  return document.getElementById(id);
}

function buildTelegramMessage() {
  const firstName = getContactField('name')?.value.trim() || '';
  const lastName = getContactField('last-name')?.value.trim() || '';
  const email = getContactField('email')?.value.trim() || '';
  const phone = getContactField('phone')?.value.trim() || '';
  const service = getContactField('service')?.value.trim() || '';
  const message = getContactField('message')?.value.trim() || '';
  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  return [
    'New Inquiry from Commercial Property Holds:',
    '',
    'Name: ' + fullName,
    'Email: ' + email,
    'Phone: ' + phone,
    'Investment Budget: ' + service,
    'Message: ' + (message || 'No message provided'),
  ].join('\n');
}

function showModal(message) {
  const modal = document.getElementById('alertModal');
  const messageNode = document.getElementById('alertMessage');

  if (!modal || !messageNode) {
    window.alert(message);
    return;
  }

  messageNode.textContent = message;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeAlertModal() {
  const modal = document.getElementById('alertModal');

  if (!modal) {
    return;
  }

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

async function sender(message) {
  const response = await fetch('https://api.telegram.org/bot' + telegram_bot_id + '/sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
    },
    body: JSON.stringify({
      chat_id,
      text: message,
    }),
  });

  if (!response.ok) {
    throw new Error('Telegram request failed');
  }

  return response.json();
}

async function handleSubmit(event) {
  event.preventDefault();

  const form = event.target.closest('form') || document.getElementById('contact-form');
  const button = form?.querySelector('.form-submit');
  const defaultText = 'Send Message & Get a Callback →';

  if (!form || !button) {
    return;
  }

  const message = buildTelegramMessage();

  button.disabled = true;
  button.textContent = 'Sending...';

  try {
    await sender(message);
    showModal('Your message has been sent successfully!');
    form.reset();
  } catch (error) {
    showModal('There was an error sending your message. Please try again.');
  } finally {
    button.disabled = false;
    button.textContent = defaultText;
  }
}

function initContactForm() {
  window.handleSubmit = handleSubmit;
  window.closeAlertModal = closeAlertModal;

  const modal = document.getElementById('alertModal');
  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeAlertModal();
      }
    });
  }
}
