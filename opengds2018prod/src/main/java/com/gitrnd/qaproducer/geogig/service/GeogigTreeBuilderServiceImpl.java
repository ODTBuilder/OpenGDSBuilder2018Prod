/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import java.util.Iterator;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.tree.GeogigRepositoryTree;
import com.gitrnd.gdsbuilder.geogig.tree.GeogigRepositoryTree.EnGeogigRepositoryTreeType;
import com.gitrnd.gdsbuilder.geogig.tree.factory.impl.GeogigTreeFactoryImpl;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList;

/**
 * @author GIT
 *
 */
@Service("treeService")
public class GeogigTreeBuilderServiceImpl implements GeogigTreeBuilderService {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.gitrnd.qaproducer.geogig.service.GeogigTreeBuilderService#getWorkingTree(
	 * com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager, java.lang.String,
	 * java.lang.String, java.lang.String, java.lang.String)
	 */
	/*@Override
	public JSONArray getWorkingTree(DTGeoserverManager geoserverManager, String serverName, String repoName,
			String reference, String transactionId) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.getWorkingTree(serverName, repoName, reference, transactionId);
	}*/
	
	public GeogigRepositoryTree getWorkingTree(DTGeoserverManagerList dtGeoservers, String serverName,
			EnGeogigRepositoryTreeType type, String parent, String transactionId) {
		if(type==EnGeogigRepositoryTreeType.SERVER) {
			return new GeogigTreeFactoryImpl().createGeogigRepositoryTree(dtGeoservers, type);
		}else {
			if(dtGeoservers!=null) {
				DTGeoserverManager dtGeoManager = null;
				Iterator<String> keys = dtGeoservers.keySet().iterator();
				while (keys.hasNext()) {
					String key = (String) keys.next();
					if (key.equals(serverName)) {
						dtGeoManager = dtGeoservers.get(key);
					}
					break;
				}
				return new GeogigTreeFactoryImpl().createGeogigRepositoryTree(dtGeoManager, serverName, type, parent, transactionId);
			}else {
				JSONArray result = new JSONArray();
				JSONObject errorJSON = new JSONObject();
				errorJSON.put("id", 500);
				errorJSON.put("parent", "#");
				errorJSON.put("text", "잘못된 요청입니다");
				errorJSON.put("type", "error");

				result.add(errorJSON);
				logger.warn("잘못된 요청입니다.");
				return (GeogigRepositoryTree) result;
			}
		}
	}
}
