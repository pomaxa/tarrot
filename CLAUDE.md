# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Cyberpunk-themed Tarot card web application built with React, TypeScript, and Vite. It features a complete 78-card tarot deck (22 Major Arcana + 56 Minor Arcana) with interactive card readings and a cyberpunk aesthetic. The application supports multiple spread types including single card, three-card, and Celtic Cross readings.

Original design: https://www.figma.com/design/VtclBAWNJsCkD3p4RpBcvY/Cyberpunk-Tarot-Cards

## Development Commands

```bash
# Install dependencies
npm i

# Start development server (runs on port 3000, opens browser automatically)
npm run dev

# Build for production (outputs to ./build directory)
npm run build
```

Note: There are no test or lint commands configured in this project.

## Architecture

### Core Application Structure

- **Entry Point**: `src/main.tsx` creates React root and mounts App component
- **Main App**: `src/App.tsx` - Root component with view routing between deck browsing and tarot readings
- **View States**: Two main views toggled by navigation buttons:
  - `'deck'`: Browse all cards with search/filtering (renders `<TarotDeck />`)
  - `'reading'`: Perform tarot card readings (renders `<TarotReading />`)

### Data Layer

Two parallel data structures exist in this codebase (likely from a refactoring):

1. **`src/types/tarot.ts`**: Contains `TAROT_CARDS` array with older structure including cyberpunk themes and gradients
2. **`src/components/tarot-data.ts`**: Contains `allCards` array (currently used) with structure:
   - Exports `majorArcana` (22 cards) and `minorArcana` (56 cards)
   - Cards have `id`, `name`, `nameRu`, `type`, `suit`, `number`, `meaning`, `keywords`, `colors` (primary/secondary/accent), `symbol`
   - Minor Arcana generated programmatically using `Array.from()` for all four suits (wands, cups, swords, pentacles)

**Important**: The application currently uses `tarot-data.ts`. When modifying card data, update this file, not `types/tarot.ts`.

### Key Components

- **`TarotDeck.tsx`**: Grid view of all cards with:
  - Search functionality (searches both English and Russian names)
  - Filter buttons (All/Major/Minor arcana)
  - Modal for expanded card details when clicked

- **`TarotReading.tsx`**: Tarot reading interface with:
  - Three spread types: 'one' (single card), 'three' (past/present/future), 'celtic' (10-card Celtic Cross)
  - Card drawing animation (1.5s delay with shuffle effect)
  - Different layouts for each spread type (Celtic Cross uses CSS Grid positioning)

- **`TarotCard.tsx`**: Individual card component (implementation not reviewed but used throughout)
- **`CardDetail.tsx`**: Card detail view component (implementation not reviewed)

### Styling & UI

- Uses Tailwind CSS with custom cyberpunk aesthetic
- Color scheme: cyan (#00ffff), purple, pink, slate backgrounds
- Radix UI components for accessible UI primitives (accordion, dialog, popover, etc.)
- Lucide React for icons
- Global styles in `src/index.css` and `src/styles/globals.css`
- Background: Animated cyber grid pattern (cyan lines) with gradient overlays

### Build Configuration

**Vite Config** (`vite.config.ts`):
- React with SWC plugin for fast refresh
- Build target: `esnext`, output to `build/` directory
- Dev server: port 3000, auto-opens browser
- Path alias: `@` → `./src` (use `import { Component } from '@/components/Component'`)
- Extensive package version aliases (maps versioned imports to unversioned)

## Code Conventions

- **Languages**: Russian text throughout UI for card names and interface labels
- **Card IDs**: Format is `'major-{number}'` for major arcana, `'{suit}-{number}'` or `'{suit}-{court}'` for minor arcana
- **State Management**: Simple useState hooks, no global state library
- **Component Pattern**: Functional components with TypeScript
- **Styling**: Inline Tailwind classes with occasional inline styles for dynamic colors
