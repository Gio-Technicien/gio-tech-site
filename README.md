# Gio-Tech — site vitrine

Site statique responsive en français, conçu pour GitHub Pages. Aucun framework, aucune dépendance externe, aucun suivi publicitaire.

## Fichiers
- `index.html` : contenu, référencement et structure.
- `styles.css` : identité visuelle, mise en page responsive et animations.
- `script.js` : menu mobile, animation d'introduction, apparitions au défilement et formulaire `mailto`.
- `assets/` : logo extrait de la carte et favicon.

## Tester sur votre ordinateur
Ouvrir `index.html` dans un navigateur. Pour un aperçu local plus fidèle, démarrer un serveur statique depuis ce dossier, par exemple `python -m http.server 8000`, puis ouvrir `http://localhost:8000`.

## Publier sur GitHub Pages
1. Créer un dépôt GitHub, par exemple `gio-tech-site`.
2. Téléverser le contenu de ce dossier à la racine du dépôt (le fichier `index.html` doit être à la racine).
3. Ouvrir **Settings → Pages**.
4. Dans **Build and deployment**, choisir **Deploy from a branch**, sélectionner `main` et `/ (root)`, puis enregistrer.
5. Attendre la publication et tester l'URL fournie par GitHub Pages.
6. Pour `www.gio-tech.ca`, configurer le domaine personnalisé dans Pages et les enregistrements DNS demandés par GitHub. Activer **Enforce HTTPS** lorsque disponible.

## Contact
Le formulaire prépare un courriel dans l'application de messagerie du visiteur. Il ne transmet pas de données à un serveur et ne les stocke pas. Un vrai formulaire avec envoi direct nécessiterait un service de formulaire ou un backend distinct.

## Sécurité et limites
- Aucun script tiers, aucune bibliothèque externe, aucun stockage de données côté navigateur.
- Validation HTML et limites de longueur côté client; le formulaire utilise `mailto`, pas un endpoint serveur.
- Politique CSP de base dans la page, liens externes avec `rel="noopener noreferrer"`, et prise en charge de `prefers-reduced-motion`.
- GitHub Pages est un hébergement statique : les en-têtes HTTP de sécurité avancés (HSTS, X-Content-Type-Options, Permissions-Policy, etc.) ne peuvent pas être configurés par ce dépôt seul. La balise CSP est une protection complémentaire, pas une garantie absolue.
- Aucun audit ne peut garantir zéro vulnérabilité. Réviser les dépendances (il n'y en a pas actuellement), le DNS et les paramètres du compte GitHub avant mise en production.

## À valider avant publication
Vérifier que le numéro de téléphone, le courriel et le secteur de service sont toujours exacts. Les textes décrivent les services visibles sur la carte; les promesses de délais, garanties, tarifs et disponibilité n'ont pas été inventées.


## Formulaire de contact sécurisé (Formspree + Turnstile)

Le formulaire envoie les demandes par POST vers `https://formspree.io/f/xzeekkzw`. Il comprend un honeypot `_gotcha` et le widget Cloudflare Turnstile.

### Configuration obligatoire avant publication

1. Dans Cloudflare Turnstile, crée un widget en mode **Managed** pour `gio-tech.ca` et `www.gio-tech.ca`.
2. Remplace dans `index.html` `0x4AAAAAAFy3pLSmN16VrvKZ` par la **Site Key** publique du widget.
3. Dans Formspree, ouvre le formulaire correspondant à `xzeekkzw`, puis **Settings → CAPTCHA**. Active CAPTCHA, choisis **Cloudflare Turnstile**, colle la **Secret Key** du widget et enregistre.
4. Vérifie que les notifications Formspree sont envoyées à la bonne adresse courriel et, si l'option existe, limite le formulaire au domaine `gio-tech.ca`.
5. Teste un envoi réel depuis le site publié. Ne publie jamais la Secret Key dans les fichiers du dépôt GitHub.

Le champ honeypot `_gotcha` doit rester vide pour les visiteurs. Turnstile fournit automatiquement le champ `cf-turnstile-response`, que Formspree valide côté serveur lorsque CAPTCHA est activé.
