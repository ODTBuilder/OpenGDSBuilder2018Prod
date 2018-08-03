/**
 * 
 */
package com.gitrnd.qaproducer.geogig.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	public GeogigRemoteRepository listRemoteRepository(HttpServletRequest request,
			@AuthenticationPrincipal LoginUser loginUser,
			@RequestParam(value = "serverName", required = false) String serverName,
			@RequestParam(value = "repoName", required = false) String repoName,
			@RequestParam(value = "verbose", required = false) Boolean verbose) {

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return reposService.listRemoteRepository(geoserverManager, repoName, verbose);
	}

	@RequestMapping(value = "/addRemoteRepository.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigRemoteRepository addRemoteRepository(HttpServletRequest request,
			@AuthenticationPrincipal LoginUser loginUser,
			@RequestParam(value = "serverName", required = false) String serverName,
			@RequestParam(value = "repoName", required = false) String repoName,
			@RequestParam(value = "remoteName", required = false) String remoteName,
			@RequestParam(value = "remoteURL", required = false) String remoteURL) {

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return reposService.addRemoteRepository(geoserverManager, repoName, remoteName, remoteURL);
	}

	@RequestMapping(value = "/removeRemoteRepository.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigRemoteRepository removeRemoteRepository(HttpServletRequest request,
			@AuthenticationPrincipal LoginUser loginUser,
			@RequestParam(value = "serverName", required = false) String serverName,
			@RequestParam(value = "repoName", required = false) String repoName,
			@RequestParam(value = "remoteName", required = false) String remoteName,
			@RequestParam(value = "removeTrue", required = false) Boolean removeTrue) {

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return reposService.removeRemoteRepository(geoserverManager, repoName, remoteName);
	}

	@RequestMapping(value = "/pingRemoteRepository.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigRemoteRepository pingRemoteRepository(HttpServletRequest request,
			@AuthenticationPrincipal LoginUser loginUser,
			@RequestParam(value = "serverName", required = false) String serverName,
			@RequestParam(value = "repoName", required = false) String repoName,
			@RequestParam(value = "remoteName", required = false) String remoteName) {

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return reposService.pingRemoteRepository(geoserverManager, repoName, remoteName);
	}

	@RequestMapping(value = "/pullRepository.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigPull pullRepository(HttpServletRequest request, @AuthenticationPrincipal LoginUser loginUser,
			@RequestParam(value = "serverName", required = false) String serverName,
			@RequestParam(value = "repoName", required = false) String repoName,
			@RequestParam(value = "branchName", required = false) String branchName,
			@RequestParam(value = "remoteName", required = false) String remoteName,
			@RequestParam(value = "remoteBranchName", required = false) String remoteBranchName,
			@RequestParam(value = "authorName", required = false) String authorName,
			@RequestParam(value = "authorEmail", required = false) String authorEmail,
			@RequestParam(value = "transactionId", required = false) String transactionId) {

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return reposService.pullRepository(geoserverManager, repoName, transactionId, remoteName, branchName,
				remoteBranchName, authorName, authorEmail);
	}

	@RequestMapping(value = "/pushRepository.do", method = RequestMethod.POST)
	@ResponseBody
	public GeogigPush pushRepository(HttpServletRequest request, @AuthenticationPrincipal LoginUser loginUser,
			@RequestParam(value = "serverName", required = false) String serverName,
			@RequestParam(value = "repoName", required = false) String repoName,
			@RequestParam(value = "branchName", required = false) String branchName,
			@RequestParam(value = "remoteName", required = false) String remoteName,
			@RequestParam(value = "remoteBranchName", required = false) String remoteBranchName) {

		DTGeoserverManager geoserverManager = super.getGeoserverManagerToSession(request, loginUser, serverName);
		return reposService.pushRepository(geoserverManager, repoName, remoteName, branchName, remoteBranchName);
	}

}
