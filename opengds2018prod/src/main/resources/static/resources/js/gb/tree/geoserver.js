/**
 * 지오서버 레이어 목록을 표시한다.
 * 
 * @class gb.tree.GeoServer
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
var gb;
if (!gb)
	gb = {};
if (!gb.tree)
	gb.tree = {};
gb.tree.GeoServer = function(obj) {
	var that = this;
	var options = obj ? obj : {};
	this.panelTitle = $("<p>").text("GeoServer").css({
		"margin" : "0",
		"float" : "left"
	});
	var addIcon = $("<i>").addClass("fas").addClass("fa-plus");
	this.addBtn = $("<button>").addClass("gb-button-clear").append(addIcon).css({
		"float" : "right"
	}).click(function() {
		that.openAddGeoServer();
	});
	var refIcon = $("<i>").addClass("fas").addClass("fa-sync-alt");
	this.refBtn = $("<button>").addClass("gb-button-clear").append(refIcon).css({
		"float" : "right"
	}).click(function() {
		that.refreshGeoServer();
	});
	var searchIcon = $("<i>").addClass("fas").addClass("fa-search");
	this.searchBtn = $("<button>").addClass("gb-button-clear").append(searchIcon).css({
		"float" : "right"
	}).click(function() {
		that.openSearchBar();
	});
	this.titleArea = $("<div>").append(this.panelTitle).append(this.searchBtn).append(this.refBtn).append(this.addBtn);
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
		var bodyHeight = parentHeight - 40;
		$(that.panelBody).outerHeight(bodyHeight);
	});
	$(window).resize(function() {
		var parentHeight = $(that.panel).parent().innerHeight();
		var bodyHeight = parentHeight - 40;
		$(that.panelBody).outerHeight(bodyHeight);
	});
	$(this.panelBody).jstree(
			{
				"core" : {
					"animation" : 0,
					"check_callback" : true,
					"themes" : {
						"stripes" : true
					},
					'data' : {
						'url' : function() {
							return 'geoserver/getGeolayerCollectionTree.ajax?treeType=all';
						}
					}
				},
				"geoserver" : {
					"map" : options.map instanceof ol.Map ? options.map : undefined,
					"user" : "admin",
					"layerInfo" : undefined,
					"layerInfoURL" : "geoserver/getGeoLayerInfoList.ajax",
					"groupLayerInfoURL" : "geoserver/getGeoGroupLayerInfoList.ajax",
					"WMSLayerURL" : "http://175.116.181.42:9990/geoserver/wms",
					"createLayer" : undefined,
					"deleteGroupLayer" : undefined,
					"deleteLayer" : undefined,
					"downloadNGIDXF" : "fileExport/fileExport.ajax",
					"downloadGeoserver" : "geoserver/downloadRequest.do",
					"clientRefer" : undefined
				},
				"search" : {
					show_only_matches : true
				},
				"contextmenu" : {
					items : function(o, cb) { // Could be an object
						// directly
						return {
							"import" : {
								"separator_before" : true,
								"icon" : "fas fa-file-import",
								"separator_after" : true,
								"label" : "Import",
								"action" : false,
								"submenu" : {
									"wms" : {
										"separator_before" : false,
										"icon" : "fa fa-file-image-o",
										"separator_after" : false,
										"label" : "WMS",
										"action" : function(data) {
											var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
											var arr = inst.get_selected();
											var wmsInfo = {
												"refer" : inst,
												"arr" : arr,
												"parent" : inst.get_parent(obj)
											}
											inst.import_image(wmsInfo);
											/*
											 * if (obj.type === "n_ngi_layer_pt" ||
											 * obj.type === "n_ngi_layer_ln" ||
											 * obj.type === "n_ngi_layer_pg" ||
											 * obj.type === "n_ngi_layer_txt") {
											 * var arr = inst.get_selected(); if
											 * (inst.get_node(inst.get_parent(obj)).type
											 * === "n_ngi_group") { var wmsInfo = {
											 * "refer" : inst, "arr" : arr,
											 * "parent" : inst.get_parent(obj) } //
											 * inst.import_fake_image(wmsInfo);
											 * inst.import_fake_image_notload(wmsInfo); } }
											 * else if (obj.type ===
											 * "n_dxf_layer_arc" || obj.type ===
											 * "n_dxf_layer_cir" || obj.type ===
											 * "n_dxf_layer_ins" || obj.type ===
											 * "n_dxf_layer_lpl" || obj.type ===
											 * "n_dxf_layer_pl" || obj.type ===
											 * "n_dxf_layer_txt") { var arr =
											 * inst.get_selected(); if
											 * (inst.get_node(inst.get_parent(obj)).type
											 * === "n_dxf_group") { var wmsInfo = {
											 * "refer" : inst, "arr" : arr,
											 * "parent" : inst.get_parent(obj) } //
											 * inst.import_fake_image(wmsInfo);
											 * inst.import_fake_image_notload(wmsInfo); } }
											 * else if (obj.type ===
											 * "n_shp_layer_pt" || obj.type ===
											 * "n_shp_layer_ln" || obj.type ===
											 * "n_shp_layer_pg" || obj.type ===
											 * "n_shp_layer_mpt" || obj.type ===
											 * "n_shp_layer_mln" || obj.type ===
											 * "n_shp_layer_mpg") { var arr =
											 * inst.get_selected(); if
											 * (inst.get_node(inst.get_parent(obj)).type
											 * === "n_shp_group") { var wmsInfo = {
											 * "refer" : inst, "arr" : arr,
											 * "parent" : inst.get_parent(obj) } //
											 * inst.import_fake_image(wmsInfo);
											 * inst.import_fake_image_notload(wmsInfo); } }
											 * else if (obj.type ===
											 * "n_ngi_group" || obj.type ===
											 * "n_dxf_group" || obj.type ===
											 * "n_shp_group") { var arr =
											 * inst.get_selected(); // var arr2 =
											 * []; // for (var i = 0; i <
											 * arr.length; // i++) { //
											 * arr2.push(inst.get_node(arr[i]).id); // }
											 * var obj = { "refer" : inst, "arr" :
											 * arr }; //
											 * inst.import_fake_group(obj);
											 * inst.import_fake_group_notload(obj); }
											 */
										}
									},
									"wfs" : {
										"separator_before" : false,
										"icon" : "fa fa-file-excel-o",
										"separator_after" : false,
										"label" : "WFS",
										"_disabled" : true,
										"action" : function(data) {
											var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
											inst.import_vector();
										}
									}
								}
							},
							"export" : {
								"separator_before" : true,
								"icon" : "fas fa-file-export",
								"separator_after" : true,
								"label" : "Export",
								"action" : false,
								"submenu" : {
									"shp" : {
										"separator_before" : true,
										"icon" : "fa fa-file-excel-o",
										"separator_after" : false,
										"label" : "SHP",
										"action" : function(data) {
											var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
											var selected = inst.get_selected();
											var selectedObj = inst.get_selected(true);
											for (var i = 0; i < selectedObj.length; i++) {
												if (selectedObj[i].type === "n_ngi_group" || selectedObj[i].type === "n_dxf_group"
														|| selectedObj[i].type === "n_shp_group") {
													console.error("not support");
													return;
												}
											}
											var arr = {
												"geoLayerList" : selected
											}
											var names = [];
											$.ajax({
												url : inst._data.geoserver.layerInfoURL,
												method : "POST",
												contentType : "application/json; charset=UTF-8",
												cache : false,
												data : JSON.stringify(arr),
												beforeSend : function() { // 호출전실행
													// loadImageShow();
												},
												traditional : true,
												success : function(data, textStatus, jqXHR) {
													var path = inst._data.geoserver.downloadGeoserver;

													var target = "_blank";
													for (var i = 0; i < data.length; i++) {
														var params = {
															"serviceType" : "wfs",
															"version" : "1.0.0",
															"outputformat" : "SHAPE-ZIP",
															"typeName" : data[i].lName
														}
														// var qstr =
														// $.param(params);
														// var url =
														// path+"?"+qstr;
														// console.log(url);
														var form = document.createElement("form");
														form.setAttribute("method", "post");
														form.setAttribute("action", path);
														var keys = Object.keys(params);
														for (var j = 0; j < keys.length; j++) {
															var hiddenField = document.createElement("input");
															hiddenField.setAttribute("type", "hidden");
															hiddenField.setAttribute("name", keys[j]);
															hiddenField.setAttribute("value", params[keys[j]]);
															form.appendChild(hiddenField);
														}
														form.target = target;
														document.body.appendChild(form);
														$(form).submit();
													}
												}
											});

										}
									},
									"gml2" : {
										"separator_before" : false,
										"icon" : "fa fa-file-excel-o",
										"separator_after" : false,
										"label" : "GML2",
										"action" : function(data) {
											var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
											if (obj.type === "n_ngi_group" || obj.type === "n_dxf_group") {
												console.error("not support");
												return;
											}
											var arr = {
												"geoLayerList" : [ obj.id ]
											}
											var names = [];
											$.ajax({
												url : inst._data.geoserver.layerInfoURL,
												method : "POST",
												contentType : "application/json; charset=UTF-8",
												cache : false,
												data : JSON.stringify(arr),
												beforeSend : function() { // 호출전실행
													// loadImageShow();
												},
												traditional : true,
												success : function(data, textStatus, jqXHR) {
													var path = inst._data.geoserver.downloadGeoserver;
													var target = "_blank";
													for (var i = 0; i < data.length; i++) {
														var params = {
															"serviceType" : "wfs",
															"version" : "1.0.0",
															"outputformat" : "gml2",
															"typeName" : data[i].lName
														}
														var form = document.createElement("form");
														form.setAttribute("method", "post");
														form.setAttribute("action", path);
														var keys = Object.keys(params);
														for (var j = 0; j < keys.length; j++) {
															var hiddenField = document.createElement("input");
															hiddenField.setAttribute("type", "hidden");
															hiddenField.setAttribute("name", keys[j]);
															hiddenField.setAttribute("value", params[keys[j]]);
															form.appendChild(hiddenField);
														}
														form.target = target;
														document.body.appendChild(form);
														form.submit();
													}
												}
											});
										}
									},
									"gml3" : {
										"separator_before" : false,
										"icon" : "fa fa-file-excel-o",
										"separator_after" : false,
										"label" : "GML3",
										"action" : function(data) {
											var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
											if (obj.type === "n_ngi_group" || obj.type === "n_dxf_group") {
												console.error("not support");
												return;
											}
											var arr = {
												"geoLayerList" : [ obj.id ]
											}
											var names = [];
											$.ajax({
												url : inst._data.geoserver.layerInfoURL,
												method : "POST",
												contentType : "application/json; charset=UTF-8",
												cache : false,
												data : JSON.stringify(arr),
												beforeSend : function() { // 호출전실행
													// loadImageShow();
												},
												traditional : true,
												success : function(data, textStatus, jqXHR) {
													var path = inst._data.geoserver.downloadGeoserver;
													var target = "_blank";
													for (var i = 0; i < data.length; i++) {
														var params = {
															"serviceType" : "wfs",
															"version" : "1.0.0",
															"outputformat" : "gml3",
															"typeName" : data[i].lName
														}
														var form = document.createElement("form");
														form.setAttribute("method", "post");
														form.setAttribute("action", path);
														var keys = Object.keys(params);
														for (var j = 0; j < keys.length; j++) {
															var hiddenField = document.createElement("input");
															hiddenField.setAttribute("type", "hidden");
															hiddenField.setAttribute("name", keys[j]);
															hiddenField.setAttribute("value", params[keys[j]]);
															form.appendChild(hiddenField);
														}
														form.target = target;
														document.body.appendChild(form);
														form.submit();
													}
												}
											});
										}
									},
									"json" : {
										"separator_before" : false,
										"icon" : "fa fa-file-excel-o",
										"separator_after" : false,
										"label" : "JSON",
										"action" : function(data) {
											var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
											if (obj.type === "n_ngi_group" || obj.type === "n_dxf_group") {
												console.error("not support");
												return;
											}
											var arr = {
												"geoLayerList" : [ obj.id ]
											}
											var names = [];
											$.ajax({
												url : inst._data.geoserver.layerInfoURL,
												method : "POST",
												contentType : "application/json; charset=UTF-8",
												cache : false,
												data : JSON.stringify(arr),
												beforeSend : function() { // 호출전실행
													// loadImageShow();
												},
												traditional : true,
												success : function(data, textStatus, jqXHR) {
													var path = inst._data.geoserver.downloadGeoserver;
													var target = "_blank";
													for (var i = 0; i < data.length; i++) {
														var params = {
															"serviceType" : "wfs",
															"version" : "1.0.0",
															"outputformat" : "json",
															"typeName" : data[i].lName
														}
														var form = document.createElement("form");
														form.setAttribute("method", "post");
														form.setAttribute("action", path);
														var keys = Object.keys(params);
														for (var j = 0; j < keys.length; j++) {
															var hiddenField = document.createElement("input");
															hiddenField.setAttribute("type", "hidden");
															hiddenField.setAttribute("name", keys[j]);
															hiddenField.setAttribute("value", params[keys[j]]);
															form.appendChild(hiddenField);
														}
														form.target = target;
														document.body.appendChild(form);
														form.submit();
													}
												}
											});
										}
									},
									"csv" : {
										"separator_before" : false,
										"icon" : "fa fa-file-excel-o",
										"separator_after" : false,
										"label" : "CSV",
										"action" : function(data) {
											var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
											if (obj.type === "n_ngi_group" || obj.type === "n_dxf_group") {
												console.error("not support");
												return;
											}
											var arr = {
												"geoLayerList" : [ obj.id ]
											}
											var names = [];
											$.ajax({
												url : inst._data.geoserver.layerInfoURL,
												method : "POST",
												contentType : "application/json; charset=UTF-8",
												cache : false,
												data : JSON.stringify(arr),
												beforeSend : function() { // 호출전실행
													// loadImageShow();
												},
												traditional : true,
												success : function(data, textStatus, jqXHR) {
													var path = inst._data.geoserver.downloadGeoserver;
													console.log(path);
													var target = "_blank";
													for (var i = 0; i < data.length; i++) {
														var params = {
															"serviceType" : "wfs",
															"version" : "1.0.0",
															"outputformat" : "csv",
															"typeName" : data[i].lName
														}
														var form = document.createElement("form");
														form.setAttribute("method", "post");
														form.setAttribute("action", path);
														var keys = Object.keys(params);
														for (var j = 0; j < keys.length; j++) {
															var hiddenField = document.createElement("input");
															hiddenField.setAttribute("type", "hidden");
															hiddenField.setAttribute("name", keys[j]);
															hiddenField.setAttribute("value", params[keys[j]]);
															form.appendChild(hiddenField);
														}
														form.target = target;
														document.body.appendChild(form);
														form.submit();
													}
												}
											});
										}
									},
									"png" : {
										"separator_before" : true,
										"icon" : "fa fa-file-excel-o",
										"separator_after" : false,
										"label" : "PNG",
										"action" : function(data) {
											var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
											if (obj.type === "n_ngi_group" || obj.type === "n_dxf_group") {
												console.error("not support");
												return;
											}
											var arr = {
												"geoLayerList" : [ obj.id ]
											}
											var names = [];
											$.ajax({
												url : inst._data.geoserver.layerInfoURL,
												method : "POST",
												contentType : "application/json; charset=UTF-8",
												cache : false,
												data : JSON.stringify(arr),
												beforeSend : function() { // 호출전실행
													// loadImageShow();
												},
												traditional : true,
												success : function(data, textStatus, jqXHR) {
													console.log(data);
													var path = inst._data.geoserver.downloadGeoserver;
													console.log(path);
													var target = "_blank";
													for (var i = 0; i < data.length; i++) {
														var params = {
															"serviceType" : "wms",
															"version" : "1.1.0",
															"format" : "image/png",
															"crs" : data[i].srs,
															"bbox" : [ data[i].nbBox.minx, data[i].nbBox.miny, data[i].nbBox.maxx,
																	data[i].nbBox.maxy ],
															"layers" : data[i].lName,
															"width" : 1024,
															"height" : 768
														}
														var form = document.createElement("form");
														form.setAttribute("method", "post");
														form.setAttribute("action", path);
														var keys = Object.keys(params);
														for (var j = 0; j < keys.length; j++) {
															var hiddenField = document.createElement("input");
															hiddenField.setAttribute("type", "hidden");
															hiddenField.setAttribute("name", keys[j]);
															hiddenField.setAttribute("value", params[keys[j]]);
															form.appendChild(hiddenField);
														}
														form.target = target;
														document.body.appendChild(form);
														form.submit();
													}
												}
											});
										}
									}
								}
							},
							"delete" : {
								"separator_before" : false,
								"icon" : "fa fa-trash",
								"separator_after" : false,
								"_disabled" : false, // (this.check("rename_node",
								// data.reference,
								// this.get_parent(data.reference),
								// "")),
								"label" : "Delete",
								/*
								 * ! "shortcut" : 113, "shortcut_label" : 'F2',
								 * "icon" : "glyphicon glyphicon-leaf",
								 */
								"action" : function(data) {
									var inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference);
									if (obj.type === "default") {
										that.openDeleteGeoServer(obj.id);
									}
									/*
									 * var getPosition = function(str,
									 * subString, index) { return
									 * str.split(subString,
									 * index).join(subString).length; } var arr =
									 * inst.get_selected(); var
									 * sameGroupParentDXF = {}; var
									 * sameGroupParentNGI = {}; var
									 * sameGroupParentSHP = {}; var sameParent =
									 * []; var editingtCheck = []; for (var i =
									 * 0; i < arr.length; i++) { var node =
									 * inst.get_node(arr[i]); var parent =
									 * inst.get_node(node.parent); if
									 * (parent.type === "n_ngi_group") { if
									 * (!sameGroupParentNGI.hasOwnProperty(parent.id)) {
									 * sameGroupParentNGI[parent.id] = {}; }
									 * sameGroupParentNGI[parent.id][node.id] =
									 * node; editingtCheck.push(node.id); } else
									 * if (parent.type === "n_dxf_group") { if
									 * (!sameGroupParentDXF.hasOwnProperty(parent.id)) {
									 * sameGroupParentDXF[parent.id] = {}; }
									 * sameGroupParentDXF[parent.id][node.id] =
									 * node; editingtCheck.push(node.id); } else
									 * if (parent.type === "n_shp_group") { if
									 * (!sameGroupParentSHP.hasOwnProperty(parent.id)) {
									 * sameGroupParentSHP[parent.id] = {}; }
									 * sameGroupParentSHP[parent.id][node.id] =
									 * node; editingtCheck.push(node.id); } else
									 * if (parent.type === "n_ngi") { var
									 * children = node.children; editingtCheck =
									 * children.concat(children); var substr =
									 * []; for (var i = 0; i < children.length;
									 * i++) { var position =
									 * getPosition(children[i], "_", 3);
									 * substr.push(node.children[i].substring(position +
									 * 1)); }
									 * inst._data.geoserver.deleteLayer.addStructure("ngi",
									 * node.text, "all", substr); } else if
									 * (parent.type === "n_dxf") { var children =
									 * node.children; editingtCheck =
									 * children.concat(children); var substr =
									 * []; for (var i = 0; i < children.length;
									 * i++) { var position =
									 * getPosition(children[i], "_", 3);
									 * substr.push(node.children[i].substring(position +
									 * 1)); }
									 * inst._data.geoserver.deleteLayer.addStructure("dxf",
									 * node.text, "all", substr); } else if
									 * (parent.type === "n_shp") { var children =
									 * node.children; editingtCheck =
									 * children.concat(children); var substr =
									 * []; for (var i = 0; i < children.length;
									 * i++) { var position =
									 * getPosition(children[i], "_", 3);
									 * substr.push(node.children[i].substring(position +
									 * 1)); }
									 * inst._data.geoserver.deleteLayer.addStructure("shp",
									 * node.text, "all", substr); } // else if
									 * (parent.type === // "n_shp" || //
									 * parent.type === "e_ngi" || // parent.type //
									 * === "e_dxf" // || parent.type ===
									 * "e_shp") { // sameParent.push(node); // } }
									 */

									// if (sameParent.length > 0) {
									// var part = [];
									// for (var j = 0; j <
									// sameParent.length; j++) {
									// part.push(sameParent[j].id);
									// }
									// inst._data.geoserver.deleteLayer.addStructure("part",
									// part);
									// }
									/*
									 * var pkeys =
									 * Object.keys(sameGroupParentNGI); if
									 * (pkeys.length > 0) { for (var i = 0; i <
									 * pkeys.length; i++) { var parent =
									 * inst.get_node(pkeys[i]); var group = [];
									 * var ckeys =
									 * Object.keys(sameGroupParentNGI[pkeys[i]]);
									 * for (var j = 0; j < ckeys.length; j++) {
									 * var position = getPosition(ckeys[j], "_",
									 * 3);
									 * group.push(ckeys[j].substring(position +
									 * 1)); }
									 * inst._data.geoserver.deleteLayer.addStructure("ngi",
									 * parent.text, Object
									 * .keys(sameGroupParentNGI[pkeys[i]]).length
									 * === parent.children.length ? "all" :
									 * "part", group); } } pkeys =
									 * Object.keys(sameGroupParentDXF); if
									 * (pkeys.length > 0) { for (var i = 0; i <
									 * pkeys.length; i++) { var parent =
									 * inst.get_node(pkeys[i]); var group = [];
									 * var ckeys =
									 * Object.keys(sameGroupParentDXF[pkeys[i]]);
									 * for (var j = 0; j < ckeys.length; j++) {
									 * var position = getPosition(ckeys[j], "_",
									 * 3);
									 * group.push(ckeys[j].substring(position +
									 * 1)); }
									 * inst._data.geoserver.deleteLayer.addStructure("dxf",
									 * parent.text, Object
									 * .keys(sameGroupParentDXF[pkeys[i]]).length
									 * === parent.children.length ? "all" :
									 * "part", group); } } pkeys =
									 * Object.keys(sameGroupParentSHP); if
									 * (pkeys.length > 0) { for (var i = 0; i <
									 * pkeys.length; i++) { var parent =
									 * inst.get_node(pkeys[i]); var group = [];
									 * var ckeys =
									 * Object.keys(sameGroupParentSHP[pkeys[i]]);
									 * for (var j = 0; j < ckeys.length; j++) {
									 * var position = getPosition(ckeys[j], "_",
									 * 3);
									 * group.push(ckeys[j].substring(position +
									 * 1)); }
									 * inst._data.geoserver.deleteLayer.addStructure("shp",
									 * parent.text, Object
									 * .keys(sameGroupParentSHP[pkeys[i]]).length
									 * === parent.children.length ? "all" :
									 * "part", group); } }
									 * console.log(inst._data.geoserver.deleteLayer.getStructure());
									 * inst._data.geoserver.deleteLayer.setReference(inst);
									 * inst._data.geoserver.deleteLayer.setClientReference(inst._data.geoserver.clientRefer);
									 * var isEditing =
									 * inst._data.geoserver.deleteLayer.isEditing(editingtCheck);
									 * inst._data.geoserver.deleteLayer.alert();
									 */
								}
							}
						};
					}
				},
				types : {
					"#" : {
						"valid_children" : [ "geoserver" ]
					},
					"geoserver" : {
						"icon" : "fas fa-globe",
						"valid_children" : [ "workspace" ]
					},
					"workspace" : {
						"icon" : "fas fa-archive",
						"valid_children" : [ "datastore" ]
					},
					"datastore" : {
						"icon" : "fas fa-hdd",
						"valid_children" : [ "raster", "polygon", "linestring", "point" ]
					},
					"raster" : {
						"icon" : "fas fa-chess-board"
					},
					"polygon" : {
						"icon" : "fas fa-square-full"
					},
					"linestring" : {
						"icon" : "fas fa-minus"
					},
					"point" : {
						"icon" : "fas fa-circle"
					}
				/*
				 * "#" : { "valid_children" : [ "default", "normal", "error",
				 * "generalization" ] }, "default" : { "icon" : "fa fa-file-o",
				 * "valid_children" : [ "default" ] }, "normal" : { "icon" : "fa
				 * fa-folder-o", "valid_children" : [ "n_ngi", "n_dxf", "n_shp" ] },
				 * "n_ngi" : { "icon" : "fa fa-folder-o", "valid_children" : [
				 * "n_ngi_group" ] }, "n_dxf" : { "icon" : "fa fa-folder-o",
				 * "valid_children" : [ "n_dxf_group" ] }, "n_shp" : { "icon" :
				 * "fa fa-folder-o", "valid_children" : [ "n_shp_group" ] },
				 * "n_ngi_group" : { "icon" : "fa fa-map-o", "valid_children" : [
				 * "n_ngi_layer_pt", "n_ngi_layer_ln", "n_ngi_layer_pg",
				 * "n_ngi_layer_mpt", "n_ngi_layer_mln", "n_ngi_layer_mpg",
				 * "n_ngi_layer_txt" ] }, "n_dxf_group" : { "icon" : "fa
				 * fa-map-o", "valid_children" : [ "n_dxf_layer_arc",
				 * "n_dxf_layer_cir", "n_dxf_layer_ins", "n_dxf_layer_lpl",
				 * "n_dxf_layer_pl", "n_dxf_layer_txt" ] }, "n_shp_group" : {
				 * "icon" : "fa fa-map-o", "valid_children" : [
				 * "n_shp_layer_pt", "n_shp_layer_ln", "n_shp_layer_pg",
				 * "n_shp_layer_mpt", "n_shp_layer_mln", "n_shp_layer_mpg" ] },
				 * "n_ngi_layer_pt" : { "icon" : "fa fa-circle",
				 * "valid_children" : [] }, "n_ngi_layer_ln" : { "icon" : "fa
				 * fa-minus", "valid_children" : [] }, "n_ngi_layer_pg" : {
				 * "icon" : "fa fa-square", "valid_children" : [] },
				 * "n_ngi_layer_mpt" : { "icon" : "fa fa-circle",
				 * "valid_children" : [] }, "n_ngi_layer_mln" : { "icon" : "fa
				 * fa-minus", "valid_children" : [] }, "n_ngi_layer_mpg" : {
				 * "icon" : "fa fa-square", "valid_children" : [] },
				 * "n_ngi_layer_txt" : { "icon" : "fa fa-font", "valid_children" : [] },
				 * "n_dxf_layer_arc" : { "icon" : "fa fa-circle-o-notch",
				 * "valid_children" : [] }, "n_dxf_layer_cir" : { "icon" : "fa
				 * fa-circle-o", "valid_children" : [] }, "n_dxf_layer_ins" : {
				 * "icon" : "fa fa-map-pin", "valid_children" : [] },
				 * "n_dxf_layer_lpl" : { "icon" : "fa fa-minus",
				 * "valid_children" : [] }, "n_dxf_layer_pl" : { "icon" :
				 * "fa-window-minimize", "valid_children" : [] },
				 * "n_dxf_layer_txt" : { "icon" : "fa fa-font", "valid_children" : [] },
				 * "n_shp_layer_pt" : { "icon" : "fa fa-circle",
				 * "valid_children" : [] }, "n_shp_layer_ln" : { "icon" : "fa
				 * fa-minus", "valid_children" : [] }, "n_shp_layer_pg" : {
				 * "icon" : "fa fa-square", "valid_children" : [] },
				 * "n_shp_layer_mpt" : { "icon" : "fa fa-circle",
				 * "valid_children" : [] }, "n_shp_layer_mln" : { "icon" : "fa
				 * fa-minus", "valid_children" : [] }, "n_shp_layer_mpg" : {
				 * "icon" : "fa fa-square", "valid_children" : [] }, "error" : {
				 * "icon" : "fa fa-folder-o", "valid_children" : [ "e_ngi",
				 * "e_dxf", "e_shp" ] }, "e_ngi" : { "icon" : "fa fa-folder-o",
				 * "valid_children" : [ "e_ngi_layer" ] }, "e_dxf" : { "icon" :
				 * "fa fa-folder-o", "valid_children" : [ "e_dxf_layer" ] },
				 * "e_shp" : { "icon" : "fa fa-folder-o", "valid_children" : [
				 * "e_shp_layer" ] }, "e_ngi_layer" : { "icon" : "fa
				 * fa-file-image-o", "valid_children" : [] }, "e_dxf_layer" : {
				 * "icon" : "fa fa-file-image-o", "valid_children" : [] },
				 * "e_shp_layer" : { "icon" : "fa fa-file-image-o",
				 * "valid_children" : [] }, "generalization" : { "icon" : "fa
				 * fa-folder-o", "valid_children" : [ "g_ngi_layer",
				 * "g_dxf_layer", "g_shp_layer" ] }, "g_ngi" : { "icon" : "fa
				 * fa-folder-o", "valid_children" : [ "g_ngi_layer" ] }, "g_dxf" : {
				 * "icon" : "fa fa-folder-o", "valid_children" : [ "g_dxf_layer" ] },
				 * "g_shp" : { "icon" : "fa fa-folder-o", "valid_children" : [
				 * "g_shp_layer" ] }, "g_ngi_layer" : { "icon" : "fa
				 * fa-file-image-o", "valid_children" : [] }, "g_dxf_layer" : {
				 * "icon" : "fa fa-file-image-o", "valid_children" : [] },
				 * "g_shp_layer" : { "icon" : "fa fa-file-image-o",
				 * "valid_children" : [] }
				 */
				},
				"plugins" : [ "contextmenu", "search", "state", "types", "geoserver" ]
			});
	this.jstree = $(this.panelBody).jstree(true);

};
gb.tree.GeoServer.prototype = Object.create(gb.tree.GeoServer.prototype);
gb.tree.GeoServer.prototype.constructor = gb.tree.GeoServer;

