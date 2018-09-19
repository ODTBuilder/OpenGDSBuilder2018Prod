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
gb.edit.ModifyLayerProperties = function(obj) {
	var that = this;
	var options = obj;
	this.window;
	this.format = undefined;
	this.type = undefined;
	this.info = undefined;
	this.layer = undefined;
	this.layerName = undefined;
	this.srs = undefined;
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

	var formTag = $("<form>");
	
	var group1 = this.createFormGroup({
		label: {
			"text": "Layer Name"
		},
		input: {
			"class": "form-control",
			"id": "layer-prop-name",
			"type": "text"
		}
	});
	
	var group2 = this.createFormGroup({
		label: {
			"text": "Geometry Type"
		},
		input: {
			"class": "form-control-plaintext",
			"id": "layer-prop-geom",
			"readonly": true,
			"type": "text"
		}
	});
	
	var group3 = this.createFormGroup({
		label: {
			"text": "Geometry Key"
		},
		input: {
			"class": "form-control-plaintext",
			"id": "layer-prop-geomkey",
			"readonly": true,
			"type": "text"
		}
	});
	
	var group4 = this.createFormGroup({
		label: {
			"text": "SRS"
		},
		input: {
			"class": "form-control",
			"id": "layer-prop-srs",
			"readonly": false,
			"type": "text"
		}
	});
	
	var group5 = this.createFormGroup({
		label: {
			"text": "Geoserver"
		},
		input: {
			"class": "form-control-plaintext",
			"id": "layer-prop-geoserver",
			"readonly": true,
			"type": "text"
		}
	});
	
	var group6 = this.createFormGroup({
		label: {
			"text": "Workspace"
		},
		input: {
			"class": "form-control-plaintext",
			"id": "layer-prop-workspace",
			"readonly": true,
			"type": "text"
		}
	});
	
	formTag.append(group1).append(group2).append(group3).append(group4).append(group5).append(group6);

	this.body = $("<div>").append(formTag);
	
	// that.setForm("ngi", "layer");
	$(this.body).addClass("modal-body");
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
		"disabled": true
	}).on("click", function() {
		//var opt = that.getDefinitionForm();
		that.close();
		that.refresh();
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
	
	$(".layer-prop-input").on("keyup", function(e){
		var bool = true;
		var id = e.target.id;
		var value = e.target.value;
		
		if(id === "layer-prop-srs"){
			if(value !== that.srs){
				bool = false;
			}
		}
		
		if(id === "layer-prop-name"){
			if(value !== that.layerName){
				bool = false;
			}
		}
		
		that.okBtn.attr({
			"disabled": bool
		});
	});
}
gb.edit.ModifyLayerProperties.prototype.createFormGroup = function(obj){
	var options = obj || false;
	if(!options){
		return;
	}
	
	var label = options.label;
	
	var input = options.input;
	
	var labelTag = 
		$("<label>")
			.addClass("col-sm-2 col-form-label")
			.attr({
				"for": input.id
			})
			.text(label.text);
	
	var inputTag = 
		$("<input>")
			.addClass("layer-prop-input")
			.addClass(input["class"])
			.attr({
				"id": input.id,
				"type": input.type,
				"readonly": input.readonly || false
			});
	
	var inputDiv = $("<div>").addClass("col-sm-10").append(inputTag);
	var div = $("<div>").addClass("form-group row").append(labelTag).append(inputDiv);
	
	return div;
}

gb.edit.ModifyLayerProperties.prototype.saveLayerInfo = function(){
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
	this.setInformation(layer);
	this.setForm();
};
gb.edit.ModifyLayerProperties.prototype.getLayer = function() {
	return this.layer;
};
gb.edit.ModifyLayerProperties.prototype.setInformation = function(info) {
	this.information = info;
};
gb.edit.ModifyLayerProperties.prototype.getInformation = function() {
	return this.information;
};


gb.edit.ModifyLayerProperties.prototype.setForm = function() {
	var info = this.getInformation();
	this.getImageTileInfo("geoserver/getGeoLayerInfoList.ajax", info);
};
/*gb.edit.ModifyLayerProperties.prototype.initGeomForm = function(type, selected) {
	var select = $("<select>").prop({
		"disabled" : true
	}).addClass("form-control");
	if (type === "dxf") {
		var option1 = $("<option>").text("LWPolyline");
		var option2 = $("<option>").text("Polyline");
		var option3 = $("<option>").text("Insert");
		var option4 = $("<option>").text("Text");
		$(select).append(option1).append(option2).append(option3).append(option4);
	} else if (type === "ngi") {
		var option1 = $("<option>").text("Point");
		var option2 = $("<option>").text("LineString");
		var option3 = $("<option>").text("Polygon");
		var option4 = $("<option>").text("Text");
		$(select).append(option1).append(option2).append(option3).append(option4);
	}
	$(select).val(selected);
	$(this.geomForm).empty();
	var tp = $("<p>").text("Type");
	$(this.geomForm).append(tp).append(select);
};
gb.edit.ModifyLayerProperties.prototype.initAttrForm = function(attrs) {
	if (!Array.isArray(attrs)) {
		return;
	}
	var that = this;
	var htd1 = $("<td>").text("Name");
	var htd2 = $("<td>").text("Type");
	var htd3 = $("<td>").text("Not Null");
	var htd4 = $("<td>").text("Unique");
	var thd = $("<thead>").append(htd1).append(htd2).append(htd3).append(htd4);

	this.geomFormBody = $("<tbody>");

	for (var i = 0; i < attrs.length; i++) {
		var key = $("<input>").addClass("form-control").attr({
			"type" : "text"
		}).val(attrs[i].fieldName);
		var td1 = $("<td>").append(key);

		var opt1 = $("<option>").text("Integer");
		var opt2 = $("<option>").text("Double");
		var opt3 = $("<option>").text("String");
		var opt4 = $("<option>").text("Date");
		var opt5 = $("<option>").text("Boolean");
		var type = $("<select>").addClass("form-control").append(opt1).append(opt2).append(opt3).append(opt4).append(opt5).val(
				attrs[i].type).prop("disabled", true);
		var td2 = $("<td>").append(type);

		var nullable = $("<input>").attr({
			"type" : "checkbox"
		}).prop("checked", attrs[i].nullable ? false : true).prop("disabled", true);
		var td3 = $("<td>").append(nullable);

		var unique = $("<input>").attr({
			"type" : "checkbox"
		}).prop("checked", attrs[i].isUnique ? true : false).prop("disabled", true);
		var td4 = $("<td>").append(unique);

		var tr1 = $("<tr>").append(td1).append(td2).append(td3).append(td4);
		$(this.geomFormBody).append(tr1);
	}

	var table = $("<table>").addClass("table").addClass("text-center").append(thd).append(this.geomFormBody);
	var addBtn = $("<input>").addClass("gitbuilder-createlayer-addattr").addClass("btn").addClass("btn-default").attr({
		"type" : "button",
		"value" : "Add Attribute"
	}).on("click", function() {
		console.log("attr");
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
		var tr1 = $("<tr>").append(td1).append(td2).append(td3).append(td4);
		$(that.geomFormBody).append(tr1);
	});
	$(this.attrForm).empty();
	var tp = $("<p>").text("Attribute");
	$(this.attrForm).append(tp).append(table).append(addBtn);
};
gb.edit.ModifyLayerProperties.prototype.initExpertForm = function() {
	var that = this;
	var info = this.getInformation();
	var htd1 = $("<td>").text("Version");
	var htd2 = $("<td>").text("Dimension");
	var htd3 = $("<td>").text("Represent");
	var thd = $("<thead>").append(htd1).append(htd2).append(htd3);

	var veropt1 = $("<option>").text("1");
	var veropt2 = $("<option>").text("2");
	this.ver = $("<select>").addClass("form-control").append(veropt1).append(veropt2).val(info.getNGIVersion());
	var td1 = $("<td>").append(this.ver);

	var dimopt1 = $("<option>").text("2");
	var dimopt2 = $("<option>").text("3");
	this.dim = $("<select>").addClass("form-control").append(dimopt1).append(dimopt2).val(info.getNGIDim());
	var td2 = $("<td>").append(this.dim);

	this.rep = $("<input>").addClass("form-control").attr({
		"type" : "text"
	}).val(info.getNGIRep());
	var td3 = $("<td>").append(this.rep);

	var tr1 = $("<tr>").append(td1).append(td2).append(td3);

	this.expertFormBody = $("<tbody>").append(tr1);

	var table = $("<table>").addClass("table").addClass("text-center").append(thd).append(this.expertFormBody);

	var htd12 = $("<td>").text("MinX");
	var htd22 = $("<td>").text("MinY");
	var htd32 = $("<td>").text("MaxX");
	var htd42 = $("<td>").text("MaxY");
	var thd2 = $("<thead>").append(htd12).append(htd22).append(htd32).append(htd42);

	this.minx = $("<input>").addClass("form-control").attr({
		"type" : "text"
	}).val(info.getMbound()[0][0]);
	var td12 = $("<td>").append(this.minx);
	this.miny = $("<input>").addClass("form-control").attr({
		"type" : "text"
	}).val(info.getMbound()[0][1]);
	var td22 = $("<td>").append(this.miny);
	this.maxx = $("<input>").addClass("form-control").attr({
		"type" : "text"
	}).val(info.getMbound()[1][0]);
	var td32 = $("<td>").append(this.maxx);
	this.maxy = $("<input>").addClass("form-control").attr({
		"type" : "text"
	}).val(info.getMbound()[1][1]);
	var td42 = $("<td>").append(this.maxy);

	var tr12 = $("<tr>").append(td12).append(td22).append(td32).append(td42);

	this.expertFormBodyUnder = $("<tbody>").append(tr12);

	var table2 = $("<table>").addClass("table").addClass("text-center").append(thd2).append(this.expertFormBodyUnder);

	$(this.expertForm).empty();
	var tp = $("<p>").text("NGI Setting");
	$(this.expertForm).append(tp).append(table).append(table2);
};
gb.edit.ModifyLayerProperties.prototype.getDefinitionForm = function() {
	if (this.type === "mapsheet") {

	} else if (this.type === "layer") {
		if ($(this.layerNameInput).val().replace(/(\s*)/g, '') === "") {
			console.error("no layer name");
			return;
		}
		var layer = this.getLayer();
		var oldLayerId = layer.get("id");
		var info = layer.get("git").information;

		if (info.getName() !== $(this.layerNameInput).val().replace(/(\s*)/g, '')) {
			info.setName($(this.layerNameInput).val().replace(/(\s*)/g, ''));
			layer.set("id", info.updateId());
			layer.set("name", $(this.layerNameInput).val().replace(/(\s*)/g, ''));
		}

		if (info.getMbound()[0][0] !== $(this.minx).val().replace(/(\s*)/g, '') || info.getMbound()[0][1] !== $(this.miny).val()
				|| info.getMbound()[1][0] !== $(this.maxx).val() || info.getMbound()[1][0] !== $(this.maxy).val()) {
			info.setMbound([ [ $(this.minx).val(), $(this.miny).val() ], [ $(this.maxx).val(), $(this.maxy).val() ] ]);
		}

		if (info.getNGIDim() !== $(this.dim).val().replace(/(\s*)/g, '')) {
			info.setNGIDim($(this.dim).val().replace(/(\s*)/g, ''));
		}

		if (info.getNGIVersion() !== $(this.ver).val().replace(/(\s*)/g, '')) {
			info.setNGIVersion($(this.ver).val().replace(/(\s*)/g, ''));
		}

		if (info.getNGIRep() !== $(this.rep).val().replace(/(\s*)/g, '')) {
			info.setNGIRep($(this.rep).val().replace(/(\s*)/g, ''));
		}

		if (info.getFormat() === "ngi") {
			var attrs = $(this.attrForm).find("tr");
			var oattrs = info.getAttributes();
			for (var i = 0; i < attrs.length; i++) {
				if ($(attrs[i]).children().eq(0).find("input:text").val().replace(/(\s*)/g, '') === "") {
					console.error("blank key name");
					break;
				}

				var oattr = oattrs[i];
				if (!oattr) {
					var nattr = new gb.layer.Attribute({
						originFieldName : $(attrs[i]).children().eq(0).find("input:text").val().replace(/(\s*)/g, ''),
						fieldName : $(attrs[i]).children().eq(0).find("input:text").val().replace(/(\s*)/g, ''),
						type : $(attrs[i]).children().eq(1).find("select").val(),
						decimal : $(attrs[i]).children().eq(1).find("select").val() === "Double" ? 30 : null,
						size : 256,
						isUnique : $(attrs[i]).children().eq(3).find("input:checkbox").prop("checked") ? true : false,
						nullable : $(attrs[i]).children().eq(2).find("input:checkbox").prop("checked") ? false : true,
						isNew : true
					});
					info.setAttribute(nattr);
				} else {
					if (oattr.getFieldName() !== $(attrs[i]).children().eq(0).find("input:text").val().replace(/(\s*)/g, '')) {
						oattr.setFieldName($(attrs[i]).children().eq(0).find("input:text").val().replace(/(\s*)/g, ''));
					}
				}
				layer.get("git").attribute = info.getAttributesJSON();
			}
		}
		this.getLayerRecord().update(info.getFormat(), info.getSheetNumber(), layer, oldLayerId);
	}
};*/
gb.edit.ModifyLayerProperties.prototype.getImageTileInfo = function(url, layer) {
	var that = this;
	var arr = {
		"serverName": layer.get("git").geoserver,
		"workspace": layer.get("git").workspace,
		"geoLayerList" : [ layer.get("name") ]
	}
	var names = [];
	// console.log(JSON.stringify(arr));
	var info;
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
			console.log(data);
			if (Array.isArray(data)) {
				if (data.length === 1) {
					var arra = [];
					/*info = new gb.layer.LayerInfo({
						oldName : that.getRefer().get_node(data2[0].lName).text,
						id : data2[0].lName,
						sheetNum : that.getRefer().get_node(refer.get_node(data2[0].lName).parent).text,
						attributes : 5,
						format : 6,
						epsg : 7,
						ngi : {
							"version" : 8,
							"dim" : 9,
							"represent" : 10
						},
						mbound : 11,
						lbound : 12,
						isNew : 13,
						geometry : 14
					});*/
					
					that.layerName = data[0].lName;
					that.srs = data[0].srs;
					
					$("#layer-prop-name").val(data[0].lName);
					$("#layer-prop-geom").val(data[0].geomType);
					$("#layer-prop-geomkey").val(data[0].geomkey);
					$("#layer-prop-srs").val(data[0].srs);
					$("#layer-prop-geoserver").val(arr.serverName);
					$("#layer-prop-workspace").val(arr.workspace);
				}

				$("body").css("cursor", "default");
			}
		}
	});
};