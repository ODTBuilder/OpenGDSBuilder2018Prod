/**
 * 
 */
package com.gitrnd.qaproducer.geogig.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gitrnd.gdsbuilder.geogig.type.GeogigBranch;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCheckout;
import com.gitrnd.gdsbuilder.geogig.type.GeogigMerge;
import com.gitrnd.qaproducer.geogig.service.GeogigBranchService;

/**
 * @author GIT
 *
 */
@Controller
@RequestMapping("/geogig")
public class GeogigBranchController {

	@Autowired
	@Qualifier("branchService")
	GeogigBranchService branchService;

	@RequestMapping(value = "/checkoutBranch.do", method = RequestMethod.POST)
	public GeogigCheckout checkoutBranch(JSONObject param) {
		return branchService.checkoutBranch(param);
	}

	@RequestMapping(value = "/createBranch.do", method = RequestMethod.POST)
	public GeogigBranch createBranch(JSONObject param) {
		return branchService.createBranch(param);
	}

	@RequestMapping(value = "/branchList.do", method = RequestMethod.POST)
	public GeogigBranch branchList(JSONObject param) {
		return branchService.listBranch(param);
	}

	@RequestMapping(value = "/mergeBranch.do", method = RequestMethod.POST)
	public GeogigMerge mergeBranch(JSONObject param) {
		return branchService.mergeBranch(param);
	}

	@RequestMapping(value = "/resolveConflict.do", method = RequestMethod.POST)
	public GeogigCheckout resolveConflict(JSONObject param) {
		return branchService.resolveConflict(param);
	}

}
