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
	this.validEPSG = false;
	this.epsg = undefined;
	this.locale = options.locale ? options.locale : "en";
	this.validIconSpan = $("<span>").addClass("gb-geoserver-uploadshp-epsg-icon");

	// 미발행 레이어 이름 중복 무시 여부 변수
	this.ignorePublic = false;

	this.translation = {
		"400" : {
			"ko" : "요청값 잘못입력",
			"en" : "Bad request"
		},
		"404" : {
			"ko" : "페이지 없음",
			"en" : "Not found"
		},
		"405" : {
			"ko" : "요청 타입 에러",
			"en" : "Method not allowed"
		},
		"406" : {
			"ko" : "요청 형식 에러",
			"en" : "Not acceptable"
		},
		"407" : {
			"ko" : "프록시 에러",
			"en" : "Proxy authentication required"
		},
		"408" : {
			"ko" : "요청시간 초과",
			"en" : "Request timeout"
		},
		"415" : {
			"ko" : "지원하지 않는 타입 요청",
			"en" : "Unsupported media type"
		},
		"500" : {
			"ko" : "서버 내부 오류",
			"en" : "Internal server error"
		},
		"600" : {
			"ko" : "로그인을 해주세요",
			"en" : "Please log in"
		},
		"600" : {
			"ko" : "로그인을 해주세요",
			"en" : "Please log in"
		},
		"601" : {
			"ko" : "미 입력 값이 존재합니다",
			"en" : "You have not entered any required parameters"
		},
		"602" : {
			"ko" : "서버 이름 또는 URL이 중복됩니다",
			"en" : "Server name or URL are duplicated"
		},
		"603" : {
			"ko" : "다시 로그인을 해주세요",
			"en" : "Please log in again"
		},
		"604" : {
			"ko" : "잘못 입력한 정보가 있습니다",
			"en" : "You have entered wrong information"
		},
		"605" : {
			"ko" : "해당 서버가 존재하지 않습니다",
			"en" : "The server does not exist"
		},
		"606" : {
			"ko" : "일부 성공 또는 실패하였습니다.",
			"en" : "Some have succeed or failed"
		},
		"607" : {
			"ko" : "해당 작업공간, 저장소가 존재하지 않습니다",
			"en" : "Workspace or datastore does not exist"
		},
		"608" : {
			"ko" : "올바른 파일을 넣어 주세요",
			"en" : "Please input the correct file"
		},
		"609" : {
			"ko" : "레이어가 중복됩니다",
			"en" : "Duplicate layers"
		},
		"610" : {
			"ko" : "레이어 발행이 실패하였습니다",
			"en" : "Publishing layer failed"
		},
		"611" : {
			"ko" : "Geoserver와 연결이 안정적이지 않습니다",
			"en" : "The connection with geoserver is not stable"
		},
		"612" : {
			"ko" : "작업공간에 레이어가 존재하지 않습니다",
			"en" : "The is no layer in the workspace"
		},
		"uploadgeojson" : {
			"ko" : "GeoJSON 레이어 업로드",
			"en" : "Upload GeoJSON Layer"
		},
		"close" : {
			"ko" : "닫기",
			"en" : "Close"
		},
		"ok" : {
			"ko" : "확인",
			"en" : "OK"
		},
		"err" : {
			"ko" : "오류",
			"en" : "Error"
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
		"noserver" : {
			"ko" : "GeoServer가 설정되지 않았습니다.",
			"en" : "GeoServer is not set up."
		},
		"nowork" : {
			"ko" : "작업공간이 설정되지 않았습니다.",
			"en" : "Workspace is not set up."
		},
		"nostore" : {
			"ko" : "데이터저장소가 설정되지 않았습니다.",
			"en" : "Datastore is not set up."
		},
		"nocrs" : {
			"ko" : "좌표계가 설정되지 않았습니다.",
			"en" : "Coordinate reference system  is not set up."
		},
		"dupname" : {
			"ko" : "같은 이름의 레이어들을 올릴 수 없습니다.",
			"en" : "You can not upload layers with the same name."
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
	var ul = $("<ul>").css({
		"padding-left" : "15px"
	});
	if (Array.isArray(layers)) {
		var checkObj = {};
		var duplicateFlag = false;
		for (var i = 0; i < layers.length; i++) {
			var name = layers[i].get("name");
			if (!checkObj.hasOwnProperty(name)) {
				checkObj[name] = true;
			} else {
				duplicateFlag = true;
			}
			var span1 = $("<span>").addClass("gb-uploadgeojson-layer").text(layers[i].get("name"));
			var span2 = $("<span>").addClass("gb-uploadgeojson-icon");
			var li = $("<li>").addClass("gb-uploadgeojson-li").append(span1).append(span2);
			$(ul).append(li);
		}
		$(list).append(ul);
		if (duplicateFlag) {
			that.messageModal(that.translation.err[that.locale], that.translation.dupname[that.locale]);
			return;
		}
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
		var sendObj = {};
		var server = $(serversel).val();
		if (server === "noset" || server === "" || server === undefined) {
			that.messageModal(that.translation.err[that.locale], that.translation.noserver[that.locale]);
			return;
		}
		sendObj["serverName"] = server;
		var work = $(worksel).val();
		if (work === "noset" || work === "" || work === undefined) {
			that.messageModal(that.translation.err[that.locale], that.translation.nowork[that.locale]);
			return;
		}
		sendObj["workspace"] = work;
		var store = $(storesel).val();
		if (store === "noset" || store === "" || store === undefined) {
			that.messageModal(that.translation.err[that.locale], that.translation.nostore[that.locale]);
			return;
		}
		sendObj["datastore"] = store;
		var epsg = $(epsgVal).text();
		var epsgid = epsg.substring((epsg.indexOf("EPSG:") + 5));
		if (epsgid === "" || epsgid === undefined) {
			that.messageModal(that.translation.err[that.locale], that.translation.nocrs[that.locale]);
			return;
		}
		sendObj["epsg"] = epsgid;
		var ignore = $(ignoredup).is(":checked");
		sendObj["ignorePublication"] = !!ignore;
		var uploadJson = [];
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			var obj = {};
			obj["layername"] = layer.get("name");
			var source = layer.getSource();
			if (source instanceof ol.source.Vector) {
				var geojson = new ol.format.GeoJSON();
				var geoobj = geojson.writeFeaturesObject(source.getFeatures());
				obj["geojson"] = geoobj;
			}
			var attJson = {};
			var git = layer.get("git");
			var attributes = git.attribute;
			if (attributes !== undefined && Array.isArray(attributes)) {
				for (var j = 0; j < attributes.length; j++) {
					var attr = attributes[j];
					attJson[attr.getOriginFieldName()] = attr.getType();
				}
				obj["attjson"] = attJson;
			}
			uploadJson.push(obj);
		}
		sendObj["uploadJson"] = uploadJson;
		console.log(sendObj);
		that.sendJSON(sendObj, uploadModal, ul, tree);
	});
};

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
 * JSON 객체를 전송한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#sendJSON
 * @param {String}
 *            server
 */
