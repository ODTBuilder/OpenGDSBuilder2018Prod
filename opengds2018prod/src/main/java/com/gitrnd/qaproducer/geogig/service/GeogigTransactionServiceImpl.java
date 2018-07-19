/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.GeogigWebReader;
import com.gitrnd.gdsbuilder.geogig.type.GeogigTransaction;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
@Service("transactionService")
public class GeogigTransactionServiceImpl implements GeogigTransactionService {

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gitrnd.qaproducer.geogig.service.GeogigTransactionService#
	 * beginTransaction(com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager,
	 * java.lang.String)
	 */
	@Override
	public GeogigTransaction beginTransaction(DTGeoserverManager geoserverManager, String repoName) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.beginTransaction(repoName);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.gitrnd.qaproducer.geogig.service.GeogigTransactionService#endTransaction(
	 * com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager, java.lang.String,
	 * java.lang.String)
	 */
	@Override
	public GeogigTransaction endTransaction(DTGeoserverManager geoserverManager, String repoName,
			String transactionId) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.endTransaction(repoName, transactionId);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gitrnd.qaproducer.geogig.service.GeogigTransactionService#
	 * cancelTransaction(com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager,
	 * java.lang.String, java.lang.String)
	 */
	@Override
	public GeogigTransaction cancelTransaction(DTGeoserverManager geoserverManager, String repoName,
			String transactionId) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.cancelTransaction(repoName, transactionId);
	}

}
