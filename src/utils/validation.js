export function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email || !email.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email';
  if (!password) errors.password = 'Password is required';
  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateRegistration({ name, email, password, confirmPassword }) {
  const errors = {};
  if (!name || !name.trim()) errors.name = 'Name is required';
  if (!email || !email.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email';
  if (!password) errors.password = 'Password is required';
  else if (password.length < 6) errors.password = 'Min 6 characters required';
  if (!confirmPassword) errors.confirmPassword = 'Confirm your password';
  else if (password !== confirmPassword) errors.confirmPassword = "Password doesn't match";
  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateLeafSubmission({ file, selectedCrop, requireCrop = false }) {
  const errors = {};
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (requireCrop && !selectedCrop) errors.crop = 'Please select a crop.';
  if (!file) errors.image = 'Please upload or capture a leaf image.';
  else if (!allowed.includes(file.type)) errors.image = 'Only JPEG, PNG, or WebP images are allowed.';
  else if (file.size > 10 * 1024 * 1024) errors.image = 'Max file size is 10 MB.';
  return { isValid: Object.keys(errors).length === 0, errors };
}