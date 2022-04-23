(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\n\n// `IsArray` abstract operation\n// https://tc39.es/ecma262/#sec-isarray\n// eslint-disable-next-line es-x/no-array-isarray -- safe\nmodule.exports = Array.isArray || function isArray(argument) {\n  return classof(argument) == 'Array';\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/is-array.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */\n/* eslint-disable regexp/no-useless-quantifier -- testing */\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js/internals/function-call.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar toString = __webpack_require__(/*! ../internals/to-string */ \"./node_modules/core-js/internals/to-string.js\");\nvar regexpFlags = __webpack_require__(/*! ../internals/regexp-flags */ \"./node_modules/core-js/internals/regexp-flags.js\");\nvar stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ \"./node_modules/core-js/internals/regexp-sticky-helpers.js\");\nvar shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\");\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js/internals/object-create.js\");\nvar getInternalState = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\").get;\nvar UNSUPPORTED_DOT_ALL = __webpack_require__(/*! ../internals/regexp-unsupported-dot-all */ \"./node_modules/core-js/internals/regexp-unsupported-dot-all.js\");\nvar UNSUPPORTED_NCG = __webpack_require__(/*! ../internals/regexp-unsupported-ncg */ \"./node_modules/core-js/internals/regexp-unsupported-ncg.js\");\n\nvar nativeReplace = shared('native-string-replace', String.prototype.replace);\nvar nativeExec = RegExp.prototype.exec;\nvar patchedExec = nativeExec;\nvar charAt = uncurryThis(''.charAt);\nvar indexOf = uncurryThis(''.indexOf);\nvar replace = uncurryThis(''.replace);\nvar stringSlice = uncurryThis(''.slice);\n\nvar UPDATES_LAST_INDEX_WRONG = (function () {\n  var re1 = /a/;\n  var re2 = /b*/g;\n  call(nativeExec, re1, 'a');\n  call(nativeExec, re2, 'a');\n  return re1.lastIndex !== 0 || re2.lastIndex !== 0;\n})();\n\nvar UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;\n\n// nonparticipating capturing group, copied from es5-shim's String#split patch.\nvar NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;\n\nvar PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;\n\nif (PATCH) {\n  patchedExec = function exec(string) {\n    var re = this;\n    var state = getInternalState(re);\n    var str = toString(string);\n    var raw = state.raw;\n    var result, reCopy, lastIndex, match, i, object, group;\n\n    if (raw) {\n      raw.lastIndex = re.lastIndex;\n      result = call(patchedExec, raw, str);\n      re.lastIndex = raw.lastIndex;\n      return result;\n    }\n\n    var groups = state.groups;\n    var sticky = UNSUPPORTED_Y && re.sticky;\n    var flags = call(regexpFlags, re);\n    var source = re.source;\n    var charsAdded = 0;\n    var strCopy = str;\n\n    if (sticky) {\n      flags = replace(flags, 'y', '');\n      if (indexOf(flags, 'g') === -1) {\n        flags += 'g';\n      }\n\n      strCopy = stringSlice(str, re.lastIndex);\n      // Support anchored sticky behavior.\n      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\\n')) {\n        source = '(?: ' + source + ')';\n        strCopy = ' ' + strCopy;\n        charsAdded++;\n      }\n      // ^(? + rx + ) is needed, in combination with some str slicing, to\n      // simulate the 'y' flag.\n      reCopy = new RegExp('^(?:' + source + ')', flags);\n    }\n\n    if (NPCG_INCLUDED) {\n      reCopy = new RegExp('^' + source + '$(?!\\\\s)', flags);\n    }\n    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;\n\n    match = call(nativeExec, sticky ? reCopy : re, strCopy);\n\n    if (sticky) {\n      if (match) {\n        match.input = stringSlice(match.input, charsAdded);\n        match[0] = stringSlice(match[0], charsAdded);\n        match.index = re.lastIndex;\n        re.lastIndex += match[0].length;\n      } else re.lastIndex = 0;\n    } else if (UPDATES_LAST_INDEX_WRONG && match) {\n      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;\n    }\n    if (NPCG_INCLUDED && match && match.length > 1) {\n      // Fix browsers whose `exec` methods don't consistently return `undefined`\n      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/\n      call(nativeReplace, match[0], reCopy, function () {\n        for (i = 1; i < arguments.length - 2; i++) {\n          if (arguments[i] === undefined) match[i] = undefined;\n        }\n      });\n    }\n\n    if (match && groups) {\n      match.groups = object = create(null);\n      for (i = 0; i < groups.length; i++) {\n        group = groups[i];\n        object[group[0]] = match[group[1]];\n      }\n    }\n\n    return match;\n  };\n}\n\nmodule.exports = patchedExec;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/regexp-exec.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/regexp-flags.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\n\n// `RegExp.prototype.flags` getter implementation\n// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags\nmodule.exports = function () {\n  var that = anObject(this);\n  var result = '';\n  if (that.hasIndices) result += 'd';\n  if (that.global) result += 'g';\n  if (that.ignoreCase) result += 'i';\n  if (that.multiline) result += 'm';\n  if (that.dotAll) result += 's';\n  if (that.unicode) result += 'u';\n  if (that.sticky) result += 'y';\n  return result;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/regexp-flags.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/regexp-sticky-helpers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-sticky-helpers.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\n\n// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError\nvar $RegExp = global.RegExp;\n\nvar UNSUPPORTED_Y = fails(function () {\n  var re = $RegExp('a', 'y');\n  re.lastIndex = 2;\n  return re.exec('abcd') != null;\n});\n\n// UC Browser bug\n// https://github.com/zloirock/core-js/issues/1008\nvar MISSED_STICKY = UNSUPPORTED_Y || fails(function () {\n  return !$RegExp('a', 'y').sticky;\n});\n\nvar BROKEN_CARET = UNSUPPORTED_Y || fails(function () {\n  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687\n  var re = $RegExp('^r', 'gy');\n  re.lastIndex = 2;\n  return re.exec('str') != null;\n});\n\nmodule.exports = {\n  BROKEN_CARET: BROKEN_CARET,\n  MISSED_STICKY: MISSED_STICKY,\n  UNSUPPORTED_Y: UNSUPPORTED_Y\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/regexp-sticky-helpers.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/regexp-unsupported-dot-all.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-unsupported-dot-all.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\n\n// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError\nvar $RegExp = global.RegExp;\n\nmodule.exports = fails(function () {\n  var re = $RegExp('.', 's');\n  return !(re.dotAll && re.exec('\\n') && re.flags === 's');\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/regexp-unsupported-dot-all.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/regexp-unsupported-ncg.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-unsupported-ncg.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\n\n// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError\nvar $RegExp = global.RegExp;\n\nmodule.exports = fails(function () {\n  var re = $RegExp('(?<a>b)', 'g');\n  return re.exec('b').groups.a !== 'b' ||\n    'b'.replace(re, '$<a>c') !== 'bc';\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/regexp-unsupported-ncg.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.function.name.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.function.name.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar FUNCTION_NAME_EXISTS = __webpack_require__(/*! ../internals/function-name */ \"./node_modules/core-js/internals/function-name.js\").EXISTS;\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar defineProperty = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\").f;\n\nvar FunctionPrototype = Function.prototype;\nvar functionToString = uncurryThis(FunctionPrototype.toString);\nvar nameRE = /function\\b(?:\\s|\\/\\*[\\S\\s]*?\\*\\/|\\/\\/[^\\n\\r]*[\\n\\r]+)*([^\\s(/]*)/;\nvar regExpExec = uncurryThis(nameRE.exec);\nvar NAME = 'name';\n\n// Function instances `.name` property\n// https://tc39.es/ecma262/#sec-function-instances-name\nif (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {\n  defineProperty(FunctionPrototype, NAME, {\n    configurable: true,\n    get: function () {\n      try {\n        return regExpExec(nameRE, functionToString(this))[1];\n      } catch (error) {\n        return '';\n      }\n    }\n  });\n}\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.function.name.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.json.stringify.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.json.stringify.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\nvar apply = __webpack_require__(/*! ../internals/function-apply */ \"./node_modules/core-js/internals/function-apply.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js/internals/function-call.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar isArray = __webpack_require__(/*! ../internals/is-array */ \"./node_modules/core-js/internals/is-array.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar isSymbol = __webpack_require__(/*! ../internals/is-symbol */ \"./node_modules/core-js/internals/is-symbol.js\");\nvar arraySlice = __webpack_require__(/*! ../internals/array-slice */ \"./node_modules/core-js/internals/array-slice.js\");\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ \"./node_modules/core-js/internals/native-symbol.js\");\n\nvar $stringify = getBuiltIn('JSON', 'stringify');\nvar exec = uncurryThis(/./.exec);\nvar charAt = uncurryThis(''.charAt);\nvar charCodeAt = uncurryThis(''.charCodeAt);\nvar replace = uncurryThis(''.replace);\nvar numberToString = uncurryThis(1.0.toString);\n\nvar tester = /[\\uD800-\\uDFFF]/g;\nvar low = /^[\\uD800-\\uDBFF]$/;\nvar hi = /^[\\uDC00-\\uDFFF]$/;\n\nvar WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {\n  var symbol = getBuiltIn('Symbol')();\n  // MS Edge converts symbol values to JSON as {}\n  return $stringify([symbol]) != '[null]'\n    // WebKit converts symbol values to JSON as null\n    || $stringify({ a: symbol }) != '{}'\n    // V8 throws on boxed symbols\n    || $stringify(Object(symbol)) != '{}';\n});\n\n// https://github.com/tc39/proposal-well-formed-stringify\nvar ILL_FORMED_UNICODE = fails(function () {\n  return $stringify('\\uDF06\\uD834') !== '\"\\\\udf06\\\\ud834\"'\n    || $stringify('\\uDEAD') !== '\"\\\\udead\"';\n});\n\nvar stringifyWithSymbolsFix = function (it, replacer) {\n  var args = arraySlice(arguments);\n  var $replacer = replacer;\n  if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined\n  if (!isArray(replacer)) replacer = function (key, value) {\n    if (isCallable($replacer)) value = call($replacer, this, key, value);\n    if (!isSymbol(value)) return value;\n  };\n  args[1] = replacer;\n  return apply($stringify, null, args);\n};\n\nvar fixIllFormed = function (match, offset, string) {\n  var prev = charAt(string, offset - 1);\n  var next = charAt(string, offset + 1);\n  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {\n    return '\\\\u' + numberToString(charCodeAt(match, 0), 16);\n  } return match;\n};\n\nif ($stringify) {\n  // `JSON.stringify` method\n  // https://tc39.es/ecma262/#sec-json.stringify\n  $({ target: 'JSON', stat: true, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {\n    // eslint-disable-next-line no-unused-vars -- required for `.length`\n    stringify: function stringify(it, replacer, space) {\n      var args = arraySlice(arguments);\n      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);\n      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;\n    }\n  });\n}\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.json.stringify.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.exec.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.exec.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar exec = __webpack_require__(/*! ../internals/regexp-exec */ \"./node_modules/core-js/internals/regexp-exec.js\");\n\n// `RegExp.prototype.exec` method\n// https://tc39.es/ecma262/#sec-regexp.prototype.exec\n$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {\n  exec: exec\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.regexp.exec.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.test.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.test.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// TODO: Remove from `core-js@4` since it's moved to entry points\n__webpack_require__(/*! ../modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js/internals/function-call.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\nvar DELEGATES_TO_EXEC = function () {\n  var execCalled = false;\n  var re = /[ac]/;\n  re.exec = function () {\n    execCalled = true;\n    return /./.exec.apply(this, arguments);\n  };\n  return re.test('abc') === true && execCalled;\n}();\n\nvar Error = global.Error;\nvar un$Test = uncurryThis(/./.test);\n\n// `RegExp.prototype.test` method\n// https://tc39.es/ecma262/#sec-regexp.prototype.test\n$({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {\n  test: function (str) {\n    var exec = this.exec;\n    if (!isCallable(exec)) return un$Test(this, str);\n    var result = call(exec, this, str);\n    if (result !== null && !isObject(result)) {\n      throw new Error('RegExp exec method returned something other than an Object or null');\n    }\n    return !!result;\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.regexp.test.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./src/assets/css/auth.css":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-oneOf-1-2!./src/assets/css/auth.css ***!
  \***************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nvar ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\nvar ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ../img/bg/bg.jpg */ \"./src/assets/img/bg/bg.jpg\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);\n// Module\nexports.push([module.i, \".fxt-template-layout20 {\\r\\n\\tmin-height: 100vh;\\r\\n\\tdisplay: flex;\\r\\n\\talign-items: center;\\r\\n\\tjustify-content: space-between;\\n}\\n.fxt-template-layout20 .container {\\r\\n\\tmax-width: 1350px;\\n}\\n.fxt-template-layout20 .fxt-bg-img {\\r\\n\\twidth: 100%;\\r\\n\\tbackground-repeat: no-repeat;\\r\\n\\tbackground-position: center center;\\r\\n\\tbackground-size: cover;\\r\\n\\tmargin: 0;\\r\\n\\tpadding: 0;\\r\\n\\tborder-radius: 15px 0 0 15px;\\n}\\n@media (min-width: 1200px){\\n.col-xl-7 {\\r\\n\\tflex: 0 0 58.33333%;\\r\\n\\tmax-width: 58.33333%;\\n}\\n}\\n.carousel-indicators {\\r\\n\\tposition: absolute;\\r\\n\\tright: 0;\\r\\n\\tbottom: 10px;\\r\\n\\tleft: 0;\\r\\n\\tz-index: 15;\\r\\n\\tdisplay: flex;\\r\\n\\tjustify-content: center;\\r\\n\\tpadding-left: 0;\\r\\n\\tmargin-right: 15%;\\r\\n\\tmargin-left: 15%;\\r\\n\\tlist-style: none;\\n}\\n.carousel-inner {\\r\\n\\tposition: relative;\\r\\n\\twidth: 100%;\\r\\n\\toverflow: hidden;\\n}\\n.fxt-template-layout20 .fxt-bg-color {\\r\\n\\tbackground-color: #ffffff;\\r\\n\\twidth: 100%;\\r\\n\\tpadding: 0;\\r\\n\\tbox-shadow: 3px 0 79px 0 rgb(0 0 0 / 8%);\\r\\n\\theight: 100vh;\\n}\\n@media (min-width: 1200px){\\n.col-xl-5 {\\r\\n\\t\\tflex: 0 0 41.66667%;\\r\\n\\t\\tmax-width: 41.66667%;\\n}\\n}\\n.fxt-template-layout20 .fxt-content {\\r\\n\\tborder-radius: 0 15px 15px 0;\\r\\n\\tpadding: 100px 50px 70px 50px;\\r\\n\\twidth: 100%;\\r\\n\\tpadding-top: 50px;\\n}\\n.content-hieght {\\r\\n\\tmargin-top: -40px;\\n}\\n.fxt-template-layout20 .fxt-header, .fxt-template-layout20 .fxt-footer {\\r\\n\\ttext-align: center;\\n}\\n.logo_size {\\r\\n\\t/* margin-bottom: 35px; */\\r\\n\\tmargin-top: 50px;\\n}\\n.fxt-template-layout20 ul.fxt-socials {\\r\\n\\tdisplay: flex;\\r\\n\\tflex-wrap: wrap;\\r\\n\\tjustify-content: center;\\r\\n\\tmargin-right: -5px;\\r\\n\\tmargin-left: -5px;\\r\\n\\tmargin-bottom: 20px;\\r\\n\\tmargin-top: 20px;\\n}\\n.fxt-template-layout20 .fxt-style-line {\\r\\n\\toverflow: hidden;\\r\\n\\ttext-align: center;\\n}\\n.fxt-template-layout20 ul.fxt-socials li {\\r\\n\\tmax-width: 100%;\\r\\n\\tflex: 0 0 33.33333%;\\r\\n\\tpadding-left: 5px;\\r\\n\\tpadding-right: 5px;\\r\\n\\tmargin-bottom: 10px;\\n}\\nul li, ol li, dl li {\\r\\n\\tline-height: 1.8;\\n}\\n.fxt-template-layout20 ul.fxt-socials li.fxt-google a {\\r\\n\\tbackground-color: #CC3333;\\n}\\n.fxt-template-layout20 ul.fxt-socials li a {\\r\\n\\tborder-radius: 2px;\\r\\n\\tdisplay: flex;\\r\\n\\talign-items: center;\\r\\n\\tjustify-content: flex-start;\\r\\n\\tfont-size: 14px;\\r\\n\\theight: 45px;\\r\\n\\tcolor: #ffffff;\\r\\n\\ttransition: all 0.3s ease-in-out;\\n}\\n.fxt-template-layout20 ul.fxt-socials li.fxt-google a i {\\r\\n\\tbackground-color: #db4437;\\n}\\n.fxt-template-layout20 ul.fxt-socials li a i {\\r\\n\\tborder-radius: 2px 0 0 2px;\\r\\n\\tdisplay: flex;\\r\\n\\talign-items: center;\\r\\n\\tjustify-content: center;\\r\\n\\twidth: 45px;\\r\\n\\theight: 45px;\\n}\\n.fxt-template-layout20 ul.fxt-socials li a span {\\r\\n\\theight: 100%;\\r\\n\\twidth: 100%;\\r\\n\\tdisplay: flex;\\r\\n\\talign-items: center;\\r\\n\\tjustify-content: center;\\r\\n\\tflex: 1;\\n}\\na {\\r\\n\\ttext-decoration: none;\\n}\\nul {\\r\\n\\tlist-style: outside none none;\\r\\n\\tmargin: 0;\\r\\n\\tpadding: 0;\\n}\\n.fxt-template-layout20 ul.fxt-socials li.fxt-facebook a {\\r\\n\\tbackground-color: #3b5998;\\n}\\n.fxt-template-layout20 ul.fxt-socials li.fxt-facebook a i {\\r\\n\\tbackground-color: #4867aa;\\n}\\n.fxt-template-layout20 .fxt-style-line h2 {\\r\\n\\ttext-align: center;\\r\\n\\tfont-weight: 300;\\r\\n\\tmargin-bottom: 30px;\\r\\n\\tfont-size: 20px;\\r\\n\\tcolor: #a4a4a4;\\r\\n\\tdisplay: inline-block;\\r\\n\\tposition: relative;\\r\\n\\tpadding: 0 25px;\\r\\n\\tz-index: 1;\\n}\\n.fxt-template-layout20 .fxt-form .form-group {\\r\\n\\tposition: relative;\\r\\n\\tz-index: 1;\\n}\\n.fxt-template-layout20 .fxt-form .form-control {\\r\\n\\tmin-height: 50px;\\r\\n\\tbox-shadow: none;\\r\\n\\tborder: 1px solid #e7e7e7;\\r\\n\\tpadding: 10px 15px;\\r\\n\\tcolor: #111111;\\n}\\n.form-group {\\r\\n\\tmargin-bottom: 1.5rem;\\n}\\n.fxt-template-layout20 .fxt-checkbox-area {\\r\\n\\tdisplay: flex;\\r\\n\\talign-items: center;\\r\\n\\tjustify-content: space-between;\\r\\n\\tmargin-bottom: 40px;\\r\\n\\tflex-wrap: wrap;\\n}\\n.fxt-template-layout20 .checkbox label {\\r\\n\\tpadding-left: 20px;\\r\\n\\tcolor: #a4a4a4;\\r\\n\\tmargin-bottom: 0;\\r\\n\\tfont-size: 15px;\\r\\n\\tposition: relative;\\n}\\n.fxt-template-layout20 .checkbox label::before {\\r\\n\\tcontent: \\\"\\\";\\r\\n\\tposition: absolute;\\r\\n\\twidth: 16px;\\r\\n\\theight: 16px;\\r\\n\\ttop: 4px;\\r\\n\\tleft: 0;\\r\\n\\tmargin-left: -5px;\\r\\n\\tborder: 1px solid;\\r\\n\\tborder-color: #dcdcdc;\\r\\n\\tborder-radius: 3px;\\r\\n\\tbackground-color: #fff;\\r\\n\\ttransition: border 0.15s ease-in-out, color 0.15s ease-in-out;\\n}\\n.fxt-template-layout20 .checkbox  label.checkMe::before {\\r\\n\\tbackground-color: #ffab04;\\r\\n\\tborder-color: #ffab04;\\n}\\n.fxt-template-layout20 .checkbox  label.checkMe::after {\\r\\n\\tfont-family: 'Font Awesome 5 Free';\\r\\n\\tcontent: \\\"\\\\f00c\\\";\\r\\n\\tfont-weight: 900;\\r\\n\\tcolor: #ffffff;\\r\\n\\tleft: 15px;\\r\\n\\ttop: 4px;\\n}\\n.fxt-template-layout20 .checkbox label.checkMe::after {\\r\\n\\tposition: absolute;\\r\\n\\tmargin-left: -20px;\\r\\n\\tpadding-left: 3px;\\r\\n\\tfont-size: 10px;\\n}\\n.fxt-template-layout20 .checkbox input[type=\\\"checkbox\\\"] {\\r\\n\\tvisibility: hidden;\\r\\n\\tposition: absolute;\\n}\\n.fxt-template-layout20 .checkbox {\\r\\n\\tpadding-left: 5px;\\r\\n\\tmargin-right: 30px;\\r\\n\\tmargin-bottom: 5px;\\n}\\n.fxt-template-layout20 .switcher-text:hover {\\r\\n\\tcolor: #000000;\\n}\\n.fxt-template-layout20 .switcher-text {\\r\\n\\tcolor: #ffab04;\\r\\n\\tfont-size: 15px;\\r\\n\\tmargin-bottom: 8px;\\r\\n\\tdisplay: block;\\r\\n\\ttransition: all 0.3s ease-in-out;\\n}\\n.fxt-template-layout20 .fxt-btn-fill:hover {\\r\\n\\tbackground-color: #ffab04;\\r\\n\\tborder-color: #ffab04;\\n}\\n.fxt-template-layout20 .fxt-btn-fill {\\r\\n\\tfont-family: 'Roboto', sans-serif;\\r\\n\\tcursor: pointer;\\r\\n\\tdisplay: inline-block;\\r\\n\\tfont-size: 17px;\\r\\n\\tfont-weight: 500;\\r\\n\\tbox-shadow: none;\\r\\n\\toutline: none;\\r\\n\\tborder: 0;\\r\\n\\tcolor: #fff;\\r\\n\\tborder-radius: 3px;\\r\\n\\tbackground-color: #000;\\r\\n\\tpadding: 10px 36px;\\r\\n\\tmargin-bottom: 10px;\\r\\n\\twidth: 100%;\\r\\n\\ttransition: all 0.3s ease-in-out;\\n}\\np {\\r\\n\\tmargin: 0 0 20px 0;\\r\\n\\tcolor: #646464;\\n}\\n.fxt-template-layout20 .switcher-text2 {\\r\\n\\tcolor: #ffab04;\\r\\n\\tfont-size: 15px;\\r\\n\\tdisplay: inline-block;\\r\\n\\ttransition: all 0.3s ease-in-out;\\n}\\n.fxt-template-layout20 .switcher-text2:hover {\\r\\n\\tcolor: #000000;\\n}\\ninput:not(:-moz-placeholder-shown) + label {\\r\\n\\ttransform: translate(0, 0) scale(1);\\r\\n\\tcursor: pointer;\\n}\\ninput:not(:-ms-input-placeholder) + label {\\r\\n\\ttransform: translate(0, 0) scale(1);\\r\\n\\tcursor: pointer;\\n}\\ninput:not(:placeholder-shown) + label, input:focus + label {\\r\\n\\ttransform: translate(0, 0) scale(1);\\r\\n\\tcursor: pointer;\\n}\\n.img-height-width {\\r\\n\\tpadding-bottom: 130px !important;\\n}\\n.carousel-caption {\\r\\n\\tposition: absolute;\\r\\n\\tright: 15%;\\r\\n\\tbottom: 20px;\\r\\n\\tleft: 15%;\\r\\n\\tz-index: 10;\\r\\n\\tpadding-top: 20px;\\r\\n\\tpadding-bottom: 20px;\\r\\n\\tcolor: #fff;\\r\\n\\ttext-align: center;\\n}\\n.carousel-item {\\r\\n\\theight: 100vh;\\r\\n\\tmin-height: 350px;\\r\\n\\tbackground: no-repeat center center scroll;\\r\\n\\tbackground-size: cover;\\n}\\n.carousel-item {\\r\\n\\tposition: relative;\\r\\n\\tdisplay: none;\\r\\n\\talign-items: center;\\r\\n\\twidth: 100%;\\r\\n\\ttransition: transform 0.6s ease;\\r\\n\\t-webkit-backface-visibility: hidden;\\r\\n\\t        backface-visibility: hidden;\\r\\n\\tperspective: 1000px;\\r\\n\\tbackground-image: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");\\n}\\n.imgage_slider {\\r\\n\\t/* background-color: #FFFFFF; */\\r\\n\\theight: 200px;\\r\\n\\tborder-radius: 50%;\\r\\n\\t-moz-border-radius: 50%;\\r\\n\\t-webkit-border-radius: 50%;\\r\\n\\twidth: 200px;\\r\\n\\tmargin: auto;\\r\\n\\tborder: 2px solid #ffffff;\\n}\\n.img_slide1 {\\r\\n\\twidth: 75%;\\r\\n\\tpadding-top: 31px;\\r\\n\\tpadding-right: 6px;\\r\\n\\tpadding-left: 9px;\\n}\\n.content-header-color {\\r\\n\\tpadding-top: 25px;\\r\\n\\tcolor: #fff;\\n}\\n.content_color {\\r\\n\\tcolor: #fff;\\r\\n\\tfont-size: 25px;\\n}\\n.term_condition:hover {\\r\\n\\tcolor: #000000;\\n}\\n.term_condition  {\\r\\n\\tcolor: #f97d40 ;\\r\\n\\ttext-decoration: none;\\r\\n\\tbackground-color: transparent;\\r\\n\\t-webkit-text-decoration-skip: objects;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/assets/css/auth.css?./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-oneOf-1-2");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    // eslint-disable-next-line no-param-reassign\n    options = {};\n  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign\n\n\n  url = url && url.__esModule ? url.default : url;\n\n  if (typeof url !== 'string') {\n    return url;\n  } // If url is already wrapped in quotes, remove them\n\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    // eslint-disable-next-line no-param-reassign\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    // eslint-disable-next-line no-param-reassign\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, '\\\\n'), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./src/assets/img/INSTABILL.svg":
/*!**************************************!*\
  !*** ./src/assets/img/INSTABILL.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/INSTABILL.a5badb40.svg\";\n\n//# sourceURL=webpack:///./src/assets/img/INSTABILL.svg?");

/***/ }),

