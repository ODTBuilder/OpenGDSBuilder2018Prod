/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.json.simple.JSONObject;

import com.gitrnd.gdsbuilder.geogig.type.GeogigPull;
import com.gitrnd.gdsbuilder.geogig.type.GeogigPush;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRemoteRepository;

/**
 * @author GIT
 *
 */
public interface GeogigRepositoryService {

	/**
	 * @param param
	 * @return GeogigRemoteRepository
	 */
	public GeogigRemoteRepository listRemoteRepository(JSONObject param);

	/**
	 * @param param
	 * @return GeogigRemoteRepository
	 */
	public GeogigRemoteRepository addRemoteRepository(JSONObject param);

	/**
	 * @param param
	 * @return GeogigRemoteRepository
	 */
	public GeogigRemoteRepository removeRemoteRepository(JSONObject param);

	/**
	 * @param param
	 * @return GeogigRemoteRepository
	 */
	public GeogigRemoteRepository pingRemoteRepository(JSONObject param);

	/**
	 * @param param
	 * @return GeogigPull
	 */
	public GeogigPull pullRepository(JSONObject param);

	/**
	 * @param param
	 * @return GeogigPush
	 */
	public GeogigPush pushRepository(JSONObject param);

}
