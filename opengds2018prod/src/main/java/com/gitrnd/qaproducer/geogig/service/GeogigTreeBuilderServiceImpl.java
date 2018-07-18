/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.GeogigRepositoryTree;
import com.gitrnd.gdsbuilder.geogig.GeogigWebReader;

/**
 * @author GIT
 *
 */
@Service("treeService")
public class GeogigTreeBuilderServiceImpl implements GeogigTreeBuilderService {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.git.opengds.geogig.service.GeogigTreeBuilderService#getWorkingTree(org.
	 * json.simple.JSONObject)
	 */
	@Override
	public JSONArray getWorkingTree(JSONObject param) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String reference = (String) param.get("reference"); // default : master, null : master
		String transactionId = (String) param.get("transactionId");

		// tmp default
		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		GeogigRepositoryTree tree = reader.getWorkingTree(serverName, repoName, reference, transactionId);
		return tree;
	}
}
