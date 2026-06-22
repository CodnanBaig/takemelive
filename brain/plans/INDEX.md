# Plans Index

## ID Ledger

| Field | Value |
|------|-------|
| Last Assigned ID | 001 |
| Next ID | 002 |

## Ledger Rules

- Plan IDs are global and immutable.
- IDs are never reused.
- Completed plans reserve their IDs forever.
- New plan IDs must be calculated from `INDEX.md`, active files, and completed files.
- Do not calculate next ID from `brain/plans/` alone.

## Overview

| Category | Count |
|----------|-------|
| Active plans | 0 |
| Completed | 1 |
| **Total** | **1** |

## Completed Plans

| ID | Title | Tier | Completed |
|----|-------|------|-----------|
| 001 | Homepage audit polish pass | full-feature | 2026-06-22 |

## Active Plans by Status

### Proposed

| ID | Title | Tier |
|----|-------|------|
| _none_ | | |

### Approved

| ID | Title | Tier |
|----|-------|------|
| _none_ | | |

### In progress

| ID | Title | Tier |
|----|-------|------|
| _none_ | | |

## Plan Structure

Each plan file contains YAML frontmatter plus Summary, Goal, Phased plan, Acceptance criteria.
