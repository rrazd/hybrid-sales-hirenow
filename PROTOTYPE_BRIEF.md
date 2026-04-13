# Hybrid Selling Prototype Brief

## Overview
An interactive hi-fi prototype built as a real React web app, representing a full user journey across multiple LinkedIn apps. Intended as an engineering handoff tool.

---

## User Journey
- **Two perspectives**: alternates between two users
  - **Alex** — the customer (LinkedIn user)
  - **Amy** — the sales rep (LinkedIn employee)
- The flow follows both users from start to finish across multiple apps
- ~15 screens total

---

## Tech Stack
- **Framework**: React
- **Component Library**: Ant Design (ANT)
- **Styling**: LinkedIn design tokens from the Figma file — do NOT deviate from these, do NOT use default ANT theme
  - ANT is used under the hood for structure/behavior only
  - All colors, typography, spacing, and visual language must match the Figma designs exactly
  - Extract token values (colors, type, spacing) directly from the Figma file

---

## Fidelity Rules
- **Preserve fidelity as-is from Figma** — do not upgrade or downgrade any screen
- Lower-fidelity screens are intentional — they signal to eng that those areas are out of scope for the team
- Higher-fidelity screens should be built with full interactivity where designed

---

## Control Panel (Left Sidebar)
A persistent left-side control panel visible throughout the prototype with:
- **Current perspective indicator** — clearly shows whether we are on Alex's or Amy's view
- **Journey step list** — ordered list of all steps in the flow, with the current step highlighted
- **Step blurb** — short description of each step
  - Some blurbs provided by the designer, some TBD — use placeholder until provided
  - Blurbs are fed progressively as screens are added one by one
- **Navigation** — allows jumping between non-continuous parts of the flow

---

## Interaction Model
- The prototype should feel like a real app, not a static clickable deck
- For higher-fidelity screens: real interactions where designed
- For lower-fidelity / non-continuous screens: **no clickable hotspots** — navigation via control panel only
- "Next" on a lower-fidelity screen advances to the next step via the control panel

---

## Viewport & Responsiveness
- **Primary**: Web at 1440px
- **Target**: Responsive — should reflow for other web breakpoints

---

## Source & Build Approach
- **Figma file**: `3RWkge6ZeRSIErmhSvu8F8` (section node `0:18909` — "Lo fi designsV2")
  - Section URL: https://www.figma.com/design/3RWkge6ZeRSIErmhSvu8F8/Untitled?node-id=0-18909
  - Note: Figma file already contains story annotation text nodes for many screens
- **Screen feeding**: One screen at a time — designer provides URL + perspective (Alex/Amy) + blurb per screen
- **Flow direction**: Left to right on the Figma canvas
- **Deployment**: Local for now; GitHub repo for later hosting

---

## Build Process
1. Designer shares screen URL + perspective + blurb (progressively)
2. Pull design context from Figma for that node
3. Build the screen as a React component using ANT + LinkedIn tokens
4. Add to control panel flow with correct step metadata
5. Wire navigation (next/prev or panel jump) between screens
6. Repeat

---

## Open Questions (resolved)
- [x] Figma file URL — provided
- [x] Screen organization — left to right, fed one by one
- [x] Screen count — ~15
- [x] Blurbs — fed progressively
- [x] Lo-fi interaction — no hotspots, control panel nav only
- [x] Design tokens — in Figma file, do not deviate
- [x] Deployment — local first, GitHub later

## Still Needed Before First Screen
- [ ] First screen URL + node ID from the designer
- [ ] Perspective for screen 1 (Alex or Amy)
- [ ] Blurb for screen 1 (or placeholder ok?)
