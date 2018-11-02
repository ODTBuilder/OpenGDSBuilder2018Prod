/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
public interface GeogigGeoserverService {

	void getDataStoreList(DTGeoserverManager geoserverManager, String repoName, String branchName);

}
