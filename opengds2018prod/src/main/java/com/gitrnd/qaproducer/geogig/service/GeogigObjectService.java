/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import com.gitrnd.gdsbuilder.geogig.type.GeogigCat;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
public interface GeogigObjectService {

	GeogigCat catObject(DTGeoserverManager geoserverManager, String repoName, String objectid);

}
