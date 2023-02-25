/*
Sieve of Eratosthenes is a simple algorithm for finding all prime numbers up to a given limit.
It works by iteratively marking as composite (i.e., not prime) the multiples of each prime, starting with the multiples of 2.
*/

function sieveOfEratosthenes(n) {
    const primes = new Array(n + 1).fill(true);
    primes[0] = false;
    primes[1] = false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (primes[i]) {
            for (let j = i * i; j <= n; j += i) {
                primes[j] = false;
            }
        }
    }
    return primes.reduce((acc, val, index) => {
        if (val) {
            acc.push(index);
        }
        return acc;
    }, []);
}