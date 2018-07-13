/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.GeogigWebReader;
import com.gitrnd.gdsbuilder.geogig.type.GeogigTransaction;

/**
 * @author GIT
 *
 */
@Service("transactionService")
public class GeogigTransactionServiceImpl implements GeogigTransactionService {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.git.opengds.geogig.service.GeogigTransactionService#beginTransaction(org.
	 * json.simple.JSONObject)
	 */
	@Override
	public GeogigTransaction beginTransaction(JSONObject param) {

		String repoName = (String) param.get("repoName");

		// tmp default
		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		GeogigTransaction transaction = reader.beginTransaction(repoName);
		return transaction;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.git.opengds.geogig.service.GeogigTransactionService#endTransaction(org.
	 * json.simple.JSONObject)
	 */
	@Override
	public GeogigTransaction endTransaction(JSONObject param) {

		String repoName = (String) param.get("repoName");
		String transactionId = (String) param.get("transactionId");

		// tmp default
		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		GeogigTransaction transaction = reader.endTransaction(repoName, transactionId);
		return transaction;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.git.opengds.geogig.service.GeogigTransactionService#cancleTransaction(org
	 * .json.simple.JSONObject)
	 */
	@Override
	public GeogigTransaction cancelTransaction(JSONObject param) {

		String repoName = (String) param.get("repoName");
		String transactionId = (String) param.get("transactionId");

		// tmp default
		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		GeogigTransaction transaction = reader.cancelTransaction(repoName, transactionId);
		return transaction;
	}
}
