import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

const config = [
  {
    ignores: ['temp/**', 'tmp/**', '.agents/**', '.cursor/**'],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
];

export default config;
