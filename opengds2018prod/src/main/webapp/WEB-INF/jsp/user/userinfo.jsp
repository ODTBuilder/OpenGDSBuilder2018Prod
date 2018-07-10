<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GeoDT Online</title>
<jsp:include page="/WEB-INF/jsp/common/libimport.jsp" />
<style>
</style>
</head>
<body>
	<script>
		$(document).on("click", "#deactivateUser", function() {
			swal({
				title : "계정을 비활성화 하시겠습니까?",
				type : "warning",
				showCancelButton : true,
				confirmButtonText : "확인",
				cancelButtonText : "취소",
				reverseButtons : true
			}).then(function(isConfirm) {
				if (isConfirm.value) {
					$.ajax({
						"url" : "${pageContext.request.contextPath}/user/deactivateuser.ajax",
						"success" : function(data, textStatus, jqXHR) {
							console.log(data);
							if (data) {
								swal({
									title : "계정이 비활성화 되었습니다.",
									type : "success",
									confirmButtonText : "확인",
								}).then(function(confirm) {
									if (confirm.value) {
										location.href = "${pageContext.request.contextPath}/user/signout.do";
									}
								});
							} else {
								swal('실패', '계정이 비활성화 요청을 실패하였습니다.', 'error');
							}
						}
					});
				}
			});
		});
	</script>
	<div class="container">
		<jsp:include page="/WEB-INF/jsp/common/header2.jsp" />
		<div class="panel panel-default">
			<div class="panel-body">
				<section class="SettingSection">
					<div class="row">
						<div class="col-md-4 col-md-offset-4">
							<div class="row">
								<div class="col-md-4 col-md-offset-2">아이디</div>
								<div class="col-md-6">${username}</div>
							</div>
							<div class="row">
								<div class="col-md-4 col-md-offset-2">이름</div>
								<div class="col-md-6">${lname}&nbsp;${fname}</div>
							</div>
							<div class="row">
								<div class="col-md-4 col-md-offset-2">이메일</div>
								<div class="col-md-6">${email}</div>
							</div>
							<div class="row">
								<div class="col-md-4 col-md-offset-2">검수 권한</div>
								<div class="col-md-6">${auth}</div>
							</div>
							<div class="col-md-4"></div>
						</div>
					</div>
					<div class="text-right" style="margin-top: 15px;">
						<button id="deactivateUser" class="btn btn-link">계정 비활성화</button>
					</div>
				</section>
			</div>
		</div>
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
</body>
</html>
