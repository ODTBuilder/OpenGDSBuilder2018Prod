/**
 * 
 */
package com.gitrnd.qaproducer.geogig.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gitrnd.qaproducer.geogig.service.GeogigTreeBuilderService;

/**
 * @author GIT
 *
 */
public class GeogigTreeBuilderController {

	@Autowired
	@Qualifier("treeService")
	GeogigTreeBuilderService treeService;

	@RequestMapping(value = "/getWorkingTree.do", method = RequestMethod.POST)
	public JSONArray getWorkingTree(JSONObject param) {
		return treeService.getWorkingTree(param);
	}

}
