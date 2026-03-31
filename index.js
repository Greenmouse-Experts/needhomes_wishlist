const API_BASE = 'https://needhomes-backend-staging.onrender.com';

async function handleSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('email-input');
  const msg = document.getElementById('success-msg');
  const btn = e.target.querySelector('button[type="submit"]');
  if (!input.value) return;

  btn.disabled = true;
  btn.textContent = 'Joining...';

  try {
    const response = await fetch(`${API_BASE}/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: input.value }),
    });

    const result = await response.json();

    if (response.status === 201) {
      input.value = '';
      msg.textContent = result.message || "You're on the waitlist! We'll be in touch.";
      msg.classList.remove('hidden', 'text-yellow-400');
      msg.classList.add('text-green-400');
      msg.classList.remove('hidden');
      setTimeout(() => msg.classList.add('hidden'), 6000);
    } else if (response.status === 400 && result.message) {
      msg.textContent = result.message;
      msg.classList.remove('hidden', 'text-green-400');
      msg.classList.add('text-yellow-400');
      setTimeout(() => msg.classList.add('hidden'), 6000);
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
