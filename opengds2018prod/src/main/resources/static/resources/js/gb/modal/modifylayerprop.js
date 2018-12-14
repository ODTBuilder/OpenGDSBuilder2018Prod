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

gb.edit.TDSTYLE = {
	"padding" : ".78571429em .78571429em"
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
	"width" : "100%",
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
	this.serverInfo = undefined;
	this.layerName = undefined;
	this.srs = undefined;
	this.workspaceList = [];
	this.layerRecord = options.layerRecord ? options.layerRecord : undefined;
	this.featureRecord = options.featureRecord ? options.featureRecord : undefined;
	this.refer = options.refer ? options.refer : undefined;
	this.token = options.token || "";
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
	this.htag.text("Layer Properties");
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
	$(closeBtn).text("Close");

	var okBtn = this.okBtn = $("<button>").attr({
		"type" : "button",
		"disabled" : false
	}).on("click", function() {
		// var opt = that.getDefinitionForm();
		if (!!that.saveLayerProperties()) {
			that.close();
			that.refresh();
		}
	});
	$(okBtn).addClass("btn");
	$(okBtn).addClass("btn-primary");
	$(okBtn).text("Save");

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
	var tr, key, value, label, labelKey, labelValue, select, selectTitle, selectField, option;
	for ( let i in list) {
		key = $("<td>").css(gb.edit.TDKEYSTYLE).text(i);
		if (list[i] instanceof Object) {
			value = $("<td>").css(gb.edit.TDSTYLE);
			for ( var j in list[i]) {
				labelKey = $("<span>").text(j);
				if (list[i][j] instanceof Object) {
					labelValue = $("<span>").text("[type:" + list[i][j].type + "]");
				} else {
					labelValue = $("<span>").text(list[i][j]);
				}
				label = $("<div>").css(gb.edit.LABELSTYLE).append(labelKey).append(labelValue);
				value.append(label);
			}
		} else {
			if (i === "lName" || i === "srs" || i === "title") {
				value = $("<td>").css(gb.edit.TDSTYLE).append($("<input>").addClass("layer-prop-input").attr({
					"id" : "prop" + i,
					"value" : list[i],
					"type" : "text",
					"readonly" : false
				}).css(gb.edit.INPUTSTYLE));
			} else if (i === "style") {
				selectTitle = $("<label>").css(gb.edit.SELTITLESTYLE).text("Workspace");
				select = $("<select id='styleWorkspaceSelect' class='gb-form'>").css(gb.edit.SELECTSTYLE);
				select.change(function() {
					var params = {};
					params.select = $("#styleSelect");
					params.serverName = that.serverInfo.geoserver;

					if ($(this).find("option:selected").val() === "workspace") {
						params.workspace = $(this).find("option:selected").text();
					}

					that.requestStyleList(params);
				});
				selectField = $("<div>").css(gb.edit.FIELDSTYLE).append(selectTitle).append(select);

				option = $("<option>").val("geoserver").text(this.serverInfo.geoserver);
				select.append(option);
				for (let w = 0; w < this.workspaceList.length; w++) {
					option = $("<option>").val("workspace").text(this.workspaceList[w]);
					select.append(option);
					if (list.styleWorkspace === this.workspaceList[w]) {
						option.attr("selected", "selected");
					}
				}
				value = $("<td>").css(gb.edit.TDSTYLE).css("display", "flex").append(selectField);

				selectTitle = $("<label>").css(gb.edit.SELTITLESTYLE).text("Style");
				select = $("<select id='styleSelect' class='gb-form'>").css(gb.edit.SELECTSTYLE);
				selectField = $("<div>").css(gb.edit.FIELDSTYLE).append(selectTitle).append(select);
				value.append(selectField);

				this.requestStyleList({
					select : select,
					serverName : this.serverInfo.geoserver,
					workspace : list.styleWorkspace,
					style : list[i]
				});
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

	if (!!options.select) {
		select = options.select;
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
		}
	});
}

gb.edit.ModifyLayerProperties.prototype.saveLayerProperties = function() {
	var that = this;
	var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
	var num_pattern = /[0-9]/;
	var layer = this.layer;
	var serverInfo = this.getServerInfo();

	if (special_pattern.test($("#proplName").val()) === true) {
		alert("레이어 이름에 특수문자는 허용되지않습니다.");
		return false;
	}
	if (special_pattern.test($("#proptitle").val()) === true) {
		alert("레이어 제목에 특수문자는 허용되지않습니다.");
		return false;
	}
	/*
	 * if(!$.isNumeric($("#propsrs").val())){ alert("EPSG 코드는 숫자만 입력 가능합니다.");
	 * return false; }
	 */

	var arr = {
		"serverName" : serverInfo.geoserver,
		"workspace" : serverInfo.workspace,
		"datastore" : serverInfo.datastore,
		"originalName" : serverInfo.layername,
		"name" : $("#proplName").val(),
		"title" : $("#proptitle").val(),
		"srs" : $("#propsrs").val()
	}

	$.ajax({
		url : "geoserver/updateLayer.ajax" + this.token,
		method : "POST",
		contentType : "application/json; charset=UTF-8",
		cache : false,
		data : JSON.stringify(arr),
		success : function(data, textStatus, jqXHR) {
			console.log(data);
		}
	});

	return true;
}