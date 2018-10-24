<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GeoDT Online</title>
<jsp:include page="/WEB-INF/jsp/common/libimport_editor.jsp" />
<style>
/* .navbar-brand { */
/* 	background-image: url(resources/img/onlyglobe.png); */
/* 	width: 284px; */
/* } */
.crsitem {
	cursor: pointer;
}

.file-area {
	width: 100%;
	min-height: 100px;
}

html {
	position: relative;
	min-height: 100%;
	overflow: hidden;
}

.mainHeader {
	margin-bottom: 0;
}

.builderHeader {
	border-radius: 4px 4px 0 0;
	margin-bottom: 0;
	min-height: 30px;
}

#builderContent {
	padding: 0;
}

.builderLayer {
	float: left;
	width: 380px;
	max-width: 380px;
	padding: 8px;
}

.bind {
	float: left;
}

#builderMap {
	
}

#builderBaseMap {
	position: relative;
	top: -906px;
	left: 0;
}

.builderFooter {
	min-height: 30px;
	line-height: 30px;
	margin-bottom: 0;
	border-radius: 0;
	position: relative;
	height: 30px;
	padding: 0 8px;
}

.builderLayerGeoServerPanel {
	margin-bottom: 16px;
}

.builderLayerClientPanel {
	margin-bottom: 0;
}

.gitbuilder-layer-panel {
	padding: 0;
	overflow-y: auto;
}

.gitbuilder-clearbtn {
	border: 0;
	background-color: transparent;
}

.builderHeader .navbar-nav>li>a {
	padding-top: 10px;
	padding-bottom: 10px;
}

.gb-footer-span {
	margin-right: 15px;
}

