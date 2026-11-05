# Reformation Resources (static prototype)

Live at https://reformationresources.themessyreformation.com

**These files are generated. Do not edit them by hand.** They are rebuilt from the
prototype at `~/projects/confessional-platform`, which holds the library, the index,
and the first reader:

```bash
cd ~/projects/confessional-platform/app
npm run static -- "<path to this folder>"
```

Then commit and push this folder. The build keeps `.git`, `CNAME`, `.nojekyll`,
`.gitignore`, and this README, and replaces everything else.

Only published resources are written. Private copies, held or in-review items, and
first-reader notes never leave the prototype.

"Make it your own" on this site downloads the new version as a Markdown file with
frontmatter (`kind: contextualized`, `parent_id`, `church`, `reflection`, `share`)
for the library agent to bring into the prototype.
