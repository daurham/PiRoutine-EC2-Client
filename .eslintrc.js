module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  plugins: [
    '@typescript-eslint/eslint-plugin',
  ],
  rules: {
    'no-console': 'off',
    'no-shadow': 'warn',
    'no-extend-native': 'off',
  },
  overrides: [ // Typescript configs:
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      plugins: [
        '@typescript-eslint/eslint-plugin',
      ],
      extends: [
        'airbnb',
        'airbnb-typescript',
        // 'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/rule-name': 'off',
      },
      parserOptions: {
        project: './tsconfig.json', // Specify it only for TypeScript files
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  ],
};