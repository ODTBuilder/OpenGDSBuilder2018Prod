/**
 * 레이어 정보를 변경하는 객체를 정의한다.
 * 
 * @author yijun.so
 * @date 2017. 06. 16
 * @version 0.01
 */
var gb;
if (!gb)
	gb = {};
if (!gb.edit)
	gb.edit = {};

gb.edit.THSTYLE = {
	"padding" : ".78571429em .78571429em",
	"background" : "rgba(0,0,0,.03)",
	"font-weight" : "700",
	"border-left": "1px solid rgba(34,36,38,.1)",
	"text-align": "center"
}

gb.edit.TDSTYLE = {
	"padding" : ".78571429em .78571429em",
	"border-left": "1px solid rgba(34,36,38,.1)"
}

gb.edit.TDKEYSTYLE = {
	"padding" : ".78571429em .78571429em",
	"background" : "rgba(0,0,0,.03)",
	"font-weight" : "700"
}

gb.edit.TRSTYLE = {
	"border-bottom" : "1px solid rgba(0,0,0,.1)"
}

gb.edit.INPUTSTYLE = {
	"width" : "inherit",
	"border" : "1px solid rgba(34,36,38,.15)",
	"border-radius" : ".28571429rem",
	"line-height" : "1.21428571em",
	"padding" : ".67857143em 1em"

}

gb.edit.LABELSTYLE = {
	"display" : "inline-block",
	"background" : "#e0e1e2 none",
	"color" : "rgba(0,0,0,.6)",
	"margin" : "0 .25em .25em 0",
	"padding" : ".78571429em 1.5em .78571429em",
	"font-weight" : "700",
	"line-height" : "1em",
	"border-radius" : ".28571429rem"
}

gb.edit.FIELDSTYLE = {
	"width" : "50%",
	"padding-left" : ".5em",
	"padding-right" : ".5em"
}

gb.edit.SELECTSTYLE = {}

gb.edit.SELTITLESTYLE = {
	"font-weight" : "700"
}

