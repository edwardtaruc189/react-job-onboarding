export default {
  palette: {
    primary: {
      main: '#558b2f',
      contrastText: '#000'
    },
    error: { main: '#ff0033' }
  },
  // Enable typography v2: https://material-ui.com/style/typography/#migration-to-typography-v2
  typography: {
    useNextVariants: true,
    h3: {
      fontSize: 33,
      fontWeight: '500',
      color: '#8e8d8d'
    },
    h4: {
      fontSize: 33,
      fontWeight: 600,
      color: '#212020'
    },
    body1: {
      fontSize: 16,
      lineHeight: 1.44,
      color: '#666'
    },
    body2: {
      fontSize: 16,
      lineHeight: 1.44,
      color: '#aaa'
    }
  },
  flexColumnLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  flexColumnCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  overrides: {
    MuiTypography: {
      root: {
        wordBreak: 'break-word'
      },
      colorTextSecondary: {
        color: '#0f6fff'
      }
    },
    MuiChip: {
      root: {
        margin: '0 8px 8px 0',
        backgroundColor: '#EEE'
      }
    },
    MuiPaper: {
      rounded: {
        maxWidth: 1080,
        borderRadius: 4
      }
    },
    MuiTextField: {
      root: {
        marginBottom: 20
      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#333',
        color: '#fff'
      }
    },
    MuiDivider: {
      middle: {
        margin: '20px 16px 20px 0 !important'
      }
    },
    MuiTabs: {
      flexContainer: {
        width: '100%'
      }
    },
    MuiTab: {
      root: {
        flex: 1,
        maxWidth: 'none',
        minWidth: '0 !important'
      },
      wrapper: {
        color: 'white'
      }
    },
    MuiSvgIcon: {
      fontSizeLarge: {
        fontSize: '6vw'
      }
    },
    MuiLink: {
      root: {
        cursor: 'pointer'
      }
    },
    MuiFormControlLabel: {
      label: {
        marginBottom: 0
      }
    },
    MuiFormLabel: {
      root: {
        background: 'white',
        padding: '0 5px',
        marginLeft: -5
      }
    },
    MuiTableCell: {
      root: {
        fontSize: 10,
        wordBreak: 'break-word'
      },
      head: {
        wordBreak: 'normal'
      }
    },
    MuiInputLabel: {},
    MuiButton: {
      root: {
        padding: '4px 12px',
        fontSize: 16,
        textTransform: 'capitalize'
      },
      sizeSmall: {
        padding: '4px 8px'
      },
      sizeLarge: {
        padding: '8px 16px'
      },
      containedPrimary: {
        backgroundColor: '#558b2f',
        color: '#fff'
      },
      containedSecondary: {
        backgroundColor: '#cb2431',
        color: '#fff'
      }
    },
    MuiRadio: {
      colorPrimary: {
        color: '#558b2f',
        '&$checked': {
          color: '#558b2f'
        }
      },
      colorSecondary: {
        color: '#cb2431',
        '&$checked': {
          color: '#cb2431'
        }
      }
    },
    Mui: {
      focused: {}
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'white !important'
        }
      }
    }
  }
};
