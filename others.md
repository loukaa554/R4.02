# Guide complet des tests avec Chai, Mocha et Assert

## Mocha - Framework de test

### Structure de base

```javascript
// Groupe de tests
describe("Module Utilisateur", function () {
  // Test individuel
  it("devrait créer un utilisateur avec un nom", function () {
    // Votre test ici
  });

  // Autre test individuel
  it("devrait refuser un utilisateur sans email", function () {
    // Votre test ici
  });
});

// Tests imbriqués
describe("Service Authentification", function () {
  describe("Fonction login", function () {
    it("devrait connecter un utilisateur valide", function () {
      // Test ici
    });
  });
});
```

### Hooks Mocha

```javascript
describe("Base de données", function () {
  // Exécuté une fois avant tous les tests du bloc
  before(function () {
    // Configuration: connexion à la DB, initialisation des données
  });

  // Exécuté avant chaque test
  beforeEach(function () {
    // Réinitialiser un état, créer des données de test
  });

  it("devrait insérer un enregistrement", function () {
    // Test ici
  });

  // Exécuté après chaque test
  afterEach(function () {
    // Nettoyer après un test
  });

  // Exécuté une fois après tous les tests du bloc
  after(function () {
    // Fermer les connexions, nettoyer les ressources
  });
});
```

### Tests asynchrones

```javascript
// Avec callback
it("devrait charger des données de façon asynchrone", function (done) {
  fetchData(function (err, data) {
    if (err) return done(err);
    // Assertions
    done();
  });
});

// Avec promesses
it("devrait résoudre la promesse", function () {
  return getDataPromise().then(function (data) {
    // Assertions
  });
});

// Avec async/await
it("devrait attendre la résolution async", async function () {
  const data = await getDataAsync();
  // Assertions
});
```

### Options de tests

```javascript
// Test exclusif (seul ce test sera exécuté)
it.only("devrait être le seul test exécuté", function () {
  // Test ici
});

// Test à ignorer
it.skip("devrait être ignoré", function () {
  // Ce test ne sera pas exécuté
});

// Tests temporisés
it("devrait finir dans un délai spécifié", function (done) {
  this.timeout(5000); // 5 secondes
  // Test long ici
  setTimeout(done, 3000);
});
```

## Chai - Bibliothèque d'assertions

### Styles d'assertions

```javascript
// Style "assert"
const assert = require("chai").assert;
assert.equal(valeur, attendu, "message optionnel");

// Style "expect"
const expect = require("chai").expect;
expect(valeur).to.equal(attendu);

// Style "should" (nécessite une configuration)
const should = require("chai").should();
valeur.should.equal(attendu);
```

### Assertions de base

```javascript
// Égalité
assert.equal(3 + 1, 4, "3 + 1 devrait être 4");
expect(3 + 1).to.equal(4);
(3 + 1).should.equal(4);

// Égalité stricte
assert.strictEqual(true, true);
expect(true).to.be.true;
true.should.be.true;

// Inégalité
assert.notEqual(3, 4);
expect(3).to.not.equal(4);
(3).should.not.equal(4);

// Vérifier le type
assert.typeOf("test", "string");
expect("test").to.be.a("string");
"test".should.be.a("string");
```

### Assertions sur les objets et tableaux

```javascript
// Vérifier les propriétés d'un objet
const user = { name: "Pierre", age: 30 };

assert.property(user, "name");
expect(user).to.have.property("name");
user.should.have.property("name");

// Vérifier la valeur d'une propriété
assert.propertyVal(user, "name", "Pierre");
expect(user).to.have.property("name", "Pierre");
user.should.have.property("name", "Pierre");

// Vérifier l'existence de plusieurs propriétés
assert.hasAllKeys(user, ["name", "age"]);
expect(user).to.have.all.keys("name", "age");
user.should.have.all.keys("name", "age");

// Vérifier un tableau
const array = [1, 2, 3];

assert.isArray(array);
expect(array).to.be.an("array");
array.should.be.an("array");

// Vérifier la longueur d'un tableau
assert.lengthOf(array, 3);
expect(array).to.have.lengthOf(3);
array.should.have.lengthOf(3);

// Vérifier l'inclusion dans un tableau
assert.include(array, 2);
expect(array).to.include(2);
array.should.include(2);

// Vérifier un sous-ensemble
assert.includeMembers([1, 2, 3], [2, 3]);
expect([1, 2, 3]).to.include.members([2, 3]);
[1, 2, 3].should.include.members([2, 3]);
```

