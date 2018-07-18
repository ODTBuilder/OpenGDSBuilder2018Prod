/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.json.simple.JSONObject;

import com.gitrnd.gdsbuilder.geogig.type.GeogigTransaction;

/**
 * @author GIT
 *
 */
public interface GeogigTransactionService {

	/**
	 * @param param
	 */
	public GeogigTransaction beginTransaction(JSONObject param);

	/**
	 * @param param
	 */
	public GeogigTransaction endTransaction(JSONObject param);

	/**
	 * @param param
	 */
	public GeogigTransaction cancelTransaction(JSONObject param);

}
