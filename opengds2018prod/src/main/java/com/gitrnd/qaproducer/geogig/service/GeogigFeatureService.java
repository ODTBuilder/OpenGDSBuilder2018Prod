package com.gitrnd.qaproducer.geogig.service;

import com.gitrnd.gdsbuilder.geogig.type.GeogigFeatureDiff;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

public interface GeogigFeatureService {

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param path
	 * @param oldIndex
	 * @param newIndex
	 * @return
	 */
	GeogigFeatureDiff featureDiff(DTGeoserverManager geoserverManager, String repoName, String path, int oldIndex,
			int newIndex);

}
