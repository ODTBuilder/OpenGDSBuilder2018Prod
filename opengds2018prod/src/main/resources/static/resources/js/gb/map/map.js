/**
 * Map 객체를 정의한다.
 * 
 * @class gb.Map
 * @memberof gb
 * @param {Object}
 *            obj - 생성자 옵션을 담은 객체
 * @param {String |
 *            Element} obj.target - 지도 영역이 될 Div의 ID 또는 Element
 * @version 0.01
 * @author yijun.so
 * @date 2017. 07.26
 */
gb.Map = function(obj) {

	var that = this;
	var options = obj ? obj : {};

	this.view = new ol.View({
		center : ol.proj.fromLonLat([ 37.41, 8.82 ]),
		zoom : 4
	});

	this.upperDiv = $("<div>");
	this.lowerDiv = $("<div>");

	if (typeof options.target === "string") {
		this.bind = $("#" + options.target).append(this.upperDiv).append(this.lowerDiv);
	} else if ($(options.target).is("div")) {
		this.bind = $(options.target).append(this.upperDiv).append(this.lowerDiv);
	}

	$(this.upperDiv).css({
		"top" : 0
	});
	$(this.lowerDiv).css({
		"top" : $(this.upperDiv).outerHeight() !== 0 ? "-" + $(this.upperDiv).outerHeight() + "px" : 0,
		"position" : "relative"
	});

	this.upperMap = new ol.Map({
		target : this.upperDiv[0],
		layers : [],
		view : this.view,
		controls : [ new ol.control.Zoom(), new ol.control.ZoomSlider() ]
	});
	this.lowerMap = new ol.Map({
		target : this.lowerDiv[0],
		controls : [],
		layers : [],
		view : this.view
	});

	$(this.lowerDiv).find(".ol-viewport").css("z-index", 1);
	$(this.upperDiv).find(".ol-viewport").css("z-index", 2);
};
/**
 * 상위 영역 ol.Map 객체를 반환한다.
 * 
 * @method gb.Map#getUpperMap
 * @function
 * @return {ol.Map} 상위 영역 ol.Map 객체
 */
gb.Map.prototype.getUpperMap = function() {
	return this.upperMap;
};

/**
 * 하위 영역 ol.Map 객체를 반환한다.
 * 
 * @method gb.Map#getLowerMap
 * @function
 * @return {ol.Map} 하위 영역 ol.Map 객체
 */
gb.Map.prototype.getLowerMap = function() {
	return this.lowerMap;
};

/**
 * 지도 영역의 크기를 설정한다.
 * 
 * @method gb.Map#setSize
 * @function
 * @param {Number}
 *            width - 지도의 너비
 * @param {Number}
 *            height - 지도의 높이
 */
gb.Map.prototype.setSize = function(width, height) {
	$(this.bind).css({
		"width" : width + "px",
		"height" : height + "px"
	});
	$(this.lowerDiv).css({
		"width" : width + "px",
		"height" : height + "px"
	});
	$(this.upperDiv).css({
		"width" : width + "px",
		"height" : height + "px"
	});
	this.upperMap.updateSize();
	this.lowerMap.updateSize();

	$(this.upperDiv).css({
		"top" : 0
	});
	$(this.lowerDiv).css({
		"top" : $(this.upperDiv).outerHeight() !== 0 ? "-" + $(this.upperDiv).outerHeight() + "px" : 0,
		"position" : "relative"
	});

};