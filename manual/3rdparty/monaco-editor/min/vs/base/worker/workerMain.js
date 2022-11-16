/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.20.0(6363745c0a33c27b149b89342a7b96d354fb554c)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/
(function () {
	var e,
		t,
		n = [
			"require",
			"exports",
			"vs/editor/common/core/position",
			"vs/base/common/errors",
			"vs/base/common/platform",
			"vs/editor/common/core/range",
			"vs/base/common/diff/diff",
			"vs/base/common/iterator",
			"vs/base/common/lifecycle",
			"vs/base/common/event",
			"vs/base/common/types",
			"vs/base/common/uint",
			"vs/base/common/uri",
			"vs/base/common/arrays",
			"vs/base/common/diff/diffChange",
			"vs/base/common/functional",
			"vs/base/common/hash",
			"vs/base/common/keyCodes",
			"vs/base/common/linkedList",
			"vs/base/common/cancellation",
			"vs/base/common/strings",
			"vs/editor/common/core/characterClassifier",
			"vs/editor/common/core/selection",
			"vs/editor/common/core/token",
			"vs/editor/common/diff/diffComputer",
			"vs/editor/common/model/wordHelper",
			"vs/editor/common/modes/linkComputer",
			"vs/editor/common/modes/supports/inplaceReplaceSupport",
			"vs/editor/common/standalone/standaloneEnums",
			"vs/editor/common/standalone/standaloneBase",
			"vs/editor/common/viewModel/prefixSumComputer",
			"vs/editor/common/model/mirrorTextModel",
			"vs/base/common/worker/simpleWorker",
			"vs/editor/common/standalone/promise-polyfill/polyfill",
			"vs/editor/common/services/editorSimpleWorker",
		],
		r = function (e) {
			for (var t = [], r = 0, i = e.length; r < i; r++) t[r] = n[e[r]];
			return t;
		},
		i = this,
		o = "object" == typeof global ? global : {};
	!(function (e) {
		e.global = i;
		var t = (function () {
			function t() {
				(this._detected = !1),
					(this._isWindows = !1),
					(this._isNode = !1),
					(this._isElectronRenderer = !1),
					(this._isWebWorker = !1);
			}
			return (
				Object.defineProperty(t.prototype, "isWindows", {
					get: function () {
						return this._detect(), this._isWindows;
					},
					enumerable: !0,
					configurable: !0,
				}),
				Object.defineProperty(t.prototype, "isNode", {
					get: function () {
						return this._detect(), this._isNode;
					},
					enumerable: !0,
					configurable: !0,
				}),
				Object.defineProperty(t.prototype, "isElectronRenderer", {
					get: function () {
						return this._detect(), this._isElectronRenderer;
					},
					enumerable: !0,
					configurable: !0,
				}),
				Object.defineProperty(t.prototype, "isWebWorker", {
					get: function () {
						return this._detect(), this._isWebWorker;
					},
					enumerable: !0,
					configurable: !0,
				}),
				(t.prototype._detect = function () {
					this._detected ||
						((this._detected = !0),
						(this._isWindows = t._isWindows()),
						(this._isNode = "undefined" != typeof module && !!module.exports),
						(this._isElectronRenderer =
							"undefined" != typeof process &&
							void 0 !== process.versions &&
							void 0 !== process.versions.electron &&
							"renderer" === process.type),
						(this._isWebWorker = "function" == typeof e.global.importScripts));
				}),
				(t._isWindows = function () {
					return (
						!!(
							"undefined" != typeof navigator &&
							navigator.userAgent &&
							navigator.userAgent.indexOf("Windows") >= 0
						) ||
						("undefined" != typeof process && "win32" === process.platform)
					);
				}),
				t
			);
		})();
		e.Environment = t;
	})(t || (t = {})),
		(function (e) {
			var t = function (e, t, n) {
				(this.type = e), (this.detail = t), (this.timestamp = n);
			};
			e.LoaderEvent = t;
			var n = (function () {
				function n(e) {
					this._events = [new t(1, "", e)];
				}
				return (
					(n.prototype.record = function (n, r) {
						this._events.push(
							new t(n, r, e.Utilities.getHighPerformanceTimestamp())
						);
					}),
					(n.prototype.getEvents = function () {
						return this._events;
					}),
					n
				);
			})();
			e.LoaderEventRecorder = n;
			var r = (function () {
				function e() {}
				return (
					(e.prototype.record = function (e, t) {}),
					(e.prototype.getEvents = function () {
						return [];
					}),
					(e.INSTANCE = new e()),
					e
				);
			})();
			e.NullLoaderEventRecorder = r;
		})(t || (t = {})),
		(function (e) {
			var t = (function () {
				function t() {}
				return (
					(t.fileUriToFilePath = function (e, t) {
						if (((t = decodeURI(t).replace(/%23/g, "#")), e)) {
							if (/^file:\/\/\//.test(t)) return t.substr(8);
							if (/^file:\/\//.test(t)) return t.substr(5);
						} else if (/^file:\/\//.test(t)) return t.substr(7);
						return t;
					}),
					(t.startsWith = function (e, t) {
						return e.length >= t.length && e.substr(0, t.length) === t;
					}),
					(t.endsWith = function (e, t) {
						return e.length >= t.length && e.substr(e.length - t.length) === t;
					}),
					(t.containsQueryString = function (e) {
						return /^[^\#]*\?/gi.test(e);
					}),
					(t.isAbsolutePath = function (e) {
						return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(e);
					}),
					(t.forEachProperty = function (e, t) {
						if (e) {
							var n = void 0;
							for (n in e) e.hasOwnProperty(n) && t(n, e[n]);
						}
					}),
					(t.isEmpty = function (e) {
						var n = !0;
						return (
							t.forEachProperty(e, function () {
								n = !1;
							}),
							n
						);
					}),
					(t.recursiveClone = function (e) {
						if (!e || "object" != typeof e) return e;
						var n = Array.isArray(e) ? [] : {};
						return (
							t.forEachProperty(e, function (e, r) {
								n[e] = r && "object" == typeof r ? t.recursiveClone(r) : r;
							}),
							n
						);
					}),
					(t.generateAnonymousModule = function () {
						return "===anonymous" + t.NEXT_ANONYMOUS_ID++ + "===";
					}),
					(t.isAnonymousModule = function (e) {
						return t.startsWith(e, "===anonymous");
					}),
					(t.getHighPerformanceTimestamp = function () {
						return (
							this.PERFORMANCE_NOW_PROBED ||
								((this.PERFORMANCE_NOW_PROBED = !0),
								(this.HAS_PERFORMANCE_NOW =
									e.global.performance &&
									"function" == typeof e.global.performance.now)),
							this.HAS_PERFORMANCE_NOW ? e.global.performance.now() : Date.now()
						);
					}),
					(t.NEXT_ANONYMOUS_ID = 1),
					(t.PERFORMANCE_NOW_PROBED = !1),
					(t.HAS_PERFORMANCE_NOW = !1),
					t
				);
			})();
			e.Utilities = t;
		})(t || (t = {})),
		(function (e) {
			function t(e) {
				if (e instanceof Error) return e;
				var t = new Error(e.message || String(e) || "Unknown Error");
				return e.stack && (t.stack = e.stack), t;
			}
			e.ensureError = t;
			var n = (function () {
				function n() {}
				return (
					(n.validateConfigurationOptions = function (n) {
						if (
							("string" != typeof (n = n || {}).baseUrl && (n.baseUrl = ""),
							"boolean" != typeof n.isBuild && (n.isBuild = !1),
							"object" != typeof n.paths && (n.paths = {}),
							"object" != typeof n.config && (n.config = {}),
							void 0 === n.catchError && (n.catchError = !1),
							void 0 === n.recordStats && (n.recordStats = !1),
							"string" != typeof n.urlArgs && (n.urlArgs = ""),
							"function" != typeof n.onError &&
								(n.onError = function (e) {
									return "loading" === e.phase
										? (console.error('Loading "' + e.moduleId + '" failed'),
										  console.error(e),
										  console.error("Here are the modules that depend on it:"),
										  void console.error(e.neededBy))
										: "factory" === e.phase
										? (console.error(
												'The factory method of "' +
													e.moduleId +
													'" has thrown an exception'
										  ),
										  void console.error(e))
										: void 0;
								}),
							Array.isArray(n.ignoreDuplicateModules) ||
								(n.ignoreDuplicateModules = []),
							n.baseUrl.length > 0 &&
								(e.Utilities.endsWith(n.baseUrl, "/") || (n.baseUrl += "/")),
							"string" != typeof n.cspNonce && (n.cspNonce = ""),
							Array.isArray(n.nodeModules) || (n.nodeModules = []),
							n.nodeCachedData &&
								"object" == typeof n.nodeCachedData &&
								("string" != typeof n.nodeCachedData.seed &&
									(n.nodeCachedData.seed = "seed"),
								("number" != typeof n.nodeCachedData.writeDelay ||
									n.nodeCachedData.writeDelay < 0) &&
									(n.nodeCachedData.writeDelay = 7e3),
								!n.nodeCachedData.path ||
									"string" != typeof n.nodeCachedData.path))
						) {
							var r = t(
								new Error(
									"INVALID cached data configuration, 'path' MUST be set"
								)
							);
							(r.phase = "configuration"),
								n.onError(r),
								(n.nodeCachedData = void 0);
						}
						return n;
					}),
					(n.mergeConfigurationOptions = function (t, r) {
						void 0 === t && (t = null), void 0 === r && (r = null);
						var i = e.Utilities.recursiveClone(r || {});
						return (
							e.Utilities.forEachProperty(t, function (t, n) {
								"ignoreDuplicateModules" === t &&
								void 0 !== i.ignoreDuplicateModules
									? (i.ignoreDuplicateModules =
											i.ignoreDuplicateModules.concat(n))
									: "paths" === t && void 0 !== i.paths
									? e.Utilities.forEachProperty(n, function (e, t) {
											return (i.paths[e] = t);
									  })
									: "config" === t && void 0 !== i.config
									? e.Utilities.forEachProperty(n, function (e, t) {
											return (i.config[e] = t);
									  })
									: (i[t] = e.Utilities.recursiveClone(n));
							}),
							n.validateConfigurationOptions(i)
						);
					}),
					n
				);
			})();
			e.ConfigurationOptionsUtil = n;
			var r = (function () {
				function t(e, t) {
					if (
						((this._env = e),
						(this.options = n.mergeConfigurationOptions(t)),
						this._createIgnoreDuplicateModulesMap(),
						this._createNodeModulesMap(),
						this._createSortedPathsRules(),
						"" === this.options.baseUrl)
					) {
						if (
							this.options.nodeRequire &&
							this.options.nodeRequire.main &&
							this.options.nodeRequire.main.filename &&
							this._env.isNode
						) {
							var r = this.options.nodeRequire.main.filename,
								i = Math.max(r.lastIndexOf("/"), r.lastIndexOf("\\"));
							this.options.baseUrl = r.substring(0, i + 1);
						}
						if (this.options.nodeMain && this._env.isNode) {
							(r = this.options.nodeMain),
								(i = Math.max(r.lastIndexOf("/"), r.lastIndexOf("\\")));
							this.options.baseUrl = r.substring(0, i + 1);
						}
					}
				}
				return (
					(t.prototype._createIgnoreDuplicateModulesMap = function () {
						this.ignoreDuplicateModulesMap = {};
						for (var e = 0; e < this.options.ignoreDuplicateModules.length; e++)
							this.ignoreDuplicateModulesMap[
								this.options.ignoreDuplicateModules[e]
							] = !0;
					}),
					(t.prototype._createNodeModulesMap = function () {
						this.nodeModulesMap = Object.create(null);
						for (var e = 0, t = this.options.nodeModules; e < t.length; e++) {
							var n = t[e];
							this.nodeModulesMap[n] = !0;
						}
					}),
					(t.prototype._createSortedPathsRules = function () {
						var t = this;
						(this.sortedPathsRules = []),
							e.Utilities.forEachProperty(this.options.paths, function (e, n) {
								Array.isArray(n)
									? t.sortedPathsRules.push({ from: e, to: n })
									: t.sortedPathsRules.push({ from: e, to: [n] });
							}),
							this.sortedPathsRules.sort(function (e, t) {
								return t.from.length - e.from.length;
							});
					}),
					(t.prototype.cloneAndMerge = function (e) {
						return new t(
							this._env,
							n.mergeConfigurationOptions(e, this.options)
						);
					}),
					(t.prototype.getOptionsLiteral = function () {
						return this.options;
					}),
					(t.prototype._applyPaths = function (t) {
						for (var n, r = 0, i = this.sortedPathsRules.length; r < i; r++)
							if (
								((n = this.sortedPathsRules[r]),
								e.Utilities.startsWith(t, n.from))
							) {
								for (var o = [], s = 0, u = n.to.length; s < u; s++)
									o.push(n.to[s] + t.substr(n.from.length));
								return o;
							}
						return [t];
					}),
					(t.prototype._addUrlArgsToUrl = function (t) {
						return e.Utilities.containsQueryString(t)
							? t + "&" + this.options.urlArgs
							: t + "?" + this.options.urlArgs;
					}),
					(t.prototype._addUrlArgsIfNecessaryToUrl = function (e) {
						return this.options.urlArgs ? this._addUrlArgsToUrl(e) : e;
					}),
					(t.prototype._addUrlArgsIfNecessaryToUrls = function (e) {
						if (this.options.urlArgs)
							for (var t = 0, n = e.length; t < n; t++)
								e[t] = this._addUrlArgsToUrl(e[t]);
						return e;
					}),
					(t.prototype.moduleIdToPaths = function (t) {
						if (!0 === this.nodeModulesMap[t])
							return this.isBuild() ? ["empty:"] : ["node|" + t];
						var n,
							r = t;
						if (e.Utilities.endsWith(r, ".js") || e.Utilities.isAbsolutePath(r))
							e.Utilities.endsWith(r, ".js") ||
								e.Utilities.containsQueryString(r) ||
								(r += ".js"),
								(n = [r]);
						else
							for (var i = 0, o = (n = this._applyPaths(r)).length; i < o; i++)
								(this.isBuild() && "empty:" === n[i]) ||
									(e.Utilities.isAbsolutePath(n[i]) ||
										(n[i] = this.options.baseUrl + n[i]),
									e.Utilities.endsWith(n[i], ".js") ||
										e.Utilities.containsQueryString(n[i]) ||
										(n[i] = n[i] + ".js"));
						return this._addUrlArgsIfNecessaryToUrls(n);
					}),
					(t.prototype.requireToUrl = function (t) {
						var n = t;
						return (
							e.Utilities.isAbsolutePath(n) ||
								((n = this._applyPaths(n)[0]),
								e.Utilities.isAbsolutePath(n) ||
									(n = this.options.baseUrl + n)),
							this._addUrlArgsIfNecessaryToUrl(n)
						);
					}),
					(t.prototype.isBuild = function () {
						return this.options.isBuild;
					}),
					(t.prototype.isDuplicateMessageIgnoredFor = function (e) {
						return this.ignoreDuplicateModulesMap.hasOwnProperty(e);
					}),
					(t.prototype.getConfigForModule = function (e) {
						if (this.options.config) return this.options.config[e];
					}),
					(t.prototype.shouldCatchError = function () {
						return this.options.catchError;
					}),
					(t.prototype.shouldRecordStats = function () {
						return this.options.recordStats;
					}),
					(t.prototype.onError = function (e) {
						this.options.onError(e);
					}),
					t
				);
			})();
			e.Configuration = r;
		})(t || (t = {})),
		(function (e) {
			var t = (function () {
					function e(e) {
						(this._env = e),
							(this._scriptLoader = null),
							(this._callbackMap = {});
					}
					return (
						(e.prototype.load = function (e, t, o, s) {
							var u = this;
							this._scriptLoader ||
								(this._scriptLoader = this._env.isWebWorker
									? new r()
									: this._env.isNode
									? new i(this._env)
									: new n());
							var a = { callback: o, errorback: s };
							this._callbackMap.hasOwnProperty(t)
								? this._callbackMap[t].push(a)
								: ((this._callbackMap[t] = [a]),
								  this._scriptLoader.load(
										e,
										t,
										function () {
											return u.triggerCallback(t);
										},
										function (e) {
											return u.triggerErrorback(t, e);
										}
								  ));
						}),
						(e.prototype.triggerCallback = function (e) {
							var t = this._callbackMap[e];
							delete this._callbackMap[e];
							for (var n = 0; n < t.length; n++) t[n].callback();
						}),
						(e.prototype.triggerErrorback = function (e, t) {
							var n = this._callbackMap[e];
							delete this._callbackMap[e];
							for (var r = 0; r < n.length; r++) n[r].errorback(t);
						}),
						e
					);
				})(),
				n = (function () {
					function e() {}
					return (
						(e.prototype.attachListeners = function (e, t, n) {
							var r = function () {
									e.removeEventListener("load", i),
										e.removeEventListener("error", o);
								},
								i = function (e) {
									r(), t();
								},
								o = function (e) {
									r(), n(e);
								};
							e.addEventListener("load", i), e.addEventListener("error", o);
						}),
						(e.prototype.load = function (e, t, n, r) {
							var i = document.createElement("script");
							i.setAttribute("async", "async"),
								i.setAttribute("type", "text/javascript"),
								this.attachListeners(i, n, r),
								i.setAttribute("src", t);
							var o = e.getConfig().getOptionsLiteral().cspNonce;
							o && i.setAttribute("nonce", o),
								document.getElementsByTagName("head")[0].appendChild(i);
						}),
						e
					);
				})(),
				r = (function () {
					function e() {}
					return (
						(e.prototype.load = function (e, t, n, r) {
							try {
								importScripts(t), n();
							} catch (e) {
								r(e);
							}
						}),
						e
					);
				})(),
				i = (function () {
					function t(e) {
						(this._env = e),
							(this._didInitialize = !1),
							(this._didPatchNodeRequire = !1);
					}
					return (
						(t.prototype._init = function (e) {
							this._didInitialize ||
								((this._didInitialize = !0),
								(this._fs = e("fs")),
								(this._vm = e("vm")),
								(this._path = e("path")),
								(this._crypto = e("crypto")));
						}),
						(t.prototype._initNodeRequire = function (e, t) {
							var n = t.getConfig().getOptionsLiteral().nodeCachedData;
							if (n && !this._didPatchNodeRequire) {
								this._didPatchNodeRequire = !0;
								var r = this,
									i = e("module");
								i.prototype._compile = function (e, s) {
									var u,
										a = i.wrap(e.replace(/^#!.*/, "")),
										l = t.getRecorder(),
										c = r._getCachedDataPath(n, s),
										d = { filename: s };
									try {
										var f = r._fs.readFileSync(c);
										(u = f.slice(0, 16)),
											(d.cachedData = f.slice(16)),
											l.record(60, c);
									} catch (e) {
										l.record(61, c);
									}
									var h = new r._vm.Script(a, d),
										p = h.runInThisContext(d),
										m = r._path.dirname(s),
										g = (function (e) {
											var t = e.constructor,
												n = function (t) {
													try {
														return e.require(t);
													} finally {
													}
												};
											return (
												(n.resolve = function (n) {
													return t._resolveFilename(n, e);
												}),
												(n.main = process.mainModule),
												(n.extensions = t._extensions),
												(n.cache = t._cache),
												n
											);
										})(this),
										v = [this.exports, g, this, s, m, process, o, Buffer],
										_ = p.apply(this.exports, v);
									return (
										r._handleCachedData(h, a, c, !d.cachedData, t),
										r._verifyCachedData(h, a, c, u, t),
										_
									);
								};
							}
						}),
						(t.prototype.load = function (n, r, i, o) {
							var s = this,
								u = n.getConfig().getOptionsLiteral(),
								a = u.nodeRequire || e.global.nodeRequire,
								l =
									u.nodeInstrumenter ||
									function (e) {
										return e;
									};
							this._init(a), this._initNodeRequire(a, n);
							var c = n.getRecorder();
							if (/^node\|/.test(r)) {
								var d = r.split("|"),
									f = null;
								try {
									f = a(d[1]);
								} catch (e) {
									return void o(e);
								}
								n.enqueueDefineAnonymousModule([], function () {
									return f;
								}),
									i();
							} else {
								r = e.Utilities.fileUriToFilePath(this._env.isWindows, r);
								var h = this._path.normalize(r),
									p = this._getElectronRendererScriptPathOrUri(h),
									m = Boolean(u.nodeCachedData),
									g = m ? this._getCachedDataPath(u.nodeCachedData, r) : void 0;
								this._readSourceAndCachedData(h, g, c, function (e, r, u, a) {
									if (e) o(e);
									else {
										var c;
										(c =
											r.charCodeAt(0) === t._BOM
												? t._PREFIX + r.substring(1) + t._SUFFIX
												: t._PREFIX + r + t._SUFFIX),
											(c = l(c, h));
										var d = { filename: p, cachedData: u },
											f = s._createAndEvalScript(n, c, d, i, o);
										s._handleCachedData(f, c, g, m && !u, n),
											s._verifyCachedData(f, c, g, a, n);
									}
								});
							}
						}),
						(t.prototype._createAndEvalScript = function (t, n, r, i, o) {
							var s = t.getRecorder();
							s.record(31, r.filename);
							var u = new this._vm.Script(n, r),
								a = u.runInThisContext(r),
								l = t.getGlobalAMDDefineFunc(),
								c = !1,
								d = function () {
									return (c = !0), l.apply(null, arguments);
								};
							return (
								(d.amd = l.amd),
								a.call(
									e.global,
									t.getGlobalAMDRequireFunc(),
									d,
									r.filename,
									this._path.dirname(r.filename)
								),
								s.record(32, r.filename),
								c
									? i()
									: o(
											new Error(
												"Didn't receive define call in " + r.filename + "!"
											)
									  ),
								u
							);
						}),
						(t.prototype._getElectronRendererScriptPathOrUri = function (e) {
							if (!this._env.isElectronRenderer) return e;
							var t = e.match(/^([a-z])\:(.*)/i);
							return t
								? "file:///" +
										(t[1].toUpperCase() + ":" + t[2]).replace(/\\/g, "/")
								: "file://" + e;
						}),
						(t.prototype._getCachedDataPath = function (e, t) {
							var n = this._crypto
									.createHash("md5")
									.update(t, "utf8")
									.update(e.seed, "utf8")
									.digest("hex"),
								r = this._path.basename(t).replace(/\.js$/, "");
							return this._path.join(e.path, r + "-" + n + ".code");
						}),
						(t.prototype._handleCachedData = function (e, t, n, r, i) {
							var o = this;
							e.cachedDataRejected
								? this._fs.unlink(n, function (r) {
										i.getRecorder().record(62, n),
											o._createAndWriteCachedData(e, t, n, i),
											r && i.getConfig().onError(r);
								  })
								: r && this._createAndWriteCachedData(e, t, n, i);
						}),
						(t.prototype._createAndWriteCachedData = function (e, t, n, r) {
							var i = this,
								o = Math.ceil(
									r.getConfig().getOptionsLiteral().nodeCachedData.writeDelay *
										(1 + Math.random())
								),
								s = -1,
								u = 0,
								a = void 0,
								l = function () {
									setTimeout(function () {
										a ||
											(a = i._crypto
												.createHash("md5")
												.update(t, "utf8")
												.digest());
										var o = e.createCachedData();
										0 === o.length ||
											o.length === s ||
											u >= 5 ||
											((s = o.length),
											i._fs.writeFile(n, Buffer.concat([a, o]), function (e) {
												e && r.getConfig().onError(e),
													r.getRecorder().record(63, n),
													l();
											}));
									}, o * Math.pow(4, u++));
								};
							l();
						}),
						(t.prototype._readSourceAndCachedData = function (e, t, n, r) {
							if (t) {
								var i = void 0,
									o = void 0,
									s = void 0,
									u = 2,
									a = function (e) {
										e ? r(e) : 0 == --u && r(void 0, i, o, s);
									};
								this._fs.readFile(e, { encoding: "utf8" }, function (e, t) {
									(i = t), a(e);
								}),
									this._fs.readFile(t, function (e, r) {
										!e && r && r.length > 0
											? ((s = r.slice(0, 16)),
											  (o = r.slice(16)),
											  n.record(60, t))
											: n.record(61, t),
											a();
									});
							} else this._fs.readFile(e, { encoding: "utf8" }, r);
						}),
						(t.prototype._verifyCachedData = function (e, t, n, r, i) {
							var o = this;
							r &&
								(e.cachedDataRejected ||
									setTimeout(function () {
										var e = o._crypto
											.createHash("md5")
											.update(t, "utf8")
											.digest();
										r.equals(e) ||
											(i
												.getConfig()
												.onError(
													new Error(
														"FAILED TO VERIFY CACHED DATA, deleting stale '" +
															n +
															"' now, but a RESTART IS REQUIRED"
													)
												),
											o._fs.unlink(n, function (e) {
												return i.getConfig().onError(e);
											}));
									}, Math.ceil(5e3 * (1 + Math.random()))));
						}),
						(t._BOM = 65279),
						(t._PREFIX =
							"(function (require, define, __filename, __dirname) { "),
						(t._SUFFIX = "\n});"),
						t
					);
				})();
			e.createScriptLoader = function (e) {
				return new t(e);
			};
		})(t || (t = {})),
		(function (e) {
			var t = (function () {
				function t(e) {
					var t = e.lastIndexOf("/");
					this.fromModulePath = -1 !== t ? e.substr(0, t + 1) : "";
				}
				return (
					(t._normalizeModuleId = function (e) {
						var t,
							n = e;
						for (t = /\/\.\//; t.test(n); ) n = n.replace(t, "/");
						for (
							n = n.replace(/^\.\//g, ""),
								t =
									/\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//;
							t.test(n);

						)
							n = n.replace(t, "/");
						return (n = n.replace(
							/^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//,
							""
						));
					}),
					(t.prototype.resolveModule = function (n) {
						var r = n;
						return (
							e.Utilities.isAbsolutePath(r) ||
								((e.Utilities.startsWith(r, "./") ||
									e.Utilities.startsWith(r, "../")) &&
									(r = t._normalizeModuleId(this.fromModulePath + r))),
							r
						);
					}),
					(t.ROOT = new t("")),
					t
				);
			})();
			e.ModuleIdResolver = t;
			var n = (function () {
				function t(e, t, n, r, i, o) {
					(this.id = e),
						(this.strId = t),
						(this.dependencies = n),
						(this._callback = r),
						(this._errorback = i),
						(this.moduleIdResolver = o),
						(this.exports = {}),
						(this.error = null),
						(this.exportsPassedIn = !1),
						(this.unresolvedDependenciesCount = this.dependencies.length),
						(this._isComplete = !1);
				}
				return (
					(t._safeInvokeFunction = function (t, n) {
						try {
							return {
								returnedValue: t.apply(e.global, n),
								producedError: null,
							};
						} catch (e) {
							return { returnedValue: null, producedError: e };
						}
					}),
					(t._invokeFactory = function (t, n, r, i) {
						return t.isBuild() && !e.Utilities.isAnonymousModule(n)
							? { returnedValue: null, producedError: null }
							: t.shouldCatchError()
							? this._safeInvokeFunction(r, i)
							: { returnedValue: r.apply(e.global, i), producedError: null };
					}),
					(t.prototype.complete = function (n, r, i) {
						this._isComplete = !0;
						var o = null;
						if (this._callback)
							if ("function" == typeof this._callback) {
								n.record(21, this.strId);
								var s = t._invokeFactory(r, this.strId, this._callback, i);
								(o = s.producedError),
									n.record(22, this.strId),
									o ||
										void 0 === s.returnedValue ||
										(this.exportsPassedIn &&
											!e.Utilities.isEmpty(this.exports)) ||
										(this.exports = s.returnedValue);
							} else this.exports = this._callback;
						if (o) {
							var u = e.ensureError(o);
							(u.phase = "factory"),
								(u.moduleId = this.strId),
								(this.error = u),
								r.onError(u);
						}
						(this.dependencies = null),
							(this._callback = null),
							(this._errorback = null),
							(this.moduleIdResolver = null);
					}),
					(t.prototype.onDependencyError = function (e) {
						return (
							(this._isComplete = !0),
							(this.error = e),
							!!this._errorback && (this._errorback(e), !0)
						);
					}),
					(t.prototype.isComplete = function () {
						return this._isComplete;
					}),
					t
				);
			})();
			e.Module = n;
			var r = (function () {
					function e() {
						(this._nextId = 0),
							(this._strModuleIdToIntModuleId = new Map()),
							(this._intModuleIdToStrModuleId = []),
							this.getModuleId("exports"),
							this.getModuleId("module"),
							this.getModuleId("require");
					}
					return (
						(e.prototype.getMaxModuleId = function () {
							return this._nextId;
						}),
						(e.prototype.getModuleId = function (e) {
							var t = this._strModuleIdToIntModuleId.get(e);
							return (
								void 0 === t &&
									((t = this._nextId++),
									this._strModuleIdToIntModuleId.set(e, t),
									(this._intModuleIdToStrModuleId[t] = e)),
								t
							);
						}),
						(e.prototype.getStrModuleId = function (e) {
							return this._intModuleIdToStrModuleId[e];
						}),
						e
					);
				})(),
				i = (function () {
					function e(e) {
						this.id = e;
					}
					return (
						(e.EXPORTS = new e(0)),
						(e.MODULE = new e(1)),
						(e.REQUIRE = new e(2)),
						e
					);
				})();
			e.RegularDependency = i;
			var o = function (e, t, n) {
				(this.id = e), (this.pluginId = t), (this.pluginParam = n);
			};
			e.PluginDependency = o;
			var s = (function () {
				function s(t, n, i, o, s) {
					void 0 === s && (s = 0),
						(this._env = t),
						(this._scriptLoader = n),
						(this._loaderAvailableTimestamp = s),
						(this._defineFunc = i),
						(this._requireFunc = o),
						(this._moduleIdProvider = new r()),
						(this._config = new e.Configuration(this._env)),
						(this._modules2 = []),
						(this._knownModules2 = []),
						(this._inverseDependencies2 = []),
						(this._inversePluginDependencies2 = new Map()),
						(this._currentAnnonymousDefineCall = null),
						(this._recorder = null),
						(this._buildInfoPath = []),
						(this._buildInfoDefineStack = []),
						(this._buildInfoDependencies = []);
				}
				return (
					(s.prototype.reset = function () {
						return new s(
							this._env,
							this._scriptLoader,
							this._defineFunc,
							this._requireFunc,
							this._loaderAvailableTimestamp
						);
					}),
					(s.prototype.getGlobalAMDDefineFunc = function () {
						return this._defineFunc;
					}),
					(s.prototype.getGlobalAMDRequireFunc = function () {
						return this._requireFunc;
					}),
					(s._findRelevantLocationInStack = function (e, t) {
						for (
							var n = function (e) {
									return e.replace(/\\/g, "/");
								},
								r = n(e),
								i = t.split(/\n/),
								o = 0;
							o < i.length;
							o++
						) {
							var s = i[o].match(/(.*):(\d+):(\d+)\)?$/);
							if (s) {
								var u = s[1],
									a = s[2],
									l = s[3],
									c = Math.max(u.lastIndexOf(" ") + 1, u.lastIndexOf("(") + 1);
								if ((u = n((u = u.substr(c)))) === r) {
									var d = { line: parseInt(a, 10), col: parseInt(l, 10) };
									return (
										1 === d.line &&
											(d.col -=
												"(function (require, define, __filename, __dirname) { ".length),
										d
									);
								}
							}
						}
						throw new Error(
							"Could not correlate define call site for needle " + e
						);
					}),
					(s.prototype.getBuildInfo = function () {
						if (!this._config.isBuild()) return null;
						for (
							var e = [], t = 0, n = 0, r = this._modules2.length;
							n < r;
							n++
						) {
							var i = this._modules2[n];
							if (i) {
								var o = this._buildInfoPath[i.id] || null,
									u = this._buildInfoDefineStack[i.id] || null,
									a = this._buildInfoDependencies[i.id];
								e[t++] = {
									id: i.strId,
									path: o,
									defineLocation:
										o && u ? s._findRelevantLocationInStack(o, u) : null,
									dependencies: a,
									shim: null,
									exports: i.exports,
								};
							}
						}
						return e;
					}),
					(s.prototype.getRecorder = function () {
						return (
							this._recorder ||
								(this._config.shouldRecordStats()
									? (this._recorder = new e.LoaderEventRecorder(
											this._loaderAvailableTimestamp
									  ))
									: (this._recorder = e.NullLoaderEventRecorder.INSTANCE)),
							this._recorder
						);
					}),
					(s.prototype.getLoaderEvents = function () {
						return this.getRecorder().getEvents();
					}),
					(s.prototype.enqueueDefineAnonymousModule = function (e, t) {
						if (null !== this._currentAnnonymousDefineCall)
							throw new Error(
								"Can only have one anonymous define call per script file"
							);
						var n = null;
						this._config.isBuild() &&
							(n = new Error("StackLocation").stack || null),
							(this._currentAnnonymousDefineCall = {
								stack: n,
								dependencies: e,
								callback: t,
							});
					}),
					(s.prototype.defineModule = function (e, r, i, o, s, u) {
						var a = this;
						void 0 === u && (u = new t(e));
						var l = this._moduleIdProvider.getModuleId(e);
						if (this._modules2[l])
							this._config.isDuplicateMessageIgnoredFor(e) ||
								console.warn("Duplicate definition of module '" + e + "'");
						else {
							var c = new n(l, e, this._normalizeDependencies(r, u), i, o, u);
							(this._modules2[l] = c),
								this._config.isBuild() &&
									((this._buildInfoDefineStack[l] = s),
									(this._buildInfoDependencies[l] = (c.dependencies || []).map(
										function (e) {
											return a._moduleIdProvider.getStrModuleId(e.id);
										}
									))),
								this._resolve(c);
						}
					}),
					(s.prototype._normalizeDependency = function (e, t) {
						if ("exports" === e) return i.EXPORTS;
						if ("module" === e) return i.MODULE;
						if ("require" === e) return i.REQUIRE;
						var n = e.indexOf("!");
						if (n >= 0) {
							var r = t.resolveModule(e.substr(0, n)),
								s = t.resolveModule(e.substr(n + 1)),
								u = this._moduleIdProvider.getModuleId(r + "!" + s),
								a = this._moduleIdProvider.getModuleId(r);
							return new o(u, a, s);
						}
						return new i(
							this._moduleIdProvider.getModuleId(t.resolveModule(e))
						);
					}),
					(s.prototype._normalizeDependencies = function (e, t) {
						for (var n = [], r = 0, i = 0, o = e.length; i < o; i++)
							n[r++] = this._normalizeDependency(e[i], t);
						return n;
					}),
					(s.prototype._relativeRequire = function (t, n, r, i) {
						if ("string" == typeof n) return this.synchronousRequire(n, t);
						this.defineModule(
							e.Utilities.generateAnonymousModule(),
							n,
							r,
							i,
							null,
							t
						);
					}),
					(s.prototype.synchronousRequire = function (e, n) {
						void 0 === n && (n = new t(e));
						var r = this._normalizeDependency(e, n),
							i = this._modules2[r.id];
						if (!i)
							throw new Error(
								"Check dependency list! Synchronous require cannot resolve module '" +
									e +
									"'. This is the first mention of this module!"
							);
						if (!i.isComplete())
							throw new Error(
								"Check dependency list! Synchronous require cannot resolve module '" +
									e +
									"'. This module has not been resolved completely yet."
							);
						if (i.error) throw i.error;
						return i.exports;
					}),
					(s.prototype.configure = function (t, n) {
						var r = this._config.shouldRecordStats();
						(this._config = n
							? new e.Configuration(this._env, t)
							: this._config.cloneAndMerge(t)),
							this._config.shouldRecordStats() && !r && (this._recorder = null);
					}),
					(s.prototype.getConfig = function () {
						return this._config;
					}),
					(s.prototype._onLoad = function (e) {
						if (null !== this._currentAnnonymousDefineCall) {
							var t = this._currentAnnonymousDefineCall;
							(this._currentAnnonymousDefineCall = null),
								this.defineModule(
									this._moduleIdProvider.getStrModuleId(e),
									t.dependencies,
									t.callback,
									null,
									t.stack
								);
						}
					}),
					(s.prototype._createLoadError = function (t, n) {
						var r = this,
							i = this._moduleIdProvider.getStrModuleId(t),
							o = (this._inverseDependencies2[t] || []).map(function (e) {
								return r._moduleIdProvider.getStrModuleId(e);
							}),
							s = e.ensureError(n);
						return (s.phase = "loading"), (s.moduleId = i), (s.neededBy = o), s;
					}),
					(s.prototype._onLoadError = function (e, t) {
						var r = this._createLoadError(e, t);
						this._modules2[e] ||
							(this._modules2[e] = new n(
								e,
								this._moduleIdProvider.getStrModuleId(e),
								[],
								function () {},
								function () {},
								null
							));
						for (
							var i = [], o = 0, s = this._moduleIdProvider.getMaxModuleId();
							o < s;
							o++
						)
							i[o] = !1;
						var u = !1,
							a = [];
						for (a.push(e), i[e] = !0; a.length > 0; ) {
							var l = a.shift(),
								c = this._modules2[l];
							c && (u = c.onDependencyError(r) || u);
							var d = this._inverseDependencies2[l];
							if (d)
								for (o = 0, s = d.length; o < s; o++) {
									var f = d[o];
									i[f] || (a.push(f), (i[f] = !0));
								}
						}
						u || this._config.onError(r);
					}),
					(s.prototype._hasDependencyPath = function (e, t) {
						var n = this._modules2[e];
						if (!n) return !1;
						for (
							var r = [], i = 0, o = this._moduleIdProvider.getMaxModuleId();
							i < o;
							i++
						)
							r[i] = !1;
						var s = [];
						for (s.push(n), r[e] = !0; s.length > 0; ) {
							var u = s.shift().dependencies;
							if (u)
								for (i = 0, o = u.length; i < o; i++) {
									var a = u[i];
									if (a.id === t) return !0;
									var l = this._modules2[a.id];
									l && !r[a.id] && ((r[a.id] = !0), s.push(l));
								}
						}
						return !1;
					}),
					(s.prototype._findCyclePath = function (e, t, n) {
						if (e === t || 50 === n) return [e];
						var r = this._modules2[e];
						if (!r) return null;
						var i = r.dependencies;
						if (i)
							for (var o = 0, s = i.length; o < s; o++) {
								var u = this._findCyclePath(i[o].id, t, n + 1);
								if (null !== u) return u.push(e), u;
							}
						return null;
					}),
					(s.prototype._createRequire = function (t) {
						var n = this,
							r = function (e, r, i) {
								return n._relativeRequire(t, e, r, i);
							};
						return (
							(r.toUrl = function (e) {
								return n._config.requireToUrl(t.resolveModule(e));
							}),
							(r.getStats = function () {
								return n.getLoaderEvents();
							}),
							(r.__$__nodeRequire = e.global.nodeRequire),
							r
						);
					}),
					(s.prototype._loadModule = function (e) {
						var t = this;
						if (!this._modules2[e] && !this._knownModules2[e]) {
							this._knownModules2[e] = !0;
							var n = this._moduleIdProvider.getStrModuleId(e),
								r = this._config.moduleIdToPaths(n);
							this._env.isNode &&
								(-1 === n.indexOf("/") || /^@[^\/]+\/[^\/]+$/.test(n)) &&
								r.push("node|" + n);
							var i = -1,
								o = function (n) {
									if (++i >= r.length) t._onLoadError(e, n);
									else {
										var s = r[i],
											u = t.getRecorder();
										if (t._config.isBuild() && "empty:" === s)
											return (
												(t._buildInfoPath[e] = s),
												t.defineModule(
													t._moduleIdProvider.getStrModuleId(e),
													[],
													null,
													null,
													null
												),
												void t._onLoad(e)
											);
										u.record(10, s),
											t._scriptLoader.load(
												t,
												s,
												function () {
													t._config.isBuild() && (t._buildInfoPath[e] = s),
														u.record(11, s),
														t._onLoad(e);
												},
												function (e) {
													u.record(12, s), o(e);
												}
											);
									}
								};
							o(null);
						}
					}),
					(s.prototype._loadPluginDependency = function (e, n) {
						var r = this;
						if (!this._modules2[n.id] && !this._knownModules2[n.id]) {
							this._knownModules2[n.id] = !0;
							var i = function (e) {
								r.defineModule(
									r._moduleIdProvider.getStrModuleId(n.id),
									[],
									e,
									null,
									null
								);
							};
							(i.error = function (e) {
								r._config.onError(r._createLoadError(n.id, e));
							}),
								e.load(
									n.pluginParam,
									this._createRequire(t.ROOT),
									i,
									this._config.getOptionsLiteral()
								);
						}
					}),
					(s.prototype._resolve = function (e) {
						var t = this,
							n = e.dependencies;
						if (n)
							for (var r = 0, s = n.length; r < s; r++) {
								var u = n[r];
								if (u !== i.EXPORTS)
									if (u !== i.MODULE)
										if (u !== i.REQUIRE) {
											var a = this._modules2[u.id];
											if (a && a.isComplete()) {
												if (a.error) return void e.onDependencyError(a.error);
												e.unresolvedDependenciesCount--;
											} else if (this._hasDependencyPath(u.id, e.id)) {
												console.warn(
													"There is a dependency cycle between '" +
														this._moduleIdProvider.getStrModuleId(u.id) +
														"' and '" +
														this._moduleIdProvider.getStrModuleId(e.id) +
														"'. The cyclic path follows:"
												);
												var l = this._findCyclePath(u.id, e.id, 0) || [];
												l.reverse(),
													l.push(u.id),
													console.warn(
														l
															.map(function (e) {
																return t._moduleIdProvider.getStrModuleId(e);
															})
															.join(" => \n")
													),
													e.unresolvedDependenciesCount--;
											} else if (
												((this._inverseDependencies2[u.id] =
													this._inverseDependencies2[u.id] || []),
												this._inverseDependencies2[u.id].push(e.id),
												u instanceof o)
											) {
												var c = this._modules2[u.pluginId];
												if (c && c.isComplete()) {
													this._loadPluginDependency(c.exports, u);
													continue;
												}
												var d = this._inversePluginDependencies2.get(
													u.pluginId
												);
												d ||
													((d = []),
													this._inversePluginDependencies2.set(u.pluginId, d)),
													d.push(u),
													this._loadModule(u.pluginId);
											} else this._loadModule(u.id);
										} else e.unresolvedDependenciesCount--;
									else e.unresolvedDependenciesCount--;
								else (e.exportsPassedIn = !0), e.unresolvedDependenciesCount--;
							}
						0 === e.unresolvedDependenciesCount && this._onModuleComplete(e);
					}),
					(s.prototype._onModuleComplete = function (e) {
						var t = this,
							n = this.getRecorder();
						if (!e.isComplete()) {
							var r = e.dependencies,
								o = [];
							if (r)
								for (var s = 0, u = r.length; s < u; s++) {
									var a = r[s];
									if (a !== i.EXPORTS)
										if (a !== i.MODULE)
											if (a !== i.REQUIRE) {
												var l = this._modules2[a.id];
												o[s] = l ? l.exports : null;
											} else o[s] = this._createRequire(e.moduleIdResolver);
										else
											o[s] = {
												id: e.strId,
												config: function () {
													return t._config.getConfigForModule(e.strId);
												},
											};
									else o[s] = e.exports;
								}
							e.complete(n, this._config, o);
							var c = this._inverseDependencies2[e.id];
							if (((this._inverseDependencies2[e.id] = null), c))
								for (s = 0, u = c.length; s < u; s++) {
									var d = c[s],
										f = this._modules2[d];
									f.unresolvedDependenciesCount--,
										0 === f.unresolvedDependenciesCount &&
											this._onModuleComplete(f);
								}
							var h = this._inversePluginDependencies2.get(e.id);
							if (h) {
								this._inversePluginDependencies2.delete(e.id);
								for (s = 0, u = h.length; s < u; s++)
									this._loadPluginDependency(e.exports, h[s]);
							}
						}
					}),
					s
				);
			})();
			e.ModuleManager = s;
		})(t || (t = {})),
		(function (t) {
			var n = new t.Environment(),
				r = null,
				i = function (e, t, n) {
					"string" != typeof e && ((n = t), (t = e), (e = null)),
						("object" == typeof t && Array.isArray(t)) || ((n = t), (t = null)),
						t || (t = ["require", "exports", "module"]),
						e
							? r.defineModule(e, t, n, null, null)
							: r.enqueueDefineAnonymousModule(t, n);
				};
			i.amd = { jQuery: !0 };
			var o = function (e, t) {
					void 0 === t && (t = !1), r.configure(e, t);
				},
				s = function () {
					if (1 === arguments.length) {
						if (arguments[0] instanceof Object && !Array.isArray(arguments[0]))
							return void o(arguments[0]);
						if ("string" == typeof arguments[0])
							return r.synchronousRequire(arguments[0]);
					}
					if (
						(2 !== arguments.length && 3 !== arguments.length) ||
						!Array.isArray(arguments[0])
					)
						throw new Error("Unrecognized require call");
					r.defineModule(
						t.Utilities.generateAnonymousModule(),
						arguments[0],
						arguments[1],
						arguments[2],
						null
					);
				};
			function u() {
				if (void 0 !== t.global.require || "undefined" != typeof require) {
					var e = t.global.require || require;
					if ("function" == typeof e && "function" == typeof e.resolve) {
						var o = function (t) {
							r.getRecorder().record(33, t);
							try {
								return e(t);
							} finally {
								r.getRecorder().record(34, t);
							}
						};
						(t.global.nodeRequire = o),
							(s.nodeRequire = o),
							(s.__$__nodeRequire = o);
					}
				}
				n.isNode && !n.isElectronRenderer
					? ((module.exports = s), (require = s))
					: (n.isElectronRenderer || (t.global.define = i),
					  (t.global.require = s));
			}
			(s.config = o),
				(s.getConfig = function () {
					return r.getConfig().getOptionsLiteral();
				}),
				(s.reset = function () {
					r = r.reset();
				}),
				(s.getBuildInfo = function () {
					return r.getBuildInfo();
				}),
				(s.getStats = function () {
					return r.getLoaderEvents();
				}),
				(s.define = function () {
					return i.apply(null, arguments);
				}),
				(t.init = u),
				("function" == typeof t.global.define && t.global.define.amd) ||
					((r = new t.ModuleManager(
						n,
						t.createScriptLoader(n),
						i,
						s,
						t.Utilities.getHighPerformanceTimestamp()
					)),
					void 0 !== t.global.require &&
						"function" != typeof t.global.require &&
						s.config(t.global.require),
					((e = function () {
						return i.apply(null, arguments);
					}).amd = i.amd),
					"undefined" == typeof doNotInitLoader && u());
		})(t || (t = {})),
		e(n[13], r([0, 1]), function (e, t) {
			"use strict";
			function n(e, t) {
				return (
					(function e(t, n, r, i, o) {
						if (i <= r) return;
						var s = (r + (i - r) / 2) | 0;
						e(t, n, r, s, o);
						e(t, n, s + 1, i, o);
						if (n(t[s], t[s + 1]) <= 0) return;
						!(function (e, t, n, r, i, o) {
							for (var s = n, u = r + 1, a = n; a <= i; a++) o[a] = e[a];
							for (a = n; a <= i; a++)
								s > r
									? (e[a] = o[u++])
									: u > i
									? (e[a] = o[s++])
									: t(o[u], o[s]) < 0
									? (e[a] = o[u++])
									: (e[a] = o[s++]);
						})(t, n, r, s, i, o);
					})(e, t, 0, e.length - 1, []),
					e
				);
			}
			function r(e, t) {
				for (var n = 0; n < e.length; n++) {
					if (t(e[n])) return n;
				}
				return -1;
			}
			Object.defineProperty(t, "__esModule", { value: !0 }),
				(t.tail = function (e, t) {
					return void 0 === t && (t = 0), e[e.length - (1 + t)];
				}),
				(t.tail2 = function (e) {
					if (0 === e.length) throw new Error("Invalid tail call");
					return [e.slice(0, e.length - 1), e[e.length - 1]];
				}),
				(t.equals = function (e, t, n) {
					if (
						(void 0 === n &&
							(n = function (e, t) {
								return e === t;
							}),
						e === t)
					)
						return !0;
					if (!e || !t) return !1;
					if (e.length !== t.length) return !1;
					for (var r = 0, i = e.length; r < i; r++)
						if (!n(e[r], t[r])) return !1;
					return !0;
				}),
				(t.binarySearch = function (e, t, n) {
					for (var r = 0, i = e.length - 1; r <= i; ) {
						var o = ((r + i) / 2) | 0,
							s = n(e[o], t);
						if (s < 0) r = o + 1;
						else {
							if (!(s > 0)) return o;
							i = o - 1;
						}
					}
					return -(r + 1);
				}),
				(t.findFirstInSorted = function (e, t) {
					var n = 0,
						r = e.length;
					if (0 === r) return 0;
					for (; n < r; ) {
						var i = Math.floor((n + r) / 2);
						t(e[i]) ? (r = i) : (n = i + 1);
					}
					return n;
				}),
				(t.mergeSort = n),
				(t.groupBy = function (e, t) {
					for (
						var r = [], i = void 0, o = 0, s = n(e.slice(0), t);
						o < s.length;
						o++
					) {
						var u = s[o];
						i && 0 === t(i[0], u) ? i.push(u) : ((i = [u]), r.push(i));
					}
					return r;
				}),
				(t.coalesce = function (e) {
					return e.filter(function (e) {
						return !!e;
					});
				}),
				(t.isFalsyOrEmpty = function (e) {
					return !Array.isArray(e) || 0 === e.length;
				}),
				(t.isNonEmptyArray = function (e) {
					return Array.isArray(e) && e.length > 0;
				}),
				(t.distinct = function (e, t) {
					if (!t)
						return e.filter(function (t, n) {
							return e.indexOf(t) === n;
						});
					var n = Object.create(null);
					return e.filter(function (e) {
						var r = t(e);
						return !n[r] && ((n[r] = !0), !0);
					});
				}),
				(t.distinctES6 = function (e) {
					var t = new Set();
					return e.filter(function (e) {
						return !t.has(e) && (t.add(e), !0);
					});
				}),
				(t.fromSet = function (e) {
					var t = [];
					return (
						e.forEach(function (e) {
							return t.push(e);
						}),
						t
					);
				}),
				(t.firstIndex = r),
				(t.first = function (e, t, n) {
					void 0 === n && (n = void 0);
					var i = r(e, t);
					return i < 0 ? n : e[i];
				}),
				(t.firstOrDefault = function (e, t) {
					return e.length > 0 ? e[0] : t;
				}),
				(t.flatten = function (e) {
					var t;
					return (t = []).concat.apply(t, e);
				}),
				(t.range = function (e, t) {
					var n = "number" == typeof t ? e : 0;
					"number" == typeof t ? (n = e) : ((n = 0), (t = e));
					var r = [];
					if (n <= t) for (var i = n; i < t; i++) r.push(i);
					else for (i = n; i > t; i--) r.push(i);
					return r;
				}),
				(t.arrayInsert = function (e, t, n) {
					var r = e.slice(0, t),
						i = e.slice(t);
					return r.concat(n, i);
				}),
				(t.pushToStart = function (e, t) {
					var n = e.indexOf(t);
					n > -1 && (e.splice(n, 1), e.unshift(t));
				}),
				(t.pushToEnd = function (e, t) {
					var n = e.indexOf(t);
					n > -1 && (e.splice(n, 1), e.push(t));
				}),
				(t.find = function (e, t) {
					for (var n = 0; n < e.length; n++) {
						var r = e[n];
						if (t(r, n, e)) return r;
					}
				}),
				(t.asArray = function (e) {
					return Array.isArray(e) ? e : [e];
				});
		}),
		e(n[14], r([0, 1]), function (e, t) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var n = (function () {
				function e(e, t, n, r) {
					(this.originalStart = e),
						(this.originalLength = t),
						(this.modifiedStart = n),
						(this.modifiedLength = r);
				}
				return (
					(e.prototype.getOriginalEnd = function () {
						return this.originalStart + this.originalLength;
					}),
					(e.prototype.getModifiedEnd = function () {
						return this.modifiedStart + this.modifiedLength;
					}),
					e
				);
			})();
			t.DiffChange = n;
		}),
		e(n[3], r([0, 1]), function (e, t) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var n = (function () {
				function e() {
					(this.listeners = []),
						(this.unexpectedErrorHandler = function (e) {
							setTimeout(function () {
								if (e.stack) throw new Error(e.message + "\n\n" + e.stack);
								throw e;
							}, 0);
						});
				}
				return (
					(e.prototype.emit = function (e) {
						this.listeners.forEach(function (t) {
							t(e);
						});
					}),
					(e.prototype.onUnexpectedError = function (e) {
						this.unexpectedErrorHandler(e), this.emit(e);
					}),
					(e.prototype.onUnexpectedExternalError = function (e) {
						this.unexpectedErrorHandler(e);
					}),
					e
				);
			})();
			(t.ErrorHandler = n),
				(t.errorHandler = new n()),
				(t.onUnexpectedError = function (e) {
					i(e) || t.errorHandler.onUnexpectedError(e);
				}),
				(t.onUnexpectedExternalError = function (e) {
					i(e) || t.errorHandler.onUnexpectedExternalError(e);
				}),
				(t.transformErrorForSerialization = function (e) {
					return e instanceof Error
						? {
								$isError: !0,
								name: e.name,
								message: e.message,
								stack: e.stacktrace || e.stack,
						  }
						: e;
				});
			var r = "Canceled";
			function i(e) {
				return e instanceof Error && e.name === r && e.message === r;
			}
			(t.isPromiseCanceledError = i),
				(t.canceled = function () {
					var e = new Error(r);
					return (e.name = e.message), e;
				}),
				(t.illegalArgument = function (e) {
					return e
						? new Error("Illegal argument: " + e)
						: new Error("Illegal argument");
				}),
				(t.illegalState = function (e) {
					return e
						? new Error("Illegal state: " + e)
						: new Error("Illegal state");
				});
		}),
		e(n[15], r([0, 1]), function (e, t) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 }),
				(t.once = function (e) {
					var t,
						n = this,
						r = !1;
					return function () {
						return r ? t : ((r = !0), (t = e.apply(n, arguments)));
					};
				});
		}),
		e(n[16], r([0, 1]), function (e, t) {
			"use strict";
			function n(e, t) {
				switch ((void 0 === t && (t = 0), typeof e)) {
					case "object":
						return null === e
							? r(349, t)
							: Array.isArray(e)
							? ((o = e),
							  (s = r(104579, (s = t))),
							  o.reduce(function (e, t) {
									return n(t, e);
							  }, s))
							: (function (e, t) {
									return (
										(t = r(181387, t)),
										Object.keys(e)
											.sort()
											.reduce(function (t, r) {
												return (t = i(r, t)), n(e[r], t);
											}, t)
									);
							  })(e, t);
					case "string":
						return i(e, t);
					case "boolean":
						return (function (e, t) {
							return r(e ? 433 : 863, t);
						})(e, t);
					case "number":
						return r(e, t);
					case "undefined":
						return r(0, 937);
					default:
						return r(0, 617);
				}
				var o, s;
			}
			function r(e, t) {
				return ((t << 5) - t + e) | 0;
			}
			function i(e, t) {
				t = r(149417, t);
				for (var n = 0, i = e.length; n < i; n++) t = r(e.charCodeAt(n), t);
				return t;
			}
			Object.defineProperty(t, "__esModule", { value: !0 }),
				(t.hash = n),
				(t.stringHash = i);
		}),
		e(n[6], r([0, 1, 14, 16]), function (e, t, n, r) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var i = (function () {
				function e(e) {
					this.source = e;
				}
				return (
					(e.prototype.getElements = function () {
						for (
							var e = this.source,
								t = new Int32Array(e.length),
								n = 0,
								r = e.length;
							n < r;
							n++
						)
							t[n] = e.charCodeAt(n);
						return t;
					}),
					e
				);
			})();
			(t.StringDiffSequence = i),
				(t.stringDiff = function (e, t, n) {
					return new a(new i(e), new i(t)).ComputeDiff(n).changes;
				});
			var o = (function () {
				function e() {}
				return (
					(e.Assert = function (e, t) {
						if (!e) throw new Error(t);
					}),
					e
				);
			})();
			t.Debug = o;
			var s = (function () {
				function e() {}
				return (
					(e.Copy = function (e, t, n, r, i) {
						for (var o = 0; o < i; o++) n[r + o] = e[t + o];
					}),
					(e.Copy2 = function (e, t, n, r, i) {
						for (var o = 0; o < i; o++) n[r + o] = e[t + o];
					}),
					e
				);
			})();
			t.MyArray = s;
			var u = (function () {
					function e() {
						(this.m_changes = []),
							(this.m_originalStart = 1073741824),
							(this.m_modifiedStart = 1073741824),
							(this.m_originalCount = 0),
							(this.m_modifiedCount = 0);
					}
					return (
						(e.prototype.MarkNextChange = function () {
							(this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
								this.m_changes.push(
									new n.DiffChange(
										this.m_originalStart,
										this.m_originalCount,
										this.m_modifiedStart,
										this.m_modifiedCount
									)
								),
								(this.m_originalCount = 0),
								(this.m_modifiedCount = 0),
								(this.m_originalStart = 1073741824),
								(this.m_modifiedStart = 1073741824);
						}),
						(e.prototype.AddOriginalElement = function (e, t) {
							(this.m_originalStart = Math.min(this.m_originalStart, e)),
								(this.m_modifiedStart = Math.min(this.m_modifiedStart, t)),
								this.m_originalCount++;
						}),
						(e.prototype.AddModifiedElement = function (e, t) {
							(this.m_originalStart = Math.min(this.m_originalStart, e)),
								(this.m_modifiedStart = Math.min(this.m_modifiedStart, t)),
								this.m_modifiedCount++;
						}),
						(e.prototype.getChanges = function () {
							return (
								(this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
									this.MarkNextChange(),
								this.m_changes
							);
						}),
						(e.prototype.getReverseChanges = function () {
							return (
								(this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
									this.MarkNextChange(),
								this.m_changes.reverse(),
								this.m_changes
							);
						}),
						e
					);
				})(),
				a = (function () {
					function e(t, n, r) {
						void 0 === r && (r = null), (this.ContinueProcessingPredicate = r);
						var i = e._getElements(t),
							o = i[0],
							s = i[1],
							u = i[2],
							a = e._getElements(n),
							l = a[0],
							c = a[1],
							d = a[2];
						(this._hasStrings = u && d),
							(this._originalStringElements = o),
							(this._originalElementsOrHash = s),
							(this._modifiedStringElements = l),
							(this._modifiedElementsOrHash = c),
							(this.m_forwardHistory = []),
							(this.m_reverseHistory = []);
					}
					return (
						(e._isStringArray = function (e) {
							return e.length > 0 && "string" == typeof e[0];
						}),
						(e._getElements = function (t) {
							var n = t.getElements();
							if (e._isStringArray(n)) {
								for (
									var i = new Int32Array(n.length), o = 0, s = n.length;
									o < s;
									o++
								)
									i[o] = r.stringHash(n[o], 0);
								return [n, i, !0];
							}
							return n instanceof Int32Array
								? [[], n, !1]
								: [[], new Int32Array(n), !1];
						}),
						(e.prototype.ElementsAreEqual = function (e, t) {
							return (
								this._originalElementsOrHash[e] ===
									this._modifiedElementsOrHash[t] &&
								(!this._hasStrings ||
									this._originalStringElements[e] ===
										this._modifiedStringElements[t])
							);
						}),
						(e.prototype.OriginalElementsAreEqual = function (e, t) {
							return (
								this._originalElementsOrHash[e] ===
									this._originalElementsOrHash[t] &&
								(!this._hasStrings ||
									this._originalStringElements[e] ===
										this._originalStringElements[t])
							);
						}),
						(e.prototype.ModifiedElementsAreEqual = function (e, t) {
							return (
								this._modifiedElementsOrHash[e] ===
									this._modifiedElementsOrHash[t] &&
								(!this._hasStrings ||
									this._modifiedStringElements[e] ===
										this._modifiedStringElements[t])
							);
						}),
						(e.prototype.ComputeDiff = function (e) {
							return this._ComputeDiff(
								0,
								this._originalElementsOrHash.length - 1,
								0,
								this._modifiedElementsOrHash.length - 1,
								e
							);
						}),
						(e.prototype._ComputeDiff = function (e, t, n, r, i) {
							var o = [!1],
								s = this.ComputeDiffRecursive(e, t, n, r, o);
							return (
								i && (s = this.PrettifyChanges(s)),
								{ quitEarly: o[0], changes: s }
							);
						}),
						(e.prototype.ComputeDiffRecursive = function (e, t, r, i, s) {
							for (s[0] = !1; e <= t && r <= i && this.ElementsAreEqual(e, r); )
								e++, r++;
							for (; t >= e && i >= r && this.ElementsAreEqual(t, i); )
								t--, i--;
							if (e > t || r > i) {
								var u = void 0;
								return (
									r <= i
										? (o.Assert(
												e === t + 1,
												"originalStart should only be one more than originalEnd"
										  ),
										  (u = [new n.DiffChange(e, 0, r, i - r + 1)]))
										: e <= t
										? (o.Assert(
												r === i + 1,
												"modifiedStart should only be one more than modifiedEnd"
										  ),
										  (u = [new n.DiffChange(e, t - e + 1, r, 0)]))
										: (o.Assert(
												e === t + 1,
												"originalStart should only be one more than originalEnd"
										  ),
										  o.Assert(
												r === i + 1,
												"modifiedStart should only be one more than modifiedEnd"
										  ),
										  (u = [])),
									u
								);
							}
							var a = [0],
								l = [0],
								c = this.ComputeRecursionPoint(e, t, r, i, a, l, s),
								d = a[0],
								f = l[0];
							if (null !== c) return c;
							if (!s[0]) {
								var h = this.ComputeDiffRecursive(e, d, r, f, s),
									p = [];
								return (
									(p = s[0]
										? [
												new n.DiffChange(
													d + 1,
													t - (d + 1) + 1,
													f + 1,
													i - (f + 1) + 1
												),
										  ]
										: this.ComputeDiffRecursive(d + 1, t, f + 1, i, s)),
									this.ConcatenateChanges(h, p)
								);
							}
							return [new n.DiffChange(e, t - e + 1, r, i - r + 1)];
						}),
						(e.prototype.WALKTRACE = function (
							e,
							t,
							r,
							i,
							o,
							s,
							a,
							l,
							c,
							d,
							f,
							h,
							p,
							m,
							g,
							v,
							_,
							y
						) {
							var b,
								C = null,
								E = new u(),
								S = t,
								L = r,
								N = p[0] - v[0] - i,
								M = -1073741824,
								w = this.m_forwardHistory.length - 1;
							do {
								(P = N + e) === S || (P < L && c[P - 1] < c[P + 1])
									? ((m = (f = c[P + 1]) - N - i),
									  f < M && E.MarkNextChange(),
									  (M = f),
									  E.AddModifiedElement(f + 1, m),
									  (N = P + 1 - e))
									: ((m = (f = c[P - 1] + 1) - N - i),
									  f < M && E.MarkNextChange(),
									  (M = f - 1),
									  E.AddOriginalElement(f, m + 1),
									  (N = P - 1 - e)),
									w >= 0 &&
										((e = (c = this.m_forwardHistory[w])[0]),
										(S = 1),
										(L = c.length - 1));
							} while (--w >= -1);
							if (((b = E.getReverseChanges()), y[0])) {
								var A = p[0] + 1,
									I = v[0] + 1;
								if (null !== b && b.length > 0) {
									var D = b[b.length - 1];
									(A = Math.max(A, D.getOriginalEnd())),
										(I = Math.max(I, D.getModifiedEnd()));
								}
								C = [new n.DiffChange(A, h - A + 1, I, g - I + 1)];
							} else {
								(E = new u()),
									(S = s),
									(L = a),
									(N = p[0] - v[0] - l),
									(M = 1073741824),
									(w = _
										? this.m_reverseHistory.length - 1
										: this.m_reverseHistory.length - 2);
								do {
									var P;
									(P = N + o) === S || (P < L && d[P - 1] >= d[P + 1])
										? ((m = (f = d[P + 1] - 1) - N - l),
										  f > M && E.MarkNextChange(),
										  (M = f + 1),
										  E.AddOriginalElement(f + 1, m + 1),
										  (N = P + 1 - o))
										: ((m = (f = d[P - 1]) - N - l),
										  f > M && E.MarkNextChange(),
										  (M = f),
										  E.AddModifiedElement(f + 1, m + 1),
										  (N = P - 1 - o)),
										w >= 0 &&
											((o = (d = this.m_reverseHistory[w])[0]),
											(S = 1),
											(L = d.length - 1));
								} while (--w >= -1);
								C = E.getChanges();
							}
							return this.ConcatenateChanges(b, C);
						}),
						(e.prototype.ComputeRecursionPoint = function (
							e,
							t,
							r,
							i,
							o,
							u,
							a
						) {
							var l = 0,
								c = 0,
								d = 0,
								f = 0,
								h = 0,
								p = 0;
							e--,
								r--,
								(o[0] = 0),
								(u[0] = 0),
								(this.m_forwardHistory = []),
								(this.m_reverseHistory = []);
							var m = t - e + (i - r),
								g = m + 1,
								v = new Int32Array(g),
								_ = new Int32Array(g),
								y = i - r,
								b = t - e,
								C = e - r,
								E = t - i,
								S = (b - y) % 2 == 0;
							(v[y] = e), (_[b] = t), (a[0] = !1);
							for (var L = 1; L <= m / 2 + 1; L++) {
								var N = 0,
									M = 0;
								(d = this.ClipDiagonalBound(y - L, L, y, g)),
									(f = this.ClipDiagonalBound(y + L, L, y, g));
								for (var w = d; w <= f; w += 2) {
									c =
										(l =
											w === d || (w < f && v[w - 1] < v[w + 1])
												? v[w + 1]
												: v[w - 1] + 1) -
										(w - y) -
										C;
									for (
										var A = l;
										l < t && c < i && this.ElementsAreEqual(l + 1, c + 1);

									)
										l++, c++;
									if (
										((v[w] = l),
										l + c > N + M && ((N = l), (M = c)),
										!S && Math.abs(w - b) <= L - 1 && l >= _[w])
									)
										return (
											(o[0] = l),
											(u[0] = c),
											A <= _[w] && L <= 1448
												? this.WALKTRACE(
														y,
														d,
														f,
														C,
														b,
														h,
														p,
														E,
														v,
														_,
														l,
														t,
														o,
														c,
														i,
														u,
														S,
														a
												  )
												: null
										);
								}
								var I = (N - e + (M - r) - L) / 2;
								if (
									null !== this.ContinueProcessingPredicate &&
									!this.ContinueProcessingPredicate(N, I)
								)
									return (
										(a[0] = !0),
										(o[0] = N),
										(u[0] = M),
										I > 0 && L <= 1448
											? this.WALKTRACE(
													y,
													d,
													f,
													C,
													b,
													h,
													p,
													E,
													v,
													_,
													l,
													t,
													o,
													c,
													i,
													u,
													S,
													a
											  )
											: (e++,
											  r++,
											  [new n.DiffChange(e, t - e + 1, r, i - r + 1)])
									);
								(h = this.ClipDiagonalBound(b - L, L, b, g)),
									(p = this.ClipDiagonalBound(b + L, L, b, g));
								for (w = h; w <= p; w += 2) {
									c =
										(l =
											w === h || (w < p && _[w - 1] >= _[w + 1])
												? _[w + 1] - 1
												: _[w - 1]) -
										(w - b) -
										E;
									for (A = l; l > e && c > r && this.ElementsAreEqual(l, c); )
										l--, c--;
									if (((_[w] = l), S && Math.abs(w - y) <= L && l <= v[w]))
										return (
											(o[0] = l),
											(u[0] = c),
											A >= v[w] && L <= 1448
												? this.WALKTRACE(
														y,
														d,
														f,
														C,
														b,
														h,
														p,
														E,
														v,
														_,
														l,
														t,
														o,
														c,
														i,
														u,
														S,
														a
												  )
												: null
										);
								}
								if (L <= 1447) {
									var D = new Int32Array(f - d + 2);
									(D[0] = y - d + 1),
										s.Copy2(v, d, D, 1, f - d + 1),
										this.m_forwardHistory.push(D),
										((D = new Int32Array(p - h + 2))[0] = b - h + 1),
										s.Copy2(_, h, D, 1, p - h + 1),
										this.m_reverseHistory.push(D);
								}
							}
							return this.WALKTRACE(
								y,
								d,
								f,
								C,
								b,
								h,
								p,
								E,
								v,
								_,
								l,
								t,
								o,
								c,
								i,
								u,
								S,
								a
							);
						}),
						(e.prototype.PrettifyChanges = function (e) {
							for (var t = 0; t < e.length; t++) {
								for (
									var n = e[t],
										r =
											t < e.length - 1
												? e[t + 1].originalStart
												: this._originalElementsOrHash.length,
										i =
											t < e.length - 1
												? e[t + 1].modifiedStart
												: this._modifiedElementsOrHash.length,
										o = n.originalLength > 0,
										s = n.modifiedLength > 0;
									n.originalStart + n.originalLength < r &&
									n.modifiedStart + n.modifiedLength < i &&
									(!o ||
										this.OriginalElementsAreEqual(
											n.originalStart,
											n.originalStart + n.originalLength
										)) &&
									(!s ||
										this.ModifiedElementsAreEqual(
											n.modifiedStart,
											n.modifiedStart + n.modifiedLength
										));

								)
									n.originalStart++, n.modifiedStart++;
								var u = [null];
								t < e.length - 1 &&
									this.ChangesOverlap(e[t], e[t + 1], u) &&
									((e[t] = u[0]), e.splice(t + 1, 1), t--);
							}
							for (t = e.length - 1; t >= 0; t--) {
								(n = e[t]), (r = 0), (i = 0);
								if (t > 0) {
									var a = e[t - 1];
									a.originalLength > 0 &&
										(r = a.originalStart + a.originalLength),
										a.modifiedLength > 0 &&
											(i = a.modifiedStart + a.modifiedLength);
								}
								(o = n.originalLength > 0), (s = n.modifiedLength > 0);
								for (
									var l = 0,
										c = this._boundaryScore(
											n.originalStart,
											n.originalLength,
											n.modifiedStart,
											n.modifiedLength
										),
										d = 1;
									;
									d++
								) {
									var f = n.originalStart - d,
										h = n.modifiedStart - d;
									if (f < r || h < i) break;
									if (
										o &&
										!this.OriginalElementsAreEqual(f, f + n.originalLength)
									)
										break;
									if (
										s &&
										!this.ModifiedElementsAreEqual(h, h + n.modifiedLength)
									)
										break;
									var p = this._boundaryScore(
										f,
										n.originalLength,
										h,
										n.modifiedLength
									);
									p > c && ((c = p), (l = d));
								}
								(n.originalStart -= l), (n.modifiedStart -= l);
							}
							return e;
						}),
						(e.prototype._OriginalIsBoundary = function (e) {
							return (
								e <= 0 ||
								e >= this._originalElementsOrHash.length - 1 ||
								(this._hasStrings &&
									/^\s*$/.test(this._originalStringElements[e]))
							);
						}),
						(e.prototype._OriginalRegionIsBoundary = function (e, t) {
							if (
								this._OriginalIsBoundary(e) ||
								this._OriginalIsBoundary(e - 1)
							)
								return !0;
							if (t > 0) {
								var n = e + t;
								if (
									this._OriginalIsBoundary(n - 1) ||
									this._OriginalIsBoundary(n)
								)
									return !0;
							}
							return !1;
						}),
						(e.prototype._ModifiedIsBoundary = function (e) {
							return (
								e <= 0 ||
								e >= this._modifiedElementsOrHash.length - 1 ||
								(this._hasStrings &&
									/^\s*$/.test(this._modifiedStringElements[e]))
							);
						}),
						(e.prototype._ModifiedRegionIsBoundary = function (e, t) {
							if (
								this._ModifiedIsBoundary(e) ||
								this._ModifiedIsBoundary(e - 1)
							)
								return !0;
							if (t > 0) {
								var n = e + t;
								if (
									this._ModifiedIsBoundary(n - 1) ||
									this._ModifiedIsBoundary(n)
								)
									return !0;
							}
							return !1;
						}),
						(e.prototype._boundaryScore = function (e, t, n, r) {
							return (
								(this._OriginalRegionIsBoundary(e, t) ? 1 : 0) +
								(this._ModifiedRegionIsBoundary(n, r) ? 1 : 0)
							);
						}),
						(e.prototype.ConcatenateChanges = function (e, t) {
							var n = [];
							if (0 === e.length || 0 === t.length) return t.length > 0 ? t : e;
							if (this.ChangesOverlap(e[e.length - 1], t[0], n)) {
								var r = new Array(e.length + t.length - 1);
								return (
									s.Copy(e, 0, r, 0, e.length - 1),
									(r[e.length - 1] = n[0]),
									s.Copy(t, 1, r, e.length, t.length - 1),
									r
								);
							}
							r = new Array(e.length + t.length);
							return (
								s.Copy(e, 0, r, 0, e.length),
								s.Copy(t, 0, r, e.length, t.length),
								r
							);
						}),
						(e.prototype.ChangesOverlap = function (e, t, r) {
							if (
								(o.Assert(
									e.originalStart <= t.originalStart,
									"Left change is not less than or equal to right change"
								),
								o.Assert(
									e.modifiedStart <= t.modifiedStart,
									"Left change is not less than or equal to right change"
								),
								e.originalStart + e.originalLength >= t.originalStart ||
									e.modifiedStart + e.modifiedLength >= t.modifiedStart)
							) {
								var i = e.originalStart,
									s = e.originalLength,
									u = e.modifiedStart,
									a = e.modifiedLength;
								return (
									e.originalStart + e.originalLength >= t.originalStart &&
										(s = t.originalStart + t.originalLength - e.originalStart),
									e.modifiedStart + e.modifiedLength >= t.modifiedStart &&
										(a = t.modifiedStart + t.modifiedLength - e.modifiedStart),
									(r[0] = new n.DiffChange(i, s, u, a)),
									!0
								);
							}
							return (r[0] = null), !1;
						}),
						(e.prototype.ClipDiagonalBound = function (e, t, n, r) {
							if (e >= 0 && e < r) return e;
							var i = t % 2 == 0;
							return e < 0
								? i === (n % 2 == 0)
									? 0
									: 1
								: i === ((r - n - 1) % 2 == 0)
								? r - 1
								: r - 2;
						}),
						e
					);
				})();
			t.LcsDiff = a;
		});
	var s,
		u,
		a =
			(this && this.__extends) ||
			((s = function (e, t) {
				return (s =
					Object.setPrototypeOf ||
					({ __proto__: [] } instanceof Array &&
						function (e, t) {
							e.__proto__ = t;
						}) ||
					function (e, t) {
						for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
					})(e, t);
			}),
			function (e, t) {
				function n() {
					this.constructor = e;
				}
				s(e, t),
					(e.prototype =
						null === t
							? Object.create(t)
							: ((n.prototype = t.prototype), new n()));
			});
	e(n[7], r([0, 1]), function (e, t) {
		"use strict";
		var n;
		Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.FIN = { done: !0, value: void 0 }),
			(function (e) {
				var n = {
					next: function () {
						return t.FIN;
					},
				};
				(e.empty = function () {
					return n;
				}),
					(e.single = function (e) {
						var n = !1;
						return {
							next: function () {
								return n ? t.FIN : ((n = !0), { done: !1, value: e });
							},
						};
					}),
					(e.fromArray = function (e, n, r) {
						return (
							void 0 === n && (n = 0),
							void 0 === r && (r = e.length),
							{
								next: function () {
									return n >= r ? t.FIN : { done: !1, value: e[n++] };
								},
							}
						);
					}),
					(e.fromNativeIterator = function (e) {
						return {
							next: function () {
								var n = e.next();
								return n.done ? t.FIN : { done: !1, value: n.value };
							},
						};
					}),
					(e.from = function (t) {
						return t ? (Array.isArray(t) ? e.fromArray(t) : t) : e.empty();
					}),
					(e.map = function (e, n) {
						return {
							next: function () {
								var r = e.next();
								return r.done ? t.FIN : { done: !1, value: n(r.value) };
							},
						};
					}),
					(e.filter = function (e, n) {
						return {
							next: function () {
								for (;;) {
									var r = e.next();
									if (r.done) return t.FIN;
									if (n(r.value)) return { done: !1, value: r.value };
								}
							},
						};
					}),
					(e.forEach = function (e, t) {
						for (var n = e.next(); !n.done; n = e.next()) t(n.value);
					}),
					(e.collect = function (e, t) {
						void 0 === t && (t = Number.POSITIVE_INFINITY);
						var n = [];
						if (0 === t) return n;
						for (
							var r = 0, i = e.next();
							!i.done && (n.push(i.value), !(++r >= t));
							i = e.next()
						);
						return n;
					}),
					(e.concat = function () {
						for (var e = [], n = 0; n < arguments.length; n++)
							e[n] = arguments[n];
						var r = 0;
						return {
							next: function () {
								if (r >= e.length) return t.FIN;
								var n = e[r].next();
								return n.done ? (r++, this.next()) : n;
							},
						};
					}),
					(e.chain = function (e) {
						return new r(e);
					});
			})((n = t.Iterator || (t.Iterator = {})));
		var r = (function () {
			function e(e) {
				this.it = e;
			}
			return (
				(e.prototype.next = function () {
					return this.it.next();
				}),
				e
			);
		})();
		(t.ChainableIterator = r),
			(t.getSequenceIterator = function (e) {
				return Array.isArray(e) ? n.fromArray(e) : e || n.empty();
			});
		var i = (function () {
			function e(e, t, n, r) {
				void 0 === t && (t = 0),
					void 0 === n && (n = e.length),
					void 0 === r && (r = t - 1),
					(this.items = e),
					(this.start = t),
					(this.end = n),
					(this.index = r);
			}
			return (
				(e.prototype.first = function () {
					return (this.index = this.start), this.current();
				}),
				(e.prototype.next = function () {
					return (
						(this.index = Math.min(this.index + 1, this.end)), this.current()
					);
				}),
				(e.prototype.current = function () {
					return this.index === this.start - 1 || this.index === this.end
						? null
						: this.items[this.index];
				}),
				e
			);
		})();
		t.ArrayIterator = i;
		var o = (function (e) {
			function t(t, n, r, i) {
				return (
					void 0 === n && (n = 0),
					void 0 === r && (r = t.length),
					void 0 === i && (i = n - 1),
					e.call(this, t, n, r, i) || this
				);
			}
			return (
				a(t, e),
				(t.prototype.current = function () {
					return e.prototype.current.call(this);
				}),
				(t.prototype.previous = function () {
					return (
						(this.index = Math.max(this.index - 1, this.start - 1)),
						this.current()
					);
				}),
				(t.prototype.first = function () {
					return (this.index = this.start), this.current();
				}),
				(t.prototype.last = function () {
					return (this.index = this.end - 1), this.current();
				}),
				(t.prototype.parent = function () {
					return null;
				}),
				t
			);
		})(i);
		t.ArrayNavigator = o;
		var s = (function () {
			function e(e, t) {
				(this.iterator = e), (this.fn = t);
			}
			return (
				(e.prototype.next = function () {
					return this.fn(this.iterator.next());
				}),
				e
			);
		})();
		t.MappedIterator = s;
	}),
		e(n[17], r([0, 1, 3]), function (e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var r = (function () {
					function e() {
						(this._keyCodeToStr = []),
							(this._strToKeyCode = Object.create(null));
					}
					return (
						(e.prototype.define = function (e, t) {
							(this._keyCodeToStr[e] = t),
								(this._strToKeyCode[t.toLowerCase()] = e);
						}),
						(e.prototype.keyCodeToStr = function (e) {
							return this._keyCodeToStr[e];
						}),
						(e.prototype.strToKeyCode = function (e) {
							return this._strToKeyCode[e.toLowerCase()] || 0;
						}),
						e
					);
				})(),
				i = new r(),
				o = new r(),
				s = new r();
			function u(e, t) {
				var n = !!(2048 & e),
					r = !!(256 & e);
				return new a(
					2 === t ? r : n,
					!!(1024 & e),
					!!(512 & e),
					2 === t ? n : r,
					255 & e
				);
			}
			!(function () {
				function e(e, t, n, r) {
					void 0 === n && (n = t),
						void 0 === r && (r = n),
						i.define(e, t),
						o.define(e, n),
						s.define(e, r);
				}
				e(0, "unknown"),
					e(1, "Backspace"),
					e(2, "Tab"),
					e(3, "Enter"),
					e(4, "Shift"),
					e(5, "Ctrl"),
					e(6, "Alt"),
					e(7, "PauseBreak"),
					e(8, "CapsLock"),
					e(9, "Escape"),
					e(10, "Space"),
					e(11, "PageUp"),
					e(12, "PageDown"),
					e(13, "End"),
					e(14, "Home"),
					e(15, "LeftArrow", "Left"),
					e(16, "UpArrow", "Up"),
					e(17, "RightArrow", "Right"),
					e(18, "DownArrow", "Down"),
					e(19, "Insert"),
					e(20, "Delete"),
					e(21, "0"),
					e(22, "1"),
					e(23, "2"),
					e(24, "3"),
					e(25, "4"),
					e(26, "5"),
					e(27, "6"),
					e(28, "7"),
					e(29, "8"),
					e(30, "9"),
					e(31, "A"),
					e(32, "B"),
					e(33, "C"),
					e(34, "D"),
					e(35, "E"),
					e(36, "F"),
					e(37, "G"),
					e(38, "H"),
					e(39, "I"),
					e(40, "J"),
					e(41, "K"),
					e(42, "L"),
					e(43, "M"),
					e(44, "N"),
					e(45, "O"),
					e(46, "P"),
					e(47, "Q"),
					e(48, "R"),
					e(49, "S"),
					e(50, "T"),
					e(51, "U"),
					e(52, "V"),
					e(53, "W"),
					e(54, "X"),
					e(55, "Y"),
					e(56, "Z"),
					e(57, "Meta"),
					e(58, "ContextMenu"),
					e(59, "F1"),
					e(60, "F2"),
					e(61, "F3"),
					e(62, "F4"),
					e(63, "F5"),
					e(64, "F6"),
					e(65, "F7"),
					e(66, "F8"),
					e(67, "F9"),
					e(68, "F10"),
					e(69, "F11"),
					e(70, "F12"),
					e(71, "F13"),
					e(72, "F14"),
					e(73, "F15"),
					e(74, "F16"),
					e(75, "F17"),
					e(76, "F18"),
					e(77, "F19"),
					e(78, "NumLock"),
					e(79, "ScrollLock"),
					e(80, ";", ";", "OEM_1"),
					e(81, "=", "=", "OEM_PLUS"),
					e(82, ",", ",", "OEM_COMMA"),
					e(83, "-", "-", "OEM_MINUS"),
					e(84, ".", ".", "OEM_PERIOD"),
					e(85, "/", "/", "OEM_2"),
					e(86, "`", "`", "OEM_3"),
					e(110, "ABNT_C1"),
					e(111, "ABNT_C2"),
					e(87, "[", "[", "OEM_4"),
					e(88, "\\", "\\", "OEM_5"),
					e(89, "]", "]", "OEM_6"),
					e(90, "'", "'", "OEM_7"),
					e(91, "OEM_8"),
					e(92, "OEM_102"),
					e(93, "NumPad0"),
					e(94, "NumPad1"),
					e(95, "NumPad2"),
					e(96, "NumPad3"),
					e(97, "NumPad4"),
					e(98, "NumPad5"),
					e(99, "NumPad6"),
					e(100, "NumPad7"),
					e(101, "NumPad8"),
					e(102, "NumPad9"),
					e(103, "NumPad_Multiply"),
					e(104, "NumPad_Add"),
					e(105, "NumPad_Separator"),
					e(106, "NumPad_Subtract"),
					e(107, "NumPad_Decimal"),
					e(108, "NumPad_Divide");
			})(),
				(function (e) {
					(e.toString = function (e) {
						return i.keyCodeToStr(e);
					}),
						(e.fromString = function (e) {
							return i.strToKeyCode(e);
						}),
						(e.toUserSettingsUS = function (e) {
							return o.keyCodeToStr(e);
						}),
						(e.toUserSettingsGeneral = function (e) {
							return s.keyCodeToStr(e);
						}),
						(e.fromUserSettings = function (e) {
							return o.strToKeyCode(e) || s.strToKeyCode(e);
						});
				})(t.KeyCodeUtils || (t.KeyCodeUtils = {})),
				(t.KeyChord = function (e, t) {
					return (e | (((65535 & t) << 16) >>> 0)) >>> 0;
				}),
				(t.createKeybinding = function (e, t) {
					if (0 === e) return null;
					var n = (65535 & e) >>> 0,
						r = (4294901760 & e) >>> 16;
					return new l(0 !== r ? [u(n, t), u(r, t)] : [u(n, t)]);
				}),
				(t.createSimpleKeybinding = u);
			var a = (function () {
				function e(e, t, n, r, i) {
					(this.ctrlKey = e),
						(this.shiftKey = t),
						(this.altKey = n),
						(this.metaKey = r),
						(this.keyCode = i);
				}
				return (
					(e.prototype.equals = function (e) {
						return (
							this.ctrlKey === e.ctrlKey &&
							this.shiftKey === e.shiftKey &&
							this.altKey === e.altKey &&
							this.metaKey === e.metaKey &&
							this.keyCode === e.keyCode
						);
					}),
					(e.prototype.isModifierKey = function () {
						return (
							0 === this.keyCode ||
							5 === this.keyCode ||
							57 === this.keyCode ||
							6 === this.keyCode ||
							4 === this.keyCode
						);
					}),
					(e.prototype.toChord = function () {
						return new l([this]);
					}),
					(e.prototype.isDuplicateModifierCase = function () {
						return (
							(this.ctrlKey && 5 === this.keyCode) ||
							(this.shiftKey && 4 === this.keyCode) ||
							(this.altKey && 6 === this.keyCode) ||
							(this.metaKey && 57 === this.keyCode)
						);
					}),
					e
				);
			})();
			t.SimpleKeybinding = a;
			var l = (function () {
				function e(e) {
					if (0 === e.length) throw n.illegalArgument("parts");
					this.parts = e;
				}
				return (
					(e.prototype.equals = function (e) {
						if (null === e) return !1;
						if (this.parts.length !== e.parts.length) return !1;
						for (var t = 0; t < this.parts.length; t++)
							if (!this.parts[t].equals(e.parts[t])) return !1;
						return !0;
					}),
					e
				);
			})();
			t.ChordKeybinding = l;
			var c = function (e, t, n, r, i, o) {
				(this.ctrlKey = e),
					(this.shiftKey = t),
					(this.altKey = n),
					(this.metaKey = r),
					(this.keyLabel = i),
					(this.keyAriaLabel = o);
			};
			t.ResolvedKeybindingPart = c;
			var d = function () {};
			t.ResolvedKeybinding = d;
		}),
		e(n[8], r([0, 1]), function (e, t) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var n = !1,
				r = "__is_disposable_tracked__";
			function i(e) {
				if (n && e && e !== a.None)
					try {
						e[r] = !0;
					} catch (e) {}
			}
			function o(e) {
				if (!n) return e;
				var t = new Error("Potentially leaked disposable").stack;
				return (
					setTimeout(function () {
						e[r] || console.log(t);
					}, 3e3),
					e
				);
			}
			function s(e) {
				return Array.isArray(e)
					? (e.forEach(function (e) {
							e && (i(e), e.dispose());
					  }),
					  [])
					: e
					? (i(e), e.dispose(), e)
					: void 0;
			}
			(t.isDisposable = function (e) {
				return "function" == typeof e.dispose && 0 === e.dispose.length;
			}),
				(t.dispose = s),
				(t.combinedDisposable = function () {
					for (var e = [], t = 0; t < arguments.length; t++)
						e[t] = arguments[t];
					return (
						e.forEach(i),
						o({
							dispose: function () {
								return s(e);
							},
						})
					);
				}),
				(t.toDisposable = function (e) {
					var t = o({
						dispose: function () {
							i(t), e();
						},
					});
					return t;
				});
			var u = (function () {
				function e() {
					(this._toDispose = new Set()), (this._isDisposed = !1);
				}
				return (
					(e.prototype.dispose = function () {
						this._isDisposed ||
							(i(this), (this._isDisposed = !0), this.clear());
					}),
					(e.prototype.clear = function () {
						this._toDispose.forEach(function (e) {
							return e.dispose();
						}),
							this._toDispose.clear();
					}),
					(e.prototype.add = function (e) {
						if (!e) return e;
						if (e === this)
							throw new Error("Cannot register a disposable on itself!");
						return (
							i(e),
							this._isDisposed
								? console.warn(
										new Error(
											"Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!"
										).stack
								  )
								: this._toDispose.add(e),
							e
						);
					}),
					e
				);
			})();
			t.DisposableStore = u;
			var a = (function () {
				function e() {
					(this._store = new u()), o(this);
				}
				return (
					(e.prototype.dispose = function () {
						i(this), this._store.dispose();
					}),
					(e.prototype._register = function (e) {
						if (e === this)
							throw new Error("Cannot register a disposable on itself!");
						return this._store.add(e);
					}),
					(e.None = Object.freeze({ dispose: function () {} })),
					e
				);
			})();
			t.Disposable = a;
			var l = (function () {
				function e() {
					(this._isDisposed = !1), o(this);
				}
				return (
					Object.defineProperty(e.prototype, "value", {
						get: function () {
							return this._isDisposed ? void 0 : this._value;
						},
						set: function (e) {
							this._isDisposed ||
								e === this._value ||
								(this._value && this._value.dispose(),
								e && i(e),
								(this._value = e));
						},
						enumerable: !0,
						configurable: !0,
					}),
					(e.prototype.clear = function () {
						this.value = void 0;
					}),
					(e.prototype.dispose = function () {
						(this._isDisposed = !0),
							i(this),
							this._value && this._value.dispose(),
							(this._value = void 0);
					}),
					e
				);
			})();
			t.MutableDisposable = l;
			var c = (function () {
				function e(e) {
					this.object = e;
				}
				return (e.prototype.dispose = function () {}), e;
			})();
			t.ImmortalReference = c;
		}),
		e(n[18], r([0, 1, 7]), function (e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var r = (function () {
					function e(t) {
						(this.element = t),
							(this.next = e.Undefined),
							(this.prev = e.Undefined);
					}
					return (e.Undefined = new e(void 0)), e;
				})(),
				i = (function () {
					function e() {
						(this._first = r.Undefined),
							(this._last = r.Undefined),
							(this._size = 0);
					}
					return (
						Object.defineProperty(e.prototype, "size", {
							get: function () {
								return this._size;
							},
							enumerable: !0,
							configurable: !0,
						}),
						(e.prototype.isEmpty = function () {
							return this._first === r.Undefined;
						}),
						(e.prototype.clear = function () {
							(this._first = r.Undefined),
								(this._last = r.Undefined),
								(this._size = 0);
						}),
						(e.prototype.unshift = function (e) {
							return this._insert(e, !1);
						}),
						(e.prototype.push = function (e) {
							return this._insert(e, !0);
						}),
						(e.prototype._insert = function (e, t) {
							var n = this,
								i = new r(e);
							if (this._first === r.Undefined)
								(this._first = i), (this._last = i);
							else if (t) {
								var o = this._last;
								(this._last = i), (i.prev = o), (o.next = i);
							} else {
								var s = this._first;
								(this._first = i), (i.next = s), (s.prev = i);
							}
							this._size += 1;
							var u = !1;
							return function () {
								u || ((u = !0), n._remove(i));
							};
						}),
						(e.prototype.shift = function () {
							if (this._first !== r.Undefined) {
								var e = this._first.element;
								return this._remove(this._first), e;
							}
						}),
						(e.prototype.pop = function () {
							if (this._last !== r.Undefined) {
								var e = this._last.element;
								return this._remove(this._last), e;
							}
						}),
						(e.prototype._remove = function (e) {
							if (e.prev !== r.Undefined && e.next !== r.Undefined) {
								var t = e.prev;
								(t.next = e.next), (e.next.prev = t);
							} else
								e.prev === r.Undefined && e.next === r.Undefined
									? ((this._first = r.Undefined), (this._last = r.Undefined))
									: e.next === r.Undefined
									? ((this._last = this._last.prev),
									  (this._last.next = r.Undefined))
									: e.prev === r.Undefined &&
									  ((this._first = this._first.next),
									  (this._first.prev = r.Undefined));
							this._size -= 1;
						}),
						(e.prototype.iterator = function () {
							var e,
								t = this._first;
							return {
								next: function () {
									return t === r.Undefined
										? n.FIN
										: (e
												? (e.value = t.element)
												: (e = { done: !1, value: t.element }),
										  (t = t.next),
										  e);
								},
							};
						}),
						(e.prototype.toArray = function () {
							for (var e = [], t = this._first; t !== r.Undefined; t = t.next)
								e.push(t.element);
							return e;
						}),
						e
					);
				})();
			t.LinkedList = i;
		}),
		e(n[9], r([0, 1, 3, 15, 8, 18]), function (e, t, n, r, i, o) {
			"use strict";
			var s;
			Object.defineProperty(t, "__esModule", { value: !0 }),
				(function (e) {
					function t(e) {
						return function (t, n, r) {
							void 0 === n && (n = null);
							var i,
								o = !1;
							return (
								(i = e(
									function (e) {
										if (!o) return i ? i.dispose() : (o = !0), t.call(n, e);
									},
									null,
									r
								)),
								o && i.dispose(),
								i
							);
						};
					}
					function n(e, t) {
						return u(function (n, r, i) {
							return (
								void 0 === r && (r = null),
								e(
									function (e) {
										return n.call(r, t(e));
									},
									null,
									i
								)
							);
						});
					}
					function r(e, t) {
						return u(function (n, r, i) {
							return (
								void 0 === r && (r = null),
								e(
									function (e) {
										t(e), n.call(r, e);
									},
									null,
									i
								)
							);
						});
					}
					function o(e, t) {
						return u(function (n, r, i) {
							return (
								void 0 === r && (r = null),
								e(
									function (e) {
										return t(e) && n.call(r, e);
									},
									null,
									i
								)
							);
						});
					}
					function s(e, t, r) {
						var i = r;
						return n(e, function (e) {
							return (i = t(i, e));
						});
					}
					function u(e) {
						var t,
							n = new c({
								onFirstListenerAdd: function () {
									t = e(n.fire, n);
								},
								onLastListenerRemove: function () {
									t.dispose();
								},
							});
						return n.event;
					}
					function a(e, t, n, r, i) {
						var o;
						void 0 === n && (n = 100), void 0 === r && (r = !1);
						var s = void 0,
							u = void 0,
							a = 0,
							l = new c({
								leakWarningThreshold: i,
								onFirstListenerAdd: function () {
									o = e(function (e) {
										a++,
											(s = t(s, e)),
											r && !u && (l.fire(s), (s = void 0)),
											clearTimeout(u),
											(u = setTimeout(function () {
												var e = s;
												(s = void 0),
													(u = void 0),
													(!r || a > 1) && l.fire(e),
													(a = 0);
											}, n));
									});
								},
								onLastListenerRemove: function () {
									o.dispose();
								},
							});
						return l.event;
					}
					function l(e) {
						var t,
							n = !0;
						return o(e, function (e) {
							var r = n || e !== t;
							return (n = !1), (t = e), r;
						});
					}
					(e.None = function () {
						return i.Disposable.None;
					}),
						(e.once = t),
						(e.map = n),
						(e.forEach = r),
						(e.filter = o),
						(e.signal = function (e) {
							return e;
						}),
						(e.any = function () {
							for (var e = [], t = 0; t < arguments.length; t++)
								e[t] = arguments[t];
							return function (t, n, r) {
								return (
									void 0 === n && (n = null),
									i.combinedDisposable.apply(
										void 0,
										e.map(function (e) {
											return e(
												function (e) {
													return t.call(n, e);
												},
												null,
												r
											);
										})
									)
								);
							};
						}),
						(e.reduce = s),
						(e.snapshot = u),
						(e.debounce = a),
						(e.stopwatch = function (e) {
							var r = new Date().getTime();
							return n(t(e), function (e) {
								return new Date().getTime() - r;
							});
						}),
						(e.latch = l),
						(e.buffer = function (e, t, n) {
							void 0 === t && (t = !1), void 0 === n && (n = []);
							var r = n.slice(),
								i = e(function (e) {
									r ? r.push(e) : s.fire(e);
								}),
								o = function () {
									r &&
										r.forEach(function (e) {
											return s.fire(e);
										}),
										(r = null);
								},
								s = new c({
									onFirstListenerAdd: function () {
										i ||
											(i = e(function (e) {
												return s.fire(e);
											}));
									},
									onFirstListenerDidAdd: function () {
										r && (t ? setTimeout(o) : o());
									},
									onLastListenerRemove: function () {
										i && i.dispose(), (i = null);
									},
								});
							return s.event;
						});
					var d = (function () {
						function e(e) {
							this.event = e;
						}
						return (
							(e.prototype.map = function (t) {
								return new e(n(this.event, t));
							}),
							(e.prototype.forEach = function (t) {
								return new e(r(this.event, t));
							}),
							(e.prototype.filter = function (t) {
								return new e(o(this.event, t));
							}),
							(e.prototype.reduce = function (t, n) {
								return new e(s(this.event, t, n));
							}),
							(e.prototype.latch = function () {
								return new e(l(this.event));
							}),
							(e.prototype.debounce = function (t, n, r, i) {
								return (
									void 0 === n && (n = 100),
									void 0 === r && (r = !1),
									new e(a(this.event, t, n, r, i))
								);
							}),
							(e.prototype.on = function (e, t, n) {
								return this.event(e, t, n);
							}),
							(e.prototype.once = function (e, n, r) {
								return t(this.event)(e, n, r);
							}),
							e
						);
					})();
					(e.chain = function (e) {
						return new d(e);
					}),
						(e.fromNodeEventEmitter = function (e, t, n) {
							void 0 === n &&
								(n = function (e) {
									return e;
								});
							var r = function () {
									for (var e = [], t = 0; t < arguments.length; t++)
										e[t] = arguments[t];
									return i.fire(n.apply(void 0, e));
								},
								i = new c({
									onFirstListenerAdd: function () {
										return e.on(t, r);
									},
									onLastListenerRemove: function () {
										return e.removeListener(t, r);
									},
								});
							return i.event;
						}),
						(e.fromDOMEventEmitter = function (e, t, n) {
							void 0 === n &&
								(n = function (e) {
									return e;
								});
							var r = function () {
									for (var e = [], t = 0; t < arguments.length; t++)
										e[t] = arguments[t];
									return i.fire(n.apply(void 0, e));
								},
								i = new c({
									onFirstListenerAdd: function () {
										return e.addEventListener(t, r);
									},
									onLastListenerRemove: function () {
										return e.removeEventListener(t, r);
									},
								});
							return i.event;
						}),
						(e.fromPromise = function (e) {
							var t = new c(),
								n = !1;
							return (
								e
									.then(void 0, function () {
										return null;
									})
									.then(function () {
										n
											? t.fire(void 0)
											: setTimeout(function () {
													return t.fire(void 0);
											  }, 0);
									}),
								(n = !0),
								t.event
							);
						}),
						(e.toPromise = function (e) {
							return new Promise(function (n) {
								return t(e)(n);
							});
						});
				})((s = t.Event || (t.Event = {})));
			var u = -1,
				l = (function () {
					function e(e, t) {
						void 0 === t && (t = Math.random().toString(18).slice(2, 5)),
							(this.customThreshold = e),
							(this.name = t),
							(this._warnCountdown = 0);
					}
					return (
						(e.prototype.dispose = function () {
							this._stacks && this._stacks.clear();
						}),
						(e.prototype.check = function (e) {
							var t = this,
								n = u;
							if (
								("number" == typeof this.customThreshold &&
									(n = this.customThreshold),
								!(n <= 0 || e < n))
							) {
								this._stacks || (this._stacks = new Map());
								var r = new Error().stack.split("\n").slice(3).join("\n"),
									i = this._stacks.get(r) || 0;
								if (
									(this._stacks.set(r, i + 1),
									(this._warnCountdown -= 1),
									this._warnCountdown <= 0)
								) {
									var o;
									this._warnCountdown = 0.5 * n;
									var s = 0;
									this._stacks.forEach(function (e, t) {
										(!o || s < e) && ((o = t), (s = e));
									}),
										console.warn(
											"[" +
												this.name +
												"] potential listener LEAK detected, having " +
												e +
												" listeners already. MOST frequent listener (" +
												s +
												"):"
										),
										console.warn(o);
								}
								return function () {
									var e = t._stacks.get(r) || 0;
									t._stacks.set(r, e - 1);
								};
							}
						}),
						e
					);
				})(),
				c = (function () {
					function e(e) {
						(this._disposed = !1),
							(this._options = e),
							(this._leakageMon =
								u > 0
									? new l(this._options && this._options.leakWarningThreshold)
									: void 0);
					}
					return (
						Object.defineProperty(e.prototype, "event", {
							get: function () {
								var t = this;
								return (
									this._event ||
										(this._event = function (n, r, s) {
											t._listeners || (t._listeners = new o.LinkedList());
											var u = t._listeners.isEmpty();
											u &&
												t._options &&
												t._options.onFirstListenerAdd &&
												t._options.onFirstListenerAdd(t);
											var a,
												l,
												c = t._listeners.push(r ? [n, r] : n);
											return (
												u &&
													t._options &&
													t._options.onFirstListenerDidAdd &&
													t._options.onFirstListenerDidAdd(t),
												t._options &&
													t._options.onListenerDidAdd &&
													t._options.onListenerDidAdd(t, n, r),
												t._leakageMon &&
													(a = t._leakageMon.check(t._listeners.size)),
												(l = {
													dispose: function () {
														(a && a(), (l.dispose = e._noop), t._disposed) ||
															(c(),
															t._options &&
																t._options.onLastListenerRemove &&
																((t._listeners && !t._listeners.isEmpty()) ||
																	t._options.onLastListenerRemove(t)));
													},
												}),
												s instanceof i.DisposableStore
													? s.add(l)
													: Array.isArray(s) && s.push(l),
												l
											);
										}),
									this._event
								);
							},
							enumerable: !0,
							configurable: !0,
						}),
						(e.prototype.fire = function (e) {
							if (this._listeners) {
								this._deliveryQueue ||
									(this._deliveryQueue = new o.LinkedList());
								for (
									var t = this._listeners.iterator(), r = t.next();
									!r.done;
									r = t.next()
								)
									this._deliveryQueue.push([r.value, e]);
								for (; this._deliveryQueue.size > 0; ) {
									var i = this._deliveryQueue.shift(),
										s = i[0],
										u = i[1];
									try {
										"function" == typeof s
											? s.call(void 0, u)
											: s[0].call(s[1], u);
									} catch (r) {
										n.onUnexpectedError(r);
									}
								}
							}
						}),
						(e.prototype.dispose = function () {
							this._listeners && this._listeners.clear(),
								this._deliveryQueue && this._deliveryQueue.clear(),
								this._leakageMon && this._leakageMon.dispose(),
								(this._disposed = !0);
						}),
						(e._noop = function () {}),
						e
					);
				})();
			t.Emitter = c;
			var d = (function (e) {
				function t(t) {
					var n = e.call(this, t) || this;
					return (
						(n._isPaused = 0),
						(n._eventQueue = new o.LinkedList()),
						(n._mergeFn = t && t.merge),
						n
					);
				}
				return (
					a(t, e),
					(t.prototype.pause = function () {
						this._isPaused++;
					}),
					(t.prototype.resume = function () {
						if (0 !== this._isPaused && 0 == --this._isPaused)
							if (this._mergeFn) {
								var t = this._eventQueue.toArray();
								this._eventQueue.clear(),
									e.prototype.fire.call(this, this._mergeFn(t));
							} else
								for (; !this._isPaused && 0 !== this._eventQueue.size; )
									e.prototype.fire.call(this, this._eventQueue.shift());
					}),
					(t.prototype.fire = function (t) {
						this._listeners &&
							(0 !== this._isPaused
								? this._eventQueue.push(t)
								: e.prototype.fire.call(this, t));
					}),
					t
				);
			})(c);
			t.PauseableEmitter = d;
			var f = (function () {
				function e() {
					var e = this;
					(this.hasListeners = !1),
						(this.events = []),
						(this.emitter = new c({
							onFirstListenerAdd: function () {
								return e.onFirstListenerAdd();
							},
							onLastListenerRemove: function () {
								return e.onLastListenerRemove();
							},
						}));
				}
				return (
					Object.defineProperty(e.prototype, "event", {
						get: function () {
							return this.emitter.event;
						},
						enumerable: !0,
						configurable: !0,
					}),
					(e.prototype.add = function (e) {
						var t = this,
							n = { event: e, listener: null };
						this.events.push(n), this.hasListeners && this.hook(n);
						return i.toDisposable(
							r.once(function () {
								t.hasListeners && t.unhook(n);
								var e = t.events.indexOf(n);
								t.events.splice(e, 1);
							})
						);
					}),
					(e.prototype.onFirstListenerAdd = function () {
						var e = this;
						(this.hasListeners = !0),
							this.events.forEach(function (t) {
								return e.hook(t);
							});
					}),
					(e.prototype.onLastListenerRemove = function () {
						var e = this;
						(this.hasListeners = !1),
							this.events.forEach(function (t) {
								return e.unhook(t);
							});
					}),
					(e.prototype.hook = function (e) {
						var t = this;
						e.listener = e.event(function (e) {
							return t.emitter.fire(e);
						});
					}),
					(e.prototype.unhook = function (e) {
						e.listener && e.listener.dispose(), (e.listener = null);
					}),
					(e.prototype.dispose = function () {
						this.emitter.dispose();
					}),
					e
				);
			})();
			t.EventMultiplexer = f;
			var h = (function () {
				function e() {
					this.buffers = [];
				}
				return (
					(e.prototype.wrapEvent = function (e) {
						var t = this;
						return function (n, r, i) {
							return e(
								function (e) {
									var i = t.buffers[t.buffers.length - 1];
									i
										? i.push(function () {
												return n.call(r, e);
										  })
										: n.call(r, e);
								},
								void 0,
								i
							);
						};
					}),
					(e.prototype.bufferEvents = function (e) {
						var t = [];
						this.buffers.push(t);
						var n = e();
						return (
							this.buffers.pop(),
							t.forEach(function (e) {
								return e();
							}),
							n
						);
					}),
					e
				);
			})();
			t.EventBufferer = h;
			var p = (function () {
				function e() {
					var e = this;
					(this.listening = !1),
						(this.inputEvent = s.None),
						(this.inputEventListener = i.Disposable.None),
						(this.emitter = new c({
							onFirstListenerDidAdd: function () {
								(e.listening = !0),
									(e.inputEventListener = e.inputEvent(
										e.emitter.fire,
										e.emitter
									));
							},
							onLastListenerRemove: function () {
								(e.listening = !1), e.inputEventListener.dispose();
							},
						})),
						(this.event = this.emitter.event);
				}
				return (
					Object.defineProperty(e.prototype, "input", {
						set: function (e) {
							(this.inputEvent = e),
								this.listening &&
									(this.inputEventListener.dispose(),
									(this.inputEventListener = e(
										this.emitter.fire,
										this.emitter
									)));
						},
						enumerable: !0,
						configurable: !0,
					}),
					(e.prototype.dispose = function () {
						this.inputEventListener.dispose(), this.emitter.dispose();
					}),
					e
				);
			})();
			t.Relay = p;
		}),
		e(n[19], r([0, 1, 9]), function (e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var r,
				i = Object.freeze(function (e, t) {
					var n = setTimeout(e.bind(t), 0);
					return {
						dispose: function () {
							clearTimeout(n);
						},
					};
				});
			!(function (e) {
				(e.isCancellationToken = function (t) {
					return (
						t === e.None ||
						t === e.Cancelled ||
						t instanceof o ||
						(!(!t || "object" != typeof t) &&
							"boolean" == typeof t.isCancellationRequested &&
							"function" == typeof t.onCancellationRequested)
					);
				}),
					(e.None = Object.freeze({
						isCancellationRequested: !1,
						onCancellationRequested: n.Event.None,
					})),
					(e.Cancelled = Object.freeze({
						isCancellationRequested: !0,
						onCancellationRequested: i,
					}));
			})((r = t.CancellationToken || (t.CancellationToken = {})));
			var o = (function () {
					function e() {
						(this._isCancelled = !1), (this._emitter = null);
					}
					return (
						(e.prototype.cancel = function () {
							this._isCancelled ||
								((this._isCancelled = !0),
								this._emitter && (this._emitter.fire(void 0), this.dispose()));
						}),
						Object.defineProperty(e.prototype, "isCancellationRequested", {
							get: function () {
								return this._isCancelled;
							},
							enumerable: !0,
							configurable: !0,
						}),
						Object.defineProperty(e.prototype, "onCancellationRequested", {
							get: function () {
								return this._isCancelled
									? i
									: (this._emitter || (this._emitter = new n.Emitter()),
									  this._emitter.event);
							},
							enumerable: !0,
							configurable: !0,
						}),
						(e.prototype.dispose = function () {
							this._emitter &&
								(this._emitter.dispose(), (this._emitter = null));
						}),
						e
					);
				})(),
				s = (function () {
					function e(e) {
						(this._token = void 0),
							(this._parentListener = void 0),
							(this._parentListener =
								e && e.onCancellationRequested(this.cancel, this));
					}
					return (
						Object.defineProperty(e.prototype, "token", {
							get: function () {
								return this._token || (this._token = new o()), this._token;
							},
							enumerable: !0,
							configurable: !0,
						}),
						(e.prototype.cancel = function () {
							this._token
								? this._token instanceof o && this._token.cancel()
								: (this._token = r.Cancelled);
						}),
						(e.prototype.dispose = function (e) {
							void 0 === e && (e = !1),
								e && this.cancel(),
								this._parentListener && this._parentListener.dispose(),
								this._token
									? this._token instanceof o && this._token.dispose()
									: (this._token = r.None);
						}),
						e
					);
				})();
			t.CancellationTokenSource = s;
		}),
		e(n[4], r([0, 1]), function (e, t) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var n = !1,
				r = !1,
				i = !1,
				o = !1,
				s = !1,
				u = !1,
				a = void 0,
				l =
					"undefined" != typeof process &&
					void 0 !== process.versions &&
					void 0 !== process.versions.electron &&
					"renderer" === process.type;
			if ("object" != typeof navigator || l) {
				if ("object" == typeof process) {
					(n = "win32" === process.platform),
						(r = "darwin" === process.platform),
						(i = "linux" === process.platform),
						"en",
						"en";
					var c = process.env.VSCODE_NLS_CONFIG;
					if (c)
						try {
							var d = JSON.parse(c),
								f = d.availableLanguages["*"];
							d.locale, f || "en", d._translationsConfigFile;
						} catch (e) {}
					o = !0;
				}
			} else (n = (a = navigator.userAgent).indexOf("Windows") >= 0), (r = a.indexOf("Macintosh") >= 0), (u = a.indexOf("Macintosh") >= 0 && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0), (i = a.indexOf("Linux") >= 0), (s = !0), navigator.language;
			(t.isWindows = n),
				(t.isMacintosh = r),
				(t.isLinux = i),
				(t.isNative = o),
				(t.isWeb = s),
				(t.isIOS = u);
			var h =
				"object" == typeof self
					? self
					: "object" == typeof global
					? global
					: {};
			(t.globals = h),
				(t.setImmediate = (function () {
					if (t.globals.setImmediate)
						return t.globals.setImmediate.bind(t.globals);
					if (
						"function" == typeof t.globals.postMessage &&
						!t.globals.importScripts
					) {
						var e = [];
						t.globals.addEventListener("message", function (t) {
							if (t.data && t.data.vscodeSetImmediateId)
								for (var n = 0, r = e.length; n < r; n++) {
									var i = e[n];
									if (i.id === t.data.vscodeSetImmediateId)
										return e.splice(n, 1), void i.callback();
								}
						});
						var n = 0;
						return function (r) {
							var i = ++n;
							e.push({ id: i, callback: r }),
								t.globals.postMessage({ vscodeSetImmediateId: i }, "*");
						};
					}
					if (
						"undefined" != typeof process &&
						"function" == typeof process.nextTick
					)
						return process.nextTick.bind(process);
					var r = Promise.resolve();
					return function (e) {
						return r.then(e);
					};
				})()),
				(t.OS = r ? 2 : n ? 1 : 3);
		}),
		e(n[20], r([0, 1]), function (e, t) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 }),
				(t.isFalsyOrWhitespace = function (e) {
					return !e || "string" != typeof e || 0 === e.trim().length;
				}),
				(t.pad = function (e, t, n) {
					void 0 === n && (n = "0");
					for (var r = "" + e, i = [r], o = r.length; o < t; o++) i.push(n);
					return i.reverse().join("");
				});
			var n = /{(\d+)}/g;
			function r(e) {
				return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
			}
			function i(e, t) {
				if (!e || !t) return e;
				var n = t.length;
				if (0 === n || 0 === e.length) return e;
				for (var r = 0; e.indexOf(t, r) === r; ) r += n;
				return e.substring(r);
			}
			function o(e, t) {
				if (!e || !t) return e;
				var n = t.length,
					r = e.length;
				if (0 === n || 0 === r) return e;
				for (
					var i = r, o = -1;
					-1 !== (o = e.lastIndexOf(t, i - 1)) && o + n === i;

				) {
					if (0 === o) return "";
					i = o;
				}
				return e.substring(0, i);
			}
			function s(e, t) {
				return e < t ? -1 : e > t ? 1 : 0;
			}
			function u(e) {
				return e >= 97 && e <= 122;
			}
			function a(e) {
				return e >= 65 && e <= 90;
			}
			function l(e) {
				return u(e) || a(e);
			}
			function c(e, t, n) {
				void 0 === n && (n = e.length);
				for (var r = 0; r < n; r++) {
					var i = e.charCodeAt(r),
						o = t.charCodeAt(r);
					if (i !== o)
						if (l(i) && l(o)) {
							var s = Math.abs(i - o);
							if (0 !== s && 32 !== s) return !1;
						} else if (
							String.fromCharCode(i).toLowerCase() !==
							String.fromCharCode(o).toLowerCase()
						)
							return !1;
				}
				return !0;
			}
			function d(e) {
				return 55296 <= e && e <= 56319;
			}
			function f(e) {
				return 56320 <= e && e <= 57343;
			}
			function h(e, t, n) {
				var r = e.charCodeAt(n);
				if (d(r) && n + 1 < t) {
					var i = e.charCodeAt(n + 1);
					if (f(i)) return i - 56320 + ((r - 55296) << 10) + 65536;
				}
				return r;
			}
			function p(e, t) {
				var n = e.charCodeAt(t - 1);
				if (f(n) && t > 1) {
					var r = e.charCodeAt(t - 2);
					if (d(r)) return n - 56320 + ((r - 55296) << 10) + 65536;
				}
				return n;
			}
			(t.format = function (e) {
				for (var t = [], r = 1; r < arguments.length; r++)
					t[r - 1] = arguments[r];
				return 0 === t.length
					? e
					: e.replace(n, function (e, n) {
							var r = parseInt(n, 10);
							return isNaN(r) || r < 0 || r >= t.length ? e : t[r];
					  });
			}),
				(t.escape = function (e) {
					return e.replace(/[<>&]/g, function (e) {
						switch (e) {
							case "<":
								return "&lt;";
							case ">":
								return "&gt;";
							case "&":
								return "&amp;";
							default:
								return e;
						}
					});
				}),
				(t.escapeRegExpCharacters = r),
				(t.trim = function (e, t) {
					return void 0 === t && (t = " "), o(i(e, t), t);
				}),
				(t.ltrim = i),
				(t.rtrim = o),
				(t.convertSimple2RegExpPattern = function (e) {
					return e
						.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&")
						.replace(/[\*]/g, ".*");
				}),
				(t.startsWith = function (e, t) {
					if (e.length < t.length) return !1;
					if (e === t) return !0;
					for (var n = 0; n < t.length; n++) if (e[n] !== t[n]) return !1;
					return !0;
				}),
				(t.endsWith = function (e, t) {
					var n = e.length - t.length;
					return n > 0 ? e.indexOf(t, n) === n : 0 === n && e === t;
				}),
				(t.createRegExp = function (e, t, n) {
					if ((void 0 === n && (n = {}), !e))
						throw new Error("Cannot create regex from empty string");
					t || (e = r(e)),
						n.wholeWord &&
							(/\B/.test(e.charAt(0)) || (e = "\\b" + e),
							/\B/.test(e.charAt(e.length - 1)) || (e += "\\b"));
					var i = "";
					return (
						n.global && (i += "g"),
						n.matchCase || (i += "i"),
						n.multiline && (i += "m"),
						n.unicode && (i += "u"),
						new RegExp(e, i)
					);
				}),
				(t.regExpLeadsToEndlessLoop = function (e) {
					return (
						"^" !== e.source &&
						"^$" !== e.source &&
						"$" !== e.source &&
						"^\\s*$" !== e.source &&
						!(!e.exec("") || 0 !== e.lastIndex)
					);
				}),
				(t.regExpFlags = function (e) {
					return (
						(e.global ? "g" : "") +
						(e.ignoreCase ? "i" : "") +
						(e.multiline ? "m" : "") +
						(e.unicode ? "u" : "")
					);
				}),
				(t.firstNonWhitespaceIndex = function (e) {
					for (var t = 0, n = e.length; t < n; t++) {
						var r = e.charCodeAt(t);
						if (32 !== r && 9 !== r) return t;
					}
					return -1;
				}),
				(t.getLeadingWhitespace = function (e, t, n) {
					void 0 === t && (t = 0), void 0 === n && (n = e.length);
					for (var r = t; r < n; r++) {
						var i = e.charCodeAt(r);
						if (32 !== i && 9 !== i) return e.substring(t, r);
					}
					return e.substring(t, n);
				}),
				(t.lastNonWhitespaceIndex = function (e, t) {
					void 0 === t && (t = e.length - 1);
					for (var n = t; n >= 0; n--) {
						var r = e.charCodeAt(n);
						if (32 !== r && 9 !== r) return n;
					}
					return -1;
				}),
				(t.compare = s),
				(t.compareIgnoreCase = function (e, t) {
					for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) {
						var i = e.charCodeAt(r),
							o = t.charCodeAt(r);
						if (i !== o) {
							a(i) && (i += 32), a(o) && (o += 32);
							var l = i - o;
							if (0 !== l)
								return u(i) && u(o) ? l : s(e.toLowerCase(), t.toLowerCase());
						}
					}
					return e.length < t.length ? -1 : e.length > t.length ? 1 : 0;
				}),
				(t.isLowerAsciiLetter = u),
				(t.isUpperAsciiLetter = a),
				(t.equalsIgnoreCase = function (e, t) {
					return e.length === t.length && c(e, t);
				}),
				(t.startsWithIgnoreCase = function (e, t) {
					var n = t.length;
					return !(t.length > e.length) && c(e, t, n);
				}),
				(t.commonPrefixLength = function (e, t) {
					var n,
						r = Math.min(e.length, t.length);
					for (n = 0; n < r; n++)
						if (e.charCodeAt(n) !== t.charCodeAt(n)) return n;
					return r;
				}),
				(t.commonSuffixLength = function (e, t) {
					var n,
						r = Math.min(e.length, t.length),
						i = e.length - 1,
						o = t.length - 1;
					for (n = 0; n < r; n++)
						if (e.charCodeAt(i - n) !== t.charCodeAt(o - n)) return n;
					return r;
				}),
				(t.isHighSurrogate = d),
				(t.isLowSurrogate = f),
				(t.getNextCodePoint = h),
				(t.nextCharLength = function (e, t) {
					var n = b.getInstance(),
						r = t,
						i = e.length,
						o = h(e, i, t);
					t += o >= 65536 ? 2 : 1;
					for (var s = n.getGraphemeBreakType(o); t < i; ) {
						var u = h(e, i, t),
							a = n.getGraphemeBreakType(u);
						if (y(s, a)) break;
						(t += u >= 65536 ? 2 : 1), (s = a);
					}
					return t - r;
				}),
				(t.prevCharLength = function (e, t) {
					var n = b.getInstance(),
						r = t,
						i = p(e, t);
					t -= i >= 65536 ? 2 : 1;
					for (var o = n.getGraphemeBreakType(i); t > 0; ) {
						var s = p(e, t),
							u = n.getGraphemeBreakType(s);
						if (y(u, o)) break;
						(t -= s >= 65536 ? 2 : 1), (o = u);
					}
					return r - t;
				});
			var m =
				/(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
			t.containsRTL = function (e) {
				return m.test(e);
			};
			var g =
				/(?:[\u231A\u231B\u23F0\u23F3\u2600-\u27BF\u2B50\u2B55]|\uD83C[\uDDE6-\uDDFF\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD00-\uDDFF\uDE70-\uDE73\uDE78-\uDE82\uDE90-\uDE95])/;
			t.containsEmoji = function (e) {
				return g.test(e);
			};
			var v = /^[\t\n\r\x20-\x7E]*$/;
			function _(e) {
				return (
					((e = +e) >= 11904 && e <= 55215) ||
					(e >= 63744 && e <= 64255) ||
					(e >= 65281 && e <= 65374)
				);
			}
			function y(e, t) {
				return 0 === e
					? 5 !== t && 7 !== t
					: (2 !== e || 3 !== t) &&
							(4 === e ||
								2 === e ||
								3 === e ||
								4 === t ||
								2 === t ||
								3 === t ||
								((8 !== e || (8 !== t && 9 !== t && 11 !== t && 12 !== t)) &&
									((11 !== e && 9 !== e) || (9 !== t && 10 !== t)) &&
									((12 !== e && 10 !== e) || 10 !== t) &&
									5 !== t &&
									13 !== t &&
									7 !== t &&
									1 !== e &&
									(13 !== e || 14 !== t) &&
									(6 !== e || 6 !== t)));
			}
			(t.isBasicASCII = function (e) {
				return v.test(e);
			}),
				(t.containsFullWidthCharacter = function (e) {
					for (var t = 0, n = e.length; t < n; t++)
						if (_(e.charCodeAt(t))) return !0;
					return !1;
				}),
				(t.isFullWidthCharacter = _),
				(t.isEmojiImprecise = function (e) {
					return (
						(e >= 127462 && e <= 127487) ||
						(e >= 9728 && e <= 10175) ||
						(e >= 127744 && e <= 128591) ||
						(e >= 128640 && e <= 128764) ||
						(e >= 128992 && e <= 129003) ||
						(e >= 129280 && e <= 129535) ||
						(e >= 129648 && e <= 129651) ||
						(e >= 129656 && e <= 129666) ||
						(e >= 129680 && e <= 129685)
					);
				}),
				(t.UTF8_BOM_CHARACTER = String.fromCharCode(65279)),
				(t.startsWithUTF8BOM = function (e) {
					return !!(e && e.length > 0 && 65279 === e.charCodeAt(0));
				}),
				(t.safeBtoa = function (e) {
					return btoa(encodeURIComponent(e));
				}),
				(t.repeat = function (e, t) {
					for (var n = "", r = 0; r < t; r++) n += e;
					return n;
				}),
				(t.containsUppercaseCharacter = function (e, t) {
					return (
						void 0 === t && (t = !1),
						!!e && (t && (e = e.replace(/\\./g, "")), e.toLowerCase() !== e)
					);
				}),
				(t.singleLetterHash = function (e) {
					return (e %= 52) < 26
						? String.fromCharCode(97 + e)
						: String.fromCharCode(65 + e - 26);
				}),
				(t.getGraphemeBreakType = function (e) {
					return b.getInstance().getGraphemeBreakType(e);
				}),
				(t.breakBetweenGraphemeBreakType = y);
			var b = (function () {
				function e() {
					this._data = JSON.parse(
						"[0,0,0,51592,51592,11,44424,44424,11,72251,72254,5,7150,7150,7,48008,48008,11,55176,55176,11,128420,128420,14,3276,3277,5,9979,9980,14,46216,46216,11,49800,49800,11,53384,53384,11,70726,70726,5,122915,122916,5,129320,129327,14,2558,2558,5,5906,5908,5,9762,9763,14,43360,43388,8,45320,45320,11,47112,47112,11,48904,48904,11,50696,50696,11,52488,52488,11,54280,54280,11,70082,70083,1,71350,71350,7,73111,73111,5,127892,127893,14,128726,128727,14,129473,129474,14,2027,2035,5,2901,2902,5,3784,3789,5,6754,6754,5,8418,8420,5,9877,9877,14,11088,11088,14,44008,44008,5,44872,44872,11,45768,45768,11,46664,46664,11,47560,47560,11,48456,48456,11,49352,49352,11,50248,50248,11,51144,51144,11,52040,52040,11,52936,52936,11,53832,53832,11,54728,54728,11,69811,69814,5,70459,70460,5,71096,71099,7,71998,71998,5,72874,72880,5,119149,119149,7,127374,127374,14,128335,128335,14,128482,128482,14,128765,128767,14,129399,129400,14,129680,129685,14,1476,1477,5,2377,2380,7,2759,2760,5,3137,3140,7,3458,3459,7,4153,4154,5,6432,6434,5,6978,6978,5,7675,7679,5,9723,9726,14,9823,9823,14,9919,9923,14,10035,10036,14,42736,42737,5,43596,43596,5,44200,44200,11,44648,44648,11,45096,45096,11,45544,45544,11,45992,45992,11,46440,46440,11,46888,46888,11,47336,47336,11,47784,47784,11,48232,48232,11,48680,48680,11,49128,49128,11,49576,49576,11,50024,50024,11,50472,50472,11,50920,50920,11,51368,51368,11,51816,51816,11,52264,52264,11,52712,52712,11,53160,53160,11,53608,53608,11,54056,54056,11,54504,54504,11,54952,54952,11,68108,68111,5,69933,69940,5,70197,70197,7,70498,70499,7,70845,70845,5,71229,71229,5,71727,71735,5,72154,72155,5,72344,72345,5,73023,73029,5,94095,94098,5,121403,121452,5,126981,127182,14,127538,127546,14,127990,127990,14,128391,128391,14,128445,128449,14,128500,128505,14,128752,128752,14,129160,129167,14,129356,129356,14,129432,129442,14,129648,129651,14,129751,131069,14,173,173,4,1757,1757,1,2274,2274,1,2494,2494,5,2641,2641,5,2876,2876,5,3014,3016,7,3262,3262,7,3393,3396,5,3570,3571,7,3968,3972,5,4228,4228,7,6086,6086,5,6679,6680,5,6912,6915,5,7080,7081,5,7380,7392,5,8252,8252,14,9096,9096,14,9748,9749,14,9784,9786,14,9833,9850,14,9890,9894,14,9938,9938,14,9999,9999,14,10085,10087,14,12349,12349,14,43136,43137,7,43454,43456,7,43755,43755,7,44088,44088,11,44312,44312,11,44536,44536,11,44760,44760,11,44984,44984,11,45208,45208,11,45432,45432,11,45656,45656,11,45880,45880,11,46104,46104,11,46328,46328,11,46552,46552,11,46776,46776,11,47000,47000,11,47224,47224,11,47448,47448,11,47672,47672,11,47896,47896,11,48120,48120,11,48344,48344,11,48568,48568,11,48792,48792,11,49016,49016,11,49240,49240,11,49464,49464,11,49688,49688,11,49912,49912,11,50136,50136,11,50360,50360,11,50584,50584,11,50808,50808,11,51032,51032,11,51256,51256,11,51480,51480,11,51704,51704,11,51928,51928,11,52152,52152,11,52376,52376,11,52600,52600,11,52824,52824,11,53048,53048,11,53272,53272,11,53496,53496,11,53720,53720,11,53944,53944,11,54168,54168,11,54392,54392,11,54616,54616,11,54840,54840,11,55064,55064,11,65438,65439,5,69633,69633,5,69837,69837,1,70018,70018,7,70188,70190,7,70368,70370,7,70465,70468,7,70712,70719,5,70835,70840,5,70850,70851,5,71132,71133,5,71340,71340,7,71458,71461,5,71985,71989,7,72002,72002,7,72193,72202,5,72281,72283,5,72766,72766,7,72885,72886,5,73104,73105,5,92912,92916,5,113824,113827,4,119173,119179,5,121505,121519,5,125136,125142,5,127279,127279,14,127489,127490,14,127570,127743,14,127900,127901,14,128254,128254,14,128369,128370,14,128400,128400,14,128425,128432,14,128468,128475,14,128489,128494,14,128715,128720,14,128745,128745,14,128759,128760,14,129004,129023,14,129296,129304,14,129340,129342,14,129388,129392,14,129404,129407,14,129454,129455,14,129485,129487,14,129659,129663,14,129719,129727,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2363,2363,7,2402,2403,5,2507,2508,7,2622,2624,7,2691,2691,7,2786,2787,5,2881,2884,5,3006,3006,5,3072,3072,5,3170,3171,5,3267,3268,7,3330,3331,7,3406,3406,1,3538,3540,5,3655,3662,5,3897,3897,5,4038,4038,5,4184,4185,5,4352,4447,8,6068,6069,5,6155,6157,5,6448,6449,7,6742,6742,5,6783,6783,5,6966,6970,5,7042,7042,7,7143,7143,7,7212,7219,5,7412,7412,5,8206,8207,4,8294,8303,4,8596,8601,14,9410,9410,14,9742,9742,14,9757,9757,14,9770,9770,14,9794,9794,14,9828,9828,14,9855,9855,14,9882,9882,14,9900,9903,14,9929,9933,14,9963,9967,14,9987,9988,14,10006,10006,14,10062,10062,14,10175,10175,14,11744,11775,5,42607,42607,5,43043,43044,7,43263,43263,5,43444,43445,7,43569,43570,5,43698,43700,5,43766,43766,5,44032,44032,11,44144,44144,11,44256,44256,11,44368,44368,11,44480,44480,11,44592,44592,11,44704,44704,11,44816,44816,11,44928,44928,11,45040,45040,11,45152,45152,11,45264,45264,11,45376,45376,11,45488,45488,11,45600,45600,11,45712,45712,11,45824,45824,11,45936,45936,11,46048,46048,11,46160,46160,11,46272,46272,11,46384,46384,11,46496,46496,11,46608,46608,11,46720,46720,11,46832,46832,11,46944,46944,11,47056,47056,11,47168,47168,11,47280,47280,11,47392,47392,11,47504,47504,11,47616,47616,11,47728,47728,11,47840,47840,11,47952,47952,11,48064,48064,11,48176,48176,11,48288,48288,11,48400,48400,11,48512,48512,11,48624,48624,11,48736,48736,11,48848,48848,11,48960,48960,11,49072,49072,11,49184,49184,11,49296,49296,11,49408,49408,11,49520,49520,11,49632,49632,11,49744,49744,11,49856,49856,11,49968,49968,11,50080,50080,11,50192,50192,11,50304,50304,11,50416,50416,11,50528,50528,11,50640,50640,11,50752,50752,11,50864,50864,11,50976,50976,11,51088,51088,11,51200,51200,11,51312,51312,11,51424,51424,11,51536,51536,11,51648,51648,11,51760,51760,11,51872,51872,11,51984,51984,11,52096,52096,11,52208,52208,11,52320,52320,11,52432,52432,11,52544,52544,11,52656,52656,11,52768,52768,11,52880,52880,11,52992,52992,11,53104,53104,11,53216,53216,11,53328,53328,11,53440,53440,11,53552,53552,11,53664,53664,11,53776,53776,11,53888,53888,11,54000,54000,11,54112,54112,11,54224,54224,11,54336,54336,11,54448,54448,11,54560,54560,11,54672,54672,11,54784,54784,11,54896,54896,11,55008,55008,11,55120,55120,11,64286,64286,5,66272,66272,5,68900,68903,5,69762,69762,7,69817,69818,5,69927,69931,5,70003,70003,5,70070,70078,5,70094,70094,7,70194,70195,7,70206,70206,5,70400,70401,5,70463,70463,7,70475,70477,7,70512,70516,5,70722,70724,5,70832,70832,5,70842,70842,5,70847,70848,5,71088,71089,7,71102,71102,7,71219,71226,5,71231,71232,5,71342,71343,7,71453,71455,5,71463,71467,5,71737,71738,5,71995,71996,5,72000,72000,7,72145,72147,7,72160,72160,5,72249,72249,7,72273,72278,5,72330,72342,5,72752,72758,5,72850,72871,5,72882,72883,5,73018,73018,5,73031,73031,5,73109,73109,5,73461,73462,7,94031,94031,5,94192,94193,7,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,126976,126979,14,127184,127231,14,127344,127345,14,127405,127461,14,127514,127514,14,127561,127567,14,127778,127779,14,127896,127896,14,127985,127986,14,127995,127999,5,128326,128328,14,128360,128366,14,128378,128378,14,128394,128397,14,128405,128406,14,128422,128423,14,128435,128443,14,128453,128464,14,128479,128480,14,128484,128487,14,128496,128498,14,128640,128709,14,128723,128724,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129096,129103,14,129292,129292,14,129311,129311,14,129329,129330,14,129344,129349,14,129360,129374,14,129394,129394,14,129402,129402,14,129413,129425,14,129445,129450,14,129466,129471,14,129483,129483,14,129511,129535,14,129653,129655,14,129667,129670,14,129705,129711,14,129731,129743,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2307,2307,7,2366,2368,7,2382,2383,7,2434,2435,7,2497,2500,5,2519,2519,5,2563,2563,7,2631,2632,5,2677,2677,5,2750,2752,7,2763,2764,7,2817,2817,5,2879,2879,5,2891,2892,7,2914,2915,5,3008,3008,5,3021,3021,5,3076,3076,5,3146,3149,5,3202,3203,7,3264,3265,7,3271,3272,7,3298,3299,5,3390,3390,5,3402,3404,7,3426,3427,5,3535,3535,5,3544,3550,7,3635,3635,7,3763,3763,7,3893,3893,5,3953,3966,5,3981,3991,5,4145,4145,7,4157,4158,5,4209,4212,5,4237,4237,5,4520,4607,10,5970,5971,5,6071,6077,5,6089,6099,5,6277,6278,5,6439,6440,5,6451,6456,7,6683,6683,5,6744,6750,5,6765,6770,7,6846,6846,5,6964,6964,5,6972,6972,5,7019,7027,5,7074,7077,5,7083,7085,5,7146,7148,7,7154,7155,7,7222,7223,5,7394,7400,5,7416,7417,5,8204,8204,5,8233,8233,4,8288,8292,4,8413,8416,5,8482,8482,14,8986,8987,14,9193,9203,14,9654,9654,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9775,14,9792,9792,14,9800,9811,14,9825,9826,14,9831,9831,14,9852,9853,14,9872,9873,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9936,9936,14,9941,9960,14,9974,9974,14,9982,9985,14,9992,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10145,10145,14,11013,11015,14,11503,11505,5,12334,12335,5,12951,12951,14,42612,42621,5,43014,43014,5,43047,43047,7,43204,43205,5,43335,43345,5,43395,43395,7,43450,43451,7,43561,43566,5,43573,43574,5,43644,43644,5,43710,43711,5,43758,43759,7,44005,44005,5,44012,44012,7,44060,44060,11,44116,44116,11,44172,44172,11,44228,44228,11,44284,44284,11,44340,44340,11,44396,44396,11,44452,44452,11,44508,44508,11,44564,44564,11,44620,44620,11,44676,44676,11,44732,44732,11,44788,44788,11,44844,44844,11,44900,44900,11,44956,44956,11,45012,45012,11,45068,45068,11,45124,45124,11,45180,45180,11,45236,45236,11,45292,45292,11,45348,45348,11,45404,45404,11,45460,45460,11,45516,45516,11,45572,45572,11,45628,45628,11,45684,45684,11,45740,45740,11,45796,45796,11,45852,45852,11,45908,45908,11,45964,45964,11,46020,46020,11,46076,46076,11,46132,46132,11,46188,46188,11,46244,46244,11,46300,46300,11,46356,46356,11,46412,46412,11,46468,46468,11,46524,46524,11,46580,46580,11,46636,46636,11,46692,46692,11,46748,46748,11,46804,46804,11,46860,46860,11,46916,46916,11,46972,46972,11,47028,47028,11,47084,47084,11,47140,47140,11,47196,47196,11,47252,47252,11,47308,47308,11,47364,47364,11,47420,47420,11,47476,47476,11,47532,47532,11,47588,47588,11,47644,47644,11,47700,47700,11,47756,47756,11,47812,47812,11,47868,47868,11,47924,47924,11,47980,47980,11,48036,48036,11,48092,48092,11,48148,48148,11,48204,48204,11,48260,48260,11,48316,48316,11,48372,48372,11,48428,48428,11,48484,48484,11,48540,48540,11,48596,48596,11,48652,48652,11,48708,48708,11,48764,48764,11,48820,48820,11,48876,48876,11,48932,48932,11,48988,48988,11,49044,49044,11,49100,49100,11,49156,49156,11,49212,49212,11,49268,49268,11,49324,49324,11,49380,49380,11,49436,49436,11,49492,49492,11,49548,49548,11,49604,49604,11,49660,49660,11,49716,49716,11,49772,49772,11,49828,49828,11,49884,49884,11,49940,49940,11,49996,49996,11,50052,50052,11,50108,50108,11,50164,50164,11,50220,50220,11,50276,50276,11,50332,50332,11,50388,50388,11,50444,50444,11,50500,50500,11,50556,50556,11,50612,50612,11,50668,50668,11,50724,50724,11,50780,50780,11,50836,50836,11,50892,50892,11,50948,50948,11,51004,51004,11,51060,51060,11,51116,51116,11,51172,51172,11,51228,51228,11,51284,51284,11,51340,51340,11,51396,51396,11,51452,51452,11,51508,51508,11,51564,51564,11,51620,51620,11,51676,51676,11,51732,51732,11,51788,51788,11,51844,51844,11,51900,51900,11,51956,51956,11,52012,52012,11,52068,52068,11,52124,52124,11,52180,52180,11,52236,52236,11,52292,52292,11,52348,52348,11,52404,52404,11,52460,52460,11,52516,52516,11,52572,52572,11,52628,52628,11,52684,52684,11,52740,52740,11,52796,52796,11,52852,52852,11,52908,52908,11,52964,52964,11,53020,53020,11,53076,53076,11,53132,53132,11,53188,53188,11,53244,53244,11,53300,53300,11,53356,53356,11,53412,53412,11,53468,53468,11,53524,53524,11,53580,53580,11,53636,53636,11,53692,53692,11,53748,53748,11,53804,53804,11,53860,53860,11,53916,53916,11,53972,53972,11,54028,54028,11,54084,54084,11,54140,54140,11,54196,54196,11,54252,54252,11,54308,54308,11,54364,54364,11,54420,54420,11,54476,54476,11,54532,54532,11,54588,54588,11,54644,54644,11,54700,54700,11,54756,54756,11,54812,54812,11,54868,54868,11,54924,54924,11,54980,54980,11,55036,55036,11,55092,55092,11,55148,55148,11,55216,55238,9,65056,65071,5,65529,65531,4,68097,68099,5,68159,68159,5,69446,69456,5,69688,69702,5,69808,69810,7,69815,69816,7,69821,69821,1,69888,69890,5,69932,69932,7,69957,69958,7,70016,70017,5,70067,70069,7,70079,70080,7,70089,70092,5,70095,70095,5,70191,70193,5,70196,70196,5,70198,70199,5,70367,70367,5,70371,70378,5,70402,70403,7,70462,70462,5,70464,70464,5,70471,70472,7,70487,70487,5,70502,70508,5,70709,70711,7,70720,70721,7,70725,70725,7,70750,70750,5,70833,70834,7,70841,70841,7,70843,70844,7,70846,70846,7,70849,70849,7,71087,71087,5,71090,71093,5,71100,71101,5,71103,71104,5,71216,71218,7,71227,71228,7,71230,71230,7,71339,71339,5,71341,71341,5,71344,71349,5,71351,71351,5,71456,71457,7,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123628,123631,5,125252,125258,5,126980,126980,14,127183,127183,14,127245,127247,14,127340,127343,14,127358,127359,14,127377,127386,14,127462,127487,6,127491,127503,14,127535,127535,14,127548,127551,14,127568,127569,14,127744,127777,14,127780,127891,14,127894,127895,14,127897,127899,14,127902,127984,14,127987,127989,14,127991,127994,14,128000,128253,14,128255,128317,14,128329,128334,14,128336,128359,14,128367,128368,14,128371,128377,14,128379,128390,14,128392,128393,14,128398,128399,14,128401,128404,14,128407,128419,14,128421,128421,14,128424,128424,14,128433,128434,14,128444,128444,14,128450,128452,14,128465,128467,14,128476,128478,14,128481,128481,14,128483,128483,14,128488,128488,14,128495,128495,14,128499,128499,14,128506,128591,14,128710,128714,14,128721,128722,14,128725,128725,14,128728,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129664,129666,14,129671,129679,14,129686,129704,14,129712,129718,14,129728,129730,14,129744,129750,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2259,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3134,3136,5,3142,3144,5,3157,3158,5,3201,3201,5,3260,3260,5,3263,3263,5,3266,3266,5,3270,3270,5,3274,3275,7,3285,3286,5,3328,3329,5,3387,3388,5,3391,3392,7,3398,3400,7,3405,3405,5,3415,3415,5,3457,3457,5,3530,3530,5,3536,3537,7,3542,3542,5,3551,3551,5,3633,3633,5,3636,3642,5,3761,3761,5,3764,3772,5,3864,3865,5,3895,3895,5,3902,3903,7,3967,3967,7,3974,3975,5,3993,4028,5,4141,4144,5,4146,4151,5,4155,4156,7,4182,4183,7,4190,4192,5,4226,4226,5,4229,4230,5,4253,4253,5,4448,4519,9,4957,4959,5,5938,5940,5,6002,6003,5,6070,6070,7,6078,6085,7,6087,6088,7,6109,6109,5,6158,6158,4,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6848,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7673,5,8203,8203,4,8205,8205,13,8232,8232,4,8234,8238,4,8265,8265,14,8293,8293,4,8400,8412,5,8417,8417,5,8421,8432,5,8505,8505,14,8617,8618,14,9000,9000,14,9167,9167,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9776,9783,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9935,14,9937,9937,14,9939,9940,14,9961,9962,14,9968,9973,14,9975,9978,14,9981,9981,14,9986,9986,14,9989,9989,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10084,14,10133,10135,14,10160,10160,14,10548,10549,14,11035,11036,14,11093,11093,14,11647,11647,5,12330,12333,5,12336,12336,14,12441,12442,5,12953,12953,14,42608,42610,5,42654,42655,5,43010,43010,5,43019,43019,5,43045,43046,5,43052,43052,5,43188,43203,7,43232,43249,5,43302,43309,5,43346,43347,7,43392,43394,5,43443,43443,5,43446,43449,5,43452,43453,5,43493,43493,5,43567,43568,7,43571,43572,7,43587,43587,5,43597,43597,7,43696,43696,5,43703,43704,5,43713,43713,5,43756,43757,5,43765,43765,7,44003,44004,7,44006,44007,7,44009,44010,7,44013,44013,5,44033,44059,12,44061,44087,12,44089,44115,12,44117,44143,12,44145,44171,12,44173,44199,12,44201,44227,12,44229,44255,12,44257,44283,12,44285,44311,12,44313,44339,12,44341,44367,12,44369,44395,12,44397,44423,12,44425,44451,12,44453,44479,12,44481,44507,12,44509,44535,12,44537,44563,12,44565,44591,12,44593,44619,12,44621,44647,12,44649,44675,12,44677,44703,12,44705,44731,12,44733,44759,12,44761,44787,12,44789,44815,12,44817,44843,12,44845,44871,12,44873,44899,12,44901,44927,12,44929,44955,12,44957,44983,12,44985,45011,12,45013,45039,12,45041,45067,12,45069,45095,12,45097,45123,12,45125,45151,12,45153,45179,12,45181,45207,12,45209,45235,12,45237,45263,12,45265,45291,12,45293,45319,12,45321,45347,12,45349,45375,12,45377,45403,12,45405,45431,12,45433,45459,12,45461,45487,12,45489,45515,12,45517,45543,12,45545,45571,12,45573,45599,12,45601,45627,12,45629,45655,12,45657,45683,12,45685,45711,12,45713,45739,12,45741,45767,12,45769,45795,12,45797,45823,12,45825,45851,12,45853,45879,12,45881,45907,12,45909,45935,12,45937,45963,12,45965,45991,12,45993,46019,12,46021,46047,12,46049,46075,12,46077,46103,12,46105,46131,12,46133,46159,12,46161,46187,12,46189,46215,12,46217,46243,12,46245,46271,12,46273,46299,12,46301,46327,12,46329,46355,12,46357,46383,12,46385,46411,12,46413,46439,12,46441,46467,12,46469,46495,12,46497,46523,12,46525,46551,12,46553,46579,12,46581,46607,12,46609,46635,12,46637,46663,12,46665,46691,12,46693,46719,12,46721,46747,12,46749,46775,12,46777,46803,12,46805,46831,12,46833,46859,12,46861,46887,12,46889,46915,12,46917,46943,12,46945,46971,12,46973,46999,12,47001,47027,12,47029,47055,12,47057,47083,12,47085,47111,12,47113,47139,12,47141,47167,12,47169,47195,12,47197,47223,12,47225,47251,12,47253,47279,12,47281,47307,12,47309,47335,12,47337,47363,12,47365,47391,12,47393,47419,12,47421,47447,12,47449,47475,12,47477,47503,12,47505,47531,12,47533,47559,12,47561,47587,12,47589,47615,12,47617,47643,12,47645,47671,12,47673,47699,12,47701,47727,12,47729,47755,12,47757,47783,12,47785,47811,12,47813,47839,12,47841,47867,12,47869,47895,12,47897,47923,12,47925,47951,12,47953,47979,12,47981,48007,12,48009,48035,12,48037,48063,12,48065,48091,12,48093,48119,12,48121,48147,12,48149,48175,12,48177,48203,12,48205,48231,12,48233,48259,12,48261,48287,12,48289,48315,12,48317,48343,12,48345,48371,12,48373,48399,12,48401,48427,12,48429,48455,12,48457,48483,12,48485,48511,12,48513,48539,12,48541,48567,12,48569,48595,12,48597,48623,12,48625,48651,12,48653,48679,12,48681,48707,12,48709,48735,12,48737,48763,12,48765,48791,12,48793,48819,12,48821,48847,12,48849,48875,12,48877,48903,12,48905,48931,12,48933,48959,12,48961,48987,12,48989,49015,12,49017,49043,12,49045,49071,12,49073,49099,12,49101,49127,12,49129,49155,12,49157,49183,12,49185,49211,12,49213,49239,12,49241,49267,12,49269,49295,12,49297,49323,12,49325,49351,12,49353,49379,12,49381,49407,12,49409,49435,12,49437,49463,12,49465,49491,12,49493,49519,12,49521,49547,12,49549,49575,12,49577,49603,12,49605,49631,12,49633,49659,12,49661,49687,12,49689,49715,12,49717,49743,12,49745,49771,12,49773,49799,12,49801,49827,12,49829,49855,12,49857,49883,12,49885,49911,12,49913,49939,12,49941,49967,12,49969,49995,12,49997,50023,12,50025,50051,12,50053,50079,12,50081,50107,12,50109,50135,12,50137,50163,12,50165,50191,12,50193,50219,12,50221,50247,12,50249,50275,12,50277,50303,12,50305,50331,12,50333,50359,12,50361,50387,12,50389,50415,12,50417,50443,12,50445,50471,12,50473,50499,12,50501,50527,12,50529,50555,12,50557,50583,12,50585,50611,12,50613,50639,12,50641,50667,12,50669,50695,12,50697,50723,12,50725,50751,12,50753,50779,12,50781,50807,12,50809,50835,12,50837,50863,12,50865,50891,12,50893,50919,12,50921,50947,12,50949,50975,12,50977,51003,12,51005,51031,12,51033,51059,12,51061,51087,12,51089,51115,12,51117,51143,12,51145,51171,12,51173,51199,12,51201,51227,12,51229,51255,12,51257,51283,12,51285,51311,12,51313,51339,12,51341,51367,12,51369,51395,12,51397,51423,12,51425,51451,12,51453,51479,12,51481,51507,12,51509,51535,12,51537,51563,12,51565,51591,12,51593,51619,12,51621,51647,12,51649,51675,12,51677,51703,12,51705,51731,12,51733,51759,12,51761,51787,12,51789,51815,12,51817,51843,12,51845,51871,12,51873,51899,12,51901,51927,12,51929,51955,12,51957,51983,12,51985,52011,12,52013,52039,12,52041,52067,12,52069,52095,12,52097,52123,12,52125,52151,12,52153,52179,12,52181,52207,12,52209,52235,12,52237,52263,12,52265,52291,12,52293,52319,12,52321,52347,12,52349,52375,12,52377,52403,12,52405,52431,12,52433,52459,12,52461,52487,12,52489,52515,12,52517,52543,12,52545,52571,12,52573,52599,12,52601,52627,12,52629,52655,12,52657,52683,12,52685,52711,12,52713,52739,12,52741,52767,12,52769,52795,12,52797,52823,12,52825,52851,12,52853,52879,12,52881,52907,12,52909,52935,12,52937,52963,12,52965,52991,12,52993,53019,12,53021,53047,12,53049,53075,12,53077,53103,12,53105,53131,12,53133,53159,12,53161,53187,12,53189,53215,12,53217,53243,12,53245,53271,12,53273,53299,12,53301,53327,12,53329,53355,12,53357,53383,12,53385,53411,12,53413,53439,12,53441,53467,12,53469,53495,12,53497,53523,12,53525,53551,12,53553,53579,12,53581,53607,12,53609,53635,12,53637,53663,12,53665,53691,12,53693,53719,12,53721,53747,12,53749,53775,12,53777,53803,12,53805,53831,12,53833,53859,12,53861,53887,12,53889,53915,12,53917,53943,12,53945,53971,12,53973,53999,12,54001,54027,12,54029,54055,12,54057,54083,12,54085,54111,12,54113,54139,12,54141,54167,12,54169,54195,12,54197,54223,12,54225,54251,12,54253,54279,12,54281,54307,12,54309,54335,12,54337,54363,12,54365,54391,12,54393,54419,12,54421,54447,12,54449,54475,12,54477,54503,12,54505,54531,12,54533,54559,12,54561,54587,12,54589,54615,12,54617,54643,12,54645,54671,12,54673,54699,12,54701,54727,12,54729,54755,12,54757,54783,12,54785,54811,12,54813,54839,12,54841,54867,12,54869,54895,12,54897,54923,12,54925,54951,12,54953,54979,12,54981,55007,12,55009,55035,12,55037,55063,12,55065,55091,12,55093,55119,12,55121,55147,12,55149,55175,12,55177,55203,12,55243,55291,10,65024,65039,5,65279,65279,4,65520,65528,4,66045,66045,5,66422,66426,5,68101,68102,5,68152,68154,5,68325,68326,5,69291,69292,5,69632,69632,7,69634,69634,7,69759,69761,5]"
					);
				}
				return (
					(e.getInstance = function () {
						return e._INSTANCE || (e._INSTANCE = new e()), e._INSTANCE;
					}),
					(e.prototype.getGraphemeBreakType = function (e) {
						if (e < 32) return 10 === e ? 3 : 13 === e ? 2 : 4;
						if (e < 127) return 0;
						for (var t = this._data, n = t.length / 3, r = 1; r <= n; )
							if (e < t[3 * r]) r *= 2;
							else {
								if (!(e > t[3 * r + 1])) return t[3 * r + 2];
								r = 2 * r + 1;
							}
						return 0;
					}),
					(e._INSTANCE = null),
					e
				);
			})();
		}),
		e(n[10], r([0, 1]), function (e, t) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var n = {
				number: "number",
				string: "string",
				undefined: "undefined",
				object: "object",
				function: "function",
			};
			function r(e) {
				return typeof e === n.string || e instanceof String;
			}
			function i(e) {
				return !(
					typeof e !== n.object ||
					null === e ||
					Array.isArray(e) ||
					e instanceof RegExp ||
					e instanceof Date
				);
			}
			function o(e) {
				return typeof e === n.undefined;
			}
			function s(e) {
				return o(e) || null === e;
			}
			(t.isArray = function (e) {
				return Array.isArray
					? Array.isArray(e)
					: !(!e || typeof e.length !== n.number || e.constructor !== Array);
			}),
				(t.isString = r),
				(t.isObject = i),
				(t.isNumber = function (e) {
					return (typeof e === n.number || e instanceof Number) && !isNaN(e);
				}),
				(t.isBoolean = function (e) {
					return !0 === e || !1 === e;
				}),
				(t.isUndefined = o),
				(t.isUndefinedOrNull = s),
				(t.assertType = function (e, t) {
					if (!e)
						throw new Error(
							t ? "Unexpected type, expected '" + t + "'" : "Unexpected type"
						);
				});
			var u = Object.prototype.hasOwnProperty;
			function a(e) {
				return typeof e === n.function;
			}
			function l(e, t) {
				if (r(t)) {
					if (typeof e !== t)
						throw new Error("argument does not match constraint: typeof " + t);
				} else if (a(t)) {
					try {
						if (e instanceof t) return;
					} catch (e) {}
					if (!s(e) && e.constructor === t) return;
					if (1 === t.length && !0 === t.call(void 0, e)) return;
					throw new Error(
						"argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true"
					);
				}
			}
			function c(e) {
				for (var t = [], n = Object.getPrototypeOf(e); Object.prototype !== n; )
					(t = t.concat(Object.getOwnPropertyNames(n))),
						(n = Object.getPrototypeOf(n));
				return t;
			}
			(t.isEmptyObject = function (e) {
				if (!i(e)) return !1;
				for (var t in e) if (u.call(e, t)) return !1;
				return !0;
			}),
				(t.isFunction = a),
				(t.validateConstraints = function (e, t) {
					for (var n = Math.min(e.length, t.length), r = 0; r < n; r++)
						l(e[r], t[r]);
				}),
				(t.validateConstraint = l),
				(t.getAllPropertyNames = c),
				(t.getAllMethodNames = function (e) {
					for (var t = [], n = 0, r = c(e); n < r.length; n++) {
						var i = r[n];
						"function" == typeof e[i] && t.push(i);
					}
					return t;
				}),
				(t.createProxyObject = function (e, t) {
					for (
						var n = function (e) {
								return function () {
									var n = Array.prototype.slice.call(arguments, 0);
									return t(e, n);
								};
							},
							r = {},
							i = 0,
							o = e;
						i < o.length;
						i++
					) {
						var s = o[i];
						r[s] = n(s);
					}
					return r;
				}),
				(t.withNullAsUndefined = function (e) {
					return null === e ? void 0 : e;
				}),
				(t.withUndefinedAsNull = function (e) {
					return void 0 === e ? null : e;
				});
		}),
		e(n[11], r([0, 1]), function (e, t) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 }),
				(t.toUint8 = function (e) {
					return e < 0 ? 0 : e > 255 ? 255 : 0 | e;
				}),
				(t.toUint32 = function (e) {
					return e < 0 ? 0 : e > 4294967295 ? 4294967295 : 0 | e;
				});
		}),
		e(n[12], r([0, 1, 4]), function (e, t, n) {
			"use strict";
			var r;
			Object.defineProperty(t, "__esModule", { value: !0 });
			var i = /^\w[\w\d+.-]*$/,
				o = /^\//,
				s = /^\/\//;
			var u = "",
				l = "/",
				c = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
				d = (function () {
					function e(e, t, n, r, a, c) {
						void 0 === c && (c = !1),
							"object" == typeof e
								? ((this.scheme = e.scheme || u),
								  (this.authority = e.authority || u),
								  (this.path = e.path || u),
								  (this.query = e.query || u),
								  (this.fragment = e.fragment || u))
								: ((this.scheme = (function (e, t) {
										return e || t ? e : "file";
								  })(e, c)),
								  (this.authority = t || u),
								  (this.path = (function (e, t) {
										switch (e) {
											case "https":
											case "http":
											case "file":
												t ? t[0] !== l && (t = l + t) : (t = l);
										}
										return t;
								  })(this.scheme, n || u)),
								  (this.query = r || u),
								  (this.fragment = a || u),
								  (function (e, t) {
										if (!e.scheme && t)
											throw new Error(
												'[UriError]: Scheme is missing: {scheme: "", authority: "' +
													e.authority +
													'", path: "' +
													e.path +
													'", query: "' +
													e.query +
													'", fragment: "' +
													e.fragment +
													'"}'
											);
										if (e.scheme && !i.test(e.scheme))
											throw new Error(
												"[UriError]: Scheme contains illegal characters."
											);
										if (e.path)
											if (e.authority) {
												if (!o.test(e.path))
													throw new Error(
														'[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
													);
											} else if (s.test(e.path))
												throw new Error(
													'[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
												);
								  })(this, c));
					}
					return (
						(e.isUri = function (t) {
							return (
								t instanceof e ||
								(!!t &&
									"string" == typeof t.authority &&
									"string" == typeof t.fragment &&
									"string" == typeof t.path &&
									"string" == typeof t.query &&
									"string" == typeof t.scheme &&
									"function" == typeof t.fsPath &&
									"function" == typeof t.with &&
									"function" == typeof t.toString)
							);
						}),
						Object.defineProperty(e.prototype, "fsPath", {
							get: function () {
								return v(this);
							},
							enumerable: !0,
							configurable: !0,
						}),
						(e.prototype.with = function (e) {
							if (!e) return this;
							var t = e.scheme,
								n = e.authority,
								r = e.path,
								i = e.query,
								o = e.fragment;
							return (
								void 0 === t ? (t = this.scheme) : null === t && (t = u),
								void 0 === n ? (n = this.authority) : null === n && (n = u),
								void 0 === r ? (r = this.path) : null === r && (r = u),
								void 0 === i ? (i = this.query) : null === i && (i = u),
								void 0 === o ? (o = this.fragment) : null === o && (o = u),
								t === this.scheme &&
								n === this.authority &&
								r === this.path &&
								i === this.query &&
								o === this.fragment
									? this
									: new h(t, n, r, i, o)
							);
						}),
						(e.parse = function (e, t) {
							void 0 === t && (t = !1);
							var n = c.exec(e);
							return n
								? new h(
										n[2] || u,
										b(n[4] || u),
										b(n[5] || u),
										b(n[7] || u),
										b(n[9] || u),
										t
								  )
								: new h(u, u, u, u, u);
						}),
						(e.file = function (e) {
							var t = u;
							if (
								(n.isWindows && (e = e.replace(/\\/g, l)),
								e[0] === l && e[1] === l)
							) {
								var r = e.indexOf(l, 2);
								-1 === r
									? ((t = e.substring(2)), (e = l))
									: ((t = e.substring(2, r)), (e = e.substring(r) || l));
							}
							return new h("file", t, e, u, u);
						}),
						(e.from = function (e) {
							return new h(e.scheme, e.authority, e.path, e.query, e.fragment);
						}),
						(e.prototype.toString = function (e) {
							return void 0 === e && (e = !1), _(this, e);
						}),
						(e.prototype.toJSON = function () {
							return this;
						}),
						(e.revive = function (t) {
							if (t) {
								if (t instanceof e) return t;
								var n = new h(t);
								return (
									(n._formatted = t.external),
									(n._fsPath = t._sep === f ? t.fsPath : null),
									n
								);
							}
							return t;
						}),
						e
					);
				})();
			t.URI = d;
			var f = n.isWindows ? 1 : void 0,
				h = (function (e) {
					function t() {
						var t = (null !== e && e.apply(this, arguments)) || this;
						return (t._formatted = null), (t._fsPath = null), t;
					}
					return (
						a(t, e),
						Object.defineProperty(t.prototype, "fsPath", {
							get: function () {
								return this._fsPath || (this._fsPath = v(this)), this._fsPath;
							},
							enumerable: !0,
							configurable: !0,
						}),
						(t.prototype.toString = function (e) {
							return (
								void 0 === e && (e = !1),
								e
									? _(this, !0)
									: (this._formatted || (this._formatted = _(this, !1)),
									  this._formatted)
							);
						}),
						(t.prototype.toJSON = function () {
							var e = { $mid: 1 };
							return (
								this._fsPath && ((e.fsPath = this._fsPath), (e._sep = f)),
								this._formatted && (e.external = this._formatted),
								this.path && (e.path = this.path),
								this.scheme && (e.scheme = this.scheme),
								this.authority && (e.authority = this.authority),
								this.query && (e.query = this.query),
								this.fragment && (e.fragment = this.fragment),
								e
							);
						}),
						t
					);
				})(d),
				p =
					(((r = {})[58] = "%3A"),
					(r[47] = "%2F"),
					(r[63] = "%3F"),
					(r[35] = "%23"),
					(r[91] = "%5B"),
					(r[93] = "%5D"),
					(r[64] = "%40"),
					(r[33] = "%21"),
					(r[36] = "%24"),
					(r[38] = "%26"),
					(r[39] = "%27"),
					(r[40] = "%28"),
					(r[41] = "%29"),
					(r[42] = "%2A"),
					(r[43] = "%2B"),
					(r[44] = "%2C"),
					(r[59] = "%3B"),
					(r[61] = "%3D"),
					(r[32] = "%20"),
					r);
			function m(e, t) {
				for (var n = void 0, r = -1, i = 0; i < e.length; i++) {
					var o = e.charCodeAt(i);
					if (
						(o >= 97 && o <= 122) ||
						(o >= 65 && o <= 90) ||
						(o >= 48 && o <= 57) ||
						45 === o ||
						46 === o ||
						95 === o ||
						126 === o ||
						(t && 47 === o)
					)
						-1 !== r &&
							((n += encodeURIComponent(e.substring(r, i))), (r = -1)),
							void 0 !== n && (n += e.charAt(i));
					else {
						void 0 === n && (n = e.substr(0, i));
						var s = p[o];
						void 0 !== s
							? (-1 !== r &&
									((n += encodeURIComponent(e.substring(r, i))), (r = -1)),
							  (n += s))
							: -1 === r && (r = i);
					}
				}
				return (
					-1 !== r && (n += encodeURIComponent(e.substring(r))),
					void 0 !== n ? n : e
				);
			}
			function g(e) {
				for (var t = void 0, n = 0; n < e.length; n++) {
					var r = e.charCodeAt(n);
					35 === r || 63 === r
						? (void 0 === t && (t = e.substr(0, n)), (t += p[r]))
						: void 0 !== t && (t += e[n]);
				}
				return void 0 !== t ? t : e;
			}
			function v(e) {
				var t;
				return (
					(t =
						e.authority && e.path.length > 1 && "file" === e.scheme
							? "//" + e.authority + e.path
							: 47 === e.path.charCodeAt(0) &&
							  ((e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90) ||
									(e.path.charCodeAt(1) >= 97 &&
										e.path.charCodeAt(1) <= 122)) &&
							  58 === e.path.charCodeAt(2)
							? e.path[1].toLowerCase() + e.path.substr(2)
							: e.path),
					n.isWindows && (t = t.replace(/\//g, "\\")),
					t
				);
			}
			function _(e, t) {
				var n = t ? g : m,
					r = "",
					i = e.scheme,
					o = e.authority,
					s = e.path,
					u = e.query,
					a = e.fragment;
				if (
					(i && ((r += i), (r += ":")),
					(o || "file" === i) && ((r += l), (r += l)),
					o)
				) {
					var c = o.indexOf("@");
					if (-1 !== c) {
						var d = o.substr(0, c);
						(o = o.substr(c + 1)),
							-1 === (c = d.indexOf(":"))
								? (r += n(d, !1))
								: ((r += n(d.substr(0, c), !1)),
								  (r += ":"),
								  (r += n(d.substr(c + 1), !1))),
							(r += "@");
					}
					-1 === (c = (o = o.toLowerCase()).indexOf(":"))
						? (r += n(o, !1))
						: ((r += n(o.substr(0, c), !1)), (r += o.substr(c)));
				}
				if (s) {
					if (s.length >= 3 && 47 === s.charCodeAt(0) && 58 === s.charCodeAt(2))
						(f = s.charCodeAt(1)) >= 65 &&
							f <= 90 &&
							(s = "/" + String.fromCharCode(f + 32) + ":" + s.substr(3));
					else if (s.length >= 2 && 58 === s.charCodeAt(1)) {
						var f;
						(f = s.charCodeAt(0)) >= 65 &&
							f <= 90 &&
							(s = String.fromCharCode(f + 32) + ":" + s.substr(2));
					}
					r += n(s, !0);
				}
				return (
					u && ((r += "?"), (r += n(u, !1))),
					a && ((r += "#"), (r += t ? a : m(a, !1))),
					r
				);
			}
			var y = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
			function b(e) {
				return e.match(y)
					? e.replace(y, function (e) {
							return (function e(t) {
								try {
									return decodeURIComponent(t);
								} catch (n) {
									return t.length > 3 ? t.substr(0, 3) + e(t.substr(3)) : t;
								}
							})(e);
					  })
					: e;
			}
		}),
		e(n[32], r([0, 1, 3, 8, 4, 10]), function (e, t, n, r, i, o) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var s = "$initialize",
				u = !1;
			t.logOnceWebWorkerWarning = function (e) {
				i.isWeb &&
					(u ||
						((u = !0),
						console.warn(
							"Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/Microsoft/monaco-editor#faq"
						)),
					console.warn(e.message));
			};
			var l = (function () {
					function e(e) {
						(this._workerId = -1),
							(this._handler = e),
							(this._lastSentReq = 0),
							(this._pendingReplies = Object.create(null));
					}
					return (
						(e.prototype.setWorkerId = function (e) {
							this._workerId = e;
						}),
						(e.prototype.sendMessage = function (e, t) {
							var n = this,
								r = String(++this._lastSentReq);
							return new Promise(function (i, o) {
								(n._pendingReplies[r] = { resolve: i, reject: o }),
									n._send({
										vsWorker: n._workerId,
										req: r,
										method: e,
										args: t,
									});
							});
						}),
						(e.prototype.handleMessage = function (e) {
							e &&
								e.vsWorker &&
								((-1 !== this._workerId && e.vsWorker !== this._workerId) ||
									this._handleMessage(e));
						}),
						(e.prototype._handleMessage = function (e) {
							var t = this;
							if (e.seq) {
								var r = e;
								if (!this._pendingReplies[r.seq])
									return void console.warn("Got reply to unknown seq");
								var i = this._pendingReplies[r.seq];
								if ((delete this._pendingReplies[r.seq], r.err)) {
									var o = r.err;
									return (
										r.err.$isError &&
											(((o = new Error()).name = r.err.name),
											(o.message = r.err.message),
											(o.stack = r.err.stack)),
										void i.reject(o)
									);
								}
								i.resolve(r.res);
							} else {
								var s = e,
									u = s.req;
								this._handler.handleMessage(s.method, s.args).then(
									function (e) {
										t._send({
											vsWorker: t._workerId,
											seq: u,
											res: e,
											err: void 0,
										});
									},
									function (e) {
										e.detail instanceof Error &&
											(e.detail = n.transformErrorForSerialization(e.detail)),
											t._send({
												vsWorker: t._workerId,
												seq: u,
												res: void 0,
												err: n.transformErrorForSerialization(e),
											});
									}
								);
							}
						}),
						(e.prototype._send = function (e) {
							var t = [];
							if (e.req)
								for (var n = e, r = 0; r < n.args.length; r++)
									n.args[r] instanceof ArrayBuffer && t.push(n.args[r]);
							else (n = e).res instanceof ArrayBuffer && t.push(n.res);
							this._handler.sendMessage(e, t);
						}),
						e
					);
				})(),
				c = (function (e) {
					function t(t, n, r) {
						var i = e.call(this) || this,
							u = null;
						(i._worker = i._register(
							t.create(
								"vs/base/common/worker/simpleWorker",
								function (e) {
									i._protocol.handleMessage(e);
								},
								function (e) {
									u && u(e);
								}
							)
						)),
							(i._protocol = new l({
								sendMessage: function (e, t) {
									i._worker.postMessage(e, t);
								},
								handleMessage: function (e, t) {
									if ("function" != typeof r[e])
										return Promise.reject(
											new Error("Missing method " + e + " on main thread host.")
										);
									try {
										return Promise.resolve(r[e].apply(r, t));
									} catch (e) {
										return Promise.reject(e);
									}
								},
							})),
							i._protocol.setWorkerId(i._worker.getId());
						var a = null;
						void 0 !== self.require &&
						"function" == typeof self.require.getConfig
							? (a = self.require.getConfig())
							: void 0 !== self.requirejs &&
							  (a = self.requirejs.s.contexts._.config);
						var c = o.getAllMethodNames(r);
						i._onModuleLoaded = i._protocol.sendMessage(s, [
							i._worker.getId(),
							JSON.parse(JSON.stringify(a)),
							n,
							c,
						]);
						var d = function (e, t) {
							return i._request(e, t);
						};
						return (
							(i._lazyProxy = new Promise(function (e, t) {
								(u = t),
									i._onModuleLoaded.then(
										function (t) {
											e(o.createProxyObject(t, d));
										},
										function (e) {
											t(e), i._onError("Worker failed to load " + n, e);
										}
									);
							})),
							i
						);
					}
					return (
						a(t, e),
						(t.prototype.getProxyObject = function () {
							return this._lazyProxy;
						}),
						(t.prototype._request = function (e, t) {
							var n = this;
							return new Promise(function (r, i) {
								n._onModuleLoaded.then(function () {
									n._protocol.sendMessage(e, t).then(r, i);
								}, i);
							});
						}),
						(t.prototype._onError = function (e, t) {
							console.error(e), console.info(t);
						}),
						t
					);
				})(r.Disposable);
			t.SimpleWorkerClient = c;
			var d = (function () {
				function e(e, t) {
					var n = this;
					(this._requestHandlerFactory = t),
						(this._requestHandler = null),
						(this._protocol = new l({
							sendMessage: function (t, n) {
								e(t, n);
							},
							handleMessage: function (e, t) {
								return n._handleMessage(e, t);
							},
						}));
				}
				return (
					(e.prototype.onmessage = function (e) {
						this._protocol.handleMessage(e);
					}),
					(e.prototype._handleMessage = function (e, t) {
						if (e === s) return this.initialize(t[0], t[1], t[2], t[3]);
						if (
							!this._requestHandler ||
							"function" != typeof this._requestHandler[e]
						)
							return Promise.reject(
								new Error("Missing requestHandler or method: " + e)
							);
						try {
							return Promise.resolve(
								this._requestHandler[e].apply(this._requestHandler, t)
							);
						} catch (e) {
							return Promise.reject(e);
						}
					}),
					(e.prototype.initialize = function (e, t, n, r) {
						var i = this;
						this._protocol.setWorkerId(e);
						var s = o.createProxyObject(r, function (e, t) {
							return i._protocol.sendMessage(e, t);
						});
						return this._requestHandlerFactory
							? ((this._requestHandler = this._requestHandlerFactory(s)),
							  Promise.resolve(o.getAllMethodNames(this._requestHandler)))
							: (t &&
									(void 0 !== t.baseUrl && delete t.baseUrl,
									void 0 !== t.paths &&
										void 0 !== t.paths.vs &&
										delete t.paths.vs,
									(t.catchError = !0),
									self.require.config(t)),
							  new Promise(function (e, t) {
									self.require(
										[n],
										function (n) {
											(i._requestHandler = n.create(s)),
												i._requestHandler
													? e(o.getAllMethodNames(i._requestHandler))
													: t(new Error("No RequestHandler!"));
										},
										t
									);
							  }));
					}),
					e
				);
			})();
			(t.SimpleWorkerServer = d),
				(t.create = function (e) {
					return new d(e, null);
				});
		}),
		e(n[21], r([0, 1, 11]), function (e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var r = (function () {
				function e(t) {
					var r = n.toUint8(t);
					(this._defaultValue = r),
						(this._asciiMap = e._createAsciiMap(r)),
						(this._map = new Map());
				}
				return (
					(e._createAsciiMap = function (e) {
						for (var t = new Uint8Array(256), n = 0; n < 256; n++) t[n] = e;
						return t;
					}),
					(e.prototype.set = function (e, t) {
						var r = n.toUint8(t);
						e >= 0 && e < 256 ? (this._asciiMap[e] = r) : this._map.set(e, r);
					}),
					(e.prototype.get = function (e) {
						return e >= 0 && e < 256
							? this._asciiMap[e]
							: this._map.get(e) || this._defaultValue;
					}),
					e
				);
			})();
			t.CharacterClassifier = r;
			var i = (function () {
				function e() {
					this._actual = new r(0);
				}
				return (
					(e.prototype.add = function (e) {
						this._actual.set(e, 1);
					}),
					(e.prototype.has = function (e) {
						return 1 === this._actual.get(e);
					}),
					e
				);
			})();
			t.CharacterSet = i;
		}),
		e(n[2], r([0, 1]), function (e, t) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var n = (function () {
				function e(e, t) {
					(this.lineNumber = e), (this.column = t);
				}
				return (
					(e.prototype.with = function (t, n) {
						return (
							void 0 === t && (t = this.lineNumber),
							void 0 === n && (n = this.column),
							t === this.lineNumber && n === this.column ? this : new e(t, n)
						);
					}),
					(e.prototype.delta = function (e, t) {
						return (
							void 0 === e && (e = 0),
							void 0 === t && (t = 0),
							this.with(this.lineNumber + e, this.column + t)
						);
					}),
					(e.prototype.equals = function (t) {
						return e.equals(this, t);
					}),
					(e.equals = function (e, t) {
						return (
							(!e && !t) ||
							(!!e &&
								!!t &&
								e.lineNumber === t.lineNumber &&
								e.column === t.column)
						);
					}),
					(e.prototype.isBefore = function (t) {
						return e.isBefore(this, t);
					}),
					(e.isBefore = function (e, t) {
						return (
							e.lineNumber < t.lineNumber ||
							(!(t.lineNumber < e.lineNumber) && e.column < t.column)
						);
					}),
					(e.prototype.isBeforeOrEqual = function (t) {
						return e.isBeforeOrEqual(this, t);
					}),
					(e.isBeforeOrEqual = function (e, t) {
						return (
							e.lineNumber < t.lineNumber ||
							(!(t.lineNumber < e.lineNumber) && e.column <= t.column)
						);
					}),
					(e.compare = function (e, t) {
						var n = 0 | e.lineNumber,
							r = 0 | t.lineNumber;
						return n === r ? (0 | e.column) - (0 | t.column) : n - r;
					}),
					(e.prototype.clone = function () {
						return new e(this.lineNumber, this.column);
					}),
					(e.prototype.toString = function () {
						return "(" + this.lineNumber + "," + this.column + ")";
					}),
					(e.lift = function (t) {
						return new e(t.lineNumber, t.column);
					}),
					(e.isIPosition = function (e) {
						return (
							e &&
							"number" == typeof e.lineNumber &&
							"number" == typeof e.column
						);
					}),
					e
				);
			})();
			t.Position = n;
		}),
		e(n[5], r([0, 1, 2]), function (e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var r = (function () {
				function e(e, t, n, r) {
					e > n || (e === n && t > r)
						? ((this.startLineNumber = n),
						  (this.startColumn = r),
						  (this.endLineNumber = e),
						  (this.endColumn = t))
						: ((this.startLineNumber = e),
						  (this.startColumn = t),
						  (this.endLineNumber = n),
						  (this.endColumn = r));
				}
				return (
					(e.prototype.isEmpty = function () {
						return e.isEmpty(this);
					}),
					(e.isEmpty = function (e) {
						return (
							e.startLineNumber === e.endLineNumber &&
							e.startColumn === e.endColumn
						);
					}),
					(e.prototype.containsPosition = function (t) {
						return e.containsPosition(this, t);
					}),
					(e.containsPosition = function (e, t) {
						return (
							!(
								t.lineNumber < e.startLineNumber ||
								t.lineNumber > e.endLineNumber
							) &&
							!(
								t.lineNumber === e.startLineNumber && t.column < e.startColumn
							) &&
							!(t.lineNumber === e.endLineNumber && t.column > e.endColumn)
						);
					}),
					(e.prototype.containsRange = function (t) {
						return e.containsRange(this, t);
					}),
					(e.containsRange = function (e, t) {
						return (
							!(
								t.startLineNumber < e.startLineNumber ||
								t.endLineNumber < e.startLineNumber
							) &&
							!(
								t.startLineNumber > e.endLineNumber ||
								t.endLineNumber > e.endLineNumber
							) &&
							!(
								t.startLineNumber === e.startLineNumber &&
								t.startColumn < e.startColumn
							) &&
							!(
								t.endLineNumber === e.endLineNumber && t.endColumn > e.endColumn
							)
						);
					}),
					(e.prototype.strictContainsRange = function (t) {
						return e.strictContainsRange(this, t);
					}),
					(e.strictContainsRange = function (e, t) {
						return (
							!(
								t.startLineNumber < e.startLineNumber ||
								t.endLineNumber < e.startLineNumber
							) &&
							!(
								t.startLineNumber > e.endLineNumber ||
								t.endLineNumber > e.endLineNumber
							) &&
							!(
								t.startLineNumber === e.startLineNumber &&
								t.startColumn <= e.startColumn
							) &&
							!(
								t.endLineNumber === e.endLineNumber &&
								t.endColumn >= e.endColumn
							)
						);
					}),
					(e.prototype.plusRange = function (t) {
						return e.plusRange(this, t);
					}),
					(e.plusRange = function (t, n) {
						var r, i, o, s;
						return (
							n.startLineNumber < t.startLineNumber
								? ((r = n.startLineNumber), (i = n.startColumn))
								: n.startLineNumber === t.startLineNumber
								? ((r = n.startLineNumber),
								  (i = Math.min(n.startColumn, t.startColumn)))
								: ((r = t.startLineNumber), (i = t.startColumn)),
							n.endLineNumber > t.endLineNumber
								? ((o = n.endLineNumber), (s = n.endColumn))
								: n.endLineNumber === t.endLineNumber
								? ((o = n.endLineNumber),
								  (s = Math.max(n.endColumn, t.endColumn)))
								: ((o = t.endLineNumber), (s = t.endColumn)),
							new e(r, i, o, s)
						);
					}),
					(e.prototype.intersectRanges = function (t) {
						return e.intersectRanges(this, t);
					}),
					(e.intersectRanges = function (t, n) {
						var r = t.startLineNumber,
							i = t.startColumn,
							o = t.endLineNumber,
							s = t.endColumn,
							u = n.startLineNumber,
							a = n.startColumn,
							l = n.endLineNumber,
							c = n.endColumn;
						return (
							r < u ? ((r = u), (i = a)) : r === u && (i = Math.max(i, a)),
							o > l ? ((o = l), (s = c)) : o === l && (s = Math.min(s, c)),
							r > o ? null : r === o && i > s ? null : new e(r, i, o, s)
						);
					}),
					(e.prototype.equalsRange = function (t) {
						return e.equalsRange(this, t);
					}),
					(e.equalsRange = function (e, t) {
						return (
							!!e &&
							!!t &&
							e.startLineNumber === t.startLineNumber &&
							e.startColumn === t.startColumn &&
							e.endLineNumber === t.endLineNumber &&
							e.endColumn === t.endColumn
						);
					}),
					(e.prototype.getEndPosition = function () {
						return new n.Position(this.endLineNumber, this.endColumn);
					}),
					(e.prototype.getStartPosition = function () {
						return new n.Position(this.startLineNumber, this.startColumn);
					}),
					(e.prototype.toString = function () {
						return (
							"[" +
							this.startLineNumber +
							"," +
							this.startColumn +
							" -> " +
							this.endLineNumber +
							"," +
							this.endColumn +
							"]"
						);
					}),
					(e.prototype.setEndPosition = function (t, n) {
						return new e(this.startLineNumber, this.startColumn, t, n);
					}),
					(e.prototype.setStartPosition = function (t, n) {
						return new e(t, n, this.endLineNumber, this.endColumn);
					}),
					(e.prototype.collapseToStart = function () {
						return e.collapseToStart(this);
					}),
					(e.collapseToStart = function (t) {
						return new e(
							t.startLineNumber,
							t.startColumn,
							t.startLineNumber,
							t.startColumn
						);
					}),
					(e.fromPositions = function (t, n) {
						return (
							void 0 === n && (n = t),
							new e(t.lineNumber, t.column, n.lineNumber, n.column)
						);
					}),
					(e.lift = function (t) {
						return t
							? new e(
									t.startLineNumber,
									t.startColumn,
									t.endLineNumber,
									t.endColumn
							  )
							: null;
					}),
					(e.isIRange = function (e) {
						return (
							e &&
							"number" == typeof e.startLineNumber &&
							"number" == typeof e.startColumn &&
							"number" == typeof e.endLineNumber &&
							"number" == typeof e.endColumn
						);
					}),
					(e.areIntersectingOrTouching = function (e, t) {
						return (
							!(
								e.endLineNumber < t.startLineNumber ||
								(e.endLineNumber === t.startLineNumber &&
									e.endColumn < t.startColumn)
							) &&
							!(
								t.endLineNumber < e.startLineNumber ||
								(t.endLineNumber === e.startLineNumber &&
									t.endColumn < e.startColumn)
							)
						);
					}),
					(e.areIntersecting = function (e, t) {
						return (
							!(
								e.endLineNumber < t.startLineNumber ||
								(e.endLineNumber === t.startLineNumber &&
									e.endColumn <= t.startColumn)
							) &&
							!(
								t.endLineNumber < e.startLineNumber ||
								(t.endLineNumber === e.startLineNumber &&
									t.endColumn <= e.startColumn)
							)
						);
					}),
					(e.compareRangesUsingStarts = function (e, t) {
						if (e && t) {
							var n = 0 | e.startLineNumber,
								r = 0 | t.startLineNumber;
							if (n === r) {
								var i = 0 | e.startColumn,
									o = 0 | t.startColumn;
								if (i === o) {
									var s = 0 | e.endLineNumber,
										u = 0 | t.endLineNumber;
									return s === u
										? (0 | e.endColumn) - (0 | t.endColumn)
										: s - u;
								}
								return i - o;
							}
							return n - r;
						}
						return (e ? 1 : 0) - (t ? 1 : 0);
					}),
					(e.compareRangesUsingEnds = function (e, t) {
						return e.endLineNumber === t.endLineNumber
							? e.endColumn === t.endColumn
								? e.startLineNumber === t.startLineNumber
									? e.startColumn - t.startColumn
									: e.startLineNumber - t.startLineNumber
								: e.endColumn - t.endColumn
							: e.endLineNumber - t.endLineNumber;
					}),
					(e.spansMultipleLines = function (e) {
						return e.endLineNumber > e.startLineNumber;
					}),
					e
				);
			})();
			t.Range = r;
		}),
		e(n[22], r([0, 1, 2, 5]), function (e, t, n, r) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var i = (function (e) {
				function t(t, n, r, i) {
					var o = e.call(this, t, n, r, i) || this;
					return (
						(o.selectionStartLineNumber = t),
						(o.selectionStartColumn = n),
						(o.positionLineNumber = r),
						(o.positionColumn = i),
						o
					);
				}
				return (
					a(t, e),
					(t.prototype.toString = function () {
						return (
							"[" +
							this.selectionStartLineNumber +
							"," +
							this.selectionStartColumn +
							" -> " +
							this.positionLineNumber +
							"," +
							this.positionColumn +
							"]"
						);
					}),
					(t.prototype.equalsSelection = function (e) {
						return t.selectionsEqual(this, e);
					}),
					(t.selectionsEqual = function (e, t) {
						return (
							e.selectionStartLineNumber === t.selectionStartLineNumber &&
							e.selectionStartColumn === t.selectionStartColumn &&
							e.positionLineNumber === t.positionLineNumber &&
							e.positionColumn === t.positionColumn
						);
					}),
					(t.prototype.getDirection = function () {
						return this.selectionStartLineNumber === this.startLineNumber &&
							this.selectionStartColumn === this.startColumn
							? 0
							: 1;
					}),
					(t.prototype.setEndPosition = function (e, n) {
						return 0 === this.getDirection()
							? new t(this.startLineNumber, this.startColumn, e, n)
							: new t(e, n, this.startLineNumber, this.startColumn);
					}),
					(t.prototype.getPosition = function () {
						return new n.Position(this.positionLineNumber, this.positionColumn);
					}),
					(t.prototype.setStartPosition = function (e, n) {
						return 0 === this.getDirection()
							? new t(e, n, this.endLineNumber, this.endColumn)
							: new t(this.endLineNumber, this.endColumn, e, n);
					}),
					(t.fromPositions = function (e, n) {
						return (
							void 0 === n && (n = e),
							new t(e.lineNumber, e.column, n.lineNumber, n.column)
						);
					}),
					(t.liftSelection = function (e) {
						return new t(
							e.selectionStartLineNumber,
							e.selectionStartColumn,
							e.positionLineNumber,
							e.positionColumn
						);
					}),
					(t.selectionsArrEqual = function (e, t) {
						if ((e && !t) || (!e && t)) return !1;
						if (!e && !t) return !0;
						if (e.length !== t.length) return !1;
						for (var n = 0, r = e.length; n < r; n++)
							if (!this.selectionsEqual(e[n], t[n])) return !1;
						return !0;
					}),
					(t.isISelection = function (e) {
						return (
							e &&
							"number" == typeof e.selectionStartLineNumber &&
							"number" == typeof e.selectionStartColumn &&
							"number" == typeof e.positionLineNumber &&
							"number" == typeof e.positionColumn
						);
					}),
					(t.createWithDirection = function (e, n, r, i, o) {
						return 0 === o ? new t(e, n, r, i) : new t(r, i, e, n);
					}),
					t
				);
			})(r.Range);
			t.Selection = i;
		}),
		e(n[23], r([0, 1]), function (e, t) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var n = (function () {
				function e(e, t, n) {
					(this.offset = 0 | e), (this.type = t), (this.language = n);
				}
				return (
					(e.prototype.toString = function () {
						return "(" + this.offset + ", " + this.type + ")";
					}),
					e
				);
			})();
			t.Token = n;
			var r = function (e, t) {
				(this.tokens = e), (this.endState = t);
			};
			t.TokenizationResult = r;
			var i = function (e, t) {
				(this.tokens = e), (this.endState = t);
			};
			t.TokenizationResult2 = i;
		}),
		e(n[24], r([0, 1, 6, 20]), function (e, t, n, r) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var i = 3;
			function o(e, t, r, i) {
				return new n.LcsDiff(e, t, r).ComputeDiff(i);
			}
			var s = (function () {
					function e(e) {
						for (var t = [], n = [], r = 0, i = e.length; r < i; r++)
							(t[r] = d(e[r], 1)), (n[r] = f(e[r], 1));
						(this.lines = e), (this._startColumns = t), (this._endColumns = n);
					}
					return (
						(e.prototype.getElements = function () {
							for (var e = [], t = 0, n = this.lines.length; t < n; t++)
								e[t] = this.lines[t].substring(
									this._startColumns[t] - 1,
									this._endColumns[t] - 1
								);
							return e;
						}),
						(e.prototype.getStartLineNumber = function (e) {
							return e + 1;
						}),
						(e.prototype.getEndLineNumber = function (e) {
							return e + 1;
						}),
						(e.prototype.createCharSequence = function (e, t, n) {
							for (var r = [], i = [], o = [], s = 0, a = t; a <= n; a++)
								for (
									var l = this.lines[a],
										c = e ? this._startColumns[a] : 1,
										d = e ? this._endColumns[a] : l.length + 1,
										f = c;
									f < d;
									f++
								)
									(r[s] = l.charCodeAt(f - 1)), (i[s] = a + 1), (o[s] = f), s++;
							return new u(r, i, o);
						}),
						e
					);
				})(),
				u = (function () {
					function e(e, t, n) {
						(this._charCodes = e), (this._lineNumbers = t), (this._columns = n);
					}
					return (
						(e.prototype.getElements = function () {
							return this._charCodes;
						}),
						(e.prototype.getStartLineNumber = function (e) {
							return this._lineNumbers[e];
						}),
						(e.prototype.getStartColumn = function (e) {
							return this._columns[e];
						}),
						(e.prototype.getEndLineNumber = function (e) {
							return this._lineNumbers[e];
						}),
						(e.prototype.getEndColumn = function (e) {
							return this._columns[e] + 1;
						}),
						e
					);
				})(),
				a = (function () {
					function e(e, t, n, r, i, o, s, u) {
						(this.originalStartLineNumber = e),
							(this.originalStartColumn = t),
							(this.originalEndLineNumber = n),
							(this.originalEndColumn = r),
							(this.modifiedStartLineNumber = i),
							(this.modifiedStartColumn = o),
							(this.modifiedEndLineNumber = s),
							(this.modifiedEndColumn = u);
					}
					return (
						(e.createFromDiffChange = function (t, n, r) {
							var i, o, s, u, a, l, c, d;
							return (
								0 === t.originalLength
									? ((i = 0), (o = 0), (s = 0), (u = 0))
									: ((i = n.getStartLineNumber(t.originalStart)),
									  (o = n.getStartColumn(t.originalStart)),
									  (s = n.getEndLineNumber(
											t.originalStart + t.originalLength - 1
									  )),
									  (u = n.getEndColumn(
											t.originalStart + t.originalLength - 1
									  ))),
								0 === t.modifiedLength
									? ((a = 0), (l = 0), (c = 0), (d = 0))
									: ((a = r.getStartLineNumber(t.modifiedStart)),
									  (l = r.getStartColumn(t.modifiedStart)),
									  (c = r.getEndLineNumber(
											t.modifiedStart + t.modifiedLength - 1
									  )),
									  (d = r.getEndColumn(
											t.modifiedStart + t.modifiedLength - 1
									  ))),
								new e(i, o, s, u, a, l, c, d)
							);
						}),
						e
					);
				})();
			var l = (function () {
					function e(e, t, n, r, i) {
						(this.originalStartLineNumber = e),
							(this.originalEndLineNumber = t),
							(this.modifiedStartLineNumber = n),
							(this.modifiedEndLineNumber = r),
							(this.charChanges = i);
					}
					return (
						(e.createFromDiffResult = function (t, n, r, s, u, l, c) {
							var d,
								f,
								h,
								p,
								m = void 0;
							if (
								(0 === n.originalLength
									? ((d = r.getStartLineNumber(n.originalStart) - 1), (f = 0))
									: ((d = r.getStartLineNumber(n.originalStart)),
									  (f = r.getEndLineNumber(
											n.originalStart + n.originalLength - 1
									  ))),
								0 === n.modifiedLength
									? ((h = s.getStartLineNumber(n.modifiedStart) - 1), (p = 0))
									: ((h = s.getStartLineNumber(n.modifiedStart)),
									  (p = s.getEndLineNumber(
											n.modifiedStart + n.modifiedLength - 1
									  ))),
								l &&
									n.originalLength > 0 &&
									n.originalLength < 20 &&
									n.modifiedLength > 0 &&
									n.modifiedLength < 20 &&
									u())
							) {
								var g = r.createCharSequence(
										t,
										n.originalStart,
										n.originalStart + n.originalLength - 1
									),
									v = s.createCharSequence(
										t,
										n.modifiedStart,
										n.modifiedStart + n.modifiedLength - 1
									),
									_ = o(g, v, u, !0).changes;
								c &&
									(_ = (function (e) {
										if (e.length <= 1) return e;
										for (
											var t = [e[0]], n = t[0], r = 1, o = e.length;
											r < o;
											r++
										) {
											var s = e[r],
												u =
													s.originalStart -
													(n.originalStart + n.originalLength),
												a =
													s.modifiedStart -
													(n.modifiedStart + n.modifiedLength);
											Math.min(u, a) < i
												? ((n.originalLength =
														s.originalStart +
														s.originalLength -
														n.originalStart),
												  (n.modifiedLength =
														s.modifiedStart +
														s.modifiedLength -
														n.modifiedStart))
												: (t.push(s), (n = s));
										}
										return t;
									})(_)),
									(m = []);
								for (var y = 0, b = _.length; y < b; y++)
									m.push(a.createFromDiffChange(_[y], g, v));
							}
							return new e(d, f, h, p, m);
						}),
						e
					);
				})(),
				c = (function () {
					function e(e, t, n) {
						(this.shouldComputeCharChanges = n.shouldComputeCharChanges),
							(this.shouldPostProcessCharChanges =
								n.shouldPostProcessCharChanges),
							(this.shouldIgnoreTrimWhitespace = n.shouldIgnoreTrimWhitespace),
							(this.shouldMakePrettyDiff = n.shouldMakePrettyDiff),
							(this.originalLines = e),
							(this.modifiedLines = t),
							(this.original = new s(e)),
							(this.modified = new s(t)),
							(this.continueLineDiff = h(n.maxComputationTime)),
							(this.continueCharDiff = h(
								0 === n.maxComputationTime
									? 0
									: Math.min(n.maxComputationTime, 5e3)
							));
					}
					return (
						(e.prototype.computeDiff = function () {
							if (
								1 === this.original.lines.length &&
								0 === this.original.lines[0].length
							)
								return {
									quitEarly: !1,
									changes: [
										{
											originalStartLineNumber: 1,
											originalEndLineNumber: 1,
											modifiedStartLineNumber: 1,
											modifiedEndLineNumber: this.modified.lines.length,
											charChanges: [
												{
													modifiedEndColumn: 0,
													modifiedEndLineNumber: 0,
													modifiedStartColumn: 0,
													modifiedStartLineNumber: 0,
													originalEndColumn: 0,
													originalEndLineNumber: 0,
													originalStartColumn: 0,
													originalStartLineNumber: 0,
												},
											],
										},
									],
								};
							if (
								1 === this.modified.lines.length &&
								0 === this.modified.lines[0].length
							)
								return {
									quitEarly: !1,
									changes: [
										{
											originalStartLineNumber: 1,
											originalEndLineNumber: this.original.lines.length,
											modifiedStartLineNumber: 1,
											modifiedEndLineNumber: 1,
											charChanges: [
												{
													modifiedEndColumn: 0,
													modifiedEndLineNumber: 0,
													modifiedStartColumn: 0,
													modifiedStartLineNumber: 0,
													originalEndColumn: 0,
													originalEndLineNumber: 0,
													originalStartColumn: 0,
													originalStartLineNumber: 0,
												},
											],
										},
									],
								};
							var e = o(
									this.original,
									this.modified,
									this.continueLineDiff,
									this.shouldMakePrettyDiff
								),
								t = e.changes,
								n = e.quitEarly;
							if (this.shouldIgnoreTrimWhitespace) {
								for (var r = [], i = 0, s = t.length; i < s; i++)
									r.push(
										l.createFromDiffResult(
											this.shouldIgnoreTrimWhitespace,
											t[i],
											this.original,
											this.modified,
											this.continueCharDiff,
											this.shouldComputeCharChanges,
											this.shouldPostProcessCharChanges
										)
									);
								return { quitEarly: n, changes: r };
							}
							for (
								var u = [], a = 0, c = 0, h = ((i = -1), t.length);
								i < h;
								i++
							) {
								for (
									var p = i + 1 < h ? t[i + 1] : null,
										m = p ? p.originalStart : this.originalLines.length,
										g = p ? p.modifiedStart : this.modifiedLines.length;
									a < m && c < g;

								) {
									var v = this.originalLines[a],
										_ = this.modifiedLines[c];
									if (v !== _) {
										for (var y = d(v, 1), b = d(_, 1); y > 1 && b > 1; ) {
											if (v.charCodeAt(y - 2) !== _.charCodeAt(b - 2)) break;
											y--, b--;
										}
										(y > 1 || b > 1) &&
											this._pushTrimWhitespaceCharChange(
												u,
												a + 1,
												1,
												y,
												c + 1,
												1,
												b
											);
										for (
											var C = f(v, 1),
												E = f(_, 1),
												S = v.length + 1,
												L = _.length + 1;
											C < S && E < L;

										) {
											if (v.charCodeAt(C - 1) !== v.charCodeAt(E - 1)) break;
											C++, E++;
										}
										(C < S || E < L) &&
											this._pushTrimWhitespaceCharChange(
												u,
												a + 1,
												C,
												S,
												c + 1,
												E,
												L
											);
									}
									a++, c++;
								}
								p &&
									(u.push(
										l.createFromDiffResult(
											this.shouldIgnoreTrimWhitespace,
											p,
											this.original,
											this.modified,
											this.continueCharDiff,
											this.shouldComputeCharChanges,
											this.shouldPostProcessCharChanges
										)
									),
									(a += p.originalLength),
									(c += p.modifiedLength));
							}
							return { quitEarly: n, changes: u };
						}),
						(e.prototype._pushTrimWhitespaceCharChange = function (
							e,
							t,
							n,
							r,
							i,
							o,
							s
						) {
							if (!this._mergeTrimWhitespaceCharChange(e, t, n, r, i, o, s)) {
								var u = void 0;
								this.shouldComputeCharChanges &&
									(u = [new a(t, n, t, r, i, o, i, s)]),
									e.push(new l(t, t, i, i, u));
							}
						}),
						(e.prototype._mergeTrimWhitespaceCharChange = function (
							e,
							t,
							n,
							r,
							i,
							o,
							s
						) {
							var u = e.length;
							if (0 === u) return !1;
							var l = e[u - 1];
							return (
								0 !== l.originalEndLineNumber &&
								0 !== l.modifiedEndLineNumber &&
								l.originalEndLineNumber + 1 === t &&
								l.modifiedEndLineNumber + 1 === i &&
								((l.originalEndLineNumber = t),
								(l.modifiedEndLineNumber = i),
								this.shouldComputeCharChanges &&
									l.charChanges &&
									l.charChanges.push(new a(t, n, t, r, i, o, i, s)),
								!0)
							);
						}),
						e
					);
				})();
			function d(e, t) {
				var n = r.firstNonWhitespaceIndex(e);
				return -1 === n ? t : n + 1;
			}
			function f(e, t) {
				var n = r.lastNonWhitespaceIndex(e);
				return -1 === n ? t : n + 2;
			}
			function h(e) {
				if (0 === e)
					return function () {
						return !0;
					};
				var t = Date.now();
				return function () {
					return Date.now() - t < e;
				};
			}
			t.DiffComputer = c;
		}),
		e(n[25], r([0, 1]), function (e, t) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 }),
				(t.USUAL_WORD_SEPARATORS = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?"),
				(t.DEFAULT_WORD_REGEXP = (function (e) {
					void 0 === e && (e = "");
					for (
						var n = "(-?\\d*\\.\\d\\w*)|([^",
							r = 0,
							i = t.USUAL_WORD_SEPARATORS;
						r < i.length;
						r++
					) {
						var o = i[r];
						e.indexOf(o) >= 0 || (n += "\\" + o);
					}
					return (n += "\\s]+)"), new RegExp(n, "g");
				})()),
				(t.ensureValidWordDefinition = function (e) {
					var n = t.DEFAULT_WORD_REGEXP;
					if (e && e instanceof RegExp)
						if (e.global) n = e;
						else {
							var r = "g";
							e.ignoreCase && (r += "i"),
								e.multiline && (r += "m"),
								e.unicode && (r += "u"),
								(n = new RegExp(e.source, r));
						}
					return (n.lastIndex = 0), n;
				}),
				(t.getWordAtText = function (e, t, n, r) {
					t.lastIndex = 0;
					var i = t.exec(n);
					if (!i) return null;
					var o =
						i[0].indexOf(" ") >= 0
							? (function (e, t, n, r) {
									var i,
										o = e - 1 - r;
									for (t.lastIndex = 0; (i = t.exec(n)); ) {
										var s = i.index || 0;
										if (s > o) return null;
										if (t.lastIndex >= o)
											return {
												word: i[0],
												startColumn: r + 1 + s,
												endColumn: r + 1 + t.lastIndex,
											};
									}
									return null;
							  })(e, t, n, r)
							: (function (e, t, n, r) {
									var i,
										o = e - 1 - r,
										s = n.lastIndexOf(" ", o - 1) + 1;
									for (t.lastIndex = s; (i = t.exec(n)); ) {
										var u = i.index || 0;
										if (u <= o && t.lastIndex >= o)
											return {
												word: i[0],
												startColumn: r + 1 + u,
												endColumn: r + 1 + t.lastIndex,
											};
									}
									return null;
							  })(e, t, n, r);
					return (t.lastIndex = 0), o;
				});
		}),
		e(n[26], r([0, 1, 21]), function (e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var r = (function () {
				function e(e, t, n) {
					for (var r = new Uint8Array(e * t), i = 0, o = e * t; i < o; i++)
						r[i] = n;
					(this._data = r), (this.rows = e), (this.cols = t);
				}
				return (
					(e.prototype.get = function (e, t) {
						return this._data[e * this.cols + t];
					}),
					(e.prototype.set = function (e, t, n) {
						this._data[e * this.cols + t] = n;
					}),
					e
				);
			})();
			t.Uint8Matrix = r;
			var i = (function () {
				function e(e) {
					for (var t = 0, n = 0, i = 0, o = e.length; i < o; i++) {
						var s = e[i],
							u = s[0];
						(c = s[1]) > t && (t = c),
							u > n && (n = u),
							(d = s[2]) > n && (n = d);
					}
					var a = new r(++n, ++t, 0);
					for (i = 0, o = e.length; i < o; i++) {
						var l = e[i],
							c = ((u = l[0]), l[1]),
							d = l[2];
						a.set(u, c, d);
					}
					(this._states = a), (this._maxCharCode = t);
				}
				return (
					(e.prototype.nextState = function (e, t) {
						return t < 0 || t >= this._maxCharCode ? 0 : this._states.get(e, t);
					}),
					e
				);
			})();
			t.StateMachine = i;
			var o = null;
			var s = null;
			var u = (function () {
				function e() {}
				return (
					(e._createLink = function (e, t, n, r, i) {
						var o = i - 1;
						do {
							var s = t.charCodeAt(o);
							if (2 !== e.get(s)) break;
							o--;
						} while (o > r);
						if (r > 0) {
							var u = t.charCodeAt(r - 1),
								a = t.charCodeAt(o);
							((40 === u && 41 === a) ||
								(91 === u && 93 === a) ||
								(123 === u && 125 === a)) &&
								o--;
						}
						return {
							range: {
								startLineNumber: n,
								startColumn: r + 1,
								endLineNumber: n,
								endColumn: o + 2,
							},
							url: t.substring(r, o + 1),
						};
					}),
					(e.computeLinks = function (t, r) {
						void 0 === r &&
							(null === o &&
								(o = new i([
									[1, 104, 2],
									[1, 72, 2],
									[1, 102, 6],
									[1, 70, 6],
									[2, 116, 3],
									[2, 84, 3],
									[3, 116, 4],
									[3, 84, 4],
									[4, 112, 5],
									[4, 80, 5],
									[5, 115, 9],
									[5, 83, 9],
									[5, 58, 10],
									[6, 105, 7],
									[6, 73, 7],
									[7, 108, 8],
									[7, 76, 8],
									[8, 101, 9],
									[8, 69, 9],
									[9, 58, 10],
									[10, 47, 11],
									[11, 47, 12],
								])),
							(r = o));
						for (
							var u = (function () {
									if (null === s) {
										s = new n.CharacterClassifier(0);
										for (
											var e = 0;
											e <
											" \t<>'\"、。｡､，．：；？！＠＃＄％＆＊‘“〈《「『【〔（［｛｢｣｝］）〕】』」》〉”’｀～…"
												.length;
											e++
										)
											s.set(
												" \t<>'\"、。｡､，．：；？！＠＃＄％＆＊‘“〈《「『【〔（［｛｢｣｝］）〕】』」》〉”’｀～…".charCodeAt(
													e
												),
												1
											);
										for (e = 0; e < ".,;".length; e++)
											s.set(".,;".charCodeAt(e), 2);
									}
									return s;
								})(),
								a = [],
								l = 1,
								c = t.getLineCount();
							l <= c;
							l++
						) {
							for (
								var d = t.getLineContent(l),
									f = d.length,
									h = 0,
									p = 0,
									m = 0,
									g = 1,
									v = !1,
									_ = !1,
									y = !1;
								h < f;

							) {
								var b = !1,
									C = d.charCodeAt(h);
								if (13 === g) {
									var E = void 0;
									switch (C) {
										case 40:
											(v = !0), (E = 0);
											break;
										case 41:
											E = v ? 0 : 1;
											break;
										case 91:
											(_ = !0), (E = 0);
											break;
										case 93:
											E = _ ? 0 : 1;
											break;
										case 123:
											(y = !0), (E = 0);
											break;
										case 125:
											E = y ? 0 : 1;
											break;
										case 39:
											E = 34 === m || 96 === m ? 0 : 1;
											break;
										case 34:
											E = 39 === m || 96 === m ? 0 : 1;
											break;
										case 96:
											E = 39 === m || 34 === m ? 0 : 1;
											break;
										case 42:
											E = 42 === m ? 1 : 0;
											break;
										case 124:
											E = 124 === m ? 1 : 0;
											break;
										default:
											E = u.get(C);
									}
									1 === E && (a.push(e._createLink(u, d, l, p, h)), (b = !0));
								} else if (12 === g) {
									E = void 0;
									91 === C ? ((_ = !0), (E = 0)) : (E = u.get(C)),
										1 === E ? (b = !0) : (g = 13);
								} else 0 === (g = r.nextState(g, C)) && (b = !0);
								b &&
									((g = 1), (v = !1), (_ = !1), (y = !1), (p = h + 1), (m = C)),
									h++;
							}
							13 === g && a.push(e._createLink(u, d, l, p, f));
						}
						return a;
					}),
					e
				);
			})();
			(t.LinkComputer = u),
				(t.computeLinks = function (e) {
					return e &&
						"function" == typeof e.getLineCount &&
						"function" == typeof e.getLineContent
						? u.computeLinks(e)
						: [];
				});
		}),
		e(n[27], r([0, 1]), function (e, t) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var n = (function () {
				function e() {
					this._defaultValueSet = [
						["true", "false"],
						["True", "False"],
						[
							"Private",
							"Public",
							"Friend",
							"ReadOnly",
							"Partial",
							"Protected",
							"WriteOnly",
						],
						["public", "protected", "private"],
					];
				}
				return (
					(e.prototype.navigateValueSet = function (e, t, n, r, i) {
						var o;
						if (e && t && (o = this.doNavigateValueSet(t, i)))
							return { range: e, value: o };
						if (n && r && (o = this.doNavigateValueSet(r, i)))
							return { range: n, value: o };
						return null;
					}),
					(e.prototype.doNavigateValueSet = function (e, t) {
						var n = this.numberReplace(e, t);
						return null !== n ? n : this.textReplace(e, t);
					}),
					(e.prototype.numberReplace = function (e, t) {
						var n = Math.pow(10, e.length - (e.lastIndexOf(".") + 1)),
							r = Number(e),
							i = parseFloat(e);
						return isNaN(r) || isNaN(i) || r !== i
							? null
							: 0 !== r || t
							? ((r = Math.floor(r * n)), (r += t ? n : -n), String(r / n))
							: null;
					}),
					(e.prototype.textReplace = function (e, t) {
						return this.valueSetsReplace(this._defaultValueSet, e, t);
					}),
					(e.prototype.valueSetsReplace = function (e, t, n) {
						for (var r = null, i = 0, o = e.length; null === r && i < o; i++)
							r = this.valueSetReplace(e[i], t, n);
						return r;
					}),
					(e.prototype.valueSetReplace = function (e, t, n) {
						var r = e.indexOf(t);
						return r >= 0
							? ((r += n ? 1 : -1) < 0 ? (r = e.length - 1) : (r %= e.length),
							  e[r])
							: null;
					}),
					(e.INSTANCE = new e()),
					e
				);
			})();
			t.BasicInplaceReplace = n;
		}),
		/*!
Copyright (c) 2014 Taylor Hakes
Copyright (c) 2014 Forbes Lindesay
 */
		(u = function () {
			"use strict";
			function e(e) {
				var t = this.constructor;
				return this.then(
					function (n) {
						return t.resolve(e()).then(function () {
							return n;
						});
					},
					function (n) {
						return t.resolve(e()).then(function () {
							return t.reject(n);
						});
					}
				);
			}
			var t = setTimeout;
			function n() {}
			function r(e) {
				if (!(this instanceof r))
					throw new TypeError("Promises must be constructed via new");
				if ("function" != typeof e) throw new TypeError("not a function");
				(this._state = 0),
					(this._handled = !1),
					(this._value = void 0),
					(this._deferreds = []),
					l(e, this);
			}
			function i(e, t) {
				for (; 3 === e._state; ) e = e._value;
				0 !== e._state
					? ((e._handled = !0),
					  r._immediateFn(function () {
							var n = 1 === e._state ? t.onFulfilled : t.onRejected;
							if (null !== n) {
								var r;
								try {
									r = n(e._value);
								} catch (e) {
									return void s(t.promise, e);
								}
								o(t.promise, r);
							} else (1 === e._state ? o : s)(t.promise, e._value);
					  }))
					: e._deferreds.push(t);
			}
			function o(e, t) {
				try {
					if (t === e)
						throw new TypeError("A promise cannot be resolved with itself.");
					if (t && ("object" == typeof t || "function" == typeof t)) {
						var n = t.then;
						if (t instanceof r)
							return (e._state = 3), (e._value = t), void u(e);
						if ("function" == typeof n)
							return void l(
								((i = n),
								(o = t),
								function () {
									i.apply(o, arguments);
								}),
								e
							);
					}
					(e._state = 1), (e._value = t), u(e);
				} catch (t) {
					s(e, t);
				}
				var i, o;
			}
			function s(e, t) {
				(e._state = 2), (e._value = t), u(e);
			}
			function u(e) {
				2 === e._state &&
					0 === e._deferreds.length &&
					r._immediateFn(function () {
						e._handled || r._unhandledRejectionFn(e._value);
					});
				for (var t = 0, n = e._deferreds.length; t < n; t++)
					i(e, e._deferreds[t]);
				e._deferreds = null;
			}
			function a(e, t, n) {
				(this.onFulfilled = "function" == typeof e ? e : null),
					(this.onRejected = "function" == typeof t ? t : null),
					(this.promise = n);
			}
			function l(e, t) {
				var n = !1;
				try {
					e(
						function (e) {
							n || ((n = !0), o(t, e));
						},
						function (e) {
							n || ((n = !0), s(t, e));
						}
					);
				} catch (e) {
					if (n) return;
					(n = !0), s(t, e);
				}
			}
			(r.prototype.catch = function (e) {
				return this.then(null, e);
			}),
				(r.prototype.then = function (e, t) {
					var r = new this.constructor(n);
					return i(this, new a(e, t, r)), r;
				}),
				(r.prototype.finally = e),
				(r.all = function (e) {
					return new r(function (t, n) {
						if (!e || void 0 === e.length)
							throw new TypeError("Promise.all accepts an array");
						var r = Array.prototype.slice.call(e);
						if (0 === r.length) return t([]);
						var i = r.length;
						function o(e, s) {
							try {
								if (s && ("object" == typeof s || "function" == typeof s)) {
									var u = s.then;
									if ("function" == typeof u)
										return void u.call(
											s,
											function (t) {
												o(e, t);
											},
											n
										);
								}
								(r[e] = s), 0 == --i && t(r);
							} catch (e) {
								n(e);
							}
						}
						for (var s = 0; s < r.length; s++) o(s, r[s]);
					});
				}),
				(r.resolve = function (e) {
					return e && "object" == typeof e && e.constructor === r
						? e
						: new r(function (t) {
								t(e);
						  });
				}),
				(r.reject = function (e) {
					return new r(function (t, n) {
						n(e);
					});
				}),
				(r.race = function (e) {
					return new r(function (t, n) {
						for (var r = 0, i = e.length; r < i; r++) e[r].then(t, n);
					});
				}),
				(r._immediateFn =
					("function" == typeof setImmediate &&
						function (e) {
							setImmediate(e);
						}) ||
					function (e) {
						t(e, 0);
					}),
				(r._unhandledRejectionFn = function (e) {
					"undefined" != typeof console &&
						console &&
						console.warn("Possible Unhandled Promise Rejection:", e);
				});
			var c = (function () {
				if ("undefined" != typeof self) return self;
				if ("undefined" != typeof window) return window;
				if ("undefined" != typeof global) return global;
				throw new Error("unable to locate global object");
			})();
			"Promise" in c
				? c.Promise.prototype.finally || (c.Promise.prototype.finally = e)
				: (c.Promise = r);
		}),
		"object" == typeof exports && "undefined" != typeof module
			? u()
			: "function" == typeof e && e.amd
			? e("vs/editor/common/standalone/promise-polyfill/polyfill", u)
			: u(),
		e(n[28], r([0, 1]), function (e, t) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 }),
				(function (e) {
					(e[(e.Unknown = 0)] = "Unknown"),
						(e[(e.Disabled = 1)] = "Disabled"),
						(e[(e.Enabled = 2)] = "Enabled");
				})(t.AccessibilitySupport || (t.AccessibilitySupport = {})),
				(function (e) {
					(e[(e.KeepWhitespace = 1)] = "KeepWhitespace"),
						(e[(e.InsertAsSnippet = 4)] = "InsertAsSnippet");
				})(
					t.CompletionItemInsertTextRule ||
						(t.CompletionItemInsertTextRule = {})
				),
				(function (e) {
					(e[(e.Method = 0)] = "Method"),
						(e[(e.Function = 1)] = "Function"),
						(e[(e.Constructor = 2)] = "Constructor"),
						(e[(e.Field = 3)] = "Field"),
						(e[(e.Variable = 4)] = "Variable"),
						(e[(e.Class = 5)] = "Class"),
						(e[(e.Struct = 6)] = "Struct"),
						(e[(e.Interface = 7)] = "Interface"),
						(e[(e.Module = 8)] = "Module"),
						(e[(e.Property = 9)] = "Property"),
						(e[(e.Event = 10)] = "Event"),
						(e[(e.Operator = 11)] = "Operator"),
						(e[(e.Unit = 12)] = "Unit"),
						(e[(e.Value = 13)] = "Value"),
						(e[(e.Constant = 14)] = "Constant"),
						(e[(e.Enum = 15)] = "Enum"),
						(e[(e.EnumMember = 16)] = "EnumMember"),
						(e[(e.Keyword = 17)] = "Keyword"),
						(e[(e.Text = 18)] = "Text"),
						(e[(e.Color = 19)] = "Color"),
						(e[(e.File = 20)] = "File"),
						(e[(e.Reference = 21)] = "Reference"),
						(e[(e.Customcolor = 22)] = "Customcolor"),
						(e[(e.Folder = 23)] = "Folder"),
						(e[(e.TypeParameter = 24)] = "TypeParameter"),
						(e[(e.Snippet = 25)] = "Snippet");
				})(t.CompletionItemKind || (t.CompletionItemKind = {})),
				(function (e) {
					e[(e.Deprecated = 1)] = "Deprecated";
				})(t.CompletionItemTag || (t.CompletionItemTag = {})),
				(function (e) {
					(e[(e.Invoke = 0)] = "Invoke"),
						(e[(e.TriggerCharacter = 1)] = "TriggerCharacter"),
						(e[(e.TriggerForIncompleteCompletions = 2)] =
							"TriggerForIncompleteCompletions");
				})(t.CompletionTriggerKind || (t.CompletionTriggerKind = {})),
				(function (e) {
					(e[(e.EXACT = 0)] = "EXACT"),
						(e[(e.ABOVE = 1)] = "ABOVE"),
						(e[(e.BELOW = 2)] = "BELOW");
				})(
					t.ContentWidgetPositionPreference ||
						(t.ContentWidgetPositionPreference = {})
				),
				(function (e) {
					(e[(e.NotSet = 0)] = "NotSet"),
						(e[(e.ContentFlush = 1)] = "ContentFlush"),
						(e[(e.RecoverFromMarkers = 2)] = "RecoverFromMarkers"),
						(e[(e.Explicit = 3)] = "Explicit"),
						(e[(e.Paste = 4)] = "Paste"),
						(e[(e.Undo = 5)] = "Undo"),
						(e[(e.Redo = 6)] = "Redo");
				})(t.CursorChangeReason || (t.CursorChangeReason = {})),
				(function (e) {
					(e[(e.LF = 1)] = "LF"), (e[(e.CRLF = 2)] = "CRLF");
				})(t.DefaultEndOfLine || (t.DefaultEndOfLine = {})),
				(function (e) {
					(e[(e.Text = 0)] = "Text"),
						(e[(e.Read = 1)] = "Read"),
						(e[(e.Write = 2)] = "Write");
				})(t.DocumentHighlightKind || (t.DocumentHighlightKind = {})),
				(function (e) {
					(e[(e.None = 0)] = "None"),
						(e[(e.Keep = 1)] = "Keep"),
						(e[(e.Brackets = 2)] = "Brackets"),
						(e[(e.Advanced = 3)] = "Advanced"),
						(e[(e.Full = 4)] = "Full");
				})(t.EditorAutoIndentStrategy || (t.EditorAutoIndentStrategy = {})),
				(function (e) {
					(e[(e.acceptSuggestionOnCommitCharacter = 0)] =
						"acceptSuggestionOnCommitCharacter"),
						(e[(e.acceptSuggestionOnEnter = 1)] = "acceptSuggestionOnEnter"),
						(e[(e.accessibilitySupport = 2)] = "accessibilitySupport"),
						(e[(e.accessibilityPageSize = 3)] = "accessibilityPageSize"),
						(e[(e.ariaLabel = 4)] = "ariaLabel"),
						(e[(e.autoClosingBrackets = 5)] = "autoClosingBrackets"),
						(e[(e.autoClosingOvertype = 6)] = "autoClosingOvertype"),
						(e[(e.autoClosingQuotes = 7)] = "autoClosingQuotes"),
						(e[(e.autoIndent = 8)] = "autoIndent"),
						(e[(e.automaticLayout = 9)] = "automaticLayout"),
						(e[(e.autoSurround = 10)] = "autoSurround"),
						(e[(e.codeLens = 11)] = "codeLens"),
						(e[(e.colorDecorators = 12)] = "colorDecorators"),
						(e[(e.comments = 13)] = "comments"),
						(e[(e.contextmenu = 14)] = "contextmenu"),
						(e[(e.copyWithSyntaxHighlighting = 15)] =
							"copyWithSyntaxHighlighting"),
						(e[(e.cursorBlinking = 16)] = "cursorBlinking"),
						(e[(e.cursorSmoothCaretAnimation = 17)] =
							"cursorSmoothCaretAnimation"),
						(e[(e.cursorStyle = 18)] = "cursorStyle"),
						(e[(e.cursorSurroundingLines = 19)] = "cursorSurroundingLines"),
						(e[(e.cursorSurroundingLinesStyle = 20)] =
							"cursorSurroundingLinesStyle"),
						(e[(e.cursorWidth = 21)] = "cursorWidth"),
						(e[(e.disableLayerHinting = 22)] = "disableLayerHinting"),
						(e[(e.disableMonospaceOptimizations = 23)] =
							"disableMonospaceOptimizations"),
						(e[(e.dragAndDrop = 24)] = "dragAndDrop"),
						(e[(e.emptySelectionClipboard = 25)] = "emptySelectionClipboard"),
						(e[(e.extraEditorClassName = 26)] = "extraEditorClassName"),
						(e[(e.fastScrollSensitivity = 27)] = "fastScrollSensitivity"),
						(e[(e.find = 28)] = "find"),
						(e[(e.fixedOverflowWidgets = 29)] = "fixedOverflowWidgets"),
						(e[(e.folding = 30)] = "folding"),
						(e[(e.foldingStrategy = 31)] = "foldingStrategy"),
						(e[(e.foldingHighlight = 32)] = "foldingHighlight"),
						(e[(e.fontFamily = 33)] = "fontFamily"),
						(e[(e.fontInfo = 34)] = "fontInfo"),
						(e[(e.fontLigatures = 35)] = "fontLigatures"),
						(e[(e.fontSize = 36)] = "fontSize"),
						(e[(e.fontWeight = 37)] = "fontWeight"),
						(e[(e.formatOnPaste = 38)] = "formatOnPaste"),
						(e[(e.formatOnType = 39)] = "formatOnType"),
						(e[(e.glyphMargin = 40)] = "glyphMargin"),
						(e[(e.gotoLocation = 41)] = "gotoLocation"),
						(e[(e.hideCursorInOverviewRuler = 42)] =
							"hideCursorInOverviewRuler"),
						(e[(e.highlightActiveIndentGuide = 43)] =
							"highlightActiveIndentGuide"),
						(e[(e.hover = 44)] = "hover"),
						(e[(e.inDiffEditor = 45)] = "inDiffEditor"),
						(e[(e.letterSpacing = 46)] = "letterSpacing"),
						(e[(e.lightbulb = 47)] = "lightbulb"),
						(e[(e.lineDecorationsWidth = 48)] = "lineDecorationsWidth"),
						(e[(e.lineHeight = 49)] = "lineHeight"),
						(e[(e.lineNumbers = 50)] = "lineNumbers"),
						(e[(e.lineNumbersMinChars = 51)] = "lineNumbersMinChars"),
						(e[(e.links = 52)] = "links"),
						(e[(e.matchBrackets = 53)] = "matchBrackets"),
						(e[(e.minimap = 54)] = "minimap"),
						(e[(e.mouseStyle = 55)] = "mouseStyle"),
						(e[(e.mouseWheelScrollSensitivity = 56)] =
							"mouseWheelScrollSensitivity"),
						(e[(e.mouseWheelZoom = 57)] = "mouseWheelZoom"),
						(e[(e.multiCursorMergeOverlapping = 58)] =
							"multiCursorMergeOverlapping"),
						(e[(e.multiCursorModifier = 59)] = "multiCursorModifier"),
						(e[(e.multiCursorPaste = 60)] = "multiCursorPaste"),
						(e[(e.occurrencesHighlight = 61)] = "occurrencesHighlight"),
						(e[(e.overviewRulerBorder = 62)] = "overviewRulerBorder"),
						(e[(e.overviewRulerLanes = 63)] = "overviewRulerLanes"),
						(e[(e.parameterHints = 64)] = "parameterHints"),
						(e[(e.peekWidgetDefaultFocus = 65)] = "peekWidgetDefaultFocus"),
						(e[(e.quickSuggestions = 66)] = "quickSuggestions"),
						(e[(e.quickSuggestionsDelay = 67)] = "quickSuggestionsDelay"),
						(e[(e.readOnly = 68)] = "readOnly"),
						(e[(e.renderControlCharacters = 69)] = "renderControlCharacters"),
						(e[(e.renderIndentGuides = 70)] = "renderIndentGuides"),
						(e[(e.renderFinalNewline = 71)] = "renderFinalNewline"),
						(e[(e.renderLineHighlight = 72)] = "renderLineHighlight"),
						(e[(e.renderValidationDecorations = 73)] =
							"renderValidationDecorations"),
						(e[(e.renderWhitespace = 74)] = "renderWhitespace"),
						(e[(e.revealHorizontalRightPadding = 75)] =
							"revealHorizontalRightPadding"),
						(e[(e.roundedSelection = 76)] = "roundedSelection"),
						(e[(e.rulers = 77)] = "rulers"),
						(e[(e.scrollbar = 78)] = "scrollbar"),
						(e[(e.scrollBeyondLastColumn = 79)] = "scrollBeyondLastColumn"),
						(e[(e.scrollBeyondLastLine = 80)] = "scrollBeyondLastLine"),
						(e[(e.selectionClipboard = 81)] = "selectionClipboard"),
						(e[(e.selectionHighlight = 82)] = "selectionHighlight"),
						(e[(e.selectOnLineNumbers = 83)] = "selectOnLineNumbers"),
						(e[(e.showFoldingControls = 84)] = "showFoldingControls"),
						(e[(e.showUnused = 85)] = "showUnused"),
						(e[(e.snippetSuggestions = 86)] = "snippetSuggestions"),
						(e[(e.smoothScrolling = 87)] = "smoothScrolling"),
						(e[(e.stopRenderingLineAfter = 88)] = "stopRenderingLineAfter"),
						(e[(e.suggest = 89)] = "suggest"),
						(e[(e.suggestFontSize = 90)] = "suggestFontSize"),
						(e[(e.suggestLineHeight = 91)] = "suggestLineHeight"),
						(e[(e.suggestOnTriggerCharacters = 92)] =
							"suggestOnTriggerCharacters"),
						(e[(e.suggestSelection = 93)] = "suggestSelection"),
						(e[(e.tabCompletion = 94)] = "tabCompletion"),
						(e[(e.useTabStops = 95)] = "useTabStops"),
						(e[(e.wordSeparators = 96)] = "wordSeparators"),
						(e[(e.wordWrap = 97)] = "wordWrap"),
						(e[(e.wordWrapBreakAfterCharacters = 98)] =
							"wordWrapBreakAfterCharacters"),
						(e[(e.wordWrapBreakBeforeCharacters = 99)] =
							"wordWrapBreakBeforeCharacters"),
						(e[(e.wordWrapColumn = 100)] = "wordWrapColumn"),
						(e[(e.wordWrapMinified = 101)] = "wordWrapMinified"),
						(e[(e.wrappingIndent = 102)] = "wrappingIndent"),
						(e[(e.wrappingStrategy = 103)] = "wrappingStrategy"),
						(e[(e.editorClassName = 104)] = "editorClassName"),
						(e[(e.pixelRatio = 105)] = "pixelRatio"),
						(e[(e.tabFocusMode = 106)] = "tabFocusMode"),
						(e[(e.layoutInfo = 107)] = "layoutInfo"),
						(e[(e.wrappingInfo = 108)] = "wrappingInfo");
				})(t.EditorOption || (t.EditorOption = {})),
				(function (e) {
					(e[(e.TextDefined = 0)] = "TextDefined"),
						(e[(e.LF = 1)] = "LF"),
						(e[(e.CRLF = 2)] = "CRLF");
				})(t.EndOfLinePreference || (t.EndOfLinePreference = {})),
				(function (e) {
					(e[(e.LF = 0)] = "LF"), (e[(e.CRLF = 1)] = "CRLF");
				})(t.EndOfLineSequence || (t.EndOfLineSequence = {})),
				(function (e) {
					(e[(e.None = 0)] = "None"),
						(e[(e.Indent = 1)] = "Indent"),
						(e[(e.IndentOutdent = 2)] = "IndentOutdent"),
						(e[(e.Outdent = 3)] = "Outdent");
				})(t.IndentAction || (t.IndentAction = {})),
				(function (e) {
					(e[(e.Unknown = 0)] = "Unknown"),
						(e[(e.Backspace = 1)] = "Backspace"),
						(e[(e.Tab = 2)] = "Tab"),
						(e[(e.Enter = 3)] = "Enter"),
						(e[(e.Shift = 4)] = "Shift"),
						(e[(e.Ctrl = 5)] = "Ctrl"),
						(e[(e.Alt = 6)] = "Alt"),
						(e[(e.PauseBreak = 7)] = "PauseBreak"),
						(e[(e.CapsLock = 8)] = "CapsLock"),
						(e[(e.Escape = 9)] = "Escape"),
						(e[(e.Space = 10)] = "Space"),
						(e[(e.PageUp = 11)] = "PageUp"),
						(e[(e.PageDown = 12)] = "PageDown"),
						(e[(e.End = 13)] = "End"),
						(e[(e.Home = 14)] = "Home"),
						(e[(e.LeftArrow = 15)] = "LeftArrow"),
						(e[(e.UpArrow = 16)] = "UpArrow"),
						(e[(e.RightArrow = 17)] = "RightArrow"),
						(e[(e.DownArrow = 18)] = "DownArrow"),
						(e[(e.Insert = 19)] = "Insert"),
						(e[(e.Delete = 20)] = "Delete"),
						(e[(e.KEY_0 = 21)] = "KEY_0"),
						(e[(e.KEY_1 = 22)] = "KEY_1"),
						(e[(e.KEY_2 = 23)] = "KEY_2"),
						(e[(e.KEY_3 = 24)] = "KEY_3"),
						(e[(e.KEY_4 = 25)] = "KEY_4"),
						(e[(e.KEY_5 = 26)] = "KEY_5"),
						(e[(e.KEY_6 = 27)] = "KEY_6"),
						(e[(e.KEY_7 = 28)] = "KEY_7"),
						(e[(e.KEY_8 = 29)] = "KEY_8"),
						(e[(e.KEY_9 = 30)] = "KEY_9"),
						(e[(e.KEY_A = 31)] = "KEY_A"),
						(e[(e.KEY_B = 32)] = "KEY_B"),
						(e[(e.KEY_C = 33)] = "KEY_C"),
						(e[(e.KEY_D = 34)] = "KEY_D"),
						(e[(e.KEY_E = 35)] = "KEY_E"),
						(e[(e.KEY_F = 36)] = "KEY_F"),
						(e[(e.KEY_G = 37)] = "KEY_G"),
						(e[(e.KEY_H = 38)] = "KEY_H"),
						(e[(e.KEY_I = 39)] = "KEY_I"),
						(e[(e.KEY_J = 40)] = "KEY_J"),
						(e[(e.KEY_K = 41)] = "KEY_K"),
						(e[(e.KEY_L = 42)] = "KEY_L"),
						(e[(e.KEY_M = 43)] = "KEY_M"),
						(e[(e.KEY_N = 44)] = "KEY_N"),
						(e[(e.KEY_O = 45)] = "KEY_O"),
						(e[(e.KEY_P = 46)] = "KEY_P"),
						(e[(e.KEY_Q = 47)] = "KEY_Q"),
						(e[(e.KEY_R = 48)] = "KEY_R"),
						(e[(e.KEY_S = 49)] = "KEY_S"),
						(e[(e.KEY_T = 50)] = "KEY_T"),
						(e[(e.KEY_U = 51)] = "KEY_U"),
						(e[(e.KEY_V = 52)] = "KEY_V"),
						(e[(e.KEY_W = 53)] = "KEY_W"),
						(e[(e.KEY_X = 54)] = "KEY_X"),
						(e[(e.KEY_Y = 55)] = "KEY_Y"),
						(e[(e.KEY_Z = 56)] = "KEY_Z"),
						(e[(e.Meta = 57)] = "Meta"),
						(e[(e.ContextMenu = 58)] = "ContextMenu"),
						(e[(e.F1 = 59)] = "F1"),
						(e[(e.F2 = 60)] = "F2"),
						(e[(e.F3 = 61)] = "F3"),
						(e[(e.F4 = 62)] = "F4"),
						(e[(e.F5 = 63)] = "F5"),
						(e[(e.F6 = 64)] = "F6"),
						(e[(e.F7 = 65)] = "F7"),
						(e[(e.F8 = 66)] = "F8"),
						(e[(e.F9 = 67)] = "F9"),
						(e[(e.F10 = 68)] = "F10"),
						(e[(e.F11 = 69)] = "F11"),
						(e[(e.F12 = 70)] = "F12"),
						(e[(e.F13 = 71)] = "F13"),
						(e[(e.F14 = 72)] = "F14"),
						(e[(e.F15 = 73)] = "F15"),
						(e[(e.F16 = 74)] = "F16"),
						(e[(e.F17 = 75)] = "F17"),
						(e[(e.F18 = 76)] = "F18"),
						(e[(e.F19 = 77)] = "F19"),
						(e[(e.NumLock = 78)] = "NumLock"),
						(e[(e.ScrollLock = 79)] = "ScrollLock"),
						(e[(e.US_SEMICOLON = 80)] = "US_SEMICOLON"),
						(e[(e.US_EQUAL = 81)] = "US_EQUAL"),
						(e[(e.US_COMMA = 82)] = "US_COMMA"),
						(e[(e.US_MINUS = 83)] = "US_MINUS"),
						(e[(e.US_DOT = 84)] = "US_DOT"),
						(e[(e.US_SLASH = 85)] = "US_SLASH"),
						(e[(e.US_BACKTICK = 86)] = "US_BACKTICK"),
						(e[(e.US_OPEN_SQUARE_BRACKET = 87)] = "US_OPEN_SQUARE_BRACKET"),
						(e[(e.US_BACKSLASH = 88)] = "US_BACKSLASH"),
						(e[(e.US_CLOSE_SQUARE_BRACKET = 89)] = "US_CLOSE_SQUARE_BRACKET"),
						(e[(e.US_QUOTE = 90)] = "US_QUOTE"),
						(e[(e.OEM_8 = 91)] = "OEM_8"),
						(e[(e.OEM_102 = 92)] = "OEM_102"),
						(e[(e.NUMPAD_0 = 93)] = "NUMPAD_0"),
						(e[(e.NUMPAD_1 = 94)] = "NUMPAD_1"),
						(e[(e.NUMPAD_2 = 95)] = "NUMPAD_2"),
						(e[(e.NUMPAD_3 = 96)] = "NUMPAD_3"),
						(e[(e.NUMPAD_4 = 97)] = "NUMPAD_4"),
						(e[(e.NUMPAD_5 = 98)] = "NUMPAD_5"),
						(e[(e.NUMPAD_6 = 99)] = "NUMPAD_6"),
						(e[(e.NUMPAD_7 = 100)] = "NUMPAD_7"),
						(e[(e.NUMPAD_8 = 101)] = "NUMPAD_8"),
						(e[(e.NUMPAD_9 = 102)] = "NUMPAD_9"),
						(e[(e.NUMPAD_MULTIPLY = 103)] = "NUMPAD_MULTIPLY"),
						(e[(e.NUMPAD_ADD = 104)] = "NUMPAD_ADD"),
						(e[(e.NUMPAD_SEPARATOR = 105)] = "NUMPAD_SEPARATOR"),
						(e[(e.NUMPAD_SUBTRACT = 106)] = "NUMPAD_SUBTRACT"),
						(e[(e.NUMPAD_DECIMAL = 107)] = "NUMPAD_DECIMAL"),
						(e[(e.NUMPAD_DIVIDE = 108)] = "NUMPAD_DIVIDE"),
						(e[(e.KEY_IN_COMPOSITION = 109)] = "KEY_IN_COMPOSITION"),
						(e[(e.ABNT_C1 = 110)] = "ABNT_C1"),
						(e[(e.ABNT_C2 = 111)] = "ABNT_C2"),
						(e[(e.MAX_VALUE = 112)] = "MAX_VALUE");
				})(t.KeyCode || (t.KeyCode = {})),
				(function (e) {
					(e[(e.Hint = 1)] = "Hint"),
						(e[(e.Info = 2)] = "Info"),
						(e[(e.Warning = 4)] = "Warning"),
						(e[(e.Error = 8)] = "Error");
				})(t.MarkerSeverity || (t.MarkerSeverity = {})),
				(function (e) {
					(e[(e.Unnecessary = 1)] = "Unnecessary"),
						(e[(e.Deprecated = 2)] = "Deprecated");
				})(t.MarkerTag || (t.MarkerTag = {})),
				(function (e) {
					(e[(e.Inline = 1)] = "Inline"), (e[(e.Gutter = 2)] = "Gutter");
				})(t.MinimapPosition || (t.MinimapPosition = {})),
				(function (e) {
					(e[(e.UNKNOWN = 0)] = "UNKNOWN"),
						(e[(e.TEXTAREA = 1)] = "TEXTAREA"),
						(e[(e.GUTTER_GLYPH_MARGIN = 2)] = "GUTTER_GLYPH_MARGIN"),
						(e[(e.GUTTER_LINE_NUMBERS = 3)] = "GUTTER_LINE_NUMBERS"),
						(e[(e.GUTTER_LINE_DECORATIONS = 4)] = "GUTTER_LINE_DECORATIONS"),
						(e[(e.GUTTER_VIEW_ZONE = 5)] = "GUTTER_VIEW_ZONE"),
						(e[(e.CONTENT_TEXT = 6)] = "CONTENT_TEXT"),
						(e[(e.CONTENT_EMPTY = 7)] = "CONTENT_EMPTY"),
						(e[(e.CONTENT_VIEW_ZONE = 8)] = "CONTENT_VIEW_ZONE"),
						(e[(e.CONTENT_WIDGET = 9)] = "CONTENT_WIDGET"),
						(e[(e.OVERVIEW_RULER = 10)] = "OVERVIEW_RULER"),
						(e[(e.SCROLLBAR = 11)] = "SCROLLBAR"),
						(e[(e.OVERLAY_WIDGET = 12)] = "OVERLAY_WIDGET"),
						(e[(e.OUTSIDE_EDITOR = 13)] = "OUTSIDE_EDITOR");
				})(t.MouseTargetType || (t.MouseTargetType = {})),
				(function (e) {
					(e[(e.TOP_RIGHT_CORNER = 0)] = "TOP_RIGHT_CORNER"),
						(e[(e.BOTTOM_RIGHT_CORNER = 1)] = "BOTTOM_RIGHT_CORNER"),
						(e[(e.TOP_CENTER = 2)] = "TOP_CENTER");
				})(
					t.OverlayWidgetPositionPreference ||
						(t.OverlayWidgetPositionPreference = {})
				),
				(function (e) {
					(e[(e.Left = 1)] = "Left"),
						(e[(e.Center = 2)] = "Center"),
						(e[(e.Right = 4)] = "Right"),
						(e[(e.Full = 7)] = "Full");
				})(t.OverviewRulerLane || (t.OverviewRulerLane = {})),
				(function (e) {
					(e[(e.Off = 0)] = "Off"),
						(e[(e.On = 1)] = "On"),
						(e[(e.Relative = 2)] = "Relative"),
						(e[(e.Interval = 3)] = "Interval"),
						(e[(e.Custom = 4)] = "Custom");
				})(t.RenderLineNumbersType || (t.RenderLineNumbersType = {})),
				(function (e) {
					(e[(e.None = 0)] = "None"),
						(e[(e.Text = 1)] = "Text"),
						(e[(e.Blocks = 2)] = "Blocks");
				})(t.RenderMinimap || (t.RenderMinimap = {})),
				(function (e) {
					(e[(e.Smooth = 0)] = "Smooth"), (e[(e.Immediate = 1)] = "Immediate");
				})(t.ScrollType || (t.ScrollType = {})),
				(function (e) {
					(e[(e.Auto = 1)] = "Auto"),
						(e[(e.Hidden = 2)] = "Hidden"),
						(e[(e.Visible = 3)] = "Visible");
				})(t.ScrollbarVisibility || (t.ScrollbarVisibility = {})),
				(function (e) {
					(e[(e.LTR = 0)] = "LTR"), (e[(e.RTL = 1)] = "RTL");
				})(t.SelectionDirection || (t.SelectionDirection = {})),
				(function (e) {
					(e[(e.Invoke = 1)] = "Invoke"),
						(e[(e.TriggerCharacter = 2)] = "TriggerCharacter"),
						(e[(e.ContentChange = 3)] = "ContentChange");
				})(t.SignatureHelpTriggerKind || (t.SignatureHelpTriggerKind = {})),
				(function (e) {
					(e[(e.File = 0)] = "File"),
						(e[(e.Module = 1)] = "Module"),
						(e[(e.Namespace = 2)] = "Namespace"),
						(e[(e.Package = 3)] = "Package"),
						(e[(e.Class = 4)] = "Class"),
						(e[(e.Method = 5)] = "Method"),
						(e[(e.Property = 6)] = "Property"),
						(e[(e.Field = 7)] = "Field"),
						(e[(e.Constructor = 8)] = "Constructor"),
						(e[(e.Enum = 9)] = "Enum"),
						(e[(e.Interface = 10)] = "Interface"),
						(e[(e.Function = 11)] = "Function"),
						(e[(e.Variable = 12)] = "Variable"),
						(e[(e.Constant = 13)] = "Constant"),
						(e[(e.String = 14)] = "String"),
						(e[(e.Number = 15)] = "Number"),
						(e[(e.Boolean = 16)] = "Boolean"),
						(e[(e.Array = 17)] = "Array"),
						(e[(e.Object = 18)] = "Object"),
						(e[(e.Key = 19)] = "Key"),
						(e[(e.Null = 20)] = "Null"),
						(e[(e.EnumMember = 21)] = "EnumMember"),
						(e[(e.Struct = 22)] = "Struct"),
						(e[(e.Event = 23)] = "Event"),
						(e[(e.Operator = 24)] = "Operator"),
						(e[(e.TypeParameter = 25)] = "TypeParameter");
				})(t.SymbolKind || (t.SymbolKind = {})),
				(function (e) {
					e[(e.Deprecated = 1)] = "Deprecated";
				})(t.SymbolTag || (t.SymbolTag = {})),
				(function (e) {
					(e[(e.Hidden = 0)] = "Hidden"),
						(e[(e.Blink = 1)] = "Blink"),
						(e[(e.Smooth = 2)] = "Smooth"),
						(e[(e.Phase = 3)] = "Phase"),
						(e[(e.Expand = 4)] = "Expand"),
						(e[(e.Solid = 5)] = "Solid");
				})(
					t.TextEditorCursorBlinkingStyle ||
						(t.TextEditorCursorBlinkingStyle = {})
				),
				(function (e) {
					(e[(e.Line = 1)] = "Line"),
						(e[(e.Block = 2)] = "Block"),
						(e[(e.Underline = 3)] = "Underline"),
						(e[(e.LineThin = 4)] = "LineThin"),
						(e[(e.BlockOutline = 5)] = "BlockOutline"),
						(e[(e.UnderlineThin = 6)] = "UnderlineThin");
				})(t.TextEditorCursorStyle || (t.TextEditorCursorStyle = {})),
				(function (e) {
					(e[(e.AlwaysGrowsWhenTypingAtEdges = 0)] =
						"AlwaysGrowsWhenTypingAtEdges"),
						(e[(e.NeverGrowsWhenTypingAtEdges = 1)] =
							"NeverGrowsWhenTypingAtEdges"),
						(e[(e.GrowsOnlyWhenTypingBefore = 2)] =
							"GrowsOnlyWhenTypingBefore"),
						(e[(e.GrowsOnlyWhenTypingAfter = 3)] = "GrowsOnlyWhenTypingAfter");
				})(t.TrackedRangeStickiness || (t.TrackedRangeStickiness = {})),
				(function (e) {
					(e[(e.None = 0)] = "None"),
						(e[(e.Same = 1)] = "Same"),
						(e[(e.Indent = 2)] = "Indent"),
						(e[(e.DeepIndent = 3)] = "DeepIndent");
				})(t.WrappingIndent || (t.WrappingIndent = {}));
		}),
		e(
			n[29],
			r([0, 1, 19, 9, 17, 12, 2, 5, 22, 23, 28, 33]),
			function (e, t, n, r, i, o, s, u, a, l, c) {
				"use strict";
				Object.defineProperty(t, "__esModule", { value: !0 });
				var d = (function () {
					function e() {}
					return (
						(e.chord = function (e, t) {
							return i.KeyChord(e, t);
						}),
						(e.CtrlCmd = 2048),
						(e.Shift = 1024),
						(e.Alt = 512),
						(e.WinCtrl = 256),
						e
					);
				})();
				(t.KeyMod = d),
					(t.createMonacoBaseAPI = function () {
						return {
							editor: void 0,
							languages: void 0,
							CancellationTokenSource: n.CancellationTokenSource,
							Emitter: r.Emitter,
							KeyCode: c.KeyCode,
							KeyMod: d,
							Position: s.Position,
							Range: u.Range,
							Selection: a.Selection,
							SelectionDirection: c.SelectionDirection,
							MarkerSeverity: c.MarkerSeverity,
							MarkerTag: c.MarkerTag,
							Uri: o.URI,
							Token: l.Token,
						};
					});
			}
		),
		e(n[30], r([0, 1, 11]), function (e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var r = function (e, t) {
				(this.index = e), (this.remainder = t);
			};
			t.PrefixSumIndexOfResult = r;
			var i = (function () {
				function e(e) {
					(this.values = e),
						(this.prefixSum = new Uint32Array(e.length)),
						(this.prefixSumValidIndex = new Int32Array(1)),
						(this.prefixSumValidIndex[0] = -1);
				}
				return (
					(e.prototype.insertValues = function (e, t) {
						e = n.toUint32(e);
						var r = this.values,
							i = this.prefixSum,
							o = t.length;
						return (
							0 !== o &&
							((this.values = new Uint32Array(r.length + o)),
							this.values.set(r.subarray(0, e), 0),
							this.values.set(r.subarray(e), e + o),
							this.values.set(t, e),
							e - 1 < this.prefixSumValidIndex[0] &&
								(this.prefixSumValidIndex[0] = e - 1),
							(this.prefixSum = new Uint32Array(this.values.length)),
							this.prefixSumValidIndex[0] >= 0 &&
								this.prefixSum.set(
									i.subarray(0, this.prefixSumValidIndex[0] + 1)
								),
							!0)
						);
					}),
					(e.prototype.changeValue = function (e, t) {
						return (
							(e = n.toUint32(e)),
							(t = n.toUint32(t)),
							this.values[e] !== t &&
								((this.values[e] = t),
								e - 1 < this.prefixSumValidIndex[0] &&
									(this.prefixSumValidIndex[0] = e - 1),
								!0)
						);
					}),
					(e.prototype.removeValues = function (e, t) {
						(e = n.toUint32(e)), (t = n.toUint32(t));
						var r = this.values,
							i = this.prefixSum;
						if (e >= r.length) return !1;
						var o = r.length - e;
						return (
							t >= o && (t = o),
							0 !== t &&
								((this.values = new Uint32Array(r.length - t)),
								this.values.set(r.subarray(0, e), 0),
								this.values.set(r.subarray(e + t), e),
								(this.prefixSum = new Uint32Array(this.values.length)),
								e - 1 < this.prefixSumValidIndex[0] &&
									(this.prefixSumValidIndex[0] = e - 1),
								this.prefixSumValidIndex[0] >= 0 &&
									this.prefixSum.set(
										i.subarray(0, this.prefixSumValidIndex[0] + 1)
									),
								!0)
						);
					}),
					(e.prototype.getTotalValue = function () {
						return 0 === this.values.length
							? 0
							: this._getAccumulatedValue(this.values.length - 1);
					}),
					(e.prototype.getAccumulatedValue = function (e) {
						return e < 0
							? 0
							: ((e = n.toUint32(e)), this._getAccumulatedValue(e));
					}),
					(e.prototype._getAccumulatedValue = function (e) {
						if (e <= this.prefixSumValidIndex[0]) return this.prefixSum[e];
						var t = this.prefixSumValidIndex[0] + 1;
						0 === t && ((this.prefixSum[0] = this.values[0]), t++),
							e >= this.values.length && (e = this.values.length - 1);
						for (var n = t; n <= e; n++)
							this.prefixSum[n] = this.prefixSum[n - 1] + this.values[n];
						return (
							(this.prefixSumValidIndex[0] = Math.max(
								this.prefixSumValidIndex[0],
								e
							)),
							this.prefixSum[e]
						);
					}),
					(e.prototype.getIndexOf = function (e) {
						(e = Math.floor(e)), this.getTotalValue();
						for (
							var t = 0, n = this.values.length - 1, i = 0, o = 0, s = 0;
							t <= n;

						)
							if (
								((i = (t + (n - t) / 2) | 0),
								e < (s = (o = this.prefixSum[i]) - this.values[i]))
							)
								n = i - 1;
							else {
								if (!(e >= o)) break;
								t = i + 1;
							}
						return new r(i, e - s);
					}),
					e
				);
			})();
			t.PrefixSumComputer = i;
		}),
		e(n[31], r([0, 1, 2, 30]), function (e, t, n, r) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var i = (function () {
				function e(e, t, n, r) {
					(this._uri = e),
						(this._lines = t),
						(this._eol = n),
						(this._versionId = r),
						(this._lineStarts = null);
				}
				return (
					(e.prototype.dispose = function () {
						this._lines.length = 0;
					}),
					(e.prototype.getText = function () {
						return this._lines.join(this._eol);
					}),
					(e.prototype.onEvents = function (e) {
						e.eol &&
							e.eol !== this._eol &&
							((this._eol = e.eol), (this._lineStarts = null));
						for (var t = 0, r = e.changes; t < r.length; t++) {
							var i = r[t];
							this._acceptDeleteRange(i.range),
								this._acceptInsertText(
									new n.Position(i.range.startLineNumber, i.range.startColumn),
									i.text
								);
						}
						this._versionId = e.versionId;
					}),
					(e.prototype._ensureLineStarts = function () {
						if (!this._lineStarts) {
							for (
								var e = this._eol.length,
									t = this._lines.length,
									n = new Uint32Array(t),
									i = 0;
								i < t;
								i++
							)
								n[i] = this._lines[i].length + e;
							this._lineStarts = new r.PrefixSumComputer(n);
						}
					}),
					(e.prototype._setLineText = function (e, t) {
						(this._lines[e] = t),
							this._lineStarts &&
								this._lineStarts.changeValue(
									e,
									this._lines[e].length + this._eol.length
								);
					}),
					(e.prototype._acceptDeleteRange = function (e) {
						if (e.startLineNumber !== e.endLineNumber)
							this._setLineText(
								e.startLineNumber - 1,
								this._lines[e.startLineNumber - 1].substring(
									0,
									e.startColumn - 1
								) + this._lines[e.endLineNumber - 1].substring(e.endColumn - 1)
							),
								this._lines.splice(
									e.startLineNumber,
									e.endLineNumber - e.startLineNumber
								),
								this._lineStarts &&
									this._lineStarts.removeValues(
										e.startLineNumber,
										e.endLineNumber - e.startLineNumber
									);
						else {
							if (e.startColumn === e.endColumn) return;
							this._setLineText(
								e.startLineNumber - 1,
								this._lines[e.startLineNumber - 1].substring(
									0,
									e.startColumn - 1
								) +
									this._lines[e.startLineNumber - 1].substring(e.endColumn - 1)
							);
						}
					}),
					(e.prototype._acceptInsertText = function (e, t) {
						if (0 !== t.length) {
							var n = t.split(/\r\n|\r|\n/);
							if (1 !== n.length) {
								(n[n.length - 1] += this._lines[e.lineNumber - 1].substring(
									e.column - 1
								)),
									this._setLineText(
										e.lineNumber - 1,
										this._lines[e.lineNumber - 1].substring(0, e.column - 1) +
											n[0]
									);
								for (
									var r = new Uint32Array(n.length - 1), i = 1;
									i < n.length;
									i++
								)
									this._lines.splice(e.lineNumber + i - 1, 0, n[i]),
										(r[i - 1] = n[i].length + this._eol.length);
								this._lineStarts &&
									this._lineStarts.insertValues(e.lineNumber, r);
							} else
								this._setLineText(
									e.lineNumber - 1,
									this._lines[e.lineNumber - 1].substring(0, e.column - 1) +
										n[0] +
										this._lines[e.lineNumber - 1].substring(e.column - 1)
								);
						}
					}),
					e
				);
			})();
			t.MirrorTextModel = i;
		});
	var l =
			(this && this.__awaiter) ||
			function (e, t, n, r) {
				return new (n || (n = Promise))(function (i, o) {
					function s(e) {
						try {
							a(r.next(e));
						} catch (e) {
							o(e);
						}
					}
					function u(e) {
						try {
							a(r.throw(e));
						} catch (e) {
							o(e);
						}
					}
					function a(e) {
						var t;
						e.done
							? i(e.value)
							: ((t = e.value),
							  t instanceof n
									? t
									: new n(function (e) {
											e(t);
									  })).then(s, u);
					}
					a((r = r.apply(e, t || [])).next());
				});
			},
		c =
			(this && this.__generator) ||
			function (e, t) {
				var n,
					r,
					i,
					o,
					s = {
						label: 0,
						sent: function () {
							if (1 & i[0]) throw i[1];
							return i[1];
						},
						trys: [],
						ops: [],
					};
				return (
					(o = { next: u(0), throw: u(1), return: u(2) }),
					"function" == typeof Symbol &&
						(o[Symbol.iterator] = function () {
							return this;
						}),
					o
				);
				function u(o) {
					return function (u) {
						return (function (o) {
							if (n) throw new TypeError("Generator is already executing.");
							for (; s; )
								try {
									if (
										((n = 1),
										r &&
											(i =
												2 & o[0]
													? r.return
													: o[0]
													? r.throw || ((i = r.return) && i.call(r), 0)
													: r.next) &&
											!(i = i.call(r, o[1])).done)
									)
										return i;
									switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
										case 0:
										case 1:
											i = o;
											break;
										case 4:
											return s.label++, { value: o[1], done: !1 };
										case 5:
											s.label++, (r = o[1]), (o = [0]);
											continue;
										case 7:
											(o = s.ops.pop()), s.trys.pop();
											continue;
										default:
											if (
												!(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
												(6 === o[0] || 2 === o[0])
											) {
												s = 0;
												continue;
											}
											if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
												s.label = o[1];
												break;
											}
											if (6 === o[0] && s.label < i[1]) {
												(s.label = i[1]), (i = o);
												break;
											}
											if (i && s.label < i[2]) {
												(s.label = i[2]), s.ops.push(o);
												break;
											}
											i[2] && s.ops.pop(), s.trys.pop();
											continue;
									}
									o = t.call(e, s);
								} catch (e) {
									(o = [6, e]), (r = 0);
								} finally {
									n = i = 0;
								}
							if (5 & o[0]) throw o[1];
							return { value: o[0] ? o[1] : void 0, done: !0 };
						})([o, u]);
					};
				}
			};
	e(
		n[34],
		r([0, 1, 13, 6, 7, 4, 12, 2, 5, 24, 31, 25, 26, 27, 29, 10]),
		function (e, t, n, r, i, o, s, u, d, f, h, p, m, g, v, _) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			var y = (function (e) {
					function t() {
						return (null !== e && e.apply(this, arguments)) || this;
					}
					return (
						a(t, e),
						Object.defineProperty(t.prototype, "uri", {
							get: function () {
								return this._uri;
							},
							enumerable: !0,
							configurable: !0,
						}),
						Object.defineProperty(t.prototype, "version", {
							get: function () {
								return this._versionId;
							},
							enumerable: !0,
							configurable: !0,
						}),
						Object.defineProperty(t.prototype, "eol", {
							get: function () {
								return this._eol;
							},
							enumerable: !0,
							configurable: !0,
						}),
						(t.prototype.getValue = function () {
							return this.getText();
						}),
						(t.prototype.getLinesContent = function () {
							return this._lines.slice(0);
						}),
						(t.prototype.getLineCount = function () {
							return this._lines.length;
						}),
						(t.prototype.getLineContent = function (e) {
							return this._lines[e - 1];
						}),
						(t.prototype.getWordAtPosition = function (e, t) {
							var n = p.getWordAtText(
								e.column,
								p.ensureValidWordDefinition(t),
								this._lines[e.lineNumber - 1],
								0
							);
							return n
								? new d.Range(
										e.lineNumber,
										n.startColumn,
										e.lineNumber,
										n.endColumn
								  )
								: null;
						}),
						(t.prototype.createWordIterator = function (e) {
							var t,
								n,
								r = this,
								o = 0,
								s = 0,
								u = [],
								a = function () {
									if (s < u.length) {
										var l = n.substring(u[s].start, u[s].end);
										return (
											(s += 1),
											t ? (t.value = l) : (t = { done: !1, value: l }),
											t
										);
									}
									return o >= r._lines.length
										? i.FIN
										: ((n = r._lines[o]),
										  (u = r._wordenize(n, e)),
										  (s = 0),
										  (o += 1),
										  a());
								};
							return { next: a };
						}),
						(t.prototype.getLineWords = function (e, t) {
							for (
								var n = this._lines[e - 1],
									r = [],
									i = 0,
									o = this._wordenize(n, t);
								i < o.length;
								i++
							) {
								var s = o[i];
								r.push({
									word: n.substring(s.start, s.end),
									startColumn: s.start + 1,
									endColumn: s.end + 1,
								});
							}
							return r;
						}),
						(t.prototype._wordenize = function (e, t) {
							var n,
								r = [];
							for (t.lastIndex = 0; (n = t.exec(e)) && 0 !== n[0].length; )
								r.push({ start: n.index, end: n.index + n[0].length });
							return r;
						}),
						(t.prototype.getValueInRange = function (e) {
							if (
								(e = this._validateRange(e)).startLineNumber === e.endLineNumber
							)
								return this._lines[e.startLineNumber - 1].substring(
									e.startColumn - 1,
									e.endColumn - 1
								);
							var t = this._eol,
								n = e.startLineNumber - 1,
								r = e.endLineNumber - 1,
								i = [];
							i.push(this._lines[n].substring(e.startColumn - 1));
							for (var o = n + 1; o < r; o++) i.push(this._lines[o]);
							return (
								i.push(this._lines[r].substring(0, e.endColumn - 1)), i.join(t)
							);
						}),
						(t.prototype.offsetAt = function (e) {
							return (
								(e = this._validatePosition(e)),
								this._ensureLineStarts(),
								this._lineStarts.getAccumulatedValue(e.lineNumber - 2) +
									(e.column - 1)
							);
						}),
						(t.prototype.positionAt = function (e) {
							(e = Math.floor(e)),
								(e = Math.max(0, e)),
								this._ensureLineStarts();
							var t = this._lineStarts.getIndexOf(e),
								n = this._lines[t.index].length;
							return {
								lineNumber: 1 + t.index,
								column: 1 + Math.min(t.remainder, n),
							};
						}),
						(t.prototype._validateRange = function (e) {
							var t = this._validatePosition({
									lineNumber: e.startLineNumber,
									column: e.startColumn,
								}),
								n = this._validatePosition({
									lineNumber: e.endLineNumber,
									column: e.endColumn,
								});
							return t.lineNumber !== e.startLineNumber ||
								t.column !== e.startColumn ||
								n.lineNumber !== e.endLineNumber ||
								n.column !== e.endColumn
								? {
										startLineNumber: t.lineNumber,
										startColumn: t.column,
										endLineNumber: n.lineNumber,
										endColumn: n.column,
								  }
								: e;
						}),
						(t.prototype._validatePosition = function (e) {
							if (!u.Position.isIPosition(e)) throw new Error("bad position");
							var t = e.lineNumber,
								n = e.column,
								r = !1;
							if (t < 1) (t = 1), (n = 1), (r = !0);
							else if (t > this._lines.length)
								(t = this._lines.length),
									(n = this._lines[t - 1].length + 1),
									(r = !0);
							else {
								var i = this._lines[t - 1].length + 1;
								n < 1 ? ((n = 1), (r = !0)) : n > i && ((n = i), (r = !0));
							}
							return r ? { lineNumber: t, column: n } : e;
						}),
						t
					);
				})(h.MirrorTextModel),
				b = (function () {
					function t(e, t) {
						(this._host = e),
							(this._models = Object.create(null)),
							(this._foreignModuleFactory = t),
							(this._foreignModule = null);
					}
					return (
						(t.prototype.dispose = function () {
							this._models = Object.create(null);
						}),
						(t.prototype._getModel = function (e) {
							return this._models[e];
						}),
						(t.prototype._getModels = function () {
							var e = this,
								t = [];
							return (
								Object.keys(this._models).forEach(function (n) {
									return t.push(e._models[n]);
								}),
								t
							);
						}),
						(t.prototype.acceptNewModel = function (e) {
							this._models[e.url] = new y(
								s.URI.parse(e.url),
								e.lines,
								e.EOL,
								e.versionId
							);
						}),
						(t.prototype.acceptModelChanged = function (e, t) {
							this._models[e] && this._models[e].onEvents(t);
						}),
						(t.prototype.acceptRemovedModel = function (e) {
							this._models[e] && delete this._models[e];
						}),
						(t.prototype.computeDiff = function (e, t, n, r) {
							return l(this, void 0, void 0, function () {
								var i, o, s, u, a, l, d;
								return c(this, function (c) {
									return (
										(i = this._getModel(e)),
										(o = this._getModel(t)),
										i && o
											? ((s = i.getLinesContent()),
											  (u = o.getLinesContent()),
											  (a = new f.DiffComputer(s, u, {
													shouldComputeCharChanges: !0,
													shouldPostProcessCharChanges: !0,
													shouldIgnoreTrimWhitespace: n,
													shouldMakePrettyDiff: !0,
													maxComputationTime: r,
											  })),
											  (l = a.computeDiff()),
											  (d =
													!(l.changes.length > 0) &&
													this._modelsAreIdentical(i, o)),
											  [
													2,
													{
														quitEarly: l.quitEarly,
														identical: d,
														changes: l.changes,
													},
											  ])
											: [2, null]
									);
								});
							});
						}),
						(t.prototype._modelsAreIdentical = function (e, t) {
							var n = e.getLineCount();
							if (n !== t.getLineCount()) return !1;
							for (var r = 1; r <= n; r++) {
								if (e.getLineContent(r) !== t.getLineContent(r)) return !1;
							}
							return !0;
						}),
						(t.prototype.computeMoreMinimalEdits = function (e, i) {
							return l(this, void 0, void 0, function () {
								var o, s, u, a, l, f, h, p, m, g, v, _, y, b, C, E, S, L;
								return c(this, function (c) {
									if (!(o = this._getModel(e))) return [2, i];
									for (
										s = [],
											u = void 0,
											i = n.mergeSort(i, function (e, t) {
												return e.range && t.range
													? d.Range.compareRangesUsingStarts(e.range, t.range)
													: (e.range ? 0 : 1) - (t.range ? 0 : 1);
											}),
											a = 0,
											l = i;
										a < l.length;
										a++
									)
										if (
											((f = l[a]),
											(h = f.range),
											(p = f.text),
											"number" == typeof (m = f.eol) && (u = m),
											(!d.Range.isEmpty(h) || p) &&
												((g = o.getValueInRange(h)),
												(p = p.replace(/\r\n|\n|\r/g, o.eol)),
												g !== p))
										)
											if (Math.max(p.length, g.length) > t._diffLimit)
												s.push({ range: h, text: p });
											else
												for (
													v = r.stringDiff(g, p, !1),
														_ = o.offsetAt(d.Range.lift(h).getStartPosition()),
														y = 0,
														b = v;
													y < b.length;
													y++
												)
													(C = b[y]),
														(E = o.positionAt(_ + C.originalStart)),
														(S = o.positionAt(
															_ + C.originalStart + C.originalLength
														)),
														(L = {
															text: p.substr(C.modifiedStart, C.modifiedLength),
															range: {
																startLineNumber: E.lineNumber,
																startColumn: E.column,
																endLineNumber: S.lineNumber,
																endColumn: S.column,
															},
														}),
														o.getValueInRange(L.range) !== L.text && s.push(L);
									return (
										"number" == typeof u &&
											s.push({
												eol: u,
												text: "",
												range: {
													startLineNumber: 0,
													startColumn: 0,
													endLineNumber: 0,
													endColumn: 0,
												},
											}),
										[2, s]
									);
								});
							});
						}),
						(t.prototype.computeLinks = function (e) {
							return l(this, void 0, void 0, function () {
								var t;
								return c(this, function (n) {
									return (t = this._getModel(e))
										? [2, m.computeLinks(t)]
										: [2, null];
								});
							});
						}),
						(t.prototype.textualSuggest = function (e, n, r, i) {
							return l(this, void 0, void 0, function () {
								var o, s, u, a, l, d, f, h;
								return c(this, function (c) {
									if (!(o = this._getModel(e))) return [2, null];
									for (
										s = [],
											u = new Set(),
											a = new RegExp(r, i),
											(l = o.getWordAtPosition(n, a)) &&
												u.add(o.getValueInRange(l)),
											d = o.createWordIterator(a),
											f = d.next();
										!f.done && u.size <= t._suggestionsLimit;
										f = d.next()
									)
										(h = f.value),
											u.has(h) || (u.add(h), isNaN(Number(h)) && s.push(h));
									return [2, s];
								});
							});
						}),
						(t.prototype.computeWordRanges = function (e, t, n, r) {
							return l(this, void 0, void 0, function () {
								var i, o, s, u, a, l, d, f, h;
								return c(this, function (c) {
									if (!(i = this._getModel(e))) return [2, Object.create(null)];
									for (
										o = new RegExp(n, r),
											s = Object.create(null),
											u = t.startLineNumber;
										u < t.endLineNumber;
										u++
									)
										for (
											a = i.getLineWords(u, o), l = 0, d = a;
											l < d.length;
											l++
										)
											(f = d[l]),
												isNaN(Number(f.word)) &&
													((h = s[f.word]) || ((h = []), (s[f.word] = h)),
													h.push({
														startLineNumber: u,
														startColumn: f.startColumn,
														endLineNumber: u,
														endColumn: f.endColumn,
													}));
									return [2, s];
								});
							});
						}),
						(t.prototype.navigateValueSet = function (e, t, n, r, i) {
							return l(this, void 0, void 0, function () {
								var o, s, u, a, l;
								return c(this, function (c) {
									return (o = this._getModel(e))
										? ((s = new RegExp(r, i)),
										  t.startColumn === t.endColumn &&
												(t = {
													startLineNumber: t.startLineNumber,
													startColumn: t.startColumn,
													endLineNumber: t.endLineNumber,
													endColumn: t.endColumn + 1,
												}),
										  (u = o.getValueInRange(t)),
										  (a = o.getWordAtPosition(
												{
													lineNumber: t.startLineNumber,
													column: t.startColumn,
												},
												s
										  ))
												? ((l = o.getValueInRange(a)),
												  [
														2,
														g.BasicInplaceReplace.INSTANCE.navigateValueSet(
															t,
															u,
															a,
															l,
															n
														),
												  ])
												: [2, null])
										: [2, null];
								});
							});
						}),
						(t.prototype.loadForeignModule = function (t, n, r) {
							var i = this,
								o = {
									host: _.createProxyObject(r, function (e, t) {
										return i._host.fhr(e, t);
									}),
									getMirrorModels: function () {
										return i._getModels();
									},
								};
							return this._foreignModuleFactory
								? ((this._foreignModule = this._foreignModuleFactory(o, n)),
								  Promise.resolve(_.getAllMethodNames(this._foreignModule)))
								: new Promise(function (r, s) {
										e(
											[t],
											function (e) {
												(i._foreignModule = e.create(o, n)),
													r(_.getAllMethodNames(i._foreignModule));
											},
											s
										);
								  });
						}),
						(t.prototype.fmr = function (e, t) {
							if (
								!this._foreignModule ||
								"function" != typeof this._foreignModule[e]
							)
								return Promise.reject(
									new Error("Missing requestHandler or method: " + e)
								);
							try {
								return Promise.resolve(
									this._foreignModule[e].apply(this._foreignModule, t)
								);
							} catch (e) {
								return Promise.reject(e);
							}
						}),
						(t._diffLimit = 1e5),
						(t._suggestionsLimit = 1e4),
						t
					);
				})();
			(t.EditorSimpleWorker = b),
				(t.create = function (e) {
					return new b(e, null);
				}),
				"function" == typeof importScripts &&
					(o.globals.monaco = v.createMonacoBaseAPI());
		}
	),
		(function () {
			var e = self.MonacoEnvironment,
				t = e && e.baseUrl ? e.baseUrl : "../../../";
			("function" == typeof self.define && self.define.amd) ||
				importScripts(t + "vs/loader.js"),
				require.config({ baseUrl: t, catchError: !0 });
			var n = !0,
				r = [];
			self.onmessage = function (e) {
				var t;
				n
					? ((n = !1),
					  (t = e.data),
					  require([t], function (e) {
							setTimeout(function () {
								var t = e.create(function (e, t) {
									self.postMessage(e, t);
								}, null);
								for (
									self.onmessage = function (e) {
										return t.onmessage(e.data);
									};
									r.length > 0;

								)
									self.onmessage(r.shift());
							}, 0);
					  }))
					: r.push(e);
			};
		})();
}.call(this));
//# sourceMappingURL=../../../../min-maps/vs/base/worker/workerMain.js.map
