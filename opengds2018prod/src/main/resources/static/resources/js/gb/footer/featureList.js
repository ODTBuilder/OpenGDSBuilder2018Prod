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
		
		/**
		 * footer content에 생성할 table element의 ID
		 */
		this.tableId = options.tableId || "featureListTable";
		
		this.tableTitles = options.tableTitles || [];
		
		this.tableData = options.tableData || [];
		
		this.content = options.content;
			
		this.titleAreaStyle = {
			"position": "absolute",
			"padding": "8px 16px"
		};
		
		this.contentAreaStyle = {
			"height": "100%"
		};
		
		this.tableElement = $("<table>").attr("id", this.tableId);
		
		this.createFooter({
			title: this.title,
			content: this.tableElement
		});
		
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
			that.map.getView().fit(data.geometry.getExtent(), that.map.getSize());
			//that.map.getView().setZoom(14);
			if ( $(this).hasClass('selected') ) {
				$(this).removeClass('selected');
			} else {
				that.dataTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
			}
		})
	}

	// gb.footer.Base 상속
	gb.footer.FeatureList.prototype = Object.create(gb.footer.Base.prototype);
	gb.footer.FeatureList.prototype.constructor = gb.footer.FeatureList;
	
	gb.footer.FeatureList.prototype.clickEvent = function(target){
		var that = this;
		$(target).click(function(){
			that.createFooter({
				title: that.title,
				content: that.tableElement
			});
		});
	}
	
	// 전체 객체 리스트 테이블 크기 재갱신
	gb.footer.FeatureList.prototype.onResize = function(){
		if(!!this.dataTable){
			this.dataTable.columns.adjust().draw();
			this.resizeTbody();
		}
	}
	
	// tbody height 재갱신
	gb.footer.FeatureList.prototype.resizeTbody = function(){
		var a = this.footerTag.find(".footer-content").height();
		var b = $("#" + this.tableId + "_filter").height();
		var c = $("#" + this.tableId + "_wrapper .dataTables_scrollHead").height();
		
		var height = a - b - c;
		
		this.footerTag.find(".footer-content #" + this.tableId + "_wrapper .dataTables_scrollBody").css("max-height", height + "px");
	}
	
	gb.footer.FeatureList.prototype.updateTable = function(col, data, except){
		this.dataTable.destroy();
		this.tableElement.empty();
		
		var columns = [];
		for(var i in col){
			if(except.indexOf(col[i].data) === -1){
				columns.push({
					title: col[i].title,
					data: col[i].data
				});
			}
		}
		this.dataTable = this.tableElement.DataTable({
			columns: columns,
			data: data,
			info: false,
			paging: false,
			scrollX: true,
			scrollY: true,
			scrollCollapse: true
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
		
		var exceptKeys = options.exceptKeys || [];
		
		var defaultParameters = {
			service : 'WFS',
			version : '1.0.0',
			request : 'GetFeature',
			typeName : workspace + ':' + layerName,
			outputFormat : 'text/javascript',
			format_options : 'callback:getJson'
		};

		var that = this;
		$.ajax({
			url : url,
			data : defaultParameters,
			dataType : 'jsonp',
			jsonpCallback : 'getJson',
			success : function(errorData, textStatus, jqXHR) {
				var format = new ol.format.GeoJSON().readFeatures(JSON.stringify(errorData));
				var th = [],
					td = undefined,
					data = [],
					col = [];
				
				for(var i in format){
					if(!th.length){
						th = format[i].getKeys();
						for(var j in th){
							col.push({
								title: th[j],
								data: th[j]
							});
						}
					}
					
					td = {};
					for(var j in th){
						td[th[j]] = format[i].get(th[j]);
					}
					data.push(td);
				}
				
				that.updateTable(col, data, exceptKeys);
				that.setTitle(layerName);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(errorThrown);
				that.updateTable([{title: "no data", data: "empty"}], [{empty: "no data"}], []);
				that.setTitle("no data");
			}
		});
	}
}(jQuery));