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
 *            obj.url.initRepository - Repository의 추가를 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.addRemoteRepository - 원격 Repository의 추가를 요청할 컨트롤러 주소
 * @param {String}
 *            obj.url.removeRemoteRepository - 원격 Repository 삭제를 요청할 컨트롤러 주소 *
 * @param {String}
 *            obj.url.removeRepository - Repository 삭제를 요청할 컨트롤러 주소
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
	this.removeRepositoryURL = url.removeRepository ? url.removeRepository : undefined;
	this.branchListURL = url.branchList ? url.branchList : undefined;
	this.mergeBranchURL = url.mergeBranch ? url.mergeBranch : undefined;
	this.initRepositoryURL = url.initRepository ? url.initRepository : undefined;
	this.pullRepositoryURL = url.pullRepository ? url.pullRepository : undefined;
	this.pushRepositoryURL = url.pushRepository ? url.pushRepository : undefined;
	this.createBranchURL = url.createBranch ? url.createBranch : undefined;
	this.addRemoteRepositoryURL = url.addRemoteRepository ? url.addRemoteRepository : undefined;
	this.resolveConflictURL = url.resolveConflict ? url.resolveConflict : undefined;

	this.nowRepo = undefined;
	this.nowRemoteRepo = undefined;
	this.nowRepoServer = undefined;
	this.nowBranch = undefined;
	this.reRepoSelect = $("<select>").css({
		"width" : "100%"
	});
	$(this.reRepoSelect).on("change", function() {
		console.log(this.value);
		var branches = that.remoteObj[this.value];
		$(that.reBranchSelect).empty();
		for (var i = 0; i < branches.length; i++) {
			var opt = $("<option>").text(branches[i]);
			$(that.reBranchSelect).append(opt);
		}
	});
	this.reBranchSelect = $("<select>").css({
		"width" : "100%"
	});
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
		var server = that.getNowServer();
		var repo = that.getNowRepository();
		that.addRemoteRepoModal(server.text, repo.text);
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
						obj["serverName"] = that.getNowServer() !== undefined ? that.getNowServer().id : undefined;
					} else if (node.type === "remoteRepository") {
						obj["type"] = "remoteBranch";
						obj["serverName"] = that.getNowServer() !== undefined ? that.getNowServer().id : undefined;
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

	this.geoserverNameVal = $("<span>");
	this.repoNameVal = $("<span>");
	this.cubNameVal = $("<span>");
	this.tabNameVal = $("<select>");

	this.failArea = $("<div>");
	this.mbody = $("<div>").append(this.serverArea).append(this.remoteArea).append(this.historyArea).append(this.failArea);
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
		},
		error : function(jqXHR, textStatus, errorThrown) {

		}
	});
};

/**
 * 트랜잭션 아이디를 종료한다.
 * 
 * @method gb.versioning.Repository#endTransaction
 * @param {String}
 *            serverName - 등록한 지오서버 이름
 * @param {String}
 *            repoName - 레파지토리 이름
 * @param {Sting}
 *            tid - 트랜잭션 아이디
 * @param {gb.modal.Base}
 *            modal - 작업 완료후 닫을 Modal 객체
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
			} else {
				console.error("error - no remote branch");
				var title = "Error";
				var msg = "Transaction is not ended."
				that.messageModal(title, msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {

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
		},
		error : function(jqXHR, textStatus, errorThrown) {

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
 * 레파지토리 삭제 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getRemoveRepositoryURL
 * @return {String} 컨트롤러 주소 URL
 */
gb.versioning.Repository.prototype.getRemoveRepositoryURL = function() {
	return this.removeRepositoryURL;
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
 * 레파지토리 생성 요청 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getInitRepositoryURL
 * @return {String} 컨트롤러 주소 URL
 */
gb.versioning.Repository.prototype.getInitRepositoryURL = function() {
	return this.initRepositoryURL;
};

/**
 * 브랜치 생성 요청 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getCreateBranchURL
 * @return {String} 컨트롤러 주소 URL
 */
gb.versioning.Repository.prototype.getCreateBranchURL = function() {
	return this.createBranchURL;
};

/**
 * pull 요청 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getPullRepositoryURL
 * @return {String} 컨트롤러 주소 URL
 */
gb.versioning.Repository.prototype.getPullRepositoryURL = function() {
	return this.pullRepositoryURL;
};

/**
 * push 요청 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getPushRepositoryURL
 * @return {String} 컨트롤러 주소 URL
 */
gb.versioning.Repository.prototype.getPushRepositoryURL = function() {
	return this.pushRepositoryURL;
};

/**
 * remote repository 요청 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getAddRemoteRepositoryURL
 * @return {String} 컨트롤러 주소 URL
 */
gb.versioning.Repository.prototype.getAddRemoteRepositoryURL = function() {
	return this.addRemoteRepositoryURL;
};

/**
 * resolve conflict 요청 컨트롤러 주소를 반환한다.
 * 
 * @method gb.versioning.Repository#getAddRemoteRepositoryURL
 * @return {String} 컨트롤러 주소 URL
 */
gb.versioning.Repository.prototype.getResolveConflictURL = function() {
	return this.resolveConflictURL;
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
 * @method gb.versioning.Repository#getNowServer
 * @return {Object} 레파지토리 서버 노드
 */
gb.versioning.Repository.prototype.getNowServer = function() {
	return this.nowRepoServer;
};

/**
 * 현재 보고있는 레파지토리의 서버 이름을 설정한다.
 * 
 * @method gb.versioning.Repository#setNowServer
 * @param {Object}
 *            레파지토리 서버 노드
 */
gb.versioning.Repository.prototype.setNowServer = function(server) {
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
			} else {
				var title = "Error";
				var msg = "Checkout failed."
				that.messageModal(title, msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {

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
gb.versioning.Repository.prototype.mergeBranch = function(server, repo, branch, tid, mModal) {
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
				if (data.merge.conflicts === null) {
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
					}).addClass("gb-button").addClass("gb-button-default").text("Later");
					var okBtn = $("<button>").css({
						"float" : "right"
					}).addClass("gb-button").addClass("gb-button-primary").text("Commit");
					var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);

					var commitModal = new gb.modal.Base({
						"title" : "Commit Changes",
						"width" : 310,
						"height" : 200,
						"autoOpen" : true,
						"body" : body,
						"footer" : buttonArea
					});
					$(closeBtn).click(function() {
						commitModal.close();
					});
					$(okBtn).click(function() {
						mModal.close();
						that.endTransaction(server, repo, tid, commitModal);
					});
				} else {
					var confl = parseInt(data.merge.conflicts);
					console.log(confl);
					var msg1 = $("<div>").text("There are conflicting features.").css({
						"text-align" : "center",
						"font-size" : "16px"
					});
					var msg2 = $("<div>").text('Would you like to resolve conflicts?').css({
						"text-align" : "center",
						"font-size" : "16px"
					});
					var body = $("<div>").append(msg1).append(msg2);
					var closeBtn = $("<button>").css({
						"float" : "right"
					}).addClass("gb-button").addClass("gb-button-default").text("Cancel");
					var okBtn = $("<button>").css({
						"float" : "right"
					}).addClass("gb-button").addClass("gb-button-primary").text("Resolve");
					var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);

					var commitModal = new gb.modal.Base({
						"title" : "Conflict",
						"width" : 310,
						"height" : 200,
						"autoOpen" : true,
						"body" : body,
						"footer" : buttonArea
					});
					$(closeBtn).click(function() {
						commitModal.close();
					});
					$(okBtn).click(function() {
						mModal.close();
						// that.endTransaction(server, repo, tid, commitModal);
						that.resolveConflictModal(server, repo, that.getNowBranch().text, branch, data.merge.features, commitModal);
					});
				}
			} else {
				var title = "Error";
				var msg = "Merge failed."
				that.messageModal(title, msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {

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
				} else {
					var title = "Error";
					var msg = "Remove failed."
					that.messageModal(title, msg);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {

			}
		});
	});
};

