/**
 * 
 */
package com.gitrnd.gdsbuilder.geogig;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 * @author GIT
 *
 */
@SuppressWarnings("serial")
public class GeogigRepositoryTree extends JSONArray {

	/**
	 * @param server
	 * @param serverName
	 */
	public void bulid(String serverName) {
		JSONObject geoserver = new JSONObject(); // baseURL
		geoserver.put("id", serverName);
		geoserver.put("parent", "#");
		geoserver.put("text", serverName);
		geoserver.put("type", "geoserver");
		super.add(geoserver);
	}

	/**
	 * @param parent
	 * @param text
	 */
	public void addTree(String parent, String id, String text) {
		JSONObject repoJson = new JSONObject();
		repoJson.put("parent", parent);
		repoJson.put("id", id);
		repoJson.put("text", text);
		repoJson.put("type", "layer");
		super.add(repoJson);
	}

	/**
	 * @param parent
	 * @param text
	 * @param type
	 */
	public void addRepo(String parent, String id, String text, String type) {
		JSONObject repoJson = new JSONObject();
		repoJson.put("parent", parent);
		repoJson.put("id", id);
		repoJson.put("text", text);
		repoJson.put("repoType", type);
		repoJson.put("type", "repository");
		super.add(repoJson);
	}

	/**
	 * @param parent
	 * @param text
	 * @param status
	 */
	public void addBranch(String parent, String id, String text, String status) {
		JSONObject repoJson = new JSONObject();
		repoJson.put("parent", parent);
		repoJson.put("id", id);
		repoJson.put("text", text);
		repoJson.put("status", status);
		repoJson.put("type", "branch");
		super.add(repoJson);
	}
}
