var gb;
if (!gb)
	gb = {};
if (!gb.module)
	gb.module = {};

var locale = locale || "en";

gb.module.isEditing = {
	translation: {
		"editHint": {
			"ko": "편집 기능 실행 중에는 할 수 없는 작업입니다",
			"en": "This is an operation that can not be performed while the editing function is running"
		}
	},
	_active: false,
	get: function(){
		return this._active
	},
	set: function(bool){
		this._active = Boolean(bool);
	},
	alert: function(){
		alert(this.translation.editHint[locale]);
	}
};