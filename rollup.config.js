import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.ts", 
  external: ["react", "react-dom"],
  output: [
    { file: "dist/index.cjs.js", format: "cjs", exports: "named", sourcemap: true },
    { file: "dist/index.esm.js", format: "esm", sourcemap: true }
  ],
  plugins: [
    resolve({ extensions: [".js", ".ts", ".tsx"] }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true,
      clean: true
    }),
    postcss({
      extensions: [".css", ".scss"],
      use: ["sass"],
      extract: "dist/styles.css",
      minimize: true,
      sourceMap: true
    })
  ]
};
