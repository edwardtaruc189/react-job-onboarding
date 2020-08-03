/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Split from 'react-split';
import { Typography, Button } from '@material-ui/core';
import { PlaygroundPreview } from 'reakit-playground';

import { Redirect } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import AcceptPopUp from 'components/AcceptPopUp';

import AceEditor from 'react-ace';
// eslint-disable-next-line no-unused-vars
import brace from 'brace';
import 'brace/mode/jsx';
import 'brace/theme/terminal';

require('brace');

const styles = {
  verticalContainer: {
    height: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    flex: 1
  },
  pane: { width: '100%', height: '100%' },
  editor: {
    flex: 2,
    width: '100%',
    height: '100%'
  },
  gutter: {
    backgroundColor: 'red',
    minWidth: '5px !important',
    width: 5,
    height: '100%',
    zIndex: 100,
    cursor: 'col-resize'
  },
  preview: {
    flex: 1
  },
  error: {
    background: 'red'
  },
  challengeDescription: {
    padding: 20,
    overflow: 'auto'
  },
  inlineHeader: {
    display: 'inline-block',
    flex: 1
  },
  infoBar: {
    background: '#ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
};

let initialCode = `import React from "react";
 
const styles = {
  container: {
      padding: 20
  },
  innerText: {
      fontSize: 16,
      fontWeight: 'bold'
  }
}; 
 
function Example() {
  return (
    <div style={styles.container}>
      <span style={styles.innerText}>Hello world</span>
    </div>
  );
}
`;

function Home({ challenge, submitChallenge }) {
  if (!challenge) return <Redirect to="home" />;

  const [code, setCode] = useState(localStorage.getItem('code') || initialCode);

  const persistCode = code => {
    localStorage.setItem('code', code);
    setCode(code);
  };

  window.onbeforeunload = function() {
    return;
  };
  if (!challenge) {
    return <span>Loading...</span>;
  }
  const {
    key,
    endAt,
    complete,
    challenge: { name, body }
  } = challenge;
  if (complete) {
    return <Redirect to="home" />;
  }

  const onChange = newCode => {
    setCode(newCode);
  };
  const playground = {
    code
  };

  const createMarkup = content => ({ __html: content });

  return (
    <div style={{ height: '100%', marginBottom: -30 }}>
      <div style={styles.infoBar}>
        <Typography variant="h5" style={styles.inlineHeader}>
          {name}
        </Typography>
        <Typography variant="body1" style={styles.inlineHeader}>
          Time remaining: <Countdown date={new Date(endAt)} />
        </Typography>
        <AcceptPopUp
          buttonLabel="Submit Challenge"
          message="Are you sure you'd like to submit your solution for review?"
          color="primary"
          size="small"
          onClose={() => {
            localStorage.removeItem('code');
            submitChallenge({
              key,
              code
            });
          }}
        />
      </div>

      <Split
        sizes={[25, 75]}
        minSize={100}
        expandToMin={false}
        snapOffset={30}
        dragInterval={1}
        direction="vertical"
        cursor="col-resize"
        style={styles.verticalContainer}
      >
        <div style={styles.challengeDescription}>
          <div dangerouslySetInnerHTML={createMarkup(body)} />
        </div>
        <Split
          sizes={[25, 75]}
          minSize={100}
          expandToMin={false}
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
          style={styles.container}
        >
          <div style={styles.pane}>
            <PlaygroundPreview {...playground} />
          </div>

          <div style={styles.pane}>
            <AceEditor
              style={styles.editor}
              value={code}
              mode="jsx"
              theme="terminal"
              onChange={persistCode}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
            />
          </div>
        </Split>
      </Split>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired // from enhancer (withStyles)
};

export default Home;
