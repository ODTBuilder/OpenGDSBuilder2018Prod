/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.json.simple.JSONObject;

import com.gitrnd.gdsbuilder.geogig.type.GeogigBlame;

/**
 * @author GIT
 *
 */
public interface GeogigFeatureService {

	/**
	 * @param param
	 * @return GeogigBlame
	 */
	public GeogigBlame blameFeature(JSONObject param);

}
