# Queries Libraries

This folder holds example queries for each language.  
Each language folder (Ex: /cpp) contains multiple .json files, each file must comply to properties format below.

## Queries Properties

<details>
    <summary>id</summary>

- Type: string
- Example value: `array-access`
- Pattern: `/^[a-zA-Z0-9\-]+/$`
</details>

<details>
    <summary>name</summary>

- Type: string
- Example value: `Array Access`
</details>

<details>
    <summary>language</summary>

- Type: string
- Accepted value: `go`, `javascript`, `java`, `python`, `cpp`, `csharp`, `ruby`
</details>

<details>
    <summary>description</summary>

- Type: string
- Example value: `Finds array access expressions with an index expression consisting of a postfix increment (`++`) expression.`
</details>

<details>
    <summary>tags</summary>
    
- Type: array of strings
- Example value: `['javascript', 'basic', 'pattern']`
</details>

<details>
    <summary>author</summary>

- Type: string
- Example value: `LGTM`
- Pattern: `/[a-zA-Z0-9\-]+/`
</details>

<details>
    <summary>authorURL</summary>

- Type: string
- Example value: `https://lgtm.com/query/lang:java/`
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

<details>
    <summary>complexity</summary>

- Type: string
- Accepted value: 'basic', 'advanced', 'expert'
</details>
