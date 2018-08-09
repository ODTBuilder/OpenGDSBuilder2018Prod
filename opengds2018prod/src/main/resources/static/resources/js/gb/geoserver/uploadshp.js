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
};
gb.geoserver.UploadSHP.prototype = Object.create(gb.geoserver.UploadSHP.prototype);
gb.geoserver.UploadSHP.prototype.constructor = gb.geoserver.UploadSHP;

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
	var message1 = $("<div>").text("1. Select your coordinate system(EPSG).");
	var label = $("<span>").addClass("gb-geoserver-uploadshp-epsg-label").text("EPSG:");
	var epsgInput = $("<input>").addClass("gb-geoserver-uploadshp-epsg-input").attr({
		"type" : "text",
		"placeholder" : "EX) 3857"
	});
	var validIcon = $("<i>").addClass("fas").addClass("fa-times");
	var validIconSpan = $("<span>").append(validIcon);
	var inputDiv = $("<div>").append(label).append(epsgInput).append(validIconSpan);
	var message2 = $("<div>").text("2. Please input SHP file compressed in ZIP format");
	var file = $("<input>").attr({
		"type" : "file"
	});
	var fileArea = $("<div>").append(file);
	var bodyArea = $("<div>").append(message1).append(inputDiv).append(message2).append(fileArea);

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
		"width" : 540,
		"height" : 400,
		"autoOpen" : true,
		"body" : bodyArea,
		"footer" : modalFooter
	});
	$(closeBtn).click(function() {
		uploadModal.close();
	});
	$(okBtn).click(function() {
		that.uploadFile(file);
	});
};

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
gb.geoserver.UploadSHP.prototype.uploadFile = function(input) {
	console.log(this.getUploadURL());
	console.log(input);
}