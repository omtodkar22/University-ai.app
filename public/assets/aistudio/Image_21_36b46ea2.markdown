---
name: SpecForge
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#44474d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777e'
  outline-variant: '#c5c6ce'
  surface-tint: '#515f7a'
  primary: '#000412'
  on-primary: '#ffffff'
  primary-container: '#0f1e36'
  on-primary-container: '#7886a3'
  inverse-primary: '#b8c7e6'
  secondary: '#43617c'
  on-secondary: '#ffffff'
  secondary-container: '#c1e0ff'
  on-secondary-container: '#46647e'
  tertiary: '#000703'
  on-tertiary: '#ffffff'
  tertiary-container: '#002415'
  on-tertiary-container: '#37966d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#b8c7e6'
  on-primary-fixed: '#0c1b33'
  on-primary-fixed-variant: '#394761'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#abcae8'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#2b4963'
  tertiary-fixed: '#98f6c5'
  tertiary-fixed-dim: '#7cd9aa'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
  code-rule:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.5rem
  gutter-desktop: 1.25rem
  margin-desktop: 2rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 1.75rem
  space-2xl: 2.5rem
---

## Brand & Style

This design system serves academic engineering faculties, provosts, curriculum committees, and institutional accreditation bodies (such as ABET, CEAB, and EUR-ACE). The aesthetic communicates institutional rigor, archival permanence, and mathematical precision.

The visual direction merges **Corporate / Modern** institutional authority with technical **Precision Density**:
- Crisp, low-diffuse structural borders and hairline rules organize dense information hierarchies.
- Layouts reject decorative empty space in favor of compact, purposeful utility designed for audits, multi-year curriculum matrices, prerequisite graphs, and outcome-mapping workflows.
- Visual elements evoke blueprint annotations, engineering schematics, and official university governance documents without veering into pastiche.

## Colors

The palette establishes an authoritative, institutional baseline calibrated for high readability across dense data grids and validation reviews:

- **Primary (`#0F1E36` - Academic Deep Navy):** Anchors primary actions, core headers, navigation shells, and structural outlines. Imparts stability and administrative permanence.
- **Secondary (`#3E5C76` - Slate Blue):** Delivers secondary metadata, section grouping tabs, inactive indicators, and supporting interface lines.
- **Tertiary (`#0D7A53` - Emerald Approval):** Denotes approved accreditation standards, compliant course outcomes, fully resolved validation checks, and certified audits.
- **Warning Accent (`#B45309` - Amber Draft / Pending):** Communicates curricular discrepancies, pending department approvals, prerequisite warnings, and draft statuses.
- **Neutral Surface (`#F8FAFC` - Off-White Canvas):** High-clarity, non-glare surface base that sustains multi-hour document analysis, accompanied by cold-grey card backgrounds (`#FFFFFF`) and hairline division borders (`#E2E8F0`).

## Typography

The type system prioritizes structural tabular rendering and analytical density:

- **Inter:** Drives all administrative narrative headers and core body content. Tabular figures (`tnum`) and stylistic sets for clean punctuation are activated globally by default to prevent vertical layout shifts in numerical listings.
- **JetBrains Mono:** Dedicated to computational metrics, course codes (e.g., `ECE-4030`), ABET criteria IDs (e.g., `CRIT-3.B.2`), credit-hour allocations, formula validations, and timestamp audit trails.
- Line heights remain tight to optimize screen real estate for complex curriculum matrices, audit diffs, and multi-tier prerequisite trees.

## Layout & Spacing

The layout model utilizes a structured, high-density fluid grid engineered to display complex multi-column audit reports and course flowcharts:

- **Grid System:** 12-column layout on desktop viewports (1280px+) with dense 1.25rem gutters. Adjusts to an 8-column system on tablet (768px–1279px) and a single-column reflow on mobile screens (<768px).
- **Rhythm Philosophy:** Based on a strict 4px/8px micro-metric system. Component padding preserves vertical compactness (`space-xs` to `space-sm`) so faculty evaluators can review syllabi and criteria mappings without excessive scrolling.
- **Side Panel Anchoring:** Audit validation sidebars and prerequisite inspectors maintain fixed tabular widths (320px–380px) alongside fluid core work surfaces.

## Elevation & Depth

Visual hierarchy relies on **low-contrast structural outlines** and **tonal layer stacking** rather than heavy drop shadows:

- **Borders & Dividers:** Primary depth is created using 1px hairline borders (`#E2E8F0` and `#CBD5E1`). Surfaces contrast cleanly against the `#F8FAFC` base canvas.
- **Surface Elevation Levels:**
  - *Base Surface (Canvas):* `#F8FAFC`
  - *Tier 1 (Panels & Table Rows):* `#FFFFFF` bounded by solid hairline borders.
  - *Tier 2 (Popovers, Modals & Metric Flyouts):* `#FFFFFF` with a subtle, non-diffuse administrative shadow (`0 2px 6px rgba(15, 30, 54, 0.08)`).
- **State Highlighting:** Active or focused audit rows receive an explicit `2px` left border in primary navy (`#0F1E36`) or validation emerald (`#0D7A53`), ensuring deterministic visual tracking.

## Shapes

The design system maintains a **Soft (`1`)** shape geometry, establishing an engineered, structured aesthetic:

- **Base Radius (0.25rem / 4px):** Applied to form controls, course code chips, criteria badges, buttons, and audit table cells.
- **Card & Container Radius (`rounded-lg`, 0.5rem / 8px):** Applied to structural matrices, modal dialogs, and curriculum module panels.
- **Technical Precision:** Rounding is deliberately restrained to prevent an overly casual feel and maximize edge-to-edge alignment in dense data grids.

## Components

### Buttons
- **Primary:** Background `#0F1E36`, text `#FFFFFF`, 0.25rem border-radius, font `Inter` 13px weight 600. Minimal vertical padding (`space-xs` top/bottom, `space-md` left/right). Hover shifts to `#1E3A60`.
- **Secondary / Outline:** Background transparent, 1px solid border `#CBD5E1`, text `#0F1E36`. Hover background `#F1F5F9`.
- **Validation Action:** Background `#0D7A53`, text `#FFFFFF`. Used strictly for signing off on accreditation standards and approving course proposals.

### Badges & Status Chips
- Built with `JetBrains Mono` at `label-sm` (10px).
- **Compliant / Approved:** Background `#E6F4EA`, text `#0D7A53`, border `1px solid #A3D9B8`.
- **Draft / In Review:** Background `#FEF3C7`, text `#92400E`, border `1px solid #FCD34D`.
- **Course Code Token:** Background `#EDF2F7`, text `#0F1E36`, 1px solid `#CBD5E1`, padding 2px 6px.

### Inputs & Select Fields
- Height restricted to 32px for compact data entry.
- 1px hairline border `#CBD5E1`, background `#FFFFFF`, font `Inter` 13px. Focus states display a crisp `1px solid #0F1E36` ring with zero shadow offset.

### Tabular Audit Grids & Lists
- Table headers use `Inter` 12px uppercase, letter-spacing `0.05em`, color `#64748B`, background `#F1F5F9`.
- Row height fixed at 36px for dense scans. Alternating row background: `#FFFFFF` and `#F8FAFC`.
- Interactive cells display instant hairline focus rings on keyboard navigation.

### Accreditation Matrix Nodes
- Course-to-Program-Outcome mapping nodes use a 24x24px grid cell.
- Fully mapped criteria show a solid emerald indicator (`#0D7A53`), partial maps display a diagonal two-tone slate hatch, and unmapped criteria retain an empty hairline ring.