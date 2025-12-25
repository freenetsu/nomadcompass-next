# Configuration Prisma + Neon PostgreSQL

## État actuel

✅ Prisma installé et initialisé
✅ Schéma de base de données créé
✅ Client Prisma généré
⏳ Migration en attente de l'URL Neon

## Étapes pour finaliser la configuration

### 1. Créer une base de données sur Neon

1. Allez sur [neon.tech](https://neon.tech)
2. Créez un compte ou connectez-vous
3. Créez un nouveau projet
4. Copiez l'URL de connexion PostgreSQL

### 2. Configurer l'URL de connexion

Modifiez le fichier `.env` à la racine du projet :

```env
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

Remplacez par votre URL de connexion Neon réelle.

### 3. Exécuter la migration initiale

```bash
cd /Users/faresguizani/Desktop/Projets/nomadcompass-next
npx prisma migrate dev --name init
```

Cette commande va :
- Créer les tables dans votre base de données Neon
- Générer le client Prisma avec les types TypeScript
- Créer un fichier de migration dans `prisma/migrations/`

### 4. Vérifier la migration

```bash
npx prisma studio
```

Ouvre Prisma Studio dans votre navigateur pour visualiser et gérer vos données.

## Schéma de base de données

Le schéma inclut les modèles suivants :

### Authentication (NextAuth.js)
- **User** - Utilisateurs avec Google OAuth
- **Account** - Comptes liés (Google, etc.)
- **Session** - Sessions utilisateur
- **VerificationToken** - Tokens de vérification email

### Application
- **UserResponse** - Réponses au questionnaire (JSON)
- **Country** - Liste des pays
- **CountryData** - Données détaillées par pays (coût de vie, climat, sécurité, etc.)
- **Favorite** - Pays favoris des utilisateurs

## Utilisation du client Prisma

```typescript
import { prisma } from "@/lib/prisma";

// Exemple : Récupérer tous les pays
const countries = await prisma.country.findMany({
  include: {
    data: true, // Inclure CountryData
  },
});

// Exemple : Créer une réponse utilisateur
const response = await prisma.userResponse.create({
  data: {
    userId: "user-id",
    responses: {
      budget: "2000-3000",
      climate: "warm",
      priorities: ["cost", "safety"],
    },
  },
});
```

## Commandes utiles

```bash
# Générer le client après modification du schéma
npx prisma generate

# Créer une nouvelle migration
npx prisma migrate dev --name description_changement

# Appliquer les migrations en production
npx prisma migrate deploy

# Ouvrir Prisma Studio
npx prisma studio

# Reset la base de données (⚠️ supprime toutes les données)
npx prisma migrate reset
```

## Prochaines étapes

Une fois la migration effectuée, vous pourrez :
1. Implémenter NextAuth.js (Tâche 03)
2. Créer les formulaires du questionnaire (Tâche 04)
3. Seed la base avec des données de pays initiales
