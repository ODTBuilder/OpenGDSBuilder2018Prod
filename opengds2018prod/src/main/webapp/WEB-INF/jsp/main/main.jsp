<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GeoDT Online</title>
<jsp:include page="/WEB-INF/jsp/common/libimport.jsp" />
<style>
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
		<jsp:include page="/WEB-INF/jsp/common/header.jsp" />
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
				<jsp:include page="/WEB-INF/jsp/common/footer.jsp" />
			</section>
		</div>
	</div>
</body>
</html>
