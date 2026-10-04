# Looksmaxxing Evidence × Risk Map

A one-page static tool that places looksmaxxing practices on a grid: how well the community's claim holds up versus how much harm the practice does the way people actually do it.
It is an unofficial prototype built for [looksmaxxing.guide](https://looksmaxxing.guide) and is not medical advice.
The prompts that build it, and the decisions behind them, are in [PROMPTS.md](PROMPTS.md).

## How to rebuild

Requires Node 18 or newer. There are no dependencies and nothing to install.

```sh
node merge.mjs                       # joins data/verified/*.json into data/practices.verified.json
node build.mjs                       # reads data/practices.verified.json
node build.mjs data/fixture.json     # reads another file, e.g. the placeholder fixture
```

`build.mjs` takes one optional argument, the path to the dataset JSON. Output always goes to `docs/`:

- `docs/index.html`: the whole page. Content, CSS and JSON-LD are inline; the inline JS (category filter only) is kept under 6 KB.
- `docs/practices.json`: a copy of the input file.

The build stops with a message, and writes nothing, if an entry is malformed (bad id, score outside 0 to 4, non-http source URL, missing required field), if the inline JS goes over budget, or if any text/background colour pair falls below 4.5:1. Soft problems (not 28 entries, risk 2 or more without a safer alternative, an `internal_link` that is not an `/en/.../` path) are printed as warnings.

Verdicts are derived in `build.mjs` and never stored in the JSON. The rubric text, verdict rules and colour tokens each live in one object at the top of the file.

Optional environment variables:

- `PAGE_URL`: where the prototype is hosted, used for absolute URLs in the JSON-LD and `og:url`. Defaults to the GitHub Pages address inferred from the repository's `origin` remote, `https://tupap1.github.io/jubilant-dollop/`.
- `OG_IMAGE`: absolute URL of a social preview image. `og:image` and `twitter:image` are only emitted when this is set.

To preview, open `docs/index.html` in a browser; no server is needed. To publish, serve the `docs/` folder with GitHub Pages (branch `main`, folder `/docs`).

`data/fixture.json` is placeholder data for layout work only. Rebuild from the reviewed dataset (`node build.mjs`) before publishing, because building from the fixture overwrites `docs/`.
