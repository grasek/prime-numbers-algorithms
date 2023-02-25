/*
An algorithm that is deterministic and has a guaranteed success rate of determining the primality of a number. 
It uses elliptic curves and works by trying to find a counterexample to the primality of the number being tested.
*/

// - big-integer: https://github.com/peterolson/BigInteger.js/
// - elliptic: https://github.com/indutny/elliptic

function isPrime(n, maxTests) {
    if (n <= 1) {
        return false;
    }
    for (let i = 2; i * i <= n; i++) {
        let x = Math.round(Math.pow(n, 1 / i));
        if (BigInteger(x).pow(i).equals(n)) {
            return false;
        }
    }
    let p, mec;
    do {
        let x = BigInteger.randBetween(1, n.subtract(1));
        let y = ec.curve.pointFromX(x.toJSNumber());
        p = {
            x: y.getX(),
            y: y.getY()
        };
    } while (!p.x || !p.y);
    mec = ec.curve.order;
    let q = {
        x: p.x,
        y: p.y
    };
    for (let i = 1; i <= maxTests; i++) {
        p = ec.curve.g.mul(1 << (i - 1)).mul(p).mod(ec.curve.n);
        q = ec.curve.g.mul(1 << (i - 1)).mul(q).mod(ec.curve.n);
        if (q.isInfinity() || !q.mul(2 ** (i - 1)).eq(ec.curve.pointAtInfinity)) {
            return false;
        }
        let temp = ec.curve.n.subtract(mec).add(1);
        let g = BigInteger(temp).gcd(n);
        if (g.compareTo(BigInteger.ONE) > 0 && g.compareTo(n) < 0) {
            return false;
        }
    }
    return true;
}