/*
 *    OpenGDS/Builder
 *    http://git.co.kr
 *
 *    (C) 2014-2017, GeoSpatial Information Technology(GIT)
 *    
 *    This library is free software; you can redistribute it and/or
 *    modify it under the terms of the GNU Lesser General Public
 *    License as published by the Free Software Foundation;
 *    version 3 of the License.
 *
 *    This library is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *    Lesser General Public License for more details.
 */

package com.gitrnd.qaproducer.controller;

import java.net.MalformedURLException;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.gdsbuilder.geoserver.factory.DTGeoserverFactory;
import com.gitrnd.gdsbuilder.geoserver.factory.impl.DTGeoserverFactoryImpl;
import com.gitrnd.qaproducer.common.security.LoginUser;




/**
 * Session을 관리한다.
 * @author SG.Lee
 * @Date 2016.02
 * */
@Controller
public class AbstractController {
	
	
	private static final Logger LOGGER = LoggerFactory.getLogger(AbstractController.class);
	
	/**
	 * 세션 저장
	 * 
	 * @param request
	 * @param sessionName
	 *            : 세션 이름(EnSessionName에 정의)
	 * @param object
	 *            : 저장할 객체
	 */
	public void setSession(HttpServletRequest request, String sessionName,
			Object object) {
		HttpSession httpSession = request.getSession();
		httpSession.setAttribute(sessionName, object);
	}

	/**
	 * 세션 로드
	 * 
	 * @param request
	 * @param sessionName
	 *            : 불러올 세션 이름(EnSessionName에 정의)
	 * @return
	 */
	public Object getSession(HttpServletRequest request, String sessionName) {
		HttpSession httpSession = request.getSession();
		return httpSession.getAttribute(sessionName);
	}

	/**
	 * 세션 삭제
	 * 
	 * @param request
	 * @param sessionName
	 *            : 삭제할 세션 이름(EnSessionName에 정의)
	 */
	public void removeSession(HttpServletRequest request, String sessionName) {
		HttpSession httpSession = request.getSession();
		httpSession.removeAttribute(sessionName);
	}

	/**
	 * 세션 변경
	 * 
	 * @param request
	 * @param sessionName
	 */
	public void updateSession(HttpServletRequest request, String sessionName,
			Object object) {
		HttpSession httpSession = request.getSession();
		httpSession.setAttribute(sessionName, object);
	}
	
	
	
