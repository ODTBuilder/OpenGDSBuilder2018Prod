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
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

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
	public GeogigCheckout checkoutBranch(DTGeoserverManager geoserverManager, String repoName, String transactionId,
			String reference) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.checkoutBranch(repoName, transactionId, reference);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.gitrnd.qaproducer.geogig.service.GeogigBranchService#statusBranch(com.
	 * gitrnd.gdsbuilder.geoserver.DTGeoserverManager, java.lang.String,
	 * java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public JSONObject statusBranch(DTGeoserverManager geoserverManager, String serverName, String repoName,
			String transactionId, String branchName) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.statusBranch(serverName, repoName, transactionId, branchName);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.gitrnd.qaproducer.geogig.service.GeogigBranchService#createBranch(com.
	 * gitrnd.gdsbuilder.geoserver.DTGeoserverManager, java.lang.String,
	 * java.lang.String, java.lang.String)
	 */
	@Override
	public GeogigBranch createBranch(DTGeoserverManager geoserverManager, String repoName, String branchName,
			String source) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.createBranch(repoName, branchName, source);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gitrnd.qaproducer.geogig.service.GeogigBranchService#listBranch(com.
	 * gitrnd.gdsbuilder.geoserver.DTGeoserverManager, java.lang.String)
	 */
	@Override
	public GeogigBranch listBranch(DTGeoserverManager geoserverManager, String repoName) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.listBranch(repoName);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.gitrnd.qaproducer.geogig.service.GeogigBranchService#mergeBranch(com.
	 * gitrnd.gdsbuilder.geoserver.DTGeoserverManager, java.lang.String,
	 * java.lang.String, java.lang.String)
	 */
	@Override
	public GeogigMerge mergeBranch(DTGeoserverManager geoserverManager, String repoName, String transactionId,
			String branchName) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.mergeBranch(repoName, transactionId, branchName);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.gitrnd.qaproducer.geogig.service.GeogigBranchService#resolveConflict(com.
	 * gitrnd.gdsbuilder.geoserver.DTGeoserverManager, java.lang.String,
	 * java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public GeogigCheckout resolveConflict(DTGeoserverManager geoserverManager, String repoName, String transactionId,
			String path, String version) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.checkoutBranch(repoName, transactionId, path, version);
	}
}
