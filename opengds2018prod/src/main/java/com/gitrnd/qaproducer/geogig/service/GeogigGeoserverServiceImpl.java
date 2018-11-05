/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.command.ResponseType;
import com.gitrnd.gdsbuilder.geogig.command.geoserver.GeoserverDataStore;
import com.gitrnd.gdsbuilder.geogig.command.geoserver.ListGeoserverDataStore;
import com.gitrnd.gdsbuilder.geogig.command.geoserver.ListGeoserverLayer;
import com.gitrnd.gdsbuilder.geogig.command.geoserver.ListGeoserverLayer.ListParam;
import com.gitrnd.gdsbuilder.geogig.command.geoserver.ListGeoserverWorkSpace;
import com.gitrnd.gdsbuilder.geogig.type.GeogigGeoserverDataStore;
import com.gitrnd.gdsbuilder.geogig.type.GeogigGeoserverDataStore.ConnectionParameters;
import com.gitrnd.gdsbuilder.geogig.type.GeogigGeoserverDataStore.Entry;
import com.gitrnd.gdsbuilder.geogig.type.GeogigGeoserverDataStoreList;
import com.gitrnd.gdsbuilder.geogig.type.GeogigGeoserverDataStoreList.DataStore;
import com.gitrnd.gdsbuilder.geogig.type.GeogigGeoserverWorkSpaceList;
import com.gitrnd.gdsbuilder.geogig.type.GeogigGeoserverWorkSpaceList.Workspace;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
@Service("test")
public class GeogigGeoserverServiceImpl implements GeogigGeoserverService {

	@Override
	public JSONObject getDataStoreList(DTGeoserverManager geoserverManager, String repoName, String branchName) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		JSONObject dsListObj = new JSONObject();

		// get workspaces
		ListGeoserverWorkSpace listGws = new ListGeoserverWorkSpace();
		GeogigGeoserverWorkSpaceList geogigGws = listGws.executeCommand(url, user, pw, ResponseType.XML.getType());
		List<Workspace> workspaces = geogigGws.getWorkspaces();
		for (Workspace workspace : workspaces) {
			String wrName = workspace.getName();
			// get datastores
			ListGeoserverDataStore listGds = new ListGeoserverDataStore();
			GeogigGeoserverDataStoreList geogigGdsList = listGds.executeCommand(url, user, pw, wrName,
					ResponseType.XML.getType());
			List<DataStore> dataStores = geogigGdsList.getDataStores();
			JSONArray dsArr = new JSONArray();
			String ws = null;
			for (DataStore dataStore : dataStores) {
				String dsName = dataStore.getName();
				GeoserverDataStore gds = new GeoserverDataStore();
				GeogigGeoserverDataStore geogigGds = gds.executeCommand(url, user, pw, wrName, dsName,
						ResponseType.XML.getType());
				String type = geogigGds.getType();

				// check geogig type
				if (type.equalsIgnoreCase("GeoGIG")) {
					ConnectionParameters connParam = geogigGds.getConnetParams();
					List<Entry> entryList = connParam.getEntryList();
					// check geogig ws
					boolean isWs = false;
					for (Entry entry : entryList) {
						String key = entry.getKey();
						String value = entry.getXmlValue();
						if (key.equalsIgnoreCase("geogig_repository")) {
							String repoValue = value.replace("geoserver://", "");
							if (repoValue.equalsIgnoreCase(repoName)) {
								ws = wrName;
								isWs = true;
							}
						}
					}
					// check geogig ds
					if (isWs) {
						for (Entry entry : entryList) {
							String key = entry.getKey();
							String value = entry.getXmlValue();
							if (key.equalsIgnoreCase("branch")) {
								if (value.equalsIgnoreCase(branchName)) {
									dsArr.add(dsName);
								}
							}
						}
					}
				}
			}
			dsListObj.put(ws, dsArr);
		}
		return dsListObj;
	}

	@Override
	public void publishGeogigLayer(DTGeoserverManager geoserverManager, String workspace, String datastore,
			String layer) {
		// TODO Auto-generated method stub

	}

	@Override
	public void listGeoserverLayer(DTGeoserverManager geoserverManager, String workspace, String datastore) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		ListGeoserverLayer list = new ListGeoserverLayer();
		list.executeCommand(url, user, pw, workspace, datastore, ResponseType.XML.getType(), ListParam.ALL.getType());

	}
}
