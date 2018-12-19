var gb;
if (!gb)
	gb = {};
if (!gb.geoserver)
	gb.geoserver = {};

/**
 * 지오서버에 레이어를 업로드 하기위한 모달 객체를 정의한다.
 * 
 * @class gb.geoserver.UploadSHP
 * @memberof gb.geoserver
 * @param {String}
 *            url - SHP파일을 업로드할 URL
 * 
 * @version 0.01
 * @author SOYIJUN
 * @date 2017. 07.26
 */
gb.geoserver.UploadSHP = function(obj) {
	var that = this;
	var options = obj ? obj : {};
	this.url = typeof options.url === "string" ? options.url : undefined;
	this.geoserver;
	this.workspace;
	this.datastore;
	this.callback;
	this.validEPSG = false;
	this.epsg = undefined;
	this.validIconSpan = $("<span>").addClass("gb-geoserver-uploadshp-epsg-icon");

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
gb.geoserver.UploadSHP.prototype = Object.create(gb.geoserver.UploadSHP.prototype);
gb.geoserver.UploadSHP.prototype.constructor = gb.geoserver.UploadSHP;

/**
 * 현재 검색한 좌표계의 EPSG 코드를 반환한다.
 * 
 * @method gb.geoserver.UploadSHP#getEPSGCode
 * @return {String} 현재 검색한 좌표계의 EPSG 코드
 */
gb.geoserver.UploadSHP.prototype.getEPSGCode = function() {
	return this.epsg;
};

/**
 * 현재 검색한 좌표계의 EPSG 코드를 설정한다.
 * 
 * @method gb.geoserver.UploadSHP#getEPSGCode
 * @param {String}
 *            code - 현재 검색한 좌표계의 EPSG 코드
 */
gb.geoserver.UploadSHP.prototype.setEPSGCode = function(code) {
	this.epsg = code;
};

/**
 * epsg 코드의 유효성을 설정한다.
 * 
 * @method gb.geoserver.UploadSHP#setValidEPSG
 * @param {Boolean}
 *            flag - EPSG 코드 유효성
 */
gb.geoserver.UploadSHP.prototype.setValidEPSG = function(flag) {
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
 * @method gb.geoserver.UploadSHP#getValidEPSG
 * @return {Boolean} EPSG 코드 유효성
 */
gb.geoserver.UploadSHP.prototype.getValidEPSG = function() {
	return this.validEPSG;
};

/**
 * 업로드 URL 주소를 반환한다.
 * 
 * @method gb.geoserver.UploadSHP#getUploadURL
 * @return {String} 업로드 URL 주소
 */
gb.geoserver.UploadSHP.prototype.getUploadURL = function() {
	return this.url;
};

/**
 * 모달을 연다
 * 
 * @method gb.geoserver.UploadSHP#open
 * @override
 */
gb.geoserver.UploadSHP.prototype.open = function(geoserver, workspace, datastrore) {
	var that = this;
	
	// EPSG 입력 창 생성
/*	var message1 = $("<div>").text("1. Select your coordinate system(EPSG).");
	var label = $("<span>").addClass("gb-geoserver-uploadshp-epsg-label").text("EPSG:");

	this.setValidEPSG(false);

	var inputDiv = $("<div>").css({
		"margin" : "10px"
	}).append(label).append(this.epsgInput).append(this.validIconSpan);*/
	
	var icon = $("<div>").addClass("fas fa-info-circle fa-2x");
	var messageContent = $("<p>").css({
		"margin": "0 10px"
	}).html("Please input SHP file compressed in ZIP format");
	var message2 = $("<div>").addClass("validation-message").append(icon).append(messageContent);
	
	var file;
	var fileSelect = 
		$("<input accept='.zip'>")
		.attr({
			"type" : "file"
		})
		.change(function() {
			if (!!this.files) {
				file = this.files[0];
				if (file.size > 0) {
					fileInfo.text(file.name + ' , ' + file.size + ' kb');
				}
			}
		});
	
	var fileArea = $("<button type='button'>").addClass(
	"btn btn-primary btn-lg btn-block").text("Upload SHP file")
	.mouseenter(function() {
		$(this).css({
			"background-color" : "#00c4bc"
		});
	}).mouseleave(function() {
		$(this).css({
			"background-color" : "#00b5ad"
		});
	}).click(function() {
		fileSelect.click();
	}).css({
		"background-color" : "#00b5ad",
		"border-color" : "transparent",
	});
	
	var fileInfo = $("<div role='alert'>").addClass("alert alert-light").css({
		"text-align" : "center"
	});
	
	var bodyArea = $("<div>").append(message2).append(fileArea).append(fileInfo);

	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Close");
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Add");

	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);
	var modalFooter = $("<div>").append(buttonArea);
	var uploadModal = new gb.modal.Base({
		"title" : "Upload SHP File",
		"width" : 355,
		"height" : 286,
		"autoOpen" : true,
		"body" : bodyArea,
		"footer" : modalFooter
	});
	$(closeBtn).click(function() {
		uploadModal.close();
	});
	$(okBtn).click(function() {
		that.uploadFile(file, uploadModal);
	});
};

/**
 * callback 함수를 설정한다.
 * 
 * @method gb.geoserver.UploadSHP#setCallback
 * @param {String}
 *            geoserver - 설정할 지오서버의 이름
 */
gb.geoserver.UploadSHP.prototype.setCallback = function(callback) {
	this.callback = callback;
}

/**
 * callback 함수를 반환한다.
 * 
 * @method gb.geoserver.UploadSHP#getCallback
 * @return {String} 설정한 지오서버의 이름
 */
gb.geoserver.UploadSHP.prototype.getCallback = function() {
	return this.callback;
}

/**
 * 지오서버를 설정한다.
 * 
 * @method gb.geoserver.UploadSHP#setGeoServer
 * @param {String}
 *            geoserver - 설정할 지오서버의 이름
 */
gb.geoserver.UploadSHP.prototype.setGeoServer = function(geoserver) {
	this.geoserver = geoserver;
}

/**
 * 지오서버를 반환한다.
 * 
 * @method gb.geoserver.UploadSHP#getGeoServer
 * @return {String} 설정한 지오서버의 이름
 */
gb.geoserver.UploadSHP.prototype.getGeoServer = function() {
	return this.geoserver;
}

/**
 * 워크스페이스를 설정한다.
 * 
 * @method gb.geoserver.UploadSHP#setWorkspace
 * @param {String}
 *            workspace - 설정할 워크스페이스의 이름
 */
gb.geoserver.UploadSHP.prototype.setWorkspace = function(workspace) {
	this.workspace = workspace;
}

/**
 * 워크스페이스를 반환한다.
 * 
 * @method gb.geoserver.UploadSHP#getWorkspace
 * @return {String} 설정한 워크스페이스의 이름
 */
gb.geoserver.UploadSHP.prototype.getWorkspace = function() {
	return this.workspace;
}

/**
 * 데이터스토어를 설정한다.
 * 
 * @method gb.geoserver.UploadSHP#setDatastore
 * @param {String}
 *            datastore - 설정할 데이터스토어의 이름
 */
gb.geoserver.UploadSHP.prototype.setDatastore = function(datastore) {
	this.datastore = datastore
}

/**
 * 데이터스토어를 반환한다.
 * 
 * @method gb.geoserver.UploadSHP#getDatastore
 * @return {String} 설정한 데이터스토어의 이름
 */
gb.geoserver.UploadSHP.prototype.getDatastore = function() {
	return this.datastore;
}

/**
 * 선택한 파일을 업로드한다.
 * 
 * @method gb.geoserver.UploadSHP#uploadFile
 * @param {Element}
 */
gb.geoserver.UploadSHP.prototype.uploadFile = function(input, modal) {
	var that = this;
	var modal = modal;
	
	var params = {
		"serverName" : this.getGeoServer(),
		"workspace" : this.getWorkspace(),
		"datastore" : this.getDatastore(),
	};
	
	var url = this.getUploadURL();
	var withoutParamURL = url.substring(0, url.indexOf("?") !== -1 ? url.indexOf("?") : undefined);
	var queryString = url.indexOf("?") !== -1 ? url.substring(url.indexOf("?") + 1) : undefined;
	var queryParams = {};
	
	/*if (queryString) {
		queryParams = JSON.parse('{"' + queryString.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function(key, value) {
			return key === "" ? value : decodeURIComponent(value);
		});
	}
	console.log(queryParams);*/
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
		//url : withoutParamURL,
		url : this.url,
		method : "POST",
		enctype : 'multipart/form-data',
		contentType : false,
		data : formData,
		processData : false,
		beforeSend : function() {
			// $("body").css("cursor", "wait");
			modal.modal.append(
				$("<div id='shp-upload-loading'>").css({
					"z-index": "10",
					"position": "absolute",
					"left": "0",
					"top": "0",
					"width": "100%",
					"height": "100%",
					"text-align": "center",
					"background-color": "rgba(0, 0, 0, 0.4)"
				}).append(
					$("<i>").addClass("fas fa-spinner fa-spin fa-5x").css({
						"position": "relative",
						"top": "50%",
						"margin-top": "-5em"
					})
				)
			);
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
 * @method gb.geoserver.UploadSHP#searchEPSGCode
 * @param {String}
 *            code - 베이스 좌표계를 변경하기 위한 EPSG 코드
 */
gb.geoserver.UploadSHP.prototype.searchEPSGCode = function(code) {
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