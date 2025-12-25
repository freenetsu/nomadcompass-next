# Implémentation du Questionnaire

## État actuel

✅ Tâche 04 : Formulaire questionnaire complet - TERMINÉE

## Fonctionnalités implémentées

### 1. Validation avec Zod

**Fichier** : `src/lib/validations/questionnaire.ts`

Schémas de validation pour chaque étape :
- **Profil** : âge (18-100), situation familiale, profession, niveau d'études
- **Budget** : budget mensuel (500-50000€), épargne, source de revenus
- **Climat** : température préférée, saison, précipitations
- **Priorités** : 8 critères notés de 1 à 5 (coût de vie, sécurité, santé, éducation, emploi, culture, environnement, internet)

Types TypeScript exportés pour l'utilisation dans les composants.

### 2. Composants de formulaire par étape

Tous les composants utilisent `react-hook-form` avec `useFormContext` :

#### ProfilStep (`src/components/questionnaire/ProfilStep.tsx`)
- Input pour l'âge (type number)
- Select pour la situation familiale
- Input pour la profession
- Select pour le niveau d'études
- Validation en temps réel avec messages d'erreur

#### BudgetStep (`src/components/questionnaire/BudgetStep.tsx`)
- Input pour le budget mensuel (€)
- Input pour l'épargne disponible (€)
- Select pour la source de revenus
- Hints informatifs pour guider l'utilisateur

#### ClimatStep (`src/components/questionnaire/ClimatStep.tsx`)
- Select pour la température préférée (froid, tempéré, chaud, tropical)
- Select pour la saison préférée
- Select pour les précipitations (peu, moyen, beaucoup)

#### PrioritesStep (`src/components/questionnaire/PrioritesStep.tsx`)
- 8 sliders (range input) pour noter les priorités
- Affichage en temps réel de la note (1-5)
- Gradient visuel sur les sliders
- Labels : "Peu important" → "Très important"

### 3. Page questionnaire avec navigation

**Fichier** : `src/app/questionnaire/page.tsx`

Fonctionnalités :
- **Barre de progression** : affiche les 4 étapes avec numérotation
- **Navigation par étapes** : boutons Précédent/Suivant
- **Validation par étape** : empêche d'avancer si l'étape actuelle est invalide
- **FormProvider** : contexte react-hook-form pour tous les composants
- **Gestion de la soumission** :
  - Vérifie l'authentification (redirige vers `/auth/signin` si non connecté)
  - Envoie les données à l'API `/api/questionnaire`
  - Affiche un loader pendant l'envoi
  - Redirige vers `/dashboard` après succès
  - Gère les erreurs avec alert

### 4. API Route

**Fichier** : `src/app/api/questionnaire/route.ts`

#### POST `/api/questionnaire`
- Vérifie l'authentification avec NextAuth
- Valide les données avec Zod
- Sauvegarde dans la base de données (table `UserResponse`)
- Stocke les réponses en JSON
- Retourne l'ID de la réponse créée

#### GET `/api/questionnaire`
- Vérifie l'authentification
- Récupère la dernière réponse de l'utilisateur
- Retourne les données + date de création
- Retourne `null` si aucune réponse

## Structure de données

### QuestionnaireFormData

```typescript
{
  profil: {
    age: number,
    situation: "celibataire" | "couple" | "famille",
    profession: string,
    niveauEtudes: "bac" | "bac+2" | "bac+3" | "bac+5" | "doctorat"
  },
  budget: {
    budgetMensuel: number,
    epargne: number,
    revenus: "salarie" | "freelance" | "entrepreneur" | "retraite" | "rentier"
  },
  climat: {
    temperaturePreferee: "froid" | "tempere" | "chaud" | "tropical",
    saisonPreferee: "printemps" | "ete" | "automne" | "hiver",
    precipitations: "peu" | "moyen" | "beaucoup"
  },
  priorites: {
    coutVie: number (1-5),
    securite: number (1-5),
    sante: number (1-5),
    education: number (1-5),
    emploi: number (1-5),
    culture: number (1-5),
    environnement: number (1-5),
    internet: number (1-5)
  }
}
```

### Stockage en base de données

Les données sont stockées dans `UserResponse.responses` (colonne JSON) :

```sql
CREATE TABLE user_responses (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  responses JSON NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

## Flux utilisateur

1. **Page d'accueil** → Clic sur "Commencer l'analyse"
2. **Étape 1 : Profil** → Remplissage + validation → Clic "Suivant"
3. **Étape 2 : Budget** → Remplissage + validation → Clic "Suivant"
4. **Étape 3 : Climat** → Remplissage + validation → Clic "Suivant"
5. **Étape 4 : Priorités** → Ajustement des sliders → Clic "Voir les résultats"
6. **Vérification auth** :
   - Si non connecté → Redirection vers `/auth/signin?callbackUrl=/questionnaire`
   - Si connecté → Envoi à l'API
7. **Sauvegarde** → Base de données (table `user_responses`)
8. **Redirection** → `/dashboard` avec les résultats

## Validation et erreurs

### Validation côté client (Zod)
- Messages en français
- Validation en temps réel avec `mode: "onChange"`
- Validation par étape avant navigation

### Validation côté serveur
- Validation Zod dans l'API route
- Vérification d'authentification
- Gestion des erreurs :
  - 401 : Non authentifié
  - 400 : Données invalides
  - 500 : Erreur serveur

### Messages d'erreur

Exemples :
- "Vous devez avoir au moins 18 ans"
- "Veuillez sélectionner votre situation familiale"
- "Le budget mensuel doit être au moins de 500€"
- "Minimum 1" / "Maximum 5" (pour les sliders)

## Prochaines étapes

Une fois le questionnaire implémenté, les tâches suivantes sont :

### Tâche 05 : Scraping des données pays
- Playwright pour scraper Numbeo, Expatistan, etc.
- Remplir la table `CountryData`

### Tâche 06 : Intégration Claude API
- Analyser les réponses du questionnaire
- Générer des recommandations personnalisées
- Calculer les scores de compatibilité par pays

### Tâche 07 : Dashboard avec résultats
- Afficher le top pays recommandés
- Graphiques de comparaison (ApexCharts)
- Détails par critère

## Test manuel

Pour tester le questionnaire :

1. Démarrer le serveur : `npm run dev`
2. Aller sur http://localhost:3000
3. Cliquer sur "Commencer l'analyse"
4. Remplir le questionnaire étape par étape
5. Se connecter si nécessaire
6. Vérifier la sauvegarde dans Prisma Studio : `npm run prisma:studio`
7. Consulter la table `user_responses` pour voir les données JSON

## Dépendances utilisées

- **zod** : Validation de schéma
- **react-hook-form** : Gestion des formulaires
- **@hookform/resolvers** : Intégration Zod + react-hook-form
- **next-auth** : Authentification
- **@prisma/client** : ORM pour la base de données

## Notes d'implémentation

- Les valeurs par défaut des priorités sont à 3 (neutre)
- Les selects utilisent des placeholders pour guider l'utilisateur
- La barre de progression est responsive (masque les labels sur mobile)
- Le bouton "Précédent" est désactivé à la première étape
- La soumission affiche un loader avec `isLoading` sur le bouton
- Les erreurs de soumission sont affichées avec `alert()` (à améliorer avec un composant Toast)
