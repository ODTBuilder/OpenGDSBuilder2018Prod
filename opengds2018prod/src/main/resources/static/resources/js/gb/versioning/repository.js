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
	this.beginTransactionURL = url.beginTransaction ? url.beginTransaction : undefined;
	this.endTransactionURL = url.endTransaction ? url.endTransaction : undefined;
	this.checkoutURL = url.checkoutBranch ? url.checkoutBranch : undefined;
	this.remoteTreeURL = url.remoteTree ? url.remoteTree : undefined;
	this.removeRemoteRepositoryURL = url.removeRemoteRepository ? url.removeRemoteRepository : undefined;
	this.branchListURL = url.branchList ? url.branchList : undefined;
	this.mergeBranchURL = url.mergeBranch ? url.mergeBranch : undefined;
	this.nowRepo = undefined;
	this.nowRemoteRepo = undefined;
	this.nowRepoServer = undefined;
	this.nowBranch = undefined;
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
					} else {
						if (node.type === "geoserver") {
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
					}
					console.log(obj);
					return obj;
				}
			}

		},
		"search" : {
			show_only_matches : true
		},
		"types" : {
			"#" : {
				"valid_children" : [ "geoserver", "default", "error" ]
			},
			"default" : {
				"icon" : "fas fa-exclamation-circle"
			},
			"error" : {
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
		"geogigfunction" : {
			"repository" : that,
			"status" : {
				"checkout" : "fas fa-check",
				"unstaged" : "gb-geogig-unstaged",
				"staged" : "gb-geogig-staged",
				"unmerged" : "gb-geogig-unmerged",
				"merged" : "gb-geogig-merged",
				"connected" : "fas fa-link",
				"disconnected" : "fas fa-unlink"
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

	var backIcon = $("<i>").addClass("fas").addClass("fa-arrow-left");
	this.backToTreeBtn = $("<button>").addClass("gb-button-clear").append(backIcon).append(" ").append(this.remoteTitle).click(function() {
		that.transitPage("server");
	});

	this.remoteHead = $("<div>").addClass("gb-article-head").append(this.backToTreeBtn).append(this.addRemoteBtn).append(
			this.refreshRemoteTreeBtn);
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
						obj["node"] = that.getNowRepository() !== undefined ? that.getNowRepository().id : undefined;
						obj["serverName"] = that.getNowRepositoryServer() !== undefined ? that.getNowRepositoryServer().id : undefined;
					} else if (node.type === "remoteRepository") {
						obj["type"] = "remoteBranch";
						obj["serverName"] = that.getNowRepositoryServer() !== undefined ? that.getNowRepositoryServer().id : undefined;
						obj["node"] = node.text;
						obj["local"] = that.getNowRepository() !== undefined ? that.getNowRepository().id : undefined;
					}
					console.log(obj);
					return obj;
				}
			}

		},
		"search" : {
			show_only_matches : true
		},
		"types" : {
			"#" : {
				"valid_children" : [ "remoteRepository", "default", "error" ]
			},
			"default" : {
				"icon" : "fas fa-exclamation-circle"
			},
			"error" : {
				"icon" : "fas fa-exclamation-circle"
			},
			"remoteRepository" : {
				"icon" : "fas fa-archive",
				"valid_children" : [ "remoteBranch" ]
			},
			"remoteBranch" : {
				"icon" : "fas fa-code-branch",
				"valid_children" : [ "layer" ]
			},
			"layer" : {
				"icon" : "fas fa-file"
			}
		},
		"geogigfunction" : {
			"repository" : that,
			"status" : {
				"checkout" : "fas fa-check",
				"unstaged" : "gb-geogig-unstaged",
				"staged" : "gb-geogig-staged",
				"unmerged" : "gb-geogig-unmerged",
				"merged" : "gb-geogig-merged",
				"connected" : "fas fa-link",
				"disconnected" : "fas fa-unlink"
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

	var mergeTitle = $("<span>").text("Merge");
	var mergeHead = $("<div>").addClass("gb-article-head").append(mergeTitle);
	var serverName = $("<span>").text("GeoServer: ");
	this.geoserverNameVal = $("<span>");
	var geoserverArea = $("<div>").append(serverName).append(this.geoserverNameVal);
	var repoName = $("<span>").text("Repository: ");
	this.repoNameVal = $("<span>");
	var repoNameArea = $("<div>").append(repoName).append(this.repoNameVal);
	var cubName = $("<span>").text("Current Branch: ");
	this.cubNameVal = $("<span>");
	var cubArea = $("<div>").append(cubName).append(this.cubNameVal);
	var tabName = $("<div>").text("Target Branch: ");
	this.tabNameVal = $("<select>");
	var tabArea = $("<div>").append(tabName).append(this.tabNameVal);
	var backToListBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Back").click(function() {
		that.transitPage("server");
	});
	var mergeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Merge").click(function() {
		var server = that.getNowRepositoryServer();
		var repo = that.getNowRepository();
		var tab = $(that.tabNameVal).val();
		var tid = that.getJSTree().getTransactionId(repo.id);
		if (!tid) {
			console.log("you want to check out this branch?");
		} else if (server.text && repo.text && tab && tid) {
			console.log("its working");
			that.mergeBranch(server.text, repo.text, tab, tid);
		}
	});
	var mergeBtnArea = $("<div>").append(mergeBtn).append(backToListBtn);
	var mergeBody = $("<div>").addClass("gb-article-body").css({
		"padding" : "10px"
	}).append(geoserverArea).append(repoNameArea).append(cubArea).append(tabArea).append(mergeBtnArea);
	this.mergeArea = $("<div>").append(mergeHead).append(mergeBody);
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
	this.transitPage("server");
};
gb.versioning.Repository.prototype = Object.create(gb.modal.Base.prototype);
gb.versioning.Repository.prototype.constructor = gb.versioning.Repository;

