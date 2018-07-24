/**
 * 
 */
package com.gitrnd.qaproducer.geogig.controller;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gitrnd.gdsbuilder.geogig.tree.GeogigRepositoryTree.EnGeogigRepositoryTreeType;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList;
import com.gitrnd.qaproducer.common.security.LoginUser;
import com.gitrnd.qaproducer.controller.AbstractController;
import com.gitrnd.qaproducer.geogig.service.GeogigTreeBuilderService;

/**
 * @author GIT
 *
 */
public class GeogigTreeBuilderController extends AbstractController {

	@Autowired
	@Qualifier("treeService")
	GeogigTreeBuilderService treeService;

	/*@RequestMapping(value = "/getWorkingTree.do", method = RequestMethod.POST)
	public JSONArray getWorkingTree(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String reference = (String) param.get("reference"); // default : master, null : master
		String transactionId = (String) param.get("transactionId");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return treeService.getWorkingTree(geoserverManager, serverName, repoName, reference, transactionId);
	}*/
	
	@RequestMapping(value = "/getWorkingTree.ajax", method = RequestMethod.POST)
	public JSONArray getWorkingTree(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String node = (String) param.get("node");
		String transactionId = (String) param.get("transactionId");
		String type = (String) param.get("type");
		
		EnGeogigRepositoryTreeType enType = null;
		
		if(type==EnGeogigRepositoryTreeType.SERVER.getType()) {
			enType = EnGeogigRepositoryTreeType.SERVER;
		}else if(type==EnGeogigRepositoryTreeType.REPOSITORY.getType()) {
			enType = EnGeogigRepositoryTreeType.REPOSITORY;
		}else if(type==EnGeogigRepositoryTreeType.BRANCH.getType()) {
			enType = EnGeogigRepositoryTreeType.BRANCH;
		}else if(type==EnGeogigRepositoryTreeType.LAYER.getType()) {
			enType = EnGeogigRepositoryTreeType.LAYER;
		}

		DTGeoserverManagerList geoserverManagers = super.getGeoserverManagersToSession(request, loginUser);
		return treeService.getWorkingTree(geoserverManagers, serverName, enType, node, transactionId);
	}

}
