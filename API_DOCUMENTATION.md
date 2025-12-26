# Documentation API - NomadCompass

Base URL : `https://votre-domaine.com/api`

## Authentification

Toutes les routes API (sauf `/auth/*`) nécessitent une authentification via NextAuth.js.

**Headers requis** :
```
Cookie: next-auth.session-token=...
```

**Erreurs d'authentification** :
- `401 Unauthorized` : Session invalide ou expirée

---

## Routes Questionnaire

### POST /api/questionnaire

Sauvegarder les réponses du questionnaire utilisateur.

**Auth** : Requise

**Body** :
```json
{
  "age": "25-35",
  "situation": "celibataire",
  "profession": "développeur",
  "budget": "moyen",
  "climat": "tempere",
  "priorites": {
    "coutVie": 5,
    "securite": 4,
    "sante": 5,
    "climat": 3,
    "culture": 4,
    "internet": 5,
    "transport": 3,
    "fiscalite": 4
  }
}
```

**Réponse (200)** :
```json
{
  "success": true,
  "id": "clxx..."
}
```

**Erreurs** :
- `400 Bad Request` : Données invalides
- `401 Unauthorized` : Non authentifié
- `500 Internal Server Error` : Erreur serveur

---

### GET /api/questionnaire

Récupérer les réponses du questionnaire de l'utilisateur.

**Auth** : Requise

**Réponse (200)** :
```json
{
  "response": {
    "age": "25-35",
    "situation": "celibataire",
    "profession": "développeur",
    "budget": "moyen",
    "climat": "tempere",
    "priorites": {
      "coutVie": 5,
      "securite": 4
    }
  },
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Réponse (200 - Pas de questionnaire)** :
```json
{
  "response": null
}
```

---

## Routes Recommandations

### GET /api/recommendations

Générer des recommandations personnalisées basées sur le questionnaire.

**Auth** : Requise

**Prérequis** : L'utilisateur doit avoir complété le questionnaire

**Réponse (200)** :
```json
{
  "recommendations": [
    {
      "countryId": "portugal",
      "countryName": "Portugal",
      "countryCode": "PT",
      "flag": "🇵🇹",
      "continent": "Europe",
      "overallScore": 87,
      "matchPercentage": 89,
      "reasoning": "Le Portugal offre un excellent équilibre...",
      "pros": [
        "Coût de vie abordable",
        "Excellente qualité de vie"
      ],
      "cons": [
        "Salaires moyens plus bas",
        "Barrière de la langue"
      ],
      "scores": {
        "coutDeVie": 85,
        "securite": 90,
        "sante": 85,
        "climat": 92,
        "culture": 88,
        "internet": 80,
        "transport": 75,
        "fiscalite": 88
      }
    }
  ],
  "analysis": {
    "budgetCategory": "moyen",
    "climatePreference": "tempéré",
    "topPriorities": [
      {
        "name": "Coût de vie",
        "score": 5
      },
      {
        "name": "Santé",
        "score": 5
      }
    ]
  }
}
```

**Erreurs** :
- `401 Unauthorized` : Non authentifié
- `404 Not Found` : Questionnaire non complété
- `500 Internal Server Error` : Erreur lors de la génération

---

## Routes Favoris

### GET /api/favorites

Récupérer la liste des favoris de l'utilisateur.

**Auth** : Requise

**Réponse (200)** :
```json
[
  {
    "id": "fav_123",
    "userId": "user_456",
    "countryId": "portugal",
    "createdAt": "2025-01-15T10:30:00Z",
    "country": {
      "id": "portugal",
      "name": "Portugal",
      "code": "PT",
      "flag": "🇵🇹",
      "continent": "Europe",
      "data": {
        "costOfLivingIndex": 52.3,
        "safetyIndex": 73.5
      }
    }
  }
]
```

---

### POST /api/favorites

Ajouter un pays aux favoris.

**Auth** : Requise

**Body** :
```json
{
  "countryId": "portugal"
}
```

**Réponse (201)** :
```json
{
  "id": "fav_123",
  "userId": "user_456",
  "countryId": "portugal",
  "createdAt": "2025-01-15T10:30:00Z",
  "country": {
    "id": "portugal",
    "name": "Portugal"
  }
}
```

**Erreurs** :
- `400 Bad Request` : countryId manquant
- `401 Unauthorized` : Non authentifié
- `409 Conflict` : Pays déjà dans les favoris

---

### DELETE /api/favorites/[id]

Retirer un pays des favoris.

**Auth** : Requise

**Params** :
- `id` : ID du favori à supprimer

**Réponse (200)** :
```json
{
  "success": true
}
```

**Erreurs** :
- `401 Unauthorized` : Non authentifié
- `404 Not Found` : Favori non trouvé

---

## Routes Pays

### GET /api/countries/[id]

Récupérer les détails d'un pays.

**Auth** : Non requise

**Params** :
- `id` : ID du pays

**Réponse (200)** :
```json
{
  "id": "portugal",
  "name": "Portugal",
  "code": "PT",
  "flag": "🇵🇹",
  "continent": "Europe",
  "data": {
    "costOfLivingIndex": 52.3,
    "averageRent": 800,
    "averageSalary": 1500,
    "averageTemp": 17.5,
    "climate": "Méditerranéen",
    "rainfall": 600,
    "safetyIndex": 73.5,
    "healthcareIndex": 70.2,
    "pollutionIndex": 35.1,
    "internetSpeed": 80.5,
    "transportIndex": 65.3
  },
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-15T00:00:00Z"
}
```

**Erreurs** :
- `404 Not Found` : Pays non trouvé

---

## Routes Admin

**Auth** : Requise + Role Admin

Toutes les routes admin nécessitent un rôle `admin` :
```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

