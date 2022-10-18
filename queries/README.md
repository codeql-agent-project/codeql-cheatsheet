# Query

This folder holds example queries for each language.

## Properties

<details>
    <summary>id</summary>

- Type: string
- Example value: `array-access`
- Pattern: `/[a-zA-Z0-9\-]+/`
</details>

<details>
    <summary>name</summary>

- Type: string
- Example value: `Array Access`
- Pattern: `/.+/`
</details>

<details>
    <summary>description</summary>

- Type: string
- Example value: `Finds array access expressions with an index expression consisting of a postfix increment (`++`) expression.`
</details>

<details>
    <summary>author</summary>

- Type: string
- Example value: `LGTM`
</details>

<details>
    <summary>code</summary>

- Type: string
- Example value:
  ```codeql
    import cpp
    from ArrayExpr a
    where a.getArrayOffset() instanceof PostfixIncrExpr
    select a
  ```
</details>