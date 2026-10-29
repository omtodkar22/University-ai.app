---
name: Cyber-Academic Tech
colors:
  surface: '#0e1321'
  surface-dim: '#0e1321'
  surface-bright: '#343948'
  surface-container-lowest: '#090e1c'
  surface-container-low: '#161b2a'
  surface-container: '#1a1f2e'
  surface-container-high: '#252a39'
  surface-container-highest: '#303444'
  on-surface: '#dee2f6'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dee2f6'
  inverse-on-surface: '#2b303f'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dce6'
  primary: '#e0fdff'
  on-primary: '#00373a'
  primary-container: '#00f2fe'
  on-primary-container: '#006a70'
  inverse-primary: '#00696f'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#fcf5ff'
  on-tertiary: '#3c0091'
  tertiary-container: '#e2d4ff'
  on-tertiary-container: '#6e3cd8'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ff6ff'
  primary-fixed-dim: '#00dce6'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#0e1321'
  on-background: '#dee2f6'
  surface-variant: '#303444'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 2rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The brand personality bridges rigorous academic engineering with next-generation cybernetic infrastructure: analytical, authoritative, highly technical, and meticulously calibrated. It caters to distributed systems architects, cryptography researchers, security engineers, and protocol auditors who require uncompromising information density alongside crystalline visual hierarchy. 

The aesthetic fuses precise technical minimalism with controlled glassmorphism and crisp luminescent accents. Surfaces feel like hardened command decks and advanced analytical consoles—deep obsidian and slate-navy abysses illuminated by coherent, laser-sharp photons. Visual weight is communicated through high-density data readouts, micro-glows, thin semi-translucent containment borders, and structural monospaced indices rather than heavy skeuomorphism or decorative ornament.

## Colors
The palette is built on deep structural containment and targeted luminescence:
- **Base Canvas (`#0A0F1D`)**: The primary viewport void, providing infinite visual depth for layered interfaces.
- **Surface Elevation (`#111A2E`)**: The default panel fill, operating at varying levels of alpha transparency for glassmorphism layering (`rgba(17, 26, 46, 0.75)` to `rgba(17, 26, 46, 0.95)`).
- **Primary Cyber-Cyan (`#00F2FE`)**: Reserved for active execution states, primary CTAs, active cursor points, and high-priority cryptographic validations.
- **Secondary Electric Emerald (`#10B981`)**: Dedicated to verified audit nodes, passed runtime checks, positive state deltas, and telemetry health.
- **Tertiary Crisp Violet (`#8B5CF6`)**: Applied to protocol badges, taxonomic categorization tags, metadata pill annotations, and secondary status markers.
- **Subtle Surface Borders (`#1E293B` / `rgba(255, 255, 255, 0.08)`)**: Low-contrast boundaries that organize density without introducing visual clutter.

## Typography
Typographic scale enforces a strict dual-engine paradigm:
- **Inter** governs structural titles, narrative explanations, contextual documentation, and prose. Tracking tightens progressively as scale increases to maintain cohesion across large displays.
- **JetBrains Mono** governs data properties, numerical telemetry, state badges, hashes, audit traces, and metric outputs. Monospaced elements always leverage uppercase styling when used as semantic micro-labels (`label-sm`, `label-md`) to mirror academic instruments and command consoles.

## Layout & Spacing
The layout adheres to a 12-column fluid grid system with structural snap points:
- **Desktop (1280px+)**: 12 columns, 24px (`gutter-lg`) gutters, 48px (`margin-lg`) canvas padding. Optimized for dense three-pane analytical dashboards (navigation hierarchy, document editor/viewer, metadata telemetry inspector).
- **Tablet (768px - 1279px)**: 8 columns, 16px (`gutter`) gutters, 32px (`margin-md`) outer margin. The tertiary inspector pane collapses into an overlaid off-canvas drawer.
- **Mobile (0 - 767px)**: 4 columns, 16px (`gutter`) gutters, 16px (`margin`) outer margin. Content stacks linearly into a focused single-stream view with docked bottom utilities.

Rhythm is maintained via a strict 4px base increment, prioritizing compact information grouping (`space-xs` and `space-sm`) inside analytical cards, while using `space-lg` and `space-xl` to segment architectural domain boundaries.

## Elevation & Depth
Elevation is achieved through optical translucency, layered borders, and luminous dissipation rather than murky dropshadows:

