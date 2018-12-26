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
 * @param {Object}
 *            url - 요청을 처리할 URL 객체
 * @param {String}
 *            obj.url.getLegend - WMS 범례 이미지를 요청할 URL
 * @author SOYIJUN
 * @date 2018.07.02
 * @version 0.01
 * 
 */
gb.tree.OpenLayers = function(obj) {
	var that = this;
	var options = obj ? obj : {};
	this.append = options.append ? options.append : undefined;
	this.map = options.map instanceof ol.Map ? options.map : undefined;
	this.editingTool = options.editingTool || undefined;
	this.token = options.token || "";
	this.locale = options.locale || "en";

	// edit tool 활성화 여부 객체
	this.isEditing = options.isEditing || undefined;

	this.createdLayer = {};
	var url = options.url;
	this.geometryType = [ "point", "linestring", "polygon", "multipoint", "multilinestring", "multipolygon" ];
	this.translation = {
			"layerCode" : {
				"en" : "Code",
				"ko" : "코드"
			},
			"layerType" : {
				"en" : "Type",
				"ko" : "유형"
			},
			"addLayer" : {
				"en" : "Add layer",
				"ko" : "레이어 추가"
			},
			"exLayerCodeField" : {
				"en" : "Layer code ex) F0010000",
				"ko" : "레이어 코드 예시) F0010000"
			}
	}
	this.getLegend = url.getLegend ? url.getLegend : undefined;
	this.panelTitle = $("<p>").text("Now editing").css({
		"margin" : "0",
		"float" : "left"
	});
	var addIcon = $("<i>").addClass("fas").addClass("fa-plus");
	this.addBtn = $("<button>").addClass("gb-button-clear").append(addIcon).css({
		"float" : "right"
	}).click(function() {
		that.openAddLayer();
	});
	var createGroupIcon = $("<i>").addClass("fas").addClass("fa-folder-open");
	this.createGroupBtn = $("<button>").addClass("gb-button-clear").append(createGroupIcon).css({
		"float" : "right"
	}).click(function() {
		that.createGroupNode();
	});

	var importFileIcon = $("<i>").addClass("far fa-lg").addClass("fa-file-archive");
	this.importFileBtn = $("<button>").addClass("gb-button-clear").append(importFileIcon).css({
		"float" : "right"
	}).click(function() {
		that.createUploadModal();
	});
	var addImgIcon = $("<i>").addClass("far fa-lg").addClass("fa-file-image");
	this.addImgBtn = $("<button>").addClass("gb-button-clear").append(addImgIcon).css({
		"float" : "right"
	}).click(function() {
		that.createImageModal();
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
			this.importFileBtn).append(this.createGroupBtn).append(this.addBtn);

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
		$(that.searchInput).val("");
		that.getJSTree().search("");
		that.closeSearchBar();
	});
	this.searchArea = $("<div>").css({
		"display" : "none"
	}).append(this.searchInput).append(this.closeSearchBtn);
	this.panelHead = $("<div>").addClass("gb-article-head").append(this.titleArea).append(this.searchArea);
	this.panelBody = $("<div>").addClass("gb-article-body").css({
		"overflow-y" : "auto"
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

	$(this.panelBody).jstreeol3(
			{
				"core" : {
					"map" : this.map,
					"animation" : 0,
					"themes" : {
						"stripes" : true
					},
				},
				"layerproperties" : {
					"properties" : undefined,
					"navigator" : new gb.layer.Navigator({
						map : this.map,
						token : this.token
					}),
					"layerRecord" : undefined,
					"featureRecord" : options.frecord,
					"style" : new gb.style.LayerStyle({}),
					"editingTool" : this.editingTool
				},
				"search" : {
					show_only_matches : true
				},
				"legends" : {
					"types" : {
						"#" : {
							"valid_children" : [ "default", "Group", "Raster", "ImageTile", "Polygon", "MultiPolygon", "LineString",
								"MultiLineString", "Point", "MultiPoint" ]
						},
						// 편집도구에서 지원할 타입
						"Group" : {
							"icon" : "far fa-folder",
							"valid_children" : [ "default", "Group", "Raster", "ImageTile", "Polygon", "MultiPolygon", "LineString",
								"MultiLineString", "Point", "MultiPoint" ]
						},
						// 이외의 기본형
						"default" : {
							"icon" : "fas fa-file",
							"valid_children" : []
						},
						"Raster" : {
							"icon" : "fas fa-file-image",
							"valid_children" : []
						},
						"ImageTile" : {
							"icon" : "fas fa-file-image",
							"valid_children" : []
						},
						"Polygon" : {
							"icon" : "gb-icon"
						},
						"MultiPolygon" : {
							"icon" : "gb-icon"
						},
						"LineString" : {
							"icon" : "gb-icon"
						},
						"MultiLineString" : {
							"icon" : "gb-icon"
						},
						"Point" : {
							"icon" : "gb-icon"
						},
						"MultiPoint" : {
							"icon" : "gb-icon"
						}
					},
					"geoserver" : {
						"url" : this.getLegend,
						"width" : "15",
						"height" : "15",
						"format" : "image/png"
					}
				},
				"functionmarker" : {
					"snapping" : "fas fa-magnet",
					"editing" : "fas fa-pencil-alt"
				},
				"contextmenu" : {
					items : function(o, cb) { // Could be an object
						return {
							/**
							 * 다른 노드간 이동이 가능할때 그룹레이어 생성
							 * 
							 * @author 소이준
							 */
							/*
							 * "group" : { "separator_before" : false,
							 * "separator_after" : true, "_disabled" : false, //
							 * (this.check("create_node", // data.reference, {}, //
							 * "last")), "label" : "Create group", "action" :
							 * function(data) { var inst = $.jstreeol3
							 * .reference(data.reference), obj = inst
							 * .get_node(data.reference); inst.create_group(obj,
							 * {}, "first", function( new_node) {
							 * setTimeout(function() { inst.edit(new_node); },
							 * 0); }); } }, "create" : { "separator_before" :
							 * false, "separator_after" : true, "_disabled" :
							 * false, // (this.check("create_node", //
							 * data.reference, {}, // "last")), "label" :
							 * "Create", "action" : function(data) { var inst =
							 * $.jstreeol3 .reference(data.reference), obj =
							 * inst .get_node(data.reference);
							 * inst.create_node(obj, {}, "last", function(
							 * new_node) { setTimeout(function() {
							 * inst.edit(new_node); }, 0); }); } },
							 */
							"zoom" : {
								"separator_before" : false,
								"icon" : "fa fa-crosshairs",
								"separator_after" : false,
								"_disabled" : false, // (this.check("rename_node",
								// data.reference,
								// this.get_parent(data.reference),
								// "")),
								"label" : "Zoom",
								/*
								 * ! "shortcut" : 113, "shortcut_label" : 'F2',
								 * "icon" : "glyphicon glyphicon-leaf",
								 */
								"action" : function(data) {
									var inst = $.jstreeol3
									.reference(data.reference), obj = inst
									.get_node(data.reference);
									var layer = inst.get_LayerById(obj.id);
									if(layer instanceof ol.layer.Image){
										layer = layer.get("vectorLayer");
									}
									var extent = ol.extent.createEmpty();
									// inst._data.layerproperties.editingTool.zoomToFit(layer);
									// inst._data.layerproperties.editingTool.setWMSSource(layer,
									var wholeExt = inst.zoom_to_fit(layer, extent);
									var view = inst._data.core.map.getView();
									view.fit(wholeExt, inst._data.core.map.getSize());
								}
							},
							// "rename" : {
							// "separator_before" : false,
							// "icon" : "fa fa-pencil",
							// "separator_after" : false,
							// "_disabled" : false, //
							// (this.check("rename_node",
							// // data.reference,
							// // this.get_parent(data.reference),
							// // "")),
							// "label" : "Rename",
							// /*
							// * ! "shortcut" : 113, "shortcut_label" : 'F2',
							// * "icon" : "glyphicon glyphicon-leaf",
							// */
							// "action" : function(data) {
							// var inst = $.jstreeol3.reference(data.reference),
							// obj
							// = inst.get_node(data.reference);
							// inst.edit(obj);
							// }
							// },
							"snap" : {
								"separator_before" : false,
								"icon" : "fa fa-magnet",
								"separator_after" : false,
								"_disabled" : false, // (this.check("delete_node",
								// data.reference,
								// this.get_parent(data.reference),
								// "")),
								"label" : "Snap",
								"action" : function(data) {
									console.log(data);
									var inst = $.jstreeol3
									.reference(data.reference), obj = inst
									.get_node(data.reference);
									var layers = inst.get_selected();
									for (var i = 0; i < layers.length; i++) {
										var node = inst.get_node(layers[i]);
										var layer = inst.get_LayerById(layers[i]);
										if (node.state["snapping"] === false) {
											var succ = inst._data.layerproperties.editingTool
											.addSnappingLayer(layer);
											if (succ) {
												inst.set_flag(node, "snapping",
														true);
											}
											console.log(layer);
										} else {
											var succ = inst._data.layerproperties.editingTool
											.removeSnappingLayer(layer);
											if (succ) {
												inst.set_flag(node, "snapping",
														false);
											}
										}
									}

									var ext = 
										inst._data.layerproperties.editingTool
										.getMap()
										.getView()
										.calculateExtent(
												inst._data.layerproperties.editingTool
												.getMap().getSize());

									inst._data.layerproperties.editingTool
									.loadSnappingLayer(ext);
								}
							},
							"remove" : {
								"separator_before" : false,
								"icon" : "fa fa-trash",
								"separator_after" : false,
								"_disabled" : false, // (this.check("delete_node",
								// data.reference,
								// this.get_parent(data.reference),
								// "")),
								"label" : "Delete",
								"action" : function(data) {
									var inst = $.jstreeol3
									.reference(data.reference), obj = inst
									.get_node(data.reference);
									var layers = inst.get_selected();
									var map = inst._data.core.map;
									var isEdit = gb? (gb.module ? gb.module.isEditing : undefined) : undefined;
									
									if(isEdit instanceof Object){
										if(isEdit.get()){
											isEdit.alert();
											return
										}
									}
									var nodes = [];
									for (var i = 0; i < layers.length; i++) {
										var node = inst.get_node(layers[i]);
										if (node !== undefined) {
											nodes.push(node);
										}
									}
									that.openDeleteLayer(nodes);
// var msg1 = $("<div>").text("Are you sure to delete these layers?").css({
// "text-align" : "center",
// "font-size" : "16px"
// });
// var body = $("<div>").append(msg1);
// var closeBtn = $("<button>").css({
// "float" : "right"
// }).addClass("gb-button").addClass("gb-button-default").text("Cancel");
// var okBtn = $("<button>").css({
// "float" : "right"
// }).addClass("gb-button").addClass("gb-button-primary").text("Delete");
// var buttonArea =
// $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);
// var deleteModal = new gb.modal.Base({
// "title" : "Delete Layer",
// "width" : 310,
// "height" : 200,
// "autoOpen" : false,
// "body" : body,
// "footer" : buttonArea
// });
//
// $(closeBtn).click(function() {
// deleteModal.close();
// });
//
// $(okBtn).click(function() {
// if (inst.is_selected(obj)) {
// var layers = inst.get_selected();
// for (var i = 0; i < layers.length; i++) {
// map.removeLayer(inst.get_LayerById(layers[i]));
// }
// inst.delete_node(layers);
// }
// deleteModal.close();
// });
//
// deleteModal.open();
								}
							},
							// "ccp" : {
							// "separator_before" : true,
							// "icon" : false,
							// "separator_after" : false,
							// "label" : "Edit",
							// "action" : false,
							// "submenu" : {
							// "cut" : {
							// "separator_before" : false,
							// "separator_after" : false,
							// "label" : "Cut",
							// "action" : function(data) {
							// var inst = $.jstreeol3.reference(data.reference),
							// obj
							// = inst
							// .get_node(data.reference);
							// if (inst.is_selected(obj)) {
							// inst.cut(inst.get_top_selected());
							// } else {
							// inst.cut(obj);
							// }
							// }
							// },
							// "paste" : {
							// "separator_before" : false,
							// "icon" : false,
							// "_disabled" : function(data) {
							// return
							// !$.jstreeol3.reference(data.reference).can_paste();
							// },
							// "separator_after" : false,
							// "label" : "Paste",
							// "action" : function(data) {
							// var inst = $.jstreeol3.reference(data.reference),
							// obj
							// = inst
							// .get_node(data.reference);
							// inst.paste(obj);
							// }
							// }
							// }
							// },
							/*
							 * "properties" : { "separator_before" : false,
							 * "icon" : "fa fa-info-circle", "separator_after" :
							 * false, "_disabled" : false, //
							 * (this.check("delete_node", // data.reference, //
							 * this.get_parent(data.reference), // "")), "label" :
							 * "Properties", "action" : function(data) { var
							 * inst = $.jstreeol3 .reference(data.reference),
							 * obj = inst .get_node(data.reference); if
							 * (inst.is_selected(obj)) { //
							 * inst.delete_node_layer(inst.get_selected()); var
							 * layer = inst.get_LayerById(obj.id);
							 * console.log(layer); } else { //
							 * inst.delete_node_layer(obj); } } },
							 */
							"style" : {
								"separator_before" : false,
								"icon" : "fa fa-paint-brush",
								"separator_after" : false,
								"_disabled" : false, // (this.check("delete_node",
								// data.reference,
								// this.get_parent(data.reference),
								// "")),
								"label" : "Style",
								"action" : function(data) {
									var inst = $.jstreeol3
									.reference(data.reference), obj = inst
									.get_node(data.reference);
									if (inst.is_selected(obj)) {
										var layers = inst.get_selected();
										for (var i = 0; i < layers.length; i++) {
											inst._data.layerproperties.style.setLayer(inst.get_LayerById(layers[i]));
											inst._data.layerproperties.style.setLegend(obj, inst.settings.legends.geoserver);
											inst._data.layerproperties.style.open();
										}
									} else {
										// inst.delete_node_layer(obj);
									}
								}
							},
							"navigator" : {
								"separator_before" : false,
								"icon" : "fa fa-compass",
								"separator_after" : false,
								"_disabled" : false,
								"label" : "Navigator",
								"action" : function(data) {
									var inst = $.jstreeol3.reference(data.reference),
									obj = inst.get_node(data.reference);
									if (inst.is_selected(obj)) {
										var layer = inst.get_LayerById(obj.id);

										inst._data.layerproperties.navigator
										.setFeatures(layer);
									} else {
										// inst.delete_node_layer(obj);
									}
								}
							}
						}
					}
				},
				plugins : [ "contextmenu", "dnd", "search", "state", "sort", "visibility", "layerproperties", "legends", "functionmarker" ]
			});
	this.jstree = $(this.panelBody).jstreeol3(true);
};
gb.tree.OpenLayers.prototype = Object.create(gb.tree.OpenLayers.prototype);
gb.tree.OpenLayers.prototype.constructor = gb.tree.OpenLayers;

/**
 * jstree가 적용된 jquery 객체를 반환한다.
 * 
 * @method gb.tree.OpenLayers#getJSTreeElement
 */
gb.tree.OpenLayers.prototype.getJSTreeElement = function() {
	return $(this.panelBody);
};

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
 * EditingTool 객체를 설정한다.
 * 
 * @method gb.tree.OpenLayers#setEditingTool
 */
gb.tree.OpenLayers.prototype.setEditingTool = function(param) {
	this.jstree._data.layerproperties.editingTool = param;
};

/**
 * Tree에 Group Node를 생성한다.
 * 
 * @method gb.tree.OpenLayers#createGroupNode
 */
gb.tree.OpenLayers.prototype.createGroupNode = function() {
	var tree = this.jstree;

	tree.create_group("#", {}, "first", function(new_node) {
		setTimeout(function() {
			tree.edit(new_node);
		}, 0);
	});
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

/**
 * Layer 생성창을 연다.
 * 
 * @method gb.tree.OpenLayers#openAddLayer
 */
gb.tree.OpenLayers.prototype.openAddLayer = function() {
	var that = this;

	var col1 = $("<div>").addClass("col-md-2").append(this.translation.layerCode[this.locale]);
	var codeInput = $("<input>").attr({
		"type" : "text",
		"placeholder" : this.translation.exLayerCodeField[this.locale]
	}).addClass("form-control").addClass("gb-layerdefinition-input-layercode");

	var col2 = $("<div>").addClass("col-md-10").append(codeInput);
	var row1 = $("<div>").addClass("row").append(col1).append(col2).css({
		"margin-bottom" : "15px"
	});

	var col3 = $("<div>").addClass("col-md-2").text(this.translation.layerType[this.locale]);
	var geomSelect = $("<select>").addClass("form-control").addClass("gb-layerdefinition-select-geometry");
	for (var i = 0; i < this.geometryType.length; i++) {
		var option = $("<option>").text(this.geometryType[i].toUpperCase()).attr("value", this.geometryType[i]);
		if (i === 0) {
			$(option).attr("selected", "selected");
		}
		$(geomSelect).append(option);
	}
	var col4 = $("<div>").addClass("col-md-10").append(geomSelect);
	var row2 = $("<div>").addClass("row").append(col3).append(col4).css({
		"margin-bottom" : "15px"
	});

	var col5 = $("<div>").addClass("col-md-2").text("Attribute");
	var col6 = gb.tree.OpenLayers.getAttrForm().addClass("col-md-10");
	var row3 = $("<div>").addClass("row").append(col5).append(col6);

	var well = $("<div>").addClass("well").append(row1).append(row2).append(row3);

	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Close");
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Add");

	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);
	var modalFooter = $("<div>").append(buttonArea);

	var gBody = $("<div>").append(well).css({
		"display" : "table",
		"width" : "100%"
	});
	var addGeoServerModal = new gb.modal.Base({
		"title" : this.translation.addLayer[this.locale],
		"width" : 540,
		"autoOpen" : true,
		"body" : gBody,
		"footer" : modalFooter
	});

	addGeoServerModal.modalBody.css({
		"max-height" : "500px",
		"overflow" : "auto"
	});

	addGeoServerModal.modalFooter.css({
		"position" : "relative"
	});

	$(closeBtn).click(function() {
		addGeoServerModal.close();
	});
	
	$(okBtn).click(
		function() {
			var geoType = { 
				"point": "Point", 
				"linestring": "LineString", 
				"polygon": "Polygon", 
				"multipoint": "MultiPoint",
				"multilinestring": "MultiLineString", 
				"multipolygon": "MultiPolygon"
			};
			
			var vectorLayer = new ol.layer.Vector({
				renderMode : "image",
				source : new ol.source.Vector({})
			});
			
			var type = geomSelect.find("option:selected").val();
			
			var attributes = [],
				bool = true,
				attribute;
			
			$(".type-form-body").children().each(function(){
				if(!$(this).children().eq(0).find("input:text").val()){
					bool = false;
				}
				attribute = new gb.layer.Attribute({
					originFieldName : $(this).children().eq(0).find("input:text").val().replace(/(\s*)/g, ''),
					fieldName : $(this).children().eq(0).find("input:text").val().replace(/(\s*)/g, ''),
					type : $(this).children().eq(1).find("select").val(),
					decimal : $(this).children().eq(1).find("select").val() === "Double" ? 30 : null,
					size : 256,
					isUnique : $(this).children().eq(3).find("input:checkbox").prop("checked") ? true : false,
					nullable : $(this).children().eq(2).find("input:checkbox").prop("checked") ? false : true,
					isNew : true
				});
				attributes.push(attribute);
			});
			
			if(!bool){
				alert("속성값 이름을 입력해주세요!");
				return;
			}
			
			var gitLayer = {
				"editable" : true,
				"geometry" : geoType[type],
				"validation" : false,
				"attribute" : attributes
			};
			vectorLayer.set("git", gitLayer);
			
			if(!codeInput.val()){
				alert("Layer 이름을 입력해주세요!");
				return;
			}
			
			vectorLayer.set("name", codeInput.val());
			that.map.addLayer(vectorLayer);
			that.refreshList();
			addGeoServerModal.close();
		}
	);
};

gb.tree.OpenLayers.getAttrForm = function() {
	var htd1 = $("<td>").text("Name");
	var htd2 = $("<td>").text("Type");
	var htd3 = $("<td>").text("Not Null");
	var htd4 = $("<td>").text("Unique");
	var htd5 = $("<td>");
	var thd = $("<thead>").append(htd1).append(htd2).append(htd3).append(htd4).append(htd5);

	/*
	 * var key = $("<input>").addClass("form-control").attr({ "type" : "text"
	 * }); var td1 = $("<td>").append(key);
	 * 
	 * var opt1 = $("<option>").text("Integer"); var opt2 = $("<option>").text("Double");
	 * var opt3 = $("<option>").text("String"); var opt4 = $("<option>").text("Date");
	 * var opt5 = $("<option>").text("Boolean"); var type = $("<select>").addClass("form-control").append(opt1).append(opt2).append(opt3).append(opt4).append(opt5);
	 * var td2 = $("<td>").append(type);
	 * 
	 * var nullable = $("<input>").attr({ "type" : "checkbox" }); var td3 = $("<td>").append(nullable);
	 * 
	 * var unique = $("<input>").attr({ "type" : "checkbox" }); var td4 = $("<td>").append(unique);
	 * 
	 * var trash = $("<a href='#'>").append($("<i>").addClass("far
	 * fa-trash-alt")); trash.click(function() {
	 * $(this).parent().parent().remove(); }); var td5 = $("<td>").append(trash);
	 * 
	 * var tr1 = $("<tr>").append(td1).append(td2).append(td3).append(td4).append(td5);
	 */
	var typeFormBody = $("<tbody>").addClass("type-form-body");

	var table = $("<table>").addClass("table").addClass("text-center").append(thd).append(typeFormBody);
	var addBtn = $("<input>").addClass("gitbuilder-createlayer-addattr").addClass("btn").addClass("btn-default").attr({
		"type" : "button",
		"value" : "Add Attribute"
	}).on("click", function() {
		var key = $("<input>").addClass("form-control").attr({
			"type" : "text"
		});
		var td1 = $("<td>").append(key);

		var opt1 = $("<option>").text("Integer");
		var opt2 = $("<option>").text("Double");
		var opt3 = $("<option>").text("String");
		var opt4 = $("<option>").text("Date");
		var opt5 = $("<option>").text("Boolean");
		var type = $("<select>").addClass("form-control").append(opt1).append(opt2).append(opt3).append(opt4).append(opt5);
		var td2 = $("<td>").append(type);

		var nullable = $("<input>").attr({
			"type" : "checkbox"
		});
		var td3 = $("<td>").append(nullable);

		var unique = $("<input>").attr({
			"type" : "checkbox"
		});
		var td4 = $("<td>").append(unique);

		var trash = $("<a href='#'>").append($("<i>").addClass("far fa-trash-alt"));
		trash.click(function() {
			$(this).parent().parent().remove();
		});
		var td5 = $("<td>").append(trash);

		var tr1 = $("<tr>").append(td1).append(td2).append(td3).append(td4).append(td5);
		$(".type-form-body").append(tr1);
	});

	return $("<div>").append(table).append(addBtn);
};

/**
 * Shp file 업로드창을 생성한다.
 * 
 * @method gb.tree.OpenLayers#createUploadModal
 */
gb.tree.OpenLayers.prototype.createUploadModal = function() {
	var that = this;

	var file;

	// 파일 선택 input
	var fileSelect = $("<input type='file' id='layer_shp_file' accept='.zip'>").change(function() {
		if (!!this.files) {
			file = this.files[0];
			if (file.size > 0) {
				fileInfo.text(file.name + ' , ' + file.size + ' kb');
			}
		}
	});

	var uploadBtn = $("<button type='button'>").addClass("btn btn-primary btn-lg btn-block").text("Upload zip file").mouseenter(function() {
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
		"border-color" : "transparent"
	});

	var fileInfo = $("<div role='alert'>").addClass("alert alert-light").css({
		"text-align" : "center"
	});

	/*
	 * var epsg = $("<div>").addClass("col-md-2").append("EPSG"); var epsgInput =
	 * $("<input>").attr({ "type" : "text", "placeholder" : "Default: 4326"
	 * }).addClass("form-control");
	 * 
	 * var col1 = $("<div>").addClass("col-md-10").append(epsgInput); var row1 =
	 * $("<div>").addClass("row").append(epsg).append(col1).css({
	 * "margin-bottom" : "15px" });
	 */

	var encode = $("<div>").addClass("col-md-2").append("Encoding");
	var encodeInput = $("<input>").attr({
		"type" : "text",
		"placeholder" : "Set your desired encoding UTF-8, Big5, Big5-HKSCS ..."
	}).addClass("form-control");

	var col2 = $("<div>").addClass("col-md-10").append(encodeInput);
	var row2 = $("<div>").addClass("row").append(encode).append(col2);

	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Close");
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Add");

	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);
	var modalFooter = $("<div>").append(buttonArea);

	var gBody = $("<div>").append(uploadBtn).append(fileInfo).append(row2).css({
		"display" : "table",
		"width" : "100%"
	});

	var addGeoServerModal = new gb.modal.Base({
		"title" : this.translation.addLayer[this.locale],
		"width" : 540,
		"height" : 280,
		"autoOpen" : true,
		"body" : gBody,
		"footer" : modalFooter
	});
	$(closeBtn).click(function() {
		addGeoServerModal.close();
	});
	$(okBtn).click(function() {
		var callback = function(){
			that.refreshList();
		};
		that.loadShpZip(encodeInput.val(), file, that.map, callback);
		addGeoServerModal.close();
	});
};

