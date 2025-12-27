# Guide d'Utilisation des Couleurs - NomadCompass

## Vue d'Ensemble

Ce guide présente les bonnes pratiques pour utiliser la palette de couleurs mise à jour dans NomadCompass.

---

## Palette Principale

### Brand (Bleu Principal)

Utilisé pour les éléments d'action primaires, liens importants et accents.

```tsx
// Boutons primaires
<button className="bg-brand-600 text-white hover:bg-brand-700">
  Action
</button>

// Liens importants
<a className="text-brand-600 hover:text-brand-700">
  En savoir plus
</a>

// Badge primaire
<span className="bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
  Nouveau
</span>
```

**Recommandations** :
- Utilisez `brand-600` pour les boutons en mode clair
- Utilisez `brand-500` pour les boutons en mode sombre
- Utilisez `brand-700` pour le texte sur fond clair
- Utilisez `brand-300` pour le texte sur fond sombre

---

### Gray (Neutre)

La palette principale pour le texte, bordures et backgrounds.

#### Texte

```tsx
// Texte principal
<h1 className="text-gray-900 dark:text-white">
  Titre Principal
</h1>

// Texte secondaire
<p className="text-gray-700 dark:text-gray-200">
  Description importante
</p>

// Texte tertiaire / labels
<span className="text-gray-600 dark:text-gray-300">
  Label ou info
</span>

// Texte désactivé / hints
<span className="text-gray-500 dark:text-gray-400">
  Information secondaire
</span>
```

#### Backgrounds

```tsx
// Page principale
<div className="bg-white dark:bg-gray-900">
  ...
</div>

// Sections / Cards
<div className="bg-gray-50 dark:bg-gray-800">
  ...
</div>

// Éléments imbriqués
<div className="bg-gray-100 dark:bg-gray-700">
  ...
</div>
```

#### Bordures

```tsx
// Bordures principales
<div className="border border-gray-200 dark:border-gray-700">
  ...
</div>

// Bordures subtiles
<div className="border-t border-gray-100 dark:border-gray-800">
  ...
</div>

// Bordures accentuées
<div className="ring-1 ring-gray-300 dark:ring-gray-600">
  ...
</div>
```

---

### Success (Vert)

Pour les états positifs, validations et confirmations.

```tsx
// Badge success
<span className="bg-success-100 text-success-700 dark:bg-success-900/40 dark:text-success-300">
  Validé
</span>

// Bouton success
<button className="bg-success-600 text-white hover:bg-success-700">
  Confirmer
</button>

// Icône success
<CheckCircle className="text-success-500" />

// Message success
<div className="border-l-4 border-success-500 bg-success-50 dark:bg-success-900/20">
  <p className="text-success-700 dark:text-success-300">
    Opération réussie
  </p>
</div>
```

---

### Error (Rouge)

Pour les erreurs, dangers et actions destructives.

```tsx
// Badge error
<span className="bg-error-100 text-error-700 dark:bg-error-900/40 dark:text-error-300">
  Erreur
</span>

// Bouton danger
<button className="bg-error-600 text-white hover:bg-error-700">
  Supprimer
</button>

// Input avec erreur
<input className="border-error-600 focus:ring-error-500/20 dark:border-error-500" />

// Message d'erreur
<p className="text-error-600 dark:text-error-400">
  Ce champ est requis
</p>
```

---

### Warning (Orange)

Pour les avertissements et informations importantes.

```tsx
// Badge warning
<span className="bg-warning-100 text-warning-700 dark:bg-warning-900/40 dark:text-warning-300">
  Attention
</span>

// Icône warning
<AlertCircle className="text-warning-500" />

// Message warning
<div className="bg-warning-50 border-l-4 border-warning-500 dark:bg-warning-900/20">
  <p className="text-warning-700 dark:text-warning-300">
    Veuillez vérifier vos informations
  </p>
</div>
```

---

## Patterns Courants

### 1. Carte Interactive

```tsx
<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-sm transition-all hover:shadow-theme-md dark:border-gray-700 dark:bg-gray-800/80">
  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
    Titre de la carte
  </h3>
  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
    Description de la carte
  </p>
</div>
```

### 2. Section avec Background

```tsx
<section className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700/60">
  <div className="flex items-center gap-2">
    <Icon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
    <span className="text-xs text-gray-600 dark:text-gray-300">
      Label
    </span>
  </div>
  <span className="mt-1 font-semibold text-gray-900 dark:text-white">
    Valeur
  </span>
</section>
```

### 3. Liste avec Séparateurs

```tsx
<ul className="divide-y divide-gray-200 dark:divide-gray-700">
  <li className="py-3">
    <span className="text-gray-800 dark:text-gray-200">
      Item
    </span>
  </li>
</ul>
```

### 4. Input Complet

```tsx
<div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
    Label
  </label>
  <input
    type="text"
    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-500 focus:border-brand-500 focus:ring-brand-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
    placeholder="Entrez votre texte"
  />
  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
    Texte d'aide
  </p>
</div>
```

### 5. Dropdown Menu

