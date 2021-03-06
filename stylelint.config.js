module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-prettier',
  ],
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    'selector-list-comma-newline-after': null,
    'no-descending-specificity': null,
    'value-list-comma-newline-after': null,
    'declaration-colon-newline-after': null,
    'color-hex-case': 'lower',
    'font-family-no-missing-generic-family-keyword': null,
    'no-duplicate-selectors': null,
    'block-closing-brace-newline-after': null,
    'at-rule-empty-line-before': null,
    'no-empty-source': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'mixin',
          'function',
          'include',
          'each',
          'for',
          'if',
          'else',
          'extend',
          'while',
          'return',
          'warn',
          'tailwind',
          'apply',
          'screen',
          'layer',
          'variants',
          'responsive',
        ],
      },
    ],
  },
  files: [
    '**/*.{vue,htm,html,css,sss,less,scss,sass}',
  ],
  ignoreFiles: [
    'coverage/**',
    'static/**',
    'dist/**',
    '.nuxt/**',
    'node_modules/**',
    'plain-html/**',
    'assets/css/icons/**',
    'assets/plugins/**',
  ],
};
