import autoprefixer from "autoprefixer";
import postcssNested from "postcss-nested";
import normalize from "postcss-normalize";

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    autoprefixer(),
    postcssNested(),
    normalize()
  ],
};

export default config;
