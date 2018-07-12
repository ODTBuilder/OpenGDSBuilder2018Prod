<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- 제이쿼리 -->
<script src="${pageContext.request.contextPath}/resources/js/jquery/jquery-2.2.2.min.js"></script>
<!-- 부트스트랩 -->
<script src="${pageContext.request.contextPath}/resources/js/bootstrap/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/bootstrap/css/bootstrap.min.css">
<!-- 폰트어썸(아이콘) -->
<%-- <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/fontawesome/css/fontawesome-all.min.css" /> --%>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
	integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">

<c:choose>
	<c:when test="${browser == 'MSIE'}">
		<!-- 스윗얼럿 익스플로러 지원을 위한 코어js -->
		<script src='https://cdnjs.cloudflare.com/ajax/libs/core-js/2.5.5/core.min.js'></script>
	</c:when>
</c:choose>
<!-- 스윗얼럿(알림) -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/sweetalert2/sweetalert2.css">
<script src="${pageContext.request.contextPath}/resources/js/sweetalert2/sweetalert2.js"></script>
<!-- 드롭존(파일업로드) -->
<script src="${pageContext.request.contextPath}/resources/js/dropzone/dropzone.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/dropzone/basic.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/dropzone/dropzone.css">
<!-- 다운로드 js-->
<script src="${pageContext.request.contextPath}/resources/js/download/download.js"></script>
<!-- proj4js -->
<script src="${pageContext.request.contextPath}/resources/js/proj4js/dist/proj4-src.js"></script>
<%-- 오픈 레이어스3 --%>
<script src="${pageContext.request.contextPath}/resources/js/ol3/ol-debug.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/ol3/ol.css">
<%-- jsTree--%>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jsTree/jstree.js"></script>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/resources/js/jsTree/themes/default/style.css" />
<%-- jsTree geoserver plugin--%>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/jsTree-geoserver/jstree-geoserver.js"></script>
<!-- gb CSS -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/gb/css/gb.css">
<!-- gb namespace -->
<script src="${pageContext.request.contextPath}/resources/js/gb/gb_debug.js"></script>
<!-- gb map -->
<script src="${pageContext.request.contextPath}/resources/js/gb/map/map.js"></script>
<!-- gb modal base -->
<script src="${pageContext.request.contextPath}/resources/js/gb/modal/base.js"></script>
<!-- gb panel  base -->
<script src="${pageContext.request.contextPath}/resources/js/gb/panel/base.js"></script>
<!-- gb basemap -->
<script src="${pageContext.request.contextPath}/resources/js/gb/style/basemap.js"></script>
<!-- gb geoserver -->
<script src="${pageContext.request.contextPath}/resources/js/gb/tree/geoserver.js"></script>
