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
 *            obj.url.serverTree - 서버 목록 트리를 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.beginTransaction - 작업을 수행하기 위한 트랜잭션 ID 발급을 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.endTransaction - 작업을 수행하기 위한 트랜잭션 ID 적용 및 해제 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.cancelTransaction - 작업을 수행하기 위한 트랜잭션 ID 미적용 및 해제 요청할 컨트롤러
 *            주소
 * @param {String}
 *            obj.url.workingTree - 등록한 지오서버의 워킹트리 목록 데이터를 요청할 컨트롤러 주소
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
 *            obj.url.remoteTree - 원격 Repository의 목록을 요청할 컨트롤러 주소
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
	obj.width = 730;
	obj.height = 450;
	obj.title = "GeoGig";
	obj.autoOpen = false;
	gb.modal.Base.call(this, obj);
	var that = this;
	var options = obj ? obj : {};
	var url = options.url ? options.url : {};
	this.serverTreeURL = url.serverTree ? url.serverTree : undefined;
	this.transactionIdURL = url.transactionId ? url.transactionId : undefined;
	this.checkoutURL = url.checkoutBranch ? url.checkoutBranch : undefined;
	this.remoteTreeURL = url.remoteTree ? url.remoteTree : undefined;
	this.nowRepo = undefined;
	this.nowRepoServer = undefined;
	var refIcon = $("<i>").addClass("fas").addClass("fa-sync-alt");
	this.refBtn = $("<button>").addClass("gb-button-clear").append(refIcon).css({
		"float" : "right"
	}).click(function() {
		that.refreshList();
	});
	this.searchInput = $("<input>").attr({
		"type" : "text"
	}).css({
		"border" : "0",
		"border-bottom" : "solid 1px #909090",
		"background-color" : "transparent",
		"width" : "94%"
	});
	$(this.searchInput).keyup(function() {
		if (that.tout) {
			clearTimeout(that.tout);
		}
		that.tout = setTimeout(function() {
			var v = $(that.searchInput).val();
			that.getJSTree().search(v);
		}, 250);
	});
	var head = $("<div>").addClass("gb-article-head").append(this.searchInput).append(this.refBtn);
	this.treeArea = $("<div>");
	$(this.treeArea).jstree({
		"core" : {
			"animation" : 0,
			"check_callback" : true,
			"themes" : {
				"stripes" : true
			},
			"data" : {
				'url' : function(node) {
					var url = that.getServerTreeURL();
					return url;
				},
				"data" : function(node) {
					var obj = {};
					if (node.id === "#") {
						obj["type"] = "server";
					} else if (node.type === "geoserver") {
						obj["type"] = "repository";
						obj["serverName"] = node.id;
						obj["node"] = node.id;
					} else if (node.type === "repository") {
						obj["type"] = "branch";
						obj["serverName"] = node.parent;
						obj["node"] = node.id;
						var tranId = that.getJSTree()._data.geogigfunction.transactionId;
						if (tranId.hasOwnProperty(node.id)) {
							obj["transactionId"] = tranId[node.id];
						}
					} else if (node.type === "branch") {
						obj["type"] = "layer";
						obj["serverName"] = node.parents[1];
						obj["node"] = node.id
					}
					console.log(obj);
					return obj;
				}
			}

		},
		"search" : {
			show_only_matches : true
		},
		types : {
			"#" : {
				"valid_children" : [ "geoserver" ]
			},
			"default" : {
				"icon" : "fas fa-exclamation-circle"
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
				"valid_children" : [ "layer" ]
			},
			"layer" : {
				"icon" : "fas fa-file"
			}
		},
		geogigfunction : {
			"repository" : that,
			"status" : {
				"checkout" : "fas fa-check",
				"unstaged" : "gb-geogig-unstaged",
				"staged" : "gb-geogig-staged",
				"unmerged" : "gb-geogig-unmerged",
				"merged" : "gb-geogig-merged"
			}
		},
		"plugins" : [ "search", "types", "geogigfunction" ]
	});
	this.jstree = $(this.treeArea).jstree(true);
	// $(this.treeArea).on("select_node.jstree", function(e, data) {
	// console.log(e);
	// console.log(data);
	// var node = data.node;
	// if (node.type === "branch") {
	// var server = node.parents[1];
	// var serverNode = that.jstree.get_node(server);
	// var repo = node.parents[0];
	// var repoNode = that.jstree.get_node(repo);
	// that.getTransactionId(serverNode.id, repoNode.text);
	// }
	// });

	var v = this.jstree.get_json('#', {
		no_state : true,
		flat : true
	});
	var json_obj = JSON.stringify(v);
	console.log(json_obj);
	var body = $("<div>").css({
		"height" : "306px",
		"overflow-y" : "auto",
		"width" : "100%"
	}).append(this.treeArea);
	this.serverArea = $("<div>").append(head).append(body);
	var backIcon = $("<i>").addClass("fas").addClass("fa-arrow-left");
	this.backToTreeBtn = $("<button>").addClass("gb-button-clear").append(backIcon).click(function() {
		that.transitPage("server");
	});

	var refRemoteIcon = $("<i>").addClass("fas").addClass("fa-sync-alt");
	this.refreshRemoteTreeBtn = $("<button>").addClass("gb-button-clear").append(refRemoteIcon).click(function() {
		that.refreshRemoteList();
	}).css({
		"float" : "right"
	});
	var addIcon = $("<i>").addClass("fas").addClass("fa-plus");
	this.addRemoteBtn = $("<button>").addClass("gb-button-clear").append(addIcon).click(function() {
		console.log("add remote");
	}).css({
		"float" : 'right'
	});
	this.remoteTitle = $("<span>");
	this.remoteHead = $("<div>").addClass("gb-article-head").append(this.backToTreeBtn).append(this.remoteTitle).append(this.addRemoteBtn)
			.append(this.refreshRemoteTreeBtn);
	this.remoteTree = $("<div>");
	$(this.remoteTree).jstree({
		"core" : {
			"animation" : 0,
			"check_callback" : true,
			"themes" : {
				"stripes" : true
			},
			"data" : {
				'url' : function(node) {
					var url = that.getRemoteTreeURL();
					return url;
				},
				"data" : function(node) {
					var obj = {};
					// if (node.id === "#") {
					// obj["type"] = "server";
					// } else if (node.type === "geoserver") {
					// obj["type"] = "repository";
					// obj["serverName"] = node.id;
					// obj["node"] = node.id;
					// } else
					if (node.id === "#") {
						obj["type"] = "remoteRepository";
						obj["node"] = that.getNowRepository();
						obj["serverName"] = that.getNowRepositoryServer();
					} else if (node.type === "remoteRepository") {
						obj["type"] = "remoteBranch";
						obj["serverName"] = node.parents[1];
						obj["node"] = node.id
					}
					console.log(obj);
					return obj;
				}
			}

		},
		"search" : {
			show_only_matches : true
		},
		types : {
			"#" : {
				"valid_children" : [ "geoserver" ]
			},
			"default" : {
				"icon" : "fas fa-exclamation-circle"
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
				"valid_children" : [ "layer" ]
			},
			"layer" : {
				"icon" : "fas fa-file"
			}
		},
		geogigfunction : {
			"repository" : that,
			"status" : {
				"checkout" : "fas fa-check",
				"unstaged" : "gb-geogig-unstaged",
				"staged" : "gb-geogig-staged",
				"unmerged" : "gb-geogig-unmerged",
				"merged" : "gb-geogig-merged"
			}
		},
		"plugins" : [ "search", "types", "geogigfunction" ]
	});
	this.remotejstree = $(this.remoteTree).jstree(true);
	var remoteBody = $("<div>").css({
		"height" : "306px",
		"overflow-y" : "auto",
		"width" : "100%"
	}).append(this.remoteTree);
	this.remoteArea = $("<div>").append(this.remoteHead).append(remoteBody);
	this.historyArea = $("<div>");
	this.newBranchArea = $("<div>");
	this.mergeArea = $("<div>");
	this.failArea = $("<div>");
	this.mbody = $("<div>").append(this.serverArea).append(this.remoteArea).append(this.historyArea).append(this.mergeArea).append(
			this.failArea);
	this.setModalBody(this.mbody);
	$(this.getModalBody()).css({
		"padding" : "0"
	});
	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Close").click(function() {
		that.close();
	});

	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(closeBtn);
	this.setModalFooter(buttonArea);
	this.getCheckoutBranchURL("server");
};
gb.versioning.Repository.prototype = Object.create(gb.modal.Base.prototype);
gb.versioning.Repository.prototype.constructor = gb.versioning.Repository;

