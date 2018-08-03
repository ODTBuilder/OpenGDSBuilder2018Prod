/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.GeogigWebReader;
import com.gitrnd.gdsbuilder.geogig.type.GeogigPull;
import com.gitrnd.gdsbuilder.geogig.type.GeogigPush;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRemoteRepository;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRemoteRepository.Ping;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
@Service("reposService")
public class GeogigRepositoryServiceImple implements GeogigRepositoryService {

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gitrnd.qaproducer.geogig.service.GeogigRepositoryService#
	 * listRemoteRepository(com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager,
	 * java.lang.String, java.lang.Boolean)
	 */
	@Override
	public GeogigRemoteRepository listRemoteRepository(DTGeoserverManager geoserverManager, String repoName,
			Boolean verbose) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.listRemoteRepository(repoName, verbose);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gitrnd.qaproducer.geogig.service.GeogigRepositoryService#
	 * addRemoteRepository(com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager,
	 * java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public GeogigRemoteRepository addRemoteRepository(DTGeoserverManager geoserverManager, String repoName,
			String remoteName, String remoteURL) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		GeogigRemoteRepository remoteRepos = reader.addRemoteRepository(repoName, remoteName, remoteURL);
		String addSuccess = remoteRepos.getSuccess();
		if (addSuccess.equalsIgnoreCase("true")) {
			Ping ping = reader.pingRemoteRepository(repoName, remoteName).getPing();
			remoteRepos.setPing(ping);
		}
		return remoteRepos;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gitrnd.qaproducer.geogig.service.GeogigRepositoryService#
	 * removeRemoteRepository(com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager,
	 * java.lang.String, java.lang.Boolean, java.lang.String)
	 */
	@Override
	public GeogigRemoteRepository removeRemoteRepository(DTGeoserverManager geoserverManager, String repoName,
			String remoteName) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.removeRemoteRepository(repoName, remoteName);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gitrnd.qaproducer.geogig.service.GeogigRepositoryService#
	 * pingRemoteRepository(com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager,
	 * java.lang.String, java.lang.String)
	 */
	@Override
	public GeogigRemoteRepository pingRemoteRepository(DTGeoserverManager geoserverManager, String repoName,
			String remoteName) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.pingRemoteRepository(repoName, remoteName);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.gitrnd.qaproducer.geogig.service.GeogigRepositoryService#pullRepository(
	 * com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager, java.lang.String,
	 * java.lang.String, java.lang.String, java.lang.String, java.lang.String,
	 * java.lang.String, java.lang.String)
	 */
	@Override
	public GeogigPull pullRepository(DTGeoserverManager geoserverManager, String repoName, String transactionId,
			String remoteName, String branchName, String remoteBranchName, String authorName, String authorEmail) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.pullRepository(repoName, transactionId, remoteName, branchName, remoteBranchName, authorName,
				authorEmail);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.gitrnd.qaproducer.geogig.service.GeogigRepositoryService#pushRepository(
	 * com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager, java.lang.String,
	 * java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public GeogigPush pushRepository(DTGeoserverManager geoserverManager, String repoName, String remoteName,
			String branchName, String remoteBranchName) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		GeogigWebReader reader = new GeogigWebReader(url, user, pw);
		return reader.pushRepository(repoName, remoteName, branchName, remoteBranchName);
	}
}
