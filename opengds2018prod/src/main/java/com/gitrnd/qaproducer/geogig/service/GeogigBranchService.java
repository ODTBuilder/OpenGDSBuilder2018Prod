/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.json.simple.JSONObject;

import com.gitrnd.gdsbuilder.geogig.type.GeogigBranch;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCheckout;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCommit;
import com.gitrnd.gdsbuilder.geogig.type.GeogigMerge;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
public interface GeogigBranchService {

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param transactionId
	 * @param reference
	 * @return GeogigCheckout
	 */
	public GeogigCheckout checkoutBranch(DTGeoserverManager geoserverManager, String repoName, String transactionId,
			String reference);

	/**
	 * @param geoserverManager
	 * @param serverName
	 * @param repoName
	 * @param branchName
	 * @return JSONObject
	 */
	public JSONObject statusBranch(DTGeoserverManager geoserverManager, String serverName, String repoName,
			String transactionId, String branchName);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param branchName
	 * @param source
	 * @return GeogigBranch
	 */
	public GeogigBranch createBranch(DTGeoserverManager geoserverManager, String repoName, String branchName,
			String source);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @return GeogigBranch
	 */
	public GeogigBranch listBranch(DTGeoserverManager geoserverManager, String repoName);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param transactionId
	 * @param branchName
	 * @return GeogigMerge
	 */
	public GeogigMerge mergeBranch(DTGeoserverManager geoserverManager, String repoName, String transactionId,
			String branchName);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param transactionId
	 * @param path
	 * @param version
	 * @return GeogigCheckout
	 */
	public GeogigCheckout resolveConflict(DTGeoserverManager geoserverManager, String repoName, String transactionId,
			String path, String version);

}
