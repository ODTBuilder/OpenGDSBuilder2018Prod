/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import com.gitrnd.gdsbuilder.geogig.type.GeogigAdd;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCommit;
import com.gitrnd.gdsbuilder.geogig.type.GeogigDelete;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFetch;
import com.gitrnd.gdsbuilder.geogig.type.GeogigPull;
import com.gitrnd.gdsbuilder.geogig.type.GeogigPush;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRemoteRepository;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositoryInit;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.qaproducer.common.security.LoginUser;

/**
 * @author GIT
 *
 */
public interface GeogigRepositoryService {

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param transactionId
	 * @return
	 */
	GeogigAdd addRepository(DTGeoserverManager geoserverManager, String repoName, String transactionId);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param transactionId
	 * @param message
	 * @param loginUser
	 * @return
	 */
	GeogigCommit commitRepository(DTGeoserverManager geoserverManager, String repoName, String transactionId,
			String message, LoginUser loginUser);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param verbose
	 * @return
	 */
	GeogigRemoteRepository listRemoteRepository(DTGeoserverManager geoserverManager, String repoName, Boolean verbose);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param remoteName
	 * @param remoteURL
	 * @return
	 */
	GeogigRemoteRepository addRemoteRepository(DTGeoserverManager geoserverManager, String repoName, String remoteName,
			String remoteURL);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param remoteName
	 * @return
	 */
	GeogigRemoteRepository removeRemoteRepository(DTGeoserverManager geoserverManager, String repoName,
			String remoteName);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param remoteName
	 * @return
	 */
	GeogigRemoteRepository pingRemoteRepository(DTGeoserverManager geoserverManager, String repoName,
			String remoteName);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param transactionId
	 * @param remoteName
	 * @param branchName
	 * @param remoteBranchName
	 * @param user
	 * @return
	 */
	GeogigPull pullRepository(DTGeoserverManager geoserverManager, String repoName, String transactionId,
			String remoteName, String branchName, String remoteBranchName, LoginUser user);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @param remoteName
	 * @param branchName
	 * @param remoteBranchName
	 * @return
	 */
	GeogigPush pushRepository(DTGeoserverManager geoserverManager, String repoName, String remoteName,
			String branchName, String remoteBranchName);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @return GeogigFetch
	 */
	GeogigFetch fetchRepository(DTGeoserverManager geoserverManager, String repoName);

	/**
	 * @param geoserverManager
	 * @param loginUser
	 * @param repoName
	 * @param dbHost
	 * @param dbPort
	 * @param dbName
	 * @param dbSchema
	 * @param dbUser
	 * @param dbPassword
	 * @return
	 */
	GeogigRepositoryInit initRepository(DTGeoserverManager geoserverManager, LoginUser loginUser, String repoName,
			String dbHost, String dbPort, String dbName, String dbSchema, String dbUser, String dbPassword);

	/**
	 * @param geoserverManager
	 * @param repoName
	 * @return
	 */
	GeogigDelete deleteRepository(DTGeoserverManager geoserverManager, String repoName);

}
