module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  rules: {
    "react/prop-types": "off"
  }
};