gb.tree.OpenLayers.prototype.loadShpZip = function(encode, file, map, callback) {
	var epsg = epsg || 4326;
	var encode = encode || "EUC-KR";
	var fileL = file;
	if (fileL.name.split(".")[1] === "zip") {

		loadshp({
			url : fileL,
			encoding : encode
		}, function(geojson) {
			console.log(geojson);
			var features = (new ol.format.GeoJSON()).readFeatures(geojson);
			
			if (!!features.length) {
				var lname = fileL.name.split(".")[0];
				for (var i = 0; i < features.length; i++) {
					features[i].setId(lname+"."+i);
				}
				console.log(features);
				var vectorLayer = new ol.layer.Vector({
					renderMode: 'image',
					source : new ol.source.Vector({
						features : features
					})
				});
				var ftype;
				if (features.length > 0) {
					 ftype = features[0].getGeometry().getType();
				}
				var gitLayer = {
						"editable" : true,
						"geometry" : ftype,
						"validation" : false
				};
				vectorLayer.set("git", gitLayer);
				vectorLayer.set("name", fileL.name);
				vectorLayer.set("id", "shp:"+fileL.name);
				
				map.addLayer(vectorLayer);
				map.getView().fit(geojson.bbox, map.getSize());
				callback();
			}
		});
	}
}

