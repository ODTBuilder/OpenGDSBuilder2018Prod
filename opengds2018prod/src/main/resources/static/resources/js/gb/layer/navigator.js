/**
 * Layer Navigator
 * 
 * @author hochul.kim
 * @date 2018. 09. 18
 * @version 0.01
 */
var gb;
if (!gb)
	gb = {};
if (!gb.layer)
	gb.layer = {};

gb.layer.Navigator = function(obj) {
	var options = obj;
	
	this.map = options.map || false;
	if(!this.map){
		console.error("gb.layer.Navigator: ol.map is required");
		return null;
	}
	
	this.count = 0;
	
	this.td2 = $("<div>").css({
		"display" : "inline-block"
	});
	
	this.tbody = $("<tbody>");
	
	this.naviWindow = $("<div>").css({
		"max-width" : "500px",
		"top" : "100px",
		"right" : 0,
		"position" : "absolute",
		"z-Index" : "999",
	});
	
	this.createNavigator_();
}

gb.layer.Navigator.prototype.createNavigator_ = function(){
	var that = this;
	var prevIcon = $("<span>").addClass("glyphicon").addClass("glyphicon-backward"),
		nextIcon = $("<span>").addClass("glyphicon").addClass("glyphicon-forward");
	
	var btnPrev = 
			$("<button>")
				.addClass("gb-navigator-prev")
				.addClass("btn").addClass("btn-default")
				.append(prevIcon), 
		btnNext = 
			$("<button>")
			.addClass("gb-navigator-next")
			.addClass("btn").addClass("btn-default").append(nextIcon);
	
	$(document).on("click", ".gb-navigator-prev", function() {
		that.prev();
	});
	
	$(document).on("click", ".gb-navigator-next", function() {
		that.next();
	});
	
	var td1 = $("<div>").css({
		"width" : "100px",
		"display" : "inline-block"
	}).append(btnPrev), td3 = $("<div>").css({
		"width" : "100px",
		"display" : "inline-block"
	}).append(btnNext);
	var tr1 = $("<div>").addClass("text-center").append(td1).append(this.td2).append(td3);
	var thead = $("<div>").css({
		"margin-bottom" : "10px"
	}).append(tr1);
	var xSpan = $("<span>").attr({
		"aria-hidden" : "true"
	}).append("&times;");
	var xBtn = $("<button>").click(function() {
		$(that.naviWindow).hide();
	}).attr({
		"data-dismiss" : "modal",
		"aria-label" : "Close"
	}).css({
		"display" : "inline-block",
		"float" : "right",
		"padding" : "0",
		"margin" : "0",
		"color" : "#ccc",
		"border" : "none",
		"background-color" : "transparent",
		"cursor" : "pointer",
		"outline" : "none",
		"color" : "#ccc"
	}).append(xSpan);

	var title = $("<span>").text("Error Navigator");
	var tb = $("<table>").addClass("table").append(this.tbody);
	var pbd = $("<div>").addClass("panel-body").append(thead).append(tb);
	var phd = $("<div>").addClass("panel-heading").append(title).append(xBtn);
	var pdf = $("<div>").addClass("panel").addClass("panel-default").append(phd).append(pbd);
	this.naviWindow.append(pdf);

	$("body").append(this.naviWindow);
	$(this.naviWindow).hide();
	$(this.naviWindow).draggable({
		appendTo : "body",
	});
}

gb.layer.Navigator.prototype.open = function(){
	$(this.naviWindow).show();
}

gb.layer.Navigator.prototype.close = function(){
	$(this.naviWindow).hide();
}

gb.layer.Navigator.prototype.showFeatureInfo = function(feature) {
	if (!feature) {
		console.log("no feature maybe there is no error");
		return;
	}
	var fid = feature.getId();
	$(this.td2).text(fid);
	var prop = feature.getProperties();
	var keys = Object.keys(prop);
	$(this.tbody).empty();
	for (var i = 0; i < keys.length; i++) {
		var td1 = $("<td>").text(keys[i]);
		if (keys[i] === this.options.linkKey) {
			var anc = $("<a>").addClass("gb-navigator-link").attr({
				"href" : "#",
				"value" : prop[keys[i]]
			}).text("Move to feature");
			var td2 = $("<td>").attr("colspan", 2).append(anc);
		} else {
			var td2 = $("<td>").attr("colspan", 2).text(prop[keys[i]]);
		}
		var tr1 = $("<tr>").append(td1).append(td2);
		$(this.tbody).append(tr1);
	}
	var geom = feature.getGeometry();
	this.map.getView().fit(geom.getExtent(), this.map.getSize());
	this.map.getView().setZoom(16);
}

gb.layer.Navigator.prototype.prev = function(){
	if (this.count > 1 && this.count < this.features.length + 1) {
		this.count--;
	}
	var feature = this.source.getFeatureById(this.lid + "." + this.count);
	if (feature) {
		this.showFeatureInfo(feature);
	}
}

gb.layer.Navigator.prototype.next = function(){
	if (this.count > 0 && this.count < this.features.length) {
		this.count++;
	}
	var feature = this.source.getFeatureById(this.lid + "." + this.count);
	if (feature) {
		this.showFeatureInfo(feature);
	}
}