### GET /api/admin/countries

Liste tous les pays avec leurs données.

**Réponse (200)** :
```json
[
  {
    "id": "portugal",
    "name": "Portugal",
    "code": "PT",
    "flag": "🇵🇹",
    "continent": "Europe",
    "data": {
      "costOfLivingIndex": 52.3,
      "safetyIndex": 73.5
    },
    "createdAt": "2025-01-01T00:00:00Z"
  }
]
```

---

### POST /api/admin/countries

Créer un nouveau pays.

**Body** :
```json
{
  "name": "Espagne",
  "code": "ES",
  "flag": "🇪🇸",
  "continent": "Europe"
}
```

**Réponse (201)** :
```json
{
  "id": "espagne",
  "name": "Espagne",
  "code": "ES",
  "flag": "🇪🇸",
  "continent": "Europe"
}
```

---

### DELETE /api/admin/countries/[id]

Supprimer un pays.

**Params** :
- `id` : ID du pays

**Réponse (200)** :
```json
{
  "success": true
}
```

---

### POST /api/admin/scraping

Lancer le scraping des données pays.

**Réponse (200)** :
```json
{
  "results": [
    {
      "country": "Portugal",
      "status": "success",
      "message": "Données mises à jour"
    },
    {
      "country": "Espagne",
      "status": "error",
      "message": "Timeout"
    }
  ]
}
```

---

## Routes Auth (NextAuth.js)

### GET/POST /api/auth/signin

Page de connexion NextAuth.

**Providers supportés** :
- GitHub OAuth

---

### GET /api/auth/signout

Déconnexion.

---

### GET /api/auth/session

Récupérer la session actuelle.

**Réponse (200 - Authentifié)** :
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "image": "https://...",
    "role": "user"
  },
  "expires": "2025-02-15T10:30:00Z"
}
```

**Réponse (200 - Non authentifié)** :
```json
null
```

---

## Codes d'erreur

| Code | Description |
|------|-------------|
| 200 | Succès |
| 201 | Créé |
| 400 | Requête invalide |
| 401 | Non authentifié |
| 403 | Accès interdit (non admin) |
| 404 | Ressource non trouvée |
| 409 | Conflit (ressource existe déjà) |
| 500 | Erreur serveur |

---

## Rate Limiting

**Recommandé en production** :

```typescript
// middleware.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response("Rate limit exceeded", { status: 429 });
  }

  return NextResponse.next();
}
```

---

## Exemples d'utilisation

### JavaScript / Fetch

```javascript
// Sauvegarder le questionnaire
const response = await fetch("/api/questionnaire", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    age: "25-35",
    situation: "celibataire",
    // ...
  }),
});

const data = await response.json();
```

### React Hook

```typescript
// Custom hook
function useRecommendations() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recommendations")
      .then((res) => res.json())
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
}
```

---

## Webhooks (Future)

Endpoints pour intégrations externes :

### POST /api/webhooks/stripe

Gérer les événements Stripe (paiements).

### POST /api/webhooks/github

Gérer les événements GitHub (déploiements).

---

## Changelog API

### v1.0.0 (2025-01-15)
- API initiale
- Routes questionnaire, recommandations, favoris
- Routes admin
- Authentification NextAuth

---

## Support

Pour toute question sur l'API :
- Documentation : Ce fichier
- Issues : GitHub Issues
- Email : support@nomadcompass.com
