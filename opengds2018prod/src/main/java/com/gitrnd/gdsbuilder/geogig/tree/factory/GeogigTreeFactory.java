/**
 * 
 */
package com.gitrnd.gdsbuilder.geogig.tree.factory;

import com.gitrnd.gdsbuilder.geogig.tree.GeogigRepositoryTree;
import com.gitrnd.gdsbuilder.geogig.tree.GeogigRepositoryTree.EnGeogigRepositoryTreeType;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList;

/**
 * @author GIT
 *
 */
public interface GeogigTreeFactory {

	/**
	 * type이 Server 타입일 경우에
	 * @param dtGeoManagers
	 * @param type
	 * @return
	 */
	public GeogigRepositoryTree createGeogigRepositoryTree(DTGeoserverManagerList dtGeoManagers, EnGeogigRepositoryTreeType type);
	
	/**
	 * Server type외
	 * @param dtGeoserver
	 * @param serverName
	 * @param type
	 * @param parent
	 * @param transactionId
	 * @return
	 */
	public GeogigRepositoryTree createGeogigRepositoryTree(DTGeoserverManager dtGeoserver, String serverName,
			EnGeogigRepositoryTreeType type, String parent, String transactionId);
}