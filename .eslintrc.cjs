module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "react",
    "@typescript-eslint",
    '@typescript-eslint/eslint-plugin',
    "react-hooks"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json"
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['.eslintrc.cjs', 'tsconfig.json'],
  env: {
    "browser": true,
    "es2021": true
  },
  settings: {
    "react": {
      "version": 'detect'
    },
    "import/resolver": {
      "typescript": {}
    }
  },
  overrides: [],
  rules: {
    'indent': ['error', 2],
    'block-spacing': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': 'error',
    'object-curly-spacing': ['error', 'always'],
    'space-infix-ops': 'error',
    'semi': 'error',
    'quotes': ['error', 'single'],
    'brace-style': 'error',
    'no-extra-parens': 'error',
    'func-call-spacing': 'error',
    'comma-spacing': 'error',
    'comma-dangle': [
      'error', {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
      }
    ],
    "no-use-before-define": "off",
    
    // extensions
    'default-param-last': 'error',
    'no-array-constructor': 'error',
    'no-dupe-class-members': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/ban-types": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/no-unsafe-member-access": "off",
  },
}
