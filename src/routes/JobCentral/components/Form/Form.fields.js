import {
  FormTextfield,
  FormSelect,
  FormPlacesAutosuggest
} from 'components/FormGenerator/FormComponents';
import positionTypes from 'constants/positionTypes';
import RemoteOffered from './RemoteOffered';

const required = true;

const newJobForm = [
  {
    name: 'name',
    label: 'Position Name',
    Component: FormTextfield,
    required
  },
  {
    name: 'description',
    label: 'Description',
    Component: FormTextfield,
    multiline: true,
    rows: 4,
    rowsMax: 4,
    required
  },
  {
    name: 'yearsExperience',
    label: 'Years of experience',
    Component: FormSelect,
    options: [
      { value: 1, label: '1 Year' },
      { value: 2, label: '2 Years' },
      { value: 3, label: '3 Years' },
      { value: 4, label: '4 Years' },
      { value: 5, label: '5 Years' },
      { value: 6, label: '6+ Years' }
    ],
    required
  },
  {
    name: 'role',
    label: 'Type of role',
    Component: FormSelect,
    options: positionTypes.map(type => ({ value: type, label: type })),
    required
  },
  {
    name: 'minimumSalary',
    type: 'number',
    label: 'Minimum Salary',
    Component: FormTextfield,
    required
  },
  {
    name: 'maximumSalary',
    type: 'number',
    label: 'Maximum Salary',
    Component: FormTextfield,
    required
  },
  {
    name: 'location',
    label: 'Position Location',
    Component: FormPlacesAutosuggest
  },
  {
    name: 'remotePosition',
    type: 'radio',
    label: 'Remote candidates allowed?',
    Component: RemoteOffered,
    required
  }
];

export default newJobForm;
