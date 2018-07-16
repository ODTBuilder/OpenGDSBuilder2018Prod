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

	private String server;

	/**
	 * @param server
	 * @param serverName
	 */
	public void bulid(String server, String serverName) {
		this.server = server;
		JSONObject geoserver = new JSONObject(); // baseURL
		geoserver.put("id", server);
		geoserver.put("parent", "#");
		geoserver.put("text", serverName);
		super.add(geoserver);
	}

	/**
	 * @param parent
	 * @param text
	 */
	public void add(String parent, String id, String text) {
		JSONObject repoJson = new JSONObject();
		repoJson.put("parent", parent);
		repoJson.put("id", id);
		repoJson.put("text", text);
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
		repoJson.put("type", type);
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
		super.add(repoJson);
	}
}
