# Référence rapide des tests Mocha

Mocha est un framework de test populaire pour Node.js. Il fonctionne bien avec Chai ou d'autres bibliothèques d'assertion.

## Structure de base d'un test Mocha

### 1. Fonctionnalité `describe` et `it`

Mocha utilise `describe` pour regrouper des tests et `it` pour définir un test individuel.

```js
const assert = require("assert");
describe("Test de la fonction addition", function () {
  it("devrait additionner correctement deux nombres", function () {
    assert.strictEqual(1 + 1, 2);
  });
});
```

### 2. Hook `before`, `beforeEach`, `after`, `afterEach`

Les hooks permettent de configurer ou nettoyer des préconditions avant ou après les tests.

```js
let count = 0;

before(function () {
  // exécuté avant tout le test suite
  count = 1;
});

beforeEach(function () {
  // exécuté avant chaque test
  count += 1;
});

afterEach(function () {
  // exécuté après chaque test
  count -= 1;
});

after(function () {
  // exécuté après tout le test suite
  console.log("Test terminé");
});

describe("Test de count", function () {
  it("devrait commencer à 1", function () {
    assert.strictEqual(count, 1);
  });
  it("devrait augmenter avec beforeEach", function () {
    assert.strictEqual(count, 2);
  });
});
```

### 3. Test asynchrone

Mocha permet de gérer les tests asynchrones en utilisant soit des callbacks, soit des promesses.

#### a. Callbacks

```js
it("devrait récupérer des données", function (done) {
  setTimeout(function () {
    assert.strictEqual(1 + 1, 2);
    done(); // appeler done() pour signaler la fin du test
  }, 1000);
});
```

#### b. Promesses

```js
it("devrait récupérer des données avec promesse", function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      assert.strictEqual(1 + 1, 2);
      resolve();
    }, 1000);
  });
});
```

### 4. Test avec Chai

Il est courant d’utiliser Mocha avec Chai pour les assertions.

```js
const chai = require("chai");
const expect = chai.expect;
describe("Test avec Chai", function () {
  it("devrait additionner correctement deux nombres", function () {
    expect(1 + 1).to.equal(2);
  });
});
```

### 5. Ignorer et désactiver des tests

Mocha permet d’ignorer certains tests en utilisant `.skip`.

```js
describe("Tests de multiplication", function () {
  it.skip("ne devrait pas échouer", function () {
    assert.strictEqual(2 * 2, 5);
  });
});
```

### 6. Timeout des tests

Mocha permet de définir un temps limite pour un test avec le paramètre `timeout`.

```js
it("devrait réussir dans un délai raisonnable", function (done) {
  setTimeout(function () {
    assert.strictEqual(1 + 1, 2);
    done();
  }, 500);
}).timeout(1000); // Timeout après 1 seconde
```

---

## Tips pour l'éval

- Organise tes tests avec `describe` pour grouper par fonctionnalité.
- Utilise `before` et `after` pour initialiser et nettoyer les données si nécessaire.
- Pour les tests asynchrones, n’oublie pas de gérer correctement les promesses ou d’appeler `done()` dans les callbacks.

---

Bonne chance pour ton éval ! 💪
