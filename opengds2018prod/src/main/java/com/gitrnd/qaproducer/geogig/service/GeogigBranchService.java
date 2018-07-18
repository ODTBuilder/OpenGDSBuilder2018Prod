/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.json.simple.JSONObject;

import com.gitrnd.gdsbuilder.geogig.type.GeogigBranch;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCheckout;
import com.gitrnd.gdsbuilder.geogig.type.GeogigMerge;
import com.gitrnd.gdsbuilder.geogig.type.GeogigStatus;

/**
 * @author GIT
 *
 */
public interface GeogigBranchService {

	/**
	 * @param param
	 * @return GeogigCheckout
	 */
	public GeogigCheckout checkoutBranch(JSONObject param);

	/**
	 * @param param
	 * @return GeogigBranch
	 */
	public GeogigBranch createBranch(JSONObject param);

	/**
	 * @param param
	 * @return GeogigMerge
	 */
	public GeogigMerge mergeBranch(JSONObject param);

	/**
	 * @param param
	 * @return GeogigBranch
	 */
	public GeogigBranch listBranch(JSONObject param);

	/**
	 * @param param
	 * @return GeogigCheckout
	 */
	public GeogigCheckout resolveConflict(JSONObject param);

	/**
	 * @param param
	 * @return JSONObject
	 */
	public JSONObject statusBranch(JSONObject param);

}
