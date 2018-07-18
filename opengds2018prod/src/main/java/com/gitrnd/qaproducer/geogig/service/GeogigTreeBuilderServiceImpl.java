/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.json.simple.JSONArray;
import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.GeogigWebReader;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
@Service("treeService")
public class GeogigTreeBuilderServiceImpl implements GeogigTreeBuilderService {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.gitrnd.qaproducer.geogig.service.GeogigTreeBuilderService#getWorkingTree(
	 * com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager, java.lang.String,
	 * java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public JSONArray getWorkingTree(DTGeoserverManager geoserverManager, String serverName, String repoName,
			String reference, String transactionId) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.getWorkingTree(serverName, repoName, reference, transactionId);
	}

}
