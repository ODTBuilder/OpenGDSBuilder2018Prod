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
		gb.footer.Base.call(this, obj);
		
		var that = this;
		
		var options = obj || {};
		
		this.map = options.map || undefined;
		
		this.attrList = {};
		
		this.countId = 0;
		/**
		 * footer content에 생성할 table element의 ID
		 */
		this.tableId = options.tableId || "featureListTable";
		
		this.tableTitles = options.tableTitles || [];
		
		this.tableData = options.tableData || [];
		
		this.content = options.content;
			
		this.titleAreaStyle = {
			"position": "absolute",
			"display": "none",
			"padding": "8px 16px"
		};
		
		this.contentAreaStyle = {
			"height": "100%"
		};
		
		this.tableElement = this.createTableElement();
		
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
			paging: false,
			scrollX: true,
			scrollY: true,
			scrollCollapse: true
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
			that.onResize();
		});
		
		$("#" + this.tableId).on("click", "tr", function(){
			var data = that.dataTable.row(this).data();
			//that.map.getView().fit(data.geometry.getExtent(), that.map.getSize());
			//that.map.getView().setZoom(14);
			/*if ( $(this).hasClass('selected') ) {
				$(this).removeClass('selected');
			} else {
				that.dataTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
			}*/
		});
	}
	
	// gb.footer.Base 상속
	gb.footer.FeatureList.prototype = Object.create(gb.footer.Base.prototype);
	gb.footer.FeatureList.prototype.constructor = gb.footer.FeatureList;
	
	gb.footer.FeatureList.prototype.createTableElement = function(){
		this.removeTableElement();
		
		var num = this.countId++;
		
		var table = $("<table>").attr("id", this.tableId + num).css({
			width: "100%"
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
	 * tbody height 재갱신
	 */
	gb.footer.FeatureList.prototype.resizeTbody = function(){
		var a = this.footerTag.find(".footer-content").height();
		var b = $("#" + this.tableId + "_filter").height();
		var c = $("#" + this.tableId + "_wrapper .dataTables_scrollHead").height();
		
		var height = a - b - c;
		
		this.footerTag.find(".footer-content #" + this.tableId + "_wrapper .dataTables_scrollBody").css("max-height", height + "px");
	}
	
	/**
	 * List Table 내용 재설정
	 * @param {Array.<Object>} col title: table header title
	 * @param {Array.<Array>} col
	 */
	gb.footer.FeatureList.prototype.updateTable = function(treeid){
		var col, data;
		
		if(!this.attrList[treeid]){
			col = [{title:"column"}];
			data = [["No data"]];
		} else {
			col = this.attrList[treeid].col;
			data = this.attrList[treeid].data;
		}
		
		this.dataTable.clear();
		this.dataTable.destroy();
		delete this.dataTable;
		this.tableElement = this.createTableElement();
		
		this.dataTable = this.tableElement.DataTable({
			columns: col,
			data: data,
			info: false,
			paging: false,
			scrollX: true,
			scrollY: "100%",
			scrollCollapse: true,
			dom: "Bfrtip",
			select: "single",
			altEditor: true,
			buttons: [{
				text: "Add",
				name: "add"
			},
			{
				extend: "selected",
				text: "Edit",
				name: "edit"
			},
			{
				extend: "selected",
				text: "Delete",
				name: "delete"
			}]
		});
		
		this.tableElement.find("tbody > tr").css("background-color", "transparent");
		this.footerTag.find("label").css("color", "#DDD");
		this.onResize();
	}
	
	gb.footer.FeatureList.prototype.updateFeatureList = function(opt){
		var options = opt || {};
		
		var url = options.url;
		if(!url){
			console.error('gb.footer.FeatureList: url is required');
			return;
		}
		
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
		
		var layerName = options.layerName;
		if(!layerName){
			console.error('gb.footer.FeatureList: layer name is required');
			return;
		}
		
		var treeid = options.treeid;
		
		var list = this.attrList;
		if(!!list[treeid]){
			return;
		}
		
		var exceptKeys = options.exceptKeys || [];
		
		var defaultParameters = {
			"serverName": geoserver,
			"workspace": workspace,
			"version" : "1.0.0",
			"typeName" : layerName,
			"outputformat" : "JSONP",
			"format_options" : "callback:" + layerName
		};

		var that = this;
		$.ajax({
			url : url,
			data : defaultParameters,
			dataType : 'JSONP',
			jsonpCallback : layerName,
			success : function(errorData, textStatus, jqXHR) {
				var format = new ol.format.GeoJSON().readFeatures(JSON.stringify(errorData));
				var th = [],
					td = [],
					data = [],
					col = [],
					features = [];
				
				for(var i in format){
					if(!th.length){
						th = format[i].getKeys();
						for(var j in th){
							if(exceptKeys.indexOf(th[j]) !== -1){
								continue;
							}
							col.push({
								title: th[j]
							});
						}
					}
					
					td = [];
					for(var j in th){
						if(exceptKeys.indexOf(th[j]) !== -1){
							continue;
						}
						td.push(format[i].get(th[j]));
					}
					data.push(td);
				}
				
				list[treeid] = {};
				list[treeid].col = col;
				list[treeid].data = data;
				
				/*that.updateTable(col, data);
				that.setTitle(layerName);*/
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(errorThrown);
				/*that.updateTable([{title: "no data"}], [["no data"]]);
				that.setTitle("no data");*/
			}
		});
	}
}(jQuery));