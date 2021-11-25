const app = require('express')()
const { serve, setup } = require('swagger-ui-express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const endpoints = require('./endpoints')
const output = require('./swagger_output.json')

app.listen(port = process.env.PORT || 3000, () => {
    console.log(`Welcome to Crypto Coin Easy API! http://localhost:${port}`)
})
app.use(helmet())
app.use(cors())
app.use(morgan('combined'))
app.use('/doc', serve, setup(output))

endpoints(app)