/**
 * jstree 객체를 반환한다.
 * 
 * @method gb.tree.GeoServer#getJSTree
 */
gb.tree.GeoServer.prototype.getJSTree = function() {
	return this.jstree;
};

/**
 * jstree 객체를 설정한다.
 * 
 * @method gb.tree.GeoServer#setJSTree
 */
gb.tree.GeoServer.prototype.setJSTree = function(jstree) {
	this.jstree = jstree;
};

/**
 * GeoServer 등록창을 연다.
 * 
 * @method gb.tree.GeoServer#openAddGeoServer
 */
gb.tree.GeoServer.prototype.openAddGeoServer = function() {
	var that = this;
	var gName = $("<div>").text("Name: ").css({
		"display" : "table-cell",
		"width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var gNameInput = $("<input>").attr({
		"type" : "text"
	}).css({
		"width" : "83%",
		"border" : "none",
		"border-bottom" : "solid 1px #a9a9a9",
		"margin-left" : "8px"
	});
	var gNameInputDiv = $("<div>").append(gNameInput).css({
		"display" : "table-cell",
		"width" : "80%",
		"vertical-align" : "middle"
	});
	var gNameArea = $("<div>").append(gName).append(gNameInputDiv).css({
		"display" : "table-row"
	});

	var gURL = $("<div>").text("URL: ").css({
		"display" : "table-cell",
		"width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var gURLInput = $("<input>").attr({
		"type" : "text"
	}).css({
		"width" : "83%",
		"border" : "none",
		"border-bottom" : "solid 1px #a9a9a9",
		"margin-left" : "8px"
	});
	var gURLInputDiv = $("<div>").append(gURLInput).css({
		"display" : "table-cell",
		"width" : "80%",
		"vertical-align" : "middle"
	});
	var gURLArea = $("<div>").append(gURL).append(gURLInputDiv).css({
		"display" : "table-row"
	});

	var gID = $("<div>").text("ID: ").css({
		"display" : "table-cell",
		"width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var gIDInput = $("<input>").attr({
		"type" : "text"
	}).css({
		"width" : "83%",
		"border" : "none",
		"border-bottom" : "solid 1px #a9a9a9",
		"margin-left" : "8px"
	});
	var gIDInputDiv = $("<div>").append(gIDInput).css({
		"display" : "table-cell",
		"width" : "80%",
		"vertical-align" : "middle"
	});
	var gIDArea = $("<div>").append(gID).append(gIDInputDiv).css({
		"display" : "table-row"
	});

	var gPass = $("<div>").text("Password: ").css({
		"display" : "table-cell",
		"width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var gPassInput = $("<input>").attr({
		"type" : "password"
	}).css({
		"width" : "83%",
		"border" : "none",
		"border-bottom" : "solid 1px #a9a9a9",
		"margin-left" : "8px"
	});
	var gPassInputDiv = $("<div>").append(gPassInput).css({
		"display" : "table-cell",
		"width" : "80%",
		"vertical-align" : "middle"
	});
	var gPassArea = $("<div>").append(gPass).append(gPassInputDiv).css({
		"display" : "table-row"
	});

	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Close");
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Add");

	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);
	var modalFooter = $("<div>").append(buttonArea);

	var gBody = $("<div>").append(gNameArea).append(gURLArea).append(gIDArea).append(gPassArea).css({
		"display" : "table",
		"padding" : "10px"
	});
	var addGeoServerModal = new gb.modal.Base({
		"title" : "Add GeoServer",
		"width" : 540,
		"height" : 400,
		"autoOpen" : true,
		"body" : gBody,
		"footer" : modalFooter
	});
	$(closeBtn).click(function() {
		addGeoServerModal.close();
	});
	$(okBtn).click(function() {
		that.addGeoServer($(gNameInput).val(), $(gURLInput).val(), $(gIDInput).val(), $(gPassInput).val());
	});
};