/**
 * 페이지를 전환한다.
 * 
 * @method gb.versioning.Repository#manageRemoteRepository
 * @param {String}
 */
gb.versioning.Repository.prototype.manageRemoteRepository = function(server, repo) {
	var serverName = server.text;
	var repoName = repo.text;
	$(this.remoteTitle).empty();
	$(this.remoteTitle).text(repoName);
	this.transitPage("remote");
	this.refreshRemoteList();
};

/**
 * 페이지를 전환한다.
 * 
 * @method gb.versioning.Repository#transitPage
 * @param {String}
 *            page - 전환할 페이지 이름 (server, remote, history, newbranch, merge,
 *            fail)
 */
gb.versioning.Repository.prototype.transitPage = function(page) {
	if (page === "server") {
		$(this.remoteArea).hide();
		$(this.historyArea).hide();
		$(this.newBranchArea).hide();
		$(this.mergeArea).hide();
		$(this.failArea).hide();
		$(this.serverArea).show();
	} else if (page === "remote") {
		$(this.historyArea).hide();
		$(this.newBranchArea).hide();
		$(this.mergeArea).hide();
		$(this.failArea).hide();
		$(this.serverArea).hide();
		$(this.remoteArea).show();
	} else if (page === "history") {
		$(this.remoteArea).hide();
		$(this.newBranchArea).hide();
		$(this.mergeArea).hide();
		$(this.failArea).hide();
		$(this.serverArea).hide();
		$(this.historyArea).show();
	} else if (page === "newbranch") {
		$(this.remoteArea).hide();
		$(this.historyArea).hide();
		$(this.mergeArea).hide();
		$(this.failArea).hide();
		$(this.serverArea).hide();
		$(this.newBranchArea).show();
	} else if (page === "merge") {
		$(this.remoteArea).hide();
		$(this.historyArea).hide();
		$(this.newBranchArea).hide();
		$(this.failArea).hide();
		$(this.serverArea).hide();
		$(this.mergeArea).show();
	} else if (page === "fail") {
		$(this.remoteArea).hide();
		$(this.historyArea).hide();
		$(this.newBranchArea).hide();
		$(this.mergeArea).hide();
		$(this.serverArea).hide();
		$(this.failArea).show();
	}
};

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
gb.versioning.Repository.prototype.getTransactionId = function(serverName, repoName) {
	var params = {
		"serverName" : serverName,
		"repoName" : repoName
	}
	// + "&" + jQuery.param(params),
	var tranURL = this.getTransactionIdURL();
	if (tranURL.indexOf("?") !== -1) {
		tranURL += "&";
		tranURL += jQuery.param(params);
	} else {
		tranURL += "?";
		tranURL += jQuery.param(params);
	}

	$.ajax({
		url : tranURL,
		method : "POST",
		contentType : "application/json; charset=UTF-8",
		// data : params,
		// dataType : 'jsonp',
		// jsonpCallback : 'getJson',
		beforeSend : function() {
			// $("body").css("cursor", "wait");
		},
		complete : function() {
			// $("body").css("cursor", "default");
		},
		success : function(data) {
			console.log(data);
		}
	});
};

