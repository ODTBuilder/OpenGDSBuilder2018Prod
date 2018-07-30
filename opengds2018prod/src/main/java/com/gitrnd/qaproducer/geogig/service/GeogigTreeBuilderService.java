/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import com.gitrnd.gdsbuilder.geogig.tree.GeogigRepositoryTree;
import com.gitrnd.gdsbuilder.geogig.tree.GeogigRepositoryTree.EnGeogigRepositoryTreeType;
import com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList;

/**
 * @author GIT
 *
 */
public interface GeogigTreeBuilderService {

/*	*//**
	 * @param geoserverManager
	 * @param serverName
	 * @param repoName
	 * @param reference
	 * @param transactionId
	 * @return
	 *//*
	public JSONArray getWorkingTree(DTGeoserverManager geoserverManager, String serverName, String repoName,
			String reference, String transactionId);*/

	
	public GeogigRepositoryTree getWorkingTree(DTGeoserverManagerList dtGeoservers, String serverName,
			EnGeogigRepositoryTreeType type, String parent, String transactionId);
}
