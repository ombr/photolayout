(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["photolayout"] = factory();
	else
		root["photolayout"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _layout = __webpack_require__(8);

	var _layout2 = _interopRequireDefault(_layout);

	var _responsivelayout = __webpack_require__(12);

	var _responsivelayout2 = _interopRequireDefault(_responsivelayout);

	var _css = __webpack_require__(11);

	var _css2 = _interopRequireDefault(_css);

	var _configuration = __webpack_require__(10);

	var _configuration2 = _interopRequireDefault(_configuration);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	;
	var photolayout;

	photolayout = {
	  Layout: _layout2.default,
	  ResponsiveLayout: _responsivelayout2.default,
	  Configuration: _configuration2.default
	};

	exports.default = photolayout;

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _line = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./line.coffee\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _line2 = _interopRequireDefault(_line);

	var _configuration = __webpack_require__(10);

	var _configuration2 = _interopRequireDefault(_configuration);

	var _css = __webpack_require__(11);

	var _css2 = _interopRequireDefault(_css);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	;
	;

	var Layout;

	Layout = function () {
	  function Layout(config) {
	    if (config instanceof _configuration2.default) {
	      this._config = config;
	    } else {
	      this._config = new _configuration2.default(config);
	    }
	    console.log(this._config);
	    this._current_line = new _line2.default(this._config, this);
	    this._lines = [this._current_line];
	  }

	  Layout.prototype.add = function (object) {
	    var i, len, o;
	    if (object instanceof Array) {
	      for (i = 0, len = object.length; i < len; i++) {
	        o = object[i];
	        this.add(o);
	      }
	      return this;
	    }
	    if (this._current_line.accept(object)) {
	      this._current_line.add(object);
	    } else {
	      this._current_line = new _line2.default(this._config, this);
	      this._lines.push(this._current_line);
	      this._current_line.add(object);
	    }
	    return this;
	  };

	  Layout.prototype.getItems = function (start, end) {
	    var height, i, item, items, j, k, l, len, len1, len2, len3, line, offset_y, ref, ref1, ref2, ref3;
	    if (start == null) {
	      start = 0;
	    }
	    items = [];
	    offset_y = 0;
	    if (start === 0 && end == null) {
	      ref = this._lines;
	      for (i = 0, len = ref.length; i < len; i++) {
	        line = ref[i];
	        ref1 = line.getItems(offset_y);
	        for (j = 0, len1 = ref1.length; j < len1; j++) {
	          item = ref1[j];
	          items.push(item);
	        }
	        offset_y += item.h + this._config.margin();
	      }
	      return items;
	    }
	    raise('ERROR ');
	    ref2 = this._lines;
	    for (k = 0, len2 = ref2.length; k < len2; k++) {
	      line = ref2[k];
	      height = line.height();
	      if (offset_y < start) {
	        offset_y += height + this._config.margin();
	        continue;
	      }
	      ref3 = line.getItems(offset_y);
	      for (l = 0, len3 = ref3.length; l < len3; l++) {
	        item = ref3[l];
	        items.push(item);
	      }
	      offset_y += height + this._config.margin();
	      if (end != null && offset_y >= end) {
	        break;
	      }
	    }
	    return items;
	  };

	  Layout.prototype.height = function () {
	    var height, i, len, line, ref;
	    height = 0;
	    ref = this._lines;
	    for (i = 0, len = ref.length; i < len; i++) {
	      line = ref[i];
	      height += line.height();
	    }
	    height += (this._lines.length - 1) * this._config.margin();
	    return height;
	  };

	  Layout.prototype.min_max_line_ratio = function () {
	    var i, len, line, max, min, ref;
	    min = max = this._lines[0].ratio();
	    ref = this._lines;
	    for (i = 0, len = ref.length; i < len; i++) {
	      line = ref[i];
	      min = Math.min(line.ratio(), min);
	      max = Math.max(line.ratio(), max);
	    }
	    return [min, max];
	  };

	  Layout.prototype.css = function () {
	    return new _css2.default().add_rules(this._config.selector(), {
	      float: 'left',
	      margin: "0 " + this._config.margin() + "% " + this._config.margin() + "% 0"
	    }).add_block(this.css_for_items()).css();
	  };

	  Layout.prototype.css_for_items = function () {
	    var css, end_of_line_selectors, i, item, j, len, len1, line, line_selectors, ref, ref1, selector;
	    css = new _css2.default();
	    end_of_line_selectors = [];
	    ref = this._lines;
	    for (i = 0, len = ref.length; i < len; i++) {
	      line = ref[i];
	      line_selectors = [];
	      ref1 = line.getItems();
	      for (j = 0, len1 = ref1.length; j < len1; j++) {
	        item = ref1[j];
	        selector = this._config.selector() + item.o.id;
	        css.add_rules(selector, {
	          width: item.w + '%'
	        });
	        line_selectors.push(selector);
	      }
	      css.add_rules(line_selectors.join(','), {
	        'padding-top': line.height() + '%'
	      });
	      end_of_line_selectors.push(selector);
	    }
	    if (this._config.margin() > 0) {
	      css.add_rules(end_of_line_selectors.join(','), {
	        'margin-right': 0
	      });
	    }
	    return css.css();
	  };

	  return Layout;
	}();

	exports.default = Layout;
	;

/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Configuration;

	Configuration = function () {
	  function Configuration(_config) {
	    this._config = _config;
	  }

	  Configuration.prototype.zoom = function () {
	    return this._config.zoom || 1.0;
	  };

	  Configuration.prototype.line_height = function () {
	    if (this._config.line_height == null) {
	      return 200;
	    }
	    return this._config.line_height;
	  };

	  Configuration.prototype.margin = function () {
	    if (this._config.margin == null) {
	      return 5.0;
	    }
	    return this._config.margin * 1.0;
	  };

	  Configuration.prototype.tolerance = function () {
	    if (this._config.tolerance == null) {
	      return 0.3;
	    }
	    return this._config.tolerance * 1.0;
	  };

	  Configuration.prototype.max_width = function () {
	    if (this._config.max_width == null) {
	      return 2500;
	    }
	    return this._config.max_width * 1.0;
	  };

	  Configuration.prototype.min_width = function () {
	    if (this._config.min_width == null) {
	      return 200;
	    }
	    return this._config.max_width * 1.0;
	  };

	  Configuration.prototype.selector = function () {
	    return '.i';
	  };

	  Configuration.prototype.to_hash = function () {
	    return {
	      line_height: this.line_height(),
	      margin: this.margin(),
	      tolerance: this.tolerance(),
	      max_width: this.max_width(),
	      min_width: this.min_width(),
	      selector: this.selector()
	    };
	  };

	  Configuration.prototype.derivate = function (options) {
	    var hash, k, v;
	    hash = this.to_hash();
	    for (k in options) {
	      v = options[k];
	      hash[k] = v;
	    }
	    return new Configuration(hash);
	  };

	  return Configuration;
	}();

	exports.default = Configuration;
	;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Css;

	Css = function () {
	  function Css() {
	    this._css = '';
	  }

	  Css.prototype.add_block = function (css, wrapper) {
	    if (wrapper != null) {
	      this._css += wrapper + "{" + css + "}";
	    } else {
	      this._css += css;
	    }
	    return this;
	  };

	  Css.prototype.add_rules = function (selector, rules) {
	    var css, property, value;
	    css = '';
	    for (property in rules) {
	      value = rules[property];
	      css += property + ":" + value + ";";
	    }
	    this.add_block(css, selector);
	    return this;
	  };

	  Css.prototype.css = function () {
	    return this._css;
	  };

	  return Css;
	}();

	exports.default = Css;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _layout = __webpack_require__(8);

	var _layout2 = _interopRequireDefault(_layout);

	var _css = __webpack_require__(11);

	var _css2 = _interopRequireDefault(_css);

	var _configuration = __webpack_require__(10);

	var _configuration2 = _interopRequireDefault(_configuration);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	;
	var ResponsiveLayout;

	ResponsiveLayout = function () {
	  function ResponsiveLayout(config) {
	    if (config instanceof _configuration2.default) {
	      this._config = config;
	    } else {
	      this._config = new _configuration2.default(config);
	    }
	    this._photos = [];
	    this._layouts = void 0;
	  }

	  ResponsiveLayout.prototype.getLayouts = function () {
	    var layout, max, min, ref, tolerance, width;
	    if (this._layouts != null) {
	      return this._layouts;
	    }
	    this._layouts = {};
	    width = this._config.max_width();
	    while (width > this._config.min_width()) {
	      console.log(this._config.to_hash());
	      console.log(this._config.derivate({
	        zoom: 100
	      }).to_hash());
	      layout = new _layout2.default(this._config.derivate({
	        zoom: this._config.line_height() / width,
	        margin: this._config.margin() / width * 100
	      }));
	      layout.add(this._photos);
	      this._layouts[width] = layout;
	      ref = layout.min_max_line_ratio(), min = ref[0], max = ref[1];
	      tolerance = width - width * this._config.tolerance();
	      width -= Math.round(tolerance / min);
	    }
	    return this._layouts;
	  };

	  ResponsiveLayout.prototype.add = function (photo) {
	    var i, len, p;
	    if (photo instanceof Array) {
	      for (i = 0, len = photo.length; i < len; i++) {
	        p = photo[i];
	        this.add(p);
	      }
	      return this;
	    }
	    this._photos.push(photo);
	    this._layouts = void 0;
	    return this;
	  };

	  ResponsiveLayout.prototype.layout_for = function (width) {
	    return layout;
	  };

	  ResponsiveLayout.prototype.breakpoints = function () {
	    return Object.keys(this.getLayouts()).sort(function (a, b) {
	      return b - a;
	    });
	  };

	  ResponsiveLayout.prototype.css = function () {
	    var css, i, len, ref, width;
	    css = new _css2.default();
	    ref = this.breakpoints();
	    for (i = 0, len = ref.length; i < len; i++) {
	      width = ref[i];
	      css.add_block(this._layouts[width].css(), "@media (max-width: " + width + "px)");
	    }
	    return css.css();
	  };

	  return ResponsiveLayout;
	}();

	exports.default = ResponsiveLayout;

/***/ }
/******/ ])
});
;