/**
 * GeoGig 목록을 새로고침한다.
 * 
 * @method gb.versioning.Repository#refreshList
 */
gb.versioning.Repository.prototype.refreshList = function() {
	this.jstree.refresh();
};

/**
 * Remote repository 목록을 새로고침한다.
 * 
 * @method gb.versioning.Repository#refreshRemoteList
 */
gb.versioning.Repository.prototype.refreshRemoteList = function() {
	this.remotejstree.refresh();
};

/**
 * jsTree 객체를 반환한다.
 * 
 * @method gb.versioning.Repository#getJSTree
 * @return
 */
gb.versioning.Repository.prototype.getJSTree = function() {
	return this.jstree;
};

/**
 * 서버 목록 트리 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getServerTreeURL
 * @return {String} 서버 목록 주소 URL
 */
gb.versioning.Repository.prototype.getServerTreeURL = function() {
	return this.serverTreeURL;
};

/**
 * 트랜잭션 아이디 발급 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getTransactionIdURL
 * @return {String} 트랜잭션 아이디 주소 URL
 */
gb.versioning.Repository.prototype.getTransactionIdURL = function() {
	return this.transactionIdURL;
};

/**
 * 브랜치 체크아웃 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getTransactionIdURL
 * @return {String} 트랜잭션 아이디 주소 URL
 */
