/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import com.gitrnd.gdsbuilder.geogig.type.GeogigTransaction;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
public interface GeogigTransactionService {

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @return
	 */
	public GeogigTransaction beginTransaction(DTGeoserverManager geoserverManager, String repoName);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param transactionId
	 * @return
	 */
	public GeogigTransaction endTransaction(DTGeoserverManager geoserverManager, String repoName, String transactionId);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param transactionId
	 * @return
	 */
	public GeogigTransaction cancelTransaction(DTGeoserverManager geoserverManager, String repoName,
			String transactionId);

}
