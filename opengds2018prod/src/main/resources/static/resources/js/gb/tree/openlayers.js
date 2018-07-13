/**
 * 오픈레이어스 커스텀 플러그인 로드 필요
 * @external "jsTree-openlayers plugin"
 */

/**
 * 오픈레이어스 레이어 목록을 표시한다.
 * 
 * @class gb.tree.OpenLayers
 * @memberof gb.tree
 * @param {Object}
 *            obj - 생성자 옵션을 담은 객체
 * @param {String |
 *            Element} obj.append - 영역 본문이 삽입될 부모 노드의 ID 또는 Class 또는 Element
 * @param {ol.Map}
 *            obj.map - 편집 영역을 담당하는 ol.Map
 * @author SOYIJUN
 * @date 2018.07.02
 * @version 0.01
 * 
 */
gb.tree.OpenLayers = function(obj) {
	var that = this;
	var options = obj ? obj : {};
	this.panelTitle = $("<p>").text("Now editing").css({
		"margin" : "0",
		"float" : "left"
	});
	var addIcon = $("<i>").addClass("fas").addClass("fa-plus");
	this.addBtn = $("<button>").addClass("gb-button-clear").append(addIcon).css({
		"float" : "right"
	}).click(function() {
		that.openAddGeoServer();
	});
	var addImgIcon = $("<i>").addClass("far").addClass("fa-image");
	this.addImgBtn = $("<button>").addClass("gb-button-clear").append(addImgIcon).css({
		"float" : "right"
	}).click(function() {
		that.openAddGeoServer();
	});
	var refIcon = $("<i>").addClass("fas").addClass("fa-sync-alt");
	this.refBtn = $("<button>").addClass("gb-button-clear").append(refIcon).css({
		"float" : "right"
	}).click(function() {
		that.refreshList();
	});
	var searchIcon = $("<i>").addClass("fas").addClass("fa-search");
	this.searchBtn = $("<button>").addClass("gb-button-clear").append(searchIcon).css({
		"float" : "right"
	}).click(function() {
		that.openSearchBar();
	});
	this.titleArea = $("<div>").append(this.panelTitle).append(this.searchBtn).append(this.refBtn).append(this.addImgBtn).append(
			this.addBtn);
	this.searchInput = $("<input>").attr({
		"type" : "text"
	}).css({
		"border" : "0",
		"border-bottom" : "solid 1px #909090",
		"background-color" : "transparent",
		"width" : "90%"
	});
	this.tout = false;
	$(this.searchInput).keyup(function() {
		if (that.tout) {
			clearTimeout(that.tout);
		}
		that.tout = setTimeout(function() {
			var v = $(that.searchInput).val();
			that.getJSTree().search(v);
		}, 250);
	});
	var closeIcon = $("<i>").addClass("fas").addClass("fa-times");
	this.closeSearchBtn = $("<button>").addClass("gb-button-clear").append(closeIcon).css({
		"float" : "right"
	}).click(function() {
		that.closeSearchBar();
	});
	this.searchArea = $("<div>").css({
		"display" : "none"
	}).append(this.searchInput).append(this.closeSearchBtn);
	this.panelHead = $("<div>").addClass("gb-article-head").append(this.titleArea).append(this.searchArea);
	this.panelBody = $("<div>").addClass("gb-article-body").css({
		"overflow-y" : "hidden"
	});
	this.panel = $("<div>").addClass("gb-article").css({
		"margin" : "0"
	}).append(this.panelHead).append(this.panelBody);
	if (typeof options.append === "string") {
		$(options.append).append(this.panel);
	} else if ($(options.append).is("div")) {
		$(options.append).append(this.panel);
	}

	$(document).ready(function() {
		var parentHeight = $(that.panel).parent().innerHeight();
		var headHeight = $(that.panel).find(".gb-article-head").outerHeight();
		var bodyHeight = parentHeight - headHeight;
		$(that.panelBody).outerHeight(bodyHeight);
	});
	$(window).resize(function() {
		var parentHeight = $(that.panel).parent().innerHeight();
		var headHeight = $(that.panel).find(".gb-article-head").outerHeight();
		var bodyHeight = parentHeight - headHeight;
		$(that.panelBody).outerHeight(bodyHeight);
	});
	setTimeout(function() {
		var parentHeight = $(that.panel).parent().innerHeight();
		var headHeight = $(that.panel).find(".gb-article-head").outerHeight();
		var bodyHeight = parentHeight - headHeight;
		$(that.panelBody).outerHeight(bodyHeight);
	}, 1000);

	$(this.panelBody).jstreeol3({
		"core" : {
			"map" : options.map ? options.map : undefined,
			"animation" : 0,
			"themes" : {
				"stripes" : true
			},
		},
		"layerproperties" : {
			"properties" : undefined,
			"layerRecord" : undefined,
			"featureRecord" : undefined,
			"style" : undefined,
			"editingTool" : undefined
		},
		"search" : {
			show_only_matches : true
		},
		"legends" : {
			"types" : {
				"#" : {
					"valid_children" : [ "default", "Group", "Vector", "Raster", "ImageTile" ]
				},
				// 편집도구에서 지원할 타입
				"Group" : {
					"icon" : "fa fa-folder-o",
					"valid_children" : [ "default", "Group", "Vector", "Raster", "ImageTile" ]
				},
				// 이외의 기본형
				"default" : {
					"icon" : "fa fa-file-o",
					"valid_children" : []
				},
				"Vector" : {
					"icon" : "fa fa-file-image-o",
					"valid_children" : []
				},
				"Raster" : {
					"icon" : "fa fa-file-image-o",
					"valid_children" : []
				},
				"ImageTile" : {
					"icon" : "fa fa-file-image-o",
					"valid_children" : []
				}
			},
			"geoserver" : {
				"url" : "geoserver/getWMSGetLegendGraphic.ajax",
				"width" : "15",
				"height" : "15",
				"format" : "image/png"
			}
		},
		"functionmarker" : {
			"snapping" : "fa fa-magnet"
		},
		plugins : [ "contextmenu", "dnd", "search", "state", "sort", "visibility", "layerproperties", "legends", "functionmarker" ]
	});
	this.jstree = $(this.panelBody).jstreeol3(true);

};
gb.tree.OpenLayers.prototype = Object.create(gb.tree.OpenLayers.prototype);
gb.tree.OpenLayers.prototype.constructor = gb.tree.OpenLayers;