gb.versioning.Repository.prototype.getCheckoutBranchURL = function() {
	return this.checkoutURL;
};

/**
 * 리모트 레파지토리 트리 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getTransactionIdURL
 * @return {String} 컨트롤러 주소 URL
 */
gb.versioning.Repository.prototype.getRemoteTreeURL = function() {
	return this.remoteTreeURL;
};

/**
 * 현재 보고있는 레파지토리의 이름을 반환한다.
 * 
 * @method gb.versioning.Repository#getNowRepository
 * @return {String} 레파지토리 이름
 */
gb.versioning.Repository.prototype.getNowRepository = function() {
	return this.nowRepo;
};

/**
 * 현재 보고있는 레파지토리의 이름을 설정한다.
 * 
 * @method gb.versioning.Repository#setNowRepository
 * @param {String}
 *            레파지토리 이름
 */
gb.versioning.Repository.prototype.setNowRepository = function(repo) {
	this.nowRepo = repo;
};

/**
 * 현재 보고있는 레파지토리의 서버 이름을 반환한다.
 * 
 * @method gb.versioning.Repository#getNowRepositoryServer
 * @return {String} 레파지토리 서버 이름
 */
gb.versioning.Repository.prototype.getNowRepositoryServer = function() {
	return this.nowRepoServer;
};

/**
 * 현재 보고있는 레파지토리의 서버 이름을 설정한다.
 * 
 * @method gb.versioning.Repository#setNowRepositoryServer
 * @param {String}
 *            레파지토리 서버 이름
 */
gb.versioning.Repository.prototype.setNowRepositoryServer = function(server) {
	this.nowRepoServer = server;
};

/**
 * 지오긱 모달을 연다.
 * 
 * @method gb.versioning.Repository#open
 * @override
 */
gb.versioning.Repository.prototype.open = function() {
	gb.modal.Base.prototype.open.call(this);
	this.refreshList();
};

/**
 * 브랜치를 체크아웃 한다.
 * 
 * @method gb.versioning.Repository#checkoutBranch
 * @param {Object}
 *            server - 작업 중인 서버 노드
 * @param {Object}
 *            repo - 작업 중인 리포지토리 노드
 * @param {Object}
 *            branch - 작업 중인 브랜치 노드
 */
gb.versioning.Repository.prototype.checkoutBranch = function(server, repo, branch) {
	var that = this;
	var params = {
		"serverName" : server.text,
		"repoName" : repo.text,
		"branchName" : branch.text
	}
	// + "&" + jQuery.param(params),
	var checkURL = this.getCheckoutBranchURL();
	if (checkURL.indexOf("?") !== -1) {
		checkURL += "&";
		checkURL += jQuery.param(params);
	} else {
		checkURL += "?";
		checkURL += jQuery.param(params);
	}

	$.ajax({
		url : checkURL,
		method : "POST",
		contentType : "application/json; charset=UTF-8",
		// data : params,
		// dataType : 'jsonp',
		// jsonpCallback : 'getJson',
		beforeSend : function() {
			// $("body").css("cursor", "wait");
		},
		complete : function() {
			// $("body").css("cursor", "default");
		},
		success : function(data) {
			console.log(data);
			if (data.success === "true") {
				var transactionId = data.transactionId;
				var newTarget = data.newTarget;
				var ggfn = that.getJSTree()._data.geogigfunction;
				ggfn.transactionId[repo.id] = transactionId;
				console.log(ggfn);
				that.getJSTree().refresh_node(repo);
				// if (repo.data === undefined) {
				// repo.data = {
				// "transactionId" : transactionId
				// }
				// } else {
				// repo.data["transactionId"] = transactionId;
				// }
			}
		}
	});
};