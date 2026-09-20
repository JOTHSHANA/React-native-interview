const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email is required.';
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Enter a valid email address.';
  }
  return '';
}

export function validatePassword(password) {
  if (!password) {
    return 'Password is required.';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters.';
  }
  return '';
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) {
    return 'Please confirm your password.';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return '';
}

export function validateLogin({ email, password }) {
  const errors = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
}

export function validateRegister({ email, password, confirmPassword }) {
  const errors = validateLogin({ email, password });
  const confirmError = validateConfirmPassword(password, confirmPassword);

  if (confirmError) errors.confirmPassword = confirmError;

  return errors;
}
