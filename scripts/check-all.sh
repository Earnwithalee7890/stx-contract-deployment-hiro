#!/bin/bash

# Check all contracts for syntax errors
echo "Checking all contracts..."

fail_count=0

for contract in simple-contracts/*.clar; do
    name=$(basename "$contract")
    echo -n "Checking $name... "
    
    if clarinet check "$name" &> /dev/null; then
        echo "✓"
    else
        echo "✗ FAILED"
        ((fail_count++))
    fi
done

if [ $fail_count -eq 0 ]; then
    echo "All contracts passed!"
    exit 0
else
    echo "$fail_count contract(s) failed"
    exit 1
fi
