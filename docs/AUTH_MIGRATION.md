# Migration vers Database Sessions - NomadCompass

Ce document décrit la migration complète du système d'authentification de JWT sessions vers database sessions.

## 📅 Résumé des Changements

### Changements Majeurs

1. **JWT Sessions → Database Sessions**
   - Anciennement : Sessions stockées côté client dans des JWT
   - Maintenant : Sessions persistées en base de données PostgreSQL
   - **Impact** : Toutes les sessions JWT existantes seront invalidées

2. **Type Safety Améliorée**
   - Suppression de tous les `as any` dans le code
   - Types TypeScript étendus pour NextAuth
   - Helpers centralisés pour l'authentification

3. **Sécurité Renforcée**
   - Pas de logs de secrets en production
   - Debug mode désactivé en production
   - Validation stricte des rôles utilisateur

4. **Nouvelle Page d'Inscription**
   - Route `/auth/signup` pour les nouveaux utilisateurs
   - Redirection vers Google OAuth

---

## 🔄 Breaking Changes

### 1. Sessions Invalidées

**Problème** : Toutes les sessions JWT existantes ne fonctionneront plus après la migration.

**Solution** : Les utilisateurs devront se reconnecter.

**Impact Utilisateur** :
- Redirection automatique vers la page de connexion
- Aucune perte de données
- Reconnexion simple via Google OAuth

### 2. Middleware API Change

**Ancien code** :
```typescript
import { getToken } from "next-auth/jwt";
const token = await getToken({ req: request });
```

**Nouveau code** :
```typescript
import { auth } from "@/lib/auth";
const session = await auth();
```

---

## 🚀 Nouveautés

### Types TypeScript Étendus

**Fichier** : `src/types/auth.ts`

```typescript
import type { DefaultSession } from "next-auth";

export type UserRole = "user" | "admin";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }
}
```

**Avantages** :
- ✅ Autocomplétion TypeScript
- ✅ Plus d'erreurs à la compilation
- ✅ Code plus maintenable

### Helpers d'Authentification

**Fichier** : `src/lib/auth/helpers.ts`

**Fonctions disponibles** :
- `isAdmin(session)` : Vérifie si l'utilisateur est admin
- `hasRole(session, role)` : Vérifie un rôle spécifique
- `requireAuth()` : Throw si non authentifié (pour API routes)
- `requireAdmin()` : Throw si non admin (pour routes admin)

**Exemple d'utilisation** :
```typescript
// API Route Admin
import { requireAdmin } from "@/lib/auth/helpers";

export async function DELETE() {
  try {
    await requireAdmin(); // Throw si pas admin
    // Code admin...
  } catch (error) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
}
```

---

## 📊 Architecture Technique

### Configuration Database Sessions

**Fichier** : `src/lib/auth.ts`

```typescript
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  // DATABASE SESSIONS
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
    updateAge: 24 * 60 * 60, // Rafraîchir après 24h
  },

  callbacks: {
    // Avec database strategy, 'user' vient de la DB
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = (user.role as UserRole) || "user";
      }
      return session;
    },
  },
});
```

### Comment ça Fonctionne ?

1. **Connexion Google OAuth**
   - L'utilisateur clique sur "Continuer avec Google"
   - Redirection vers Google pour authentification
   - Google renvoie les infos vers `/api/auth/callback/google`

2. **Création/Mise à jour Session**
   - NextAuth crée ou met à jour l'utilisateur en DB
   - Une session est créée dans la table `sessions`
   - Un cookie `session-token` est envoyé au client

3. **Vérification Session**
   - Chaque requête vérifie le `session-token`
   - NextAuth charge la session depuis la DB
   - Les données utilisateur sont enrichies (rôle, etc.)

4. **Déconnexion**
   - La session est supprimée de la DB
   - Le cookie est invalidé
   - L'utilisateur est redirigé

---

## 🗄️ Schéma Base de Données

Le schéma Prisma est déjà configuré correctement pour database sessions :

```prisma
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}
```