/**
 * 리모트 레파지토리로 페이지를 전환한다.
 * 
 * @method gb.versioning.Repository#manageRemoteRepository
 * @param {String}
 *            server - 지오서버 이름
 * @param {String}
 *            repo - 레파지토리 이름
 */
gb.versioning.Repository.prototype.manageRemoteRepository = function(server, repo) {
	var serverName = server;
	var repoName = repo;
	$(this.remoteTitle).empty();
	$(this.remoteTitle).text(repoName);
	this.transitPage("remote");
	this.refreshRemoteList();
};

/**
 * 머지로 페이지를 전환한다.
 * 
 * @method gb.versioning.Repository#manageMerge
 * @param {String}
 *            server - 현재 지오서버
 * @param {String}
 *            repo - 현재 레파지토리
 * @param {String}
 *            branch - 현재 브랜치
 */
gb.versioning.Repository.prototype.manageMerge = function(server, repo, branch) {
	var that = this;
	$(this.geoserverNameVal).empty();
	$(this.geoserverNameVal).text(server);

	$(this.repoNameVal).empty();
	$(this.repoNameVal).text(repo);

	$(this.cubNameVal).empty();
	$(this.cubNameVal).text(branch);

	$(this.tabNameVal).empty();
	var callback = function(data) {
		if (data.success === "true") {
			var branches = data.localBranchList;
			if (Array.isArray(branches)) {
				for (var i = 0; i < branches.length; i++) {
					var opt = $("<option>").text(branches[i].name);
					if (branches[i].name === branch) {
						$(opt).prop({
							"disabled" : true
						});
					}
					$(that.tabNameVal).append(opt);
				}
			}
		}
	};
	this.getBranchList(server, repo, callback);
	this.transitPage("merge");
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
 * 트랜잭션 아이디를 요청한다.
 * 
 * @method gb.versioning.Repository#beginTransaction
 * @param {String}
 *            serverName - 지오서버 이름
 * @param {String}
 *            repoName - 레파지토리 이름
 * @return {Object} 트랜잭션 아이디 객체
 */
gb.versioning.Repository.prototype.beginTransaction = function(serverName, repoName) {
	var params = {
		"serverName" : serverName,
		"repoName" : repoName
	}
	// + "&" + jQuery.param(params),
	var tranURL = this.getBeginTransactionURL();
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
 * 트랜잭션 아이디를 종료한다.
 * 
 * @method gb.versioning.Repository#endTransaction
 * @return {Object} 트랜잭션 아이디 객체
 * 
 */
gb.versioning.Repository.prototype.endTransaction = function(serverName, repoName, tid, modal) {
	var that = this;
	var params = {
		"serverName" : serverName,
		"repoName" : repoName,
		"transactionId" : tid
	}
	// + "&" + jQuery.param(params),
	var tranURL = this.getEndTransactionURL();
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
			if (data.success === "true") {
				var repo = that.getNowRepository();
				if (repo.text === repoName) {
					modal.close();
					that.getJSTree().removeTransactionId(repo.id);
					that.transitPage("server");
					that.refreshList();
				}
			}
		}
	});
};

