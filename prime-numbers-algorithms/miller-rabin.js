/*
A probabilistic algorithm for testing primality of a number. 
It repeatedly applies a test to a given number, each time with a different randomly chosen value, and returns either "definitely composite" or "probably prime".
*/

function isPrime(n, maxTests = 10) {
    if (n <= 1) {
        return false;
    }

    if (n === 2 || n === 3) {
        return true;
    }

    if (n % 2 === 0) {
        return false;
    }

    let d = n - 1;
    let s = 0;

    while (d % 2 === 0) {
        d /= 2;
        s++;
    }

    for (let i = 0; i < maxTests; i++) {
        const a = Math.floor(Math.random() * (n - 2)) + 2;
        let x = BigInt(Math.pow(a, d)) % BigInt(n);

        if (x === 1 || x === n - 1) {
            continue;
        }

        for (let j = 0; j < s - 1; j++) {
            x = (x * x) % n;

            if (x === n - 1) {
                break;
            }
        }

        if (x !== n - 1) {
            return false;
        }
    }

    return true;
}