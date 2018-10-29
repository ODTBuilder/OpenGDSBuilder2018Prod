/**
 * GeoGig feature 변경이력 객체를 정의한다.
 * 
 * @class gb.versioning.Feature
 * @memberof gb.versioning
 * @param {Object}
 *            obj - 생성자 옵션을 담은 객체
 * @param {Object}
 *            obj.url - 요청을 수행할 URL
 * @param {String}
 *            obj.url.serverTree - 서버 목록 트리를 요청할 컨트롤러 주소
 * 
 * @version 0.01
 * @author SOYIJUN
 * @date 2018. 10.26
 */
gb.versioning.Feature = function(obj) {

	this.conflictView1 = new ol.View({
		"center" : [ 0, 0 ],
		"zoom" : 1
	});

	this.conflictView2 = new ol.View({
		"center" : [ 0, 0 ],
		"zoom" : 1
	});

	this.ofeature = $("<div>").css({
		"width" : "100%",
		"height" : "200px",
		"background-color" : "#dbdbdb",
		"border" : "1px solid #ccc",
		"border-radius" : "4px"
	});
	this.cfeature = $("<div>").css({
		"width" : "100%",
		"height" : "200px",
		"background-color" : "#dbdbdb",
		"border" : "1px solid #ccc",
		"border-radius" : "4px"
	});
};
gb.versioning.Feature.prototype = Object.create(gb.versioning.Feature.prototype);
gb.versioning.Feature.prototype.constructor = gb.versioning.Feature;

/**
 * 피처 이력창을 연다.
 * 
 * @method gb.versioning.Feature#open
 */
gb.versioning.Feature.prototype.open = function() {
	var that = this;
	var panel = new gb.panel.Base({
		"width" : 400,
		"height" : 550,
		"positionX" : 4,
		"right" : true,
		"positionY" : 395,
		"autoOpen" : false
	});
	var th1 = $("<div>").addClass("th").addClass("gb-versioning-feature-td").text("Commiter");
	var th2 = $("<div>").addClass("th").addClass("gb-versioning-feature-td").text("Time");
	var th3 = $("<div>").addClass("th").addClass("gb-versioning-feature-td").text("Type");
	var th4 = $("<div>").addClass("th").addClass("gb-versioning-feature-td").text("Changes");
	var thr = $("<div>").addClass("tr").addClass("gb-versioning-feature-tr").append(th1).append(th2).append(th3).append(th4);
	var thead = $("<div>").addClass("thead").addClass("gb-versioning-feature-trg").append(thr).css({
		"text-align" : "center"
	});
	var tbody = $("<div>").addClass("tbody").addClass("gb-versioning-feature-trg");
	var table = $("<div>").addClass("gb-table").css({
		"display" : "table",
		"width" : "100%",
		"padding-left" : "6px"
	}).append(thead).append(tbody);
	for (var i = 0; i < 11; i++) {
		var td1 = $("<div>").addClass("td").addClass("gb-versioning-feature-td").append("admin").css({
			"text-align" : "center"
		});
		var td2 = $("<div>").addClass("td").addClass("gb-versioning-feature-td").append("2018-10-26 13:45");
		var td3 = $("<div>").addClass("td").addClass("gb-versioning-feature-td").append("modified");
		var button = $("<button>").addClass("gb-button").addClass("gb-button-default").text("Detail").attr({
			"title" : "modified 1 feature via geodt online"
		}).click(function() {
			that.openDetailChanges();
		});
		var td4 = $("<div>").addClass("td").addClass("gb-versioning-feature-td").css({
			"text-align" : "center"
		}).append(button);

		var msg = $("<div>").addClass("gb-tooltip-text").text("modified 1 feature");
		var tr = $("<div>").addClass("tr").addClass("gb-versioning-feature-tr").addClass("gb-tooltip").append(td1).append(td2).append(td3)
				.append(td4);
		$(tbody).append(tr);
	}
	var moreIcon = $("<i>").addClass("fas").addClass("fa-caret-down");
	var btn = $("<button>").addClass("gb-button-clear").append(moreIcon).append(" Read more");
	var btnarea = $("<div>").css({
		"text-align" : "center"
	}).append(btn);
	var body = $("<div>").css({
		"overflow-y" : "auto",
		"height" : "510px",
		"margin" : "4px 0"
	}).append(table).append(btnarea);
	panel.setPanelBody(body);
	panel.open();
};

