var gb;
if (!gb)
	gb = {};
if (!gb.geoserver)
	gb.geoserver = {};

/**
 * 지오서버에 레이어를 업로드 하기위한 모달 객체를 정의한다.
 * 
 * @class gb.geoserver.UploadGeoJSON
 * @memberof gb.geoserver
 * @param {String}
 *            url - geojson 업로드할 URL
 * 
 * @version 0.01
 * @author SOYIJUN
 * @date 2019. 02. 26
 */
gb.geoserver.UploadGeoJSON = function(obj) {
	var that = this;
	var options = obj ? obj : {};
	this.url = typeof options.url === "string" ? options.url : undefined;
	this.epsginit = (typeof options.epsg === "number" || typeof options.epsg === "string" || typeof options.epsg === "function") ? options.epsg
			: undefined;
	this.geoserverTree = typeof options.geoserverTree === "function" ? options.geoserverTree : undefined;
	this.geoserver;
	this.workspace;
	this.datastore;
	this.callback;
	this.validEPSG = false;
	this.epsg = undefined;
	this.locale = options.locale ? options.locale : "en";
	this.validIconSpan = $("<span>").addClass("gb-geoserver-uploadshp-epsg-icon");

	// 미발행 레이어 이름 중복 무시 여부 변수
	this.ignorePublic = false;

	this.translation = {
		"uploadgeojson" : {
			"ko" : "GeoJSON 레이어 업로드",
			"en" : "Upload GeoJSON Layer"
		},
		"close" : {
			"ko" : "닫기",
			"en" : "Close"
		},
		"upload" : {
			"ko" : "업로드",
			"en" : "Upload"
		},
		"noset" : {
			"ko" : "선택 없음",
			"en" : "Not selected"
		},
		"noserver" : {
			"ko" : "지오서버 없음",
			"en" : "No GeoServer"
		},
		"workspace" : {
			"ko" : "작업공간",
			"en" : "Workspace"
		},
		"datastore" : {
			"ko" : "데이터저장소",
			"en" : "Datastore"
		},
		"crs" : {
			"ko" : "좌표계",
			"en" : "CRS"
		},
		"slayer" : {
			"ko" : "선택한 레이어",
			"en" : "Selected Layer"
		},
		"ignore" : {
			"ko" : "중복되는 미발행 레이어 덮어쓰기",
			"en" : "Overwrite duplicate unpublished layers"
		},
	};
	this.epsgInput = $("<input>").addClass("gb-geoserver-uploadshp-epsg-input").attr({
		"type" : "text",
		"placeholder" : "EX) 3857"
	});
	this.tout = false;
	$(this.epsgInput).keyup(function() {
		if (that.tout) {
			clearTimeout(that.tout);
		}
		that.tout = setTimeout(function() {
			var v = $(that.epsgInput).val();
			console.log(v);
			that.searchEPSGCode(v);
		}, 250);
	});
};
gb.geoserver.UploadGeoJSON.prototype = Object.create(gb.geoserver.UploadGeoJSON.prototype);
gb.geoserver.UploadGeoJSON.prototype.constructor = gb.geoserver.UploadGeoJSON;

/**
 * 지오서버 트리를 반환한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#getGeoserverTree
 * @return {String} 지오서버 트리 객체
 */
gb.geoserver.UploadGeoJSON.prototype.getGeoserverTree = function() {
	return this.geoserverTree();
};

/**
 * 지오서버 트리를 반환한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#setGeoserverTree
 * @param {String}
 *            지오서버 트리 객체를 반환하는 함수
 */
gb.geoserver.UploadGeoJSON.prototype.setGeoserverTree = function(fnc) {
	this.geoserverTree = fnc;
};

/**
 * 현재 검색한 좌표계의 EPSG 코드를 반환한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#getEPSGCode
 * @return {String} 현재 검색한 좌표계의 EPSG 코드
 */
gb.geoserver.UploadGeoJSON.prototype.getEPSGCode = function() {
	return this.epsg;
};

