# Hybrid Selling — HireNow Prototype

An interactive prototype exploring the end-to-end user journey for LinkedIn's Full Service Hiring product, focusing on key LBP (LinkedIn Business Platform) touchpoints across both the customer and sales rep experience.

---

## Overview

This prototype simulates a two-persona journey:

- **Alex** — the customer (hiring manager) discovering, evaluating, and purchasing Full Service Hiring
- **Amy** — the LinkedIn sales rep managing leads, building quotes, and guiding Alex through checkout

The flow covers 11 steps from initial job posting through order confirmation, blending lo-fi wireframes for early-stage screens and high-fidelity mockups for key interaction points.

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Tech Stack

- **React + TypeScript** — component framework
- **Vite** — build tool and dev server
- **Ant Design v5** — UI component library
- **CSS Modules** — scoped per-screen styling
- **Figma MCP** — design assets sourced directly from Figma

---

## Notes

- This is a **prototype only** — not intended for production use
- Some screens use lo-fi placeholder content (gray bars, blank shapes) to represent unbuilt UI
- Navigation is controlled via the side panel; certain steps have in-screen interactions (e.g. placing an order advances to the next step)
