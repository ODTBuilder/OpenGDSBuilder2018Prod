/**
 * GeoGig repository 모달 객체를 정의한다.
 * 
 * @class gb.versioning.Repository
 * @memberof gb.versioning
 * @param {Object}
 *            obj - 생성자 옵션을 담은 객체
 * @param {Object}
 *            obj.url - 요청을 수행할 URL
 * @param {String}
 *            obj.url.beginTransaction - 작업을 수행하기 위한 트랜잭션 ID 발급을 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.endTransaction - 작업을 수행하기 위한 트랜잭션 ID 적용 및 해제 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.cancelTransaction - 작업을 수행하기 위한 트랜잭션 ID 미적용 및 해제 요청할 컨트롤러
 *            주소
 * @param {String}
 *            obj.url.getWorkingTree - 등록한 지오서버의 워킹트리 목록 데이터를 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.checkoutBranch- 선택한 브랜치를 체크아웃 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.createBranch - 새로운 브랜치 생성을 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.branchList - 선택한 repository의 브랜치 목록을 조회할 컨트롤러 주소
 * @param {String}
 *            obj.url.mergeBranch - 브랜치간의 머지를 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.resolveConflict - 충돌 문제 해결을 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.listRemoteRepository - 원격 Repository의 목록을 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.addRemoteRepository - 원격 Repository의 추가를 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.removeRemoteRepository - 원격 Repository 삭제를 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.pingRemoteRepository - 원격 Repository의 연결상태를 확인할 컨트롤러 주소
 * @param {String}
 *            obj.url.pullRepository - 원격 Repository에서 Local branch로 Pull 요청할
 *            컨트롤러 주소
 * @param {String}
 *            obj.url.pushRepository - Local branch에서 원격 Repository로 Push 요청할
 *            컨트롤러 주소
 * @version 0.01
 * @author SOYIJUN
 * @date 2018. 07.13
 */
gb.versioning.Repository = function(obj) {
	obj.width = 610;
	obj.height = 450;
	obj.title = "GeoGig";
	obj.autoOpen = false;
	gb.modal.Base.call(this, obj);
	var that = this;
	var options = obj ? obj : {};

	var refIcon = $("<i>").addClass("fas").addClass("fa-sync-alt");
	this.refBtn = $("<button>").addClass("gb-button-clear").append(refIcon).css({
		"float" : "right"
	}).click(function() {
		that.refreshList();
	});
	var head = $("<div>").append(this.refBtn);
	this.treeArea = $("<div>");
	$(this.treeArea).jstree({
		"core" : {
			"animation" : 0,
			"check_callback" : true,
			"themes" : {
				"stripes" : true
			},
			'data' : [ {
				"id" : "geoserver1",
				"parent" : "#",
				"text" : "geoserver1",
				"type" : "geoserver"
			}, {
				"id" : "repository1",
				"parent" : "geoserver1",
				"text" : "repository1",
				"type" : "repository"
			}, {
				"id" : "branch1",
				"parent" : "repository1",
				"text" : "branch1",
				"type" : "branch"
			}, {
				"id" : "layer1",
				"parent" : "branch1",
				"text" : "layer1",
				"type" : "polygon"
			}, {
				"id" : "layer2",
				"parent" : "branch1",
				"text" : "layer2",
				"type" : "linestring"
			}, ]
		/*
		 * 'data' : { 'url' : function() { return
		 * 'geoserver/getGeolayerCollectionTree.ajax?treeType=all'; } }
		 */
		},
		"search" : {
			show_only_matches : true
		},
		types : {
			"#" : {
				"valid_children" : [ "geoserver" ]
			},
			"geoserver" : {
				"icon" : "fas fa-globe",
				"valid_children" : [ "repository" ]
			},
			"repository" : {
				"icon" : "fas fa-archive",
				"valid_children" : [ "branch" ]
			},
			"branch" : {
				"icon" : "fas fa-code-branch",
				"valid_children" : [ "polygon", "multipolygon", "linestring", "multilinestring", "point", "multipoint" ]
			},
			"polygon" : {
				"icon" : "fas fa-square-full"
			},
			"multipolygon" : {
				"icon" : "fas fa-square-full"
			},
			"linestring" : {
				"icon" : "fas fa-minus"
			},
			"multilinestring" : {
				"icon" : "fas fa-minus"
			},
			"point" : {
				"icon" : "fas fa-circle"
			},
			"multipoint" : {
				"icon" : "fas fa-circle"
			}
		},
		geogigfunction : {

		},
		"plugins" : [ "search", "state", "types", "geogigfunction" ]
	});
	this.jstree = $(this.treeArea).jstree(true);
	var body = $("<div>").append(this.treeArea);
	this.mbody = $("<div>").append(head).append(body);
	this.setModalBody(this.mbody);

	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Close").click(function() {
		that.close();
	});

	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(closeBtn);
	this.setModalFooter(buttonArea);
};
gb.versioning.Repository.prototype = Object.create(gb.modal.Base.prototype);
gb.versioning.Repository.prototype.constructor = gb.versioning.Repository;

/**
 * 
 * 
 * @method gb.versioning.Repository#getWorkingTree
 * @param {String}
 *            serverName - 등록한 서버 이름
 * @param {String}
 *            repoName - GeoGig repository 이름
 * @param {String}
 *            reference - 체크아웃한 브랜치 이름
 * @param {String}
 *            transactionId - 요청에 필요한 트랜잭션 ID
 * @return {Object[]} 트리 목록에 추가할 워킹트리
 * 
 */
gb.versioning.Repository.prototype.getWorkingTree = function(serverName, repoName, reference, transactionId) {
	$.ajax({
		url : this.getFeature,
		method : "POST",
		contentType : "application/json; charset=UTF-8",
		data : params,
		// dataType : 'jsonp',
		// jsonpCallback : 'getJson',
		beforeSend : function() {
			$("body").css("cursor", "wait");
		},
		complete : function() {
			$("body").css("cursor", "default");
		},
		success : function(data) {

		}
	});
};

/**
 * 등록한 지오서버의 GeoGig repository 워킹트리를 불러온다
 * 
 * @method gb.versioning.Repository#getWorkingTree
 * @param {String}
 *            serverName - 등록한 서버 이름
 * @param {String}
 *            repoName - GeoGig repository 이름
 * @param {String}
 *            reference - 체크아웃한 브랜치 이름
 * @param {String}
 *            transactionId - 요청에 필요한 트랜잭션 ID
 * @return {Object[]} 트리 목록에 추가할 워킹트리
 * 
 */
gb.versioning.Repository.prototype.getWorkingTree = function(serverName, repoName, reference, transactionId) {
	$.ajax({
		url : this.getFeature,
		method : "POST",
		contentType : "application/json; charset=UTF-8",
		data : params,
		// dataType : 'jsonp',
		// jsonpCallback : 'getJson',
		beforeSend : function() {
			$("body").css("cursor", "wait");
		},
		complete : function() {
			$("body").css("cursor", "default");
		},
		success : function(data) {

		}
	});
};