/**
 * 현재 검색한 좌표계의 EPSG 코드를 설정한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#getEPSGCode
 * @param {String}
 *            code - 현재 검색한 좌표계의 EPSG 코드
 */
gb.geoserver.UploadGeoJSON.prototype.setEPSGCode = function(code) {
	this.epsg = code;
};

/**
 * epsg 코드의 유효성을 설정한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#setValidEPSG
 * @param {Boolean}
 *            flag - EPSG 코드 유효성
 */
gb.geoserver.UploadGeoJSON.prototype.setValidEPSG = function(flag) {
	this.validEPSG = flag;

	$(this.validIconSpan).empty();

	if (flag) {
		var validIcon = $("<i>").addClass("fas").addClass("fa-check");
		$(this.validIconSpan).append(validIcon);

		if ($(this.validIconSpan).hasClass("gb-geoserver-uploadshp-epsg-valid-icon")) {
			// $(this.validIconSpan).addClass("gb-geoserver-uploadshp-epsg-invalid-icon");
		} else {
			if ($(this.validIconSpan).hasClass("gb-geoserver-uploadshp-epsg-invalid-icon")) {
				$(this.validIconSpan).removeClass("gb-geoserver-uploadshp-epsg-invalid-icon");
			}
			$(this.validIconSpan).addClass("gb-geoserver-uploadshp-epsg-valid-icon");
		}
	} else {
		var validIcon = $("<i>").addClass("fas").addClass("fa-times");
		$(this.validIconSpan).append(validIcon);

		if ($(this.validIconSpan).hasClass("gb-geoserver-uploadshp-epsg-invalid-icon")) {
			// $(this.validIconSpan).addClass("gb-geoserver-uploadshp-epsg-invalid-icon");
		} else {
			if ($(this.validIconSpan).hasClass("gb-geoserver-uploadshp-epsg-valid-icon")) {
				$(this.validIconSpan).removeClass("gb-geoserver-uploadshp-epsg-valid-icon");
			}
			$(this.validIconSpan).addClass("gb-geoserver-uploadshp-epsg-invalid-icon");
		}
	}
};

/**
 * epsg 코드의 유효성을 반환한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#getValidEPSG
 * @return {Boolean} EPSG 코드 유효성
 */
gb.geoserver.UploadGeoJSON.prototype.getValidEPSG = function() {
	return this.validEPSG;
};

/**
 * 업로드 URL 주소를 반환한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#getUploadURL
 * @return {String} 업로드 URL 주소
 */
gb.geoserver.UploadGeoJSON.prototype.getUploadURL = function() {
	return this.url;
};

/**
 * 모달을 연다
 * 
 * @method gb.geoserver.UploadGeoJSON#open
 * @override
 */