```tsx
<div className="rounded-xl border border-gray-200 bg-white py-2 shadow-theme-lg dark:border-gray-700 dark:bg-gray-800">
  <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-800 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
    <Icon className="h-4 w-4" />
    <span>Action</span>
  </button>
  <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-error-600 transition-colors hover:bg-error-50 dark:text-error-300 dark:hover:bg-error-900/30">
    <Trash className="h-4 w-4" />
    <span>Supprimer</span>
  </button>
</div>
```

---

## États Interactifs

### Hover States

```tsx
// Subtil
<button className="hover:bg-gray-50 dark:hover:bg-gray-800">
  ...
</button>

// Moyen
<button className="hover:bg-gray-100 dark:hover:bg-gray-700">
  ...
</button>

// Accentué
<button className="hover:bg-brand-700 dark:hover:bg-brand-600">
  ...
</button>
```

### Focus States

```tsx
// Focus ring standard
<input className="focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">

// Focus avec bordure
<input className="focus:border-brand-500 focus:ring-brand-500/20">
```

### Disabled States

```tsx
<button
  disabled
  className="cursor-not-allowed opacity-50 bg-brand-600 text-white"
>
  Désactivé
</button>

// Ou avec états spécifiques
<button
  disabled
  className="disabled:bg-brand-400 disabled:cursor-not-allowed"
>
  Désactivé
</button>
```

---

## Checklist d'Accessibilité

Lors de l'ajout de nouveaux composants, vérifiez :

### ✅ Contraste du Texte
- [ ] Texte principal : ratio ≥ 4.5:1 (WCAG AA) ou ≥ 7:1 (WCAG AAA)
- [ ] Texte de grande taille (≥18pt) : ratio ≥ 3:1 (WCAG AA)
- [ ] Texte des boutons : ratio ≥ 4.5:1

### ✅ États Interactifs
- [ ] Hover clairement visible
- [ ] Focus visible (ring ou bordure)
- [ ] Active state distinct de hover
- [ ] Disabled visuellement distinct

### ✅ Thème Sombre
- [ ] Tous les textes lisibles
- [ ] Bordures visibles
- [ ] Backgrounds distincts
- [ ] Même contraste qu'en mode clair

### ✅ Composants Sémantiques
- [ ] Success utilise le vert
- [ ] Error utilise le rouge
- [ ] Warning utilise l'orange
- [ ] Info utilise le bleu clair

---

## Outils de Validation

### WebAIM Contrast Checker
https://webaim.org/resources/contrastchecker/

Utilisez cet outil pour vérifier les ratios de contraste.

### Chrome DevTools
1. Ouvrir DevTools (F12)
2. Onglet "Elements"
3. Sélectionner un élément avec du texte
4. Voir le ratio de contraste dans l'onglet "Styles"

### Lighthouse
1. Ouvrir DevTools (F12)
2. Onglet "Lighthouse"
3. Cocher "Accessibility"
4. Générer le rapport

---

## Anti-Patterns à Éviter

### ❌ NE PAS FAIRE

```tsx
// Texte trop clair en mode clair
<p className="text-gray-400">Texte difficile à lire</p>

// Utiliser white/X au lieu de classes sémantiques
<div className="dark:bg-white/[0.03]">...</div>

// Mélanger les palettes
<button className="bg-blue-500 hover:bg-brand-600">...</button>

// Oublier le mode sombre
<p className="text-gray-700">Texte sans dark:</p>

// Contraste insuffisant pour les états
<button className="hover:bg-gray-50">Hover invisible</button>
```

### ✅ FAIRE À LA PLACE

```tsx
// Texte avec bon contraste
<p className="text-gray-600 dark:text-gray-300">Texte lisible</p>

// Utiliser les classes de gray
<div className="dark:bg-gray-800">...</div>

// Cohérence dans la palette
<button className="bg-brand-600 hover:bg-brand-700">...</button>

// Toujours inclure dark:
<p className="text-gray-700 dark:text-gray-200">Texte adaptatif</p>

// Hover visible
<button className="hover:bg-gray-100 dark:hover:bg-gray-700">Hover clair</button>
```

---

## Exemples Complets

### Carte de Produit

```tsx
<article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-sm transition-all hover:shadow-theme-md dark:border-gray-700 dark:bg-gray-800/80">
  {/* Header */}
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
      Produit
    </h3>
    <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-xs font-medium dark:bg-brand-900/40 dark:text-brand-300">
      Nouveau
    </span>
  </div>

  {/* Description */}
  <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
    Description du produit avec suffisamment de détails.
  </p>

  {/* Statistiques */}
  <div className="mt-4 grid grid-cols-3 gap-3">
    <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-700/60">
      <span className="block text-xs text-gray-600 dark:text-gray-300">
        Métrique
      </span>
      <span className="mt-1 block font-semibold text-gray-900 dark:text-white">
        42
      </span>
    </div>
    {/* Répéter... */}
  </div>

  {/* Actions */}
  <div className="mt-6 flex gap-3">
    <button className="flex-1 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600">
      Voir détails
    </button>
    <button className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700">
      Partager
    </button>
  </div>
</article>
```

---

## Conclusion

Cette palette de couleurs a été optimisée pour :
- ✅ Accessibilité WCAG AA/AAA
- ✅ Distinction claire clair/sombre
- ✅ Cohérence visuelle
- ✅ Maintenabilité du code

Suivez ce guide pour maintenir la qualité visuelle de NomadCompass.
