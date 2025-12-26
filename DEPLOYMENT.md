# Guide de Déploiement - NomadCompass

## Prérequis

- Node.js 18.x ou supérieur
- PostgreSQL 14 ou supérieur
- Compte Anthropic (Claude API)
- Compte GitHub (pour OAuth)

## Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/nomadcompass"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here" # Générer avec: openssl rand -base64 32

# GitHub OAuth
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"

# Anthropic API
ANTHROPIC_API_KEY="your-anthropic-api-key"
```

## Déploiement sur Vercel (Recommandé)

### 1. Préparation

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login
```

### 2. Configuration de la base de données

Utilisez un service PostgreSQL managé :
- **Vercel Postgres** (recommandé, intégré)
- **Neon** (gratuit, excellent pour le développement)
- **Supabase** (fonctionnalités supplémentaires)

### 3. Variables d'environnement Vercel

```bash
# Ajouter les variables d'environnement
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel env add GITHUB_ID
vercel env add GITHUB_SECRET
vercel env add ANTHROPIC_API_KEY
```

### 4. Déploiement

```bash
# Premier déploiement
vercel

# Déploiement en production
vercel --prod
```

### 5. Configuration post-déploiement

1. **GitHub OAuth** :
   - Aller sur GitHub Settings > Developer settings > OAuth Apps
   - Ajouter l'URL de callback : `https://votre-domaine.com/api/auth/callback/github`

2. **Prisma** :
   ```bash
   # Migration de la base de données
   npx prisma migrate deploy

   # Seed initial (optionnel)
   npm run prisma:seed
   ```

3. **Vérifier le sitemap** :
   - Accéder à : `https://votre-domaine.com/sitemap.xml`

## Déploiement sur Railway

### 1. Configuration

Créer un fichier `railway.json` :

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 2. Étapes

```bash
# Installer Railway CLI
npm install -g @railway/cli

# Se connecter
railway login

# Initialiser le projet
railway init

# Ajouter PostgreSQL
railway add --database postgresql

# Déployer
railway up
```

## Déploiement manuel (VPS)

### 1. Serveur (Ubuntu 22.04)

```bash
# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Installer PM2
sudo npm install -g pm2
```

### 2. Configuration PostgreSQL

```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer la base de données
CREATE DATABASE nomadcompass;
CREATE USER nomadcompass_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE nomadcompass TO nomadcompass_user;
```

### 3. Déploiement de l'application

```bash
# Cloner le projet
git clone https://github.com/votre-compte/nomadcompass.git
cd nomadcompass

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# Générer Prisma Client
npx prisma generate

# Migrer la base de données
npx prisma migrate deploy

# Build de production
npm run build

# Démarrer avec PM2
pm2 start npm --name "nomadcompass" -- start
pm2 save
pm2 startup
```

### 4. Nginx (reverse proxy)

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. SSL avec Certbot

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

## Post-déploiement

### 1. Vérifications

- [ ] Page d'accueil accessible
- [ ] Authentification GitHub fonctionne
- [ ] Questionnaire sauvegarde correctement
- [ ] Recommandations générées
- [ ] Favoris ajoutés/supprimés
- [ ] Panel admin accessible
- [ ] Sitemap généré
- [ ] Robots.txt accessible

### 2. Monitoring

```bash
# PM2 (si déploiement manuel)
pm2 monit

# Logs
pm2 logs nomadcompass

# Vercel (si déploiement Vercel)
# Utiliser le dashboard Vercel
```

### 3. Maintenance

```bash
# Mise à jour
git pull origin main
npm install
npx prisma migrate deploy
npm run build
pm2 restart nomadcompass

# Backup base de données
pg_dump nomadcompass > backup_$(date +%Y%m%d).sql
```

## Résolution de problèmes

### Erreur Prisma

```bash
# Régénérer le client
npx prisma generate

# Réinitialiser la base de données (ATTENTION : perte de données)
npx prisma migrate reset
```

### Erreur NextAuth

- Vérifier que `NEXTAUTH_URL` correspond à l'URL de production
- Vérifier que `NEXTAUTH_SECRET` est défini
- Vérifier les callbacks GitHub OAuth

### Erreur Claude API

- Vérifier que `ANTHROPIC_API_KEY` est valide
- Vérifier les quotas API
- Voir les logs pour les erreurs spécifiques

## Sécurité

1. **Variables d'environnement** : Ne jamais commiter le fichier `.env`
2. **HTTPS** : Toujours utiliser HTTPS en production
3. **Rate limiting** : Implémenter un rate limiter pour l'API
4. **Validation** : Toujours valider les entrées utilisateur
5. **Secrets** : Utiliser des secrets forts et les rotationner régulièrement

## Performance

1. **Cache** : Utiliser Redis pour le cache (recommandé en production)
2. **CDN** : Utiliser Vercel CDN ou Cloudflare
3. **Images** : Optimisation automatique avec next/image
4. **Database** : Indexer les colonnes fréquemment recherchées

## Scalabilité

Pour gérer plus de trafic :

1. **Base de données** : Augmenter les ressources ou utiliser un pool de connexions
2. **Serverless** : Vercel scale automatiquement
3. **Cache** : Redis pour réduire la charge sur la DB
4. **CDN** : Pour les assets statiques
