package com.gitrnd.gdsbuilder.geoserver.data.tree.factory.impl;

import com.gitrnd.gdsbuilder.geoserver.data.DTGeoserverManagerList;
<<<<<<< HEAD
=======
import com.gitrnd.gdsbuilder.geoserver.data.tree.DTGeoserverTree;
import com.gitrnd.gdsbuilder.geoserver.data.tree.DTGeoserverTree.EnTreeType;
>>>>>>> 0d6024abe02e427b97abb1ba906a3fe62b7a02ef
import com.gitrnd.gdsbuilder.geoserver.data.tree.DTGeoserverTrees;
import com.gitrnd.gdsbuilder.geoserver.data.tree.factory.DTGeoserverTreeFactory;

public class DTGeoserverTreeFactoryImpl implements DTGeoserverTreeFactory {
<<<<<<< HEAD
=======
	public DTGeoserverTree createDTGeoserverTree(DTGeoserverManagerList dtGeoManagers, String parent, String serverName, EnTreeType type) {
		return new DTGeoserverTree(dtGeoManagers, parent, serverName, type);
	}
>>>>>>> 0d6024abe02e427b97abb1ba906a3fe62b7a02ef

	public DTGeoserverTrees createDTGeoserverTrees(DTGeoserverManagerList dtGeoManagers){
		return new DTGeoserverTrees(dtGeoManagers);
	}
}