/***/ "./src/assets/img/bg/bg.jpg":
/*!**********************************!*\
  !*** ./src/assets/img/bg/bg.jpg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/bg.25405ccd.jpg\";\n\n//# sourceURL=webpack:///./src/assets/img/bg/bg.jpg?");

/***/ }),

/***/ "./src/assets/js/helpers.js":
/*!**********************************!*\
  !*** ./src/assets/js/helpers.js ***!
  \**********************************/
/*! exports provided: checkEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkEmail\", function() { return checkEmail; });\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.test.js */ \"./node_modules/core-js/modules/es.regexp.test.js\");\n/* harmony import */ var core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar checkEmail = function checkEmail(email) {\n  var re = /^(([^<>()\\\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;\n\n  if (!re.test(email)) {\n    return false;\n  }\n\n  return true;\n};\n\n//# sourceURL=webpack:///./src/assets/js/helpers.js?");

/***/ }),

/***/ "./src/assets/js/index.js":
/*!********************************!*\
  !*** ./src/assets/js/index.js ***!
  \********************************/
/*! exports provided: Main, checkEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ \"./src/assets/js/main.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Main\", function() { return _main__WEBPACK_IMPORTED_MODULE_0__[\"Main\"]; });\n\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./src/assets/js/helpers.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"checkEmail\", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__[\"checkEmail\"]; });\n\n\n\n\n//# sourceURL=webpack:///./src/assets/js/index.js?");

/***/ }),

/***/ "./src/assets/js/main.js":
/*!*******************************!*\
  !*** ./src/assets/js/main.js ***!
  \*******************************/
/*! exports provided: Main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Main\", function() { return Main; });\nvar Main = function Main() {\n  document.addEventListener('scroll', function () {\n    if (document.querySelector('#header')) {\n      if (window.scrollY > 100) {\n        document.querySelector('#header').classList.add('shadowed');\n      } else {\n        document.querySelector('#header').classList.remove('shadowed');\n      }\n    }\n\n    if (document.querySelector('.invoices-div nav')) {\n      if (window.scrollY > document.querySelector('.invoices-div nav').offsetTop) {\n        document.querySelector('.invoices-div .h').classList.add('h1-div-card');\n        document.querySelector('.invoices-div .navbar').classList.add('navbar-stick');\n\n        if (window.scrollY > document.querySelector('.invoices-div nav').offsetTop) {// #article-1\n        }\n      } else {\n        document.querySelector('.invoices-div .h').classList.remove('h1-div-card');\n        document.querySelector('.invoices-div .navbar').classList.remove('navbar-stick');\n      }\n    }\n  });\n};\n\n//# sourceURL=webpack:///./src/assets/js/main.js?");

/***/ })

}]);