import store from '../redux/store/index'
import { addSem, remSem } from '../redux/actions/index'

window.store = store
window.addSem = addSem
window.remSem = remSem