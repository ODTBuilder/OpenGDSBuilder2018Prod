/**
 * 검수 수행창 객체를 정의한다.
 * 
 * @author hochul.kim
 * @class gb.validation.Validation
 * @date 2018. 09
 * @version 0.01
 */
var gb;
if (!gb)
	gb = {};
if (!gb.validation)
	gb.validation = {};

(function($){
	
	let presetIndex_ = 0;
	
	const INDEXLIST = {
		"Digital Map 1.0" : 1,
		"Digital Map 2.0" : 1,
		"Underground Map 1.0" : 2,
		"Underground Map 2.0" : 2,
		"Forest Map" : 2
	};
	
	const QATYPE = {
		"1": {
			"ver": "qa1",
			"type": "nm5"
		},
		"2": {
			"ver": "qa2",
			"type": "nm5"
		},
		"3": {
			"ver": "qa1",
			"type": "ug5"
		},
		"4": {
			"ver": "qa2",
			"type": "ug5"
		},
		"5": {
			"ver": "qa2",
			"type": "fr5"
		},
	};
	
	gb.validation.Validation = function(obj) {
		obj.keep = true;
		gb.modal.Base.call(this, obj);
		var that = this;
		
		var options = obj || {};
	
		this.url = options.url || "";
		
		this.geoserverTree = undefined;
		this.workingTree = undefined;
		this.messageContent = undefined;
		
		this.presetSelectTag = $("<select class='form-control'>");
		
		this.formatSelectTag = $("<select class='form-control validation-format-select'>");
		this.formatSelectTag.append($("<option>").text("Select File Format:"));
		
		this.srsSelectTag = $("<select class='form-control'>");
		this.srsSelectTag.append($("<option>").text("좌표계를 선택해주세요:"));
		this.srsSelectTag.append($("<option>").val("5186").text("중부원점 투영좌표계(Central Belt 2010)"));
		this.srsSelectTag.append($("<option>").val("4737").text("GRS80 경위도 좌표계(Korean 2000)"));
		this.srsSelectTag.append($("<option>").val("4326").text("WGS84 경위도 좌표계(전지구 좌표계)"));
		this.srsSelectTag.append($("<option>").val("5185").text("서부원점 투영좌표계(West Belt 2010)"));
		this.srsSelectTag.append($("<option>").val("5187").text("동부원점 투영좌표계(East Belt 2010)"));
		this.srsSelectTag.append($("<option>").val("5188").text("동해원점 투영좌표계(East Sea Belt 2010)"));
		this.srsSelectTag.append($("<option>").val("32652").text("WGS84 UTM52N 투영좌표계"));
	
		this.createContent();
		
		this.modalFooter.css({
			"position": "relative"
		});
		
		$('<style>.validation-custom-select{position: relative;margin-bottom: 10px;}</style>').appendTo('head');
		$('<style>.validation-custom-select select{display: none;}</style>').appendTo('head');
		$('<style>.validation-select-selected{' +
				'background: #00b5ad none;' +
				'cursor: pointer;' +
				'padding: .78571429em 1.5em .78571429em;' +
				'font-weight: 700;' +
				'border-radius: .28571429rem;' +
				'line-height: 1em;' +
				'color: #fff' +
		'}</style>').appendTo('head');
		$('<style>.validation-select-selected:hover{' +
				'background-color: #009c95;' +
				'background-image: none;' +
		'}</style>').appendTo('head');
		$('<style>.validation-select-selected:after{' +
				'position: absolute;' +
				'content: "";' +
				'top: 14px;' +
				'right: 10px;' +
				'width: 0;' +
				'height: 0;' +
				'border: 6px solid transparent;' +
				'border-color: #fff transparent transparent transparent;' +
		'}</style>').appendTo('head');
		$('<style>.validation-select-selected.select-arrow-active:after{' +
				'border-color: transparent transparent #fff transparent;' +
				'top: 7px;' +
		'}</style>').appendTo('head');
		$('<style>.validation-message{' +
			'position: relative;' +
			'min-height: 1em;' +
			'background: #fffaf3;' +
			'line-height: 1.4285em;' +
			'padding: 4px 4px;' +
			'margin-bottom: 10px;' +
			'color: #573a08;' +
			'display: flex;' +
			'width: 100%;' +
			'-webkit-box-align: center;' +
			'align-items: center;' +
			'border-radius: .28571429rem;' +
			'box-shadow: 0 0 0 1px #c9ba9b inset, 0 0 0 0 transparent;' +
		'}</style>').appendTo('head');
		
		$('<style>.select-items div{' +
				'color: rgba(0,0,0,.87);' +
				'padding: 8px 16px;' +
				'cursor: pointer;' +
				'border: none;' +
				'height: auto;' +
				'text-align: left;' +
				'border-top: none;' +
				'line-height: 1em;' +
				'font-weight: 400;' +
				'box-shadow: none;' +
		'}</style>').appendTo('head');
		$('<style>.select-items{' +
				'position: absolute;' +
				'background-color: #fff;' +
				'margin-top: .3em!important;' +
				'top: 100%;' +
				'left: 0;' +
				'right: 0;' +
				'z-index: 99;' +
				'font-size: 1em;' +
				'text-shadow: none;' +
				'border: 1px solid rgba(34,36,38,.15);' +
				'border-radius: .28571429rem!important;' +
				'box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.15)!important;' +
		'}</style>').appendTo('head');
		$('<style>.select-hide{' +
				'display: none;' +
		'}</style>').appendTo('head');
		$('<style>.select-items div:hover, .same-as-selected{background-color: rgba(0, 0, 0, 0.1);}</style>').appendTo('head');
	}
	
	// gb.footer.Base 상속
	gb.validation.Validation.prototype = Object.create(gb.modal.Base.prototype);
	gb.validation.Validation.prototype.constructor = gb.validation.Validation;
	
	gb.validation.Validation.prototype.getParameter = function(){
		var params = {};
		var datastoreList = {};
		var node;
		var preset = this.presetSelectTag.find("option:selected");
		var srs = this.srsSelectTag.find("option:selected");
		var list = this.workingTree.get_node("#").children_d || [];
		
		params.geoserver = {};
		params.geoserver.layers = {};
		
		for(var i = 0; i < list.length; i++){
			node = this.workingTree.get_node(list[i]);
			if(node.type === "geoserver"){
				params.geoserver.servername = node.text;
			} else if(node.type === "workspace"){
				params.geoserver.layers[node.text] = [];
			} else if(node.type === "datastore"){
				datastoreList[node.id] = this.workingTree.get_node(node.parent).text;
			} else {
				params.geoserver.layers[datastoreList[node.parent]].push(node.text);
			}
		}
		
		if(!srs.val()){
			this.messageContent.html("좌표계를 선택해야합니다.");
		} else {
			params.crs = "EPSG:" + srs.val();
		}
		
		if(!preset.data("prid")){
			this.messageContent.html("Preset ID가 없습니다.");
		} else {
			params.prid = preset.data("prid");
		}
		
		if(!preset.data("cat")){
			this.messageContent.html("Category ID가 없습니다.");
		} else {
			params.cat = preset.data("cat");
			params.qaVer = QATYPE[preset.data("cat").toString()].ver;
			params.qaType = QATYPE[preset.data("cat").toString()].type;
		}
		
		return params;
	}
	
	gb.validation.Validation.prototype.createStepDiv = function(){
		var icon1 = $("<i>");
		var title1 = $("<h2 class='step-title'>");
		var desc1 = $("<h4 class='step-desc'>");
		var content1 = 
			$("<div class='step-content'>")
				.append;
		
		var step1 = 
			$("<div class='step'>")
				.css({
					"position": "relative",
					"display": "flex",
					"padding-left": "2em",
					"width": "33.333%",
					"justify-content": "center"
				})
				.append(icon1)
				.append(content1);
		
		var steps = 
			$("<div class='steps'>")
				.css({
					"display": "inline-flex",
					"-webkit-box-orient": "horizontal",
					"-webkit-box-direction": "normal",
					"-ms-flex-direction": "row",
					"flex-direction": "row",
					"-webkit-box-align": "stretch"
				})
				.append(step1)
				.append(step2);
		var wrapper = $("<div class='step-wrapper'>").css({});
	}
	
	gb.validation.Validation.prototype.createContent = function(){
		// ==================== Create Modal Body HTML Start >>>>>>>>>>>>>>>>>>>>>>
		var treePanel = this.createJSTreePanel();
		var optionPanel = this.createOptionPanel();
		var workTreePanel = this.createWorkTreePanel();
		
		optionPanel.addClass("col-md-12");
		workTreePanel.addClass("col-md-12");
		
		var left = 
			$("<div class='col-md-6'>")
				.append(treePanel);
		
		var rightContent = 
			$("<div class='row'>")
				.append(optionPanel)
				.append(workTreePanel);
		
		var right = 
			$("<div class='col-md-6'>")
				.append(rightContent);
		
		var body = 
			$("<div class='row'>")
				.append(left)
				.append(right)
				.css({
					"width": "700px"
				});
		this.setModalBody(body);
		// <<<<<<<<<<<<<<<<<<<< Create Modal Body HTML End ========================
		
		// ==================== Create Modal Footer HTML Start >>>>>>>>>>>>>>>>>>>>
		var footer = this.createModalFooter();
		this.setModalFooter(footer);
		// <<<<<<<<<<<<<<<<<<<< Create Modal Footer HTML End ======================
		
		$("body").append(this.modal);
		$("body").append(this.background);
	}
	
	gb.validation.Validation.prototype.createJSTreePanel = function() {
		var that = this;
		
		var treeContent = 
			$("<div>")
				.addClass("validation-geoserver-panel")
				.css({
					"min-height": "500px"
				});
		
		var gtree = new gb.tree.GeoServer({
			"append" : treeContent[0],
			"height" : "502px",
			"url" : {
				"getTree" : "geoserver/getGeolayerCollectionTree.ajax"
						+ this.url.token,
				"addGeoServer" : "geoserver/addGeoserver.ajax" + this.url.token,
				"deleteGeoServer" : "geoserver/removeGeoserver.ajax"
						+ this.url.token,
				"getMapWMS" : "geoserver/geoserverWMSGetMap.ajax"
						+ this.url.token,
				"getLayerInfo" : "geoserver/getGeoLayerInfoList.ajax"
						+ this.url.token
			}
		});
		
		this.geoserverTree = gtree.getJSTree();
		
		var icon = 
			$("<i class='fas fa-plus'>")
			
		var panelFooter = 
			$("<div>")
				.css({
					"margin": "-2px 1px 0",
					"cursor": "pointer",
					"box-shadow": "0 0 0 1px rgba(34,36,38,.15)",
					"border-bottom-left-radius": "3px",
					"border-bottom-right-radius": "3px",
					"background": "#e0e1e2 none",
					"padding": ".78571429em 1.5em .78571429em",
					"font-weight": "700",
					"text-align": "center"
				})
				.hover(function(){
					$(this).css({
						"background-color": "#cacbcd",
						"color": "rgba(0,0,0,.8)"
					})
				}, function(){
					$(this).css({
						"background-color": "#e0e1e2",
						"color": "#333"
					})
				})
				.append(icon)
				.append("Add");
		
		panelFooter.on("click", function(e){
			var i, arr, children;
			var tree = that.geoserverTree;
			var workTree = that.workingTree;
			var selects = tree.get_selected(true);
			
			for(i = 0; i < selects.length; i++){
				if(selects[i].parents instanceof Array){
					arr = selects[i].parents.slice();
				}
				
				// 선택된 node의 부모 node들을 전부 추가
				for(var j = arr.shift(); j !== undefined; j = arr.shift()){
					if(j === "#"){
						continue;
					}
					
					if(!workTree.get_node(j)){
						workTree.create_node("#", tree.get_node(j).original, "last", false, false);
					}
					
					if(tree.get_node(j).children.length > 0){
						updateChildren(tree, workTree, tree.get_node(j).children);
					}
					
					if(tree.get_node(j).type === "workspace" && presetIndex_ === 2){
						removeSameTypeNode(tree.get_node(j), workTree, "#");
					}
					
					if(tree.get_node(j).type === "geoserver" && (presetIndex_ === 1 || presetIndex_ === 2)){
						removeSameTypeNode(tree.get_node(j), workTree, "#");
					}
				}
				
				// 선택된 node 추가
				if(!workTree.get_node(selects[i].id)){
					workTree.create_node(selects[i].parent, selects[i].original, "last", false, false);
				}
				
				if(selects[i].type === "workspace" && presetIndex_ === 2){
					removeSameTypeNode(selects[i], workTree, "#");
				}
				
				if(selects[i].type === "geoserver" && (presetIndex_ === 1 || presetIndex_ === 2)){
					removeSameTypeNode(selects[i], workTree, "#");
				}
				
				children = selects[i].children || [];
				// 선택된 node의 자식 node들을 전부 추가
				createChildren(tree, workTree, children);
			}
			
			workTree.open_all();
		});
		
		treeContent.append(panelFooter);
		
		return treeContent;
	}
	
	function removeSameTypeNode(node, workingTree, root){
		var node = node;
		var workTree = workingTree;
		var workNode = workTree.get_node(root);
		var children = workNode.children || [];
		
		if(!!workNode){
			if(node.type === workNode.type && node.id !== workNode.id){
				workTree.delete_node(workNode);
			} else {
				for(var i = 0; i < children.length; i++){
					removeSameTypeNode(node, workTree, children[i])
				}
			}
		}
	}
	
	function createChildren(geoTree, workingTree, children){
		var i, node;
		var tree = geoTree;
		var workTree = workingTree;
		var list = children;
		for(i = 0; i < list.length; i++){
			node = tree.get_node(list[i]);
			if(!workTree.get_node(list[i])){
				workTree.create_node(tree.get_node(list[i]).parent, node.original, "last", false, false);
			}
			if(node.children instanceof Array){
				// 자식 노드가 자식 노드를 가지고 있다면 callback 실행
				createChildren(tree, workTree, node.children);
			}
			
			if(node.type === "workspace" && presetIndex_ === 2){
				break;
			}
		}
	}
	
	// work tree의 자식 노드들을 적절한 부모 노드 아래로 이동
	function updateChildren(geoTree, workingTree, children){
		var i, node;
		var tree = geoTree;
		var workTree = workingTree;
		var list = children;
		for(i = 0; i < list.length; i++){
			node = tree.get_node(list[i]);
			if(!workTree.get_node(list[i])){
				if(node.children.length > 0){
					updateChildren(tree, workTree, node.children);
				}
			} else {
				workTree.move_node(list[i], node.parent);
			}
		}
	}
	
	gb.validation.Validation.prototype.createWorkTreePanel = function() {
		var that = this;
		
		var treeContent = 
			$("<div>")
				.addClass("gb-article-body")
				.css({
					"height": "365px",
					"overflow-y": "auto"
				});
		
		treeContent.jstree({
			"core" : {
				"animation" : 0,
				"check_callback" : true,
				"themes" : { "stripes" : true },
				'data' : []
			},
			"types" : {
				"default" : {
					"icon" : "fas fa-exclamation-circle"
				},
				"geoserver" : {
					"icon" : "fas fa-globe",
					"valid_children" : [ "workspace" ]
				},
				"workspace" : {
					"icon" : "fas fa-archive",
					"valid_children" : [ "datastore" ]
				},
				"datastore" : {
					"icon" : "fas fa-hdd",
					"valid_children" : [ "raster", "polygon", "multipolygon", "linestring", "multilinestring", "point", "multipoint" ]
				},
				"raster" : {
					"icon" : "fas fa-chess-board"
				},
				"polygon" : {
					"icon" : "fas fa-square-full"
				},
				"multipolygon" : {
					"icon" : "fas fa-square-full"
				},
				"linestring" : {
					"icon" : "fas fa-minus fa-lg gb-fa-rotate-135"
				},
				"multilinestring" : {
					"icon" : "fas fa-minus fa-lg gb-fa-rotate-135"
				},
				"point" : {
					"icon" : "fas fa-circle gb-fa-xxs"
				},
				"multipoint" : {
					"icon" : "fas fa-circle gb-fa-xxs"
				}
			},
			"plugins" : [
				"contextmenu", "dnd", "search",
				"state", "types", "wholerow"
			]
		});
		
		this.workingTree = treeContent.jstree(true);
		
		var panelTitle = $("<p>").text("Validate List").css({
			"margin" : "0",
			"float" : "left"
		});
		var titleArea = $("<div>").append(panelTitle)
		var panelHead = $("<div>").addClass("gb-article-head").append(titleArea);
		
		var panelFooter = 
			$("<div>")
				.css({
					"margin": "-2px 1px 0",
					"cursor": "pointer",
					"box-shadow": "0 0 0 1px rgba(34,36,38,.15)",
					"border-bottom-left-radius": "3px",
					"border-bottom-right-radius": "3px",
					"background": "#e0e1e2 none",
					"padding": ".78571429em 1.5em .78571429em",
					"font-weight": "700",
					"text-align": "center"
				})
				.hover(function(){
					$(this).css({
						"background-color": "#cacbcd",
						"color": "rgba(0,0,0,.8)"
					})
				}, function(){
					$(this).css({
						"background-color": "#e0e1e2",
						"color": "#333"
					})
				})
				.append($("<i class='fas fa-minus'>"))
				.append("Remove");
		
		panelFooter.on("click", function(e){
			var workTree = that.workingTree;
			var selects = workTree.get_selected();
			
			workTree.delete_node(selects);
		});
		
		var panel = $("<div>").addClass("gb-article").css({
			"margin" : "0"
		}).append(panelHead).append(treeContent).append(panelFooter);
		
		var div = $("<div>").addClass("validation-worktree-panel").append(panel);
		return div;
	}
	
	gb.validation.Validation.prototype.createOptionPanel = function() {
		
		// ==================== Create Panel body HTML Start >>>>>>>>>>>>>>>>>>>>
		var presetDiv = $("<div>").addClass("validation-custom-select").append(this.presetSelectTag);
		//var formatDiv = $("<div>").addClass("validation-custom-select").append(this.formatSelectTag);
		var srsDiv = $("<div>").addClass("validation-custom-select").append(this.srsSelectTag);
		
		var i = $("<div>").addClass("fas fa-info-circle fa-2x");
		this.messageContent = $("<p>").css({
			"margin": "0 3px"
		}).html("사용자 정의 옵션을 먼저 선택해주세요.");
		var message = $("<div>").addClass("validation-message").append(i).append(this.messageContent);
		var body = 
			$("<div>")
				.append(presetDiv).append(srsDiv).append(message);
		
		requestPreset(this, this.presetSelectTag, presetDiv, this.messageContent);
		//customSelect(formatDiv);
		customSelect(srsDiv);
		
		// <<<<<<<<<<<<<<<<<<<< Create Panel body HTML End ======================
		
		var article = 
			$("<div>")
				.append(body)
				.css({
					"margin": 0
				});
		var div = $("<div>").addClass("validation-option-panel").append(article);
		return div;
	}
	
	gb.validation.Validation.prototype.createModalFooter = function() {
		var that = this;
		
		var closeBtn = 
			$("<button>")
				.css({
					"float" : "right"
				})
				.addClass("gb-button")
				.addClass("gb-button-default")
				.text("Close")
				.click(function() {
					that.close();
				});
		
		var startBtn = 
			$("<button>")
				.css({
					"float" : "right"
				})
				.addClass("gb-button")
				.addClass("gb-button-primary")
				.text("Start")
				.click(function(e) {
					var params = that.getParameter();
					
					var deferredObj = 
						$.ajax({
						url : that.url.requestValidate + that.url.token,
						type : "POST",
						contentType : "application/json; charset=UTF-8",
						dataType : "json",
						cache : false,
						data : params,
						traditional: true
					});
					
					deferredObj.done(function(data, textStatus, jqXHR) {
						alert("검수 요청이 완료되었습니다. 검수 결과 페이지에서 진행 상황을 확인할 수 있습니다.");
						that.close();
					});
					
					deferredObj.fail(function(jqXHR, textStatus, errorThrown) {
						alert("검수 요청이 실패했습니다.");
						that.close();
					});
				});
	
		var buttonArea = 
			$("<span>")
				.addClass("gb-modal-buttons")
				.append(startBtn)
				.append(closeBtn);
	
		return buttonArea;
	}
	
	function requestPreset(that, obj, div, message){
		var select = obj;
		var div = div;
		var message = message;
		$.ajax({
			url : "option/retrievePresetByUidx.ajax",
			method : "GET",
			success : function(data, textStatus, jqXHR) {
				var option = $("<option>").val("false").text("사용자 정의 옵션을 선택해주세요:");
				select.append(option);
				for (var i = 0; i < data.length; i++) {
					option = 
						$("<option>")
							.val(data[i].pid)
							.attr("data-title", data[i].title)
							.attr("data-cat", data[i].cat)
							.attr("data-prid", data[i].pid)
							.text(data[i].name);
					
					select.append(option);
					
				}
				customSelect(div, message, that);
			}
		});
	}
	
	function customSelect(selectDiv, message, that){
		var x, j, selElmnt, a, b, c;
		var that = that;
		/*look for any elements with the class "custom-select":*/
		x = selectDiv;
		selElmnt = x.find("select")[0];
		/*for each element, create a new DIV that will act as the selected item:*/
		a = $("<div>").addClass("validation-select-selected");
		a.html(selElmnt.options[selElmnt.selectedIndex].innerHTML);
		x.append(a);
		/*for each element, create a new DIV that will contain the option list:*/
		b = $("<div>").addClass("select-items select-hide");
		for (j = 1; j < selElmnt.length; j++) {
			/*for each option in the original select element,
			create a new DIV that will act as an option item:*/
			c = $("<div>");
			c.html(selElmnt.options[j].innerHTML);
			c.on("click", function(e) {
				/*when an item is clicked, update the original select box,
				and the selected item:*/
				var y, i, k, s, h, l, list;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				h = this.parentNode.previousSibling;
				for (i = 0; i < s.length; i++) {
					if (s.options[i].innerHTML == this.innerHTML) {
						s.selectedIndex = i;
						h.innerHTML = this.innerHTML;
						y = this.parentNode.getElementsByClassName("same-as-selected");
						for (k = 0; k < y.length; k++) {
							y[k].removeAttribute("class");
						}
						this.setAttribute("class", "same-as-selected");
						if(!!s.options[i].dataset.title){
							if(!!INDEXLIST[s.options[i].dataset.title]){
								if(INDEXLIST[s.options[i].dataset.title] === 1){
									message.html(s.options[i].dataset.title + "는 workspace를 여러개 선택할 수 있습니다.");
								} else if(INDEXLIST[s.options[i].dataset.title] === 2){
									message.html(s.options[i].dataset.title + "는 workspace를 하나만 선택할 수 있습니다.");
								}
								if(presetIndex_ !== undefined && presetIndex_ !== null){
									if(presetIndex_ !== INDEXLIST[s.options[i].dataset.title]){
										var arr = that.workingTree.get_node("#").children || [];
										for(var t = 0; t < arr.length; t++){
											that.workingTree.delete_node(arr[t]);
										}
									}
									presetIndex_ = INDEXLIST[s.options[i].dataset.title];
								}
							}
							
						}
						break;
					}
				}
				h.click();
			});
			b.append(c);
		}
		x.append(b);
		a.on("click", function(e) {
			/*when the select box is clicked, close any other select boxes,
			and open/close the current select box:*/
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
		});
	}
	
	function updateFormatSelect(list){
		var l;
		$(".validation-format-select").parent().find(".validation-select-selected").empty();
		$(".validation-format-select").parent().find(".select-items").empty();
		$(".validation-format-select").empty();
		$(".validation-format-select").append($("<option>").text("Select File Format:"));
		$(".validation-format-select").parent().find(".validation-select-selected").html("Select File Format:");
		for(l = 0; l < list.length; l++){
			$(".validation-format-select").append($("<option>").val(list[l]).text(list[l]));
			$(".validation-format-select").parent().find(".select-items").append(
				$("<div>").html(list[l]).on("click", function(e){
					var y, i, k, s, h;
					s = this.parentNode.parentNode.getElementsByTagName("select")[0];
					h = this.parentNode.previousSibling;
					for (i = 0; i < s.length; i++) {
						if (s.options[i].innerHTML == this.innerHTML) {
							s.selectedIndex = i;
							h.innerHTML = this.innerHTML;
							y = this.parentNode.getElementsByClassName("same-as-selected");
							for (k = 0; k < y.length; k++) {
								y[k].removeAttribute("class");
							}
							this.setAttribute("class", "same-as-selected");
							break;
						}
					}
					h.click();
				})
			);
		}
	}
	
	function closeAllSelect(elmnt) {
		/*a function that will close all select boxes in the document,
		except the current select box:*/
		var x, y, i, arrNo = [];
		x = document.getElementsByClassName("select-items");
		y = document.getElementsByClassName("validation-select-selected");
		for (i = 0; i < y.length; i++) {
			if (elmnt == y[i]) {
				arrNo.push(i)
			} else {
				y[i].classList.remove("select-arrow-active");
			}
		}
		for (i = 0; i < x.length; i++) {
			if (arrNo.indexOf(i)) {
				x[i].classList.add("select-hide");
			}
		}
	}
}(jQuery));