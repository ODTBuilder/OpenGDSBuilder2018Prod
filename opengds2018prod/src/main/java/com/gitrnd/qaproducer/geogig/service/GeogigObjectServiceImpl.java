/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.command.object.CatObject;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCat;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
@Service("objectService")
public class GeogigObjectServiceImpl implements GeogigObjectService {

	@Override
	public GeogigCat catObject(DTGeoserverManager geoserverManager, String repoName, String objectid) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		CatObject catObj = new CatObject();
		GeogigCat cat = catObj.executeCommand(url, user, pw, repoName, objectid);

		return cat;
	}
}
