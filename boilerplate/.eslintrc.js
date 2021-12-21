module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "no-console": "off", // console.log(사용하는 것 금지)
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-expressions": 0,
    "import/extensions": ["off"],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off", //values returned from a module are of the expected type.
    "no-nested-ternary": "off",
    // 삼항연산안에 또 삼항연산 하는 것을 방지
    "react/jsx-filename-extension": "off", // <> </>쓰는 것 방지
    "spaced-comment": "off", // 주석 쓰는 것 방지
    "no-unused-variable": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "react/prop-types": "off",
    "no-useless-escape": 0,
    "no-mixed-spaces-and-tabs": 0,
  },
  settings: {
    react: {
      version: "detect", // 현재 사용하고 있는 react 버전을 eslint-plugin-react가 자동으로 감지합니다.
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".js", ".css"],
    },
  },
};
