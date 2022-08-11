/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")(["@babel/preset-react"]);

module.exports = withTM({
  reactStrictMode: true,
});
