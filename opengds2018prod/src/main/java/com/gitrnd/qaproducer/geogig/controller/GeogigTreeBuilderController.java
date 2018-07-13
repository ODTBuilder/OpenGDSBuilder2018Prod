/**
 * 
 */
package com.gitrnd.qaproducer.geogig.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author GIT
 *
 */
public class GeogigTreeBuilderController {

	@RequestMapping(value = "/getWorkingTree.do", method = RequestMethod.POST)
	public JSONArray getWorkingTree(JSONObject param) {
		return null;
	}

}