/**
 * Image file 업로드창을 생성한다.
 * 
 * @method gb.tree.OpenLayers#createImageModal
 */
gb.tree.OpenLayers.prototype.createImageModal = function() {
	var that = this;

	var file, result, imageInfo, readerInfo;

	// 파일 선택 input
	var fileSelect = $("<input type='file' accept='image/*'>").change(function() {
		if (!!this.files) {
			file = this.files[0];
			if (file.size > 0) {
				fileInfo.text(file.name + ' , ' + file.size + ' kb');
				var reader = new FileReader();
				reader.onload = function() {
					var output = document.getElementById('imagePreview');
					var image = new Image();

					output.src = reader.result;

					image.src = reader.result;
					image.onload = function() {
						imageInfo = image;
						readerInfo = reader;
					}
				}
				reader.readAsDataURL(file);
			}
		}
	});

	// Iamge preview
	var preview = $("<img id='imagePreview' height='218' width='518'>");

	var uploadBtn = $("<button type='button'>").addClass("btn btn-primary btn-lg btn-block").text("Upload Image").mouseenter(function() {
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
		"border-color" : "transparent"
	});

	var fileInfo = $("<div role='alert'>").addClass("alert alert-light").css({
		"text-align" : "center"
	});

	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Close");
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Add").click(function() {
		new gb.layer.ImageLayer({
			map : that.map,
			url : readerInfo.result,
			width : imageInfo.width,
			height : imageInfo.height,
			title : file.name,
			jstree: that.jstree
		});
	});

	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);
	var modalFooter = $("<div>").append(buttonArea);

	var gBody = $("<div>").append(uploadBtn).append(fileInfo).append(preview).css({
		"display" : "table",
		"width" : "100%"
	});

	var addGeoServerModal = new gb.modal.Base({
		"title" : this.translation.addLayer[this.locale],
		"width" : 540,
		"height" : 460,
		"autoOpen" : true,
		"body" : gBody,
		"footer" : modalFooter
	});

	$(closeBtn).click(function() {
		addGeoServerModal.close();
	});

	$(okBtn).click(function() {
		addGeoServerModal.close();
	});
};