### Assertions sur les chaînes de caractères

```javascript
const str = "test de chaîne";

// Vérifier une inclusion
assert.include(str, "test");
expect(str).to.include("test");
str.should.include("test");

// Vérifier le début d'une chaîne
assert.match(str, /^test/);
expect(str).to.match(/^test/);
str.should.match(/^test/);

// Longueur d'une chaîne
assert.lengthOf(str, 14);
expect(str).to.have.lengthOf(14);
str.should.have.lengthOf(14);
```

### Assertions sur les nombres

```javascript
// Comparaisons numériques
assert.isAbove(5, 2);
expect(5).to.be.above(2);
(5).should.be.above(2);

assert.isBelow(2, 5);
expect(2).to.be.below(5);
(2).should.be.below(5);

assert.approximately(1.5, 1.4, 0.2);
expect(1.5).to.be.approximately(1.4, 0.2);
(1.5).should.be.approximately(1.4, 0.2);
```

### Assertions sur les exceptions

```javascript
// Fonction qui devrait lancer une erreur
function erreurFonction() {
  throw new Error("Message d'erreur");
}

// Vérifier qu'une exception est lancée
assert.throws(erreurFonction);
expect(erreurFonction).to.throw();
erreurFonction.should.throw();

// Vérifier le message d'erreur
assert.throws(erreurFonction, "Message d'erreur");
expect(erreurFonction).to.throw("Message d'erreur");
erreurFonction.should.throw("Message d'erreur");

// Vérifier le type d'erreur
assert.throws(erreurFonction, Error);
expect(erreurFonction).to.throw(Error);
erreurFonction.should.throw(Error);
```

## Node.js Assert - Module d'assertions natif

```javascript
const assert = require("assert");

// Égalité (==)
assert.equal(3, "3"); // Passe

// Égalité stricte (===)
assert.strictEqual(3, 3); // Passe
assert.strictEqual(3, "3"); // Échoue

// Inégalité
assert.notEqual(3, 4);
assert.notStrictEqual(3, "3");

// Assertions sur les objets
assert.deepEqual({ a: 1 }, { a: 1 }); // Égalité de structure
assert.deepStrictEqual({ a: 1 }, { a: 1 }); // Égalité stricte de structure

// Vérification de valeur
assert.ok(true); // Vérifie si la valeur est truthy
assert.ok(1);
assert.ok("texte");

// Test d'échec planifié
assert.fail("Message d'échec");

// Vérifier qu'une exception est lancée
assert.throws(() => {
  throw new Error("erreur");
}, /erreur/);

// Vérifier qu'aucune exception n'est lancée
assert.doesNotThrow(() => {
  // code qui ne devrait pas lancer d'erreur
});
```

## Exemples pratiques

### Test d'une fonction simple

```javascript
// Fonction à tester
function additionner(a, b) {
  return a + b;
}

// Test avec Mocha et Chai
describe("Fonction additionner", function () {
  it("devrait additionner deux nombres positifs", function () {
    expect(additionner(2, 3)).to.equal(5);
  });

  it("devrait fonctionner avec un nombre négatif", function () {
    expect(additionner(5, -2)).to.equal(3);
  });

  it("devrait concaténer des chaînes", function () {
    expect(additionner("hello ", "world")).to.equal("hello world");
  });
});
```

### Test d'une API asynchrone

