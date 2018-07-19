/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.json.simple.JSONArray;

import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
public interface GeogigTreeBuilderService {

	/**
	 * @param geoserverManager
	 * @param serverName
	 * @param repoName
	 * @param reference
	 * @param transactionId
	 * @return
	 */
	public JSONArray getWorkingTree(DTGeoserverManager geoserverManager, String serverName, String repoName,
			String reference, String transactionId);

}
