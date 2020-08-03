import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem, Paper, Popper } from '@material-ui/core';
import Autosuggest from 'react-autosuggest';
import useStyles from './FormPlacesAutosuggest.styles';
import { useDebouncedState } from 'customHooks';

const callPlacesAPI = (input, callback) => {
  if (!window.google || !window.google.maps.places)
    throw new Error(
      'FormPlacesAutosuggest requires Google Maps Places library'
    );
  // Pull out OK status & service function for ease of reference
  const okStatus = window.google.maps.places.PlacesServiceStatus.OK;
  const placesService = new window.google.maps.places.AutocompleteService();

  if (!input) callback([]);
  placesService.getPlacePredictions(
    {
      input,
      componentRestrictions: { country: 'us' },
      types: ['(cities)']
    },
    (results, status) => {
      if (status !== okStatus) return;

      callback(
        results.map(({ id, description, terms, types }) => ({
          id,
          description,
          terms,
          types
        }))
      );
    }
  );
};

const renderInputComponent = ({
  meta: { touched, invalid, error },
  label,
  ...others
}) => (
  <TextField
    variant="outlined"
    label={label}
    error={touched && invalid}
    helperText={touched && error}
    {...others}
  />
);

const renderSuggestion = (suggestion, { isHighlighted }) => (
  <MenuItem key={suggestion.id} selected={isHighlighted} component="div">
    {suggestion.description}
  </MenuItem>
);

const FormPlacesAutosuggest = ({ delay, label, input, meta, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [suggestions, setSuggestions] = useDebouncedState([], delay);
  const classes = useStyles();

  const AutosuggestProps = {
    renderInputComponent,
    suggestions,
    onSuggestionsFetchRequested: () =>
      callPlacesAPI(input.value, setSuggestions),
    onSuggestionsClearRequested: () => setSuggestions([]),
    getSuggestionValue: entry => entry.description,
    renderSuggestion
  };

  return (
    <Autosuggest
      {...AutosuggestProps}
      inputProps={{
        ...input,
        ...props,
        onChange: (_, { newValue }) => input.onChange(newValue),
        meta,
        label,
        InputProps: { inputRef: node => setAnchorEl(node) }
      }}
      theme={{
        suggestionsList: classes.suggestionsList
      }}
      renderSuggestionsContainer={options => (
        <Popper
          anchorEl={anchorEl}
          open={Boolean(options.children)}
          className={classes.popper}
        >
          <Paper
            square
            {...options.containerProps}
            style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}
          >
            {options.children}
          </Paper>
        </Popper>
      )}
    />
  );
};

FormPlacesAutosuggest.propTypes = {
  delay: PropTypes.number
};

FormPlacesAutosuggest.defaultProps = {
  delay: 200,
  fullWidth: true
};

export default FormPlacesAutosuggest;
