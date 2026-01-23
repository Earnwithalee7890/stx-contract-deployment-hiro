# Contributing Guidelines

## How to Contribute

1. Fork the repository
2. Create a feature branch
3. Write your contract following our standards
4. Test with Clarinet
5. Submit a pull request

## Contract Standards

### Naming Conventions
- Use kebab-case for file names: `my-contract.clar`
- Use snake_case for functions: `my_function`
- Use SCREAMING_SNAKE_CASE for constants: `MY_CONSTANT`

### Code Style
```clarity
;; Always include header comments
;; Contract Name
;; Brief description

(define-constant contract-owner tx-sender)
(define-constant err-not-authorized (err u1))

;; Use descriptive error codes
;; Group related functions together
```

### Testing
- All contracts must pass `clarinet check`
- Include read-only functions for state queries
- Test edge cases and error conditions

## Submission Checklist

- [ ] Contract passes `clarinet check`
- [ ] Includes header comments
- [ ] Error codes are documented
- [ ] Read-only functions included
- [ ] No unused code
