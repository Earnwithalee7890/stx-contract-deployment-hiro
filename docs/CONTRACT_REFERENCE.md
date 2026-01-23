# Contract Reference Guide

## Data Types

### Primitive Types
- `uint` - Unsigned 128-bit integer
- `int` - Signed 128-bit integer
- `bool` - Boolean (true/false)
- `principal` - Stacks address

### String Types
- `(string-ascii N)` - ASCII string, max N bytes
- `(string-utf8 N)` - UTF-8 string, max N bytes
- `(buff N)` - Byte buffer, max N bytes

### Complex Types
- `(list N type)` - List of max N elements
- `(optional type)` - Optional value
- `(response ok-type err-type)` - Result type
- `(tuple (key value))` - Named tuple

## Common Patterns

### Error Handling

```clarity
(define-constant err-not-authorized (err u1))
(define-constant err-not-found (err u2))

(asserts! (is-eq tx-sender owner) err-not-authorized)
```

### Map Operations

```clarity
(define-map my-map principal uint)

;; Set
(map-set my-map tx-sender u100)

;; Get
(map-get? my-map tx-sender)

;; Delete
(map-delete my-map tx-sender)
```

### Read-Only Functions

```clarity
(define-read-only (get-balance (user principal))
    (default-to u0 (map-get? balances user))
)
```

### Public Functions

```clarity
(define-public (transfer (amount uint) (recipient principal))
    (begin
        ;; validation
        ;; state changes
        (ok true)
    )
)
```

## Best Practices

1. Always use `asserts!` for validation
2. Return `(ok value)` or `(err code)` from public functions
3. Use `let` for local variables
4. Prefer `match` over nested `if` statements
5. Keep functions focused and small