/**
 * 피처 이력을 요청한다.
 * 
 * @method gb.versioning.Feature#loadFeatureHistory
 */
gb.versioning.Feature.prototype.loadFeatureHistory = function() {

};

/**
 * 피처 디테일 창을 연다.
 * 
 * @method gb.versioning.Feature#openDetailChanges
 */
gb.versioning.Feature.prototype.openDetailChanges = function() {
	var that = this;

	var olabel = $("<div>").append("Original Feature").addClass("gb-form").css({
		"text-align" : "center"
	});

	var oheadtd1 = $("<th>").text("Name");
	var oheadtd2 = $("<th>").text("Value");
	var oheadth = $("<tr>").append(oheadtd1).append(oheadtd2);
	var oattrthead = $("<thead>").append(oheadth);
	var oattrtbody = $("<tbody>").css({
		"overflow-y" : "auto",
		"height" : "340px",
		"width" : "354px"
	});
	var oattrtable = $("<table>").append(oattrthead).append(oattrtbody).addClass("gb-table");
	var oattribute = $("<div>").append(oattrtable).css({
		"height" : "370px",
		"width" : "100%",
		"overflow" : "hidden"
	});
	var oarea = $("<div>").append(olabel).append(this.ofeature).append(oattribute).css({
		"float" : "left",
		"width" : "50%",
		"padding" : "10px"
	});

	var clabel = $("<div>").append("Changed Feature").addClass("gb-form").css({
		"text-align" : "center"
	});

	var cheadtd1 = $("<th>").text("Name");
	var cheadtd2 = $("<th>").text("Value");
	var cheadth = $("<tr>").append(cheadtd1).append(cheadtd2);
	var cattrthead = $("<thead>").append(cheadth);
	var cattrtbody = $("<tbody>").css({
		"overflow-y" : "auto",
		"height" : "340px",
		"width" : "354px"
	});
	var cattrtable = $("<table>").append(cattrthead).append(cattrtbody).addClass("gb-table").css({
		"width" : "100%",
		"table-layout" : "fixed"
	});
	var cattribute = $("<div>").append(cattrtable).css({
		"height" : "370px",
		"width" : "100%",
		"overflow" : "hidden"
	});

	$(oattrtbody).on("scroll", function() {
		$(cattrtbody).prop("scrollTop", this.scrollTop).prop("scrollLeft", this.scrollLeft);
	});

	var carea = $("<div>").append(clabel).append(this.cfeature).append(cattribute).css({
		"float" : "left",
		"width" : "50%",
		"padding" : "10px"
	});

	var ocarea = $("<div>").append(oarea).append(carea);

	var body = $("<div>").append(ocarea);

	var revertBtn = $("<button>").css({
		"float" : "left"
	}).addClass("gb-button").addClass("gb-button-default").text("Revert");
	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Close");
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Use");
	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(revertBtn).append(closeBtn);

	var modal = new gb.modal.Base({
		"title" : "Compare Changes",
		"width" : 770,
		"height" : 840,
		"autoOpen" : true,
		"body" : body,
		"footer" : buttonArea
	});

	$(closeBtn).click(function() {
		modal.close();
	});
	$(okBtn).click(function() {
		console.log(idx);
		$(branchSelect).val();
		console.log($(branchSelect).val());
		var select = $(that.conflictFeatureTbody).find("tr").eq(idx).find(".gb-repository-instead-branch");
		$(select).filter("option:selected").text();
		console.log($(select).find("option").filter(":selected").val());
		$(select).val($(branchSelect).val());
		$(select).trigger("change");
		modal.close();
	});

	// var cparams1 = {
	// "serverName" : server,
	// "repoName" : crepos,
	// "path" : path,
	// "commitId" : this.getCommitId().ours,
	// "featureId" : fid1
	// }
	//
	// var cparams2 = {
	// "serverName" : server,
	// "repoName" : crepos,
	// "path" : path,
	// "commitId" : this.getCommitId().theirs,
	// "featureId" : fid2
	// }

	var wkt1;
	var wkt2;
	if (fid1 !== "0000000000000000000000000000000000000000") {
		var fobjectURL1 = this.getCatFeatureObjectURL();
		if (fobjectURL1.indexOf("?") !== -1) {
			fobjectURL1 += "&";
			fobjectURL1 += jQuery.param(cparams1);
		} else {
			fobjectURL1 += "?";
			fobjectURL1 += jQuery.param(cparams1);
		}

		$.ajax({
			url : fobjectURL1,
			method : "POST",
			contentType : "application/json; charset=UTF-8",
			// data : cparams1,
			// dataType : 'jsonp',
			// jsonpCallback : 'getJson',
			beforeSend : function() {
				// $("body").css("cursor", "wait");
			},
			complete : function() {
				// $("body").css("cursor", "default");
			},
			success : function(data) {
				console.log(data);
				if (data.success === "true") {
					var attrs = data.attributes;
					for (var i = 0; i < attrs.length; i++) {
						if (attrs[i].type === "POINT" || attrs[i].type === "LINESTRING" || attrs[i].type === "POLYGON"
								|| attrs[i].type === "MULTIPOINT" || attrs[i].type === "MULTILINESTRING"
								|| attrs[i].type === "MULTIPOLYGON") {
							var wkt = attrs[i].value;
							wkt1 = wkt;
							console.log(wkt1);
							var format = new ol.format.WKT();
							var geom = format.readGeometry(wkt);
							var feature = new ol.Feature({
								"geometry" : geom
							});
							feature.setId(data.featureId);
							console.log(feature);
							console.log(feature.getId());
							var style = new ol.style.Style({
								image : new ol.style.Circle({
									radius : 5,
									fill : new ol.style.Fill({
										color : 'orange'
									})
								}),
								stroke : new ol.style.Stroke({
									width : 1,
									color : 'orange'
								}),
								fill : new ol.style.Fill({
									color : 'orange'
								})
							});

							var vlayer = new ol.layer.Vector({
								"style" : style,
								"source" : new ol.source.Vector({
									"features" : [ feature ]
								}),
								"zIndex" : 2
							});

							var osm = new ol.layer.Tile({
								"source" : new ol.source.OSM(),
								"zIndex" : 1
							});

							var epsg = attrs[i].crs.toLowerCase();
							var code = epsg.substring(epsg.indexOf("epsg:") + 5);
							var intcode = parseInt(code);
							console.log(code);

							var ccrs = new gb.crs.BaseCRS({
								"title" : "Base CRS",
								"width" : 300,
								"height" : 200,
								"autoOpen" : false,
								"message" : undefined,
								"map" : that.getCurrentMap(),
								"epsg" : Number.isInteger(intcode) ? code : "4326"
							});

							that.getCurrentMap().updateSize();
							that.getCurrentMap().getLayers().clear();
							that.getCurrentMap().addLayer(osm);
							that.getCurrentMap().addLayer(vlayer);
							that.getCurrentMap().getView().fit(geom);

						} else {
							var name = attrs[i].name;
							var value = attrs[i].value;
							var td1 = $("<td>").text(name);
							var td2 = $("<td>").text(value).css({
								"word-break" : "break-word",
								"overflow-wrap" : "break-word"
							});
							var tr = $("<tr>").append(td1).append(td2);
							$(cattrtbody).append(tr);
						}

					}

					if (fid2 !== "0000000000000000000000000000000000000000") {
						var fobjectURL2 = that.getCatFeatureObjectURL();
						if (fobjectURL2.indexOf("?") !== -1) {
							fobjectURL2 += "&";
							fobjectURL2 += jQuery.param(cparams2);
						} else {
							fobjectURL2 += "?";
							fobjectURL2 += jQuery.param(cparams2);
						}

						$.ajax({
							url : fobjectURL2,
							method : "POST",
							contentType : "application/json; charset=UTF-8",
							// data : cparams2,
							// dataType : 'jsonp',
							// jsonpCallback : 'getJson',
							beforeSend : function() {
								// $("body").css("cursor", "wait");
							},
							complete : function() {
								// $("body").css("cursor", "default");
							},
							success : function(data) {
								console.log(data);
								if (data.success === "true") {
									var attrs = data.attributes;
									for (var i = 0; i < attrs.length; i++) {
										if (attrs[i].type === "POINT" || attrs[i].type === "LINESTRING" || attrs[i].type === "POLYGON"
												|| attrs[i].type === "MULTIPOINT" || attrs[i].type === "MULTILINESTRING"
												|| attrs[i].type === "MULTIPOLYGON") {
											var wkt = attrs[i].value;
											wkt2 = wkt;
											if (wkt1 !== wkt2) {
												$(that.cfeature).css({
													"border" : "3px solid #ffc523"
												});
												$(that.tfeature).css({
													"border" : "3px solid #ffc523"
												});
											} else {
												$(that.cfeature).css({
													"border" : "1px solid #ccc"
												});
												$(that.tfeature).css({
													"border" : "1px solid #ccc"
												});
											}
											console.log(wkt2);
											var format = new ol.format.WKT();
											var geom = format.readGeometry(wkt);
											var feature = new ol.Feature({
												"geometry" : geom
											});
											feature.setId(data.featureId);
											console.log(feature);
											console.log(feature.getId());
											var style = new ol.style.Style({
												image : new ol.style.Circle({
													radius : 5,
													fill : new ol.style.Fill({
														color : 'orange'
													})
												}),
												stroke : new ol.style.Stroke({
													width : 1,
													color : 'orange'
												}),
												fill : new ol.style.Fill({
													color : 'orange'
												})
											});

											var vlayer = new ol.layer.Vector({
												"style" : style,
												"source" : new ol.source.Vector({
													"features" : [ feature ]
												}),
												"zIndex" : 2
											});

											var osm = new ol.layer.Tile({
												"source" : new ol.source.OSM(),
												"zIndex" : 1
											});

											var epsg = attrs[i].crs.toLowerCase();
											var code = epsg.substring(epsg.indexOf("epsg:") + 5);
											var intcode = parseInt(code);
											console.log(code);

											var ccrs = new gb.crs.BaseCRS({
												"title" : "Base CRS",
												"width" : 300,
												"height" : 200,
												"autoOpen" : false,
												"message" : undefined,
												"map" : that.getTargetMap(),
												"epsg" : Number.isInteger(intcode) ? code : "4326"
											});

											that.getTargetMap().updateSize();
											that.getTargetMap().getLayers().clear();
											that.getTargetMap().addLayer(osm);
											that.getTargetMap().addLayer(vlayer);
											var geom = feature.getGeometry();

											that.getTargetMap().getView().fit(geom);

										} else {
											var name = attrs[i].name;
											var value = attrs[i].value;
											var td1 = $("<td>").text(name);
											var td2 = $("<td>").text(value).css({
												"word-break" : "break-word",
												"overflow-wrap" : "break-word"
											});
											var tr = $("<tr>").append(td1).append(td2);
											$(tattrtbody).append(tr);
										}

									}
									if ($(cattrtbody).find("tr").length === $(tattrtbody).find("tr").length) {
										var trs = $(cattrtbody).find("tr");
										var ttrs = $(tattrtbody).find("tr");
										for (var j = 0; j < trs.length; j++) {
											if ($(trs[j]).find("td").eq(0).text() === $(ttrs[j]).find("td").eq(0).text()) {

												if ($(trs[j]).find("td").eq(1).text() !== $(ttrs[j]).find("td").eq(1).text()) {
													$(trs[j]).css({
														"background-color" : "#ffc523"
													});
													$(ttrs[j]).css({
														"background-color" : "#ffc523"
													});
												}
											}
										}
									}
								} else {
									var title = "Error";
									var msg = "Retrieve feature failed."
									that.messageModal(title, msg);
								}
							},
							error : function(jqXHR, textStatus, errorThrown) {

							}
						});
					} else {
						that.getTargetMap().updateSize();
						var td1 = $("<td>").text("Deleted");
						var td2 = $("<td>").text("Deleted");
						var tr = $("<tr>").append(td1).append(td2);
						$(tattrtbody).append(tr);
					}
				} else {
					var title = "Error";
					var msg = "Retrieve feature failed."
					that.messageModal(title, msg);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {

			}
		});
	} else {

	}
};

/**
 * 피처 revert 요청 모달을 연다.
 * 
 * @method gb.versioning.Feature#openRevertModal
 */
gb.versioning.Feature.prototype.openRevertModal = function() {

};

/**
 * 피처 revert 요청한다.
 * 
 * @method gb.versioning.Feature#revert
 */
gb.versioning.Feature.prototype.revert = function() {

};

/**
 * 피처 충돌 정보창을 연다.
 * 
 * @method gb.versioning.Feature#openConflictDetailModal
 */
gb.versioning.Feature.prototype.openConflictDetailModal = function() {

};

/**
 * 충돌 피처를 머지한다.
 * 
 * @method gb.versioning.Feature#mergeConflictFeature
 */
gb.versioning.Feature.prototype.mergeConflictFeature = function() {

};