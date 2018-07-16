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

package com.gitrnd.qaproducer.geoserver.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gitrnd.gdsbuilder.geolayer.data.DTGeoGroupLayerList;
import com.gitrnd.gdsbuilder.geolayer.data.DTGeoLayerList;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList;
import com.gitrnd.qaproducer.common.security.LoginUser;
import com.gitrnd.qaproducer.controller.AbstractController;
import com.gitrnd.qaproducer.geoserver.service.GeoserverLayerProxyService;
import com.gitrnd.qaproducer.geoserver.service.GeoserverService;

/**
 * @ClassName: GeoserverController
 * @Description: Geoserver 관련된 요청을 처리한다.
 * @author JY.Kim
 * @date 2017. 4. 3. 오후 2:16:03
 * 
 */
@Controller("geoserverController")
@RequestMapping("/geoserver")
public class GeoserverController extends AbstractController {

	@Autowired
	@Qualifier("geoService")
	private GeoserverService geoserverService;

	@Autowired
	@Qualifier("proService")
	private GeoserverLayerProxyService proService;

	@RequestMapping(value = "/addGeoserver.ajax")
	public long addGeoserver(HttpServletRequest request, HttpServletResponse response, @AuthenticationPrincipal LoginUser loginUser) {
		if(loginUser==null){
			throw new NullPointerException("로그인 세션이 존재하지 않습니다.");
		}
		return super.addGeoserverToSession(request, loginUser);
	}
	
	@RequestMapping(value = "/removeGeoserver.ajax")
	public long removeGeoserver(HttpServletRequest request, HttpServletResponse response, @AuthenticationPrincipal LoginUser loginUser) {
		if(loginUser==null){
			throw new NullPointerException("로그인 세션이 존재하지 않습니다.");
		}
		return super.removeGeoserverToSession(request, loginUser);
	}
	
	@RequestMapping(value = "/downloadRequest.do")
	public void geoserverDataDownload(HttpServletRequest request, HttpServletResponse response, @AuthenticationPrincipal LoginUser loginUser) {
		if(loginUser==null){
			throw new NullPointerException("로그인 세션이 존재하지 않습니다.");
		}
		proService.requestGeoserverDataOutput(loginUser, request, response);
	}

	
	/**
	 * @Description 로그인한 계정에 대한 Geoserver 전체 트리 요청 
	 * @author SG.Lee
	 * @Date 2018. 7. 13. 오후 5:00:28
	 * @param request
	 * @param loginUser
	 * @param wsName
	 * @return JSONArray
	 * */
	@SuppressWarnings({ "unchecked", "static-access" })
	@RequestMapping(value = "/getGeolayerCollectionTree.ajax")
	@ResponseBody
	public JSONArray getGeolayerCollectionTree(HttpServletRequest request, @AuthenticationPrincipal LoginUser loginUser,
			@RequestParam(value = "serverName", required = false) String serverName) {
		if(loginUser==null){
			throw new NullPointerException("로그인 세션이 존재하지 않습니다.");
		}
		DTGeoserverManagerList sessionGMList = super.getGeoserverManagersToSession(request, loginUser);
		return geoserverService.getGeoserverLayerCollectionTree(sessionGMList, serverName);
	}
	
	/**
	 * @Description 트리생성 
	 * @author SG.Lee
	 * @Date 2018. 7. 13. 오후 5:00:28
	 * @param request
	 * @param loginUser
	 * @param wsName
	 * @return JSONArray
	 * */
	@SuppressWarnings({ "unchecked", "static-access" })
	@RequestMapping(value = "/getGeolayerCollectionTrees.ajax")
	@ResponseBody
	public JSONArray getGeolayerCollectionTrees(HttpServletRequest request, @AuthenticationPrincipal LoginUser loginUser) {
		if(loginUser==null){
			throw new NullPointerException("로그인 세션이 존재하지 않습니다.");
		}
		DTGeoserverManagerList sessionGMList = super.getGeoserverManagersToSession(request, loginUser);
		return geoserverService.getGeoserverLayerCollectionTrees(sessionGMList);
	}


	/**
	 * WMS레이어 요청 
	 * @author SG.Lee 
	 * @Date 2017. 4 
	 * @param request
	 * @param response 
	 * @throws Exception 
	 */
	@RequestMapping(value = "geoserverWMSLayerLoad.do")
	@ResponseBody
	public void geoserverWMSLoad(HttpServletRequest request, HttpServletResponse response, @AuthenticationPrincipal LoginUser loginUser)
			throws Exception {
		if(loginUser==null){
			throw new NullPointerException("로그인 세션이 존재하지 않습니다.");
		}
		proService.requestWMSLayer(loginUser, request, response);
	}

	/**
	 * WFSGetFeature
	 * @author SG.Lee
	 * @Date 2018. 7. 9. 오후 3:30:17
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException void
	 * */
	@RequestMapping(value = "geoserverWFSGetFeature.ajax")
	@ResponseBody
	public void geoserverWFSGetFeature(HttpServletRequest request, HttpServletResponse response, @AuthenticationPrincipal LoginUser loginUser)
			throws ServletException, IOException, Exception{
		if(loginUser==null){
			throw new NullPointerException("로그인 세션이 존재하지 않습니다.");
		}
		proService.requestGetFeature(loginUser, request, response);
	}

	/**
	 * WMSGetFeatureInfo
	 * @author SG.Lee
	 * @Date 2018. 7. 9. 오후 3:32:51
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException void
	 * */
	@RequestMapping(value = "geoserverWMSGetFeatureInfo.ajax")
	@ResponseBody
	public void geoserverWMSGetFeatureInfo(HttpServletRequest request, HttpServletResponse response, @AuthenticationPrincipal LoginUser loginUser)
			throws ServletException, IOException{
		if(loginUser==null){
			throw new NullPointerException("로그인 세션이 존재하지 않습니다.");
		}
		proService.requestGetFeatureInfo(loginUser, request, response);
	}

