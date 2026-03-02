# Starter Front WCS - Material UI + Vite + TypeScript

Ce projet est un template de démarrage moderne pour développer des applications React performantes. Il est pré-configuré avec **Material UI**, **Vite**, **TypeScript**, et intègre des outils de qualité de code comme **Biome** et **Husky**.

## 🚀 Fonctionnalités

- **[Vite](https://vitejs.dev/)** : Build tool ultra-rapide pour le développement web moderne.
- **[React](https://react.dev/)** : Bibliothèque JavaScript pour créer des interfaces utilisateurs.
- **[TypeScript](https://www.typescriptlang.org/)** : Superset typé de JavaScript pour un code plus robuste.
- **[Material UI (MUI)](https://mui.com/)** : Bibliothèque de composants React populaire pour un design rapide et esthétique.
- **[Biome](https://biomejs.dev/)** : Toolchain web performante pour le linting et le formatage (remplace ESLint et Prettier).
- **[Husky](https://typicode.github.io/husky/)** : Gestionnaire de hooks Git moderne pour automatiser les tâches (comme le linting avant commit).

## 🛠 Installation (À faire absolument !)

Suivez ces étapes dans l'ordre pour que tout fonctionne correctement.

1.  **Récupérer le projet** :
    ```bash
    git clone <votre-repo-url>
    cd starter-front-wcs
    ```
    > 💡 **Utilisateurs Windows** : Si vous avez des erreurs de style (CRLF/LF), lancez `git config --global core.autocrlf true` pour que Git convertisse automatiquement les fins de ligne.

2.  **Installer les dépendances** :
    ```bash
    npm install
    ```
    ⚠️ **Important** : Cette commande installe les librairies ET configure automatiquement Husky (les hooks git). Ne sautez pas cette étape.

3.  **Vérifier que Husky est bien installé** :
    Si jamais vous rencontrez des problèmes lors des commits (exemple : "command not found" ou hooks ignorés), lancez manuellement :
    ```bash
    npm run prepare
    ```

## 💻 Développement

Une fois l'installation terminée, lancez le serveur local :

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

## 📜 Commandes Utiles (Anti-Frustration)

Voici les commandes exactes à utiliser en cas de pépin ou pour vérifier votre code.

| Besoin | Commande à lancer | Pourquoi ? |
| :--- | :--- | :--- |
| **Lancer le projet** | `npm run dev` | Pour coder et voir le résultat en direct. |
| **Vérifier / Corriger le code** | `npm run lint:fix` | À lancer **avant** de commit si vous avez des erreurs. Cela corrige automatiquement le formatage et les petits soucis. |
| **Juste vérifier le code** | `npm run lint` | Pour voir la liste des erreurs sans les corriger. |
| **Réparer les hooks Git** | `npm run prepare` | Si vos commits ne sont pas vérifiés ou si Git se plaint, lancez ça une fois. |
| **Compiler pour production** | `npm run build` | Vérifie que tout compile bien (TypeScript) et crée le dossier `dist`. à utiliser avant de déployer. |

## 🛡 Qualité du Code & Git Hooks

### Biome
Nous utilisons **Biome** à la place de la combinaison classique ESLint + Prettier. C'est un outil beaucoup plus rapide qui gère à la fois le formatage et le linter.

- Pour vérifier les erreurs : `npm run lint`
- Pour tout corriger automatiquement : `npm run lint:fix`

### Husky
**Husky** est configuré pour intercepter vos commits avec deux vérifications :
- **Pre-commit hook** : Vérifie que le diff ne dépasse pas 150 lignes, puis lance `npm run lint`. Si le code ne respecte pas les standards, le commit est bloqué.
- **Commit-msg hook** : Vérifie que le message de commit suit le format **Conventional Commits** (voir ci-dessous).

### Conventional Commits (Obligatoire)

Chaque message de commit doit suivre le format **Conventional Commits** :

```
type(scope): description
```

| Élément | Obligatoire | Détail |
| :--- | :--- | :--- |
| **type** | Oui | `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert` |
| **scope** | Non | Le module concerné entre parenthèses, ex: `(auth)`, `(cart)` |
| **description** | Oui | Min 10 caractères, décrit ce que fait le commit |

**Exemples valides :**
```bash
git commit -m "feat: ajout de la page de connexion"
git commit -m "fix(cart): correction du calcul du total"
git commit -m "docs: mise à jour du README avec les instructions"
```

**Exemples invalides :**
```bash
git commit -m "fix stuff"        # Pas de ':' après le type
git commit -m "update"           # Type non reconnu
git commit -m "feat: fix"        # Description trop courte (min 10 caractères)
```

### Limite de taille des commits (150 lignes max)

Pour encourager des commits progressifs et logiques, chaque commit est limité à **150 lignes modifiées** (ajouts + suppressions).

> Les fichiers `package-lock.json` et `*.svg` sont exclus du comptage.

Si votre commit dépasse la limite :
1. `git reset HEAD` — désindexer tous les fichiers
2. `git add fichier1.tsx` — ajouter un fichier à la fois
3. `git commit -m "feat: ..."` — commiter un petit bloc logique
4. Répéter pour les fichiers restants

## 🤖 Utilisation de l'IA (ChatGPT, Claude, Copilot...)

Ce projet est configuré pour favoriser l'apprentissage. Si vous utilisez des outils d'IA :

- **GitHub Copilot** : Le projet contient des instructions spécifiques pour Copilot afin qu'il agisse comme un mentor plutôt que de donner les réponses.
- **Cursor** : Le fichier `.cursorrules` configure automatiquement l'éditeur pour adopter la même approche pédagogique.
- **ChatGPT / Claude / Autres** : Veuillez copier le contenu du fichier `AI_INSTRUCTIONS.md` au début de votre conversation. Cela demandera à l'IA de vous guider pas à pas sans vous donner la solution finale directement.

## 🎣 Workflow Git (Strict & Sécurisé)

Ce projet utilise des **règles de protection**. Vous ne pouvez **pas** pousser directement sur `main` ou `dev`.

### Comment travailler :

1.  **Créer une branche** pour votre tâche :
    ```bash
    git checkout -b feature/ma-nouvelle-page
    ```
2.  **Coder** et faire vos commits (Husky vérifie votre code).
3.  **Pousser** votre branche :
    ```bash
    git push -u origin feature/ma-nouvelle-page
    ```
4.  **Ouvrir une Pull Request (PR)** sur GitHub :
    *   De `feature/ma-nouvelle-page` vers `dev` (ou `main` selon les consignes).
5.  **Attendre la validation (CI)** :
    *   GitHub va lancer les tests automatiques (`build-and-lint`).
    *   Si c'est vert ✅ : Vous pouvez merger.
    *   Si c'est rouge ❌ : Corrigez votre code, commitez et poussez à nouveau (la PR se met à jour toute seule).

---

## 📂 Structure du Projet

```
starter-front-wcs/
├── .husky/             # Configuration des Git hooks
├── public/             # Fichiers statiques publics
├── src/                # Code source de l'application
│   ├── assets/         # Images, fonts, etc.
│   ├── App.tsx         # Composant racine
│   ├── main.tsx        # Point d'entrée React
│   └── ...
├── biome.json          # Configuration Biome
├── package.json        # Dépendances et scripts
├── tsconfig.json       # Configuration TypeScript
└── vite.config.ts      # Configuration Vite
```
