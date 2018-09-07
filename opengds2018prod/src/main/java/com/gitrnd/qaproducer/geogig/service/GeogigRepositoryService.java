/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import com.gitrnd.gdsbuilder.geogig.type.GeogigAdd;
import com.gitrnd.gdsbuilder.geogig.type.GeogigCommit;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFetch;
import com.gitrnd.gdsbuilder.geogig.type.GeogigPull;
import com.gitrnd.gdsbuilder.geogig.type.GeogigPush;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRemoteRepository;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

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
	 * @param authorName
	 * @param authorEmail
	 * @return
	 */
	GeogigCommit commitRepository(DTGeoserverManager geoserverManager, String repoName, String transactionId,
			String message, String authorName, String authorEmail);

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
	 * @param authorName
	 * @param authorEmail
	 * @return
	 */
	GeogigPull pullRepository(DTGeoserverManager geoserverManager, String repoName, String transactionId,
			String remoteName, String branchName, String remoteBranchName, String authorName, String authorEmail);

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

}
