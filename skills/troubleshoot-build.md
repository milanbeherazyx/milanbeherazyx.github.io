# Skill: troubleshoot-build

Error → fix lookup for `npm run build` failures (which runs
`astro check && astro build`). Match the error text, apply the fix, rerun.
If nothing here matches: do NOT guess at fixes in forbidden zones — record
the full error in agent/STATE.md under "Blocked / needs owner" and stop.

## Frontmatter / content errors (most common — you probably caused it)

| Error contains | Cause → fix |
|---|---|
| `[InvalidContentEntryFrontmatterError]` / `does not match collection schema` | A frontmatter field is missing, misspelled, or the wrong type. The error names the file and field. Compare against the collection's `_example.md` — do NOT edit `src/content.config.ts` to make the error go away. |
| `Expected type "date"` | `pubDate` must be unquoted `YYYY-MM-DD`. |
| `Expected type "boolean"` | `draft: false`, not `draft: "false"`. |
| `Invalid frontmatter` / YAML parse error | Broken YAML — usually an unescaped `:` or quote inside a value. Quote the whole value: `title: 'A: B'`. |
| duplicate route / two entries same slug | Two content files map to one URL — rename one file. |

## astro check (type) errors

| Error contains | Cause → fix |
|---|---|
| `ts(2322)` / `ts(2339)` in a `.astro` file you edited | Your edit broke a prop/type. Revert your edit and re-do it matching the file's existing patterns. |
| type errors in files you did NOT touch | Likely a dependency drift — see skills/dependency-update.md "rollback" and restore `package-lock.json`. |

## Environment errors

| Error contains | Cause → fix |
|---|---|
| `command not found: astro` / `Cannot find module` | `npm ci` (fresh clone or wiped node_modules). |
| `EBADENGINE` / node version complaints | Node must be v22 (what CI uses): `node --version`; install via your version manager. |
| `ENOSPC` / watcher limits (Linux) | `sudo sysctl fs.inotify.max_user_watches=524288` |
| build passes locally, fails in CI only | Check the Actions log for the exact step. If it's Lighthouse perf only and looks absurd, see skills/release-recovery.md §E4 (known flake) before changing anything. |

## Golden rules

- Fix the CONTENT, never the schema/config. `src/content.config.ts`,
  `astro.config.mjs`, `.lighthouserc.json`, `.github/**` are forbidden
  zones for this.
- One fix at a time, rerun `npm run build` after each.
- The full log is in `.agent-out/build.log` if you ran verify.sh;
  otherwise rerun with `npm run build 2>&1 | tail -40`.
