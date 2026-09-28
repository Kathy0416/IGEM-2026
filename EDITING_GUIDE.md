# Editing the wiki articles

Each route has one text file in **`src/content/pages/`**. For example, edit
`description.md` for Project Description, `protocol.md` for Protocol, and
`human-practices.md` for Human Practices. `home.md` adds the homepage narrative;
`team.md` adds the organization/workstream sections below the existing roster.
The real roster, photographs, biographies, and dialogs remain in their React files.

## Replace the sample text

1. Open the corresponding Markdown file and replace the Shakespeare paragraphs
   and their speaker labels with verified team text. Ordinary paragraphs need no
   special markup: leave one blank line between them.
2. Keep or rename the section headings. Page contents and site search update
   automatically. Check incoming links after renaming a heading.
3. Replace sample tables, procedure entries, demonstration dates, visual slots,
   and the Shakespeare reference with your actual material and sources.
4. Remove `<!-- LAYOUT_SAMPLE -->` only once the entire file is ready. Until then,
   the page shows one sample-content notice. The publication audit also detects
   remaining literary text, `DEMO-` identifiers, and sample figures.
5. Record sources and media permissions in `CONTENT_SOURCES.md`.

The supplied passages are original speeches from William Shakespeare's
*The Winter's Tale*, sourced from [Project Gutenberg eBook 1539](https://www.gutenberg.org/ebooks/1539).
Only whitespace was reflowed; speaker, act, and scene are shown above each passage.
They are layout samples, not descriptions of the team or its research.

## Headings, links, and paragraphs

The page title and summary live in `src/pages.ts`. Start article sections with
`##`; use `###` for subsections and `####` for smaller divisions. Do not add a
second page title with `#`.

```markdown
## Background

A paragraph of your verified text.

### Research question

A second paragraph. **Bold** and *italic* text are supported.

[Read our methods](/experiments)
[Jump to background](#article-background)
```

Heading IDs begin with `article-`. Repeated headings receive `-2`, `-3`, and so
on. For example, a second `### Design` becomes `#article-design-2`. Use the links
in the page's contents menu to copy the correct anchor.

## Figures, quotations, tables, and code

Place each image on its own line. The bracketed text describes the image for
readers using assistive technology; the optional quoted title is the caption.
Upload real images to iGEM before inserting their URL.

```markdown
![What the diagram shows](https://static.igem.wiki/teams/TEAM/wiki/figure.avif "Figure 1. Caption and source.")

> A short quotation or important explanatory note.
>
> Include its attribution or reference.

| Condition | Observation | Source |
| --- | --- | --- |
| Your condition | Your observation | Your source |

1. First procedure step, with units and conditions.
2. Second step.
   - Additional explanation.
   - A second supporting detail.
```

Fenced code blocks use three backticks, optionally followed by a language name.
Code remains selectable and wide lines scroll within the block. Tables also
scroll within their container on small screens. Raw HTML is not rendered.
Use inline links such as `[1](https://example.org/paper)` for citations;
put the full source in a References section. Figures and references
are numbered explicitly in the text so authors control their scientific meaning.

## Protocol search and notebook filters

Each searchable/filterable record starts with an H2 heading. Place its metadata
comment immediately beneath the heading. All its H3 subsections belong to that
record until the next H2 heading. Keep the metadata in the same Markdown file.

```markdown
## Protocol 01 · Your procedure
<!-- record version="v1 · 2026-09-28" -->

### Purpose and materials

Your explanation and materials.

### Procedure

Your numbered steps.
```

```markdown
## Entry 01 · Your activity
<!-- record date="2026-09-28" workstream="Wet Lab" -->

### Observations

Your laboratory record.

### Decisions and next steps

Your interpretation and related links.
```

Use ISO dates (`YYYY-MM-DD`) and consistent workstream names. Notebook entries
are displayed in source order: keep them chronological. Search matches titles
and body text. Date limits are inclusive; filters combine. Sections without a
`record` comment, such as an introduction or references, remain visible.
Opening a direct section link clears filters so its target is always accessible.

## Layout and validation

The shared reading styles live in `src/containers/App/Reading.css`; theme colors
come from `Theme.css`. The 1,360px shell leaves room for diagrams and tables,
while paragraphs keep a readable measure. Layout variants are selected by
`readingLayout` in the route metadata. Real team bios continue to be edited in
`src/contents/members.tsx`.

Run `corepack yarn verify` after editing. It checks article routes/anchors,
lint, compliance, TypeScript, and the production build. Run
`corepack yarn audit:strict` before publishing; it intentionally fails while
sample content or required team placeholders remain. Check a desktop and mobile
preview in both themes whenever adding large figures or tables.
