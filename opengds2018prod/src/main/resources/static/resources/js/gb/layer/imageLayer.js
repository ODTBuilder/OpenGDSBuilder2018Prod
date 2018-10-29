var gb;
if (!gb)
	gb = {};
if (!gb.layer)
	gb.layer = {};

(function($){
	
	/**
	 * Add Image Layer
	 * 
	 * @author hochul.kim
	 * @date 2018. 10. 26
	 * @version 0.01
	 */
	gb.layer.ImageLayer = function(obj) {
		var options = obj;
		
		/**
		 * ol.Map 객체
		 * @type {ol.Map}
		 * @private
		 */
		this.map = options.map || undefined;
		
		/**
		 * Image Width
		 * @type {string}
		 * @private
		 */
		this.imageWidth = options.width || undefined;
		
		/**
		 * Image Height
		 * @type {string}
		 * @private
		 */
		this.imageHeight = options.height || undefined;
		
		/**
		 * Image file url
		 * @type {string}
		 * @private
		 */
		this.imageURL = options.url || undefined;
		
		/**
		 * Image Title
		 * 
		 * @type {String}
		 * @private
		 */
		var title = options.title || "New Image";
		
		/**
		 * Image Layer 수정을 위한 메뉴바 생성 위치
		 * 
		 * @type {DOM}
		 * @private
		 */
		this.baseDiv = options.baseDiv ? $(options.baseDiv) : $("body");
		
		/**
		 * listener
		 * 
		 * @type {Array.<ol.events.Event>}
		 * @private
		 */
		this.listener_ = [];
		
		/**
		 * 길이, 면적 측정 피쳐 생성을 위한 임시 vector source
		 * @type {ol.source.Vector}
		 * @private
		 */
		var source = new ol.source.Vector({wrapX: false});
		
		/**
		 * 길이, 면적 측정 피쳐 생성을 위한 임시 vector layer
		 * @type {ol.layer.Vector}
		 * @private
		 */
		var vector = new ol.layer.Vector({
			source : source,
			style: new ol.style.Style({
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				}),
				stroke: new ol.style.Stroke({
					color: '#ffcc33',
					width: 2
				}),
				image: new ol.style.Circle({
					radius: 7,
					fill: new ol.style.Fill({
						color: '#ffcc33'
					})
				})
			})
		});
		
		vector.set("git", {
			"editable" : true,
			"geometry" : "Polygon",
			"validation" : false
		});
		
		vector.setMap(this.map);
		
		ol.interaction.Draw.call(this, {
			type: "Circle",
			geometryFunction: ol.interaction.Draw.createBox(),
			source: source
		});
		
		var that = this;
		var startEvent = this.on("drawstart", function(evt){
			vector.setMap(that.getMap());
		});
		this.listener_.push(startEvent);
		
		var endEvent = this.on("drawend", function(evt){
			var feature = evt.feature;
			var geom = feature.getGeometry();
			var extent = geom.getExtent();
			
			var projection = new ol.proj.Projection({
				code: 'xkcd-image',
				units: 'pixels',
				extent: extent
			});
			
			var imageLayer = new ol.layer.Image({
				source: new ol.source.ImageStatic({
					url: that.imageURL,
					imageSize: [that.imageWidth, that.imageHeight],
					projection: projection,
					imageExtent: extent
				})
			});
			
			imageLayer.set("name", title);
			imageLayer.set("vectorLayer", vector);
			that.map.addLayer(imageLayer);
			
			that.map.removeInteraction(that);
		});
		this.listener_.push(endEvent);
		
		this.map.addInteraction(this);
	}
	
	ol.inherits(gb.layer.ImageLayer, ol.interaction.Draw);
	ol.interaction.Draw.prototype.selectedType = function(){
		return this.type_;
	}
	
	var createMenuBar = function(target){
		
	}
}(jQuery));