/**
 * jstree 객체를 반환한다.
 * 
 * @method gb.tree.OpenLayers#getJSTree
 */
gb.tree.OpenLayers.prototype.getJSTree = function() {
	return this.jstree;
};

/**
 * jstree 객체를 설정한다.
 * 
 * @method gb.tree.OpenLayers#setJSTree
 */
gb.tree.OpenLayers.prototype.setJSTree = function(jstree) {
	this.jstree = jstree;
};

/**
 * GeoServer 삭제 확인창을 연다.
 * 
 * @method gb.tree.OpenLayers#openDeleteLayer
 */
gb.tree.OpenLayers.prototype.openDeleteLayer = function(layer) {
	console.log("open delete geoserver");
	var msg1 = $("<div>").text("Are you sure to delete this server?");
	var msg2 = $("<div>").text('"' + layer + '"');
	var body = $("<div>").append(msg1).append(msg2);
	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Cancel").click(function() {
	});
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Delete").click(function() {
	});
	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);
	var modalFooter = $("<div>").addClass("gb-modal-footer").append(buttonArea);
	var deleteModal = new gb.modal.Base({
		"title" : "Delete GeoServer",
		"width" : 540,
		"height" : 400,
		"autoOpen" : false,
		"body" : body
	});
	$(deleteModal.getModal()).append(modalFooter);
	deleteModal.open();
};

/**
 * 목록을 새로고침한다.
 * 
 * @method gb.tree.OpenLayers#refreshList
 */
gb.tree.OpenLayers.prototype.refreshList = function() {
	console.log("refresh");
	this.getJSTree().refresh();
};
/**
 * 레이어 검색창을 연다.
 * 
 * @method gb.tree.OpenLayers#openSearchBar
 */
gb.tree.OpenLayers.prototype.openSearchBar = function() {
	console.log("open search on geoserver");
	$(this.titleArea).css({
		"display" : "none"
	});
	$(this.searchArea).css({
		"display" : "block"
	});
};
/**
 * 레이어 검색창을 닫는다.
 * 
 * @method gb.tree.OpenLayers#closeSearchBar
 */
gb.tree.OpenLayers.prototype.closeSearchBar = function() {
	console.log("close search geoserver");
	$(this.titleArea).css({
		"display" : "block"
	});
	$(this.searchArea).css({
		"display" : "none"
	});
};