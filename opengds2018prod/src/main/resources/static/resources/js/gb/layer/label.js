/**
 * Layer Label
 * 
 * @author hochul.kim
 * @date 2019. 02. 21
 * @version 0.01
 */
var gb;
if (!gb)
	gb = {};
if (!gb.layer)
	gb.layer = {};

(function($){
	gb.layer.Label = function(obj){
		var that = this;
		var options = obj;
		
		var layer = options.layer || undefined;
		if(!(layer instanceof ol.layer.Vector)){
			return;
		}
		
		this.style = layer.getStyle();
		
		if(this.style instanceof Function){
			this.style = this.style();
		}
		
		this.attribute = $("#labelAttribute").find("option:selected").val() || "errName";
		this.align = $("#labelAlign").find("option:selected").val() || "center";
		this.baseline = $("#labelBaseline").find("option:selected").val() || "middle";
		this.size = $("#labelSize").val() || "12px";
		this.offsetX = parseInt(($("#labelOffsetX").val() || "0"), 10);
		this.offsetY = parseInt(($("#labelOffsetY").val() || "0"), 10);
		this.weight = $("#labelWeight").find("option:selected").val() || "normal";
		this.placement = $("#labelPlacement").find("option:selected").val() || "point";
		this.maxAngle = parseFloat($("#labelMaxAngle").find("option:selected").val() || "0.7853981633974483");
		this.overflow = false;
		this.rotation = parseFloat($("#labelRotation").find("option:selected").val() || "0");
		this.font = this.weight + " " + this.size + " " + ($("#labelFont").find("option:selected").val() || "Arial");
		this.fillColor = $("#labelColor").val() || "blue";
		this.outlineColor = $("#labelOutColor").val() || "#ffffff";
		this.outlineWidth = parseInt(($("#labelOutWidth").val() || "3"), 10);
		this.maxResolution = $("#labelMaxResolution").find("option:selected").val() || 1200;
		
		var func = function(feature, resolution){
			that.style.setText(that.createTextStyle(feature, resolution));
			return that.style;
		}
		
		return func;
	}
	
	gb.layer.Label.prototype.getText = function(feature, resolution){
		var props = feature instanceof ol.Feature ? feature.getProperties() : undefined;
		
		var text;
		
		if(props instanceof Object){
			text = props[this.attribute];
		} else {
			text = '';
		}
		
		if(resolution > this.maxResolution){
			text = '';
		}
		
		text = stringDivider(text, 16, '\n');

		return text;
	};


	gb.layer.Label.prototype.createTextStyle = function (feature, resolution) {
		return new ol.style.Text({
			textAlign: this.align == '' ? undefined : this.align,
			textBaseline: this.baseline,
			font: this.font,
			text: this.getText(feature, resolution),
			fill: new ol.style.Fill({color: this.fillColor}),
			stroke: new ol.style.Stroke({color: this.outlineColor, width: this.outlineWidth}),
			offsetX: this.offsetX,
			offsetY: this.offsetY,
			placement: this.placement,
			maxAngle: this.maxAngle,
			overflow: this.overflow,
			rotation: this.rotation
		});
	};

	// http://stackoverflow.com/questions/14484787/wrap-text-in-javascript
	function stringDivider(str, width, spaceReplacer) {
		if (str.length > width) {
			var p = width;
			while (p > 0 && (str[p] != ' ' && str[p] != '-')) {
				p--;
			}
			if (p > 0) {
				var left;
				if (str.substring(p, p + 1) == '-') {
					left = str.substring(0, p + 1);
				} else {
					left = str.substring(0, p);
				}
				var right = str.substring(p + 1);
				return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
			}
		}
		return str;
	}
}(jQuery));