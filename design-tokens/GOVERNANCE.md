# Governance

## Versioning
This system uses Semantic Versioning (SemVer).
- Major: Breaking changes (e.g., renaming or removing tokens).
- Minor: New tokens or features.
- Patch: Value adjustments that do not break the system.

## Approval Flow
1. Designers propose changes in Figma/Tokens Studio.
2. Pull Request created with updated JSON files.
3. Automated validation runs (format check, reference check).
4. Review by Design System Lead and Tech Lead.
5. Merge and automated publication (NPM package / assets).

## Accessibility
All color tokens must pass WCAG 2.1 AA contrast ratios.
