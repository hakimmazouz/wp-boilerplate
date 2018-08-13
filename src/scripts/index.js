import '../style/theme.css'
import 'tachyons'
import '../style/index.css'
import domready from 'domready'
import Framework from './framework'
import App from './components/App'

if (process.env.NODE_ENV !== 'production') {
  require('./util/stats')()
}

domready(() => new Framework(App))
