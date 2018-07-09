<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<nav class="navbar navbar-default">
	<div class="container-fluid">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
				<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="${pageContext.request.contextPath}/main.do"><img
				style="height: 20px; width: auto; display: inline; margin-right: 10px; padding: 0;"
				src="${pageContext.request.contextPath}/resources/img/onlyglobe.png" alt="GeoDT Online">GeoDT Online</a>
		</div>

		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse" id="navbar-collapse-1">
			<ul class="nav navbar-nav navbar-right">
				<li><a href="${pageContext.request.contextPath}/validation.do"> 검수</a></li>
				<li><a href="${pageContext.request.contextPath}/list.do"> 요청목록</a></li>
				<li><a href="${pageContext.request.contextPath}/settinglist.do"> 설정</a></li>
				<c:choose>
					<c:when test="${username ne null}">
						<li><a href="${pageContext.request.contextPath}/user/userinfo.do"><i class="fas fa-user-circle"></i>&nbsp;${lname}&nbsp;${fname}</a></li>
					</c:when>
				</c:choose>
				<c:choose>
					<c:when test="${username eq null}">
						<li><a href="${pageContext.request.contextPath}/signin.do"><span class="glyphicon glyphicon-log-in"></span>
								로그인</a></li>
					</c:when>
					<c:when test="${username ne null}">
						<li><a href="${pageContext.request.contextPath}/signout.do"><span class="glyphicon glyphicon-log-out"></span>
								로그아웃</a></li>
					</c:when>
				</c:choose>
			</ul>
		</div>
		<!-- /.navbar-collapse -->
	</div>
	<!-- /.container-fluid -->
</nav>