gb.edit.ModifyLayerProperties = function(obj) {
	var that = this;
	var options = obj;
	this.window;
	this.layer = undefined;
	this.serverInfo = {
		geoserver: undefined,
		workspace: undefined,
		datastore: undefined,
		layername: undefined
	};
	this.layerName = undefined;
	this.srs = undefined;
	this.workspaceList = [];
	this.layerRecord = options.layerRecord ? options.layerRecord : undefined;
	this.featureRecord = options.featureRecord ? options.featureRecord : undefined;
	this.refer = options.refer ? options.refer : undefined;
	this.token = options.token || "";

	this.locale = options.locale ? options.locale : "en";
	this.translation = {
		"close" : {
			"ko" : "닫기",
			"en" : "Close"
		},
		"cancel" : {
			"ko" : "취소",
			"en" : "Cancel"
		},
		"layerprop" : {
			"ko" : "레이어 속성 정보",
			"en" : "Layer Properties"
		},
		"confirm" : {
			"ko" : "확인",
			"en" : "Confirm"
		},
		"save" : {
			"ko" : "저장",
			"en" : "Save"
		},
		"save" : {
			"ko" : "저장",
			"en" : "Save"
		},
		"geoserver" : {
			"ko" : "GeoServer",
			"en" : "GeoServer"
		},
		"workspace" : {
			"ko" : "작업공간",
			"en" : "Workspace"
		},
		"style" : {
			"ko" : "스타일",
			"en" : "Style"
		},
		"nativeName" : {
			"ko" : "레이어 원본 이름",
			"en" : "Native Layer Name"
		},
		"lName" : {
			"ko" : "레이어 이름",
			"en" : "Layer Name"
		},
		"title" : {
			"ko" : "제목",
			"en" : "Title"
		},
		"abstractContent" : {
			"ko" : "개요",
			"en" : "Summary"
		},
		"srs" : {
			"ko" : "좌표계",
			"en" : "SRS"
		},
		"llbBox" : {
			"ko" : "위/경도 영역",
			"en" : "Lat/Lon Boundary"
		},
		"nbBox" : {
			"ko" : "원본 레이어 최소경계 영역",
			"en" : "Layer Minimum Boundary"
		},
		"dsType" : {
			"ko" : "저장소 형식",
			"en" : "Datastore Type"
		},
		"geomType" : {
			"ko" : "지오메트리 형식",
			"en" : "Geometry Type"
		},
		"geomkey" : {
			"ko" : "지오메트리 속성명",
			"en" : "Geometry Key Name"
		},
		"styleWorkspace" : {
			"ko" : "스타일의 작업공간",
			"en" : "Style's Workspace"
		},
		"attInfo" : {
			"ko" : "속성 정보",
			"en" : "Attribute Info"
		},
		"sld" : {
			"ko" : "SLD",
			"en" : "SLD"
		},
		"myserver" : {
			"ko" : "전체 스타일",
			"en" : "All Styles"
		},
		"layerNameHint" : {
			"ko" : "레이어 이름에 특수문자는 허용되지않습니다.",
			"en" : "Special characters are not allowed in the name."
		},
		"layerTitleHint" : {
			"ko" : "레이어 제목에 특수문자는 허용되지않습니다.",
			"en" : "Special characters are not allowed in the title."
		},
		"layerChangeHint" : {
			"ko" : "레이어 정보 변경시 다른 작업자들이 피해를 입을 수 있습니다. 계속하시겠습니까?",
			"en" : "Changing layer information could harm others. Do you want to continue?"
		}
	};
	this.validIconSpan = undefined;
	this.searchBtn = undefined;

	var xSpan = $("<span>").attr({
		"aria-hidden" : true
	}).html("&times;");
	var xButton = $("<button>").attr({
		"type" : "button",
		"data-dismiss" : "modal",
		"aria-label" : "Close"
	}).html(xSpan);
	$(xButton).addClass("close");

	this.htag = $("<h4>");
	this.htag.text(this.translation["layerprop"][this.locale]);
	$(this.htag).addClass("modal-title");

	var header = $("<div>").append(xButton).append(this.htag);
	$(header).addClass("modal-header");
	/*
	 * 
	 * 
	 * header end
	 * 
	 * 
	 */

	this.tbody = $("<tbody>");
	var tableTag = $("<table>").append(this.tbody);

	this.body = $("<div>").append(tableTag);

	// that.setForm("ngi", "layer");
	$(this.body).addClass("modal-body").css({
		"height" : "550px",
		"overflow-y" : "auto"
	});
	/*
	 * 
	 * 
	 * body end
	 * 
	 * 
	 */

	var closeBtn = $("<button>").attr({
		"type" : "button",
		"data-dismiss" : "modal"
	});
	$(closeBtn).addClass("btn");
	$(closeBtn).addClass("btn-default");
	$(closeBtn).text(this.translation["close"][this.locale]);

	var okBtn = this.okBtn = $("<button>").attr({
		"type" : "button",
		"disabled" : false
	}).on("click", function() {
		// var opt = that.getDefinitionForm();
		if (!!that.saveLayerProperties()) {
			that.close();
		}
	});
	$(okBtn).addClass("btn");
	$(okBtn).addClass("btn-primary");
	$(okBtn).text(this.translation["save"][this.locale]);

	var pright = $("<span>").css("float", "right");
	$(pright).append(closeBtn).append(okBtn);

	var footer = $("<div>").append(pright);
	$(footer).addClass("modal-footer");
	/*
	 * 
	 * 
	 * footer end
	 * 
	 * 
	 */
	var content = $("<div>").append(header).append(this.body).append(footer);
	$(content).addClass("modal-content");

	var dialog = $("<div>").html(content);
	$(dialog).addClass("modal-dialog");
	$(dialog).addClass("modal-lg");
	this.window = $("<div>").hide().attr({
		// Setting tabIndex makes the div focusable
		tabIndex : -1,
		role : "dialog",
	}).html(dialog);
	$(this.window).addClass("modal");
	$(this.window).addClass("fade");

	this.window.appendTo("body");
	this.window.modal({
		backdrop : true,
		keyboard : true,
		show : false,
	});

	$(".layer-prop-input").on("keyup", function(e) {
		var bool = true;
		var id = e.target.id;
		var value = e.target.value;

		if (id === "propsrs") {
			if (value !== that.srs) {
				bool = false;
			}
		}

		if (id === "proplName") {
			if (value !== that.layerName) {
				bool = false;
			}
		}

		that.okBtn.attr({
			"disabled" : bool
		});
	});
}
gb.edit.ModifyLayerProperties.prototype.createTableContent = function(obj) {
	var list = obj || false;
	if (!list) {
		return;
	}

	this.tbody.empty();

	var that = this;
	var tr, key, value, label, labelKey, labelValue, labelText, select, selectTitle, selectField, option, search;
	for ( var i in list) {
		console.log(i);
		key = $("<td>").css(gb.edit.TDKEYSTYLE).text(that.translation[i][that.locale]).css("width", "20%");
		if (list[i] instanceof Object) {
			value = $("<td>").css(gb.edit.TDSTYLE);
			for ( var j in list[i]) {
				labelKey = $("<span>").text(j);
				if (list[i][j] instanceof Object) {
					labelText = "[type:" + list[i][j].type + "]";
					if(list[i][j].nillable === false){
						labelText += "[NotNull]";
					}
					labelValue = $("<span>").text(labelText);
				} else {
					labelValue = $("<span>").text(list[i][j]);
				}
				label = $("<div>").css(gb.edit.LABELSTYLE).append(labelKey).append(labelValue);
				value.append(label);
			}
		} else {
			if (i === "lName" || i === "title") {
				value = $("<td>").css(gb.edit.TDSTYLE).append($("<input>").addClass("layer-prop-input").attr({
					"id" : "prop" + i,
					"value" : list[i],
					"type" : "text",
					"readonly" : false
				}).css(gb.edit.INPUTSTYLE));
			} else if (i === "abstractContent") {
				value = $("<td>").css(gb.edit.TDSTYLE).append($("<textarea>").addClass("layer-prop-textarea").attr({
					"id" : "prop" + i,
					"readonly" : false
				}).val(list[i]).css(gb.edit.INPUTSTYLE).css("width", "250px"));
			} else if (i === "style") {
				selectTitle = $("<label>").css(gb.edit.SELTITLESTYLE).text(this.translation["workspace"][this.locale]);
				select = $("<select id='styleWorkspaceSelect' class='gb-form'>").css(gb.edit.SELECTSTYLE);
				select.change(function() {
					var params = {};
					params.selectTag = $("#styleSelect");
					params.serverName = that.serverInfo.geoserver;

					if ($(this).find("option:selected").val() === "workspace") {
						params.workspace = $(this).find("option:selected").text();
					}

					that.requestStyleList(params);
				});
				selectField = $("<div>").css(gb.edit.FIELDSTYLE).append(selectTitle).append(select);

				option = $("<option>").val("geoserver").text(this.translation["myserver"][this.locale]);
				select.append(option);
				for (var w = 0; w < this.workspaceList.length; w++) {
					option = $("<option>").val("workspace").text(this.workspaceList[w]);
					select.append(option);
					if (list.styleWorkspace === this.workspaceList[w]) {
						option.attr("selected", "selected");
					}
				}
				value = $("<td>").css(gb.edit.TDSTYLE).css("display", "flex").append(selectField);

				selectTitle = 
					$("<div>")
						.append($("<label>").css(gb.edit.SELTITLESTYLE).text(this.translation["style"][this.locale]))
						.append($("<img id='styleLegend'>").css({"float": "right"}))
						.css({
							"width": "100%"
						});
				select = $("<select id='styleSelect' class='gb-form'>").css(gb.edit.SELECTSTYLE);
				select.change(function() {
					var params = {};
					params.legendTag = $("#styleLegend");
					params.serverName = that.serverInfo.geoserver;
					params.layerName = that.serverInfo.layername;
					
					if ($("#styleWorkspaceSelect").find("option:selected").val() === "workspace") {
						params.workspace = $("#styleWorkspaceSelect").find("option:selected").text();
					}
					
					params.style = $(this).find("option:selected").val();

					that.requestStyleLegend(params);
				});
				selectField = $("<div>").css(gb.edit.FIELDSTYLE).append(selectTitle).append(select);
				value.append(selectField);

				this.requestStyleList({
					selectTag : select,
					serverName : this.serverInfo.geoserver,
					workspace : list.styleWorkspace,
					style : list[i]
				});
			} else if (i === "srs") {
				search = $("<input>").addClass("layer-prop-input").attr({
					"id" : "prop" + i,
					"value" : list[i] ? list[i].replace(/[^0-9]/g, "") : "",
					"type" : "text",
					"readonly" : false
				}).css(gb.edit.INPUTSTYLE);

				var tout = false;
				$(search).keyup(function() {
					that.setValidEPSG(1);
					if (tout) {
						clearTimeout(tout);
					}
					that.tout = setTimeout(function() {
						var v = $(search).val();
						that.searchEPSGCode(v);
					}, 250);
				});

				this.validIconSpan = $("<span>").css({
					"margin-left" : "15px",
					"margin-right" : "0"
				});

				value = $("<td>").append($("<span>").text("EPSG: ")).append(search).append(this.validIconSpan).css(gb.edit.TDSTYLE);
			} else {
				if (i === "styleWorkspace") {
					continue;
				}
				value = $("<td>").css(gb.edit.TDSTYLE).text(list[i]);
			}

		}

		tr = $("<tr>").css(gb.edit.TRSTYLE).append(key).append(value);
		this.tbody.append(tr);
	}
}

