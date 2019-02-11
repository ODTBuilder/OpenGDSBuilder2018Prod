var gb;
if (!gb)
	gb = {};
if (!gb.module)
	gb.module = {};

gb.module.serviceVersion = {
	WCS : "1.0.0",
	WFS : "1.0.0",
	WMS : "1.0.0",
	TMS : "1.0.0",
	WMSC : "1.1.1",
	WMTS : "1.0.0",
	loadPerformance:{
		limit: 10,
		active: true
	},
	getWMSCrs : function(){
		if(this.WMS === "1.3.0"){
			return "crs";
		} else {
			return "srs";
		}
	},
	GEOCACHE : false
};

/**
 * 레파지토리 정보 확인창을 생성한다.
 * 
 * @method gb.tree.Geoserver#geoserverSettingModal
 * @param {Object}
 *            server - 작업 중인 서버 노드
 * @param {Object}
 *            repo - 작업 중인 리포지토리 노드
 * @param {Object}
 *            branch - 작업 중인 브랜치 노드
 */
gb.module.serviceVersion.geoserverSettingModal = function(locale) {
	var that = this;

	var locale = locale
	var translation = {
		"serverSetting" : {
			"ko" : "GeoServer 설정",
			"en" : "GeoServer Setting"
		},
		"serviceVer": {
			"ko" : "웹 서비스 버전",
			"en" : "Web Service Version"
		},
		"webCache": {
			"ko" : "Geo 웹 캐시",
			"en" : "Geo Web Cache"
		},
		"webCacheActive": {
			"ko" : "Geo 웹 캐시 활성화",
			"en" : "Active Geo Web Cache"
		},
		"close" : {
			"ko" : "닫기",
			"en" : "Close"
		},
		"performance": {
			"ko": "WMS 서비스 성능",
			"en": "WMS Service Performance"
		},
		"active":{
			"ko": "활성화",
			"en": "Active"
		},
		"limit":{
			"ko": "레이어 수 제한",
			"en": "Limit the number of Layers"
		}
	}
	var keyStyle = {
		"display" : "table-cell",
		"width" : "30%",
		"vertical-align" : "middle"	,
		"text-align" : "right",
		"padding": "0.785714em", 
		"background": "rgba(0, 0, 0, 0.03)", 
		"font-weight": "700",
		"border-bottom": "1px solid rgba(0, 0, 0, 0.1)"
	};
	
	var contentStyle = {
		"display" : "table-cell",
		"width" : "70%",
		"word-break":" break-word",
		"vertical-align" : "middle"	,
		"padding": "0.785714em",
		"border-bottom": "1px solid rgba(0, 0, 0, 0.1)"
	};
	
	var inputStyle = {
		"width": "inherit",
		"border": "1px solid rgba(34, 36, 38, 0.15)",
		"border-radius": "0.285714rem",
		"line-height": "1.21429em",
		"padding": "0.678571em 1em"
	};
	
	var contentList = [{
			id: "WCS",
			text: "WCS",
			options: ["1.0.0", "1.1.0", "1.1.1", "1.1", "2.0.1"]
		},
		{
			id: "WFS",
			text: "WFS",
			options: ["1.0.0", "1.1.0", "2.0.0"]
		},
		{
			id: "WMS",
			text: "WMS",
			options: ["1.0.0", "1.3.0"]
		},
		{
			id: "TMS",
			text: "TMS",
			options: ["1.0.0"]
		},
		{
			id: "WMSC",
			text: "WMS-C",
			options: ["1.1.1"]
		},
		{
			id: "WMTS",
			text: "WMTS",
			options: ["1.0.0"]
		}];
	
	var key, select, content, row, option;
	var rows = [];
	for(let i = 0; i < contentList.length; i++){
		key = $("<div>").css(keyStyle).text(contentList[i].text);
		
		select = $("<select>").attr("data-id", contentList[i].id).addClass("gb-form");
		
		for(let j = 0; j < contentList[i].options.length; j++){
			option = $("<option>").val(contentList[i].options[j]).text(contentList[i].options[j]);
			select.append(option);
			if(gb.module) {
				if(gb.module.serviceVersion){
					if(gb.module.serviceVersion[select.data("id")] === contentList[i].options[j]){
						option.attr("selected", "selected");
					}
				}
			}
				
		}
		
		select.change(function() {
			var val = $(this).find("option:selected").val();
			if(gb.module) {
				if(gb.module.serviceVersion){
					gb.module.serviceVersion[$(this).data("id")] = val;
				}
			}
		});
		
		content = $("<div>").css(contentStyle).append(select);
		
		row = $("<div>").css({
			"display" : "table-row"
		}).append(key).append(content);
		
		rows.push(row);
	}

	var tb1 = $("<div>").css({
		"display" : "table",
		"width" : "50%"
	}).append(rows[0]).append(rows[1]).append(rows[2]);
	
	var tb2 = $("<div>").css({
		"display" : "table",
		"width" : "50%"
	}).append(rows[3]).append(rows[4]).append(rows[5]);
	
	var toggleInput = $("<input type='checkbox' tabindex='0'>");
	var toggleLabel = $("<label>");
	var toggleDiv = $("<div>").addClass("gb-toggle gb-checkbox").append(toggleInput).append(toggleLabel);
	
	toggleInput.change(function(){
		var bool = true;
		if($(this).is(":checked")){
			toggleDiv.addClass("checked");
			bool = true;
		} else {
			toggleDiv.removeClass("checked");
			bool = false;
		}
		
		if(gb.module) {
			if(gb.module.serviceVersion){
				gb.module.serviceVersion.loadPerformance.active = bool;
			}
		}
	});
	
	var cachekey = $("<div>").css(keyStyle).text(translation.webCacheActive[locale]);
	var cacheContent = $("<div>").css(contentStyle).append(toggleDiv);
	var cacheRow = $("<div>").css({
		"display" : "table-row"
	}).append(cachekey).append(cacheContent);
	
	var tb3 = $("<div>").css({
		"display" : "table",
		"width" : "100%"
	}).append(cacheRow);
	
	key = $("<div>").css(keyStyle).text(translation.active[locale]);
	
	content = $("<div>").css(contentStyle).append(toggleDiv);
	
	row = $("<div>").css({
		"display" : "table-row",
		"width" : "50%"
	}).append(key).append(content);
	
	var tb4 = $("<div>").css({
		"display" : "table",
		"width" : "100%"
	}).append(row);
	
	key = $("<div>").css(keyStyle).text(translation.limit[locale]);
	
	var input = $("<input type='number'>").css(inputStyle).val(gb.module.serviceVersion.loadPerformance.limit);
	
	$(input).change(function() {
		gb.module.serviceVersion.loadPerformance.limit = $(this).val();
	});
	
	content = 
		$("<div>")
			.css(contentStyle)
			.append(input);
	
	row = $("<div>").css({
		"display" : "table-row",
		"width" : "50%"
	}).append(key).append(content);
	
	tb4.append(row);
	
	var serviceVerTitle = $("<h4>").addClass("gb-horizontal").text(translation.serviceVer[locale]);
	var webCacheTitle = $("<h4>").addClass("gb-horizontal").text(translation.webCache[locale]);
	var performanceTitle = $("<h4>").addClass("gb-horizontal").text(translation.performance[locale]);
	
	var body = 
		$("<div>")
			.append(serviceVerTitle)
			.append(
				$("<div>")
					.css({"display": "flex", "margin-bottom": "40px"})
					.append(tb1)
					.append(tb2)
			)
			.append(performanceTitle)
			.append(tb4)
//			.append(webCacheTitle)
//			.append(tb3)
	
	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text(translation.close[locale]);
	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(closeBtn);

	var removeModal = new gb.modal.Base({
		"title" : translation.serverSetting[locale],
		"width" : 574,
		"autoOpen" : true,
		"body" : body,
		"footer" : buttonArea
	});
	$(closeBtn).click(function() {
		removeModal.close();
	});
};