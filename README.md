# eibens/css.gg

This is a fork of [css.gg](https://github.com/astrit/css.gg).

## Why?

Add the [generate.ts](generate.ts) script to generate TSX ES modules that 
are independent of the React implementation.

## How?

Running this command will generate the TSX files under [icons/tsx-esm](icons/tsx-esm).

```bash
deno run --allow-read --allow-write generate.ts
```

Add this to your import map:

```json
{
  "imports": {
    "icons": "https://raw.githubusercontent.com/eibens/css.gg/main/icons/tsx-esm/"
  }
}
```

Then import the icons like this:

```tsx
import { ArrowLeft } from "icons/ArrowLeft.tsx";
```