gb.edit.ModifyLayerProperties.prototype.saveLayerInfo = function() {
	return 1;
}

gb.edit.ModifyLayerProperties.prototype.getLayerRecord = function() {
	return this.layerRecord;
};
gb.edit.ModifyLayerProperties.prototype.setLayerRecord = function(record) {
	this.layerRecord = record;
};
gb.edit.ModifyLayerProperties.prototype.getFeatureRecord = function() {
	return this.featureRecord;
};
gb.edit.ModifyLayerProperties.prototype.setFeatureRecord = function(record) {
	this.featureRecord = record;
};
gb.edit.ModifyLayerProperties.prototype.open = function() {
	this.window.modal('show');
};
gb.edit.ModifyLayerProperties.prototype.close = function() {
	this.window.modal('hide');
};
gb.edit.ModifyLayerProperties.prototype.setRefer = function(refer) {
	this.refer = refer;
};
gb.edit.ModifyLayerProperties.prototype.getRefer = function() {
	return this.refer;
};
gb.edit.ModifyLayerProperties.prototype.refresh = function() {
	this.refer.refresh();
};
gb.edit.ModifyLayerProperties.prototype.setLayer = function(layer) {
	this.layer = layer;
};
gb.edit.ModifyLayerProperties.prototype.getLayer = function() {
	return this.layer;
};
gb.edit.ModifyLayerProperties.prototype.setServerInfo = function(info) {
	this.serverInfo = info;
};
gb.edit.ModifyLayerProperties.prototype.getServerInfo = function() {
	return this.serverInfo;
};
gb.edit.ModifyLayerProperties.prototype.getLayerId = function() {
	var id = "";
	
	id += this.serverInfo.geoserver || "";
	id += this.serverInfo.workspace ? (":" + this.serverInfo.workspace) : "";
	id += this.serverInfo.datastore ? (":" + this.serverInfo.datastore) : "";
	id += this.serverInfo.layername ? (":" + this.serverInfo.layername) : "";
	
	return id;
};
gb.edit.ModifyLayerProperties.prototype.setForm = function(info) {
	this.getImageTileInfo("geoserver/getGeoLayerInfoList.ajax", info);
	this.requestStyleList("geoserver32");
};

