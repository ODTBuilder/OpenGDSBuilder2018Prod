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
				<!-- <li><a href="#">File</a></li> -->

				<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
					aria-expanded="false" title="Save">Save</a>
					<ul class="dropdown-menu" role="menu">
						<li><a href="#" id="savePart">Save</a></li>
						<li><a href="#" id="saveAll">Save All</a></li>
					</ul></li>

				<li><a href="#" title="Base map" id="changeBase">Base Map</a></li>
				<li><a href="#">Validation</a></li>
				<li><a href="#" title="QA Edit" id="qaedit">Navigator</a></li>
				<!-- <li><a href="#" title="QA Status" id="qastat">QA Status</a></li> -->
				<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
					aria-expanded="false" title="Generalization">Generalization</a>
					<ul class="dropdown-menu" role="menu">
						<li><a href="#" title="Generalization Process" id="gen">Generalization</a></li>
						<li><a href="#" title="Generalization Result" id="genstat">Result</a></li>
					</ul></li>

				<li><a href="#" title="Information" id="binfo">Information</a></li>
			</ul>
		</div>
	</nav>
	<div class="builderContent">
		<div class="builderLayer">
			<div class="builderLayerGeoServerPanel"></div>
			<div class="panel panel-default builderLayerClientPanel">
				<div class="panel-heading">
					<h3 class="panel-title" style="display: inline-block;">Layer</h3>
					<button id="crefresh" class="pull-right gitbuilder-clearbtn">
						<i class="fas fa-sync-alt"></i>
					</button>
				</div>
				<div class="panel-body" style="padding: 0;">
					<input type="text" class="form-control builder-tree-search" id="inputSearchClient" />
					<div id="builderClientLayer" class="gitbuilder-layer-panel"></div>
				</div>
			</div>
		</div>
		<div class="bind"></div>
	</div>
	<nav class="navbar navbar-default builderFooter">
		<span class="text-muted">OpenGDS Builder/Validator</span> <span class="text-muted"><a href="#" class="epsg-now"></a></span>
	</nav>
	<script type="text/javascript">
		/* var projection = ol.proj.get('EPSG:3857');

		var view = new ol.View({
			center : ol.proj.fromLonLat([ 37.41, 8.82 ]),
			zoom : 4
		});

		var map = new ol.Map({
			target : 'builderMap',
			layers : [],
			view : view,
			controls : [ new ol.control.Zoom(), new ol.control.ZoomSlider() ]
		});

		var map2 = new ol.Map({
			target : 'builderBaseMap',
			controls : [],
			layers : [],
			view : view
		}); */
		var gbmap = new gb.Map({
			"target" : $(".bind")[0]
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
				gbmap.setSize(mapWidth, conHeight);
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
				$(".gitbuilder-layer-panel").outerHeight(treeHeight - searchHeight);
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
