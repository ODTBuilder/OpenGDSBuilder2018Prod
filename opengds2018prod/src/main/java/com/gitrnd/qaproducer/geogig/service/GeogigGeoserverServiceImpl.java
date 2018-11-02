/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.command.geoserver.GeoserverDataStore;
import com.gitrnd.gdsbuilder.geogig.command.geoserver.ListGeoserverDataStore;
import com.gitrnd.gdsbuilder.geogig.command.geoserver.ListGeoserverWorkSpace;
import com.gitrnd.gdsbuilder.geogig.type.GeogigGeoserverDataStore;
import com.gitrnd.gdsbuilder.geogig.type.GeogigGeoserverDataStore.ConnectionParameters;
import com.gitrnd.gdsbuilder.geogig.type.GeogigGeoserverDataStore.Entry;
import com.gitrnd.gdsbuilder.geogig.type.GeogigGeoserverDataStores;
import com.gitrnd.gdsbuilder.geogig.type.GeogigGeoserverDataStores.DataStore;
import com.gitrnd.gdsbuilder.geogig.type.GeogigGeoserverWorkSpaces;
import com.gitrnd.gdsbuilder.geogig.type.GeogigGeoserverWorkSpaces.Workspace;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
@Service("test")
public class GeogigGeoserverServiceImpl implements GeogigGeoserverService {

	@Override
	public void getDataStoreList(DTGeoserverManager geoserverManager, String repoName, String branchName) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		List<String> wsList = new ArrayList<>();
		List<String> dsList = new ArrayList<>();

		// get workspaces
		ListGeoserverWorkSpace listGws = new ListGeoserverWorkSpace();
		GeogigGeoserverWorkSpaces geogigGws = listGws.executeCommand(url, user, pw, ".xml");
		List<Workspace> workspaces = geogigGws.getWorkspaces();
		for (Workspace workspace : workspaces) {
			String wrName = workspace.getName();
			// get datastores
			ListGeoserverDataStore listGds = new ListGeoserverDataStore();
			GeogigGeoserverDataStores geogigGdsList = listGds.executeCommand(url, user, pw, wrName, ".xml");
			List<DataStore> dataStores = geogigGdsList.getDataStores();
			for (DataStore dataStore : dataStores) {
				String dsName = dataStore.getName();
				GeoserverDataStore gds = new GeoserverDataStore();
				GeogigGeoserverDataStore geogigGds = gds.executeCommand(url, user, pw, wrName, dsName, ".xml");
				String type = geogigGds.getType();

				// check geogig type
				String ws = null;
				String ds = null;
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
								ws = repoValue;
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
									ds = value;
								}
							}
						}
					}
				}
				if (ws != null && ds != null) {
					wsList.add(ws);
					dsList.add(ds);
				}
			}
		}
		System.out.println("");
	}
}
