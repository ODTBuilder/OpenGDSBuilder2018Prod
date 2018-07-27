/**
 * 지오서버에 레이어를 업로드 하기위한 모달 객체를 정의한다.
 * 
 * @class gb.geoserver.ImportSHP
 * @memberof gb.geoserver
 * @param {String}
 *            url - SHP파일을 업로드할 URL
 * 
 * @version 0.01
 * @author SOYIJUN
 * @date 2017. 07.26
 */
gb.geoserver.ImportSHP = function(obj) {
	obj.width = 435;
	obj.height = 180;
	gb.modal.Base.call(this, obj);
	var that = this;
	var options = obj ? obj : {};
	this.url = typeof options.url === "string" ? options.url : undefined;

};
gb.geoserver.ImportSHP.prototype = Object.create(gb.modal.Base.prototype);
gb.geoserver.ImportSHP.prototype.constructor = gb.geoserver.ImportSHP;

/**
 * 모달을 연다
 * 
 * @method gb.geoserver.ImportSHP#open
 * @override
 */
gb.geoserver.ImportSHP.prototype.open = function(geoserver, workspace, datastrore) {
	gb.modal.Base.prototype.open.call(this);

};