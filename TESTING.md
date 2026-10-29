# Testing Index

The testing approach is risk-based: protect business rules and lifecycle edges first.

## Start here

- [Testing Strategy](docs/16-testing-strategy.md)
- [Testing Matrix](examples/testing-matrix.md)
- [Reference Model](reference-model/README.md)

## Run

```bash
npm test
```

For all repository checks:

```bash
npm run check
```

The runnable reference tests deliberately avoid third-party test dependencies. They are executable explanations of domain behavior, not copied production tests.
