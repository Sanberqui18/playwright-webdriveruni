# Flakiness Reference — Root Causes & Fixes

## Category 1: Timing Issues

### Problem: Hard-coded waits
```typescript
// ❌ Flaky
await page.waitForTimeout(3000);
cy.wait(2000);
```

```typescript
// ✅ Playwright — wait for network/element/condition
await page.waitForResponse(res => res.url().includes('/api/users') && res.status() === 200);
await page.waitForSelector('[data-testid="user-list"]', { state: 'visible' });
await expect(page.getByRole('heading')).toBeVisible();

// ✅ Cypress — intercept and wait on alias
cy.intercept('GET', '/api/users').as('getUsers');
cy.visit('/users');
cy.wait('@getUsers');
```

### Problem: Race condition on async render
```typescript
// ❌ Clicks before element is interactive
await page.click('[data-testid="submit"]');

// ✅ Playwright retries automatically with locators
await page.getByRole('button', { name: 'Submit' }).click();
// Or be explicit about state:
await page.getByRole('button', { name: 'Submit' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Submit' }).click();
```

---

## Category 2: Selector Fragility

### Fragility Ranking (worst → best)
1. XPath positional: `//div[3]/span[2]` — breaks on any DOM restructure
2. CSS nth-child: `.list-item:nth-child(3)` — breaks on DOM order change
3. CSS class: `.btn-primary` — breaks when devs rename or reuse classes
4. CSS attribute (non-semantic): `[id="submit-btn-v2"]` — brittle IDs
5. **`data-testid`**: `[data-testid="submit-button"]` — stable ✅
6. **ARIA role + name**: `getByRole('button', { name: 'Submit' })` — stable + accessible ✅
7. **Label**: `getByLabel('Email address')` — stable ✅

### Migrating bad selectors
```typescript
// ❌ Before
cy.get('.modal .btn.btn-danger:last-child').click();

// ✅ After — requires adding data-testid in the app
cy.get('[data-testid="confirm-delete-button"]').click();

// ✅ After — if data-testid not possible, use ARIA
cy.get('[role="dialog"]').within(() => {
  cy.get('[role="button"][aria-label="Confirm delete"]').click();
});
```

---

## Category 3: Test Isolation Failures

### Problem: Shared state between tests
```typescript
// ❌ Tests depend on each other's data
it('creates a user', () => { /* creates user@test.com */ });
it('finds the user', () => { /* searches for user@test.com — breaks if order changes */ });
```

```typescript
// ✅ Each test owns its data
const uniqueEmail = () => `user-${Date.now()}@test.com`;

test('creates and finds a user', async ({ page }) => {
  const email = uniqueEmail();
  // create + find in one atomic test
});
```

### Problem: Login state leaking between tests
```typescript
// ❌ Relies on previous test having logged in
test('dashboard loads', async ({ page }) => {
  await page.goto('/dashboard'); // assumes auth cookie exists
});

// ✅ Use storageState or API login in beforeEach/fixture
test.use({ storageState: 'playwright/.auth/user.json' });

// Or in playwright.config.ts global setup:
// globalSetup: './tests/global-setup.ts'
```

---

## Category 4: Environment / Data Issues

### Problem: Hard-coded test data conflicts in parallel runs
```typescript
// ❌ Creates user with fixed email — conflicts in parallel
await createUser({ email: 'tester@example.com' });

// ✅ Factory with unique identifier
const createTestUser = (overrides = {}) => ({
  email: `tester-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`,
  name: 'Test User',
  ...overrides,
});
```

### Problem: Test depends on external service state
```typescript
// ❌ Real API call — flaky if service is slow
await page.goto('/dashboard'); // fetches from live API

// ✅ Playwright — intercept and mock
await page.route('**/api/products', route =>
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ products: mockProducts }),
  })
);

// ✅ Cypress
cy.intercept('GET', '/api/products', { fixture: 'products.json' }).as('getProducts');
```

---

## Category 5: CI-Specific Flakiness

### Problem: Tests pass locally, fail in CI
Common causes:
- **Slower CI machines** → increase timeouts in `playwright.config.ts` for CI: `timeout: process.env.CI ? 60000 : 30000`
- **No display** → always run headless: `headless: true` (default in Playwright)
- **Different viewport** → pin viewport in config: `viewport: { width: 1280, height: 720 }`
- **Font/render differences** → use `--font-render-hinting=none` for visual tests

### Problem: Retries masking real issues
```typescript
// playwright.config.ts
retries: process.env.CI ? 2 : 0, // ✅ Retries in CI only
// Never set retries locally — forces you to fix root cause
```

### Diagnosing with trace/video
```typescript
// On failure, Playwright captures trace
trace: 'on-first-retry',
screenshot: 'only-on-failure',
video: 'retain-on-failure',
// View with: npx playwright show-trace trace.zip
```

---

## Flakiness Audit Checklist

Run through this when a test is flaky:

1. **Does it fail only in CI?** → Check timing/viewport/headless issues
2. **Does it fail non-deterministically?** → Race condition or shared state
3. **Does it fail after another test?** → State leak, missing cleanup
4. **Does it fail when run in parallel?** → Shared test data
5. **Did a UI change break it?** → Fragile selector
6. **Does adding a `waitForTimeout` fix it?** → Replace with proper async wait