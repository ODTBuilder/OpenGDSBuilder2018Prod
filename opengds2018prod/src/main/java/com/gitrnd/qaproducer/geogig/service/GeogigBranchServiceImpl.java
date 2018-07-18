/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.GeogigWebReader;
import com.gitrnd.gdsbuilder.geogig.type.GeogigBranch;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCheckout;
import com.gitrnd.gdsbuilder.geogig.type.GeogigMerge;

/**
 * @author GIT
 *
 */
@Service("branchService")
public class GeogigBranchServiceImpl implements GeogigBranchService {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.git.opengds.geogig.service.GeogigBranchService#checkoutBranch(org.json.
	 * simple.JSONObject)
	 */
	@Override
	public GeogigCheckout checkoutBranch(JSONObject param) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String transactionId = (String) param.get("transactionId");
		String reference = (String) param.get("reference");

		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		return reader.checkoutBranch(repoName, transactionId, reference);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.git.opengds.geogig.service.GeogigBranchService#createBranch(org.json.
	 * simple.JSONObject)
	 */
	@Override
	public GeogigBranch createBranch(JSONObject param) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String branchName = (String) param.get("branchName");
		String source = (String) param.get("source");

		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		return reader.createBranch(repoName, branchName, source);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.git.opengds.geogig.service.GeogigBranchService#mergeBranch(org.json.
	 * simple.JSONObject)
	 */
	@Override
	public GeogigMerge mergeBranch(JSONObject param) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String transactionId = (String) param.get("transactionId");
		String branchName = (String) param.get("branchName");

		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		return reader.mergeBranch(repoName, transactionId, branchName);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.git.opengds.geogig.service.GeogigBranchService#listBranch(org.json.simple
	 * .JSONObject)
	 */
	@Override
	public GeogigBranch listBranch(JSONObject param) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");

		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		return reader.listBranch(repoName);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.git.opengds.geogig.service.GeogigBranchService#resolveConflict(org.json.
	 * simple.JSONObject)
	 */
	@Override
	public GeogigCheckout resolveConflict(JSONObject param) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String transactionId = (String) param.get("transactionId");
		String path = (String) param.get("path");
		String version = (String) param.get("version");

		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		return reader.checkoutBranch(repoName, transactionId, path, version);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.gitrnd.qaproducer.geogig.service.GeogigBranchService#statusBranch(org.
	 * json.simple.JSONObject)
	 */
	@Override
	public JSONObject statusBranch(JSONObject param) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String transactionId = (String) param.get("transactionId");
		String branchName = (String) param.get("branchName");

		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		return reader.statusBranch(serverName, repoName, transactionId, branchName);
	}

}
