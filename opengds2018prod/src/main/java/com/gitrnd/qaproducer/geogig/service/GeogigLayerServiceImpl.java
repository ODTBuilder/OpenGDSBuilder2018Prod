/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.command.repository.DiffRepository;
import com.gitrnd.gdsbuilder.geogig.command.repository.LogRepository;
import com.gitrnd.gdsbuilder.geogig.type.GeogigDiff;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositoryLog;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
@Service("layerService")
public class GeogigLayerServiceImpl implements GeogigLayerService {

	@Override
	public GeogigRepositoryLog logLayer(DTGeoserverManager geoserverManager, String repoName, String layerName) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		LogRepository logRepos = new LogRepository();
		GeogigRepositoryLog log = logRepos.executeCommand(url, user, pw, repoName, layerName);
		return log;
	}

	@Override
	public GeogigDiff diffLayer(DTGeoserverManager geoserverManager, String repoName, String oldObjectId,
			String newObjectId, String layerName) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		DiffRepository diffRepos = new DiffRepository();
		GeogigDiff diff = diffRepos.executeCommand(url, user, pw, repoName, oldObjectId, newObjectId, layerName);
		return diff;
	}
}
