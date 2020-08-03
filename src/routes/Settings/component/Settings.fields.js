import { FormSwitch } from 'components/FormGenerator/FormComponents';

const evaluateNotifications = (_, value) => !value;

export default [
  {
    name: 'disableEmailNotifications',
    label: 'Send me Email notifications',
    Component: FormSwitch,
    evaluate: evaluateNotifications
  },
  {
    name: 'disableTextNotifications',
    label: 'Send me SMS notifications',
    Component: FormSwitch,
    evaluate: evaluateNotifications
  }
];
