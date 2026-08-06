import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextVitals,
  {
    rules: {
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'space-before-function-paren': ['error', 'never'],
      'import/named': 'error',
    },
  },
]

export default config