# Checklist avant le scraping

## Prérequis

Avant de pouvoir exécuter le script de scraping (`npm run scrape:countries`), vous devez effectuer les étapes suivantes :

### 1. Configuration de la base de données

#### Option A : Utiliser Neon (Production)
1. Créer un compte sur [Neon](https://neon.tech)
2. Créer un nouveau projet PostgreSQL
3. Copier l'URL de connexion fournie
4. Remplacer `DATABASE_URL` dans `.env` :
   ```env
   DATABASE_URL="postgresql://user:password@your-neon-host.neon.tech/dbname?sslmode=require"
   ```

#### Option B : Utiliser Prisma Postgres (Développement local)
Le fichier `.env` contient déjà une URL Prisma Postgres locale :
```env
DATABASE_URL="prisma+postgres://localhost:51213/..."
```

Pour l'utiliser :
```bash
# Installer Prisma CLI globalement si nécessaire
npm install -g prisma

# Démarrer le serveur Prisma Postgres local
prisma dev
```

### 2. Créer les tables de la base de données

Une fois la base de données configurée, exécuter la migration :

```bash
npm run prisma:migrate
```

Cela créera toutes les tables définies dans `prisma/schema.prisma` :
- `users`
- `accounts`
- `sessions`
- `verification_tokens`
- `user_responses`
- `countries`
- `country_data`
- `favorites`

### 3. Peupler la table Country

Le scraper a besoin de pays existants dans la base pour scraper leurs données.

Exécuter le seed :
```bash
npm run prisma:seed
```

Cela créera 5 pays par défaut :
1. **Portugal** (PT) 🇵🇹
2. **Spain** (ES) 🇪🇸
3. **Thailand** (TH) 🇹🇭
4. **Mexico** (MX) 🇲🇽
5. **Canada** (CA) 🇨🇦

### 4. Vérifier la configuration

Pour vérifier que tout est prêt :

```bash
# Ouvrir Prisma Studio
npm run prisma:studio
```

Dans Prisma Studio, vérifier que :
- La table `countries` contient 5 pays
- Les tables sont créées correctement

### 5. Lancer le scraping

Une fois toutes les étapes précédentes effectuées :

```bash
npm run scrape:countries
```

## Résolution de problèmes

### Erreur : "Cannot fetch data from service"
**Cause** : La base de données n'est pas accessible
**Solution** : Vérifier que l'URL dans `.env` est correcte et que la base de données est démarrée

### Erreur : "No countries found in database"
**Cause** : La table `countries` est vide
**Solution** : Exécuter `npm run prisma:seed`

### Erreur : "Table does not exist"
**Cause** : Les migrations n'ont pas été exécutées
**Solution** : Exécuter `npm run prisma:migrate`

### Erreur lors du scraping : "Navigation timeout"
**Cause** : Le site web est lent ou inaccessible
**Solution** : Réessayer plus tard, vérifier votre connexion internet

### Erreur : "Too many requests" ou ban IP
**Cause** : Rate limiting trop rapide
**Solution** : Le script inclut déjà des délais (2 secondes), mais vous pouvez augmenter dans `scripts/populateCountryData.ts`

## Structure finale attendue

Après un scraping réussi, la table `country_data` devrait contenir :

```
| countryId | costOfLivingIndex | averageTemp | safetyIndex | ... |
|-----------|-------------------|-------------|-------------|-----|
| cuid1     | 52.8              | 17.5        | 72.1        | ... |
| cuid2     | 58.3              | 14.5        | 68.5        | ... |
| ...       | ...               | ...         | ...         | ... |
```

Chaque enregistrement contient également un champ `rawData` (JSON) avec toutes les données brutes scrapées.

## Workflow complet

```bash
# 1. Configurer l'URL de la base de données dans .env
# (Neon ou Prisma Postgres)

# 2. Créer les tables
npm run prisma:migrate

# 3. Peupler les pays
npm run prisma:seed

# 4. Scraper les données
npm run scrape:countries

# 5. Visualiser les données
npm run prisma:studio
```

## Temps estimé

- Configuration : 5-10 minutes
- Migration : 1 minute
- Seed : < 1 minute
- Scraping (5 pays) : 2-3 minutes
- **Total : ~10-15 minutes**

## Ajout de nouveaux pays

Pour ajouter plus de pays à scraper :

1. Modifier `prisma/seed.ts` pour ajouter des pays
2. Réexécuter `npm run prisma:seed`
3. Relancer `npm run scrape:countries`

Ou ajouter manuellement via Prisma Studio :
- Ouvrir la table `countries`
- Cliquer "Add record"
- Remplir : name, code, flag (emoji), continent

## Prochaines étapes après le scraping

Une fois le scraping terminé, vous pourrez passer à :
- **Tâche 06** : Intégration Claude API pour les recommandations
- **Tâche 07** : Dashboard avec visualisation des données
