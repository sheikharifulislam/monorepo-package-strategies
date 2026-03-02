import config from '@my-workspace/lint-config/lint-staged.config';

export default {
  ...config,
  '*.{ts,tsx}': [], // no eslint at repo root — no eslint.config here
};