```javascript
// Service à tester
const userService = {
  getUser: async function (id) {
    // Simulation d'un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: id, name: "Utilisateur " + id });
      }, 100);
    });
  },
};

// Test avec Mocha et Chai
describe("Service utilisateur", function () {
  it("devrait récupérer les informations d'un utilisateur", async function () {
    const user = await userService.getUser(1);

    expect(user).to.be.an("object");
    expect(user).to.have.property("id", 1);
    expect(user).to.have.property("name", "Utilisateur 1");
  });
});
```

### Test avec hooks et fixtures

```javascript
describe("Base de données utilisateurs", function () {
  let db;
  const testUsers = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];

  // Avant tous les tests
  before(async function () {
    // Connexion à la base de données de test
    db = await connectToTestDB();
  });

  // Avant chaque test
  beforeEach(async function () {
    // Effacer et réinitialiser les données
    await db.clear("users");
    await db.insert("users", testUsers);
  });

  it("devrait trouver un utilisateur par son id", async function () {
    const user = await db.findById("users", 1);
    expect(user).to.deep.equal({ id: 1, name: "Alice" });
  });

  it("devrait ajouter un nouvel utilisateur", async function () {
    const newUser = { id: 3, name: "Charlie" };
    await db.insert("users", newUser);

    const users = await db.findAll("users");
    expect(users).to.have.lengthOf(3);
    expect(users[2]).to.deep.equal(newUser);
  });

  // Après tous les tests
  after(async function () {
    // Fermer la connexion
    await db.close();
  });
});
```

### Test d'intégration avec stubs

```javascript
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

// Service avec dépendance externe
const emailService = {
  sendEmail: function (to, subject, body) {
    // Logique d'envoi d'email
    return true;
  },
};

const userNotifier = {
  notifyUser: function (userId, message) {
    // Récupération de l'email (simulation)
    const userEmail = "user" + userId + "@example.com";

    // Utilisation du service d'email
    return emailService.sendEmail(userEmail, "Notification", message);
  },
};

describe("Service de notification", function () {
  let emailStub;

  beforeEach(function () {
    // Créer un stub pour la méthode sendEmail
    emailStub = sinon.stub(emailService, "sendEmail");
    emailStub.returns(true);
  });

  afterEach(function () {
    // Restaurer la méthode originale
    emailStub.restore();
  });

  it("devrait envoyer un email à l'utilisateur", function () {
    const result = userNotifier.notifyUser(123, "Hello!");

    expect(result).to.be.true;
    expect(emailStub.calledOnce).to.be.true;
    expect(
      emailStub.calledWith("user123@example.com", "Notification", "Hello!")
    ).to.be.true;
  });
});
```

## Configuration avancée

### Configuration de Mocha (fichier .mocharc.js ou .mocharc.json)

```javascript
module.exports = {
  // Spécifier le motif de fichiers de test
  spec: "test/**/*.spec.js",

  // Fichiers à charger avant les tests
  require: ["./test/setup.js"],

  // Timeout par défaut (en ms)
  timeout: 5000,

  // Reporter (formatage des résultats)
  reporter: "spec",

  // Mode watch (relancer les tests quand les fichiers changent)
  watch: false,

  // Afficher les tests lents
  slow: 75,

  // Arrêter après le premier échec
  bail: false,
};
```

### Configuration de Chai

```javascript
// Dans votre fichier de configuration de test
const chai = require("chai");

// Activer le style .should()
chai.should();

// Configurer les plugins
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

// Configurer les assertions profondes
chai.config.truncateThreshold = 0; // Afficher les objets complets

// Personnaliser les messages d'erreur
chai.config.includeStack = true; // Inclure la stack trace
```

## Ressources officielles

- [Documentation Mocha](https://mochajs.org/)
- [Documentation Chai](https://www.chaijs.com/)
- [Documentation Node.js Assert](https://nodejs.org/api/assert.html)

Bonne chance pour votre évaluation!
