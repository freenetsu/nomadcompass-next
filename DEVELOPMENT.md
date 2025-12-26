# Guide de Développement - NomadCompass

## Installation

### 1. Prérequis

- Node.js 18.x ou supérieur
- npm ou bun
- PostgreSQL 14+ (ou Docker)
- Git

### 2. Cloner le projet

```bash
git clone https://github.com/votre-compte/nomadcompass.git
cd nomadcompass
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Configuration

Créer un fichier `.env` :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nomadcompass"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-key"
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"
ANTHROPIC_API_KEY="your-anthropic-api-key"
```

### 5. Base de données

```bash
# Créer la base de données
createdb nomadcompass

# Migrer
npx prisma migrate dev

# Seed (optionnel)
npm run prisma:seed
```

### 6. Lancer le serveur

```bash
npm run dev
```

Accéder à : http://localhost:3000

## Architecture du projet

```
nomadcompass-next/
├── prisma/
│   ├── schema.prisma        # Schéma de base de données
│   └── seed.ts              # Données initiales
├── public/
│   ├── robots.txt           # Configuration SEO
│   └── og-image.png         # Image Open Graph
├── scripts/
│   ├── scrapers/            # Scripts de scraping
│   │   ├── numbeo.ts        # Scraper Numbeo
│   │   └── climate.ts       # Scraper Climate-Data
│   └── utils/               # Utilitaires de scraping
├── src/
│   ├── app/                 # App Router Next.js 15
│   │   ├── api/             # API Routes
│   │   ├── auth/            # Pages d'authentification
│   │   ├── dashboard/       # Dashboard utilisateur
│   │   ├── questionnaire/   # Questionnaire
│   │   ├── countries/       # Pages pays
│   │   ├── favorites/       # Favoris
│   │   ├── admin/           # Panel admin
│   │   └── layout.tsx       # Layout racine
│   ├── components/          # Composants React
│   │   ├── ui/              # Composants UI réutilisables
│   │   ├── providers/       # Context providers
│   │   ├── dashboard/       # Composants dashboard
│   │   ├── country/         # Composants pays
│   │   └── questionnaire/   # Étapes questionnaire
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Logique métier
│   │   ├── auth.ts          # Configuration NextAuth
│   │   ├── claude.ts        # Intégration Claude AI
│   │   ├── prisma.ts        # Client Prisma
│   │   └── validations/     # Schémas Zod
│   ├── context/             # React Context
│   └── types/               # Types TypeScript
├── e2e/                     # Tests E2E (Playwright)
└── vitest.config.ts         # Configuration tests unitaires
```

## Stack technique

### Frontend

- **Next.js 15** : Framework React avec App Router
- **React 19** : Bibliothèque UI
- **TypeScript** : Typage statique
- **Tailwind CSS 4** : Framework CSS
- **Lucide React** : Icônes
- **React Hook Form** : Gestion des formulaires
- **Zod** : Validation de schémas

### Backend

- **Next.js API Routes** : API serverless
- **Prisma** : ORM pour PostgreSQL
- **NextAuth.js** : Authentification
- **Claude AI** : Génération de recommandations

### Outils

- **ESLint** : Linter
- **Prettier** : Formatage (via ESLint)
- **Vitest** : Tests unitaires
- **Playwright** : Tests E2E
- **Playwright** : Scraping

## Commandes utiles

### Développement

```bash
# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Lancer la version production
npm run start

# Linter
npm run lint
```

### Base de données

```bash
# Créer une migration
npx prisma migrate dev --name description

# Appliquer les migrations
npx prisma migrate deploy

# Prisma Studio (interface graphique)
npm run prisma:studio

# Seed
npm run prisma:seed

# Reset (ATTENTION : perte de données)
npx prisma migrate reset
```

### Tests

```bash
# Tests unitaires
npm test                    # Mode watch
npm run test:ui             # Interface UI
npm run test:coverage       # Rapport de couverture

# Tests E2E
npm run test:e2e            # Headless
npm run test:e2e:ui         # Mode UI interactif
```

### Scraping

```bash
# Scraper tous les pays
npm run scrape:countries
```

## Développement de fonctionnalités

### 1. Créer une nouvelle page

```bash
# Créer le fichier de page
src/app/ma-page/page.tsx
src/app/ma-page/layout.tsx  # Optionnel pour le metadata
```

### 2. Créer une API route

```bash
# Créer le fichier de route
src/app/api/mon-endpoint/route.ts
```

Exemple :

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 },
      );
    }

    const data = await prisma.monModele.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 },
    );
  }
}
```

### 3. Créer un composant

```bash
src/components/MonComposant.tsx
```

```typescript
interface MonComposantProps {
  titre: string;
  description?: string;
}

export function MonComposant({ titre, description }: MonComposantProps) {
  return (
    <div>
      <h2>{titre}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
```

### 4. Créer un hook personnalisé

```bash
src/hooks/useMonHook.ts
```

```typescript
import { useState, useEffect } from "react";

export function useMonHook() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/endpoint");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, isLoading };
}
```

## Bonnes pratiques

### Code

1. **TypeScript strict** : Toujours typer vos variables
2. **Composants purs** : Éviter les effets de bord
3. **Hooks** : Suivre les règles des hooks React
4. **Error handling** : Toujours gérer les erreurs
5. **Loading states** : Afficher des skeletons pendant le chargement

### Sécurité

1. **Validation** : Valider toutes les entrées avec Zod
2. **Authentification** : Vérifier auth() dans les API routes
3. **Sanitization** : Ne jamais faire confiance aux données utilisateur
4. **Env vars** : Ne jamais exposer les secrets côté client

### Performance

1. **Server Components** : Utiliser par défaut
2. **Client Components** : Seulement quand nécessaire
3. **Dynamic imports** : Pour les composants lourds
4. **Images** : Utiliser next/image
5. **Fonts** : Utiliser next/font/google

### Git

```bash
# Créer une branche
git checkout -b feature/ma-fonctionnalite

# Commit
git add .
git commit -m "feat: ajouter ma fonctionnalité"

# Push
git push origin feature/ma-fonctionnalite
```

**Convention de commit** :
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Tâches diverses

## Debugging

### Next.js

```typescript
// Activer le mode debug
export const dynamic = "force-dynamic";
export const revalidate = 0;
```

### Prisma

```bash
# Voir les requêtes SQL
DATABASE_URL="postgresql://...?schema=public&connect_timeout=10" npx prisma studio
```

### API Routes

```typescript
console.log("Debug:", variable);
```

## Ressources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Claude API](https://docs.anthropic.com)

## Support

Pour toute question :
1. Consulter la documentation
2. Vérifier les issues GitHub
3. Créer une nouvelle issue si nécessaire
