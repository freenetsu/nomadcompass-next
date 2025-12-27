# Migration de Palette de Couleurs - Guide Rapide

## Changements Principaux

### 🎨 Nouvelle Palette Brand
**Avant** : Violet-bleu custom (#465FFF)
**Après** : Bleu Tailwind standard (#2563EB)

### 🌗 Meilleure Distinction Clair/Sombre
**Avant** : Backgrounds presque identiques
**Après** : Différence claire et contrastée

### ♿ Accessibilité Améliorée
**Avant** : Plusieurs ratios < 4.5:1 (échec WCAG)
**Après** : Tous les ratios ≥ 4.5:1 (passe WCAG AA minimum)

---

## Si Vous Avez du Code Custom

### Remplacement Automatique

Si vous avez du code qui utilise les anciennes couleurs, voici les remplacements :

#### Palette Brand

```bash
# Chercher et remplacer dans vos fichiers
text-brand-500 → text-brand-600 (mode clair) ou text-brand-500 (mode sombre avec dark:)
bg-brand-500 → bg-brand-600 (boutons primaires mode clair)
bg-brand-50 → bg-brand-100 (badges light)
text-brand-400 → text-brand-300 (mode sombre)
```

#### Palette Gray

```bash
text-gray-400 → text-gray-500 (texte secondaire mode clair)
text-gray-500 → text-gray-600 (texte secondaire mode clair)
text-gray-700 → text-gray-800 (texte principal mode clair)

dark:text-gray-400 → dark:text-gray-300 (texte secondaire mode sombre)
dark:bg-gray-900 → dark:bg-gray-800 (cards et containers)
dark:border-gray-800 → dark:border-gray-700 (bordures)
```

---

## Exemples de Migration

### Exemple 1 : Badge

**Avant** :
```tsx
<span className="bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">
  Badge
</span>
```

**Après** :
```tsx
<span className="bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
  Badge
</span>
```

### Exemple 2 : Bouton Primary

**Avant** :
```tsx
<button className="bg-brand-500 text-white hover:bg-brand-600">
  Action
</button>
```

**Après** :
```tsx
<button className="bg-brand-600 text-white hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600">
  Action
</button>
```

### Exemple 3 : Texte Secondaire

**Avant** :
```tsx
<p className="text-gray-500 dark:text-gray-400">
  Description
</p>
```

**Après** :
```tsx
<p className="text-gray-600 dark:text-gray-300">
  Description
</p>
```

### Exemple 4 : Card

**Avant** :
```tsx
<div className="bg-white dark:bg-white/[0.03]">
  ...
</div>
```

**Après** :
```tsx
<div className="bg-white dark:bg-gray-800/80">
  ...
</div>
```

---

## Script de Migration Automatique

Créez un fichier `migrate-colors.sh` :

```bash
#!/bin/bash

# Remplacements Brand
find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) -exec sed -i '' \
  -e 's/bg-brand-50 text-brand-500/bg-brand-100 text-brand-700/g' \
  -e 's/dark:bg-brand-500\/15 dark:text-brand-400/dark:bg-brand-900\/40 dark:text-brand-300/g' \
  -e 's/bg-brand-500 text-white hover:bg-brand-600/bg-brand-600 text-white hover:bg-brand-700/g' \
  {} +

# Remplacements Gray
find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) -exec sed -i '' \
  -e 's/text-gray-700 dark:text-gray-300/text-gray-800 dark:text-gray-200/g' \
  -e 's/text-gray-500 dark:text-gray-400/text-gray-600 dark:text-gray-300/g' \
  -e 's/dark:bg-gray-900/dark:bg-gray-800/g' \
  -e 's/dark:border-gray-800/dark:border-gray-700/g' \
  {} +

echo "Migration terminée !"
```

**Attention** : Faites un backup avant d'exécuter ce script !

---

## Validation Post-Migration

### 1. Tests Visuels
- [ ] Tester le mode clair
- [ ] Tester le mode sombre
- [ ] Vérifier le switch clair/sombre
- [ ] Tester tous les composants UI

### 2. Tests d'Accessibilité
- [ ] Lancer Lighthouse
- [ ] Vérifier les ratios de contraste
- [ ] Tester la navigation au clavier

### 3. Tests Fonctionnels
- [ ] Formulaires
- [ ] Boutons et actions
- [ ] Navigation
- [ ] Modals et dropdowns

---

## FAQ

### Q : Mes composants custom vont-ils casser ?
**R** : Si vous utilisez les composants UI du projet (Button, Badge, etc.), non. Si vous avez du code custom avec les anciennes couleurs, suivez le guide de migration ci-dessus.

### Q : Dois-je mettre à jour mes mocks/tests ?
**R** : Oui, si vos tests vérifient des classes CSS spécifiques. Les snapshots devront être mis à jour.

### Q : Les anciennes couleurs brand-* existent-elles encore ?
**R** : Oui, toutes les teintes (25-950) existent toujours, mais avec de nouvelles valeurs hexadécimales.

### Q : Que faire si je trouve un problème de contraste ?
**R** : Ouvrez une issue avec une capture d'écran et l'endroit où le problème apparaît. Utilisez les valeurs recommandées du guide.

### Q : Puis-je utiliser d'autres couleurs Tailwind ?
**R** : Oui, mais privilégiez les palettes définies dans le projet pour la cohérence.

---

## Support

Pour toute question ou problème :
1. Consultez la [documentation complète](./PALETTE_COLORS_UPDATE.md)
2. Voir les [exemples de contraste](./COLOR_CONTRAST_EXAMPLES.md)
3. Lire le [guide d'utilisation](./COLOR_USAGE_GUIDE.md)

---

## Changelog

### v2.0.0 - 2025-01-XX

#### Changed
- 🎨 Palette brand passée de violet-bleu custom à bleu Tailwind standard
- 🌗 Variables CSS globales mises à jour pour meilleure distinction clair/sombre
- ♿ Amélioration de tous les ratios de contraste pour accessibilité WCAG AA/AAA
- 🔄 Mise à jour de 11 composants UI pour meilleure lisibilité

#### Components Updated
- Badge (light & solid variants)
- Button (all variants)
- Input & Select
- Dropdown
- Modal
- RecommendationCard
- ComparisonChart
- Admin layout

#### Breaking Changes
- Aucun pour les utilisateurs des composants UI
- Migration nécessaire si usage direct des couleurs dans du code custom
