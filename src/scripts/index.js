import 'tachyons'
import '../style/index.css'
import domready from 'domready'
import framework from './framework'
import app from './app'

domready(framework(app()))
