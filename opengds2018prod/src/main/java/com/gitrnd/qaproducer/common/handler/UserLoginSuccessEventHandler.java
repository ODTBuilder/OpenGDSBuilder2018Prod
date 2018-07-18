package com.gitrnd.qaproducer.common.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Service;

import com.gitrnd.qaproducer.common.security.LoginUser;

@Service
public class UserLoginSuccessEventHandler implements ApplicationListener<AuthenticationSuccessEvent> {
	Logger logger = LoggerFactory.getLogger(UserLoginSuccessEventHandler.class);

	@Override
	public void onApplicationEvent(AuthenticationSuccessEvent event) {
		LoginUser user = (LoginUser) (event.getAuthentication().getPrincipal());
		logger.info("접속성공 : " + user);
		// 마지막 접속날짜라던지 여러가지.. 입력
	}
}