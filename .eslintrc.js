module.exports = {
  root: true,
  ignorePatterns: [
    'dist/',
    'build/',
    'coverage/',
    'node_modules/',
    '.next/',
    '.turbo/',
    'storybook-static/'
  ],
  extends: [
    'eslint:recommended',
    'prettier'
  ],
  plugins: ['react', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  rules: {
    // React best practices
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // General code quality (from rules.md)
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-alert': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-spacing': 'error',
    'prefer-destructuring': 'warn',
    'no-unused-vars': 'error'
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      plugins: ['@typescript-eslint'],
      rules: {
        // Let the TypeScript-aware rule handle unused detection; the base rule
        // misfires on type-only and interface usages.
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
        ]
      }
    },
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      env: {
        jest: true
      },
      globals: {
        vi: 'readonly'
      }
    }
  ]
}