gb.geoserver.UploadGeoJSON.prototype.open = function(epsg, layers) {
	var that = this;
	var tree = typeof this.getGeoserverTree === "function" ? this.getGeoserverTree() : undefined;
	if (tree === undefined) {
		return;
	}
	var jstree = tree.getJSTree();
	var root = jstree.get_node("#");
	console.log(root);
	var servers = root.children;
	var serverLabel = $("<div>").text("GeoServer");
	var serversel = $("<select>").addClass("gb-form").css({
		"margin-bottom" : "5px"
	}).change(function() {
		console.log("server change");

		var wnode = jstree.get_node($(serversel).find("option:selected").attr("nodeid"));
		var works = wnode.children;
		if (works.length === 0 && wnode.state.loaded === false) {
			var rootNode = jstree.get_node("#");
			var nodes = root.children;
			var callback = function() {
				$(worksel).empty();
				var wnode2 = jstree.get_node($(serversel).find("option:selected").attr("nodeid"));
				var works2 = wnode2.children;
				if (wnode2.state.loaded === true && works2.length > 0) {
					console.log(works);
					for (var i = 0; i < works2.length; i++) {
						var node = jstree.get_node(works2[i]);
						var opt = $("<option>").attr({
							"value" : node.text,
							"nodeid" : node.id
						}).text(node.text);
						$(worksel).append(opt);
					}
					$(worksel).trigger("change");
				}
			};
			tree.initLoadingList();
			tree.initLoadingNumber();
			for (var i = 0; i < nodes.length; i++) {
				var pnodeid = nodes[i];
				console.log("선택한 노드:", pnodeid);
				console.log(tree.getLoadingList());
				tree.openNodeRecursive(i, jstree.get_node(nodes[i]), pnodeid, callback, true);
			}
		} else {
			$(worksel).empty();
			for (var i = 0; i < works.length; i++) {
				var node = jstree.get_node(works[i]);
				var opt = $("<option>").attr({
					"value" : node.text,
					"nodeid" : node.id
				}).text(node.text);
				$(worksel).append(opt);
			}
			$(worksel).trigger("change");
		}

	});
	if (servers.length === 0) {
		var opt = $("<option>").attr({
			"value" : "noset"
		}).text(this.translation.noserver[this.locale]);
		$(serversel).append(opt);
	} else {
		for (var i = 0; i < servers.length; i++) {
			var node = jstree.get_node(servers[i]);
			var opt = $("<option>").attr({
				"value" : node.text,
				"nodeid" : node.id
			}).text(node.text);
			$(serversel).append(opt);
		}
	}
	var nowork = $("<option>").attr({
		"value" : "noset"
	}).text(this.translation.noset[this.locale]);
	var workLabel = $("<div>").text(this.translation.workspace[this.locale]);
	var worksel = $("<select>").addClass("gb-form").css({
		"margin-bottom" : "5px"
	}).append(nowork).change(function() {
		console.log("work change");

		var snode = jstree.get_node($(worksel).find("option:selected").attr("nodeid"));
		var stores = snode.children;
		if (stores.length === 0 && snode.state.loaded === false) {
			var rootNode = jstree.get_node("#");
			var nodes = root.children;
			var callback = function() {
				$(storesel).empty();
				var snode2 = jstree.get_node($(worksel).find("option:selected").attr("nodeid"));
				var stores2 = snode2.children;
				if (snode2.state.loaded === true && stores2.length > 0) {
					console.log(stores);
					for (var i = 0; i < stores2.length; i++) {
						var node = jstree.get_node(stores2[i]);
						var opt = $("<option>").attr({
							"value" : node.text,
							"nodeid" : node.id
						}).text(node.text);
						$(storesel).append(opt);
					}
				}
			};
			tree.initLoadingList();
			tree.initLoadingNumber();
			for (var i = 0; i < nodes.length; i++) {
				var pnodeid = nodes[i];
				console.log("선택한 노드:", pnodeid);
				console.log(tree.getLoadingList());
				tree.openNodeRecursive(i, jstree.get_node(nodes[i]), pnodeid, callback, true);
			}
		} else {
			$(storesel).empty();
			for (var i = 0; i < stores.length; i++) {
				var node = jstree.get_node(stores[i]);
				var opt = $("<option>").attr({
					"value" : node.text,
					"nodeid" : node.id
				}).text(node.text);
				$(storesel).append(opt);
			}
		}
	});
	var nostore = $("<option>").attr({
		"value" : "noset"
	}).text(this.translation.noset[this.locale]);
	var storeLabel = $("<div>").text(this.translation.datastore[this.locale]);
	var storesel = $("<select>").addClass("gb-form").css({
		"margin-bottom" : "5px"
	}).append(nostore);

	var ignoredup = $("<input>").attr({
		"type" : "checkbox"
	}).css({
		"vertical-align" : "top",
		"margin-right" : "6px"
	});
	var ignoreLabel = $("<label>").append(ignoredup).append(this.translation.ignore[this.locale]);
	var ignoreArea = $("<div>").append(ignoreLabel).css({
		"margin-top" : "10px"
	});
	var left = $("<div>").css({
		"width" : "160px",
		"float" : "left",
		"margin" : "5px"
	}).append(serverLabel).append(serversel).append(workLabel).append(worksel).append(storeLabel).append(storesel).append(ignoreArea);

	var crsLabel = $("<div>").text(this.translation.crs[this.locale]);
	var epsgVal = $("<span>").text(epsg);
	var epsgArea = $("<div>").addClass("gb-form").append(epsgVal).css({
		"margin-bottom" : "5px"
	});
	var layerLabel = $("<div>").text(this.translation.slayer[this.locale]);
	var list = $("<div>").addClass("gb-form").css({
		"margin-bottom" : "5px",
		"height" : "154px",
		"overflow" : "auto"
	});
	if (Array.isArray(layers)) {
		var ul = $("<ul>").css({
			"padding-left" : "15px"
		});
		for (var i = 0; i < layers.length; i++) {
			if (layers[i] instanceof ol.layer.Base) {
				var li = $("<li>").text(layers[i].get("name"));
				$(ul).append(li);
			}
		}
		$(list).append(ul);
	}
	var right = $("<div>").css({
		"width" : "238px",
		"float" : "left",
		"margin" : "5px"
	}).append(crsLabel).append(epsgArea).append(layerLabel).append(list);
	var bodyArea = $("<div>").css({
		"height" : "245px"
	}).append(left).append(right);

	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text(this.translation.close[this.locale]);
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text(this.translation.upload[this.locale]);

	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);
	var modalFooter = $("<div>").append(buttonArea);
	var uploadModal = new gb.modal.Base({
		"title" : this.translation.uploadgeojson[this.locale],
		"width" : 440,
		"autoOpen" : true,
		"body" : bodyArea,
		"footer" : modalFooter
	});

	$(serversel).trigger("change");

	$(closeBtn).click(function() {
		uploadModal.close();
	});
	$(okBtn).click(function() {
		that.uploadFile(file, uploadModal);
	});
};

