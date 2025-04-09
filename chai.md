# Référence rapide des tests Chai (JS)

## Syntaxe de base avec Chai (style BDD)

Chai permet d'utiliser différents styles : `should`, `expect`, ou `assert`. On se concentre ici sur `should` et `expect`.

### 1. Comparaisons de base

```js
m1.amount.should.equal(30.0); // strictement égal
expect(m1.amount).to.equal(30.0);

m1.amount.should.not.equal(25);
expect(m1.amount).to.not.equal(25);
```

### 2. Types

```js
(42).should.be.a("number");
"test".should.be.a("string");
expect([1, 2, 3]).to.be.an("array");
expect({}).to.be.an("object");
```

### 3. Truthiness

```js
true.should.be.true;
false.should.be.false;
expect(1).to.be.ok;
expect(null).to.not.be.ok;
```

### 4. Comparaisons numériques

```js
(10).should.be.above(5);
(10).should.be.below(20);
expect(5).to.be.at.least(5);
expect(3).to.be.below(10);
```

### 5. Chaînes de caractères

```js
"foobar".should.have.lengthOf(6);
expect("foobar").to.include("foo");
expect("foobar").to.match(/^foo/);
```

### 6. Tableaux et objets

```js
[1, 2, 3].should.include(2);
expect([1, 2, 3]).to.have.members([1, 2, 3]);
expect([1, 2, 3]).to.include.members([2, 3]);

const obj = { name: "John", age: 30 };
obj.should.have.property("name").equal("John");
expect(obj).to.have.property("age", 30);
```

### 7. Exceptions

```js
function badFn() {
  throw new Error("Oops!");
}
badFn.should.throw();
expect(badFn).to.throw("Oops!");
```

### 8. Profondeur (deep)

```js
expect({ a: 1 }).to.deep.equal({ a: 1 });
expect([{ id: 1 }]).to.deep.include({ id: 1 });
```

### 9. Négation

```js
expect(4).to.not.equal(5);
expect([1, 2]).to.not.include(3);
```

---

## Tips pour l'éval

- Utilise `.should` après avoir importé `chai` et appelé `chai.should();`
- Préfère `expect` si tu veux une syntaxe plus explicite et claire.
- N'oublie pas `.deep` quand tu compares des objets ou tableaux complexes.
- Bien lire le message d’erreur : il t’aide à corriger le test.

---

Bonne chance ! 💪
