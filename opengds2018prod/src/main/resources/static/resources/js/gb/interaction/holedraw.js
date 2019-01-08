var gb;
if (!gb)
	gb = {};
if (!gb.interaction)
	gb.interaction = {};

(function($){
	/**
	 * Hole Polygon 그리기 기능
	 * @author hochul.kim
	 * @date 2018. 08. 06
	 * @version 0.01
	 * @class gb.interaction.HoleDraw
	 * @constructor
	 * @param {Object} opt_options - gb.interaction.HoleDraw 생성 옵션
	 */
	gb.interaction.HoleDraw = function(opt_options) {
		var that = this;
		var options = opt_options ? opt_options : {};
		
		this.featureRecord = options.featureRecord || undefined;
		
		this.editTool = options.editTool || undefined;
		//this.coordinates = undefined;
		
		this.selected = this.editTool ? this.editTool.selected : undefined;
		
		/**
		 * 임시 vector source
		 * @type {ol.source.Vector}
		 * @private
		 */
		this.source_ = new ol.source.Vector();
		
		ol.interaction.Draw.call(this, {
			type: "Polygon",
			source: this.source_
		});
		
		this.on("drawstart", function(e){
			var feature = e.feature;
			var ringAdded = false;
			var index = null;
			var appendPolygon = new ol.geom.Polygon([]);
			
			if(!that.checkSelected()){
				that.setActive(false);
				return;
			}
			feature.on("change", function(e){
				var a = that.selected.getArray()[0].getGeometry();
				var b = feature.getGeometry();
				var drawCoords = b.getCoordinates(false)[0];
				var polygons = undefined;
				var array = [];
				
				if(drawCoords.length > 2){
					if(ringAdded === false){
						var testCoords = b.getCoordinates(false)[0];
						var testCoordsLength = testCoords.length;
						if(testCoords.length === 3 && 
								testCoords[testCoordsLength - 1][0] === testCoords[testCoordsLength - 2][0] && 
								testCoords[testCoordsLength - 1][1] === testCoords[testCoordsLength - 2][1]){
							console.log("do nothing!!");
							return;
						} else {
							if(a.getType() === "Polygon"){
								a.appendLinearRing(
									new ol.geom.LinearRing(
										pushFirstElement(b.getCoordinates()[0])
									)
								);
							} else if(a.getType() === "MultiPolygon"){
								polygons = a.getPolygons();
								for(var i = 0; i < polygons.length; i++){
									if(polygons[i].intersectsCoordinate(b.getFirstCoordinate())){
										appendPolygon.setCoordinates(polygons[i].getCoordinates());
										appendPolygon.appendLinearRing(
											new ol.geom.LinearRing(
												pushFirstElement(b.getCoordinates()[0])
											)
										);
										index = i;
										break;
									}
								}
								if(index === null){
									return false;
								}
								/*appendPolygon.setCoordinates(a.getCoordinates()[0]);
								appendPolygon.appendLinearRing(
									new ol.geom.LinearRing(
										pushFirstElement(b.getCoordinates()[0])
									)
								);*/
							}
							
							ringAdded = true;
						}
					} else {
						
						var coordElemntLength, coordsExt;
						var coordsInter = [];
						var setCoords = [];
						
						if(a.getType() === "Polygon"){
							
							coordElemntLength = a.getCoordinates().length;
							coordsExt = a.getCoordinates()[0];
							
						} else if(a.getType() === "MultiPolygon"){
							
							coordElemntLength = appendPolygon.getCoordinates().length;
							coordsExt = appendPolygon.getCoordinates()[0];
						}
						
						if (coordElemntLength > 2) {
							for (var i = 1; i < coordElemntLength - 1; i++) {
								if(a.getType() === "Polygon"){
									coordsInter.push(a.getCoordinates()[i]);
								} else if(a.getType() === "MultiPolygon"){
									coordsInter.push(a.getCoordinates()[index][i]);
								}
							}
						}
	
						if (coordsInter.length > 0) {
							setCoords.push(coordsExt);
							for (var z = 0; z < coordsInter.length; z++) {
								setCoords.push(coordsInter[z]);
							}
							
							setCoords.push(pushFirstElement(b.getCoordinates(false)[0]));
						} else {
							
							setCoords = [coordsExt, pushFirstElement(b.getCoordinates(false)[0])];
						}
						
						if(a.getType() === "Polygon"){
							a.setCoordinates(setCoords);
						} else if(a.getType() === "MultiPolygon"){
							polygons = a.getPolygons();
							appendPolygon.setCoordinates(setCoords);
							for(var i = 0; i < polygons.length; i++){
								if(index === i){
									array.push(appendPolygon.getCoordinates());
								} else {
									array.push(polygons[i].getCoordinates());
								}
							}
							a.setCoordinates(array);
							/*appendPolygon.setCoordinates(setCoords);
							array = a.getCoordinates();
							array.push(appendPolygon.getCoordinates());
							that.coordinates = [appendPolygon.getCoordinates()];*/
						}
					}
				}
			});
		});
		
		this.on("drawend", function(e){
			/*var a = that.selected.getArray()[0].getGeometry();
			a.setCoordinates(that.coordinates);*/
			var updateFeature = that.selected.getArray()[0];
			that.featureRecord.update(that.editTool.selectedSource.get("git").tempLayer, updateFeature);
		});
	};
	ol.inherits(gb.interaction.HoleDraw, ol.interaction.Draw);

	gb.interaction.HoleDraw.prototype.checkSelected = function(){
		if(!(this.selected instanceof ol.Collection)){
			alert("There is no object of ol.interaction.Select");
			return false;
		} else {
			if(this.selected.getArray().length !== 1){
				alert("You must select only one feature");
				return false;
			} else {
				if(!(this.selected.getArray()[0].getGeometry().getType() === "Polygon" || 
						this.selected.getArray()[0].getGeometry().getType() === "MultiPolygon")){
					alert("Only Polygon geometry selections.");
					return false;
				} else {
					return true;
				}
			}
		}
	}
	
	gb.interaction.HoleDraw.prototype.setSelectFeatures = function(sel){
		if(sel instanceof ol.Collection){
			this.selected = sel;
			return true;
		} else {
			return false;
		}
	}
	function pushFirstElement(arr){
		var retArray = new Array()
		for (var i = 0; i < arr.length; i++) {
			retArray.push(arr[i])
		}
		retArray.push(arr[0])
		return retArray;
	}
}(jQuery));