gb.edit.ModifyLayerProperties.prototype.setWorkSpaceList = function(list) {
	if (list instanceof Array) {
		this.workspaceList = list;
	}
};

gb.edit.ModifyLayerProperties.prototype.getImageTileInfo = function(url, info) {
	var that = this;
	var geoserver = info.geoserver || false, workspace = info.workspace || false, datastore = info.datastore || false, layername = info.layername || false;
	
	if (!geoserver || !workspace || !datastore || !layername) {
		console.error("Missed Parameter");
		return;
	}

	this.setServerInfo(info);

	var arr = {
		"serverName" : geoserver,
		"workspace" : workspace,
		"geoLayerList" : [ layername ]
	}
	$.ajax({
		url : url + this.token,
		method : "POST",
		contentType : "application/json; charset=UTF-8",
		cache : false,
		data : JSON.stringify(arr),
		beforeSend : function() { // 호출전실행
			$("body").css("cursor", "wait");
		},
		complete : function() {
			$("body").css("cursor", "default");
		},
		traditional : true,
		success : function(data, textStatus, jqXHR) {
			if (Array.isArray(data)) {
				if (data.length === 1) {
					var arra = [];

					that.setLayer(data[0]);
					that.layerName = data[0].lName;
					that.srs = data[0].srs;

					that.createTableContent(data[0]);
				}

				$("body").css("cursor", "default");
			}
		}
	});
};