/**
 * pull 요청한다.
 * 
 * @method gb.versioning.Repository#pullRepository
 * @param {String}
 *            server - 작업 중인 서버
 * @param {String}
 *            repo - 작업 중인 리포지토리
 * @param {String}
 *            branch - 작업 중인 브랜치
 * @param {String}
 *            remoteRepo - 원격 레파지토리
 * @param {String}
 *            remoteBranch - 원격 브랜치
 * @param {String}
 *            tid - 트랜잭션 아이디
 */
gb.versioning.Repository.prototype.pullRepository = function(server, repo, branch, remoteRepo, remoteBranch, tid, modal) {
	var that = this;
	var params = {
		"serverName" : server,
		"repoName" : repo,
		"branchName" : branch,
		"remoteName" : remoteRepo,
		"remoteBranchName" : remoteBranch,
		"transactionId" : tid
	}
	// + "&" + jQuery.param(params),
	var checkURL = this.getPullRepositoryURL();
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
				modal.close();
				var msg1 = $("<div>").text('"Pull" is complete.').css({
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
				}).addClass("gb-button").addClass("gb-button-default").text("Later");
				var okBtn = $("<button>").css({
					"float" : "right"
				}).addClass("gb-button").addClass("gb-button-primary").text("Commit");
				var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);

				var commitModal = new gb.modal.Base({
					"title" : "Commit Changes",
					"width" : 310,
					"height" : 200,
					"autoOpen" : true,
					"body" : body,
					"footer" : buttonArea
				});
				$(closeBtn).click(function() {
					commitModal.close();
				});
				$(okBtn).click(function() {
					that.endTransaction(server, repo, tid, commitModal);
				});
			} else {
				var title = "Error";
				var msg = "Pull failed."
				that.messageModal(title, msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {

		}
	});
};

/**
 * push 요청한다.
 * 
 * @method gb.versioning.Repository#pushRepository
 * @param {String}
 *            server - 작업 중인 서버
 * @param {String}
 *            repo - 작업 중인 리포지토리
 * @param {String}
 *            branch - 작업 중인 브랜치
 * @param {String}
 *            remoteRepo - 원격 레파지토리
 * @param {String}
 *            remoteBranch - 원격 브랜치
 * @param {String}
 *            tid - 트랜잭션 아이디
 */
gb.versioning.Repository.prototype.pushRepository = function(server, repo, branch, remoteRepo, remoteBranch, modal) {
	var that = this;
	var params = {
		"serverName" : server,
		"repoName" : repo,
		"branchName" : branch,
		"remoteName" : remoteRepo,
		"remoteBranchName" : remoteBranch
	}
	// + "&" + jQuery.param(params),
	var checkURL = this.getPushRepositoryURL();
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
				modal.close();
				var msg2 = "";
				if (data.dataPushed === "true") {
					msg2 = $("<div>").text('The changes have been applied to remote branch.').css({
						"text-align" : "center",
						"font-size" : "16px"
					});
				} else {
					msg2 = $("<div>").text('Nothing changed.').css({
						"text-align" : "center",
						"font-size" : "16px"
					});
				}
				var msg1 = $("<div>").text('"Push" is complete.').css({
					"text-align" : "center",
					"font-size" : "16px"
				});

				var body = $("<div>").append(msg1).append(msg2);
				// var closeBtn = $("<button>").css({
				// "float" : "right"
				// }).addClass("gb-button").addClass("gb-button-default").text("Later");
				var okBtn = $("<button>").css({
					"float" : "right"
				}).addClass("gb-button").addClass("gb-button-primary").text("OK");
				var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn);

				var commitModal = new gb.modal.Base({
					"title" : "Message",
					"width" : 310,
					"height" : 190,
					"autoOpen" : true,
					"body" : body,
					"footer" : buttonArea
				});
				// $(closeBtn).click(function() {
				// commitModal.close();
				// });
				$(okBtn).click(function() {
					// that.endTransaction(server, repo, tid, commitModal);
					commitModal.close();
				});
			} else {
				var title = "Error";
				var msg = "Push failed."
				that.messageModal(title, msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {

		}
	});
};

/**
 * pull 요청 창을 생성한다.
 * 
 * @method gb.versioning.Repository#pullRepositoryModal
 * @param {String}
 *            server - 작업 중인 서버 이름
 * @param {String}
 *            repo - 작업 중인 리포지토리 이름
 * @param {String}
 *            tid - 작업 중인 레파지토리의 트랜잭션 아이디
 */
