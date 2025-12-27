# Test de Contraste - Instructions

## Ce qui a été modifié

### 1. ComparisonChart.tsx
- Utilise maintenant le hook `useTheme()` au lieu de MutationObserver
- Force un re-render complet avec `key={theme}`
- Couleurs adaptatives :
  - Labels (Budget, Climat, etc.) : `#cbd5e1` en mode sombre (au lieu de #64748b)
  - Légende (noms pays) : `#e2e8f0` en mode sombre (au lieu de couleur par défaut)

### 2. Remplacement global
- Toutes les occurrences de `dark:text-gray-400` → `dark:text-gray-300`
- Dans ~60 fichiers composants

## Pour tester

1. **Vider le cache navigateur** :
   - Chrome/Edge : Ctrl+Shift+Del (Cmd+Shift+Del sur Mac)
   - Ou Mode navigation privée

2. **Aller sur** : http://localhost:3000/dashboard

3. **Activer le mode sombre** avec le bouton toggle

4. **Vérifier le graphique radar** :
   - Les labels doivent être gris clair visibles
   - Les noms de pays doivent être gris très clair

## Debug

Si toujours pas visible, ouvrir la console navigateur (F12) et taper :
```javascript
document.documentElement.classList.contains('dark')
```

Doit retourner `true` en mode sombre.

Puis :
```javascript
getComputedStyle(document.body).getPropertyValue('--foreground')
```

Doit retourner `#f1f5f9` en mode sombre (pas #1a1a1a).
