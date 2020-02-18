/**
 * 
 */
package com.gitrnd.qaproducer.generalization.controller;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.qaproducer.common.security.LoginUser;
import com.gitrnd.qaproducer.controller.AbstractController;
import com.gitrnd.qaproducer.generalization.service.GeneralizationService;

@Controller
@RequestMapping("/generalization")
public class GeneralizationController extends AbstractController {

	@Autowired
	@Qualifier("generalizationService")
	GeneralizationService generalizationService;

	@RequestMapping(value = "/excute.do", method = RequestMethod.POST)
	@ResponseBody
	public void excute(HttpServletRequest request, @RequestBody String jsonStr,
			@AuthenticationPrincipal LoginUser loginUser) throws ParseException {

		JSONParser parser = new JSONParser();
		JSONObject jsonObject = (JSONObject) parser.parse(jsonStr);

		JSONObject geoserver = (JSONObject) jsonObject.get("geoserver");
		String crs = (String) jsonObject.get("crs");
		JSONObject preset = (JSONObject) jsonObject.get("preset");

		String serverName = (String) geoserver.get("servername");
		JSONObject layers = (JSONObject) geoserver.get("layers");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		String serverURL = geoserverManager.getRestURL();

		int cid = 6;
		generalizationService.excute(serverURL, layers, cid, crs, preset, loginUser.getIdx());
	}
}
