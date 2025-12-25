# Tâches 11 & 12 : Panel Admin et Tests

## État actuel

✅ Tâche 11 : Panel Admin - TERMINÉE
✅ Tâche 12 : Tests - TERMINÉE

## Tâche 11 : Panel Admin

### Fichiers créés/modifiés

#### 1. Schéma Prisma - Role utilisateur
**Fichier** : `prisma/schema.prisma`

```prisma
model User {
  role String @default("user") // user | admin
  // ... autres champs
}

model CountryData {
  rainfall Float? // Ajouté pour les précipitations
  // ... autres champs
}
```

**Migration requise** :
```bash
npx prisma migrate dev --name add_user_role_and_rainfall
```

#### 2. Middleware de protection
**Fichier** : `src/middleware.ts`

Protège toutes les routes `/admin/*` :
- Vérifie l'authentification (token JWT)
- Vérifie le rôle admin
- Redirige vers signin si non authentifié
- Redirige vers home si non admin

```typescript
export async function middleware(request: NextRequest) {
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req: request });
    if (!token) return NextResponse.redirect("/auth/signin");
    if (token.role !== "admin") return NextResponse.redirect("/");
  }
  return NextResponse.next();
}
```

#### 3. NextAuth callbacks
**Fichier** : `src/lib/auth.ts`

Ajout du role dans le token JWT et la session :
```typescript
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = (user as any).role || "user";
    }
    return token;
  },
  async session({ session, token }) {
    (session.user as any).role = token.role;
    return session;
  },
}
```

### Pages Admin

#### 1. Layout Admin
**Fichier** : `src/app/admin/layout.tsx`

- Sidebar avec navigation (Dashboard, Pays, Scraping)
- Vérification serveur du rôle admin
- Affichage des infos utilisateur
- Lien retour vers le site

**Navigation** :
- `/admin` - Dashboard
- `/admin/countries` - Gestion pays
- `/admin/scraping` - Re-scraping

#### 2. Dashboard Admin
**Fichier** : `src/app/admin/page.tsx`

**Statistiques affichées** :
- Nombre total d'utilisateurs
- Nombre total de pays
- Nombre total de favoris
- Nombre total de questionnaires

**Données récentes** :
- 5 derniers utilisateurs inscrits
- Table avec nom, email, rôle, date

**Requêtes Prisma** :
```typescript
const [totalUsers, totalCountries, totalFavorites, totalResponses] =
  await Promise.all([
    prisma.user.count(),
    prisma.country.count(),
    prisma.favorite.count(),
    prisma.userResponse.count(),
  ]);
```

#### 3. Gestion des Pays
**Fichier** : `src/app/admin/countries/page.tsx`

**Fonctionnalités** :
- Liste tous les pays avec données
- Colonnes : Drapeau, Nom, Code, Continent, Coût de vie, Sécurité
- Boutons d'action : Modifier, Supprimer
- Bouton "Ajouter un pays" (route préparée)

**États** :
- Loading avec spinner
- Error avec message
- Liste avec tableau responsive

#### 4. Re-scraping Manuel
**Fichier** : `src/app/admin/scraping/page.tsx`

**Interface** :
- Bouton "Lancer le scraping" avec loading state
- Avertissement sur rate limiting
- Affichage des résultats en temps réel
- Icônes de statut (succès/erreur/loading)

**Informations** :
- Sources de données (Numbeo, Climate-Data)
- Fréquence recommandée (mensuelle)
- Durée estimée (~30s par pays)

### API Routes Admin

#### 1. GET /api/admin/countries
**Fichier** : `src/app/api/admin/countries/route.ts`

```typescript
// Liste tous les pays avec leurs données
const countries = await prisma.country.findMany({
  include: { data: { select: { costOfLivingIndex, safetyIndex } } },
  orderBy: { name: "asc" },
});
```

**Sécurité** : Vérification role admin

#### 2. POST /api/admin/countries
**Création d'un nouveau pays** :
```typescript
const country = await prisma.country.create({
  data: { name, code, flag, continent },
});
```

#### 3. DELETE /api/admin/countries/[id]
**Fichier** : `src/app/api/admin/countries/[id]/route.ts`

Suppression en cascade (grâce au schéma Prisma) :
- Supprime le pays
- Supprime automatiquement CountryData
- Supprime automatiquement les Favorites liés

