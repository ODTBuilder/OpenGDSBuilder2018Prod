/**
 * GeoGig repository 모달 객체를 정의한다.
 * 
 * @class gb.versioning.Repository
 * @memberof gb.versioning
 * @param {Object}
 *            obj - 생성자 옵션을 담은 객체
 * @version 0.01
 * @author SOYIJUN
 * @date 2017. 07.26
 */
gb.versioning.Repository = function(obj) {
	obj.width = 610;
	obj.height = 450;
	obj.title = "GeoGig";
	obj.autoOpen = false;
	gb.modal.Base.call(this, obj);
	var that = this;
	var options = obj ? obj : {};

	this.body = $("<div>");
	this.setModalBody(this.body);

	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Close").click(function() {
		that.close();
	});
	/*
	 * this.searchBtn = $("<button>").css({ "float" : "right"
	 * }).addClass("gb-button").addClass("gb-button-primary").text("Search").click(function() {
	 * var val = $(that.searchBar).val().replace(/(\s*)/g, '');
	 * that.searchEPSGCode(val); });
	 */

	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(closeBtn);
	this.setModalFooter(buttonArea);
};
gb.versioning.Repository.prototype = Object.create(gb.modal.Base.prototype);
gb.versioning.Repository.prototype.constructor = gb.versioning.Repository;
