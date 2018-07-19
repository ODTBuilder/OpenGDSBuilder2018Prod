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

import com.gitrnd.gdsbuilder.geogig.type.GeogigPull;
import com.gitrnd.gdsbuilder.geogig.type.GeogigPush;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRemoteRepository;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.qaproducer.common.security.LoginUser;
import com.gitrnd.qaproducer.controller.AbstractController;
import com.gitrnd.qaproducer.geogig.service.GeogigRepositoryService;

/**
 * @author GIT
 *
 */
@Controller
@RequestMapping("/geogig")
public class GeogigRepositoryController extends AbstractController {

	@Autowired
	@Qualifier("reposService")
	GeogigRepositoryService reposService;

	@RequestMapping(value = "/listRemoteRepository.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigRemoteRepository listRemoteRepository(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("reooName");
		Boolean verbose = (Boolean) param.get("verbose");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return reposService.listRemoteRepository(geoserverManager, repoName, verbose);
	}

	@RequestMapping(value = "/addRemoteRepository.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigRemoteRepository addRemoteRepository(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("reooName");
		String remoteName = (String) param.get("remoteName");
		String remoteURL = (String) param.get("remoteURL");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return reposService.addRemoteRepository(geoserverManager, repoName, remoteName, remoteURL);
	}

	@RequestMapping(value = "/removeRemoteRepository.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigRemoteRepository removeRemoteRepository(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("reooName");
		Boolean removeTrue = (Boolean) param.get("remove");
		String remoteName = (String) param.get("remoteName");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return reposService.removeRemoteRepository(geoserverManager, repoName, removeTrue, remoteName);
	}

	@RequestMapping(value = "/pingRemoteRepository.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigRemoteRepository pingRemoteRepository(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("reooName");
		String remoteName = (String) param.get("remoteName");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return reposService.pingRemoteRepository(geoserverManager, repoName, remoteName);
	}

	@RequestMapping(value = "/pullRepository.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigPull pullRepository(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("reooName");
		String transactionId = (String) param.get("transactionId");
		String remoteName = (String) param.get("remoteName");
		String branchName = (String) param.get("branchName");
		String remoteBranchName = (String) param.get("remoteBranchName");
		String authorName = (String) param.get("authorName");
		String authorEmail = (String) param.get("authorEmail");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return reposService.pullRepository(geoserverManager, repoName, transactionId, remoteName, branchName,
				remoteBranchName, authorName, authorEmail);
	}

	@RequestMapping(value = "/pushRepository.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigPush pushRepository(HttpServletRequest request, @RequestBody JSONObject param,
			@AuthenticationPrincipal LoginUser loginUser) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("reooName");
		String remoteName = (String) param.get("remoteName");
		String branchName = (String) param.get("branchName");
		String remoteBranchName = (String) param.get("remoteBranchName");

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return reposService.pushRepository(geoserverManager, repoName, remoteName, branchName, remoteBranchName);
	}

}
