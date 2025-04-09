# Guide des commandes Cypress pour les tests JavaScript

## Sélecteurs et assertions

### Sélecteurs de base

```javascript
// Sélection par tag
cy.get("button");

// Sélection par classe
cy.get(".ma-classe");

// Sélection par ID
cy.get("#mon-id");

// Sélection par attribut
cy.get('[data-test="mon-attribut"]');

// Sélection combinée
cy.get('p[id="validation-email"]');

// Sélectionner le premier élément
cy.get("li").first();

// Sélectionner le dernier élément
cy.get("li").last();

// Sélectionner un élément par index
cy.get("li").eq(2); // 3ème élément (index commence à 0)

// Trouver des éléments descendants
cy.get("#formulaire").find("input");

// Sélectionner le parent
cy.get("label").parent();

// Sélection par contenu de texte
cy.contains("Soumettre");
```

### Assertions communes

```javascript
// Vérifier un texte
cy.get("h1").should("have.text", "Bienvenue");
cy.get("h1").should("contain", "Bienvenue");

// Vérifier une classe
cy.get("button").should("have.class", "active");

// Vérifier un attribut
cy.get("input").should("have.attr", "placeholder", "Email");

// Vérifier une propriété CSS
cy.get('p[id="validation-email"]').should(
  "have.css",
  "color",
  "rgb(255, 99, 71)"
); // tomato en RGB

// Vérifier la visibilité
cy.get(".message").should("be.visible");
cy.get(".message").should("not.be.visible");

// Vérifier l'existence
cy.get("#element").should("exist");
cy.get("#element").should("not.exist");

// Vérifier l'état désactivé
cy.get("button").should("be.disabled");

// Combinaison d'assertions
cy.get("input")
  .should("have.value", "test@exemple.com")
  .and("have.class", "valid");
```

## Interactions

### Actions basiques

```javascript
// Cliquer sur un élément
cy.get("button").click();

// Cliquer sur une position spécifique
cy.get("button").click("topRight");

// Double-cliquer
cy.get(".item").dblclick();

// Clic droit
cy.get(".context-menu").rightclick();

// Saisir du texte
cy.get('input[name="email"]').type("test@exemple.com");

// Effacer le contenu d'un champ
cy.get('input[name="email"]').clear();

// Cocher une case
cy.get('input[type="checkbox"]').check();

// Décocher une case
cy.get('input[type="checkbox"]').uncheck();

// Sélectionner une option dans un select
cy.get("select").select("option1");

// Soumettre un formulaire
cy.get("form").submit();

// Faire défiler jusqu'à un élément
cy.get("#section-bas").scrollIntoView();

// Hover (survol)
cy.get(".dropdown").trigger("mouseover");
```

### Options avancées

```javascript
// Taper du texte avec des événements spéciaux
cy.get("input").type("Texte{enter}"); // Appuyer sur Entrée
cy.get("input").type("Texte{backspace}"); // Effacer un caractère
cy.get("input").type("{ctrl+a}{del}"); // Tout sélectionner puis supprimer

// Focus sur un élément
cy.get("input").focus();

// Blur (perte de focus)
cy.get("input").blur();

// Drag and drop
cy.get("#element").drag("#destination");
```

## Requêtes et réseau

### Interception et stubbing

```javascript
// Intercepter une requête GET
cy.intercept("GET", "/api/users").as("getUsers");

// Vérifier que la requête a été faite
cy.wait("@getUsers");

// Intercepter et modifier la réponse
cy.intercept("GET", "/api/produits", {
  statusCode: 200,
  body: [
    { id: 1, nom: "Produit 1", prix: 10 },
    { id: 2, nom: "Produit 2", prix: 20 },
  ],
}).as("getProduits");

// Intercepter et ajouter un délai
cy.intercept("GET", "/api/lent", { delay: 2000 }).as("requeteLente");

// Intercepter et simuler une erreur
cy.intercept("POST", "/api/utilisateur", {
  statusCode: 500,
  body: { erreur: "Erreur serveur" },
}).as("erreurCreation");

// Intercepter avec une fonction dynamique
cy.intercept("GET", "/api/donnees", (req) => {
  req.reply((res) => {
    res.body.donnees = res.body.donnees.map((item) => {
      item.modifie = true;
      return item;
    });
  });
}).as("modifierDonnees");
```

### Requêtes API directes