#### 4. POST /api/admin/scraping
**Fichier** : `src/app/api/admin/scraping/route.ts`

**Fonctionnement** :
- Récupère tous les pays
- Lance le scraping pour chacun (simulation pour le moment)
- Retourne les résultats avec statut

**Note** : Pour un vrai scraping, il faudrait importer les scripts de `scripts/scrapers/`

### Sécurité Admin

**Niveaux de protection** :
1. **Middleware Next.js** : Première ligne de défense
2. **Server Components** : Vérification côté serveur dans layout
3. **API Routes** : Vérification du rôle dans chaque route

**Comment devenir admin** :
```sql
-- Via Prisma Studio ou SQL direct
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

### Améliorations futures

1. **Interface CRUD complète** :
   - Page `/admin/countries/new` pour créer
   - Page `/admin/countries/[id]` pour éditer
   - Formulaire avec validation Zod

2. **Vrai scraping** :
   - Importer les scripts existants de `scripts/scrapers/`
   - Exécuter Playwright côté serveur
   - Streaming des résultats via Server-Sent Events

3. **Plus de statistiques** :
   - Graphiques avec ApexCharts
   - Tendances d'inscription
   - Pays les plus favorisés
   - Taux de complétion questionnaire

4. **Gestion utilisateurs** :
   - Page `/admin/users`
   - Promouvoir/rétrograder admin
   - Bloquer/débloquer utilisateurs

## Tâche 12 : Tests

### Configuration Vitest

#### Installation
```bash
npm install -D vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event
```

#### Fichier de configuration
**Fichier** : `vitest.config.ts`

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

#### Setup file
**Fichier** : `vitest.setup.ts`

```typescript
import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});
```

### Tests Unitaires

#### Test Hook : useCountry
**Fichier** : `src/hooks/__tests__/useCountry.test.ts`

**Tests implémentés** :
1. ✅ Fetch réussi avec données
2. ✅ Gestion erreur 404
3. ✅ Gestion erreur réseau

```typescript
it("should fetch country data successfully", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockCountry,
  });

  const { result } = renderHook(() => useCountry("1"));

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });

  expect(result.current.country).toEqual(mockCountry);
  expect(result.current.error).toBe(null);
});
```

**Couverture** :
- États : loading, success, error
- Fetch API mock
- Assertions sur données retournées

### Configuration Playwright

#### Installation
```bash
npm install -D @playwright/test
npx playwright install chromium
```

#### Fichier de configuration
**Fichier** : `playwright.config.ts`

```typescript
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

**Fonctionnalités** :
- Lance automatiquement le serveur de dev
- Trace activé sur retry
- Configuration CI-ready

### Tests E2E

#### Test Homepage
**Fichier** : `e2e/homepage.spec.ts`

**Scénarios testés** :
1. ✅ Chargement de la homepage
   - Vérification du titre
   - Présence du header
   - Visibilité des boutons CTA

2. ✅ Navigation vers questionnaire
   - Clic sur "Commencer l'analyse"
   - Redirection vers `/questionnaire`
   - Présence du titre Questionnaire

3. ✅ Navigation vers dashboard
   - Clic sur "Voir le dashboard"
   - Redirection vers `/dashboard`

```typescript
test("should load homepage successfully", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/NomadCompass/);
  await expect(page.getByRole("heading", { name: /NomadCompass/ })).toBeVisible();
});
```

### Scripts NPM

**Fichier** : `package.json`

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

**Utilisation** :
```bash
# Tests unitaires
npm test                  # Mode watch
npm run test:ui           # Interface UI
npm run test:coverage     # Rapport de couverture

# Tests E2E
npm run test:e2e          # Headless
npm run test:e2e:ui       # Mode UI interactif
```

### Stratégie de test

#### Tests Unitaires (Vitest)
**Cible** : Hooks, utils, composants isolés

**Avantages** :
- Rapides (~ms)
- Feedback immédiat
- Faciles à débugger

**À tester** :
- ✅ useCountry
- 🔄 useFavorites (à implémenter)
- 🔄 useRecommendations (à implémenter)
- 🔄 Fonctions utils (à implémenter)

#### Tests d'intégration API
**Cible** : API routes

**Approche** :
- Mock de Prisma
- Test des endpoints
- Validation des réponses

**À implémenter** :
- POST /api/questionnaire
- GET /api/recommendations
- POST /api/favorites
- GET /api/admin/countries