gb.edit.ModifyLayerProperties.prototype.requestStyleList = function(options) {
	var params = {};
	var options = options;
	var select = undefined;
	var style = options.style || "";

	if (!!options.selectTag) {
		select = options.selectTag;
	} else {
		return;
	}

	if (!!options.serverName) {
		params.serverName = options.serverName;
	} else {
		return;
	}

	if (!!options.workspace) {
		params.workspace = options.workspace;
	}

	$.ajax({
		url : "geoserver/getStyleList.ajax" + this.token,
		method : "GET",
		contentType : "application/json; charset=UTF-8",
		cache : false,
		data : params,
		success : function(data, textStatus, jqXHR) {
			select.empty();
			var tag = undefined;
			for (var i = 0; i < data.length; i++) {
				tag = $("<option>").val(data[i]).text(data[i]);
				select.append(tag);
				if (style === data[i]) {
					tag.attr("selected", "selected");
				}
			}
			select.trigger("change");
		}
	});
}

gb.edit.ModifyLayerProperties.prototype.requestStyleLegend = function(options) {
	var params = {};
	var options = options;
	var legendTag = undefined;
	var src = "";

	if (!!options.legendTag) {
		legendTag = options.legendTag;
	} else {
		return;
	}

	if (!!options.serverName) {
		params.serverName = options.serverName;
	} else {
		return;
	}

	if (!!options.workspace) {
		params.workspace = options.workspace;
	}
	
	if (!!options.layerName) {
		params.layerName = options.layerName;
	} else {
		return;
	}
	
	if (!!options.style) {
		params.style = options.style;
	} else {
		return;
	}
	
	params.version = "1.0.0";
	params.format = "image/png";
	params.width = "20";
	params.height = "20";

	for(var i in params){
		src += "&" + i + "=" + params[i];
	}
	
	legendTag.attr("src", "geoserver/geoserverWMSGetLegendGraphic.ajax" + this.token + src);
}