/**
 * GeoServer를 등록한다.
 * 
 * @method gb.tree.GeoServer#addGeoServer
 * @param {String}
 *            name - 지오서버의 이름
 * @param {String}
 *            url - 지오서버의 URL
 * @param {String}
 *            id - 지오서버 접속을 위한 ID
 * @param {String}
 *            password - 지오서버 접속을 위한 비밀번호
 */
gb.tree.GeoServer.prototype.addGeoServer = function(name, url, id, password) {
	console.log("add geoserver");
	console.log(name);
	console.log(url);
	console.log(id);
	console.log(password);
};

/**
 * GeoServer 삭제 확인창을 연다.
 * 
 * @method gb.tree.GeoServer#openDeleteGeoServer
 */
gb.tree.GeoServer.prototype.openDeleteGeoServer = function(geoserver) {
	console.log("open delete geoserver");
	var msg1 = $("<div>").text("Are you sure to delete this server?");
	var msg2 = $("<div>").text('"' + geoserver + '"');
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
 * GeoServer를 삭제한다.
 * 
 * @method gb.tree.GeoServer#deleteGeoServer
 */
gb.tree.GeoServer.prototype.deleteGeoServer = function() {
	console.log("delete geoserver");
};

/**
 * GeoServer 목록을 새로고침한다.
 * 
 * @method gb.tree.GeoServer#refreshGeoServer
 */
gb.tree.GeoServer.prototype.refreshGeoServer = function() {
	console.log("refresh geoserver");
	this.getJSTree().refresh();
};
/**
 * 레이어 검색창을 연다.
 * 
 * @method gb.tree.GeoServer#openSearchBar
 */
gb.tree.GeoServer.prototype.openSearchBar = function() {
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
 * @method gb.tree.GeoServer#closeSearchBar
 */
gb.tree.GeoServer.prototype.closeSearchBar = function() {
	console.log("close search geoserver");
	$(this.titleArea).css({
		"display" : "block"
	});
	$(this.searchArea).css({
		"display" : "none"
	});
};