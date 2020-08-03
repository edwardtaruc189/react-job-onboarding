import { FormTextfield } from 'components/FormGenerator/FormComponents';

const required = true;
const password = true;

export default [
  {
    name: 'currentPassword',
    label: 'Current Password',
    Component: FormTextfield,
    required,
    password
  },
  {
    name: 'newPassword',
    label: 'New Password',
    Component: FormTextfield,
    required,
    password
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    Component: FormTextfield,
    required,
    password
  }
];