	/**
	 * Geoserver Session 추가
	 * @author SG.Lee
	 * @Date 2018. 7. 5. 오후 4:25:03
	 * @param request
	 * @return long
	 *         200 : 성공
	 *         600 : 로그인세션 없음
	 *         601 : 미입력 텍스트 존재
	 *         602 : 서버이름중복
	 *         603 : Geoserver 세션없음
	 *         604 : Geoserver 정보오류 
	 * */
	public long addGeoserverToSession(HttpServletRequest request, LoginUser loginUser){
		String serverName = "";
		String serverURL = "";
		String id="";
		String pw="";
		
		
		//사용자 로그인 세션체크
		LoginUser user = loginUser;
		if(user==null){
			return 600;
		}
		
		//input 파라미터 체크
		int flagNum = 0;
		Enumeration paramNames = request.getParameterNames();
		while (paramNames.hasMoreElements()) {
			String key = paramNames.nextElement().toString();
			String value = request.getParameter(key);

			if (key.toLowerCase().equals("serverName")) {
				serverName = value;
				flagNum++;
			} else if (key.toLowerCase().equals("serverURL")) {
				serverURL = value;
				flagNum++;
			} else if (key.toLowerCase().equals("id")) {
				id = value;
				flagNum++;
			} else if (key.toLowerCase().equals("pw")) {
				pw = value;
				flagNum++;
			}
		}
		
		
		Map<String, DTGeoserverManager> dtGeoManagers = (Map<String, DTGeoserverManager>) this.getSession(request, "geoserver");
		if(dtGeoManagers==null){
			return 603;
		}
		
		
		//서버이름 중복체크
		Iterator<String> keys = dtGeoManagers.keySet().iterator();
        while( keys.hasNext() ){
            String key = keys.next();
            if(serverName.equals(key)){
            	return 602;
            }
        }
		
		//Geoserver 체크
		if(flagNum!=4){
			return 601;
		}
		else{
			DTGeoserverFactory factory = new DTGeoserverFactoryImpl();
			try {
				DTGeoserverManager dtManager = factory.createDTGeoserverManager(serverURL, id, pw);
				dtGeoManagers.put(serverName, dtManager);
			} catch (MalformedURLException e) {
				// TODO Auto-generated catch block
				return 604;
			}
		}
		return 200;
	}
	
	
	/**
	 * Geoserver Seesion 삭제
	 * @author SG.Lee
	 * @Date 2018. 7. 6. 오후 4:41:04
	 * @param request
	 * @return long
	 *         200 : 성공
	 *         600 : 로그인세션 없음
	 *         603 : Geoserver 세션없음
	 *         605 : 서버이름존재 X 
	 * */
	public long deleteGeoserverToSession(HttpServletRequest request, LoginUser loginUser){
		String serverName = "";
		
		
		//사용자 로그인 세션체크
		LoginUser user = loginUser;
		if(user==null){
			return 600;
		}
		
		//input 파라미터 체크
		int flagNum = 0;
		Enumeration paramNames = request.getParameterNames();
		while (paramNames.hasMoreElements()) {
			String key = paramNames.nextElement().toString();
			String value = request.getParameter(key);
			if (key.toLowerCase().equals("serverName")) {
				serverName = value;
				flagNum++;
			} 
		}
		
		Map<String, DTGeoserverManager> dtGeoManagers = (Map<String, DTGeoserverManager>) this.getSession(request, "geoserver");
		if(dtGeoManagers==null){
			return 603;
		}
		
		//Geoserver 체크
		if(flagNum!=1){
			return 601;
		}
		else{
			//서버이름 중복체크
			Iterator<String> keys = dtGeoManagers.keySet().iterator();
	        while( keys.hasNext() ){
	            String key = keys.next();
	            //삭제성공
	            if(serverName.equals(key)){
	            	dtGeoManagers.remove(key);
	            	return 200;
	            }
	        }
		}
		return 605; //같은 이름의 서버가 없음
	}
	
	/**
	 *
	 * @author SG.Lee
	 * @Date 2018. 7. 6. 오후 5:36:50
	 * @param request
	 * @return DTGeoserverManager
	 * */
	public DTGeoserverManager getGeoserverManagerToSession(HttpServletRequest request, LoginUser loginUser){
		DTGeoserverManager dtGeoserverManager = null;
		String serverName = "";
		
		
		//사용자 로그인 세션체크
		LoginUser user = loginUser;
		if(user==null){
			LOGGER.error("사용자 세션 존재 X");
			return null;
		}
		
		//input 파라미터 체크
		int flagNum = 0;
		Enumeration paramNames = request.getParameterNames();
		while (paramNames.hasMoreElements()) {
			String key = paramNames.nextElement().toString();
			String value = request.getParameter(key);
			if (key.toLowerCase().equals("serverName")) {
				serverName = value;
				flagNum++;
			} 
		}
		
		Map<String, DTGeoserverManager> dtGeoManagers = (Map<String, DTGeoserverManager>) this.getSession(request, "geoserver");
		if(dtGeoManagers==null){
			LOGGER.error("Geoserver 세션 존재 X");
			return null;
		}
		
		//Geoserver 체크
		if(flagNum!=1){
			LOGGER.error("파라미터 존재X");
			return null;
		}
		else{
			//해당 조건에 맞는 DTGeoManager 객체 리턴
			Iterator<String> keys = dtGeoManagers.keySet().iterator();
	        while( keys.hasNext() ){
	            String key = keys.next();
	            if(serverName.equals(key)){
	            	return dtGeoManagers.get(key);
	            }
	        }
		}
		return dtGeoserverManager;
	}
}
