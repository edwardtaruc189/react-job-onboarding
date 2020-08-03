import {
  FormTextfield,
  FormSelect,
  FormPlacesAutosuggest
} from 'components/FormGenerator/FormComponents';
import industries from 'constants/industries';
import companySize from 'constants/companySize';
import companyStage from 'constants/companyStage';
import searchStatus from 'constants/searchStatus';

const required = true;

const AccountFields = [
  {
    name: 'firstName',
    label: 'First Name',
    Component: FormTextfield,
    required
  },
  {
    name: 'lastName',
    label: 'Last Name',
    Component: FormTextfield,
    required
  },
  { name: 'email', label: 'E-mail', Component: FormTextfield, required },
  { name: 'phone', label: 'Phone', Component: FormTextfield }
];

const CompanyAboutFields = [
  {
    name: 'companyName',
    label: 'Company Name',
    Component: FormTextfield,
    required
  },
  {
    name: 'location',
    label: 'Company Location',
    Component: FormPlacesAutosuggest,
    required
  },
  { name: 'website', label: 'Website', Component: FormTextfield },
  {
    name: 'industry',
    label: 'Company Industry',
    Component: FormSelect,
    options: industries.map(industry => ({
      value: industry,
      label: industry
    }))
  },
  {
    name: 'companySize',
    label: 'Company Size',
    Component: FormSelect,
    options: companySize.map(size => ({
      value: size,
      label: size
    }))
  },
  {
    name: 'companyStage',
    label: 'Company Stage',
    Component: FormSelect,
    options: companyStage.map(stage => ({
      value: stage,
      label: stage
    }))
  },
  {
    name: 'companyDescription',
    label: 'Company Description',
    Component: FormTextfield,
    multiline: true,
    rows: 4,
    rowsMax: 4
  }
];

const CandidateAboutFields = [
  {
    name: 'searchStatus',
    label: 'Current Search Status',
    Component: FormSelect,
    options: Object.keys(searchStatus).map(k => ({
      value: searchStatus[k],
      label: searchStatus[k]
    }))
  },
  {
    name: 'currentLocation',
    label: 'Current Location',
    Component: FormPlacesAutosuggest
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
    ]
  },

  {
    name: 'github',
    label: 'Github URL',
    Component: FormTextfield
  },
  {
    name: 'linkedin',
    label: 'LinkedIn URL',
    Component: FormTextfield
  }
];

const CandidatePreferencesFields = [
  {
    name: 'desiredSalary',
    type: 'number',
    label: 'Desired Salary',
    Component: FormTextfield
  },
  {
    name: 'industryInterests',
    label: 'Ideal Company Industry',
    Component: FormSelect,
    options: industries.map(industry => ({
      value: industry,
      label: industry
    }))
  },

  {
    name: 'companySizeInterests',
    label: 'Ideal Company Size',
    Component: FormSelect,
    options: companySize.map(size => ({
      value: size,
      label: size
    }))
  },

  {
    name: 'companyStageInterests',
    label: 'Ideal Company Stage',
    Component: FormSelect,
    options: companyStage.map(stage => ({
      value: stage,
      label: stage
    }))
  }
];

const CandidateSkillsFields = [
  { name: 'programmingLanguages', label: 'Programming Languages' }
];

export default {
  AccountFields,
  CompanyAboutFields,
  CandidateAboutFields,
  CandidatePreferencesFields,
  CandidateSkillsFields
};