/**
 * 파일 업로드 요청 결과 테이블을 생성한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#resultTable
 * @param {String}
 *            geoserver - 설정할 지오서버의 이름
 */
gb.geoserver.UploadGeoJSON.prototype.resultTable = function(result) {

}

/**
 * callback 함수를 설정한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#setCallback
 * @param {String}
 *            geoserver - 설정할 지오서버의 이름
 */
gb.geoserver.UploadGeoJSON.prototype.setCallback = function(callback) {
	this.callback = callback;
}

/**
 * callback 함수를 반환한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#getCallback
 * @return {String} 설정한 지오서버의 이름
 */
gb.geoserver.UploadGeoJSON.prototype.getCallback = function() {
	return this.callback;
}

/**
 * 지오서버를 설정한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#setGeoServer
 * @param {String}
 *            geoserver - 설정할 지오서버의 이름
 */
gb.geoserver.UploadGeoJSON.prototype.setGeoServer = function(geoserver) {
	this.geoserver = geoserver;
}

/**
 * 지오서버를 반환한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#getGeoServer
 * @return {String} 설정한 지오서버의 이름
 */
gb.geoserver.UploadGeoJSON.prototype.getGeoServer = function() {
	return this.geoserver;
}

/**
 * 워크스페이스를 설정한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#setWorkspace
 * @param {String}
 *            workspace - 설정할 워크스페이스의 이름
 */
gb.geoserver.UploadGeoJSON.prototype.setWorkspace = function(workspace) {
	this.workspace = workspace;
}

/**
 * 워크스페이스를 반환한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#getWorkspace
 * @return {String} 설정한 워크스페이스의 이름
 */
gb.geoserver.UploadGeoJSON.prototype.getWorkspace = function() {
	return this.workspace;
}

/**
 * 데이터스토어를 설정한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#setDatastore
 * @param {String}
 *            datastore - 설정할 데이터스토어의 이름
 */
gb.geoserver.UploadGeoJSON.prototype.setDatastore = function(datastore) {
	this.datastore = datastore
}

