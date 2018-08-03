var gb;
if (!gb)
	gb = {};
if (!gb.footer)
	gb.footer = {};

(function($){
	/**
	 * command 기능
	 * @author hochul.kim
	 * @date 2018.06.05
	 * @version 0.01
	 * @class gb.footer.CommandLine
	 * @constructor
	 */
	gb.footer.CommandLine = function(obj) {
		gb.footer.Base.call(this, obj);
		
		var options = obj || {};
		
		var that = this;
		
		this.map = options.map;
		
		this.serverURL = options.serverURL;
		
		/**
		 * 언어 코드
		 */
		this.locale = options.locale || "en";
		
		/**
		 * 다국적 언어 지원
		 */
		this.translator = {
			"history": {
				"en": "History",
				"ko": "이력"
			},
			"log": {
				"en": "Log",
				"ko": "로그"
			},
			"commandLine": {
				"en": "Command line",
				"ko": "명령어 입력"
			}
		}
		
		this.label = undefined;
		
		this.workHistory_ = {};
		
		this.inputHistory_ = [];
		
		this.params_ = {};
		
		this.commandList_ = {
			createLayer: {
				tip: "enter the geoserver",
				paramKey: "geoserver",
				before: function(value){
					if(/[`~!@#$%^&*|\\\'\";:\/?]/gi.test(value)){
						return false;
					} else {
						return true;
					}
				},
				beforeFailLog: "Cannot input special characters",
				next: {
					tip: "enter the workspace",
					paramKey: "workspace",
					before: function(value){
						if(/[`~!@#$%^&*|\\\'\";:\/?]/gi.test(value)){
							return false;
						} else {
							return true;
						}
					},
					beforeFailLog: "Cannot input special characters",
					next: {
						tip: "Enter the datastore",
						paramKey: "datastore",
						before: function(value){
							if(/[`~!@#$%^&*|\\\'\";:\/?]/gi.test(value)){
								return false;
							} else {
								return true;
							}
						},
						beforeFailLog: "Cannot input special characters",
						next: {
							tip: "Enter layer name",
							paramKey: "layerName",
							before: function(value){
								if(/[`~!@#$%^&*|\\\'\";:\/?]/gi.test(value)){
									return false;
								} else {
									return true;
								}
							},
							beforeFailLog: "Cannot input special characters",
							log: "Enter layer name success!",
							next: {
								tip: "Layer type? ( point / lineString / polygon )",
								point: {
									end: function(params){
										createVectorLayer(that.map, params.geoserver, 
												params.workspace, params.datastore, params.layerName, "Point");
									},
									successLog: "create POINT Layer success!",
									failLog: "create POINT Layer falied!"
								},
								lineString: {
									end: function(params){
										createVectorLayer(that.map, params.geoserver, 
												params.workspace, params.datastore, params.layerName, "LineString");
									},
									successLog: "create LINESTRING Layer success!",
									failLog: "create LINESTRING Layer falied!"
								},
								polygon: {
									end: function(params){
										createVectorLayer(that.map, params.geoserver, 
												params.workspace, params.datastore, params.layerName, "Polygon");
									},
									successLog: "create POLYGON Layer success!",
									failLog: "create POLYGON Layer falied!"
								}
							}
						}
					}
				}
			},
			createFeature: {
				tip: "Enter Coodinates (ex.point: [x,y] / lineString & polygon: [[x,y], ...])",
				paramKey: "coordinates",
				before: function(value){
					var layers = $('#builderClientLayer').jstreeol3("get_selected_layer");
					if(layers.length === 1){
						return true;
					} else {
						return false;
					}
				},
				beforeFailLog: "You must select only one layer",
				end: function(params){
					var layers = $('#builderClientLayer').jstreeol3("get_selected_layer");
					var insertCoords = params.coordinates;
					var coords = insertCoords.replace(/[[\]]/g, '').split(",");
					var layer, type, geometry, feature;
					
					if(coords.length === 0 || coords.length % 2 !== 0){
						return false;
					}
					if(layers.length === 1){
						layer = layers[0];
						type = layer.get("git").geometry;
						switch(type){
							case "Point":
								if(!regexCoordinate(coords[0]) || !regexCoordinate(coords[1])){
									return false;
								}
								geometry = new ol.geom.Point([coords[0], coords[1]]);
								break;
							case "LineString":
								var lineCoord = [];
								for(var i = 0; i < coords.length; i = i + 2){
									if(!regexCoordinate(coords[i]) || !regexCoordinate(coords[i+1])){
										return false;
									}
									lineCoord.push([coords[i], coords[i+1]]);
								}
								geometry = new ol.geom.LineString(lineCoord);
								break;
							case "Polygon":
								var polyCoord = [];
								for(var i = 0; i < coords.length; i = i + 2){
									if(!regexCoordinate(coords[i]) || !regexCoordinate(coords[i+1])){
										return false;
									}
									polyCoord.push([coords[i], coords[i+1]]);
								}
								geometry = new ol.geom.Polygon([polyCoord]);
								break;
						}
						feature = new ol.Feature({
							geometry: geometry
						});
						feature.setId(createFeatureId(layer));
						epan.featureRecord.create(layer, feature);
						layer.getSource().addFeature(feature);
					} else {
						return false;
					}
				},
				successLog: "create Feature success!",
				failLog: "Wrong Coordinates"
			},
			moveFeature: {
				tip: "Enter Workspace ID",
				paramKey: "workId",
				next: {
					tip: "Enter Layer ID",
					paramKey: "layerId",
					before: function(value){
						var layer = $('#builderClientLayer').jstreeol3(true).get_LayerByOLId(value);
						if(!layer){
							return false;
						} else {
							return true;
						}
					},
					beforeFailLog: "You must select only one layer",
					next: {
						tip: "Enter feature ID",
						paramKey: "featureId",
						next: {
							tip: "Enter coordinate (ex.[x,y])",
							paramKey: "coordinates",
							end: function(params){
								var layer = $('#builderClientLayer').jstreeol3(true).get_LayerByOLId(params.layerId);
								var insertCoords = params.coordinates;
								var coords = insertCoords.replace(/[[\]]/g, '').split(",");
								
								var tempVectorSource = new ol.source.Vector();
								var vectorLayer = new ol.layer.Vector({
									source: tempVectorSource
								});
								
								var layer, feature, geometry, lastCoord, deltaX, deltaY;
								
								if(coords.length !== 2){
									return false;
								}
								
								feature = getFeatureByServer(params.workId, params.layerId, params.featureId);
								if(!feature){
									return false;
								}
								geometry = feature.getGeometry();
								lastCoord = feature.getLastCoordinate();
								
								deltaX = lastCoord[0] - coords[0];
								deltaY = lastCoord[1] - coords[1];
								
								geometry.translate(deltaX, deltaY);
								feature.setGeometry(geometry);
								tempVectorSource.addFeature(feature);
								that.map.addLayer(vectorLayer);
								return true;
							}
						}
					}
				}
			}
		}
		
		this.currentCmd = this.commandList_;
		
		this.elementStyle_ = {
			content: {
				"width": "100%",
				"color": "white",
				"display": "inline-flex"
			},
			commandWrapper: {
				"width": "100%",
				"height": "100%"
			},
			logHistoryWrapper: {
				"width": "100%",
				"height": "80%",
				"display": "inline-flex"
			},
			history: {
				"width": "50%",
				"height": "100%",
				"border-top-left-radius": "10px",
				"border-top-right-radius": "10px",
				"display": "flex",
				"flex-direction": "column",
				"box-shadow": "rgba(0, 0, 0, 0.5) 0px 0px 20px",
				"background-color": "rgba(75, 90, 106, 0.8)"
			},
			historyTitle: {
				"flex": "0 0 auto",
				"padding": "8px 16px",
				"border-bottom": "0.5px solid rgba(255,255,255,.4)"
			},
			historyFunction: {
				"display": "inline-block",
				"float": "right"
			},
			historyContent: {
				"flex": "1 1 auto",
				"overflow": "auto",
			},
			log: {
				"width": "50%",
				"height": "100%",
				"border-top-left-radius": "10px",
				"border-top-right-radius": "10px",
				"display": "flex",
				"flex-direction": "column",
				"box-shadow": "rgba(0, 0, 0, 0.5) 0px 0px 20px",
				"background-color": "rgba(75, 90, 106, 0.8)"
			},
			logTitle: {
				"flex": "0 0 auto",
				"padding": "8px 16px",
				"border-bottom": "0.5px solid rgba(255,255,255,.4)"
			},
			logContent: {
				"flex": "1 1 auto",
				"overflow": "auto",
			},
			lineWrapper: {
				"width": "100%",
				"height": "20%",
				"border-top": "1px solid #838383",
				"display": "flex"
			},
			label: {
				"background-color": "rgba(0, 181, 173, .6)",
				"padding": ".5833em .833em",
				"flex": "0 0 auto"
			},
			line: {
				"padding": ".67857143em 1em",
				"border": "none",
				"color": "rgba(0, 0, 0, .87)",
				"flex": "1 0 auto"
			},
			item: {
				"padding": "0px 16px"
			}
		}
		
		this.createContent();
	}

	// gb.footer.Base 상속
	gb.footer.CommandLine.prototype = Object.create(gb.footer.Base.prototype);
	gb.footer.CommandLine.prototype.constructor = gb.footer.CommandLine;
	
	gb.footer.CommandLine.prototype.createContent = function(){
		var that = this;
		
		this.contentTag.empty();
		this.adjustStyle_(this.contentTag, this.elementStyle_.content);
		
		var commandWrapper = $("<div>").addClass("command-wrapper");
		this.adjustStyle_(commandWrapper, this.elementStyle_.commandWrapper);
		
		var logHistoryWrapper = $("<div>").addClass("log-history-wrapper");
		this.adjustStyle_(logHistoryWrapper, this.elementStyle_.logHistoryWrapper);
		
		var history = $("<div>").addClass("command-history");
		this.adjustStyle_(history, this.elementStyle_.history);
		
		var historyTitle = $("<div>").addClass("history-title");
		this.adjustStyle_(historyTitle, this.elementStyle_.historyTitle);
		historyTitle.text("History");
		
		var historyFunction = $("<div>").addClass("history-function");
		this.adjustStyle_(historyFunction, this.elementStyle_.historyFunction);
		
		this.historyContent = $("<div>").addClass("history-content");
		this.adjustStyle_(this.historyContent, this.elementStyle_.historyContent);
		
		var log = $("<div>").addClass("command-log");
		this.adjustStyle_(log, this.elementStyle_.log);
		
		var logTitle = $("<div>").addClass("log-title");
		this.adjustStyle_(logTitle, this.elementStyle_.logTitle);
		logTitle.text("Log");
		
		this.logContent = $("<div>").addClass("log-content");
		this.adjustStyle_(this.logContent, this.elementStyle_.logContent);
		
		var lineWrapper = $("<div>").addClass("command-line-wrapper");
		this.adjustStyle_(lineWrapper, this.elementStyle_.lineWrapper);
		
		this.label = $("<div>").addClass("command-label");
		this.setLabel();
		this.adjustStyle_(this.label, this.elementStyle_.label);
		
		var line = $("<input placeholder='Command Line'>").addClass("command-line");
		this.adjustStyle_(line, this.elementStyle_.line);
		line.keypress(function(e){
			if(e.which === 13){
				that.executeCommand(this.value);
				this.value = "";
			}
		});
		
		historyFunction.append(
			$("<i>")
				.addClass("fas fa-upload")
				.mouseenter(function(){
					$(this).css("cursor", "pointer");
					$(this).addClass("fa-lg");
				})
				.mouseleave(function(){
					$(this).removeClass("fa-lg");
				})
				.click(function(){
					console.log("upload");
				})
				.css({"margin-right": "10px"}));
		historyFunction.append(
			$("<i>")
				.mouseenter(function(){
					$(this).css("cursor", "pointer");
					$(this).addClass("fa-lg");
				})
				.mouseleave(function(){
					$(this).removeClass("fa-lg");
				})
				.click(function(){
					that.downHistory();
				})
				.addClass("fas fa-download"));
		historyTitle.append(historyFunction);
		
		history.append(historyTitle);
		history.append(this.historyContent);
		
		log.append(logTitle);
		log.append(this.logContent);
		
		logHistoryWrapper.append(history);
		logHistoryWrapper.append(log);
		
		lineWrapper.append(this.label);
		lineWrapper.append(line);
		
		commandWrapper.append(logHistoryWrapper);
		commandWrapper.append(lineWrapper);
		
		this.contentTag.append(commandWrapper);
	}
	
	gb.footer.CommandLine.prototype.setLabel = function(label){
		if(typeof label === "string"){
			this.label.text(label);
		} else if(!label){
			this.label.text(">_");
		}
	}
	
	gb.footer.CommandLine.prototype.resetParams = function(){
		for(var i in this.params_){
			delete this.params_[i];
		}
	}
	
	gb.footer.CommandLine.prototype.pushParam = function(value){
		var num = 0;
		var index = [];
		for(var i in this.params_){
			index.push(i);
		}
		while(index.includes(num)){
			num++;
		}
		this.params_[num] = value;
		return num;
	}
	
	gb.footer.CommandLine.prototype.pushWorkHistory = function(list){
		var time = getTime();
		if($.isArray(list)){
			this.workHistory_[time.flat] = list.slice();
			this.insertHistoryLayout(time.format, list);
		}
	}
	
	gb.footer.CommandLine.prototype.downHistory = function(){
		var text = "";
		for(let i in this.workHistory_){
			text += this.workHistory_[i].toString();
			text += "\n";
		}
		var file = new Blob([text], {type: "text/plain"});
		var down = document.createElement("a");
		down.setAttribute("href", URL.createObjectURL(file));
		down.setAttribute("download", "history.txt");
		down.click();
	}
	
	gb.footer.CommandLine.prototype.insertHistoryLayout = function(time, list){
		if($.isArray(list)){
			var item = $("<div class='list-item'>");
			this.adjustStyle_(item, this.elementStyle_.item);
			item.text(time + " " + list.join(" > "));
			this.historyContent.append(item);
			this.historyContent.scrollTop(this.historyContent[0].scrollHeight)
		}
	}
	
	gb.footer.CommandLine.prototype.insertLogLayout = function(text){
		if(typeof text === "string"){
			var item = $("<div class='list-item'>");
			this.adjustStyle_(item, this.elementStyle_.item);
			item.text(text);
			this.logContent.append(item);
			this.logContent.scrollTop(this.logContent[0].scrollHeight)
		}
	}
	
	gb.footer.CommandLine.prototype.executeCommand = function(value){
		if(!!value){
			
			if(!!this.currentCmd[value]){
				
				if(!!this.currentCmd[value].tip){
					
					this.setLabel(this.currentCmd[value].tip);
					this.inputHistory_.push(value);
					this.insertLogLayout(this.currentCmd[value].log);
					this.currentCmd = this.currentCmd[value];
					
				} else if(!!this.currentCmd[value].end){
					
					this.currentCmd[value].end(this.params_);
					this.inputHistory_.push(value);
					this.pushWorkHistory(this.inputHistory_);
					this.insertLogLayout(this.currentCmd[value].log);
					this.resetAll();
					
				}
				
			} else if(!!this.currentCmd.end){
				
				if(!!this.currentCmd.before){
					if(!this.currentCmd.before(value)){
						this.insertLogLayout(this.currentCmd.beforeFailLog);
						return;
					}
				}
				
				if(!!this.currentCmd.paramKey){
					this.params_[this.currentCmd.paramKey] = value;
				} else {
					this.pushParam(value);
				}
				
				this.currentCmd.end(this.params_);
				this.inputHistory_.push(value);
				this.pushWorkHistory(this.inputHistory_);
				this.resetAll();
				this.insertLogLayout(this.currentCmd.log);
				
			} else if(!!this.currentCmd.next){
				
				if(!!this.currentCmd.before){
					if(!this.currentCmd.before(value)){
						this.insertLogLayout(this.currentCmd.beforeFailLog);
						return;
					}
				}
				
				this.setLabel(this.currentCmd.next.tip);
				
				if(!!this.currentCmd.paramKey){
					
					this.params_[this.currentCmd.paramKey] = value;
					
				} else {
					
					this.pushParam(value);
				}
				
				this.inputHistory_.push(value);
				this.insertLogLayout(this.currentCmd.log);
				this.currentCmd = this.currentCmd.next;
				
			} else {
				this.insertLogLayout(value + " is not command");
			}
			
			
		} else {
			this.resetAll();
		}
	}
	
	gb.footer.CommandLine.prototype.resetAll = function(){
		this.resetCommand();
		this.setLabel();
		this.resetParams();
		this.inputHistory_ = [];
	}
	
	gb.footer.CommandLine.prototype.resetCommand = function(){
		this.currentCmd = this.commandList_;
	}
	
	
	gb.footer.CommandLine.prototype.addCommand = function(cmdName, cmdCallback){
		if(!this.commandList[cmdName]){
			this.commandList[cmdName] = cmdCallback;
		}
	}
	
	gb.footer.CommandLine.prototype.getCommandList = function(){
		var a = [];
		for(name in this.commandList_){
			a.push(name);
		}
		return a;
	}
	
	function createVectorLayer(map, geo, work, store, name, type){
		/*var layer = new gb.layer.LayerInfo({
			format: "shp",
			srs: "EPSG:5186",
			name: name,
			geometry: type,
			isNew: true
		});*/
		var vectorLayer = new ol.layer.Vector({
			source: new ol.source.Vector()
		});
		var groupLayer = new ol.layer.Group();
		var gitLayer = {
			"editable" : true,
			"geometry" : type,
			"validation" : false,
			"geoserver": geo,
			"workspace": work,
			"datastore": store
		};
		vectorLayer.set("git", gitLayer);
		groupLayer.set("name", store);
		vectorLayer.set("name", name);
		var collect = new ol.Collection();
		collect.push(vectorLayer);
		groupLayer.setLayers(collect);
		map.addLayer(groupLayer);
	}
	
	function createFeatureId(layer){
		if(!epan){
			return "null";
		}
		var a = epan.featureRecord.getCreated();
		var b = a[layer.get("id")];
		var fid;
		if(!b){
			fid = layer.get("id") + ".new0";
		} else {
			var keys = Object.Keys(b);
			var count;
			if(keys.length === 0){
				count = 0;
			} else {
				var id = keys[keys.length - 1];
				var nposit = (id.search(".new")) + 4;
				count = (parseInt(id.substr(nposit, id.length)) + 1);
			}
			fid = layer.get("id") + ".new" + count;
		}
		return fid;
	}
	
	function getFeatureByServer(workId, layerId, featureId){
		var params = {
			"service" : "WFS",
			"version" : "1.0.0",
			"request" : "GetFeature",
			"typeName" : layerId,
			"outputformat" : "text/javascript",
			"featureID" : featureId,
			"format_options" : "callback:getJson"
		};
		var feature;
		var url = this.serverURL;
		$.ajax({
			url : url,
			data : params,
			async: false,
			dataType : 'jsonp',
			jsonpCallback : 'getJson',
			success : function(data) {
				feature = new ol.format.GeoJSON().readFeature(JSON.stringify(data.features[0]));
			}
		});
		
		var vectorSource = new ol.source.Vector({
			format: new ol.format.GeoJSON(),
			url: function(extent){
				var url = url + "version=1.0.0&request=GetFeature&typename=" + layerId + "&" +
				"outputFormat=text/javascript&bbox=" + extent.join(",");
			}
		});
		
		return vectorSource;
	}
	
	function regexCoordinate(coord){
		if(typeof coord === "string"){
			return /^-?[0-9]*(?:\.[0-9]*)?$/g.test(coord);
		} else {
			return false;
		}
	}
	
	function getTime(){
		var time = {};
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() < 9 ? "0" + ( date.getMonth() + 1 ) : ( date.getMonth() + 1 );
		var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		var sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			
		time.format = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
		time.flat = year + month + day + hour + min + sec;
		return time;
	}
}(jQuery));