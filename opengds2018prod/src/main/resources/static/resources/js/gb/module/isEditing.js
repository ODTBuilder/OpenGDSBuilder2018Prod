var gb;
if (!gb)
	gb = {};
if (!gb.module)
	gb.module = {};

gb.module.isEditing = {
	_active: false,
	get: function(){
		return this._active
	},
	set: function(bool){
		this._active = Boolean(bool);
	},
	alert: function(){
		alert("편집 기능 실행 중에는 할 수 없는 작업입니다.")
	}
};