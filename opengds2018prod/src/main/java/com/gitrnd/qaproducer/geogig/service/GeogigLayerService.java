/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import com.gitrnd.gdsbuilder.geogig.type.GeogigDiff;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositoryLog;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
public interface GeogigLayerService {

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param layerName
	 * @return
	 */
	GeogigRepositoryLog logLayer(DTGeoserverManager geoserverManager, String repoName, String layerName);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param oldIndex
	 * @param newIndex
	 * @param layerName
	 * @return
	 */
	GeogigDiff diffLayer(DTGeoserverManager geoserverManager, String repoName, int oldIndex, int newIndex,
			String layerName);

}
