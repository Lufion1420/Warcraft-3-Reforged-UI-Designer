// Cross-platform clean step for the build.
// Removes the generated output dirs so they don't accumulate stale files.
// Runs identically in cmd, PowerShell, and bash (no OS-specific shell tools),
// which is what keeps CI builds reproducible.
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')

for (const dir of ['app', 'build']) {
    fs.rmSync(path.join(root, dir), { recursive: true, force: true })
}