gb.versioning.Repository.prototype.pullRepositoryModal = function(server, repo, tid) {
	var that = this;
	var reLabel = $("<div>").text("Remote").css({
		"text-align" : "center",
		"margin-bottom" : "10px"
	});
	$(this.reRepoSelect).empty();
	var reRepo = $("<div>").append(this.reRepoSelect);
	$(this.reBranchSelect).empty();
	var reBranch = $("<div>").append(this.reBranchSelect);
	var remote = $("<div>").css({
		"float" : "left",
		"width" : "45%"
	}).append(reLabel).append(reRepo).append(reBranch);
	var loLabel = $("<div>").text("Local").css({
		"text-align" : "center",
		"margin-bottom" : "10px"
	});
	var loRepo = $("<div>").append(this.getNowRepository().text);
	var loBranch = $("<div>").append(this.getNowBranch().text);
	var local = $("<div>").css({
		"float" : "left",
		"width" : "45%"
	}).append(loLabel).append(loRepo).append(loBranch);

	var arrow = $("<i>").addClass("fas").addClass("fa-angle-double-left");
	var arrowArea = $("<div>").css({
		"float" : "left",
		"width" : "10%",
		"text-align" : "center"
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

	var commitModal = new gb.modal.Base({
		"title" : "Pull",
		"width" : 410,
		"height" : 210,
		"autoOpen" : false,
		"body" : body,
		"footer" : buttonArea
	});
	$(closeBtn).click(function() {
		commitModal.close();
	});
	$(okBtn).click(
			function() {
				console.log($(that.reRepoSelect).val());
				console.log($(that.reBranchSelect).val());
				console.log(tid);

				that.pullRepository(server, repo, that.getNowBranch().text, $(that.reRepoSelect).val(), $(that.reBranchSelect).val(), tid,
						commitModal);
			});
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
			var rRepos = Object.keys(that.remoteObj);
			for (var i = 0; i < rRepos.length; i++) {
				var opt = $("<option>").text(rRepos[i]);
				$(that.reRepoSelect).append(opt);
			}
			var rbranches = that.remoteObj[$(that.reRepoSelect).val()];
			$(that.reBranchSelect).empty();
			if (Array.isArray(rbranches)) {
				for (var i = 0; i < rbranches.length; i++) {
					var opt = $("<option>").text(rbranches[i]);
					$(that.reBranchSelect).append(opt);
				}
				commitModal.open();
			} else {
				console.error("error - no remote branch");
				var title = "Error";
				var msg = "There is no remote branch."
				that.messageModal(title, msg);
			}
		} else {
			var title = "Error";
			var msg = "Couldn't get branch list."
			that.messageModal(title, msg);
		}
	};
	this.getBranchList(server, repo, callback);
};

/**
 * push 요청 창을 생성한다.
 * 
 * @method gb.versioning.Repository#pushRepositoryModal
 * @param {String}
 *            server - 작업 중인 서버 이름
 * @param {String}
 *            repo - 작업 중인 리포지토리 이름
 * @param {String}
 *            tid - 작업 중인 레파지토리의 트랜잭션 아이디
 */
gb.versioning.Repository.prototype.pushRepositoryModal = function(server, repo) {
	var that = this;
	var reLabel = $("<div>").text("Remote").css({
		"text-align" : "center",
		"margin-bottom" : "10px"
	});
	$(this.reRepoSelect).empty();
	var reRepo = $("<div>").append(this.reRepoSelect);
	$(this.reBranchSelect).empty();
	var reBranch = $("<div>").append(this.reBranchSelect);
	var remote = $("<div>").css({
		"float" : "left",
		"width" : "45%"
	}).append(reLabel).append(reRepo).append(reBranch);
	var loLabel = $("<div>").text("Local").css({
		"text-align" : "center",
		"margin-bottom" : "10px"
	});
	var loRepo = $("<div>").append(this.getNowRepository().text);
	var loBranch = $("<div>").append(this.getNowBranch().text);
	var local = $("<div>").css({
		"float" : "left",
		"width" : "45%"
	}).append(loLabel).append(loRepo).append(loBranch);

	var arrow = $("<i>").addClass("fas").addClass("fa-angle-double-right");
	var arrowArea = $("<div>").css({
		"float" : "left",
		"width" : "10%",
		"text-align" : "center"
	}).append(arrow);

	var wrap = $("<div>").append(local).append(arrowArea).append(remote);
	var body = $("<div>").append(wrap);
	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Cancel");
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Push");
	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);

	var commitModal = new gb.modal.Base({
		"title" : "Push",
		"width" : 410,
		"height" : 210,
		"autoOpen" : false,
		"body" : body,
		"footer" : buttonArea
	});
	$(closeBtn).click(function() {
		commitModal.close();
	});
	$(okBtn).click(function() {
		console.log($(that.reRepoSelect).val());
		console.log($(that.reBranchSelect).val());

		that.pushRepository(server, repo, that.getNowBranch().text, $(that.reRepoSelect).val(), $(that.reBranchSelect).val(), commitModal);
	});
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
			var rRepos = Object.keys(that.remoteObj);
			for (var i = 0; i < rRepos.length; i++) {
				var opt = $("<option>").text(rRepos[i]);
				$(that.reRepoSelect).append(opt);
			}
			var rbranches = that.remoteObj[$(that.reRepoSelect).val()];
			$(that.reBranchSelect).empty();
			if (Array.isArray(rbranches)) {
				for (var i = 0; i < rbranches.length; i++) {
					var opt = $("<option>").text(rbranches[i]);
					$(that.reBranchSelect).append(opt);
				}
				commitModal.open();
			} else {
				console.error("error - no remote branch");
				var title = "Error";
				var msg = "There is no remote branch."
				that.messageModal(title, msg);
			}
		} else {
			var title = "Error";
			var msg = "Couldn't get branch list."
			that.messageModal(title, msg);
		}
	};
	this.getBranchList(server, repo, callback);
};

/**
 * 레파지토리 생성 창을 연다.
 * 
 * @method gb.versioning.Repository#initRepositoryModal
 */
