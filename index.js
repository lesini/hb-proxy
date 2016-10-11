const koa = require('koa')
const chalk = require('chalk')
const proxy = require('koa-proxy')
const config = require('./config')

const app = koa()
const port = process.argv[2] || 8888

app.use(function *(next){
    let origin = this.headers.origin || this.origin
    yield next
    this.set('Access-Control-Allow-Credentials', true)
    this.set('Access-Control-Allow-Origin', origin)
})

app.use(proxy(config.proxyConfig))

app.listen(port, (err) => {
    if (err) {
        console.log(err)
        return
    }

    console.log(chalk.blue(' # Access URLs:'))
    console.log(chalk.gray(' ----------------------------------------'))
    console.log('     Local: ' + chalk.green('http://localhost:' + port))
    console.log(chalk.gray(' ----------------------------------------'))
    console.log('')
})