/**
 * 해당 레파지토리의 브랜치 목록을 조회한다.
 * 
 * @method gb.versioning.Repository#getBranchList
 * @param {String}
 *            serverName - 등록한 서버 이름
 * @param {String}
 *            repoName - GeoGig repository 이름
 * @param {Function}
 *            callback - 콜백함수
 * @return {Object} 브랜치 리스트 목록
 * 
 */
gb.versioning.Repository.prototype.getBranchList = function(serverName, repoName, callback) {
	var params = {
		"serverName" : serverName,
		"repoName" : repoName
	}
	// + "&" + jQuery.param(params),
	var tranURL = this.getBranchListURL();
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
			callback(data);
		}
	});
};

/**
 * GeoGig 목록을 새로고침한다.
 * 
 * @method gb.versioning.Repository#refreshList
 */
gb.versioning.Repository.prototype.refreshList = function() {
	this.getJSTree().refresh();
};

/**
 * Remote repository 목록을 새로고침한다.
 * 
 * @method gb.versioning.Repository#refreshRemoteList
 */
gb.versioning.Repository.prototype.refreshRemoteList = function() {
	this.getRemoteJSTree().refresh();
};

/**
 * jsTree 객체를 반환한다.
 * 
 * @method gb.versioning.Repository#getJSTree
 * @return {Object}
 */
gb.versioning.Repository.prototype.getJSTree = function() {
	return this.jstree;
};

/**
 * remote repository jsTree 객체를 반환한다.
 * 
 * @method gb.versioning.Repository#getRemoteJSTree
 * @return {Object}
 */