gb.versioning.Repository.prototype.initRepositoryModal = function() {
	var that = this;

	var rName = $("<div>").text("Name: ").css({
		"display" : "table-cell",
		"width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var rNameInput = $("<input>").attr({
		"type" : "text",
		"placeholder" : "Repository name"
	}).css({
		"width" : "83%",
		"border" : "none",
		"border-bottom" : "solid 1px #a9a9a9",
		"margin-left" : "8px"
	});
	var rNameInputDiv = $("<div>").append(rNameInput).css({
		"display" : "table-cell",
		"width" : "80%",
		"vertical-align" : "middle"
	});
	var rNameArea = $("<div>").append(rName).append(rNameInputDiv).css({
		"display" : "table-row"
	});

	var rHost = $("<div>").text("Host: ").css({
		"display" : "table-cell",
		"width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var rHostInput = $("<input>").attr({
		"type" : "text",
		"placeholder" : "Host addres EX) http://127.0.0.1"
	}).css({
		"width" : "83%",
		"border" : "none",
		"border-bottom" : "solid 1px #a9a9a9",
		"margin-left" : "8px"
	});
	var rHostInputDiv = $("<div>").append(rHostInput).css({
		"display" : "table-cell",
		"width" : "80%",
		"vertical-align" : "middle"
	});
	var rHostArea = $("<div>").append(rHost).append(rHostInputDiv).css({
		"display" : "table-row"
	});

	var rPort = $("<div>").text("Port: ").css({
		"display" : "table-cell",
		"width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var rPortInput = $("<input>").attr({
		"type" : "number",
		"placeholder" : "Port number EX) 8080"
	}).css({
		"width" : "83%",
		"border" : "none",
		"border-bottom" : "solid 1px #a9a9a9",
		"margin-left" : "8px"
	});
	var rPortInputDiv = $("<div>").append(rPortInput).css({
		"display" : "table-cell",
		"width" : "80%",
		"vertical-align" : "middle"
	});
	var rPortArea = $("<div>").append(rPort).append(rPortInputDiv).css({
		"display" : "table-row"
	});

	var rDB = $("<div>").text("Database: ").css({
		"display" : "table-cell",
		"width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var rDBInput = $("<input>").attr({
		"type" : "text",
		"placeholder" : "Database name"
	}).css({
		"width" : "83%",
		"border" : "none",
		"border-bottom" : "solid 1px #a9a9a9",
		"margin-left" : "8px"
	});
	var rDBInputDiv = $("<div>").append(rDBInput).css({
		"display" : "table-cell",
		"width" : "80%",
		"vertical-align" : "middle"
	});
	var rDBArea = $("<div>").append(rDB).append(rDBInputDiv).css({
		"display" : "table-row"
	});

	var rScheme = $("<div>").text("Scheme: ").css({
		"display" : "table-cell",
		"width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var rSchemeInput = $("<input>").attr({
		"type" : "text",
		"placeholder" : "Scheme name"
	}).css({
		"width" : "83%",
		"border" : "none",
		"border-bottom" : "solid 1px #a9a9a9",
		"margin-left" : "8px"
	});
	var rSchemeInputDiv = $("<div>").append(rSchemeInput).css({
		"display" : "table-cell",
		"width" : "80%",
		"vertical-align" : "middle"
	});
	var rSchemeArea = $("<div>").append(rScheme).append(rSchemeInputDiv).css({
		"display" : "table-row"
	});

	var rID = $("<div>").text("User Name: ").css({
		"display" : "table-cell",
		"width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var rIDInput = $("<input>").attr({
		"type" : "text",
		"placeholder" : "Database user name"
	}).css({
		"width" : "83%",
		"border" : "none",
		"border-bottom" : "solid 1px #a9a9a9",
		"margin-left" : "8px"
	});
	var rIDInputDiv = $("<div>").append(rIDInput).css({
		"display" : "table-cell",
		"width" : "80%",
		"vertical-align" : "middle"
	});
	var rIDArea = $("<div>").append(rID).append(rIDInputDiv).css({
		"display" : "table-row"
	});

	var rPass = $("<div>").text("Password: ").css({
		"display" : "table-cell",
		"width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var rPassInput = $("<input>").attr({
		"type" : "password",
		"placeholder" : "Database password"
	}).css({
		"width" : "83%",
		"border" : "none",
		"border-bottom" : "solid 1px #a9a9a9",
		"margin-left" : "8px"
	});
	var rPassInputDiv = $("<div>").append(rPassInput).css({
		"display" : "table-cell",
		"width" : "80%",
		"vertical-align" : "middle"
	});
	var rPassArea = $("<div>").append(rPass).append(rPassInputDiv).css({
		"display" : "table-row"
	});

	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Close");
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Create");

	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);
	var modalFooter = $("<div>").append(buttonArea);

	var rBody = $("<div>").append(rNameArea).append(rHostArea).append(rPortArea).append(rDBArea).append(rSchemeArea).append(rIDArea)
			.append(rPassArea).css({
				"display" : "table",
				"padding" : "10px",
				"width" : "100%",
				"height" : "270px"
			});
	var createRepoModal = new gb.modal.Base({
		"title" : "Create Repository",
		"width" : 540,
		"height" : 400,
		"autoOpen" : true,
		"body" : rBody,
		"footer" : modalFooter
	});
	$(closeBtn).click(function() {
		createRepoModal.close();
	});
	$(okBtn).click(function() {
		console.log("create repo");
		var server = that.getNowServer().text;
		var repo = $(rNameInput).val();
		var host = $(rHostInput).val();
		var port = $(rPortInput).val();
		var dbname = $(rDBInput).val();
		var scheme = $(rSchemeInput).val();
		var user = $(rIDInput).val();
		var pass = $(rPassInput).val();
		that.initRepository(server, repo, host, port, dbname, scheme, user, pass, createRepoModal);
	});
};

/**
 * 레파지토리 생성을 요청한다.
 * 
 * @method gb.versioning.Repository#initRepository
 * @param {Object}
 *            server - 작업 중인 서버 노드
 * @param {Object}
 *            repo - 작업 중인 리포지토리 노드
 * @param {Object}
 *            branch - 작업 중인 브랜치 노드
 */