.gb-footer-span:hover {
	cursor: pointer;
}
</style>
</head>
<body>
	<jsp:include page="/WEB-INF/jsp/common/header.jsp" />
	<nav class="navbar navbar-default fixed-top builderHeader">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-2">
				<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
		</div>
		<div class="collapse navbar-collapse" id="navbar-collapse-2">
			<ul class="nav navbar-nav">
				<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
					aria-expanded="false" title="Save"> <i class="fas fa-save fa-lg" style="color: #4dadf7;"></i> Save
				</a>
					<ul class="dropdown-menu" role="menu">
						<li><a href="#" id="savePart" data-toggle="modal" data-target="#saveChanges">Save</a></li>
						<li><a href="#" id="saveAll">Save All</a></li>
					</ul></li>
				<li><a href="#" title="Edit" id="editTool"> <i class="fas fa-edit fa-lg" style="color: #bfbfbf;"></i> Edit
				</a></li>
				<li><a href="#" title="Base map" id="changeBase"> <i class="fas fa-map fa-lg" style="color: #91d050;"></i>
						Base Map
				</a></li>
				<li><a href="#" title="Validation" id="validation"> <i class="fas fa-clipboard-check fa-lg" style="color: #344762;"></i>
						Validation
				</a></li>
				<!-- <li><a href="#" title="QA Status" id="qastat">
					<i class="fas fa-th-list fa-lg" style="color: #7f7f7f;"></i>
					QA Status</a></li> -->
				<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
					aria-expanded="false" title="Generalization"> <i class="fas fa-object-group fa-lg" style="color: #00b0f0;"></i>
						Generalization
				</a>
					<ul class="dropdown-menu" role="menu">
						<li><a href="#" title="Generalization Process" id="gen">Generalization</a></li>
						<li><a href="#" title="Generalization Result" id="genstat">Result</a></li>
					</ul></li>
				<li><a href="#" title="Version Control" id="vermodal"> <i class="fas fa-code-branch fa-lg"
						style="color: #344762;"></i> Versioning
				</a></li>
				<li><a href="#" title="Information" id="binfo"> <i class="fas fa-info-circle fa-lg" style="color: #ffc000;"></i>
						Information
				</a></li>
			</ul>
		</div>
	</nav>
	<div class="builderContent">
		<div class="builderLayer">
			<div class="builderLayerGeoServerPanel"></div>
			<div class="builderLayerClientPanel"></div>
		</div>
		<div class="bind"></div>
	</div>
	<nav class="navbar navbar-default builderFooter">
		<span class="gb-footer-span"><i class="fas fa-ruler-horizontal"></i>&nbsp;<span>Scale:&nbsp;</span><span>1
				: 5000</span></span> <span class="gb-footer-span"><i class="fas fa-globe"></i>&nbsp;<a href="#" class="epsg-now"></a></span> <span
			class="gb-footer-span"> <i class="fas fa-map-marked-alt"></i>&nbsp;<span>Coordinate:&nbsp;</span><span
			class="mouse-position" style="display: inline-block;"></span></span> <span class="text-muted" style="float: right;">OpenGDS
			Builder/Validator</span> <span id="cmd-toggle-btn" class="gb-footer-span" style="float: right;"><i
			class="fas fa-terminal"></i>Command</span> <span id="feature-toggle-btn" class="gb-footer-span" style="float: right;"><i
			class="fas fa-th"></i>List</span>
	</nav>
	<script type="text/javascript">
		var urlList = {
			token : "?${_csrf.parameterName}=${_csrf.token}",
			wfst : "${pageContext.request.contextPath}/geoserver/geoserverWFSTransaction.ajax",
			getLayerInfo : "geoserver/getGeoLayerInfoList.ajax",
			getMapWMS : "geoserver/geoserverWMSGetMap.ajax",
			getFeatureInfo : "geoserver/geoserverWFSGetFeature.ajax",
			getWFSFeature : "geoserver/geoserverWFSGetFeature.ajax",
			getLayerTile : "geoserver/geoserverWMSLayerLoad.do"
		}
		var gbMap = new gb.Map({
			"target" : $(".bind")[0],
			"upperMap" : {
				"controls" : [],
				"layers" : []
			},
			"lowerMap" : {
				"controls" : [],
				"layers" : []
			}
		});

		var gbBaseMap = new gb.style.BaseMap({
			"map" : gbMap.getLowerMap()
		});

		$("#changeBase").click(function() {
			gbBaseMap.open();
		});

		var crs = new gb.crs.BaseCRS({
			"autoOpen" : false,
			"title" : "Base CRS",
			"message" : $(".epsg-now"),
			"map" : [ gbMap.getUpperMap(), gbMap.getLowerMap() ],
			"epsg" : "4326"
		});

		$(".epsg-now").click(function() {
			crs.open();
		});
		
		// 검수 수행 Modal 생성
		var validation = new gb.validation.Validation({
			"token": urlList.token,
			"autoOpen" : false,
			"title" : "Validation"
		});

		$("#validation").click(function() {
			validation.open();
		});
		
		var frecord = new gb.edit.FeatureRecord({
			id : "feature_id",
			wfstURL : urlList.wfst + urlList.token,
			layerInfoURL: urlList.getLayerInfo + urlList.token
		});

		var otree = new gb.tree.OpenLayers({
			"append" : $(".builderLayerClientPanel")[0],
			"map" : gbMap.getUpperMap(),
			"frecord" : frecord,
			"token" : urlList.token,
			"url" : {
				"getLegend" : "geoserver/geoserverWMSGetLegendGraphic.ajax?${_csrf.parameterName}=${_csrf.token}"
			}
		});

		var uploadSHP = new gb.geoserver.UploadSHP({
			"url" : "file/fileUpload.ajax?${_csrf.parameterName}=${_csrf.token}"
		});

		var gtree = new gb.tree.GeoServer({
			"append" : $(".builderLayerGeoServerPanel")[0],
			"clientTree" : otree.getJSTree(),
			"map" : gbMap.getUpperMap(),
			"properties": new gb.edit.ModifyLayerProperties({
				token: urlList.token,
				featureRecord: frecord
			}),
			"uploadSHP" : uploadSHP,
			"url" : {
				"getTree" : "geoserver/getGeolayerCollectionTree.ajax?${_csrf.parameterName}=${_csrf.token}",
				"addGeoServer" : "geoserver/addGeoserver.ajax?${_csrf.parameterName}=${_csrf.token}",
				"deleteGeoServer" : "geoserver/removeGeoserver.ajax?${_csrf.parameterName}=${_csrf.token}",
				"getMapWMS" : urlList.getMapWMS + urlList.token,
				"getLayerInfo" : urlList.getLayerInfo + urlList.token,
				"getWFSFeature": urlList.getWFSFeature + urlList.token
			}
		});
		
		// EditTool 활성화
		var epan = new gb.header.EditingTool({
			targetElement : gbMap.getLowerDiv(),
			map : gbMap.getUpperMap(),
			featureRecord : frecord,
			otree : otree,
			wfsURL : urlList.getWFSFeature + urlList.token,
			getFeatureInfo : urlList.getFeatureInfo + urlList.token,
			layerInfo : urlList.getLayerInfo + urlList.token,
			imageTile : urlList.getLayerTile,
			getFeature : urlList.getWFSFeature + urlList.token,
			locale : "en"
		});

		$("#editTool").click(function(e) {
			e.preventDefault();
			epan.editToolToggle();
		});

		$("#savePart").click(function(){
			frecord.sendWFSTTransaction(epan);
		});
		
		// 거리, 면적 측정 기능 추가
		var measureArea = new gb.interaction.MeasureTip({
			type : "Polygon",
			map : gbMap.getUpperMap(),
			snapSource : epan.snapSource
		});

		measureArea.on("change:active", function(evt) {
			if (evt.oldValue) {
				gb.undo.setActive(true);
			} else {
				gb.undo.setActive(false);
			}
		});

		var measureLength = new gb.interaction.MeasureTip({
			type : "LineString",
			map : gbMap.getUpperMap(),
			snapSource : epan.snapSource
		});

		measureLength.on("change:active", function(evt) {
			if (evt.oldValue) {
				gb.undo.setActive(true);
			} else {
				gb.undo.setActive(false);
			}
		});

		epan.addInteraction({
			icon : "fas fa-ruler-combined",
			content : "area",
			interaction : measureArea,
			"float" : "right"
		});

		epan.addInteraction({
			icon : "fas fa-ruler-vertical",
			content : "length",
			interaction : measureLength,
			"float" : "right",
			clickEvent : function() {
				console.log("mesure length");
			}
		});

		// hole draw interaction
		var hole = new gb.interaction.HoleDraw({
			selected : epan.selected
		});

		hole.on("change:active", function(evt) {
			if (evt.oldValue) {
				gb.undo.setActive(true);
			} else {
				gb.undo.setActive(false);
			}
		});

		epan.addInteraction({
			icon : "fab fa-bitbucket",
			content : "Hole",
			interaction : hole,
			selectActive: true,
			"float" : "right",
			clickEvent : function() {
				console.log("Hole draw");
			}
		});
		// feature list
		var featureList = new gb.footer.FeatureList({
			map : gbMap.getUpperMap(),
			targetElement : gbMap.getLowerDiv(),
			title : "All Feature List",
			toggleTarget : "#feature-toggle-btn",
			wfstURL : urlList.wfst + urlList.token,
			layerInfoURL : urlList.getLayerInfo + urlList.token,
			isDisplay : false
		});

		otree.getJSTreeElement().on('changed.jstreeol3', function(e, data) {
			var treeid = data.selected[0];
			var layer = data.instance.get_LayerById(treeid);

			if (!layer) {
				return;
			}

			if (layer instanceof ol.layer.Group) {
				return;
			}
			
			if(featureList.footerTag.css("display") === "none"){
				return;
			}
			
			featureList.updateFeatureList({
				url : urlList.getWFSFeature + urlList.token,
				treeid : treeid,
				geoserver : layer.get('git') ? layer.get('git').geoserver : "undefined",
				workspace : layer.get('git') ? layer.get('git').workspace : "undefined",
				layerName : layer.get('name')
			});
		});

		// command line
		var commandLine = new gb.footer.CommandLine({
			targetElement : gbMap.getLowerDiv(),
			jstree: otree,
			title : "Command Line",
			serverURL : urlList.getWFSFeature + urlList.token,
			toggleTarget : "#cmd-toggle-btn",
			isDisplay : false,
			map : gbMap.getUpperMap()
		});

		// geocoder
		var geocoder = new Geocoder('nominatim', {
			provider : 'osm',
			countrycodes : 'KR',
			key : '__some_key__',
			lang : 'en-US', //pt-BR, fr-FR
			placeholder : 'Search for ...',
			targetType : 'glass-button',
			limit : 5,
			keepOpen : false
		});
		gbMap.getUpperMap().addControl(geocoder);

		var mousePosition = new gb.map.MousePosition({
			map : gbMap.getUpperMap()
		});

		var vrepo = new gb.versioning.Repository({
			"url" : {
				"serverTree" : "geogig/getWorkingTree.ajax?${_csrf.parameterName}=${_csrf.token}",
				"remoteTree" : "geogig/getRemoteRepoTree.ajax?${_csrf.parameterName}=${_csrf.token}",
				"beginTransaction" : "geogig/beginTransaction.do?${_csrf.parameterName}=${_csrf.token}",
				"endTransaction" : "geogig/endTransaction.do?${_csrf.parameterName}=${_csrf.token}",
				"checkoutBranch" : "geogig/checkoutBranch.do?${_csrf.parameterName}=${_csrf.token}",
				"removeRemoteRepository" : "geogig/removeRemoteRepository.do?${_csrf.parameterName}=${_csrf.token}",
				"removeRepository" : "geogig/deleteRepository.do?${_csrf.parameterName}=${_csrf.token}",
				"branchList" : "geogig/branchList.do?${_csrf.parameterName}=${_csrf.token}",
				"mergeBranch" : "geogig/mergeBranch.do?${_csrf.parameterName}=${_csrf.token}",
				"initRepository" : "geogig/initRepository.do?${_csrf.parameterName}=${_csrf.token}",
				"addRemoteRepository" : "geogig/addRemoteRepository.do?${_csrf.parameterName}=${_csrf.token}",
				"pullRepository" : "geogig/pullRepository.do?${_csrf.parameterName}=${_csrf.token}",
				"pushRepository" : "geogig/pushRepository.do?${_csrf.parameterName}=${_csrf.token}",
				"createBranch" : "geogig/createBranch.do?${_csrf.parameterName}=${_csrf.token}"
			}
		});

		$("#vermodal").click(function() {
			vrepo.open();
		});

		var gitrnd = {
			resize : function() {
				//현재 보이는 브라우저 내부 영역의 높이
				var winHeight = $(window).innerHeight();
				//컨텐츠 영역의 높이 지정
				//#mainHeader -> 헤더1
				//.builderHeader -> 헤더2
				//.builderFooter -> 푸터
				// 없으면 삭제한다.
				var conHeight = winHeight
						- ($(".mainHeader").outerHeight(true) + $(".builderHeader").outerHeight(true) + $(".builderFooter").outerHeight(
								true));
				//현재 보이는 브라우저 내부 영역의 너비
				var winWidth = $(window).innerWidth();
				//컨텐츠 (지도) 영역의 너비 지정
				//.builderLayer -> 사이드바
				var mapWidth = winWidth - ($(".builderLayer").outerWidth(true));
				//사이드바의 높이 지정
				$(".builderLayer").outerHeight(conHeight);
				//편집영역의 높이 지정
				$(".builderContent").outerHeight(conHeight);
				//컨텐츠 영역의 너비 지정
				gbMap.setSize(mapWidth, conHeight);
				//컨텐츠 영역(겹친 지도 부분, 베이스맵과 편집영역을 겹쳐서 베이스맵이 편집에 영향이 없도록하기 위함)의 위치를 같게함
				var str = "-" + conHeight + "px";
				// 				$("#builderBaseMap").css("top", str);
				//편집영역이 베이스맵 위로 오도록 겹친 영역의 z-index를 조정
				// 				$("#builderBaseMap").find(".ol-viewport").css("z-index", 1);
				// 				$("#builderMap").find(".ol-viewport").css("z-index", 2);
				//16은 아래 마진, 1은 위 아래 보더 
				var listHeight = $(".builderLayer").innerHeight() / 2 - (16 + 1 + 1);
				// 				41은 패널 헤더의 높이
				var treeHeight = listHeight - (41);
				var searchHeight = $(".builder-tree-search").outerHeight();
				// 				$(".gitbuilder-layer-panel").outerHeight(treeHeight - searchHeight);
				$(".builderLayerGeoServerPanel").outerHeight(listHeight);
				$(".builderLayerClientPanel").outerHeight(listHeight);
			}
		}

		$(window).resize(function() {
			gitrnd.resize();
		});

		$(document).ready(function() {
			gitrnd.resize();
		});
	</script>
</body>
</html>
