var gb;
if (!gb)
	gb = {};
if (!gb.footer)
	gb.footer = {};

(function($){
	/**
	 * feature list table 객체를 정의한다.
	 * 
	 * @author hochul.kim
	 * @date 2018. 06.05
	 * @version 0.01
	 * @class gb.footer.FeatureList
	 * @constructor
	 */
	gb.footer.FeatureList = function(obj) {
		obj.title = "";
		gb.footer.Base.call(this, obj);
		
		var that = this;
		
		var options = obj || {};
		
		this.map = options.map || undefined;
		
		this.wfstURL = options.wfstURL || '';
		
		this.layerInfoURL = options.layerInfoURL || '';
		
		this.getFeatureURL = options.getFeatureURL || '';
		
		this.locale = options.locale || "en";
		this.translation = {
			"notNullHint" : {
				"ko" : "빈 값이 허용되지않습니다.",
				"en" : "null values ​​are not allowed."
			},
			"intValueHint" : {
				"ko" : "정수 타입의 값을 입력해야합니다.",
				"en" : "You must enter a value for Integer type."
			},
			"doubleValueHint" : {
				"ko" : "실수 타입의 값을 입력해야합니다.",
				"en" : "You must enter a value for double type."
			},
			"boolValueHint" : {
				"ko" : "Boolean 타입의 값을 입력해야합니다.",
				"en" : "You must enter a value for boolean type."
			}
		}
		
		/**
		 * 현재 선택된 레이어의 JSTree ID
		 */
		this.selectedTreeId = undefined;
		
		/**
		 * 현재 선택된 레이어
		 */
		this.selectedLayer = undefined;
		
		/**
		 * 현재 선택된 객체
		 */
		this.selectedFeature = undefined;
		
		/**
		 * feature 요청 parameter
		 */
		this.parameters = undefined;
		
		/**
		 * scrollTop height
		 */
		this.scrollTop = undefined;
		
		/**
		 * JSTree의 treeid가 key이고 value는 feature의 속성 key값인 col, feature의 속성값인 data로 구성
		 */
		this.attrList = {};
		
		/**
		 * 속성값이 수정된 feature들의 집합
		 */
		this.editedFeature = {};
		
		/**
		 * DataTable ID 고유번호
		 */
		this.countId = 0;
		
		/**
		 * feature 요청 리스트 시작 index
		 */
		this.startIndex = 0;
		
		/**
		 * feature 요청 리스트 최대 개수
		 */
		this.maxFeatures = 10;
		
		/**
		 * footer content에 생성할 table element의 ID
		 */
		this.tableId = options.tableId || "featureListTable";
		
		this.tableTitles = options.tableTitles || [];
		
		this.tableData = options.tableData || [];
		
		this.content = options.content;
			
		this.titleAreaStyle = {
			"position": "absolute",
			"width": "100%",
			"z-index": "2",
			"padding": "8px 16px"
		};
		
		this.contentAreaStyle = {
			"height": "100%"
		};
		
		this.backgroundStyle = {
			"display": "none",
			"position": "absolute",
			"z-index": "2",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"overflow": "auto",
			"background-color": "rgb(0, 0, 0)",
			"background-color": "rgba(0, 0, 0, 0.4)"
		};
		
		this.tableElement = this.createTableElement();
		
		this.backgroundDiv = $("<div class='footer-background'>");
		this.adjustStyle_(this.backgroundDiv, this.backgroundStyle);
		this.targetElement.append(this.backgroundDiv);
		
		this.dataTable = this.tableElement.DataTable({
			columns: [
				{title: 'Column1'},
				{title: 'Column2'}
			],
			data: [
				[
					'Row 1 Data 1',
					'Row 1 Data 2'
				]
			],
			info: false,
			searching: false,
			paging: false,
			scrollX: true,
			scrollY: true,
			scrollCollapse: true,
			dom: "Bfrtip",
			select: "single",
			responsive: true,
			altEditor: true,
			buttons: [{
				extend: "selected",
				text: "<i class='fas fa-edit fa-lg' style=color: #bfbfbf;'></i>",
				name: "edit"
			}]
		});
		
		this.tableElement.find("tbody > tr").css("background-color", "transparent");
		this.footerTag.find("label").css("color", "#DDD");
		
		window.addEventListener("resize", function () {
			that.onResize();
		}, false);
		
		$(document).ready(function(){
			that.onResize();
		});
		
		this.footerTag.on("footeropen", function(){
			var isEdit = gb? (gb.module ? gb.module.isEditing : undefined) : undefined;
			var tree = $('.gb-article-body.jstreeol3').length === 1 ? $('.gb-article-body.jstreeol3') : undefined;
			if(isEdit instanceof Object){
				if(isEdit.get()){
					that.close();
					isEdit.alert();
					return
				}
			}
			
			if(tree){
				var layers = tree.jstreeol3("get_selected_layer");
				if(layers.length === 1){
					that.updateFeatureList(layers[0]);
				}
			}
			
			that.onResize();
		});
		
		this.footerTag.on("footerclose", function(){
			if(!$.isEmptyObject(that.editedFeature)){
				that.openSaveModal();
			} else {
				that.tableElement = that.createTableElement();
				that.dataTable = that.tableElement.DataTable({
					columns: [
						{title: 'Column1'},
						{title: 'Column2'}
					],
					data: [
						[
							'Row 1 Data 1',
							'Row 1 Data 2'
						]
					],
					info: false,
					paging: false,
					searching: false,
					scrollX: true,
					scrollY: true,
					scrollCollapse: true
				});
				that.tableElement.find("tbody > tr").css("background-color", "transparent");
				that.footerTag.find("label").css("color", "#DDD");
			}
		});
		
		// Div style change event 추가
		var orig = $.fn.css;
		
		$.fn.css = function() {
			var result = orig.apply(this, arguments);
			$(this).trigger('stylechange');
			return result;
		}
		
		// footer tag의 css style 변경시 실행되는 이벤트 함수
		this.footerTag.on("stylechange", function(e){
			var display = this.style.display;
			
			// feature list footer tag의 display none으로 설정되면 background의 display도 none으로 변경
			if(display === "none"){
				that.backgroundDiv.css("display", "none");
			} else {
				that.backgroundDiv.css("display", "block");
			}
		});
	}
	
	// gb.footer.Base 상속
	gb.footer.FeatureList.prototype = Object.create(gb.footer.Base.prototype);
	gb.footer.FeatureList.prototype.constructor = gb.footer.FeatureList;
	
	gb.footer.FeatureList.prototype.createTableElement = function(){
		this.removeTableElement();
		
		var that = this;
		var num = ++this.countId;
		
		var table = $("<table>").attr("id", this.tableId + num).css("width", "100%");
		
		table.on("click", "tr", function(){
			var data = that.dataTable.row(this).data();
			if(data.length === 0){
				return;
			}
			
			if(data[0].getGeometry === undefined){
				return;
			}
			
			that.map.getView().fit(data[0].getGeometry().getExtent(), that.map.getSize());
		});
		
		this.createFooter({
			title: this.title,
			content: table
		});
		
		return table;
	}
	
	gb.footer.FeatureList.prototype.removeTableElement = function(){
		if(!this.tableElement){
			return;
		}
		this.tableElement.off("click", "tr");
		this.tableElement.remove();
		delete this.tableElement;
		
		$(document).off("click", "#addRowBtn");
		$(document).off("click", "#editRowBtn");
		$(document).off("click", "#deleteRowBtn");
	}
	
	/**
	 * feature list layout 생성 클릭 이벤트
	 * @param {jquery} target Target
	 */
	gb.footer.FeatureList.prototype.clickEvent = function(target){
		var that = this;
		$(target).click(function(){
			that.createFooter({
				title: that.title,
				content: that.tableElement
			});
		});
	}
	
	/**
	 * 전체 객체 리스트 테이블 크기 재갱신
	 */
	gb.footer.FeatureList.prototype.onResize = function(){
		if(!!this.dataTable){
			this.dataTable.columns.adjust().draw();
			this.resizeTbody();
		}
	}
	
	/**
	 * tbody height 갱신
	 */
	gb.footer.FeatureList.prototype.resizeTbody = function(){
		var a = this.footerTag.find(".footer-content").height();
		var b = $("#" + this.tableId + this.countId + "_wrapper").find(".dt-buttons").height();
		var c = $("#" + this.tableId + this.countId + "_wrapper .dataTables_scrollHead").height();
		
		var height = a - b - c;
		
		this.footerTag.find(".footer-content #" + this.tableId + this.countId + "_wrapper .dataTables_scrollBody").css("max-height", height + "px");
	}
	
	/**
	 * Feature Attribute 편집 저장 여부 알림창을 생성한다.
	 */
	gb.footer.FeatureList.prototype.openSaveModal = function(){
		var that = this;

		var row2 = $("<div>").addClass("row").append(
		"변경사항이 있습니다. 저장하시겠습니까?");

		var well = $("<div>").addClass("well").append(row2);

		var closeBtn = $("<button>").css({
			"float" : "right"
		}).addClass("gb-button").addClass("gb-button-default").text("Cancel");
		var okBtn = $("<button>").css({
			"float" : "right"
		}).addClass("gb-button").addClass("gb-button-primary").text("Save");

		var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn)
				.append(closeBtn);
		var modalFooter = $("<div>").append(buttonArea);

		var gBody = $("<div>").append(well).css({
			"display" : "table",
			"width" : "100%"
		});
		var openSaveModal = new gb.modal.Base({
			"title" : "저장",
			"width" : 540,
			"height" : 250,
			"autoOpen" : true,
			"body" : gBody,
			"footer" : modalFooter
		});
		$(closeBtn).click(function() {
			that.attrList = {};
			that.editedFeature = {};
			openSaveModal.close();
		});
		$(okBtn).click(function() {
			that.sendWFSTTransaction(openSaveModal);
		});
	}
	
	gb.footer.FeatureList.prototype.searchTable = function(column, value){
		var that = this;
		var col = column,
			val = value,
			vectorData = {};
		var list = this.attrList;
		var treeid = this.selectedTreeId;
		var features = list[treeid].features;
		this.startIndex = 0;
		
		if(!this.parameters){
			features = list[treeid].all;
			if(val === ""){
				list[treeid].searchResults = undefined;
			} else {
				for(var i in features){
					if(features[i].get(col).includes(val)){
						vectorData[i] = features[i]
					}
				}
				list[treeid].searchResults = vectorData;
			}
			this.updateTable(treeid);
			return;
		}
		
		this.parameters.startIndex = this.startIndex;
		
		if(!val){
			this.updateFeatureList(this.selectedLayer);
		} else {
			this.parameters["cql_filter"] = encodeURI(col + " LIKE '%" + val + "%'");
			$.ajax({
				url : this.getFeatureURL,
				type : "GET",
				contentType : "application/json; charset=UTF-8",
				data : this.parameters,
				dataType : "JSON",
				success : function(errorData, textStatus, jqXHR) {
					var format = new ol.format.GeoJSON().readFeatures(JSON.stringify(errorData));
					var th = [],
						td = [],
						data = {},
						col = [];
					
					for(var i in format){
						if(!th.length){
							col = format[i].getKeys();
						}
						data[format[i].getId()] = format[i];
					}
					
					if(format.length === 0){
						col.push("No Data");
						data[0] = {
							get: function(e){
								return "No Data";
							}
						};
					}
					
					list[treeid].col = col;
					list[treeid].features = data;
					
					that.requestLayerInfo(list[treeid].serverName, list[treeid].workspace, list[treeid].layerName, treeid);
					that.updateTable(treeid);
					
					console.log(that.parameters);
					console.log(errorData);
				},
				error: function(jqXHR, textStatus, errorThrown){
					console.log(errorThrown);
				}
			});
		}
	}
	
	/**
	 * DataTable Table 내용 갱신
	 * @param {String} treeid
	 */
	gb.footer.FeatureList.prototype.updateTable = function(treeid){
		var that = this;
		this.selectedTreeId = treeid;
		
		var layer = that.selectedLayer;
		var git = layer.get("git") || {};
		var attribute = git.attribute;
		var opt = {};
		
		for(var i = 0; i < attribute.length; i++){
			opt[attribute[i].fieldName] = {};
			opt[attribute[i].fieldName].unique = attribute[i].isUnique || false;
			opt[attribute[i].fieldName].nullable = attribute[i].nullable || false;
			opt[attribute[i].fieldName].type = attribute[i].type || "String";
		}
		
		var col = this.attrList[treeid].col;
		var features;
		if(!this.attrList[treeid].searchResults){
			features = this.attrList[treeid].features;
		} else {
			features = this.attrList[treeid].searchResults;
		}
		var column = [],
			data= [];
		var select = $("<select>").addClass("gb-form").css({
			"float": "right",
			"width": "auto",
			"margin-right": "10px"
		});
		var icon = $("<i>").addClass("fas fa-search fa-lg");
		var button = $("<button>").addClass("gb-button gb-button-primary").css({
			"float": "right"
		}).append(icon);
		var input = $("<input>").addClass("gb-input").css({
			"float": "right",
			"border": "1px solid rgba(34, 36, 38, 0.15)",
			"border-radius": "0.285714rem",
			"line-height": "2px",
			"color": "#555",
			"padding": "8px 4px"
		});
		
		button.click(function(e){
			that.searchTable(select.find("option:selected").val(), input.val());
		});
		
		input.keypress(function(e){
			if(e.which == 13){
				that.searchTable(select.find("option:selected").val(), input.val());
			}
		});
		
		var pattern, errorMsg;
		for(var i = 0; i < col.length; i++){
			if(col[i] === "geometry"){
				column.push({
					title: col[i],
					visible: false,
					type: "hidden"
				});
			} else {
				if(opt[col[i]].type === "Integer" || opt[col[i]].type === "Number" || opt[col[i]].type === "Long"){
					errorMsg = this.translation.intValueHint[this.locale];
					if(opt[col[i]].nullable){
						pattern = "^-?[0-9]*$";
					} else {
						pattern = "^-?[0-9]+$";
						errorMsg += "\n" + this.translation.notNullHint[this.locale];
					}
					
				} else if(opt[col[i]].type === "Double"){
					errorMsg = this.translation.doubleValueHint[this.locale];
					if(opt[col[i]].nullable){
						pattern = "^([-+]?[0-9]*\.?[0-9]+)*$";
					} else {
						pattern = "^([-+]?[0-9]*\.?[0-9]+)+$";
						errorMsg += "\n" + this.translation.notNullHint[this.locale];
					}
				} else if(opt[col[i]].type === "Boolean"){
					if(opt[col[i]].nullable){
						pattern = "^true|false$";
					} else {
						pattern = "^(true|false)*$";
					}
					errorMsg = this.translation.boolValueHint[this.locale];
				} else {
					if(opt[col[i]].nullable){
						pattern = ".*";
					} else {
						pattern = ".+";
						errorMsg = this.translation.notNullHint[this.locale];
					}
				}
				column.push({
					title: col[i],
					pattern: pattern,
					errorMsg: errorMsg
				});
				
				select.append($("<option>").val(col[i]).text(col[i]));
			}
		}
		
		if(col.length === 0){
			column.push({
				title: "No Data"
			});
			data.push(["No Data"]);
		}
		
		for(var id in features){
			var arr = [];
			for(var i = 0; i < col.length; i++){
				if(col[i] === "geometry"){
					arr.push(features[id]);
				} else {
					arr.push(features[id].get(col[i]));
				}
			}
			data.push(arr);
		}
		
		this.dataTable.clear();
		this.dataTable.destroy();
		delete this.dataTable;
		this.tableElement = this.createTableElement();
		
		this.dataTable = this.tableElement.DataTable({
			columns: column,
			data: data,
			info: false,
			searching: false,
			paging: false,
			scrollX: true,
			scrollY: "100%",
			scrollCollapse: true,
			dom: "Bfrtip",
			select: "single",
			responsive: false,
			altEditor: true,
			buttons: [{
				extend: "selected",
				text: "<i class='fas fa-edit fa-lg' style=color: #bfbfbf;'></i>",
				name: "edit"
			}
			/*{
				extend: "selected",
				text: "Delete",
				name: "delete"
			}*/],
			onEditRow: function(datatable, rowdata, success, error){
				var feature, keys;
				for(var i in rowdata){
					if(rowdata[i] instanceof ol.Feature){
						feature = rowdata[i];
						keys = rowdata[i].getKeys();
						continue;
					}
					
					if(feature instanceof ol.Feature){
						feature.set(keys[i], rowdata[i]);
					}
				}
				
				if(!(feature instanceof ol.Feature)){
					return;
				}
				
				var layerInfo = that.attrList[that.selectedTreeId];
				var geomKey = that.attrList[that.selectedTreeId].geomKey;
				
				if(!!geomKey){
					feature.setGeometryName(geomKey);
					feature.set(geomKey, feature.get("geometry"));
				}
				
				if(layerInfo.serverName){
					if(!that.editedFeature[that.selectedTreeId]){
						that.editedFeature[that.selectedTreeId] = {};
						that.editedFeature[that.selectedTreeId].serverName = layerInfo.serverName;
						that.editedFeature[that.selectedTreeId].workspace = layerInfo.workspace;
						that.editedFeature[that.selectedTreeId].layerName = layerInfo.layerName;
					}
					
					that.editedFeature[that.selectedTreeId].feature = feature;
				}
				
				success(rowdata);
			}
		});
		
		this.footerTag.find(".dt-buttons").css({"z-index": "3"});
		this.footerTag.find(".footer-header").empty();
		this.footerTag.find(".footer-header").append(button);
		this.footerTag.find(".footer-header").append(input);
		this.footerTag.find(".footer-header").append(select);
		
		$("#" + this.tableId + this.countId).parent().scroll(function(){
			if($(this).scrollTop() + $(this)[0].clientHeight == $(this).children(":first").height()){
				if(that.scrollTop !== $(this).scrollTop()){
					that.scrollTop = $(this).scrollTop();
					that.nextFeatureList();
				}
			}
		});
		
		this.tableElement.find("tbody > tr").css("background-color", "transparent");
		this.footerTag.find("label").css("color", "#DDD");
		this.onResize();
	}
	
	gb.footer.FeatureList.prototype.updateFeatureList = function(layer){
		this.startIndex = 0;
		this.scrollTop = 0;
		
		this.contentTag.append($("<div id='feature-list-loading'>").css({
			"z-index" : "10",
			"position" : "absolute",
			"left" : "0",
			"top" : "0",
			"width" : "100%",
			"height" : "100%",
			"text-align" : "center",
			"background-color" : "rgba(0, 0, 0, 0.4)"
		}).append($("<i>").addClass("fas fa-spinner fa-spin fa-5x").css({
			"position" : "relative",
			"top" : "50%",
			"margin-top" : "-5em"
		})));
		
		var options = layer.get("git") || {};
		
		var list = this.attrList;
		
		var treeid = layer.get("treeid");
		
		this.selectedLayer = layer;
		this.parameters = undefined;
		
		if(layer instanceof ol.layer.Vector){
			var data = [],
				paging = {},
				col = [],
				count = 0,
				features = layer.getSource().getFeatures();
			
			list[treeid] = {};
			
			for(var i in features){
				if(!col.length){
					col = features[i].getKeys();
					list[treeid].geomKey = features[i].getGeometryName();
				}
				data.push(features[i]);
				if(count < this.maxFeatures){
					paging[features[i].getId()] = features[i];
				}
				count++;
			}
			list[treeid].col = col;
			list[treeid].features = paging;
			list[treeid].all = data;
			this.updateTable(treeid);
			$("#feature-list-loading").remove();
			return;
		}
		
		/*if(!!this.attrList[treeid]){
			this.updateTable(treeid);
			return;
		}*/
		
		var geoserver = options.geoserver;
		if(!geoserver){
			console.error('gb.footer.FeatureList: geoserver name is required');
			return;
		}
		
		var workspace = options.workspace;
		if(!workspace){
			console.error('gb.footer.FeatureList: workspace name is required');
			return;
		}
		
		var layerName = layer.get("name");
		if(!layerName){
			console.error('gb.footer.FeatureList: layer name is required');
			return;
		}
		
		this.parameters = {
			"serverName": geoserver,
			"workspace": workspace,
			"version" : gb.module.serviceVersion.WFS,
			"typeName" : layerName,
			"outputformat" : "application/json",
			"maxFeatures": this.maxFeatures,
			"startIndex": this.startIndex
		};

		var that = this;
		$.ajax({
			url : this.getFeatureURL,
			type : "GET",
			contentType : "application/json; charset=UTF-8",
			data : this.parameters,
			dataType : "JSON",
			success : function(errorData, textStatus, jqXHR) {
				var format = new ol.format.GeoJSON().readFeatures(JSON.stringify(errorData));
				var th = [],
					td = [],
					data = {},
					col = [];
				
				for(var i in format){
					if(!th.length){
						col = format[i].getKeys();
					}
					data[format[i].getId()] = format[i];
				}
				
				list[treeid] = {};
				list[treeid].serverName = geoserver;
				list[treeid].workspace = workspace;
				list[treeid].layerName = layerName;
				list[treeid].col = col;
				list[treeid].features = data;
				
				that.requestLayerInfo(geoserver, workspace, layerName, treeid);
				that.updateTable(treeid);
				$("#feature-list-loading").remove();
				//that.setTitle(layerName);
			},
			error: function(jqXHR, textStatus, errorThrown){
				$("#feature-list-loading").remove();
				console.log(errorThrown);
			}
		});
	}
	
	gb.footer.FeatureList.prototype.nextFeatureList = function(){
		var that = this;
		this.startIndex = this.startIndex + this.maxFeatures;
		var list = this.attrList;
		
		if(!this.parameters){
			var all = list[this.selectedTreeId].all,
				data = [];
			var props;
			
			if(this.startIndex > all.length){
				return;
			}
			
			for(var i = this.startIndex; i < this.startIndex + this.maxFeatures; i++){
				if(i >= all.length){
					break;
				}
				var arr = [];
				props = all[i].getProperties();
				for(var j in props){
					if(j === "geometry"){
						arr.push(all[i]);
					} else {
						arr.push(props[j]);
					}
				}
				data.push(arr);
			}
			
			this.dataTable.rows.add(data).draw();
			this.tableElement.find("tbody > tr").css("background-color", "transparent");
			this.footerTag.find("label").css("color", "#DDD");
			$("#" + this.tableId + this.countId).parent().scrollTop(this.scrollTop);
			return;
		}
		
		this.parameters.startIndex = this.startIndex;
		
		$.ajax({
			url : this.getFeatureURL,
			type : "GET",
			contentType : "application/json; charset=UTF-8",
			data : this.parameters,
			dataType : "JSON",
			success : function(errorData, textStatus, jqXHR) {
				var format = new ol.format.GeoJSON().readFeatures(JSON.stringify(errorData));
				var data = [],
					features = {},
					col = [];
				
				for(var i in format){
					if(!col.length){
						col = format[i].getKeys();
					}
					features[format[i].getId()] = format[i];
				}
				
				for(var id in features){
					var arr = [];
					for(var i = 0; i < col.length; i++){
						if(col[i] === "geometry"){
							arr.push(features[id]);
						} else {
							arr.push(features[id].get(col[i]));
						}
					}
					data.push(arr);
					
				}
				
				that.dataTable.rows.add(data).draw();
				that.tableElement.find("tbody > tr").css("background-color", "transparent");
				that.footerTag.find("label").css("color", "#DDD");
				$("#" + that.tableId + that.countId).parent().scrollTop(that.scrollTop);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(errorThrown);
			}
		});
	}
	
	gb.footer.FeatureList.prototype.requestLayerInfo = function(serverName, workspace, layer, treeid){
		var list = this.attrList;
		var treeid = treeid;
		var a = {
			serverName: serverName,
			workspace: workspace,
			geoLayerList: [layer]
		};
		
		$.ajax({
			method : "POST",
			url: this.layerInfoURL,
			data: JSON.stringify(a),
			contentType: 'application/json; charset=utf-8',
			success: function(data, textStatus, jqXHR) {
				var geomKey = data[0].geomkey;
				list[treeid].geomKey = geomKey;
			},
			error: function(e) {
				var errorMsg = e? (e.status + ' ' + e.statusText) : "";
				console.log(errorMsg);
			},
		});
	}
	
	gb.footer.FeatureList.prototype.sendWFSTTransaction = function(openSaveModal){
		var featureInfo = this.editedFeature;
		var format = new ol.format.WFS();
		var node, param;
		var modal = openSaveModal;
		
		for(var treeid in featureInfo){
			node = format.writeTransaction(null, [featureInfo[treeid].feature], null, {
				"featureNS": featureInfo[treeid].workspace,
				"featurePrefix": featureInfo[treeid].workspace,
				"featureType": featureInfo[treeid].layerName,
				"version": gb.module.serviceVersion.WFS
			});
			
			param = {
				"serverName": featureInfo[treeid].serverName,
				"workspace": featureInfo[treeid].workspace,
				"wfstXml": new XMLSerializer().serializeToString(node)
			}
			
			$.ajax({
				type: "POST",
				url: this.wfstURL,
				data: JSON.stringify(param),
				contentType: 'application/json; charset=utf-8',
				success: function(data) {
					var result = format.readTransactionResponse(data);
					modal.close();
				},
				error: function(e) {
					var errorMsg = e? (e.status + ' ' + e.statusText) : "";
					console.log(errorMsg);
				},
				context: this
			});
		}
	}
}(jQuery));