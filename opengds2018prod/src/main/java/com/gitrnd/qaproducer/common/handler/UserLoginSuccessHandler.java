package com.gitrnd.qaproducer.common.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList;


@Component
public class UserLoginSuccessHandler implements AuthenticationSuccessHandler {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {
        //set our response to OK status
        response.setStatus(HttpServletResponse.SC_OK);
        
        
        logger.info("AT onAuthenticationSuccess(...) function!");
        
    /*    for (GrantedAuthority auth : authentication.getAuthorities()) {
            if ("ROLE_ADMIN".equals(auth.getAuthority())){
            	admin = true;
            }
        }*/
        
        //Geoserver Session 생성
        
        DTGeoserverManagerList dtGeoserverList = new DTGeoserverManagerList();
		HttpSession httpSession = request.getSession();
		httpSession.setAttribute("geoserver", dtGeoserverList);
	}
}
