import './e'

/**
 * @implements {Rectngl}
 */
class Rectangle {
  constructor(w, h) {
    this.w = w
    this.h = h
  }
  nonconstructor(s, t) {
    return ( s * t )
  }
}

/**
 * @implements {Rectngl}
 */
class Square extends Rectangle {
  constructor(s) {
    super(s, s)
  }
  /**
   * @param {string} s
   */
  nonconstructor(s) {
    return ( s * s )
  }
}

const rec = new Rectangle(3, 4)
const sqr = new Square(3)

console.log(rec.nonconstructor(3, 4))
console.log(sqr.nonconstructor(3))