	/**
	 * getWMSGetLegendGraphic
	 * @author SG.Lee
	 * @Date 2018. 7. 9. 오후 3:33:02
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException void
	 * */
	@RequestMapping(value = "getWMSGetLegendGraphic.ajax")
	@ResponseBody
	public void getWMSGetLegendGraphic(HttpServletRequest request, HttpServletResponse response, @AuthenticationPrincipal LoginUser loginUser)
			throws ServletException, IOException{
		if(loginUser==null){
			throw new NullPointerException("로그인 세션이 존재하지 않습니다.");
		}
		proService.requestWMSGetLegendGraphic(loginUser, request, response);
	}

	/**
	 * Geoserver Layer 조회
	 * @author SG.Lee 
	 * @Date 2017. 4 
	 * @param request 
	 * @param jsonObject
	 * @return DTGeoLayerList 
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "getGeoLayerInfoList.ajax")
	@ResponseBody
	public DTGeoLayerList getGeoLayerList(HttpServletRequest request, @RequestBody JSONObject jsonObject, @AuthenticationPrincipal LoginUser loginUser) throws Exception{
		if(loginUser==null){
			throw new NullPointerException("로그인 세션이 존재하지 않습니다.");
		}
		List<String> geoLayerList = new ArrayList<String>();
		geoLayerList = (ArrayList<String>) jsonObject.get("geoLayerList");
		if (geoLayerList.size() == 0) {
			return null;
		} else{
			DTGeoserverManager dtGeoserverManager = super.getGeoserverManagerToSession(request, loginUser);
			String wsName = request.getParameter("wsName");
			return geoserverService.getGeoLayerList(dtGeoserverManager, wsName, (ArrayList<String>) geoLayerList);
		}
	}

	/**
	 * 레이어 중복체크
	 * @author SG.Lee 
	 * @Date 2017. 5 
	 * @param request 
	 * @param jsonObject 
	 * @return DTGeoLayerList 
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "layerDuplicateCheck.ajax")
	@ResponseBody
	public JSONObject duplicateCheck(HttpServletRequest request, @RequestBody JSONObject jsonObject, @AuthenticationPrincipal LoginUser loginUser) {
		if(loginUser==null){
			throw new NullPointerException("로그인 세션이 존재하지 않습니다.");
		}
		List<String> layerList = new ArrayList<String>();
		layerList = (ArrayList<String>) jsonObject.get("layerList");
		if (layerList.size() == 0) {
			return null;
		}else{
			DTGeoserverManager dtGeoserverManager = super.getGeoserverManagerToSession(request, loginUser);
			String wsName = request.getParameter("wsName");
			return geoserverService.duplicateCheck(dtGeoserverManager, wsName, (ArrayList<String>) layerList);
		}
	}

	/**
	 * Geoserver Group레이어 조회 
	 * @author SG.Lee 
	 * @Date 2017. 4 
	 * @param request 
	 * @param jsonObject 
	 * @return DTGeoLayerList 
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "getGeoGroupLayerInfoList.ajax")
	@ResponseBody
	public DTGeoGroupLayerList getGeoGroupLayerInfoList(HttpServletRequest request,
			@RequestBody JSONObject jsonObject, @AuthenticationPrincipal LoginUser loginUser) {
		if(loginUser==null){
			throw new NullPointerException("로그인 세션이 존재하지 않습니다.");
		}
		List<String> geoLayerList = new ArrayList<String>();
		geoLayerList = (ArrayList<String>) jsonObject.get("geoLayerList");
		String wsName = (String) jsonObject.get("wsName");
		if (geoLayerList.size() == 0) {
			return null;
		} else{
			DTGeoserverManager dtGeoserverManager = super.getGeoserverManagerToSession(request, loginUser);
			return geoserverService.getGeoGroupLayerList(dtGeoserverManager, wsName, (ArrayList<String>) geoLayerList);
		}
	}


	@RequestMapping(value = "publishGeoserverStyle.do")
	@ResponseBody
	public void publishGeoserverStyle(HttpServletRequest request, @RequestBody JSONObject jsonObject, @AuthenticationPrincipal LoginUser loginUser) {
		String sldBody = (String) jsonObject.get("sldBody");
		String name = (String) jsonObject.get("name");

		DTGeoserverManager dtGeoserverManager = super.getGeoserverManagerToSession(request, loginUser);
		
		geoserverService.publishStyle(dtGeoserverManager, sldBody, name);
	}

	@RequestMapping(value = "updateGeoserverStyle.do")
	@ResponseBody
	public void updateGeoserverStyle(HttpServletRequest request, @RequestBody JSONObject jsonObject, @AuthenticationPrincipal LoginUser loginUser) {
		String sldBody = (String) jsonObject.get("sldBody");
		String name = (String) jsonObject.get("name");

		DTGeoserverManager dtGeoserverManager = super.getGeoserverManagerToSession(request, loginUser);
		
		geoserverService.updateStyle(dtGeoserverManager, sldBody, name);
	}

	@RequestMapping(value = "removeGeoserverStyle.do")
	@ResponseBody
	public void removeGeoserverStyle(HttpServletRequest request, @RequestBody JSONObject jsonObject, @AuthenticationPrincipal LoginUser loginUser) {
		String name = (String) jsonObject.get("name");
		
		DTGeoserverManager dtGeoserverManager = super.getGeoserverManagerToSession(request, loginUser);
		
		geoserverService.removeStyle(dtGeoserverManager, name);
	}
}
