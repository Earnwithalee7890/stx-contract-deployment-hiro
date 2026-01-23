# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it to us privately:

1. **DO NOT** open a public GitHub issue
2. Email: security@example.com
3. Include detailed description and steps to reproduce
4. Wait for confirmation before public disclosure

## Security Best Practices

### For Contract Developers

1. **Access Control**: Always verify `tx-sender` permissions
2. **Input Validation**: Validate all user inputs
3. **Reentrancy**: Use checks-effects-interactions pattern
4. **Integer Overflow**: Use safe math operations
5. **Testing**: Thoroughly test all edge cases

### Common Vulnerabilities

- Unprotected admin functions
- Missing input validation
- Unchecked arithmetic operations
- Improper error handling

## Audit Status

These contracts are provided as-is. Always conduct your own security audit before deploying to mainnet with real funds.
