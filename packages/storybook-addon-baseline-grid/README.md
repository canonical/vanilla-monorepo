# Storybook Addon DS Baseline Grid

Displays the baseline grid overlay in the Storybook preview.

### Development scripts

- `bun run start` runs babel in watch mode and starts Storybook
- `bun run build` builds and packages the addon

### Addon implementation

The addon logic lives mostly in following files:

- `src/components/Tool.tsx` - component that renders the addon button in the toolbar and toggles the global variable that enables the baseline grid overlay
- `src/withBaselineGrid.ts` - decorator that adds a `show-baseline-grid` CSS class name to the story based on global state
- `/src/manager.tsx` - registers the addon with Storybook manager and handles in what state of Storybook addon is enabled
- `/src/preview.tsx` - registers the decorator with Storybook preview

Current addon implementation relies on `show-baseline-grid` CSS class name being provided by the CSS (for example using our styles package).

Current implementation lives in [`baseline-grid.css`](
https://github.com/canonical/ds25/blob/main/packages/styles/src/baseline-grid.css). The size of the grid can be adjusted by changing the `--sp-unit` CSS variable.

### Storybook Addon Kit README

This addon was created using the Storybook Addon Kit.

Check the [full README generated](ADDON_KIT_README.md) by Addon Kit for more information. We will update this README with proper docs in future.