1. **Base Tier (Ground Zero)**: Pure canvas `#0A0F1D` with subtle isometric dot-matrix or 32px grid patterns at 3% opacity.
2. **Surface Tier 1 (Panels & Cards)**: Translucent `#111A2E` at 85% opacity with `16px` backdrop-filter blur and a 1px uniform perimeter stroke of `rgba(255, 255, 255, 0.06)`.
3. **Surface Tier 2 (Floating Modals & Inspectors)**: Translucent `#111A2E` at 95% opacity with `24px` backdrop-filter blur, anchored by a 1px border of `rgba(0, 242, 254, 0.25)` and a directional top highlight: `inset 0 1px 0 0 rgba(255, 255, 255, 0.12)`.
4. **Luminescent Micro-Glows**: Interactive and active states cast micro-diffused glows using their respective accent color:
   - Cyber-Cyan: `0 0 16px -2px rgba(0, 242, 254, 0.35)`
   - Electric Emerald: `0 0 16px -2px rgba(16, 185, 129, 0.35)`
   - Crisp Violet: `0 0 16px -2px rgba(139, 92, 246, 0.35)`

## Shapes
Geometry is disciplined, precise, and architectural:
- The design system implements **Level 1 (Soft)** roundedness (`4px` base radius), delivering crisp visual clarity without brutalist harshness.
- Outer container frames, panels, and analytical viewport cards use `8px` (`rounded-lg`).
- Actionable controls, chips, tabs, input fields, and audit status badges use `4px` (`rounded-sm`).
- Circular geometry (`full`) is strictly restricted to live ping avatars, telemetry heartbeat dots, and radar trackers.

## Components

### Buttons
- **Primary**: Solid background filled with `rgba(0, 242, 254, 0.12)`, 1px border of `#00F2FE`, text in `#00F2FE` (`label-md`). Hover triggers a luminous wash: background to `rgba(0, 242, 254, 0.22)` with `0 0 16px rgba(0, 242, 254, 0.3)`.
- **Secondary**: Deep slate surface `#111A2E` with 1px border of `rgba(255, 255, 255, 0.1)`, text in `#E2E8F0`. Hover shifts border to `rgba(255, 255, 255, 0.25)`.
- **Destructive/Critical**: Dark crimson surface tinted with `#EF4444`, 1px border of `#EF4444`, text in `#FCA5A5`.

### Chips & Badges
- **Audit Indicators**: Rendered with `label-sm` in JetBrains Mono. 
  - **Passed/Optimal**: Background `rgba(16, 185, 129, 0.12)`, border `rgba(16, 185, 129, 0.4)`, text `#10B981`, accompanied by an animated or static emerald ping.
  - **Protocol/Taxonomy**: Background `rgba(139, 92, 246, 0.12)`, border `rgba(139, 92, 246, 0.4)`, text `#A78BFA`.
  - **Telemetry/Warning**: Background `rgba(245, 158, 11, 0.12)`, border `rgba(245, 158, 11, 0.4)`, text `#FBBF24`.

### Input Fields
- Dark recessed fill `#070B14` inset within `#111A2E` surfaces. 1px border of `rgba(255, 255, 255, 0.08)`.
- Typography in `code-md` or `body-md` in `#F8FAFC`. Placeholder in `#475569`.
- **Focus**: Border shifts to `#00F2FE` with a micro-glow shadow `0 0 0 1px #00F2FE, 0 0 12px rgba(0, 242, 254, 0.2)`.

### Checkboxes & Radios
- Box dimensions 16x16px with `2px` radius. Border is 1px `rgba(255, 255, 255, 0.2)` on `#070B14`.
- **Selected**: Fill switches to `#00F2FE` with inner check mark in dark `#0A0F1D`. Box emits a soft cyan radiance.

### Cards & Panels
- Constructed with backdrop blur (`16px`) and `rgba(17, 26, 46, 0.8)` fill. 
- Bordered with 1px `rgba(255, 255, 255, 0.07)`.
- Header partitions use an explicit 1px divider border of `rgba(255, 255, 255, 0.05)` accompanied by a JetBrains Mono title tag.

### Telemetry Trackers & Code Blocks
- Enclosed with `#050811` background.
- Left-hand gutters display line-numbers or time-series timestamps in `rgba(255, 255, 255, 0.3)`.
- Active execution line highlighted with subtle cyan-tinted scanline background `rgba(0, 242, 254, 0.04)`.