/**
 * Returns error message if value does not exist, otherwise returns
 * undefined
 * @param {String} value - Email to validate
 * @example Required Field
 * <Field
 *   name="password"
 *   component={TextField}
 *   label="Password"
 *   type="password"
 *   validate={required}
 * />
 */
export function required(value) {
  return value ? undefined : 'Required';
}

export function isEmailValid(email) {
  return email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
}

/**
 * Returns error message if value is not a valid email, otherwise returns
 * undefined
 * @param {String} value - Email to validate
 * @example Basic
 * <Field
 *   name="email"
 *   component={TextField}
 *   label="Email"
 *   validate={validateEmail}
 * />
 */
export function validateEmail(value) {
  return isEmailValid(value) ? undefined : 'Invalid email address';
}
