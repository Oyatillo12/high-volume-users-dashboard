# High-Volume Users Dashboard

A high-performance React dashboard built to handle large datasets (10,000+ users) efficiently while demonstrating rendering optimization, virtualization, and scalable architecture.

## FSD Architecture

The `src` directory is organized into layers:

- **`app`**: Application entry point (`main.tsx`, `App.tsx`, global providers/styles).
- **`pages`**: Composition of features and entities into full pages (e.g., `UsersPage`).
- **`features`**: User-facing features (Search, Sort, Filter).
- **`entities`**: Domain entities (User model, API, helpers, specialized UI like `UsersTable`).
- **`shared`**: Reusable UI components (`Button`, `Input`, `Modal`, etc.) and utilities.

### Why FSD?

- Clear domain boundaries
- Scalable structure
- Separation of concerns
- Production-ready organization

## Technology Stack

- **React + TypeScript**: Core framework.
- **Vite**: Build tool.
- **CSS Modules**: Component-scoped styling.
- **CSS Variables**: Design system tokens (`theme.css`).
- **@tanstack/react-virtual**: Virtualization for high-performance rendering of 10,000+ rows.
- **@faker-js/faker**: Generate mock data.

## Performance Optimizations

1.  **Virtualization**: `UsersTable` uses windowing to render only the visible rows (~20) out of 10,000, keeping the DOM light.
2.  **Memoization**:
    -   `UsersTable` `Row` component is memoized to prevent re-renders when other rows change.
    -   Expensive computations (`computeUserScore`) are memoized per row.
    -   Filter/Sort logic is memoized in `UsersPage` to avoid recalculating on unrelated renders.
3.  **Debouncing**: Search input is debounced (400ms) to prevent excessive filtering on every keystroke.
4.  **Optimistic Updates**: User updates are reflected immediately in the UI before the API call completes.

## Design System

A lightweight design system is implemented in `src/shared` using CSS Modules.
Tokens are defined in `src/shared/styles/theme.css`.

## Running the Project

```bash
pnpm install
pnpm dev
```
