/**
 * 
 */
package com.gitrnd.qaproducer.geogig.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gitrnd.gdsbuilder.geogig.type.GeogigPull;
import com.gitrnd.gdsbuilder.geogig.type.GeogigPush;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRemoteRepository;
import com.gitrnd.qaproducer.geogig.service.GeogigRepositoryService;

/**
 * @author GIT
 *
 */
@Controller
@RequestMapping("/geogig")
public class GeogigRepositoryController {

	@Autowired
	GeogigRepositoryService reposService;

	@RequestMapping(value = "/listRemoteRepository.do", method = RequestMethod.POST)
	public GeogigRemoteRepository listRemoteRepository(JSONObject param) {
		return reposService.listRemoteRepository(param);
	}

	@RequestMapping(value = "/addRemoteRepository.do", method = RequestMethod.POST)
	public GeogigRemoteRepository addRemoteRepository(JSONObject param) {
		return reposService.addRemoteRepository(param);
	}

	@RequestMapping(value = "/removeRemoteRepository.do", method = RequestMethod.POST)
	public GeogigRemoteRepository removeRemoteRepository(JSONObject param) {
		return reposService.removeRemoteRepository(param);
	}

	@RequestMapping(value = "/pingRemoteRepository.do", method = RequestMethod.POST)
	public GeogigRemoteRepository pingRemoteRepository(JSONObject param) {
		return reposService.pingRemoteRepository(param);
	}

	@RequestMapping(value = "/pullRepository.do", method = RequestMethod.POST)
	public GeogigPull pullRepository(JSONObject param) {
		return reposService.pullRepository(param);
	}

	@RequestMapping(value = "/pushRepository.do", method = RequestMethod.POST)
	public GeogigPush pushRepository(JSONObject param) {
		return reposService.pushRepository(param);
	}

}