**Pas de migration nécessaire** : Le schéma existant est compatible.

---

## 📝 Guide Développeur

### Pour Vérifier l'Authentification (Serveur)

```typescript
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  // session.user.id est type-safe
  // session.user.role est type-safe
}
```

### Pour Vérifier l'Authentification (Client)

```typescript
"use client";

import { useSession } from "next-auth/react";

export function Component() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  if (!session?.user) {
    return <div>Non connecté</div>;
  }

  // session.user est type-safe
}
```

### Pour Protéger une API Route

```typescript
import { requireAuth } from "@/lib/auth/helpers";

export async function POST(request: Request) {
  try {
    const session = await requireAuth();
    // session.user.id est disponible
  } catch (error) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
}
```

### Pour Protéger une Route Admin

```typescript
import { requireAdmin } from "@/lib/auth/helpers";

export async function DELETE() {
  try {
    const session = await requireAdmin();
    // L'utilisateur est forcément admin
  } catch (error) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
}
```

---

## 🔍 Vérifications Post-Migration

### 1. Vérifier les Sessions en DB

```bash
npx prisma studio
```

Aller dans la table `sessions` et vérifier que des sessions sont créées après connexion.

### 2. Tester le Flow d'Authentification

- [ ] Connexion via Google OAuth fonctionne
- [ ] Redirection vers `/dashboard` après connexion
- [ ] Session persistée après rechargement de page
- [ ] Déconnexion fonctionne correctement
- [ ] Protection routes `/admin` et `/dashboard` fonctionne

### 3. Tester les Permissions

- [ ] Un utilisateur normal ne peut pas accéder à `/admin`
- [ ] Un admin peut accéder à `/admin`
- [ ] Les API routes protégées retournent 401 si non connecté
- [ ] Les API routes admin retournent 403 si pas admin

### 4. Vérifier TypeScript

```bash
npm run build
```

Aucune erreur TypeScript ne devrait apparaître.

---

## ⚡ Performance

### Database Sessions vs JWT

| Aspect | JWT Sessions | Database Sessions |
|--------|-------------|-------------------|
| **Scalabilité** | Excellent (stateless) | Bon (nécessite cache) |
| **Révocation** | Impossible immédiatement | Immédiate |
| **Taille données** | Limitée (~4KB) | Illimitée |
| **Requêtes DB** | Aucune | 1 par vérification |
| **Sécurité** | Bonne | Excellente |

### Optimisations Possibles

Si la performance devient un problème :
1. Ajouter un cache Redis pour les sessions
2. Augmenter `updateAge` pour réduire les écritures DB
3. Ajouter des index sur la table `sessions`

---

## 🔐 Sécurité

### Améliorations de Sécurité

1. **Pas de logs de secrets**
   - Les logs de debug n'affichent plus les variables d'environnement
   - `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_SECRET` sont protégés

2. **Type-safe role checking**
   - Le rôle est validé avec TypeScript
   - Pas de `as any` dans le code

3. **Database sessions révocables**
   - Les sessions peuvent être révoquées en supprimant l'entrée DB
   - Déconnexion partout possible

4. **Validation stricte**
   - Vérification du rôle dans les callbacks
   - Protection contre les injections d'attributs

---

## 📞 Support

Pour toute question sur la migration :
1. Vérifier ce document
2. Consulter la [documentation NextAuth.js](https://next-auth.js.org)
3. Vérifier les types dans `src/types/auth.ts`
4. Consulter les helpers dans `src/lib/auth/helpers.ts`

---

## 📚 Références

- [NextAuth.js Documentation](https://next-auth.js.org)
- [Auth.js v5 Documentation](https://authjs.dev)
- [Prisma Adapter](https://authjs.dev/getting-started/adapters/prisma)
- [Session Strategies](https://authjs.dev/concepts/session-strategies)

---

**Date de Migration** : Décembre 2025
**Version NextAuth** : 5.0.0-beta.30
**Version Prisma Adapter** : 2.11.1
