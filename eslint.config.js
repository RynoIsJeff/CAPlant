// ESLint Flat Config for ESLint 10+
module.exports = [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        console: "readonly",
        // jQuery
        $: "readonly",
        jQuery: "readonly",
        // Leaflet
        L: "readonly",
        // Shuffle
        Shuffle: "readonly",
      },
    },
    rules: {
      indent: ["error", "tab"],
      "linebreak-style": "off", // Disabled for cross-platform compatibility
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
  {
    ignores: ["node_modules/**", "theme/**", "*.min.js"],
  },
];
