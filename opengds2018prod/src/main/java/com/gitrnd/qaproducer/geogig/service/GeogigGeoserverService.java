/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.json.simple.JSONObject;

import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
public interface GeogigGeoserverService {

	JSONObject getDataStoreList(DTGeoserverManager geoserverManager, String repoName, String branchName);

	void publishGeogigLayer(DTGeoserverManager geoserverManager, String workspace, String datastore, String layer);

	void listGeoserverLayer(DTGeoserverManager geoserverManager, String workspace, String datastore);

}
