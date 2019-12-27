import LayoutAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'
import BreadCrumb from './common/bread-crumb'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import coverImg from './publish/cover-image'
import selectImg from './publish/select-images'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside)
    Vue.component('layout-header', LayoutHeader)
    Vue.component('bread-crumb', BreadCrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-img', coverImg)
    Vue.component('select-img', selectImg) // 注册全局的图片组件
  }
}
