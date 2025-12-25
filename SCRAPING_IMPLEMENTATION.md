# Implémentation du Scraping des Données Pays

## État actuel

✅ Tâche 05 : Scraping des données pays avec Playwright - TERMINÉE

## Fonctionnalités implémentées

### 1. Scraper Numbeo

**Fichier** : `scripts/scrapers/numbeo.ts`

Scrape les données de [Numbeo.com](https://www.numbeo.com) pour chaque pays/ville :

#### Données extraites :
- **Cost of Living Index** : Indice global du coût de la vie
- **Rent Index** : Indice des loyers
- **Groceries Index** : Indice des courses alimentaires
- **Restaurant Price Index** : Indice des prix au restaurant
- **Local Purchasing Power Index** : Pouvoir d'achat local
- **Safety Index** : Indice de sécurité
- **Healthcare Index** : Indice de qualité du système de santé
- **Pollution Index** : Indice de pollution
- **Traffic Index** : Indice de trafic/transport
- **Climate Index** : Indice climatique

#### Fonctionnalités :
- `scrapeNumbeo(countryName, cityName?)` : Scrape une ville/pays
- `scrapeNumbeoCountries(countries[])` : Scrape plusieurs pays en batch
- Rate limiting automatique (2 secondes entre chaque requête)
- Gestion des erreurs avec logs détaillés

### 2. Scraper Climate

**Fichier** : `scripts/scrapers/climate.ts`

Scrape les données climatiques de [climate-data.org](https://en.climate-data.org) :

#### Données extraites :
- **Average Temperature** : Température annuelle moyenne (°C)
- **Climate Type** : Type de climat (Méditerranéen, Tropical, etc.)
- **Rainfall** : Précipitations annuelles moyennes (mm)

#### Fonctionnalités :
- `scrapeClimate(countryName, cityName)` : Scrape les données climatiques
- `getClimateDataFallback(countryName, capitalCity)` : Données de secours hardcodées

#### Pays avec données de fallback :
1. **Portugal** (Lisbonne) : 17.5°C, Méditerranéen, 774mm
2. **Spain** (Madrid) : 14.5°C, Méditerranéen chaud, 436mm
3. **Thailand** (Bangkok) : 28.5°C, Savane tropicale, 1498mm
4. **Mexico** (Mexico City) : 16.5°C, Highland subtropical, 820mm
5. **Canada** (Toronto) : 9.0°C, Continental humide, 831mm
6. **United Arab Emirates** (Dubai) : 27.0°C, Désert chaud, 78mm
7. **Indonesia** (Bali) : 27.0°C, Mousson tropicale, 1735mm
8. **Vietnam** (Ho Chi Minh) : 27.5°C, Savane tropicale, 1931mm

### 3. Parser et Validateur

**Fichier** : `scripts/utils/dataParser.ts`

Fusionne, valide et évalue la qualité des données scrapées.

#### Interface ParsedCountryData :
```typescript
{
  costOfLivingIndex: number | null,
  averageRent: number | null,
  averageSalary: number | null,
  averageTemp: number | null,
  climate: string | null,
  safetyIndex: number | null,
  healthcareIndex: number | null,
  pollutionIndex: number | null,
  internetSpeed: number | null,      // TODO: À scraper plus tard
  transportIndex: number | null,
  visaRequirements: string | null,    // TODO: À scraper plus tard
  taxRate: number | null,             // TODO: À scraper plus tard
  rawData: {
    numbeo?: NumbeoData,
    climate?: ClimateData,
    scrapedAt: string
  }
}
```

#### Fonctions principales :

**`parseCountryData(numbeoData, climateData)`**
- Fusionne les données de Numbeo et Climate
- Gère les valeurs null
- Stocke les données brutes en JSON

**`validateCountryData(data)`**
- Vérifie la présence de champs critiques
- Valide les plages de valeurs (indices 0-100, températures -50/+50°C)
- Retourne `{ isValid: boolean, errors: string[] }`

**`calculateDataQuality(data)`**
- Calcule un score de qualité (0-100)
- Champs critiques = 70% du score
- Champs optionnels = 30% du score
- Retourne le pourcentage de complétude et les champs manquants

### 4. Script de Population

**Fichier** : `scripts/populateCountryData.ts`

Script principal pour scraper et sauvegarder les données.

#### Workflow :
1. **Récupération** : Lit tous les pays depuis la table `Country`
2. **Scraping** : Pour chaque pays :
   - Scrape Numbeo avec la capitale
   - Scrape Climate avec la capitale (+ fallback si échec)
   - Fusionne et parse les données
   - Valide les données
   - Calcule la qualité
3. **Sauvegarde** : Upsert dans `CountryData` (crée ou met à jour)
4. **Rate Limiting** : 2 secondes entre chaque pays
5. **Rapport** : Affiche un résumé détaillé avec :
   - Nombre de succès/échecs
   - Score de qualité par pays
   - Qualité moyenne globale
   - Liste des erreurs

#### Utilisation :
```bash
npm run scrape:countries
```

#### Exemple de sortie :
```
🚀 Starting country data scraping...

============================================================
📋 Found 5 countries to process

🌍 Scraping data for Portugal...
  📊 Fetching Numbeo data...
  ✅ Numbeo data retrieved
  🌡️  Fetching climate data...
  ✅ Climate data retrieved
  📈 Data quality: 85/100 (70% complete)
  📝 Missing fields: Internet speed, Visa requirements, Tax rate
  💾 Saving to database...
  ✅ Successfully saved data for Portugal

============================================================
📊 SCRAPING SUMMARY
============================================================

✅ Successful: 5/5
❌ Failed: 0/5

🎯 Data Quality Breakdown:
   Portugal: 85/100 (70% complete)
   Spain: 82/100 (68% complete)
   Thailand: 88/100 (75% complete)
   Mexico: 80/100 (65% complete)
   Canada: 83/100 (70% complete)

📈 Average data quality: 84/100

============================================================
✨ Scraping completed!
```

## Mapping des capitales

Les données climatiques nécessitent une ville spécifique. Mapping utilisé :

```typescript
const countryCapitals: Record<string, string> = {
  "Portugal": "Lisbon",
  "Spain": "Madrid",
  "Thailand": "Bangkok",
  "Mexico": "Mexico City",
  "Canada": "Toronto",
  "United Arab Emirates": "Dubai",
  "Indonesia": "Bali",
  "Vietnam": "Ho Chi Minh City"
};
```

## Structure de stockage

Les données sont sauvegardées dans la table `CountryData` avec :
- Indices numériques (float)
- Données brutes en JSON (rawData)
- Timestamps de création/mise à jour

### Exemple de rawData :
```json
{
  "numbeo": {
    "country": "Portugal",
    "city": "Lisbon",
    "costOfLivingIndex": 52.8,
    "rentIndex": 25.3,
    "safetyIndex": 72.1,
    "healthcareIndex": 70.5,
    ...
  },
  "climate": {
    "country": "Portugal",
    "city": "Lisbon",
    "averageTemp": 17.5,
    "climate": "Mediterranean",
    "rainfall": 774
  },
  "scrapedAt": "2025-12-25T10:30:00.000Z"
}
```

## Gestion des erreurs

### Rate Limiting
- 1 seconde entre Numbeo et Climate
- 2 secondes entre chaque pays
- Évite les bans IP

### Fallbacks
- Si Climate échoue → Utilise `getClimateDataFallback()`
- Si Numbeo échoue → Continue avec données partielles
- Validation avant sauvegarde

### Logs détaillés
- ✅ Succès en vert
- ⚠️  Warnings en jaune
- ❌ Erreurs en rouge
- 📊 Métriques et statistiques

## Champs manquants (TODO futur)

Ces champs sont définis dans le schéma mais non scrapés actuellement :

1. **internetSpeed** : Vitesse moyenne de connexion internet
   - Source potentielle : Speedtest Global Index, Ookla

2. **visaRequirements** : Conditions de visa pour les Français
   - Source potentielle : Site du gouvernement français ou VisaHQ

3. **taxRate** : Taux d'imposition moyen
   - Source potentielle : KPMG Tax Tools, Trading Economics

Ces champs seront ajoutés dans une future itération.

## Tests et qualité

### Validation automatique
- Vérification des plages de valeurs
- Présence de champs critiques minimum
- Score de qualité calculé automatiquement

### Critères de qualité
**Champs critiques** (70% du score) :
- Cost of living index
- Average temperature
- Climate type
- Safety index
- Healthcare index

**Champs optionnels** (30% du score) :
- Average rent
- Average salary
- Pollution index
- Transport index
- Internet speed
- Visa requirements
- Tax rate

### Seuils de qualité
- **80-100** : Excellente qualité, données très complètes
- **60-79** : Bonne qualité, données exploitables
- **40-59** : Qualité moyenne, données partielles
- **0-39** : Faible qualité, données insuffisantes

## Prochaines étapes

### Tâche 06 : Intégration Claude API
- Analyser les réponses du questionnaire utilisateur
- Comparer avec les données pays scrapées
- Générer un score de compatibilité par pays
- Recommander le top 3-5 pays

### Tâche 07 : Dashboard avec résultats
- Afficher les pays recommandés
- Graphiques de comparaison (ApexCharts)
- Détails par critère (climat, coût, sécurité, etc.)
- Possibilité de favoriser des pays

## Dépendances utilisées

- **playwright** : Automatisation de navigateur pour le scraping
- **@playwright/test** : Utilitaires Playwright
- **@prisma/client** : ORM pour sauvegarder en base de données
- **tsx** : Exécution de scripts TypeScript

## Notes d'implémentation

- Le scraping est **séquentiel** (un pays après l'autre) pour éviter les bans
- Les données brutes sont **préservées en JSON** pour analyse future
- Le système est **extensible** : ajout facile de nouveaux scrapers
- La validation garantit la **qualité des données** avant sauvegarde
- Les logs permettent un **debug facile** en cas de problème