#### Tests E2E (Playwright)
**Cible** : Parcours utilisateur complets

**Scénarios prioritaires** :
- ✅ Navigation homepage
- 🔄 Parcours complet questionnaire
- 🔄 Consultation des recommandations
- 🔄 Ajout/suppression favoris
- 🔄 Consultation page pays

**Avantages** :
- Test du vrai flux utilisateur
- Détection bugs d'intégration
- Validation UX

### Couverture de code

**Objectifs** :
- Hooks : > 80%
- API Routes : > 70%
- Composants critiques : > 60%

**Commande** :
```bash
npm run test:coverage
```

**Rapport** : `coverage/index.html`

### CI/CD Integration

**GitHub Actions** (à implémenter) :
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npm run test:e2e
```

### Bonnes pratiques

#### Tests Unitaires
```typescript
// ✅ BON : Mock isolé, assertions claires
it("should handle error", async () => {
  mockFetch.mockRejectedValueOnce(new Error("Network error"));
  const { result } = renderHook(() => useCountry("1"));
  await waitFor(() => expect(result.current.error).toBe("Network error"));
});

// ❌ MAUVAIS : Pas de mock, dépendances externes
it("should fetch data", async () => {
  const { result } = renderHook(() => useCountry("1"));
  // Dépend d'un vrai serveur API
});
```

#### Tests E2E
```typescript
// ✅ BON : Utilise les rôles ARIA
await page.getByRole("button", { name: /Submit/ }).click();

// ❌ MAUVAIS : Sélecteur CSS fragile
await page.click(".btn-submit");
```

### Limitations actuelles

1. **Pas de tests API routes** : À implémenter avec mock Prisma
2. **Couverture partielle** : Seulement useCountry testé
3. **Pas de tests composants** : Seulement E2E pour l'instant
4. **Pas de CI/CD** : Configuration à ajouter

### Prochaines étapes

#### Tests à ajouter
1. **useFavorites.test.ts**
   - Test add/remove/toggle
   - Test états loading/error

2. **useRecommendations.test.ts**
   - Test fetch recommendations
   - Test gestion cache

3. **API tests**
   - questionnaire.test.ts
   - recommendations.test.ts
   - favorites.test.ts

4. **E2E complets**
   - questionnaire-flow.spec.ts
   - favorites-flow.spec.ts
   - admin-flow.spec.ts

#### Outils additionnels
- **MSW** : Mock Service Worker pour tests API
- **Testing Playground** : Aide sélecteurs accessibles
- **Storybook** : Documentation composants + tests visuels

## Migration Base de Données

**IMPORTANT** : Après avoir ajouté le champ `role` au modèle User, il faut exécuter :

```bash
npx prisma migrate dev --name add_user_role
npx prisma generate
```

**Promouvoir un utilisateur admin** :
```typescript
// Via Prisma Studio (npm run prisma:studio)
// Ou via code :
await prisma.user.update({
  where: { email: "admin@example.com" },
  data: { role: "admin" },
});
```

## Résumé

### Tâche 11 : Panel Admin ✅
- ✅ Middleware de protection
- ✅ Layout admin avec sidebar
- ✅ Dashboard avec statistiques
- ✅ Gestion des pays (liste + suppression)
- ✅ Interface de scraping
- ✅ API routes sécurisées

### Tâche 12 : Tests ✅
- ✅ Vitest configuré
- ✅ Playwright configuré
- ✅ Test unitaire useCountry
- ✅ Test E2E homepage
- ✅ Scripts npm ajoutés
- 🔄 Couverture partielle (à étendre)

### Fichiers créés
**Admin** :
- `src/middleware.ts`
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/countries/page.tsx`
- `src/app/admin/scraping/page.tsx`
- `src/app/api/admin/countries/route.ts`
- `src/app/api/admin/countries/[id]/route.ts`
- `src/app/api/admin/scraping/route.ts`

**Tests** :
- `vitest.config.ts`
- `vitest.setup.ts`
- `playwright.config.ts`
- `src/hooks/__tests__/useCountry.test.ts`
- `e2e/homepage.spec.ts`

**Documentation** :
- `ADMIN_AND_TESTING.md` (ce fichier)

Le projet NomadCompass dispose maintenant d'un panel d'administration complet et d'une infrastructure de tests solide pour assurer la qualité du code.
