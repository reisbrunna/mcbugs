# McBugs

McBugs is a self-service restaurant kiosk. A customer walks up, chooses how they want the meal, builds an order from a themed menu, and checks out. The interface is built for a large touch screen, the way a counter totem works in a real restaurant.

The menu is a fictional burger shop with developer-themed items (Big Mock, Duplo Deploy, Batatas Full Stack, and so on). Orders are stored so the same flow can be exercised by a person or by an automated test.

## What it is for

The app is a complete ordering surface for learning and practicing end-to-end testing. It covers the path a kiosk actually takes: service type, catalog, cart, customer name, payment, and confirmation. Playwright tests drive that path in the browser and then check that the order was written to the database.

It is not a production point-of-sale system. Payment is simulated: PIX, debit, and credit are choices the customer confirms on screen, and the order is marked paid in the database. There is no card terminal or real PIX charge.

## Order flow

1. **Home** — choose dine in or takeaway.
2. **Menu** — browse burgers, fries, drinks, and desserts.
3. **Product** — read the item and set the quantity.
4. **Cart** — review lines, change quantities, and enter a customer name.
5. **Payment** — pick PIX, debit, or credit.
6. **Confirmation** — see the order number and return to the start.

The cart and the in-progress order stay in `localStorage`, so a refresh does not wipe the session. Confirmed orders are inserted into PostgreSQL through Supabase.

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 18, TypeScript, React Router |
| Build | Vite 5 |
| Styling | Tailwind CSS, Radix UI (shadcn/ui), Lucide |
| Forms and data | React Hook Form, Zod, TanStack Query |
| Backend | Supabase (PostgreSQL) |
| Client state | React context plus `localStorage` |
| End-to-end tests | Playwright, Page Object Model, Kysely and `pg` for order assertions |
| Lint | ESLint |

## Prerequisites

- Node.js 18 or newer
- Yarn 1.22 or newer
- A [Supabase](https://supabase.com) project with the migrations in `supabase/migrations` applied

## Setup

```bash
yarn install
```

Create `.env.local` in the project root. Do not commit this file.

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-publishable-key
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
```

`VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` come from the Supabase dashboard under **Settings → API**. `DATABASE_URL` is the Postgres connection string. The app needs the first two. The end-to-end tests also need `DATABASE_URL` so they can read the saved order.

Apply the SQL files in `supabase/migrations` in filename order (Supabase CLI `db push`, or the SQL editor in the dashboard).

## Scripts

```bash
yarn dev            # start the kiosk at http://localhost:3000
yarn build          # production build
yarn preview        # serve the production build
yarn lint           # ESLint
yarn test:e2e       # Playwright (starts the dev server)
yarn typecheck:e2e  # typecheck the Playwright project
```

## Project layout

```text
src/                  React app (pages, cart, Supabase client)
supabase/migrations/  orders table and payment-method updates
playwright/           end-to-end specs, page objects, and fixtures
docs/                 test cases and execution notes
```

## Credits

Created by [Fernando Papito](https://testbeyond.com) for the TestBeyond course **Testando o Totem do Méqui com IA**.
