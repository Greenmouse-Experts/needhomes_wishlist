function handleSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('email-input');
  const msg = document.getElementById('success-msg');
  if (!input.value) return;

  // TODO: wire up to your backend / email service
  console.log('Waitlist signup:', input.value);

  input.value = '';
  msg.classList.remove('hidden');
  setTimeout(() => msg.classList.add('hidden'), 5000);
}
