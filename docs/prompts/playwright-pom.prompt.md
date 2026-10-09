# Prompt — Refactor E2E Scenario with Page Object Model (Playwright + TypeScript)

> Reusable prompt. Fill in the **Parameters** section and send the rest without
> changes. Anything not explicitly provided in the parameters must be
> **discovered by the agent from the codebase**, never assumed.

## Required Reference

- @docs/playwright-pom.md

This prompt and `docs/playwright-pom.md` form a pair and must be used together.
The guide is the **source of truth for implementation**: folder structure, pure
Page Object format, fixture-based injection, test data organization, and `.spec`
format.

Read it before Phase 1 and follow its code examples as the canonical standard.

The examples in the guide use an illustrative domain. Copy the **structure**
(signatures, organization, separation of responsibilities), never the screen
names, locators, or data — those must come from analyzing the actual application
codebase.

In case of conflict, the order of precedence is:

**PROJECT_CONSTRAINTS** → existing repository conventions →
`docs/playwright-pom.md` → this prompt.

## Parameters

Fill these in before use:

- **SCENARIO**: `should complete a dine-in order paid with PIX"`
- **TARGET_SPEC**: `playwright/e2e/dine-in-order.spec.ts`
- **FLOW**: `/home/brunna/TestBeyond/mcbugs/docs/testcases/test-cases-v2.md`
- **PROJECT_CONSTRAINTS**: `Not applicable`

## Role

You are a senior SDET specialized in Playwright + TypeScript. Your deliverable
must be production-quality automation code: typed, readable, free of speculative
abstractions, and resistant to flakiness.

You do not weaken a test just to make it pass — you report blockers with
evidence.

## Objective

Refactor **SCENARIO** in **TARGET_SPEC**, building an organized, typed, and
reusable Page Object layer for the entire **FLOW**.

This is an **architectural refactoring**. Fully preserve the intent,
interactions, and checkpoints of the current scenario.

Do not reduce coverage, remove assertions, or modify application business rules
just to make the test pass.

## Phase 1 — Code Analysis (mandatory before any editing)

Do not ask the user for a list of files and do not assume the project structure.

Discover it.

Before writing the first line of code, produce a scenario map answering the
following questions, **with evidence from the source code**:

1. **Stack and execution**
   - UI framework, router, and bundler/dev server currently in use.
   - How the application starts in development, including the actual script and
     port — inspect the package manifest and bundler/server configuration.
   - Package manager in use, identified through the lockfile.
   - Current Playwright configuration: `testDir`, `baseURL`, `webServer`,
     enabled projects/browsers, and headed/headless mode.

2. **Flow routes**
   - Locate the application's route definitions and extract the actual path for
     each screen in the **FLOW**, including dynamic parameters.
   - Correct the FLOW if it differs from the router configuration — and report
     the discrepancy.

3. **Components for each screen**
   - Starting from the current spec and the routes, follow the imports until you
     reach the components that render the elements interacted with by the
     scenario.
   - For each element used by the scenario, record its ARIA role, accessible
     name, label, placeholder, or rendered text — **read directly from the
     component**, not inferred from the legacy spec.

4. **Scenario data**
   - Identify the source of displayed data (fixtures, mocks, API, static data
     file) and which values the scenario depends on.

5. **Testability gaps**
   - List scenario elements that **do not have** a stable accessible name
     (e.g. icon-only buttons, values rendered as loose text nodes).

Only proceed to Phase 2 after completing this map.

If something essential cannot be determined from the codebase, explicitly state
the assumption and continue — do not stop the work because of it.

## Phase 2 — Implementation

Implement without waiting for additional confirmation.

### Structure

Follow the folder structure defined in `docs/playwright-pom.md`, while mirroring
any existing project conventions when applicable:

```text
<testDir>/
├── e2e/          # .spec.ts files (business narrative + assertions)
├── pages/        # one class per significant screen in the flow
└── fixtures/
    ├── pages.fixture.ts   # typed Page Object injection
    └── test-data.ts       # scenario data
```

Create **one Page Object per screen** in the FLOW, named after the screen's
domain.

Create Component Objects, under a `pages/` subfolder, only when a component is
shared across multiple screens or has meaningful complexity of its own.

Do not create empty abstractions or a generic `BasePage` without concrete shared
behavior.

### Page Object Rules

Each Page Object must:

- receive `Page` in its constructor;
- declare `readonly page: Page` and public `readonly` locators for everything
  asserted by the spec;
- expose actions using **business-oriented names** describing what the user
  does, not how the DOM reacts, with an explicit `Promise<void>` return type;
- contain **only** locators and actions;
- **not** import `expect` or perform assertions;
- receive variable data as arguments — never hardcode it inside the class.

Page Objects for parameterized screens, such as item details or record editing,
must work with any entity passed as an argument.

Never create a Page Object for a specific data instance.

### Fixtures and Data

- Extend Playwright's `test` in `fixtures/pages.fixture.ts` and inject all Page
  Objects with proper typing using `test.extend<...>`.
- Re-export `expect` from the fixture so that the spec imports both `test` and
  `expect` from the same module.
- The spec **must not** instantiate Page Objects using `new`.
- Centralize all scenario values — entities, texts, amounts, test credentials —
  in `fixtures/test-data.ts`, using `as const` where appropriate.