gb.versioning.Repository.prototype.getRemoteJSTree = function() {
	return this.remotejstree;
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
 * @method gb.versioning.Repository#getBeginTransactionURL
 * @return {String} 트랜잭션 아이디 주소 URL
 */
gb.versioning.Repository.prototype.getBeginTransactionURL = function() {
	return this.beginTransactionURL;
};

/**
 * 트랜잭션 아이디 종료 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getEndTransactionURL
 * @return {String} 트랜잭션 아이디 주소 URL
 */
gb.versioning.Repository.prototype.getEndTransactionURL = function() {
	return this.endTransactionURL;
};

/**
 * 브랜치 체크아웃 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getCheckoutBranchURL
 * @return {String} 트랜잭션 아이디 주소 URL
 */
gb.versioning.Repository.prototype.getCheckoutBranchURL = function() {
	return this.checkoutURL;
};

/**
 * 브랜치 리스트 조회 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getBranchListURL
 * @return {String} 컨트롤러 주소 URL
 */
gb.versioning.Repository.prototype.getBranchListURL = function() {
	return this.branchListURL;
};

/**
 * 리모트 레파지토리 트리 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getRemoteTreeURL
 * @return {String} 컨트롤러 주소 URL
 */
gb.versioning.Repository.prototype.getRemoteTreeURL = function() {
	return this.remoteTreeURL;
};

/**
 * 리모트 레파지토리 삭제 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getRemoveRemoteRepositoryURL
 * @return {String} 컨트롤러 주소 URL
 */
gb.versioning.Repository.prototype.getRemoveRemoteRepositoryURL = function() {
	return this.removeRemoteRepositoryURL;
};

/**
 * 브랜치 머지 요청 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getMergeBranchURL
 * @return {String} 컨트롤러 주소 URL
 */
gb.versioning.Repository.prototype.getMergeBranchURL = function() {
	return this.mergeBranchURL;
};

/**
 * 현재 보고있는 리모트 레파지토리의 이름을 반환한다.
 * 
 * @method gb.versioning.Repository#getNowRemoteRepository
 * @return {Object} 리모트 레파지토리 이름
 */
gb.versioning.Repository.prototype.getNowRemoteRepository = function() {
	return this.nowRemoteRepo;
};

/**
 * 현재 보고있는 리모트 레파지토리의 이름을 설정한다.
 * 
 * @method gb.versioning.Repository#setNowRemoteRepository
 * @param {Object}
 *            리모트 레파지토리 노드
 */
gb.versioning.Repository.prototype.setNowRemoteRepository = function(repo) {
	this.nowRemoteRepo = repo;
};

/**
 * 현재 보고있는 브랜치의 이름을 반환한다.
 * 
 * @method gb.versioning.Repository#getNowBranch
 * @return {String} 레파지토리 이름
 */
gb.versioning.Repository.prototype.getNowBranch = function() {
	return this.nowBranch;
};

/**
 * 현재 보고있는 브랜치의 이름을 설정한다.
 * 
 * @method gb.versioning.Repository#setNowBranch
 * @param {Object}
 *            레파지토리 노드
 */
gb.versioning.Repository.prototype.setNowBranch = function(branch) {
	this.nowBranch = branch;
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
 * @param {Object}
 *            레파지토리 노드
 */
gb.versioning.Repository.prototype.setNowRepository = function(repo) {
	this.nowRepo = repo;
};

/**
 * 현재 보고있는 레파지토리의 서버 이름을 반환한다.
 * 
 * @method gb.versioning.Repository#getNowRepositoryServer
 * @return {Object} 레파지토리 서버 노드
 */
gb.versioning.Repository.prototype.getNowRepositoryServer = function() {
	return this.nowRepoServer;
};

/**
 * 현재 보고있는 레파지토리의 서버 이름을 설정한다.
 * 
 * @method gb.versioning.Repository#setNowRepositoryServer
 * @param {Object}
 *            레파지토리 서버 노드
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

/**
 * 브랜치를 머지 한다.
 * 
 * @method gb.versioning.Repository#mergeBranch
 * @param {String}
 *            server - 작업 중인 서버
 * @param {String}
 *            repo - 작업 중인 리포지토리
 * @param {String}
 *            branch - 작업 중인 브랜치
 * @param {String}
 *            tid - 트랜잭션 아이디
 */
gb.versioning.Repository.prototype.mergeBranch = function(server, repo, branch, tid) {
	var that = this;
	var params = {
		"serverName" : server,
		"repoName" : repo,
		"branchName" : branch,
		"transactionId" : tid
	}
	// + "&" + jQuery.param(params),
	var checkURL = this.getMergeBranchURL();
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
				var msg1 = $("<div>").text("Merge is complete.").css({
					"text-align" : "center",
					"font-size" : "16px"
				});
				var msg2 = $("<div>").text('Do you want to commit the changes to your branch?').css({
					"text-align" : "center",
					"font-size" : "16px"
				});
				var body = $("<div>").append(msg1).append(msg2);
				var closeBtn = $("<button>").css({
					"float" : "right"
				}).addClass("gb-button").addClass("gb-button-default").text("Cancel");
				var okBtn = $("<button>").css({
					"float" : "right"
				}).addClass("gb-button").addClass("gb-button-primary").text("Commit");
				var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);

				var deleteModal = new gb.modal.Base({
					"title" : "Commit Changes",
					"width" : 310,
					"height" : 200,
					"autoOpen" : true,
					"body" : body,
					"footer" : buttonArea
				});
				$(closeBtn).click(function() {
					deleteModal.close();
				});
				$(okBtn).click(function() {
					that.endTransaction(server, repo, tid, deleteModal);
				});
			}
		}
	});
};

/**
 * 리모트 레파지토리를 삭제한다.
 * 
 * @method gb.versioning.Repository#removeRemoteRepository
 * @param {String}
 *            server - 작업 중인 서버 이름
 * @param {String}
 *            repo - 작업 중인 리포지토리 이름
 * @param {String}
 *            remote - 작업 중인 리모트 레파지토리 이름
 */
