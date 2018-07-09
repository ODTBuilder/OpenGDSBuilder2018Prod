<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- 제이쿼리 -->
<script src="${pageContext.request.contextPath}/resources/js/jquery/jquery-2.2.2.min.js"></script>
<!-- 부트스트랩 -->
<script src="${pageContext.request.contextPath}/resources/js/bootstrap/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/bootstrap/css/bootstrap.min.css">
<!-- 폰트어썸(아이콘) -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/fontawesome/css/fontawesome-all.min.css" />

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
<!-- gb CSS -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/gb/css/gb.css">
<!-- gb 임베드 베이스 -->
<script src="${pageContext.request.contextPath}/resources/js/gb/embed/base.js"></script>
<!-- gb 레이어 정의 -->
<script src="${pageContext.request.contextPath}/resources/js/gb/embed/layerdefinition.js"></script>
<!-- gb 옵션 정의 -->
<script src="${pageContext.request.contextPath}/resources/js/gb/embed/optiondefinition.js"></script>
<!-- gb 검수 파일 정보 -->
<script src="${pageContext.request.contextPath}/resources/js/gb/modal/detailinformation.js"></script>