/* istanbul ignore file */
import * as debug from 'debug'
import * as express from 'express'
import consent from './consent'
import data from './data'
import jwtSigner from './jwt-signer'
import jwtVerifier from './jwt-verifier'
import './loader'
import polishApi from './polish-api'
import { security } from './security'
import web from './web'
const trace = debug('aspsp-mock')
const port = process.env.LISTEN_PORT || 3000
const app = express()

app.use(security)
app.use('/api', consent)
app.use('/data', data)
app.use('/v2_1.1', jwtSigner)
app.use('/v2_1.1', jwtVerifier)
app.use(polishApi)
app.use(web)

app.listen(port, () => trace(`Statement service mock listening on port ${port}!`))
