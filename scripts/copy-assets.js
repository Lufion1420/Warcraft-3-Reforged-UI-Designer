// Cross-platform asset copy for the build.
// tsc (outDir: "app") emits the compiled JS into app/; this step copies the
// static assets the renderer needs (index.html, styles, bootstrap, images)
// into app/ as well. It replaces the old Windows-only `xcopy` scripts, which
// silently failed on non-cmd shells (e.g. CI) and shipped a half-built app/.
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')

// [source dir, destination dir] — destination is relative to the project root.
const copies = [
    ['src/layout', 'app'], // index.html, styles.css, bootstrap.min.css, etc.
    ['src/styles', 'app/styles'],
    ['files', 'app/files'],
]

for (const [from, to] of copies) {
    const src = path.join(root, from)
    const dest = path.join(root, to)

    if (!fs.existsSync(src)) {
        throw new Error(`copy-assets: source "${from}" does not exist`)
    }

    fs.mkdirSync(dest, { recursive: true })
    fs.cpSync(src, dest, { recursive: true })
    console.log(`copy-assets: ${from} -> ${to}`)
}
