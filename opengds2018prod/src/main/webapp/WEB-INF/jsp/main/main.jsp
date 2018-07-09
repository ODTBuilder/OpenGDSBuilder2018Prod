<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GeoDT Online</title>
<jsp:include page="/WEB-INF/jsp/common/libimport.jsp" />
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
</style>
</head>
<body>
	<div class="container">
		<jsp:include page="/WEB-INF/jsp/common/header2.jsp" />
		<div>
			<section>
				<div class="jumbotron">
					<h1>Quality Assurance</h1>
					<p>수치지도, 지하시설물, 임상도의 정위치 및 구조화 검수를 지원합니다.</p>
					<p>
						<a class="btn btn-primary btn-lg" href="#" role="button">더 알아보기</a>
					</p>
				</div>
			</section>
			<section>
				<div>
					<address>
						<img src="${pageContext.request.contextPath}/resources/img/git_new_logo.png" /> <strong style="font-size: 1.1em;">
							공간정보기술(주) </strong><br> 경기도 성남시 분당구 판교로 228번길 15(삼평동, 판교7벤처밸리1) 3동 6층 <br> <abbr title="Phone">P:</abbr> (031)
						622-3826
					</address>
				</div>
			</section>
		</div>
	</div>
</body>
</html>