gb.edit.ModifyLayerProperties.prototype.saveLayerProperties = function() {
	var that = this;
	var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
	var num_pattern = /[0-9]/;
	var layer = this.layer;
	var serverInfo = this.getServerInfo();

	if (special_pattern.test($("#proplName").val()) === true) {
		alert(this.translation.layerNameHint[this.locale]);
		return false;
	}
	if (special_pattern.test($("#proptitle").val()) === true) {
		alert(this.translation.layerTitleHint[this.locale]);
		return false;
	}
	
	var closeBtn = 
		$("<button>")
			.css({
				"float" : "right"
			})
			.addClass("gb-button")
			.addClass("gb-button-default")
			.text(this.translation.cancel[this.locale]);
	
	var okBtn = 
		$("<button>")
			.css({
				"float" : "right"
			})
			.addClass("gb-button")
			.addClass("gb-button-primary")
			.text(this.translation.confirm[this.locale]);

	var buttonArea = 
		$("<span>")
			.addClass("gb-modal-buttons")
			.append(okBtn)
			.append(closeBtn);
	
	var modalFooter = $("<div>").append(buttonArea);

	var body = 
		$("<div>")
			.append(this.translation.layerChangeHint[this.locale])
			.css({
				"max-height" : "300px",
				"overflow-y" : "auto"
			});
	
	var modal = new gb.modal.Base({
		"title" : "",
		"width" : 540,
		"autoOpen" : true,
		"body" : body,
		"footer" : modalFooter
	});

	$(closeBtn).click(function() {
		modal.close();
	});
	
	$(okBtn).click(function(){
		var arr = {
			"serverName" : serverInfo.geoserver,
			"workspace" : serverInfo.workspace,
			"datastore" : serverInfo.datastore,
			"originalName" : serverInfo.layername,
			"name" : $("#proplName").val(),
			"title" : $("#proptitle").val(),
			"abstractContent" : $("#propabstractContent").val(),
			"srs" : "EPSG:" + $("#propsrs").val(),
			"style": $("#styleSelect").find("option:selected").val()
		}

		$.ajax({
			url : "geoserver/updateLayer.ajax" + that.token,
			method : "POST",
			contentType : "application/json; charset=UTF-8",
			cache : false,
			data : JSON.stringify(arr),
			success : function(data, textStatus, jqXHR) {
				console.log(data);
				that.refer.refresh();
				that.checkOtreeLayer();
				modal.close();
			}
		});
	});
	
	return true;
}

gb.edit.ModifyLayerProperties.prototype.checkOtreeLayer = function() {
	var otree = this.refer.settings.geoserver.clientTree;
	var root = otree.get_node("#");
	var list = root.children_d;
	var id = this.getLayerId();
	var layername = $("#proplName").val();
	var info = this.serverInfo;
	var node, layer, source, params, git;
	
	for(var i = 0; i < list.length; i++){
		node = otree.get_node(list[i]);
		layer = otree.get_LayerById(list[i]);
		
		if(layer instanceof ol.layer.Tile){
			if(layer.get("id") === id){
				source = layer.getSource();
				params = source.getParams();
				git = layer.get("git");
				
				layer.set("id", info.geoserver + ":" + info.workspace + ":" + info.datastore + ":" + layername);
				layer.set("name", layername);
				node.text = layername;
				git.layers = layername;
				git.native = layername;
				source.updateParams({
					'LAYERS' : info.workspace + ":" + layername
				});
				
				otree.refresh();
				
				var arr = {
					"serverName" : info.geoserver,
					"workspace" : info.workspace,
					"geoLayerList" : [ layername ]
				}
				
				$.ajax({
					url : "geoserver/getGeoLayerInfoList.ajax" + this.token,
					method : "POST",
					contentType : "application/json; charset=UTF-8",
					cache : false,
					data : JSON.stringify(arr),
					beforeSend : function() { // 호출전실행
						$("body").css("cursor", "wait");
					},
					complete : function() {
						$("body").css("cursor", "default");
					},
					traditional : true,
					success : function(data, textStatus, jqXHR) {
						if (Array.isArray(data)) {
							if (data.length === 1) {
								source.updateParams({
									'SLD_BODY' : data[0].sld
								});
								
								otree.refresh();
							}
							$("body").css("cursor", "default");
						}
					}
				});
			}
		}
	}
}

/**
 * epsg 코드의 유효성을 설정한다.
 * 
 * @method gb.edit.ModifyLayerProperties#setValidEPSG
 * @param {Number}
 *            flag - EPSG 코드 유효성
 */
