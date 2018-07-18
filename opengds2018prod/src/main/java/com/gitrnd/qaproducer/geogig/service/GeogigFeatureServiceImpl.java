/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.GeogigWebReader;
import com.gitrnd.gdsbuilder.geogig.type.GeogigBlame;

/**
 * @author GIT
 *
 */
@Service
public class GeogigFeatureServiceImpl implements GeogigFeatureService {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.git.opengds.geogig.service.GeogigFeatureService#blameFeature(org.json.
	 * simple.JSONObject)
	 */
	@Override
	public GeogigBlame blameFeature(JSONObject param) {

		String serverName = (String) param.get("serverName");
		String repoName = (String) param.get("repoName");
		String path = (String) param.get("path");
		String commit = (String) param.get("commit");

		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		return reader.blameFeature(repoName, path, commit);
	}

}
