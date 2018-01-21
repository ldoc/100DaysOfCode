module.exports = {
    "env": {
      "browser": true,
      "node": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true,
        "modules": true
      }
    },
    "plugins": [
      "react"
    ],
    "rules": {}
  }