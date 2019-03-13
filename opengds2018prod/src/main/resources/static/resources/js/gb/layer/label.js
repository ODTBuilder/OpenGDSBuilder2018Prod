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
		
		var labelOptions = obj.labelOptions;
		
		var git = layer.get("git");
		
		this.style = layer.getStyle();
		
		if(this.style instanceof Function){
			this.style = this.style();
		}
		
		this.labelOptions = {};
		this.labelOptions.attribute = labelOptions.attribute || "errName";
		this.labelOptions.align = labelOptions.align || "center";
		this.labelOptions.baseline = labelOptions.baseline || "middle";
		this.labelOptions.size = labelOptions.size || "12px";
		this.labelOptions.offsetX = parseInt((labelOptions.offsetX || "0"), 10);
		this.labelOptions.offsetY = parseInt((labelOptions.offsetY || "0"), 10);
		this.labelOptions.weight = labelOptions.weight || "normal";
		this.labelOptions.placement = labelOptions.placement || "point";
		this.labelOptions.maxAngle = parseFloat(labelOptions.maxAngle || "0.7853981633974483");
		this.labelOptions.overflow = labelOptions.overflow || true;
		this.labelOptions.rotation = parseFloat(labelOptions.rotation || "0");
		this.labelOptions.font = this.labelOptions.weight + " " + this.labelOptions.size + " " + (labelOptions.font || "Arial");
		this.labelOptions.fillColor = labelOptions.fillColor || "blue";
		this.labelOptions.outlineColor = labelOptions.outlineColor || "#ffffff";
		this.labelOptions.outlineWidth = parseInt((labelOptions.outlineWidth || "3"), 10);
		this.labelOptions.maxResolution = labelOptions.maxResolution || 1200;
		
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
			text = props[this.labelOptions.attribute] + "";
		} else {
			text = '';
		}
		
		if(resolution > this.labelOptions.maxResolution){
			text = '';
		}
		
		text = stringDivider(text, 16, '\n');

		return text;
	};


	gb.layer.Label.prototype.createTextStyle = function (feature, resolution) {
		return new ol.style.Text({
			textAlign: this.labelOptions.align == '' ? undefined : this.labelOptions.align,
			textBaseline: this.labelOptions.baseline,
			font: this.labelOptions.font,
			text: this.getText(feature, resolution),
			fill: new ol.style.Fill({color: this.labelOptions.fillColor}),
			stroke: new ol.style.Stroke({color: this.labelOptions.outlineColor, width: this.labelOptions.outlineWidth}),
			offsetX: this.labelOptions.offsetX,
			offsetY: this.labelOptions.offsetY,
			placement: this.labelOptions.placement,
			maxAngle: this.labelOptions.maxAngle,
			overflow: this.labelOptions.overflow,
			rotation: this.labelOptions.rotation
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