/**
 * 데이터스토어를 반환한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#getDatastore
 * @return {String} 설정한 데이터스토어의 이름
 */
gb.geoserver.UploadGeoJSON.prototype.getDatastore = function() {
	return this.datastore;
}

/**
 * 선택한 파일을 업로드한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#uploadFile
 * @param {Element}
 */
gb.geoserver.UploadGeoJSON.prototype.uploadFile = function(input, modal) {
	var that = this;
	var modal = modal;

	var params = {
		"serverName" : this.getGeoServer(),
		"workspace" : this.getWorkspace(),
		"datastore" : this.getDatastore(),
		"ignorePublication" : this.ignorePublic
	};

	var url = this.getUploadURL();
	var withoutParamURL = url.substring(0, url.indexOf("?") !== -1 ? url.indexOf("?") : undefined);
	var queryString = url.indexOf("?") !== -1 ? url.substring(url.indexOf("?") + 1) : undefined;
	var queryParams = {};

	/*
	 * if (queryString) { queryParams = JSON.parse('{"' +
	 * queryString.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
	 * function(key, value) { return key === "" ? value :
	 * decodeURIComponent(value); }); } console.log(queryParams);
	 */
	var finalParams = {};
	$.extend(finalParams, params, {});

	var form = $("<form>");
	var formData = new FormData(form[0]);
	formData.append("file", input);
	var keys = Object.keys(finalParams);
	for (var i = 0; i < keys.length; i++) {
		formData.append(keys[i], finalParams[keys[i]]);
	}

	$.ajax({
		// url : withoutParamURL,
		url : this.url,
		method : "POST",
		enctype : 'multipart/form-data',
		contentType : false,
		data : formData,
		processData : false,
		beforeSend : function() {
			// $("body").css("cursor", "wait");
			modal.modal.append($("<div id='shp-upload-loading'>").css({
				"z-index" : "10",
				"position" : "absolute",
				"left" : "0",
				"top" : "0",
				"width" : "100%",
				"height" : "100%",
				"text-align" : "center",
				"background-color" : "rgba(0, 0, 0, 0.4)"
			}).append($("<i>").addClass("fas fa-spinner fa-spin fa-5x").css({
				"position" : "relative",
				"top" : "50%",
				"margin-top" : "-5em"
			})));
		},
		complete : function() {
			// $("body").css("cursor", "default");
			$("#shp-upload-loading").remove();
		},
		success : function(data) {
			console.log(data);
			that.callback();
			modal.close();
		}
	});
}

/**
 * 베이스 좌표계를 변경하기 위한 EPSG 코드를 검색한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#searchEPSGCode
 * @param {String}
 *            code - 베이스 좌표계를 변경하기 위한 EPSG 코드
 */
gb.geoserver.UploadGeoJSON.prototype.searchEPSGCode = function(code) {
	console.log(code);
	var that = this;
	fetch('https://epsg.io/?format=json&q=' + code).then(function(response) {
		return response.json();
	}).then(function(json) {
		if (json.number_result !== 1) {
			that.setValidEPSG(false);
			console.error("no crs");
			return;
		} else if (json.number_result < 1) {
			that.setValidEPSG(false);
			console.error("no crs");
			return;
		}
		var results = json['results'];
		if (results && results.length > 0) {
			for (var i = 0, ii = results.length; i < ii; i++) {
				var result = results[i];
				if (result) {
					var codes = result['code'], name = result['name'], proj4def = result['proj4'], bbox = result['bbox'];
					if (codes && codes.length > 0 && proj4def && proj4def.length > 0 && bbox && bbox.length == 4) {
						console.log(code);
						console.log(codes);
						if (code === codes) {
							that.setEPSGCode(code);
							that.setValidEPSG(true);
						}
						return;
					} else {
						console.error("no crs");
						that.setValidEPSG(false);
						return;
					}
				}
			}
		}
		return;
	});
};