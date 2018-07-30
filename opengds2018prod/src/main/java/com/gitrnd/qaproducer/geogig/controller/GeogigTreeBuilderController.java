/**
 * 
 */
package com.gitrnd.qaproducer.geogig.controller;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gitrnd.gdsbuilder.geogig.tree.GeogigRepositoryTree.EnGeogigRepositoryTreeType;
import com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList;
import com.gitrnd.qaproducer.common.security.LoginUser;
import com.gitrnd.qaproducer.controller.AbstractController;
import com.gitrnd.qaproducer.geogig.service.GeogigTreeBuilderService;

/**
 * @author GIT
 *
 */
@Controller
@RequestMapping("/geogig")
public class GeogigTreeBuilderController extends AbstractController {

	@Autowired
	@Qualifier("treeService")
	GeogigTreeBuilderService treeService;

	/*
	 * @RequestMapping(value = "/getWorkingTree.do", method = RequestMethod.POST)
	 * public JSONArray getWorkingTree(HttpServletRequest request, @RequestBody
	 * JSONObject param,
	 * 
	 * @AuthenticationPrincipal LoginUser loginUser) {
	 * 
	 * String serverName = (String) param.get("serverName"); String repoName =
	 * (String) param.get("repoName"); String reference = (String)
	 * param.get("reference"); // default : master, null : master String
	 * transactionId = (String) param.get("transactionId");
	 * 
	 * DTGeoserverManager geoserverManager =
	 * super.getGeoserverManagerToSession(request, loginUser, serverName); return
	 * treeService.getWorkingTree(geoserverManager, serverName, repoName, reference,
	 * transactionId); }
	 */

	@RequestMapping(value = "/getWorkingTree.ajax")
	@ResponseBody
	public JSONArray getWorkingTree(HttpServletRequest request, @AuthenticationPrincipal LoginUser loginUser,
			@RequestParam(value = "node", required = false) String node,
			@RequestParam(value = "type", required = false) String type,
			@RequestParam(value = "serverName", required = false) String serverName,
			@RequestParam(value = "transactionId", required = false) String transactionId) {

		// String serverName = (String) param.get("serverName");
		// String node = (String) param.get("node");
		// String transactionId = (String) param.get("transactionId");
		// String type = (String) param.get("type");

		EnGeogigRepositoryTreeType enType = null;

		if (type.equals(EnGeogigRepositoryTreeType.SERVER.getType())) {
			enType = EnGeogigRepositoryTreeType.SERVER;
		} else if (type.equals(EnGeogigRepositoryTreeType.REPOSITORY.getType())) {
			enType = EnGeogigRepositoryTreeType.REPOSITORY;
		} else if (type.equals(EnGeogigRepositoryTreeType.BRANCH.getType())) {
			enType = EnGeogigRepositoryTreeType.BRANCH;
		} else if (type.equals(EnGeogigRepositoryTreeType.LAYER.getType())) {
			enType = EnGeogigRepositoryTreeType.LAYER;
		}

		DTGeoserverManagerList geoserverManagers = super.getGeoserverManagersToSession(request, loginUser);
		return treeService.getWorkingTree(geoserverManagers, serverName, enType, node, transactionId);
	}

}
