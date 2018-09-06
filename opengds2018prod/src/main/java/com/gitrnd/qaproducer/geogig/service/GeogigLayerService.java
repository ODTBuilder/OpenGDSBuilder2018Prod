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

	GeogigRepositoryLog logLayer(DTGeoserverManager geoserverManager, String repoName, String layerName);

	GeogigDiff diffLayer(DTGeoserverManager geoserverManager, String repoName, String oldObjectId, String newObjectId,
			String layerName);

}