gb.edit.ModifyLayerProperties.prototype.setValidEPSG = function(flag) {
	$(this.validIconSpan).empty();

	if (flag === 2) {
		var validIcon = $("<i>").addClass("fas").addClass("fa-check");
		$(this.validIconSpan).append(validIcon);

		if ($(this.validIconSpan).hasClass("gb-geoserver-uploadshp-epsg-valid-icon")) {
			// $(this.validIconSpan).addClass("gb-geoserver-uploadshp-epsg-invalid-icon");
		} else {
			if ($(this.validIconSpan).hasClass("gb-geoserver-uploadshp-epsg-invalid-icon")) {
				$(this.validIconSpan).removeClass("gb-geoserver-uploadshp-epsg-invalid-icon");
			}
			if ($(this.validIconSpan).hasClass("gb-geoserver-uploadshp-epsg-loading-icon")) {
				$(this.validIconSpan).removeClass("gb-geoserver-uploadshp-epsg-loading-icon");
			}
			$(this.validIconSpan).addClass("gb-geoserver-uploadshp-epsg-valid-icon");
		}
		$(this.searchBtn).prop("disabled", false);
	} else if (flag === 1) {
		var validIcon = $("<i>").addClass("fas").addClass("fa-spinner").addClass("fa-spin");
		$(this.validIconSpan).append(validIcon);

		if ($(this.validIconSpan).hasClass("gb-geoserver-uploadshp-epsg-loading-icon")) {
			// $(this.validIconSpan).addClass("gb-geoserver-uploadshp-epsg-invalid-icon");
		} else {
			if ($(this.validIconSpan).hasClass("gb-geoserver-uploadshp-epsg-valid-icon")) {
				$(this.validIconSpan).removeClass("gb-geoserver-uploadshp-epsg-valid-icon");
			}
			if ($(this.validIconSpan).hasClass("gb-geoserver-uploadshp-epsg-invalid-icon")) {
				$(this.validIconSpan).removeClass("gb-geoserver-uploadshp-epsg-invalid-icon");
			}
			$(this.validIconSpan).addClass("gb-geoserver-uploadshp-epsg-loading-icon");
		}
		$(this.searchBtn).prop("disabled", true);
	} else if (flag === 0) {
		var validIcon = $("<i>").addClass("fas").addClass("fa-times");
		$(this.validIconSpan).append(validIcon);

		if ($(this.validIconSpan).hasClass("gb-geoserver-uploadshp-epsg-invalid-icon")) {
			// $(this.validIconSpan).addClass("gb-geoserver-uploadshp-epsg-invalid-icon");
		} else {
			if ($(this.validIconSpan).hasClass("gb-geoserver-uploadshp-epsg-valid-icon")) {
				$(this.validIconSpan).removeClass("gb-geoserver-uploadshp-epsg-valid-icon");
			}
			if ($(this.validIconSpan).hasClass("gb-geoserver-uploadshp-epsg-loading-icon")) {
				$(this.validIconSpan).removeClass("gb-geoserver-uploadshp-epsg-loading-icon");
			}
			$(this.validIconSpan).addClass("gb-geoserver-uploadshp-epsg-invalid-icon");
		}
		$(this.searchBtn).prop("disabled", true);
	}
};

/**
 * 베이스 좌표계를 변경하기 위한 EPSG 코드를 검색한다.
 * 
 * @method gb.edit.ModifyLayerProperties#searchEPSGCode
 * @param {String}
 *            code - 베이스 좌표계를 변경하기 위한 EPSG 코드
 */
gb.edit.ModifyLayerProperties.prototype.searchEPSGCode = function(code, apply, callback) {
	var that = this;

	$.ajax({
		url : 'https://epsg.io/?format=json&q=' + code,
		dataType : "jsonp",
		contentType : "application/json; charset=UTF-8",
		beforeSend : function() {
			// $("body").css("cursor", "wait");
		},
		complete : function() {
			// $("body").css("cursor", "default");
		},
		success : function(data) {
			console.log(data);
			var json = data;
			if (json.number_result !== 1) {
				that.setValidEPSG(0);
				console.error("no crs");
				return;
			} else if (json.number_result < 1) {
				that.setValidEPSG(0);
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

							if (code === codes) {
								that.setValidEPSG(2);
							}

							return;
						} else {
							console.error("no crs");
							that.setValidEPSG(0);
							return;
						}
					}
				}
			}
			return;
		},
		error : function(jqXHR, textStatus, errorThrown) {
			that.applyProjection(null, null, null, null, callback);
		}
	});
};