gb.versioning.Repository.prototype.removeRemoteRepository = function(server, repo, remote) {
	var that = this;
	var params = {
		"serverName" : server,
		"repoName" : repo,
		"remoteName" : remote
	}
	// + "&" + jQuery.param(params),
	var checkURL = this.getRemoveRemoteRepositoryURL();
	if (checkURL.indexOf("?") !== -1) {
		checkURL += "&";
		checkURL += jQuery.param(params);
	} else {
		checkURL += "?";
		checkURL += jQuery.param(params);
	}

	var msg1 = $("<div>").text("Are you sure to delete this remote repository?").css({
		"text-align" : "center",
		"font-size" : "16px"
	});
	var msg2 = $("<div>").text('"' + remote + '"').css({
		"text-align" : "center",
		"font-size" : "24px"
	});
	var body = $("<div>").append(msg1).append(msg2);
	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Cancel");
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Delete");
	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);

	var deleteModal = new gb.modal.Base({
		"title" : "Delete remote repository",
		"width" : 310,
		"height" : 200,
		"autoOpen" : true,
		"body" : body,
		"footer" : buttonArea
	});
	$(closeBtn).click(function() {
		deleteModal.close();
	});
	$(okBtn).click(function() {
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
					that.refreshRemoteList();
					deleteModal.close();
				}
			}
		});
	});
};

/**
 * pull request 창을 생성한다.
 * 
 * @method gb.versioning.Repository#pullRepositoryModal
 * @param {String}
 *            server - 작업 중인 서버 이름
 * @param {String}
 *            repo - 작업 중인 리포지토리 이름
 * @param {String}
 *            remote - 작업 중인 리모트 레파지토리 이름
 */
gb.versioning.Repository.prototype.pullRepositoryModal = function(server, repo) {
	var that = this;
	var params = {
		"serverName" : server,
		"repoName" : repo
	}
	// + "&" + jQuery.param(params),
	var checkURL = this.getRemoveRemoteRepositoryURL();
	if (checkURL.indexOf("?") !== -1) {
		checkURL += "&";
		checkURL += jQuery.param(params);
	} else {
		checkURL += "?";
		checkURL += jQuery.param(params);
	}

	var reLabel = $("<div>").text("Remote");
	this.reRepoSelect = $("<select>");
	var reRepo = $("<div>").append(this.reRepoSelect);
	this.reBranchSelect = $("<select>");
	var reBranch = $("<div>").append(this.reBranchSelect);
	var remote = $("<div>").css({
		"float" : "left"
	}).append(reLabel).append(reRepo).append(reBranch);
	this.remoteObj = {};
	var callback = function(data) {
		if (data.success === "true") {
			var branches = data.remoteBranchList;

			if (Array.isArray(branches)) {
				for (var i = 0; i < branches.length; i++) {
					var branch = branches[i];
					if (!that.remoteObj.hasOwnProperty(branch.remoteName)) {
						that.remoteObj[branch.remoteName] = [];
					}
					that.remoteObj[branch.remoteName].push(branch.name);
				}
			}
			console.log(that.remoteObj);
		}
	};
	this.getBranchList(server, repo, callback);

	var loLabel = $("<div>").text("Local");
	var loRepo = $("<div>");
	var loBranch = $("<div>");
	var local = $("<div>").css({
		"float" : "left"
	}).append(loLabel).append(loRepo).append(loBranch);

	var arrow = $("<i>").addClass("fas").addClass("fa-angle-double-left");
	var arrowArea = $("<div>").css({
		"float" : "left"
	}).append(arrow);

	var wrap = $("<div>").append(local).append(arrowArea).append(remote);
	var body = $("<div>").append(wrap);
	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Cancel");
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Pull");
	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);

	var deleteModal = new gb.modal.Base({
		"title" : "Pull",
		"width" : 310,
		"height" : 200,
		"autoOpen" : true,
		"body" : body,
		"footer" : buttonArea
	});
	$(closeBtn).click(function() {
		deleteModal.close();
	});
	$(okBtn).click(function() {
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
					that.refreshRemoteList();
					deleteModal.close();
				}
			}
		});
	});
};