# Tâches 08 & 09 : Pages Détails Pays et Système de Favoris

## État actuel

✅ Tâche 08 : Pages détails pays - TERMINÉE
✅ Tâche 09 : Système de favoris - TERMINÉE

## Tâche 08 : Pages Détails Pays

### Fichiers créés

#### API Routes
- `src/app/api/countries/[id]/route.ts` - Récupère les données d'un pays

#### Composants
- `src/components/country/CountryHeader.tsx` - Header avec drapeau, nom, bouton favori
- `src/components/country/CostOfLivingSection.tsx` - Section coût de vie avec 3 métriques
- `src/components/country/ClimateSection.tsx` - Section climat avec température, type, précipitations
- `src/components/country/QualityOfLifeSection.tsx` - Section qualité de vie avec graphique bar chart

#### Hooks
- `src/hooks/useCountry.ts` - Hook pour récupérer les données d'un pays

#### Pages
- `src/app/countries/[id]/page.tsx` - Page dynamique pour chaque pays

### Fonctionnalités

**CountryHeader**
- Affichage du drapeau (emoji 6xl)
- Nom du pays avec code (badge)
- Continent avec icône MapPin
- Score de compatibilité (optionnel)
- Bouton favori (cœur)

**CostOfLivingSection**
- 3 cards avec icônes : Coût de vie, Loyer, Pouvoir d'achat
- Valeurs /100 par rapport à New York
- Explication des indices
- Design responsive (grid 1→3 cols)

**ClimateSection**
- 3 cards : Température, Type de climat, Précipitations
- Couleurs dynamiques selon la température
- Labels de niveau de pluie (Faible/Modéré/Élevé)
- Conseils climatiques personnalisés

**QualityOfLifeSection**
- 4 cards : Sécurité, Santé, Environnement, Internet
- Graphique bar chart horizontal (ApexCharts)
- Labels de qualité (Excellent/Bon/Moyen)
- Informations contextuelles

## Tâche 09 : Système de Favoris

### Fichiers créés

#### API Routes
- `src/app/api/favorites/route.ts` - GET (liste) et POST (ajouter)
- `src/app/api/favorites/[id]/route.ts` - DELETE (supprimer)

#### Hooks
- `src/hooks/useFavorites.ts` - Hook complet pour gérer les favoris

#### Pages
- `src/app/favorites/page.tsx` - Page liste des favoris

### Fonctionnalités

**API Favorites**

**POST /api/favorites**
```typescript
Body: { countryId: string }
Response: Favorite avec country
Status: 201 Created | 409 Conflict (déjà favori)
```

**GET /api/favorites**
```typescript
Response: Favorite[] avec countries et data
Ordre: Par createdAt desc
```

**DELETE /api/favorites/[id]**
```typescript
Vérification: userId correspond
Status: 200 OK | 404 Not Found | 403 Forbidden
```

**Hook useFavorites**
```typescript
{
  favorites: Favorite[],
  isLoading: boolean,
  error: string | null,
  addFavorite: (countryId: string) => Promise<void>,
  removeFavorite: (favoriteId: string) => Promise<void>,
  isFavorite: (countryId: string) => boolean,
  toggleFavorite: (countryId: string) => Promise<void>,
  refetch: () => Promise<void>
}
```

**Page Favorites**
- État vide avec icône cœur et CTA
- Grille responsive (1→2→3 cols)
- Cards avec drapeau, nom, continent
- Métriques rapides (coût de vie, sécurité)
- Bouton supprimer (Trash2)
- Lien vers détails du pays

**Intégration**
- Bouton cœur dans CountryHeader
- État favori synchronisé
- Toggle optimiste (pas d'attente)

## Schéma de données

### Prisma Schema (Favorite)
```prisma
model Favorite {
  id        String   @id @default(cuid())
  userId    String
  countryId String
  createdAt DateTime @default(now())

  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  country Country @relation(fields: [countryId], references: [id], onDelete: Cascade)

  @@unique([userId, countryId])
  @@map("favorites")
}
```

## Flux utilisateur

### Détails pays
1. Clic sur "Voir détails" depuis dashboard/favoris
2. Navigation vers `/countries/[id]`
3. Fetch données via API
4. Affichage 4 sections :
   - Header avec favoris
   - Coût de vie
   - Climat
   - Qualité de vie

### Favoris
1. Clic sur cœur (CountryHeader ou autre)
2. POST /api/favorites si pas favori
3. DELETE si déjà favori
4. Mise à jour UI immédiate
5. Refetch liste des favoris

### Liste favoris
1. Navigation vers `/favorites`
2. GET /api/favorites
3. Affichage grille de cards
4. Clic "Voir détails" → page pays
5. Clic poubelle → suppression

## Intégrations

### CountryHeader mis à jour
```typescript
<CountryHeader
  name={country.name}
  code={country.code}
  flag={country.flag}
  continent={country.continent}
  isFavorite={isFavorite(country.id)}
  onToggleFavorite={() => toggleFavorite(country.id)}
/>
```

### Navigation
- Dashboard → Détails pays
- Favoris → Détails pays
- Détails pays → Dashboard/Favoris
- Header global peut avoir lien Favoris

## Design

### Couleurs par score
- **Température** :
  - < 10°C : Bleu
  - 10-20°C : Vert
  - 20-25°C : Orange
  - > 25°C : Rouge

- **Qualité** :
  - 70-100 : Vert (Excellent)
  - 50-69 : Orange (Bon)
  - 0-49 : Rouge (Moyen)

### Icônes (Lucide React)
- DollarSign : Coût de vie
- Home : Loyer
- ShoppingCart : Pouvoir d'achat
- Thermometer : Température
- Cloud : Type climat
- Droplets : Pluie
- Shield : Sécurité
- Heart : Santé / Favoris
- Wind : Environnement
- Wifi : Internet
- Trash2 : Supprimer favori

## Améliorations futures

### Pages détails
1. **Onglets** : Vue d'ensemble, Coût détaillé, Vie pratique
2. **Graphiques historiques** : Évolution des indices
3. **Comparaison inline** : Bouton "Comparer avec..."
4. **Avis utilisateurs** : Témoignages d'expatriés
5. **Visa & impôts** : Section dédiée

### Favoris
1. **Notes personnelles** : Ajouter des notes sur chaque favori
2. **Tags** : Catégoriser les favoris
3. **Partage** : Partager sa liste de favoris
4. **Export** : PDF ou Excel

### Performance
1. **Cache** : Mettre en cache les données pays
2. **Optimistic UI** : Favoris sans attendre la réponse
3. **Prefetch** : Charger les données au hover
4. **Images** : Ajouter photos des villes

## Notes d'implémentation

- ApexCharts utilisé pour les graphiques (import dynamique SSR-safe)
- Tous les composants sont "use client" car interactifs
- Le hook useFavorites fait un fetch initial automatique
- Les favoris sont associés à l'utilisateur authentifié
- Contrainte unique userId+countryId empêche les doublons
- Suppression en cascade si pays ou user supprimé
