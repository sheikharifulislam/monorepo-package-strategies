import config from '@my-workspace/lint-config/lint-staged.config';
export default {
  ...config,
  '*.css': ['stylelint --fix', 'prettier --write --cache'],
};
