/** EXTERNALS **/

import { pascalCase, snakeCase } from "https://esm.sh/tiny-case@1.0.3";

/** HELPERS **/

function preactComponentFromSvg(name: string, svg: string) {
  const source = svg
    .trim()
    .split("\n")
    // remove specific lines: width="24" and height="24"
    .filter((_, i) => ![1, 2].includes(i))
    // indent
    .map((line) => `    ${line}`)
    .join("\n");
  return `export function ${name}() {
  return (
${source}
  );
}
`;
}

/** MAIN **/

const root = new URL(import.meta.url);
const sourceDir = new URL("icons/svg/", root);
const outputDir = new URL("icons/tsx-esm/", root);

Deno.mkdirSync(outputDir, { recursive: true });

const entries = [...Deno.readDirSync(sourceDir)]
  .filter((file) => file.isFile)
  .filter((file) => file.name.endsWith(".svg"))
  .map((file) => file.name.slice(0, -4))
  .sort()
  .map((sourceName, i) => {
    const outputName = snakeCase(sourceName);
    const funcName = pascalCase(sourceName);
    const sourceFile = new URL(sourceName + ".svg", sourceDir);
    const outputFile = new URL(outputName + ".tsx", outputDir);

    const logLine = `<${funcName}> ${sourceName} -> ${outputName}}`;
    console.log(i + 1, logLine);

    const source = Deno.readTextFileSync(sourceFile);
    const output = preactComponentFromSvg(funcName, source);
    Deno.writeTextFileSync(outputFile, output);
  });

console.log("-".repeat(entries.length.toString().length), "-".repeat(10));
console.log(entries.length, `files generated`);
