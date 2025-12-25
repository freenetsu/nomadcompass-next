# Configuration NextAuth.js + Google OAuth

## État actuel

✅ NextAuth.js v5 installé
✅ Prisma Adapter configuré
✅ Routes API créées
✅ Pages d'authentification créées
✅ Composants UI créés
⏳ Variables d'environnement à configurer

## Configuration Google OAuth

### 1. Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API Google+ (Google People API)

### 2. Configurer l'écran de consentement OAuth

1. Dans le menu, allez dans **APIs & Services** > **OAuth consent screen**
2. Choisissez **External** (ou Internal si domaine workspace)
3. Remplissez les informations requises :
   - Nom de l'application : `NomadCompass`
   - Email de support : votre email
   - Logo (optionnel)
   - Domaine de l'application : `localhost:3000` (dev)

### 3. Créer les identifiants OAuth 2.0

1. Allez dans **APIs & Services** > **Credentials**
2. Cliquez sur **Create Credentials** > **OAuth client ID**
3. Type d'application : **Web application**
4. Nom : `NomadCompass Web Client`
5. **Authorized JavaScript origins** :
   - `http://localhost:3000` (développement)
   - `https://votredomaine.com` (production)
6. **Authorized redirect URIs** :
   - `http://localhost:3000/api/auth/callback/google` (développement)
   - `https://votredomaine.com/api/auth/callback/google` (production)
7. Cliquez sur **Create**
8. Copiez le **Client ID** et **Client Secret**

### 4. Configurer les variables d'environnement

Créez ou modifiez le fichier `.env` à la racine du projet :

```env
# Database (de PRISMA_SETUP.md)
DATABASE_URL="postgresql://..."

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-genere-ici"

# Google OAuth
GOOGLE_CLIENT_ID="votre-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="votre-client-secret"
```

### 5. Générer NEXTAUTH_SECRET

Exécutez cette commande pour générer un secret aléatoire sécurisé :

```bash
openssl rand -base64 32
```

Ou utilisez cette commande Node.js :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copiez le résultat dans `NEXTAUTH_SECRET`.

## Test de l'authentification

### 1. Assurez-vous que la base de données est configurée

```bash
npm run prisma:migrate
```

### 2. Démarrez le serveur de développement

```bash
npm run dev
```

### 3. Testez le flux d'authentification

1. Allez sur http://localhost:3000
2. Cliquez sur **Se connecter** (dans le UserMenu)
3. Vous serez redirigé vers `/auth/signin`
4. Cliquez sur **Continuer avec Google**
5. Authentifiez-vous avec votre compte Google
6. Vous serez redirigé vers `/dashboard`
7. Votre photo de profil et nom devraient apparaître dans le UserMenu

## Composants créés

### Pages
- `/auth/signin` - Page de connexion avec bouton Google OAuth
- `/auth/error` - Page d'erreur d'authentification avec messages explicites

### Composants
- `UserMenu` - Menu utilisateur avec avatar, dropdown et déconnexion
  - Affiche "Se connecter" si non authentifié
  - Affiche l'avatar + menu si authentifié
  - Options : Mon profil, Paramètres, Se déconnecter

### Configuration
- `src/lib/auth.ts` - Configuration NextAuth avec Google provider et Prisma adapter
- `src/app/api/auth/[...nextauth]/route.ts` - Routes API NextAuth
- `src/components/providers/SessionProvider.tsx` - Wrapper client pour les sessions

## Utilisation dans les composants

### Composants Client (avec "use client")

```tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function MyComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  if (!session) {
    return <button onClick={() => signIn()}>Se connecter</button>;
  }

  return (
    <div>
      <p>Bonjour {session.user.name}</p>
      <button onClick={() => signOut()}>Se déconnecter</button>
    </div>
  );
}
```

### Server Components (par défaut)

```tsx
import { auth } from "@/lib/auth";

export default async function MyPage() {
  const session = await auth();

  if (!session) {
    return <div>Non connecté</div>;
  }

  return <div>Bonjour {session.user.name}</div>;
}
```

### API Routes

```tsx
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user: session.user });
}
```

## Protection de routes

### Avec middleware (recommandé pour protéger plusieurs routes)

Créez `src/middleware.ts` :

```tsx
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuth = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

  if (!isAuth && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/favorites/:path*"],
};
```

## Prochaines étapes

Une fois NextAuth configuré et testé :
1. Tâche 04 : Créer le formulaire questionnaire complet avec validation
2. Tâche 05 : Scraping des données pays avec Playwright
3. Tâche 06 : Intégration API Claude pour recommandations

## Troubleshooting

### Erreur "OAuthCallback"
- Vérifiez que les Redirect URIs dans Google Cloud Console correspondent exactement
- Format : `http://localhost:3000/api/auth/callback/google`

### Erreur "Configuration"
- Vérifiez que toutes les variables d'environnement sont définies
- Redémarrez le serveur après modification du `.env`

### Session non persistée
- Vérifiez que la migration Prisma a bien créé les tables
- Exécutez `npx prisma studio` pour voir si les sessions sont enregistrées

### "NEXTAUTH_SECRET must be provided"
- Générez un secret avec `openssl rand -base64 32`
- Ajoutez-le dans `.env` sous `NEXTAUTH_SECRET`
