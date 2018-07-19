/**
 * 
 */
package com.gitrnd.qaproducer.geogig.controller;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gitrnd.gdsbuilder.geogig.type.GeogigTransaction;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.qaproducer.common.security.LoginUser;
import com.gitrnd.qaproducer.controller.AbstractController;
import com.gitrnd.qaproducer.geogig.service.GeogigTransactionService;

/**
 * @author GIT
 *
 */
@Controller
@RequestMapping("/geogig")
public class GeogigTransactionController extends AbstractController {

	@Autowired
	@Qualifier("transactionService")
	GeogigTransactionService transactionService;

	@RequestMapping(value = "/beginTransaction.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigTransaction beginTransaction(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return transactionService.beginTransaction(geoserverManager, repoName);
	}

	@RequestMapping(value = "/endTransaction.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigTransaction endTransaction(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String transactionId = (String) param.get("transactionId");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return transactionService.endTransaction(geoserverManager, repoName, transactionId);
	}

	@RequestMapping(value = "/cancelTransaction.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigTransaction cancelTransaction(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String transactionId = (String) param.get("transactionId");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return transactionService.cancelTransaction(geoserverManager, repoName, transactionId);
	}
}