gb.geoserver.UploadGeoJSON.prototype.sendJSON = function(obj, modal, ul, tree) {
	var that = this;
	var params = {

	}

	var toJSON = function(str) {
		return (str).replace(/(^\?)/, '').split("&").map(function(n) {
			return n = n.split("="), this[n[0]] = n[1], this
		}.bind({}))[0];
	}
	var url = this.getUploadURL();
	if (url.indexOf("?") !== -1) {
		var paramstr = url.substring(url.indexOf("?") + 1);
		console.log(paramstr);
		var queryJson = toJSON(paramstr);
		console.log(queryJson);
		if (queryJson.hasOwnProperty("_csrf")) {

		}
	}

	var tranURL = this.getUploadURL();
	// if (tranURL.indexOf("?") !== -1) {
	// tranURL += "&";
	// tranURL += jQuery.param(params);
	// } else {
	// tranURL += "?";
	// tranURL += jQuery.param(params);
	// }
	$.ajax(
			{
				url : tranURL,
				method : "POST",
				contentType : "application/json; charset=UTF-8",
				data : JSON.stringify(obj),
				dataType : 'json',
				beforeSend : function() {
					// $("body").css("cursor", "wait");
				},
				complete : function() {
					// $("body").css("cursor", "default");
				},
				success : function(data) {
					console.log(data);
					if (data.status_Code === 200) {
						tree.refreshList();
						var layers = data.layers;
						var lilayers = $(ul).children("li");
						if (Array.isArray(layers)) {
							for (var i = 0; i < layers.length; i++) {
								for (var j = 0; j < lilayers.length; j++) {
									var litext = $(lilayers[j]).find(".gb-uploadgeojson-layer").text();
									console.log(litext);
									if (layers[i][litext] !== undefined) {
										var iconSpan = $(lilayers[j]).find(".gb-uploadgeojson-icon");
										$(iconSpan).empty();
										if (layers[i][litext] === 200) {
											var icon = $("<i>").addClass("fas").addClass("fa-check").addClass(
													"gb-geoserver-uploadjson-valid-icon");
											$(iconSpan).append(icon);
										} else {
											var icon = $("<i>").addClass("fas").addClass("fa-times").addClass(
													"gb-geoserver-uploadjson-invalid-icon");
											var msg = $("<span>").text(that.translation[layers[i][litext]][that.locale]);
											$(iconSpan).append(icon);
											$(lilayers[j]).attr({
												"title" : that.translation[layers[i][litext]][that.locale]
											});
										}
									}
								}
							}
						}
						// modal.close();
					} else {
						that.errorModal(data.status_Code);
					}
				}
			}).fail(function(xhr, status, errorThrown) {
		that.errorModal(xhr.responseJSON.status);
	});
}

/**
 * GeoGig 저장소의 타겟 브랜치를 변경한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#switchBranch
 * @param {String}
 *            code - 오류 코드
 */
gb.geoserver.UploadGeoJSON.prototype.errorModal = function(code) {
	var that = this;
	that.messageModal(that.translation.err[that.locale], that.translation[code][that.locale]);
};

/**
 * 오류 메시지 창을 생성한다.
 * 
 * @method gb.geoserver.UploadGeoJSON#messageModal
 * @param {Object}
 *            server - 작업 중인 서버 노드
 * @param {Object}
 *            repo - 작업 중인 리포지토리 노드
 * @param {Object}
 *            branch - 작업 중인 브랜치 노드
 */
gb.geoserver.UploadGeoJSON.prototype.messageModal = function(title, msg) {
	var that = this;
	var msg1 = $("<div>").append(msg).css({
		"text-align" : "center",
		"font-size" : "16px",
		"margin-top" : "18px",
		"margin-bottom" : "18px"
	});
	var body = $("<div>").append(msg1);
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text(this.translation.ok[this.locale]);
	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn);

	var modal = new gb.modal.Base({
		"title" : title,
		"width" : 390,
		"autoOpen" : true,
		"body" : body,
		"footer" : buttonArea
	});
	$(okBtn).click(function() {
		modal.close();
	});
};