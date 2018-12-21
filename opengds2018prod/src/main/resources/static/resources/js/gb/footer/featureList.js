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
		
		/**
		 * 현재 선택된 레이어의 JSTree ID
		 */
		this.selectedTreeId = undefined;
		
		/**
		 * 현재 선택된 레이어
		 */
		this.selectedLayer = undefined;
		
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
				text: "Edit",
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
			
			if(isEdit instanceof Object){
				if(isEdit.get()){
					that.close();
					isEdit.alert();
					return
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
		
		var table = $("<table>").attr("id", this.tableId + num).css({
			width: "100%"
		});
		
		table.on("click", "tr", function(){
			var data = that.dataTable.row(this).data();
			if(data.length === 0){
				return;
			}
			
			if(data[0].getGeometry === undefined){
				return;
			}
			
			that.map.getView().fit(data[0].getGeometry().getExtent(), that.map.getSize());
			that.map.getView().setZoom(14);
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
		$("#altEditor-modal").off("edited");
		$("#altEditor-modal").remove();
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
			val = value;
		var list = this.attrList;
		var treeid = this.selectedTreeId;
		
		if(!this.parameters){
			return;
		}
		
		this.startIndex = 0;
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
		
		var col = this.attrList[treeid].col;
		var features = this.attrList[treeid].features;
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
		
		for(var i = 0; i < col.length; i++){
			if(col[i] === "geometry"){
				column.push({
					title: col[i],
					visible: false
				});
			} else {
				column.push({
					title: col[i]
				});
				
				select.append($("<option>").val(col[i]).text(col[i]));
			}
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
			responsive: true,
			altEditor: true,
			buttons: [{
				extend: "selected",
				text: "Edit",
				name: "edit"
			}
			/*{
				extend: "selected",
				text: "Delete",
				name: "delete"
			}*/]
		});
		
		this.footerTag.find(".dt-buttons").css({"z-index": "3"});
		this.footerTag.find(".footer-header").empty();
		this.footerTag.find(".footer-header").append(button);
		this.footerTag.find(".footer-header").append(input);
		this.footerTag.find(".footer-header").append(select);
		
		$("#" + this.tableId + this.countId).parent().scroll(function(){
			if($(this).scrollTop() + $(this).height() == $(this).children(":first").height()){
				if(that.scrollTop !== $(this).scrollTop()){
					that.scrollTop = $(this).scrollTop();
					that.nextFeatureList();
				}
			}
		})
		
		$("#altEditor-modal").on("edited", function(e, data){
			var feature, keys;
			var layer = that.attrList[that.selectedTreeId];
			var geomKey = that.attrList[that.selectedTreeId].geomKey;
				
			for(let i = 0; i < data.length; i++){
				if(data[i] instanceof ol.Feature){
					feature = data[i];
					keys = data[i].getKeys();
				}
			}
			
			for(let i = 0; i < keys.length; i++){
				if(keys[i] === "geometry"){
					continue;
				}
				feature.set(keys[i], data[i]);
			}
			
			if(!that.editedFeature[that.selectedTreeId]){
				that.editedFeature[that.selectedTreeId] = {};
				that.editedFeature[that.selectedTreeId].serverName = layer.serverName;
				that.editedFeature[that.selectedTreeId].workspace = layer.workspace;
				that.editedFeature[that.selectedTreeId].layerName = layer.layerName;
			}
			
			if(!!geomKey){
				feature.setGeometryName(geomKey);
				feature.set(geomKey, feature.get("geometry"));
				feature.unset("geometry");
			}
			
			that.editedFeature[that.selectedTreeId].feature = feature;
		});
		
		this.tableElement.find("tbody > tr").css("background-color", "transparent");
		this.footerTag.find("label").css("color", "#DDD");
		this.onResize();
	}
	
	gb.footer.FeatureList.prototype.updateFeatureList = function(layer){
		var options = layer.get("git") || {};
		
		var list = this.attrList;
		
		var treeid = layer.get("treeid");
		
		this.selectedLayer = layer;
		this.parameters = undefined;
		
		if(layer instanceof ol.layer.Vector){
			var data = {},
				col = [],
				features = layer.getSource().getFeatures();
			
			list[treeid] = {};
			
			for(var i in features){
				if(!col.length){
					col = features[i].getKeys();
					list[treeid].geomKey = features[i].getGeometryName();
				}
				data[features[i].getId()] = features[i];
			}
			list[treeid].col = col;
			list[treeid].features = data;
			this.updateTable(treeid);
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
		
		this.startIndex = 0;
		this.scrollTop = 0;
		this.parameters = {
			"serverName": geoserver,
			"workspace": workspace,
			"version" : "1.0.0",
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
				//that.setTitle(layerName);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(errorThrown);
			}
		});
	}
	
	gb.footer.FeatureList.prototype.nextFeatureList = function(){
		if(!this.parameters){
			return;
		}
		var that = this;
		this.startIndex = this.startIndex + this.maxFeatures;
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
				"version": "1.0.0"
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