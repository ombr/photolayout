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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _layout = __webpack_require__(8);

	var _layout2 = _interopRequireDefault(_layout);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ResponsiveLayout;

	ResponsiveLayout = function () {
	  function ResponsiveLayout(_options) {
	    var base;
	    this._options = _options != null ? _options : {};
	    (base = this._options).line_height || (base.line_height = 200);
	    if (!this._options.margin) {
	      this._options.margin = 5;
	    }
	    if (!this._options.max_width) {
	      this._options.max_width = 2000;
	    }
	    if (!this._options.min_width) {
	      this._options.min_width = 100;
	    }
	    if (!this._options.tolerance) {
	      this._options.tolerance = 50;
	    }
	    this._photos = [];
	  }

	  ResponsiveLayout.prototype.add = function (photo) {
	    var j, len, p;
	    if (photo instanceof Array) {
	      for (j = 0, len = photo.length; j < len; j++) {
	        p = photo[j];
	        this.add(p);
	      }
	      return this;
	    }
	    this._photos.push(photo);
	    return this;
	  };

	  ResponsiveLayout.prototype.layout_for = function (width) {
	    var layout;
	    layout = new _layout2.default(this._options.line_height / width, this._options.margin / width * 100);
	    layout.add(this._photos);
	    return layout;
	  };

	  ResponsiveLayout.prototype.breakpoints = function () {
	    if (this._breakpoints != null) {
	      return this._breakpoints;
	    }
	    this.css();
	    return this._breakpoints;
	  };

	  ResponsiveLayout.prototype.css = function () {
	    var css, i, layout, width;
	    width = this._options.max_width;
	    css = '';
	    i = 0;
	    this._breakpoints = [];
	    while (width > this._options.min_width) {
	      this._breakpoints.push(width);
	      layout = this.layout_for(width);
	      css += "@media (max-width: " + Math.round(width) + "px){\n" + layout.css() + "}\n";
	      i += 1;
	      if (i > 50) {
	        break;
	      }
	      width -= this._options.tolerance * layout.min_line_ratio();
	    }
	    return css;
	  };

	  return ResponsiveLayout;
	}();

	exports.default = ResponsiveLayout;

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _line = __webpack_require__(9);

	var _line2 = _interopRequireDefault(_line);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	;
	var Layout;

	Layout = function () {
	  function Layout(_zoom, _margin, _selector) {
	    this._zoom = _zoom;
	    this._margin = _margin != null ? _margin : 0.0;
	    this._selector = _selector != null ? _selector : '.i';
	    this._margin = this._margin * 1.0;
	    this._current_line = new _line2.default(this);
	    this._lines = [this._current_line];
	  }

	  Layout.prototype.min_line_ratio = function () {
	    var i, len, line, ratio, ref;
	    ratio = this._lines[0].ratio();
	    ref = this._lines;
	    for (i = 0, len = ref.length; i < len; i++) {
	      line = ref[i];
	      ratio = Math.min(line.ratio(), ratio);
	    }
	    return ratio;
	  };

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
	      this._current_line = new _line2.default(this);
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
	        offset_y += item.h + this._margin;
	      }
	      return items;
	    }
	    raise('ERROR ');
	    ref2 = this._lines;
	    for (k = 0, len2 = ref2.length; k < len2; k++) {
	      line = ref2[k];
	      height = line.height();
	      if (offset_y < start) {
	        offset_y += height + this._margin;
	        continue;
	      }
	      ref3 = line.getItems(offset_y);
	      for (l = 0, len3 = ref3.length; l < len3; l++) {
	        item = ref3[l];
	        items.push(item);
	      }
	      offset_y += height + this._margin;
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
	    height += (this._lines.length - 1) * this._margin;
	    return height;
	  };

	  Layout.prototype.css = function () {
	    return this._selector + "{float: left; margin: 0 " + this._margin + "% " + this._margin + "% 0; }\n" + this.css_for_items() + ".layout-container{ padding-bottom: " + this.height() + "% }";
	  };

	  Layout.prototype.css_for_items = function () {
	    var css, end_of_line_selectors, i, item, items, j, last, len, len1, line, ref, ref1;
	    css = '';
	    items = this.getItems();
	    for (i = 0, len = items.length; i < len; i++) {
	      item = items[i];
	      css += "" + this._selector + item.o.id + "{top: " + item.offset_y + "%; left: " + item.offset_x + "%;width: " + item.w + "%; padding-top: " + item.h + "%;}\n";
	    }
	    end_of_line_selectors = [];
	    ref = this._lines;
	    for (j = 0, len1 = ref.length; j < len1; j++) {
	      line = ref[j];
	      ref1 = line._objects, last = ref1[ref1.length - 1];
	      end_of_line_selectors.push("" + this._selector + last.id);
	    }
	    css += end_of_line_selectors.join(', ') + "{ margin-right: 0; }\n";
	    return css;
	  };

	  return Layout;
	}();

	exports.default = Layout;
	;

/***/ },

/***/ 9:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Line;

	Line = function () {
	  function Line(_layout) {
	    this._layout = _layout;
	    this._objects = [];
	    this._objects_ratio = 0;
	  }

	  Line.prototype.accept = function (object) {
	    if (this._objects.length === 0) {
	      return true;
	    }
	    if (1 / this.calculate_ratio_with(object) > this._layout._zoom) {
	      return true;
	    }
	    return false;
	  };

	  Line.prototype.ratio = function () {
	    if (Math.abs(this._objects_ratio - 1 / this._layout._zoom) / this._objects_ratio > 1) {
	      return 1 / this._layout._zoom;
	    } else {
	      return this._objects_ratio;
	    }
	  };

	  Line.prototype.height = function () {
	    if (this._objects.length === 0) {
	      return 0;
	    }
	    return 100.0 / this.ratio();
	  };

	  Line.prototype.add = function (object) {
	    if (this._objects.length === 0) {
	      this._objects_ratio = this.object_ratio(object);
	    } else {
	      this._objects_ratio += this.object_ratio(object);
	    }
	    return this._objects.push(object);
	  };

	  Line.prototype.getItems = function (offset_y) {
	    var i, items, len, line_height, line_width, object, object_ratio, offset_x, ratio, ref, width;
	    if (this._objects.length === 0) {
	      return [];
	    }
	    items = [];
	    offset_x = 0;
	    line_width = 100.0 - (this._objects.length - 1) * this._layout._margin;
	    ratio = this.ratio();
	    line_height = line_width / ratio;
	    ref = this._objects;
	    for (i = 0, len = ref.length; i < len; i++) {
	      object = ref[i];
	      object_ratio = this.object_ratio(object);
	      width = line_height * object_ratio;
	      items.push({
	        o: object,
	        w: width,
	        h: line_height,
	        offset_x: offset_x,
	        offset_y: offset_y
	      });
	      offset_x += width + this._layout._margin;
	    }
	    return items;
	  };

	  Line.prototype.calculate_ratio_with = function (object) {
	    return this._objects_ratio + this.object_ratio(object);
	  };

	  Line.prototype.object_ratio = function (object) {
	    return object.ratio;
	  };

	  return Line;
	}();

	exports.default = Line;

/***/ }

/******/ })
});
;