/**
 * 레이어 삭제 확인창을 연다.
 * 
 * @method gb.tree.OpenLayers#openDeleteGeoServerLayer
 */
gb.tree.OpenLayers.prototype.openDeleteLayer = function(layer) {
	var that = this;
	console.log("open delete geoserver layer");
	console.log(layer);

	var names = [];
	for (var i = 0; i < layer.length; i++) {
		if (typeof layer[i] === "object") {
			names.push(layer[i].text);
		}
	}
	var todel;
	if (Array.isArray(names)) {
		if (names.length > 1) {
			todel = '"' + names[0] + '" ' + "and " + (names.length - 1) + " more";
		} else {
			todel = '"' + names[0] + '" ';
		}
	}
	var msg1 = $("<div>").css({
		"text-align" : "center",
		"font-size" : "16px"
	});
	if (layer.length > 1) {
		$(msg1).text("Are you sure to delete these layers?")
	} else {
		$(msg1).text("Are you sure to delete this layer?")
	}
	var msg2 = $("<div>").text(todel).css({
		"text-align" : "center",
		"font-size" : "24px",
		"word-break" : "break-word"
	});
	var body = $("<div>").append(msg1).append(msg2);
	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Cancel");
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Delete");
	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);
	var deleteModal = new gb.modal.Base({
		"title" : "Delete Layer",
		"width" : 310,
		"height" : 200,
		"autoOpen" : false,
		"body" : body,
		"footer" : buttonArea
	});
	$(closeBtn).click(function() {
		deleteModal.close();
	});
	$(okBtn).click(function() {
		var callback = function(){
			deleteModal.close();
		};
		that.deleteLayer(layer, callback);
	});
	deleteModal.open();
};

/**
 * 레이어 삭제
 * 
 * @method gb.tree.OpenLayers#deleteLayer
 */
gb.tree.OpenLayers.prototype.deleteLayer = function(layers, callback){
	var that = this;
	if (Array.isArray(layers)) {
		for (var i = 0; i < layers.length; i++) {
			that.getJSTree().delete_node_layer(layers[i].id);
		}
	}
	if (typeof callback === "function") {
		callback();
	}
};