gb.versioning.Repository.prototype.initRepository = function(server, repo, host, port, dbname, scheme, user, pass, modal) {
	var that = this;
	var params = {
		"serverName" : server,
		"repoName" : repo,
		"dbHost" : host,
		"dbPort" : port,
		"dbName" : dbname,
		"dbSchema" : scheme,
		"dbUser" : user,
		"dbPassword" : pass
	}
	// + "&" + jQuery.param(params),
	var checkURL = this.getInitRepositoryURL();
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
				modal.close();
				that.refreshList();
			} else {
				var title = "Error";
				var msg = "Init repository failed."
				that.messageModal(title, msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {

		}
	});
};

/**
 * 레파지토리 삭제 확인창을 생성한다.
 * 
 * @method gb.versioning.Repository#removeRepositoryModal
 * @param {Object}
 *            server - 작업 중인 서버 노드
 * @param {Object}
 *            repo - 작업 중인 리포지토리 노드
 * @param {Object}
 *            branch - 작업 중인 브랜치 노드
 */
gb.versioning.Repository.prototype.removeRepositoryModal = function(repo) {
	var that = this;
	var msg1 = $("<div>").text("Are you sure to delete this repository?").css({
		"text-align" : "center",
		"font-size" : "16px"
	});
	var msg2 = $("<div>").text('"' + repo + '"').css({
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
		"title" : "Delete Repository",
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
		that.removeRepository(that.getNowServer().text, that.getNowRepository().text, deleteModal);
	});
};

/**
 * 레파지토리 삭제를 요청한다.
 * 
 * @method gb.versioning.Repository#removeRepository
 * @param {Object}
 *            server - 작업 중인 서버 노드
 * @param {Object}
 *            repo - 작업 중인 리포지토리 노드
 * @param {Object}
 *            modal - 완료후 닫을 모달 객체
 */
gb.versioning.Repository.prototype.removeRepository = function(server, repo, modal) {
	var that = this;
	var params = {
		"serverName" : server,
		"repoName" : repo,
	}
	// + "&" + jQuery.param(params),
	var checkURL = this.getRemoveRepositoryURL();
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
				modal.close();
				that.refreshList();
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {

		}
	});
};

/**
 * 오류 메시지 창을 생성한다.
 * 
 * @method gb.versioning.Repository#messageModal
 * @param {Object}
 *            server - 작업 중인 서버 노드
 * @param {Object}
 *            repo - 작업 중인 리포지토리 노드
 * @param {Object}
 *            branch - 작업 중인 브랜치 노드
 */
gb.versioning.Repository.prototype.messageModal = function(title, msg) {
	var that = this;
	var msg1 = $("<div>").text(msg).css({
		"text-align" : "center",
		"font-size" : "16px",
		"padding-top" : "26px"
	});
	var body = $("<div>").append(msg1);
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("OK");
	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn);

	var modal = new gb.modal.Base({
		"title" : title,
		"width" : 310,
		"height" : 200,
		"autoOpen" : true,
		"body" : body,
		"footer" : buttonArea
	});
	$(okBtn).click(function() {
		modal.close();
	});
};

/**
 * 머지 창을 생성한다.
 * 
 * @method gb.versioning.Repository#mergeModal
 * @param {Object}
 *            server - 작업 중인 서버 노드
 * @param {Object}
 *            repo - 작업 중인 리포지토리 노드
 * @param {Object}
 *            branch - 작업 중인 브랜치 노드
 */
