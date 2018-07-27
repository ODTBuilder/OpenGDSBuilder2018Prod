/**
 * ### geogigfunction plugin
 */

/**
 * 
 * @name $.jstree.defaults.geogigfunction
 * @plugin geogigfunction
 * @comment 적용중인 기능 표시
 * @author 소이준
 */
$.jstree.defaults.geogigfunction = {
	"checkout" : "fas fa-check",
	"unstaged" : "gb-geogig-unstaged",
	"staged" : "gb-geogig-staged",
	"unmerged" : "gb-geogig-unmerged",
	"merged" : "gb-geogig-merged"
};

$.jstree.plugins.geogigfunction = function(options, parent) {
	this.init = function(el, options) {
		this._data.geogigfunction = {};
		var optKeys = Object.keys(options.geogigfunction);
		for (var i = 0; i < optKeys.length; i++) {
			this._data.geogigfunction[optKeys[i]] = {
				"list" : [],
				"css" : options.geogigfunction[optKeys[i]]
			};
		}
		console.log(this._data.geogigfunction);
		parent.init.call(this, el, options);
	};
	this.refresh = function(skip_loading, forget_state) {
		parent.refresh.call(this, skip_loading, forget_state);
	};
	this.bind = function() {
		this.element.on('ready.jstree', $.proxy(function(e, data) {
			console.log("ready");
			var optKeys = Object.keys(this._data.geogigfunction), node = data.node;
		}, this)).on('model.jstree', $.proxy(function(e, data) {
			var m = this._model.data, dpc = data.nodes, i, j, c = 'default', k, optKeys = Object.keys(this._data.geogigfunction);
			for (i = 0, j = dpc.length; i < j; i++) {
				for (var k = 0; k < optKeys.length; k++) {
					var list = this._data.geogigfunction[optKeys[k]].list;
					if (m[dpc[i]].original.hasOwnProperty("type")) {
						if (m[dpc[i]].original.type === "geoserver") {

						} else if (m[dpc[i]].original.type === "repository") {

						} else if (m[dpc[i]].original.type === "branch") {
							if (m[dpc[i]].original.hasOwnProperty("status")) {
								if (m[dpc[i]].original.status === "unmerged") {
									m[dpc[i]].state["unmerged"] = true;
								} else {
									m[dpc[i]].state["unmerged"] = false;
								}
								if (m[dpc[i]].original.status === "unstaged") {
									m[dpc[i]].state["unstaged"] = true;
								} else {
									m[dpc[i]].state["unstaged"] = false;
								}
								if (m[dpc[i]].original.status === "staged") {
									m[dpc[i]].state["staged"] = true;
								} else {
									m[dpc[i]].state["staged"] = false;
								}
							}
						} else if (m[dpc[i]].original.type === "layer") {

						}
					}
					/*
					 * if (list.indexOf(m[dpc[i]].id) !== -1) {
					 * m[dpc[i]].state[optKeys[k]] = true; } else {
					 * m[dpc[i]].state[optKeys[k]] = false; }
					 */
				}
			}
		}, this)).on('delete_node.jstree', $.proxy(function(e, data) {
			console.log("delete layer");
			var optKeys = Object.keys(this._data.geogigfunction), node = data.node;
			for (var k = 0; k < optKeys.length; k++) {
				var list = this._data.geogigfunction[optKeys[k]].list;
				for (var l = 0; l < list.length; l++) {
					if (list.indexOf(node.id) !== -1) {
						list.splice(list.indexOf(node.id), 1);
					}
				}
			}
		}, this)).on(
				'select_node.jstree',
				$.proxy(function(e, data) {
					console.log("delete layer");
					var optKeys = Object.keys(this._data.geogigfunction), node = data.node;
					console.log(node);
					var type = this.get_type(node);
					console.log(type);
					var root = this.get_node("#", true);
					$(root).find(".gb-versioning-repository-btnarea").remove();
					if (type === "repository") {
						var branchBtn = $("<button>").addClass("gb-button").addClass("gb-button-default").text("New branch").css({
							"display" : "inline-block"
						});
						var remoteBtn = $("<button>").addClass("gb-button").addClass("gb-button-default").text("Remote repository").css({
							"display" : "inline-block"
						});

						var btnArea = $("<span>").addClass("gb-versioning-repository-btnarea").append(branchBtn).append(remoteBtn);
						var obj = this.get_node(node, true);
						$(obj[0].childNodes[1]).after(btnArea);
					} else if (type === "branch") {

						var checkoutBtn = $("<button>").addClass("gb-button").addClass("gb-button-default").text("Checkout").css({
							"display" : "inline-block"
						});
						var addBtn = $("<button>").addClass("gb-button").addClass("gb-button-default").text("Add").css({
							"display" : "inline-block"
						});
						var commitBtn = $("<button>").addClass("gb-button").addClass("gb-button-default").text("Commit").css({
							"display" : "inline-block"
						});
						var pullBtn = $("<button>").addClass("gb-button").addClass("gb-button-default").text("Pull").css({
							"display" : "inline-block"
						});
						var pushBtn = $("<button>").addClass("gb-button").addClass("gb-button-default").text("Push").css({
							"display" : "inline-block"
						});
						var mergeBtn = $("<button>").addClass("gb-button").addClass("gb-button-default").text("Merge").css({
							"display" : "inline-block"
						});
						var btnArea = $("<span>").addClass("gb-versioning-repository-btnarea").append(checkoutBtn).append(addBtn).append(
								commitBtn).append(pullBtn).append(pushBtn).append(mergeBtn);
						var obj = this.get_node(node, true);
						$(obj[0].childNodes[1]).after(btnArea);
					} else if (type === "layer") {
						var publishBtn = $("<button>").addClass("gb-button").addClass("gb-button-default").text("Publish").css({
							"display" : "inline-block"
						});

						var btnArea = $("<span>").addClass("gb-versioning-repository-btnarea").append(publishBtn);
						var obj = this.get_node(node, true);
						$(obj[0].childNodes[1]).after(btnArea);
					}
				}, this)).on('load_node.jstree', $.proxy(function(e, data) {
			console.log("delete layer");
			var optKeys = Object.keys(this._data.geogigfunction), node = data.node;
			console.log(data);
		}, this));

		parent.bind.call(this);
	};
	this.redraw_node = function(obj, deep, is_callback, force_render) {
		obj = parent.redraw_node.apply(this, arguments);
		console.log(this.get_node(obj.id));
		if (obj) {
			var fnmks = Object.keys(this._data.geogigfunction);
			for (var i = 0; i < fnmks.length; i++) {
				var nobj = this.get_node(obj.id);
				if (nobj.state[fnmks[i]]) {
					if (fnmks[i] === "checkout") {
						var ic = $("<i>").attr({
							"role" : "presentation"
						}).addClass("jstree-icon").addClass("jstree-themeicon-custom").addClass(this._data.geogigfunction[fnmks[i]].css);
						$(obj.childNodes[1]).append(ic);
					} else if (fnmks[i] === "staged") {
						var ic = $("<span>").text(" [Staged]").attr({
							"role" : "presentation"
						}).addClass(this._data.geogigfunction[fnmks[i]].css);
						$(obj.childNodes[1]).append(ic);
					} else if (fnmks[i] === "unstaged") {
						var ic = $("<span>").text(" [Unstaged]").attr({
							"role" : "presentation"
						}).addClass(this._data.geogigfunction[fnmks[i]].css);
						$(obj.childNodes[1]).append(ic);
					} else if (fnmks[i] === "merged") {
						var ic = $("<span>").text(" [Merged]").attr({
							"role" : "presentation"
						}).addClass(this._data.geogigfunction[fnmks[i]].css);
						$(obj.childNodes[1]).append(ic);
					} else if (fnmks[i] === "unmerged") {
						var ic = $("<span>").text(" [Unmerged]").attr({
							"role" : "presentation"
						}).addClass(this._data.geogigfunction[fnmks[i]].css);
						$(obj.childNodes[1]).append(ic);
					}
					/*
					 * var ic = $("<i>").attr({ "role" : "presentation"
					 * }).addClass("jstree-icon").addClass("jstree-themeicon-custom").addClass(this._data.geogigfunction[fnmks[i]].icon);
					 * $(obj.childNodes[1]).append(ic);
					 */
				}
			}
		}
		return obj;
	};
	/**
	 * set flag
	 * 
	 * @method set_flag
	 * @plugin geogigfunction
	 */
	this.set_flag = function(obj, funcname, flag) {
		obj.state[funcname] = flag;
		if (flag) {
			var list = this._data.geogigfunction[funcname].list;
			if (list.indexOf(obj.id) === -1) {
				list.push(obj.id);
				this.redraw_node(obj.id);
			}
		} else {
			var list = this._data.geogigfunction[funcname].list;
			if (list.indexOf(obj.id) !== -1) {
				list.splice(list.indexOf(obj.id), 1);
				this.redraw_node(obj.id);
			}
		}
	};
};
// include the geogigfunction plugin by default
// $.jstree.defaults.plugins.push("geogigfunction");
