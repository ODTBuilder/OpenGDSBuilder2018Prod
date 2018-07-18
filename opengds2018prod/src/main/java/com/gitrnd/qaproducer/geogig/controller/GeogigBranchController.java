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

import com.gitrnd.gdsbuilder.geogig.type.GeogigBranch;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCheckout;
import com.gitrnd.gdsbuilder.geogig.type.GeogigMerge;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.qaproducer.common.security.LoginUser;
import com.gitrnd.qaproducer.controller.AbstractController;
import com.gitrnd.qaproducer.geogig.service.GeogigBranchService;

/**
 * @author GIT
 *
 */
@Controller
@RequestMapping("/geogig")
public class GeogigBranchController extends AbstractController {

	@Autowired
	@Qualifier("branchService")
	GeogigBranchService branchService;

	@RequestMapping(value = "/checkoutBranch.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigCheckout checkoutBranch(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String transactionId = (String) param.get("transactionId");
		String reference = (String) param.get("reference");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return branchService.checkoutBranch(geoserverManager, repoName, transactionId, reference);
	}

	@RequestMapping(value = "/statusBranch.do", method = RequestMethod.POST)
	@ResponseBody
	public JSONObject statusBranch(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String transactionId = (String) param.get("transactionId");
		String branchName = (String) param.get("branchName");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return branchService.statusBranch(geoserverManager, serverName, repoName, transactionId, branchName);
	}

	@RequestMapping(value = "/createBranch.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigBranch createBranch(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String branchName = (String) param.get("branchName");
		String source = (String) param.get("source");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return branchService.createBranch(geoserverManager, repoName, branchName, source);
	}

	@RequestMapping(value = "/branchList.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigBranch branchList(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return branchService.listBranch(geoserverManager, repoName);
	}

	@RequestMapping(value = "/mergeBranch.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigMerge mergeBranch(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String transactionId = (String) param.get("transactionId");
		String branchName = (String) param.get("branchName");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return branchService.mergeBranch(geoserverManager, repoName, transactionId, branchName);
	}

	@RequestMapping(value = "/resolveConflict.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigCheckout resolveConflict(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String transactionId = (String) param.get("transactionId");
		String path = (String) param.get("path");
		String version = (String) param.get("version");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return branchService.resolveConflict(geoserverManager, repoName, transactionId, path, version);
	}

}
