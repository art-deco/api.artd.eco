import { readFileSync } from 'fs'
import dropcss from 'dropcss'

const html = readFileSync('drop/index.html', 'utf8')
const css = readFileSync('drop/bootstrap.css', 'utf8')

const res = dropcss({
  html, css
})

console.log(res.css)