gb.versioning.Repository.prototype.mergeModal = function(server, repo, branch) {
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
		} else {
			var title = "Error";
			var msg = "Couldn't get branch list."
			that.messageModal(title, msg);
		}
	};
	this.getBranchList(server, repo, callback);

	var serverName = $("<span>").text("GeoServer: ").css({
		"display" : "table-cell",
		"width" : "35%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var serverNameValArea = $("<span>").css({
		"display" : "table-cell",
		"width" : "65%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	}).append(this.geoserverNameVal);
	var geoserverArea = $("<div>").append(serverName).append(serverNameValArea).css({
		"display" : "table-row"
	});
	var repoName = $("<span>").text("Repository: ").css({
		"display" : "table-cell",
		"width" : "35%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var repoNameValArea = $("<span>").css({
		"display" : "table-cell",
		"width" : "65%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	}).append(this.repoNameVal);
	var repoNameArea = $("<div>").append(repoName).append(repoNameValArea).css({
		"display" : "table-row"
	});
	var cubName = $("<span>").text("Current Branch: ").css({
		"display" : "table-cell",
		"width" : "35%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var cubNameValArea = $("<span>").css({
		"display" : "table-cell",
		"width" : "65%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	}).append(this.cubNameVal);
	var cubArea = $("<div>").append(cubName).append(cubNameValArea).css({
		"display" : "table-row"
	});
	var tabName = $("<span>").text("Target Branch: ").css({
		"display" : "table-cell",
		"width" : "35%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var tabNameValArea = $("<span>").css({
		"display" : "table-cell",
		"width" : "65%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	}).append(this.tabNameVal);
	var tabArea = $("<div>").append(tabName).append(tabNameValArea).css({
		"display" : "table-row"
	});

	var body = $("<div>").append(geoserverArea).append(repoNameArea).append(cubArea).append(tabArea).css({
		"display" : "table",
		"padding" : "10px",
		"width" : "100%",
		"height" : "138px"
	});
	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Cancel");
	var mergeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Merge");
	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(mergeBtn).append(closeBtn);

	var modal = new gb.modal.Base({
		"title" : "Merge",
		"width" : 370,
		"height" : 268,
		"autoOpen" : true,
		"body" : body,
		"footer" : buttonArea
	});
	$(closeBtn).click(function() {
		modal.close();
	});
	$(mergeBtn).click(function() {
		var server = that.getNowServer();
		var repo = that.getNowRepository();
		var tab = $(that.tabNameVal).val();
		var tid = that.getJSTree().getTransactionId(repo.id);
		if (!tid) {
			console.log("you want to check out this branch?");
		} else if (server.text && repo.text && tab && tid) {
			console.log("its working");
			that.mergeBranch(server.text, repo.text, tab, tid, modal);
		}
	});
};

/**
 * new branch 창을 생성한다.
 * 
 * @method gb.versioning.Repository#newBranchModal
 * @param {Object}
 *            server - 작업 중인 서버 노드
 * @param {Object}
 *            repo - 작업 중인 리포지토리 노드
 * @param {Object}
 *            branch - 작업 중인 브랜치 노드
 */
gb.versioning.Repository.prototype.newBranchModal = function(server, repo) {
	var that = this;

	this.sourceSelect = $("<select>").css({
		"width" : "95%",
		"height" : "90%"
	});
	var callback = function(data) {
		if (data.success === "true") {
			var branches = data.localBranchList;
			if (Array.isArray(branches)) {
				for (var i = 0; i < branches.length; i++) {
					var opt = $("<option>").text(branches[i].name);
					$(that.sourceSelect).append(opt);
				}
			}
		} else {
			var title = "Error";
			var msg = "Couldn't get branch list."
			that.messageModal(title, msg);
		}
	};
	this.getBranchList(server, repo, callback);

	var serverName = $("<span>").text("GeoServer: ").css({
		"display" : "table-cell",
		"width" : "35%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var serverNameVal = $("<span>").text(server).css({
		"display" : "table-cell",
		"width" : "65%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	});
	var geoserverArea = $("<div>").append(serverName).append(serverNameVal).css({
		"display" : "table-row"
	});
	var repoName = $("<span>").text("Repository: ").css({
		"display" : "table-cell",
		"width" : "35%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var repoNameVal = $("<span>").text(repo).css({
		"display" : "table-cell",
		"width" : "65%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	});
	var repoNameArea = $("<div>").append(repoName).append(repoNameVal).css({
		"display" : "table-row"
	});
	var cubName = $("<span>").text("New Branch: ").css({
		"display" : "table-cell",
		"width" : "35%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var nameInput = $("<input>").attr({
		"type" : "text"
	}).css({
		"width" : "95%",
		"border" : "0",
		"border-bottom" : "1px solid #898989"
	});
	var nameArea = $("<div>").append(nameInput).css({
		"display" : "table-cell",
		"width" : "65%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	});
	var cubArea = $("<div>").append(cubName).append(nameArea).css({
		"display" : "table-row"
	});
	var tabName = $("<span>").text("Target Branch: ").css({
		"display" : "table-cell",
		"width" : "35%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var tabSelect = $("<div>").append(this.sourceSelect).css({
		"display" : "table-cell",
		"width" : "65%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	});
	var tabArea = $("<div>").append(tabName).append(tabSelect).css({
		"display" : "table-row"
	});

	var body = $("<div>").append(geoserverArea).append(repoNameArea).append(cubArea).append(tabArea).css({
		"display" : "table",
		"padding" : "10px",
		"width" : "100%",
		"height" : "138px"
	});

	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Cancel");
	var createBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Create");
	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(createBtn).append(closeBtn);

	var modal = new gb.modal.Base({
		"title" : "New Branch",
		"width" : 370,
		"height" : 268,
		"autoOpen" : true,
		"body" : body,
		"footer" : buttonArea
	});
	$(closeBtn).click(function() {
		modal.close();
	});
	$(createBtn).click(function() {
		var server = that.getNowServer();
		var repo = that.getNowRepository();
		var branch = $(nameInput).val();
		var source = $(that.sourceSelect).val();
		that.createNewBranch(server.text, repo.text, branch, source, modal);
	});
};

/**
 * 브랜치 생성을 요청한다.
 * 
 * @method gb.versioning.Repository#createNewBranch
 * @param {Object}
 *            server - 작업 중인 서버 노드
 * @param {Object}
 *            repo - 작업 중인 리포지토리 노드
 * @param {Object}
 *            branch - 작업 중인 브랜치 노드
 */
gb.versioning.Repository.prototype.createNewBranch = function(server, repo, branch, source, modal) {
	var that = this;
	var params = {
		"serverName" : server,
		"repoName" : repo,
		"branchName" : branch,
		"source" : source
	}
	// + "&" + jQuery.param(params),
	var checkURL = this.getCreateBranchURL();
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
				modal.close();
				that.refreshList();
			} else {
				var title = "Error";
				var msg = "Create new branch failed."
				that.messageModal(title, msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {

		}
	});
};

/**
 * remote repository 등록 창을 생성한다.
 * 
 * @method gb.versioning.Repository#addRemoteRepoModal
 * @param {Object}
 *            server - 작업 중인 서버 노드
 * @param {Object}
 *            repo - 작업 중인 리포지토리 노드
 * @param {Object}
 *            branch - 작업 중인 브랜치 노드
 */
gb.versioning.Repository.prototype.addRemoteRepoModal = function(server, repo) {
	var that = this;

	var serverName = $("<span>").text("GeoServer: ").css({
		"display" : "table-cell",
		"width" : "35%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var serverNameVal = $("<span>").text(server).css({
		"display" : "table-cell",
		"width" : "65%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	});
	var geoserverArea = $("<div>").append(serverName).append(serverNameVal).css({
		"display" : "table-row"
	});
	var repoName = $("<span>").text("Repository: ").css({
		"display" : "table-cell",
		"width" : "35%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var repoNameVal = $("<span>").text(repo).css({
		"display" : "table-cell",
		"width" : "65%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	});
	var repoNameArea = $("<div>").append(repoName).append(repoNameVal).css({
		"display" : "table-row"
	});
	var remoteName = $("<span>").text("Remote Repository Name: ").css({
		"display" : "table-cell",
		"width" : "35%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var nameInput = $("<input>").attr({
		"type" : "text"
	}).css({
		"width" : "95%",
		"border" : "0",
		"border-bottom" : "1px solid #898989"
	});
	var nameArea = $("<div>").append(nameInput).css({
		"display" : "table-cell",
		"width" : "65%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	});
	var remoteNameArea = $("<div>").append(remoteName).append(nameArea).css({
		"display" : "table-row"
	});
	var remoteURL = $("<span>").text("Remote Repository URL: ").css({
		"display" : "table-cell",
		"width" : "35%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var remoteURLInput = $("<input>").attr({
		"type" : "text"
	}).css({
		"width" : "95%",
		"border" : "0",
		"border-bottom" : "1px solid #898989"
	});

	var remoteURLInputArea = $("<div>").append(remoteURLInput).css({
		"display" : "table-cell",
		"width" : "65%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	});
	var urlArea = $("<div>").append(remoteURL).append(remoteURLInputArea).css({
		"display" : "table-row"
	});

	var body = $("<div>").append(geoserverArea).append(repoNameArea).append(remoteNameArea).append(urlArea).css({
		"display" : "table",
		"padding" : "10px",
		"width" : "100%",
		"height" : "138px"
	});

	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Cancel");
	var addBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Add");
	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(addBtn).append(closeBtn);

	var modal = new gb.modal.Base({
		"title" : "Add Remote Repository",
		"width" : 570,
		"height" : 268,
		"autoOpen" : true,
		"body" : body,
		"footer" : buttonArea
	});
	$(closeBtn).click(function() {
		modal.close();
	});
	$(addBtn).click(function() {
		var server = that.getNowServer();
		var repo = that.getNowRepository();
		var name = $(nameInput).val();
		var url = $(remoteURLInput).val();
		that.addRemoteRepository(server.text, repo.text, name, url, modal);
	});
};

/**
 * 리모트 레파지토리 추가를 요청한다.
 * 
 * @method gb.versioning.Repository#addRemoteRepository
 * @param {Object}
 *            server - 작업 중인 서버 노드
 * @param {Object}
 *            repo - 작업 중인 리포지토리 노드
 * @param {Object}
 *            branch - 작업 중인 브랜치 노드
 */
gb.versioning.Repository.prototype.addRemoteRepository = function(server, repo, remote, url, modal) {
	var that = this;
	var params = {
		"serverName" : server,
		"repoName" : repo,
		"remoteName" : remote,
		"remoteURL" : url
	}
	// + "&" + jQuery.param(params),
	var checkURL = this.getAddRemoteRepositoryURL();
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
				modal.close();
				that.refreshRemoteList();
			} else {
				var title = "Error";
				var msg = "Create new branch failed."
				that.messageModal(title, msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {

		}
	});
};

/**
 * resolve conflict 창을 생성한다.
 * 
 * @method gb.versioning.Repository#resolveConflictModal
 * @param {String}
 *            server - 작업 중인 서버
 * @param {String}
 *            repo - 작업 중인 리포지토리
 * @param {String}
 *            cub - 체크아웃 중인 브랜치
 * @param {String}
 *            tab - 대상 브랜치
 * @param {Object[]}
 *            features - 오버라이드할 객체 정보
 * @param {gb.modal.Base}
 *            cmodal - 완료후 닫을 모달 객체
 */
gb.versioning.Repository.prototype.resolveConflictModal = function(server, repo, cub, tab, features, cmodal) {
	var that = this;

	var serverName = $("<span>").text("GeoServer: ").css({
		// "display" : "table-cell",
		// "width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var serverNameVal = $("<span>").text(server).css({
		// "display" : "table-cell",
		// "width" : "80%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	});
	var geoserverArea = $("<span>").append(serverName).append(serverNameVal).css({
	// "display" : "table-row"
	});
	var repoName = $("<span>").text("Repository: ").css({
		// "display" : "table-cell",
		// "width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var repoNameVal = $("<span>").text(repo).css({
		// "display" : "table-cell",
		// "width" : "80%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	});
	var repoNameArea = $("<span>").append(repoName).append(repoNameVal).css({
	// "display" : "table-row"
	});

	var cubName = $("<span>").text("Current branch: ").css({
		// "display" : "table-cell",
		// "width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var cubNameVal = $("<span>").text(cub).css({
		// "display" : "table-cell",
		// "width" : "80%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	});
	var cubNameArea = $("<span>").append(cubName).append(cubNameVal).css({
	// "display" : "table-row"
	});

	var tabName = $("<span>").text("Target branch: ").css({
		// "display" : "table-cell",
		// "width" : "20%",
		"text-align" : "right",
		"vertical-align" : "middle"
	});
	var tabNameVal = $("<span>").text(tab).css({
		// "display" : "table-cell",
		// "width" : "80%",
		"vertical-align" : "middle",
		"padding-left" : "5px"
	});
	var tabNameArea = $("<span>").append(tabName).append(tabNameVal).css({
	// "display" : "table-row"
	});
	var rowcheck = $("<input>").attr({
		"type" : "checkbox"
	});
	var col1 = $("<th>").append(rowcheck);
	var col2 = $("<th>").text("No");
	var col3 = $("<th>").text("Layer");
	var col4 = $("<th>").text("Feature ID");
	var col5 = $("<th>").text("Resolution");
	var col6 = $("<th>").text("Detail");
	var row1 = $("<tr>").append(col1).append(col2).append(col3).append(col4).append(col5).append(col6);
	var thead = $("<thead>").append(row1);
	var tbody = $("<tbody>");
	var table = $("<table>").append(thead).append(tbody);
	var tableArea = $("<div>").append(table).css({
		"width" : "100%",
	});

	var selectedLabel = $("<span>").text("Selected Items");
	var useCubBtn = $("<button>").addClass("gb-button").addClass("gb-button-default").text("Use [" + tab + "]").css({
		"display" : "inline-block"
	});
	var useTabBtn = $("<button>").addClass("gb-button").addClass("gb-button-default").text("Use [" + cub + "]").css({
		"display" : "inline-block"
	});
	var selectedButtons = $("<span>").append(useCubBtn).append(useTabBtn);
	var wholeSelectBody = $("<div>").append(selectedLabel).append(selectedButtons).css({
		"float" : "right",
		"margin" : "10px 0"
	});

	var infoBody = $("<div>").append(geoserverArea).append(repoNameArea).append(cubNameArea).append(tabNameArea).css({
		// "display" : "table",
		"padding" : "10px",
		"width" : "100%",
		"height" : "138px"
	});

	var body = $("<div>").append(tableArea).append(wholeSelectBody);
	var closeBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-default").text("Cancel");
	var okBtn = $("<button>").css({
		"float" : "right"
	}).addClass("gb-button").addClass("gb-button-primary").text("Commit");
	var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);

	var modal = new gb.modal.Base({
		"title" : "Resolve Conflicts",
		"width" : 770,
		"height" : 800,
		"autoOpen" : true,
		"body" : body,
		"footer" : buttonArea
	});
	var data = [];
	for (var i = 0; i < features.length; i++) {
		var layer = features[i].id.substring(0, features[i].id.indexOf("/"));
		var fid = features[i].id.substring(features[i].id.indexOf("/") + 1);
		var item = [ "", i + 1, layer, fid, "", "" ];
		data.push(item);
	}

	var select;
	var optcub;
	var opttab;

	console.log(data);
	$(table).DataTable({
		"data" : data,
		"columns" : [ {
			"searchable" : false,
			"orderable" : false,
			"className" : "select-checkbox"
		}, {
			"title" : "No"
		}, {
			"title" : "Layer"
		}, {
			"title" : "Feature ID"
		}, {
			"title" : "Resolution",
			'searchable' : false,
			"orderable" : false,
			"render" : function(d, t, r, m) {
				select = $("<select>").addClass("gb-repository-instead-branch");

				var optcub = $("<option>").text("Use [" + cub + "]").attr({
					"value" : "ours"
				});
				var opttab = $("<option>").text("Use [" + tab + "]").attr({
					"value" : "theirs"
				});

				$(select).append(optcub);
				$(select).append(opttab);

				if (d === $(optcub).val() || d === "") {
					$(select).val(cub);
				} else if (d === $(opttab).val()) {
					$(select).val(tab);
				}

				console.log(d);
				console.log(t);
				console.log(r);
				console.log(m);
				return $(select).prop("outerHTML");
			}
		}, {
			"title" : "Detail",
			'searchable' : false,
			"orderable" : false,
			"data" : null,
			"defaultContent" : "<button class='gb-button gb-button-default'>Click</button>"
		} ],
		"select" : {
			"style" : 'multi',
			"selector" : 'td:first-child'
		},
		"order" : [ [ 1, 'asc' ] ]
	});

	var tableObj = $(table).DataTable();

	// $(body).find(".gb-repository-instead-branch").off();
	$(table).find("tbody").off("change", ".gb-repository-instead-branch");

	$(table).find("tbody").on("change", ".gb-repository-instead-branch", function() {
		console.log($(this).val());
		// console.log($(this).parents(2)[0]);
		var idx = tableObj.row($(this).parents(3)).index();
		console.log(tableObj.row($(this).parents(3)).index());
		data[idx][4] = $(this).val();
		console.log(data[idx][4]);
	});

	$(closeBtn).click(function() {
		modal.close();
	});
	$(okBtn).click(function() {
		console.log($(table).DataTable().data());
		var data = $(table).DataTable().data();
		var features = [];
		for (var i = 0; i < data.length; i++) {
			var obj = {
				"path" : data[i][2] + "/" + data[i][3],
				"version" : data[i][4] === "" || data[i][4] === "ours" ? "ours" : "theirs"
			};
			features.push(obj);
		}
		console.log(features);
		var tid = that.getJSTree().getTransactionId(that.getNowRepository().id);
		console.log(tid);
		that.resolveConflict(server, repo, features, tid, modal);
		cmodal.close();
		// var server = that.getNowServer();
		// var repo = that.getNowRepository();
		// var name = $(nameInput).val();
		// var url = $(remoteURLInput).val();
		// that.addRemoteRepository(server.text, repo.text, name, url, modal);
	});
};

/**
 * resolve conflict 요청한다.
 * 
 * @method gb.versioning.Repository#resolveConflict
 * @param {Object[]}
 *            path - 적용할 피처 아이디와 버전
 * @param {Object}
 *            modal - 요청 완료후 닫을 모달 객체
 */
gb.versioning.Repository.prototype.resolveConflict = function(server, repo, features, tid, modal) {
	console.log(this.getResolveConflictURL());
	var that = this;
	var params = {
		"serverName" : server,
		"repoName" : repo,
		"features" : features,
		"transactionId" : tid
	};
	console.log(params);
	var url = this.getResolveConflictURL();
	var withoutParamURL = url.substring(0, url.indexOf("?") !== -1 ? url.indexOf("?") : undefined);
	console.log(withoutParamURL);
	var queryString = url.indexOf("?") !== -1 ? url.substring(url.indexOf("?") + 1) : undefined;
	console.log(queryString);
	var queryParams = {};
	if (queryString) {
		queryParams = JSON.parse('{"' + queryString.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function(key, value) {
			return key === "" ? value : decodeURIComponent(value);
		});
	}
	console.log(queryParams);
	var finalParams = {};
	$.extend(finalParams, params, queryParams);
	console.log(finalParams);

	var form = $("<form>");
	var formData = new FormData(form[0]);
	var keys = Object.keys(finalParams);
	for (var i = 0; i < keys.length; i++) {
		if (Array.isArray(finalParams[keys[i]])) {
			formData.append(keys[i], JSON.stringify(finalParams[keys[i]]));
		} else {
			formData.append(keys[i], finalParams[keys[i]]);
		}
	}

	$.ajax({
		url : withoutParamURL,
		method : "POST",
		enctype : 'multipart/form-data',
		contentType : false,
		data : formData,
		processData : false,
		beforeSend : function() {
			// $("body").css("cursor", "wait");
		},
		complete : function() {
			// $("body").css("cursor", "default");
		},
		success : function(data) {
			console.log(data);
			var success = true;
			if (Array.isArray(data)) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].success !== "true") {
						success = false;
					}
				}
			}
			if (success === true) {
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
				}).addClass("gb-button").addClass("gb-button-default").text("Later");
				var okBtn = $("<button>").css({
					"float" : "right"
				}).addClass("gb-button").addClass("gb-button-primary").text("Commit");
				var buttonArea = $("<span>").addClass("gb-modal-buttons").append(okBtn).append(closeBtn);

				var commitModal = new gb.modal.Base({
					"title" : "Commit Changes",
					"width" : 310,
					"height" : 200,
					"autoOpen" : true,
					"body" : body,
					"footer" : buttonArea
				});
				$(closeBtn).click(function() {
					commitModal.close();
				});
				$(okBtn).click(function() {
					modal.close();
					that.endTransaction(server, repo, tid, commitModal);
				});
			} else {
				var title = "Error";
				var msg = "Override failed. Please try again."
				that.messageModal(title, msg);
			}
		}
	});
}