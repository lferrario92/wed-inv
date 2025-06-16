import { library } from '@fortawesome/fontawesome-svg-core'
import { faGift } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  install(app) {
    // Add icons to the library
    library.add(faGift)
    
    // Register the FontAwesomeIcon component globally
    app.component('font-awesome-icon', FontAwesomeIcon)
  }
}
