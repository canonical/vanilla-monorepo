module.exports = {
  root: true,
  extends: [
    '@canonical/base',
  ],
  overrides: [
    {
      files: [
        '*.jsx',
        '*.tsx',
        '*.mdx',
      ],
      extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:react/recommended',
      ],
      rules: {},
    },
  ],
};
