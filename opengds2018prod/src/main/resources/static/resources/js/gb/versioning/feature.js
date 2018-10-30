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
		"height" : 550,
		"positionX" : 4,
		"right" : true,
		"positionY" : 395,
		"autoOpen" : false
	});
	var th1 = $("<div>").addClass("th").addClass("gb-versioning-feature-td").text("Commiter");
	var th2 = $("<div>").addClass("th").addClass("gb-versioning-feature-td").text("Time");
	var th3 = $("<div>").addClass("th").addClass("gb-versioning-feature-td").text("Type");
	var th4 = $("<div>").addClass("th").addClass("gb-versioning-feature-td").text("Changes");
	var thr = $("<div>").addClass("tr").addClass("gb-versioning-feature-tr").append(th1).append(th2).append(th3).append(th4);
	var thead = $("<div>").addClass("thead").addClass("gb-versioning-feature-trg").append(thr).css({
		"text-align" : "center"
	});
	var tbody = $("<div>").addClass("tbody").addClass("gb-versioning-feature-trg");
	var table = $("<div>").addClass("gb-table").css({
		"display" : "table",
		"width" : "100%",
		"padding-left" : "6px"
	}).append(thead).append(tbody);
	for (var i = 0; i < 11; i++) {
		var td1 = $("<div>").addClass("td").addClass("gb-versioning-feature-td").append("admin");
		var td2 = $("<div>").addClass("td").addClass("gb-versioning-feature-td").append("2018-10-26 13:45");
		var td3 = $("<div>").addClass("td").addClass("gb-versioning-feature-td").append("modified");
		var button = $("<button>").addClass("gb-button").addClass("gb-button-default").text("Detail");
		var td4 = $("<div>").addClass("td").addClass("gb-versioning-feature-td").css({
			"text-align" : "center"
		}).append(button);

		var tr = $("<div>").addClass("tr").addClass("gb-versioning-feature-tr").append(td1).append(td2).append(td3).append(td4);
		$(tbody).append(tr);
	}
	var moreIcon = $("<i>").addClass("fas").addClass("fa-caret-down");
	var btn = $("<button>").addClass("gb-button-clear").append(moreIcon).append(" Read more");
	var btnarea = $("<div>").css({
		"text-align" : "center"
	}).append(btn);
	var body = $("<div>").css({
		"overflow-y" : "auto",
		"height" : "510px",
		"margin" : "4px 0"
	}).append(table).append(btnarea);
	panel.setPanelBody(body);
	panel.open();
};