/**
 * GeoGig feature 변경이력 객체를 정의한다.
 * 
 * @class gb.versioning.Feature
 * @memberof gb.versioning
 * @param {Object}
 *            obj - 생성자 옵션을 담은 객체
 * @param {Object}
 *            obj.url - 요청을 수행할 URL
 * @param {String}
 *            obj.url.serverTree - 서버 목록 트리를 요청할 컨트롤러 주소
 * 
 * @version 0.01
 * @author SOYIJUN
 * @date 2018. 10.26
 */
gb.versioning.Feature = function(obj) {

};
gb.versioning.Feature.prototype = Object.create(gb.versioning.Feature.prototype);
gb.versioning.Feature.prototype.constructor = gb.versioning.Feature;

/**
 * 피처 이력창을 연다.
 * 
 * @method gb.versioning.Feature#open
 */
gb.versioning.Feature.prototype.open = function() {
	var panel = new gb.panel.Base({
		"width" : 400,
		"height" : 500,
		"positionX" : 4,
		"right" : true,
		"positionY" : 444,
		"autoOpen" : false
	});
	var table = $("<div>").css({
		"display" : "table"
	});
	for (var i = 0; i < 11; i++) {
		var td1 = $("<div>").addClass("gb-versioning-feature-td").append("admin");
		var td2 = $("<div>").addClass("gb-versioning-feature-td").append("2018-10-26 13:45");
		var td3 = $("<div>").addClass("gb-versioning-feature-td").append("modified");
		var button = $("<button>").addClass("gb-button").addClass("gb-button-default").text("Detail");
		var td4 = $("<div>").addClass("gb-versioning-feature-td").append(button);

		var tr = $("<div>").addClass("gb-versioning-feature-tr").append(td1).append(td2).append(td3).append(td4);
		$(table).append(tr);
	}
	var body = $("<div>").append(table);
	panel.setPanelBody(body);
	panel.open();
};