- Do not duplicate data across Page Objects, fixtures, and specs.

### Locators and Testability

Locator priority, in this order:

1. `getByRole()` with an accessible name
2. `getByLabel()`
3. `getByPlaceholder()`
4. Stable `getByText()`

**Forbidden:** `.first()`, `.last()`, `.nth()`, `locator('..')`, fragile
CSS/XPath selectors, and filters based on DOM structure.

Use exact matching when it eliminates ambiguity.

Use regex only for genuinely variable content such as monetary values, counters,
or dates.

**Repeated items** such as cart rows, product cards, or table records:

The correct alternative to index-based selection is to scope the locator to a
parent element and filter it using business-visible content.

Create a Page Object method that receives the entity and returns its `Locator`,
for example:

`itemFor(name)` using `.filter({ hasText })`.

See the "Lists and repeated items" section of the guide.

This is **not** considered a testability gap and does not justify adding a
`data-testid`.

**Escape Rule.**

For every testability gap identified in Phase 1, make the **minimum necessary**
change to the application component to provide a stable target:

1. First, use `aria-label` or accessible text — this improves both the test
   **and** the actual accessibility of the product.
2. Use `data-testid` only when the element cannot have a stable accessible name.
   In that case, add a comment in the Page Object explaining the exception.

Do not add `data-testid` indiscriminately.

Do not modify application components outside the scenario scope unless there is
a demonstrated need.

List every application code change in the final delivery.

### Refactored Spec

The `.spec.ts` file must read like a business narrative:

- actions only through injected Page Objects;
- assertions only in the spec;
- checkpoints preserved after every critical action and navigation;
- direct `page` usage only for URL assertions;
- zero inline locators (`page.getByRole`, `page.getByText`, `page.locator`, etc.),
  including inside `expect()` — assert against locators exposed by Page Objects;
- zero hardcoded scenario data;
- zero element-search or DOM-structure logic;
- journey steps grouped using `test.step()` so that the report reflects the
  business narrative.

Keep **a single scenario**.

Do not split it into tests that depend on one another.

## Phase 3 — Configuration and Execution

Ensure the scenario can run **from scratch, with no manual steps**, on the
machine of anyone who clones the repository:

- Configure Playwright's `baseURL` using the actual dev server URL discovered in
  Phase 1 and replace all absolute URLs in the spec with relative paths.
- Configure `webServer` to use the project's actual development script, with
  `reuseExistingServer: !process.env.CI`.
- If the project already starts the server through another mechanism, such as
  Docker, CI, or a custom script, preserve that approach and document it.
- Ensure the package manifest contains an E2E execution script if one does not
  already exist.
- Preserve the existing browser configuration and headed/headless mode unless
  otherwise instructed in **PROJECT_CONSTRAINTS**.
- Rely on Playwright auto-waiting. **Never** use `waitForTimeout`, `setTimeout`,
  or custom timeouts.
- Do not hide failures using `try/catch`, permissive conditionals,
  `force: true`, or by removing checkpoints.

Run the refactored scenario and fix it until it passes.

Then validate stability by running it repeatedly, for example using
`--repeat-each=3` — a single successful execution does not prove the absence of
flakiness.

Also run the project's own type checking and linting, restricted to the files
that were changed.

Use the package manager identified in Phase 1.

If an external blocker prevents completion, such as an unavailable service,
missing credentials, or a broken dependency, provide:

- the command that was executed;
- the exact error output;
- the diagnosis.

Do not work around the blocker by weakening the test.

## Phase 4 — Self-Review

Verify each item before declaring the task complete:

- [ ] There is one Page Object per screen in the flow, all injected through a
      typed fixture.
- [ ] No Page Object imports or uses `expect`.
- [ ] The spec does not instantiate Page Objects using `new`.
- [ ] The spec contains no inline locators.
- [ ] The spec contains no absolute URLs or hardcoded data.
- [ ] All scenario data is centralized in `test-data.ts`, without duplication.
- [ ] All index-based or DOM-structure-based locators have been removed;
      repeated items are selected using scope + business-visible content.
- [ ] There is no `waitForTimeout`, `setTimeout`, `force: true`, or `try/catch`
      in the test.
- [ ] The checkpoints and functional intent of the original scenario have been
      preserved.
- [ ] `baseURL` and server configuration are set up, and the test runs from
      scratch without manual steps.
- [ ] The execution command passes, including repeated execution such as
      `--repeat-each=3`, or there is a documented external blocker with
      evidence.
- [ ] Type-checking and linting pass without errors in the changed files.

## Final Delivery

Finish with a concise summary containing:

1. **Scenario map** from Phase 1, summarized: stack, actual routes, screens, and
   data sources.
2. **Created and modified files**, including their paths.
3. **Modeling decisions** and the reasoning behind them — including Component
   Objects that were created or deliberately not created.
4. **Application code changes** and justification for each one
   (`aria-label` vs. `data-testid`, according to the Escape Rule).
5. **Validation commands** executed and their actual results — paste the
   relevant output, do not paraphrase it.
6. **Assumptions** made because information could not be determined from the
   codebase.
7. **Remaining external blockers**, if any.