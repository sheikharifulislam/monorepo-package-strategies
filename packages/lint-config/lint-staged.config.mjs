export default {
  '*.(css|html|d.ts|js|json|ts|tsx)': 'prettier --write --cache',
  '*.{ts,tsx}': ['eslint --fix --cache'],
};