```javascript
// Faire une requête GET
cy.request("GET", "https://api.exemple.com/users").then((response) => {
  expect(response.status).to.eq(200);
  expect(response.body).to.have.length(10);
});

// Requête POST avec données
cy.request({
  method: "POST",
  url: "https://api.exemple.com/login",
  body: {
    username: "utilisateur",
    password: "motdepasse",
  },
}).then((response) => {
  expect(response.status).to.eq(200);
  expect(response.body).to.have.property("token");
});
```

## Navigation et gestion de page

### Navigation

```javascript
// Visiter une URL
cy.visit("https://exemple.com");

// Visiter avec paramètres
cy.visit("https://exemple.com", {
  timeout: 30000, // attendre 30 secondes max
  failOnStatusCode: false, // ne pas échouer sur une erreur HTTP
});

// Recharger la page
cy.reload();

// Aller en arrière
cy.go("back");
// ou
cy.go(-1);

// Aller en avant
cy.go("forward");
// ou
cy.go(1);
```

### URL et location

```javascript
// Vérifier l'URL
cy.url().should("include", "/dashboard");

// Vérifier le chemin
cy.location("pathname").should("eq", "/login");

// Vérifier un paramètre d'URL
cy.location("search").should("include", "?id=123");
```

## Gestion du temps et attentes

### Attentes

```javascript
// Attendre un certain temps (à éviter si possible)
cy.wait(2000); // Attendre 2 secondes

// Attendre une requête réseau
cy.intercept("GET", "/api/data").as("getData");
cy.get("#bouton-charger").click();
cy.wait("@getData");

// Attendre avec timeout personnalisé
cy.get("#element-lent", { timeout: 10000 }).should("be.visible");

// Attente implicite (configuration globale)
// Dans cypress.json ou cypress.config.js
// {
//   "defaultCommandTimeout": 5000
// }
```

### Horloge et temps

```javascript
// Manipuler le temps pour les tests
cy.clock();

// Avancer le temps
cy.tick(1000); // Avance de 1 seconde

// Restaurer l'horloge
cy.clock().then((clock) => {
  // faire des actions
  clock.restore();
});
```

## Variables et Aliases

```javascript
// Créer un alias pour réutilisation
cy.get('input[name="email"]').as("emailInput");

// Utiliser un alias
cy.get("@emailInput").type("test@exemple.com");

// Stocker des valeurs dans des variables
cy.get(".total")
  .invoke("text")
  .then((text) => {
    const total = parseFloat(text.replace("€", ""));
    // Utiliser 'total' dans d'autres commandes
    cy.get(".taxe").should("contain", (total * 0.2).toFixed(2));
  });

// Alias pour des requêtes réseau
cy.intercept("GET", "/api/produits").as("produits");
cy.wait("@produits").then((interception) => {
  const nombreProduits = interception.response.body.length;
  cy.get(".produit-item").should("have.length", nombreProduits);
});
```

## Fixtures et données de test

```javascript
// Charger des données depuis un fichier fixture
cy.fixture("utilisateurs.json").then((utilisateurs) => {
  cy.get("#utilisateur").select(utilisateurs[0].nom);
});

// Utiliser une fixture pour intercepter une requête
cy.fixture("produits.json").then((produits) => {
  cy.intercept("GET", "/api/produits", produits).as("getProduits");
});

// Combiner plusieurs fixtures
cy.fixture("utilisateur.json").as("userData");
cy.fixture("preferences.json").as("prefsData");
cy.get("@userData").then((user) => {
  cy.get("@prefsData").then((prefs) => {
    const data = { ...user, preferences: prefs };
    // Utiliser les données combinées
  });
});
```

## Commandes personnalisées

```javascript
// Dans le fichier cypress/support/commands.js
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/dashboard");
});

// Utilisation dans les tests
cy.login("utilisateur@exemple.com", "motdepasse");
```

## Captures d'écran et vidéos

```javascript
// Prendre une capture d'écran
cy.screenshot();

// Capture d'écran d'un élément spécifique
cy.get("#formulaire").screenshot("formulaire-avant-soumission");

// Capture d'écran automatique sur échec (cypress.json)
// {
//   "screenshotOnFailure": true
// }
```

## Pour aller plus loin

### Documentation officielle

Pour une référence complète et à jour, consultez la documentation officielle de Cypress:
https://docs.cypress.io/

### Commandes utiles pour les tests plus avancés

- `cy.task()` - Exécute des tâches dans le processus Node
- `cy.readFile()` - Lit un fichier sur le système
- `cy.writeFile()` - Écrit dans un fichier
- `cy.exec()` - Exécute une commande système
- Utilisation de plugins pour étendre les fonctionnalités

Bonne chance pour votre évaluation demain!
