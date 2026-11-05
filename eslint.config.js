import pluginVue from 'eslint-plugin-vue';

export default [
  { ignores: ['dist/**', 'dist-ssr/**', 'node_modules/**', 'playwright-report/**', 'test-results/**'] },
  ...pluginVue.configs['flat/essential'],
  { rules: { 'vue/multi-word-component-names': 'off', 'no-console': 'error', 'no-debugger': 'error' } },
  { files: ['scripts/**'], rules: { 'no-console': 'off' } },
];
