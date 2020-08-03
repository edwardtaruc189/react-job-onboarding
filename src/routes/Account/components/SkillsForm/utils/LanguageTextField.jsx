import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { Paper, Popper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  renderInputComponent,
  renderSuggestion,
  getSuggestions,
  addNewField
} from './LanguageTextField.functions';

const useStyles = makeStyles({
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  popper: {
    zIndex: 1
  }
});

function LanguageTextField({ addField }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [entry, setEntry] = React.useState('');
  const [stateSuggestions, setSuggestions] = React.useState([]);

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: ({ value }) =>
      setSuggestions(getSuggestions(value)),
    onSuggestionsClearRequested: () => setSuggestions([]),
    getSuggestionValue: suggestion => suggestion,
    renderSuggestion
  };

  return (
    <div className={classes.root}>
      <Autosuggest
        onSuggestionSelected={(_, { suggestionValue }) => {
          addNewField(addField, suggestionValue);
          setEntry('');
        }}
        {...autosuggestProps}
        inputProps={{
          classes,
          variant: 'outlined',
          label: 'Programming Languages',
          placeholder: 'e.g. Javascript, Python, Java',
          value: entry,
          onChange: (_, { newValue }) => setEntry(newValue),
          onKeyPress: ({ key }) => {
            if (key === 'Enter') {
              addNewField(addField, entry);
              setEntry('');
            }
          },
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
              {...options.containerProps}
              square
              style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}
            >
              {options.children}
            </Paper>
          </Popper>
        )}
      />
    </div>
  );
}

export default LanguageTextField;

LanguageTextField.propTypes = {
  addField: PropTypes.func.isRequired
};

LanguageTextField.defaultProps = {
  addField: () => {}
};
