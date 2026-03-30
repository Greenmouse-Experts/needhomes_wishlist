async function handleSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('email-input');
  const msg = document.getElementById('success-msg');
  const btn = e.target.querySelector('button[type="submit"]');
  if (!input.value) return;

  const email = input.value;
  btn.disabled = true;
  btn.textContent = 'Joining...';

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
        subject: 'New Waitlist Signup – NeedHomes',
        from_name: 'NeedHomes Waitlist',
        to: 'support@needhomespdc.com',
        email: email,
        message: `New waitlist signup: ${email}`,
      }),
    });

    const result = await response.json();
    if (result.success) {
      input.value = '';
      msg.classList.remove('hidden');
      setTimeout(() => msg.classList.add('hidden'), 5000);
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch (err) {
    alert('Network error. Please try again.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Get Early Access';
  }
}
