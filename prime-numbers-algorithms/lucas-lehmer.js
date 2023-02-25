/*
Lucas-Lehmer is a primality test for Mersenne numbers. 
It works by generating a sequence of numbers and checking if a certain property holds for the last number. 
If the property holds, then the Mersenne number is prime.
*/

function isMersennePrime(p) {
    if (p <= 2) {
        return false;
    }

    let s = 4n;
    const m = (1n << BigInt(p)) - 1n;

    for (let i = 3; i <= p; i++) {
        s = (s ** 2n - 2n) % m;
    }

    return s === 0n;
}