import css from './less/style.less'
import el from './common/dom-el.js'
// plugin manager & menu
import pluginManager from './plugin-manager.js'
// plugins
import furnitureLibrary from './plugins/furniture-library.js'
//import googleBlocks from './plugins/google-blocks.js'

var PLUGINS = {
  // name
  furnitureLibrary: {
    // ui
    displayTitle: '🏠&nbsp;&nbsp;furniture library',
    // access
    module: furnitureLibrary
  }
  //googleBlocks: {
  //  displayTitle: '🥑&nbsp;&nbsp;google blocks',
  //  module: googleBlocks
  //}
}

var initialPluginName = null

function setInitialPlugin (name) {
  initialPluginName = name
}

// check dependencies
if (!window.AFRAME) {
  throw 'Error loading 3d.io Inspector Plugins: Missing dependency: "AFRAME"\n'+
  'Please add "<script src="https://aframe.io/releases/0.6.1/aframe.min.js"></script>" to "<head>" tag before loading 3d.io plugins.'+
  'Read more: https://aframe.io/docs/0.7.0/introduction/'
}
if (!window.io3d) {
  throw 'Error loading 3d.io Inspector Plugins: Missing dependency: "io3d"\n'+
  'Please add "<script src="https://dist.3d.io/3dio-js/1.x.x-beta/3dio.min.js"></script>" to "<head>" tag before loading 3d.io plugins.'+
  'Read more: https://3d.io/docs/api/1/get-started-browser.html'
}

// prevents 3dio lib from loading plugins (ie in dev mode)
  window.io3d.aFrame.pluginsLoaded = true

// add css to page
el('<style>', {media: 'screen', text: css}).appendTo(document.head)

// initializes launcher with plugins
pluginManager.setPlugins(PLUGINS)

// handle inspector events
if (AFRAME && AFRAME.INSPECTOR && AFRAME.INSPECTOR.opened) {
  // inspector opened: init immediately
  init()
} else {
  // initialize on inspector ready event
  window.addEventListener('inspector-loaded', init)
}

function init() {
  pluginManager.show()
  if (initialPluginName) pluginManager.showPlugin(initialPluginName)
}

// expose API

var io3dInspectorPlugins = {
  setInitialPlugin: setInitialPlugin
}

export default io3dInspectorPlugins