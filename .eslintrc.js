const { getDefaultIgnorePatterns } = require('@ahamove/eslint-config/helpers');

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: [...getDefaultIgnorePatterns(), 'service-worker.ts'],
  extends: [
    'react-app',
    // 'react-app/jest',
    // '@ahamove/eslint-config/typescript',
    '@ahamove/eslint-config/regexp',
    '@ahamove/eslint-config/jest',
    // '@ahamove/eslint-config/react',
    '@ahamove/eslint-config/tailwind',
    '@ahamove/eslint-config/react-testing-library',
    // Apply prettier and disable incompatible rules
    '@ahamove/eslint-config/prettier',
  ],
  rules: {
    // For the sake of example
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': 'off',
    'prettier/prettier': [
      'error',
      {
        jsxSingleQuote: false,
      },
    ],
  },
  overrides: [
    {
      files: ['src/pages/\\_*.{ts,tsx}'],
      rules: {
        'react/display-name': 'off',
      },
    },
  ],
};
