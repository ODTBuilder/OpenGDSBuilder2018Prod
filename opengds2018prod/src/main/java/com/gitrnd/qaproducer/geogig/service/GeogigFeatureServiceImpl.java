package com.gitrnd.qaproducer.geogig.service;

import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.command.repository.FeatureDiff;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFeatureDiff;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

@Service("featureService")
public class GeogigFeatureServiceImpl implements GeogigFeatureService {

	@Override
	public GeogigFeatureDiff featureDiff(DTGeoserverManager geoserverManager, String repoName, String path,
			int oldIndex, int newIndex) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		String oldTreeish = "HEAD";
		String newTreeish = "HEAD";

		if (newIndex > 0) {
			newTreeish += "~" + newIndex;
		}
		oldTreeish += "~" + oldIndex;

		FeatureDiff featureDiff = new FeatureDiff();
		GeogigFeatureDiff geogigFeatureDiff = featureDiff.executeCommand(url, user, pw, repoName, path, oldTreeish,
				newTreeish);

		return geogigFeatureDiff;
	}

}
