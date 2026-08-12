# Lab assistant knowledge base

Everything the Lab chat assistant knows about AigleOn Labs lives in this folder as
Markdown. Nothing is hard-coded in the application source.

## Adding or changing knowledge

1. Add a new `.md` file here (or edit an existing one).
2. Restart the backend, **or** open the Lab page → Admin → **Reindex site content**.

The assistant re-reads the folder, re-indexes only the files whose contents changed, and
starts answering from the new material immediately.

## Rules

- Only `.md` files are indexed.
- Files starting with `_` are ignored — that's why this file isn't part of the knowledge
  base. Use the prefix for notes and drafts.
- Subfolders are supported, so topics can be grouped (for example `services/seo.md`).
- The first `# Heading` becomes the document's title, which the assistant shows as the
  source of an answer. Without one, the filename is used.
- Deleting a file removes that knowledge from the assistant on the next reindex.

## Writing guidance

The assistant answers **only** from what is written here and refuses anything it cannot
support, so:

- State facts plainly, including prices, timelines, and package contents.
- Prefer short sections with clear headings; each file is split into chunks and retrieved
  by relevance, so self-contained sections retrieve better than long narrative.
- Keep one topic per file. It makes updating a price or policy obvious later.
- Don't leave outdated figures in place — the assistant will happily quote them.

If a visitor asks something the assistant cannot answer, the question is emailed to the
founders. Those emails are the backlog of what is missing from this folder.

## Uploads

The Admin panel on the Lab page can also upload `.txt`, `.md`, and `.pdf` files, which are
stored in the database rather than here. Anything meant to be permanent and reviewable
belongs in this folder, in version control.
