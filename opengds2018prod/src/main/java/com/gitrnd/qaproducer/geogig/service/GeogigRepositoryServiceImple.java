/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.command.repository.FetchRepository;
import com.gitrnd.gdsbuilder.geogig.command.repository.PullRepository;
import com.gitrnd.gdsbuilder.geogig.command.repository.PushRepository;
import com.gitrnd.gdsbuilder.geogig.command.repository.remote.AddRemoteRepository;
import com.gitrnd.gdsbuilder.geogig.command.repository.remote.ListRemoteRepository;
import com.gitrnd.gdsbuilder.geogig.command.repository.remote.PingRemoteRepository;
import com.gitrnd.gdsbuilder.geogig.command.repository.remote.RemoveRemoteRepository;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFetch;
import com.gitrnd.gdsbuilder.geogig.type.GeogigPull;
import com.gitrnd.gdsbuilder.geogig.type.GeogigPush;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRemoteRepository;
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

		ListRemoteRepository list = new ListRemoteRepository();
		GeogigRemoteRepository remotes = list.executeCommand(url, user, pw, repoName, verbose);

		return remotes;
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

		AddRemoteRepository add = new AddRemoteRepository();
		GeogigRemoteRepository remotes = add.executeCommand(url, user, pw, repoName, remoteName, remoteURL);

		return remotes;
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

		RemoveRemoteRepository remove = new RemoveRemoteRepository();
		GeogigRemoteRepository remotes = remove.executeCommand(url, user, pw, repoName, remoteName);

		return remotes;
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

		PingRemoteRepository ping = new PingRemoteRepository();
		GeogigRemoteRepository remote = ping.executeCommand(url, user, pw, repoName, remoteName);

		return remote;
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

		PullRepository pull = new PullRepository();
		GeogigPull geogigPull = pull.executeCommand(url, user, pw, repoName, transactionId, remoteName, branchName,
				remoteBranchName, authorName, authorEmail);

		return geogigPull;
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

		PushRepository push = new PushRepository();
		GeogigPush geogigPush = push.executeCommand(url, user, pw, repoName, remoteName, branchName, remoteBranchName);

		return geogigPush;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.gitrnd.qaproducer.geogig.service.GeogigRepositoryService#fetchRepository(
	 * com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager, java.lang.String)
	 */
	@Override
	public GeogigFetch fetchRepository(DTGeoserverManager geoserverManager, String repoName) {

		String url = geoserverManager.getRestURL();
		String user = geoserverManager.getUsername();
		String pw = geoserverManager.getPassword();

		FetchRepository fetch = new FetchRepository();
		GeogigFetch geogigFetch = fetch.executeCommand(url, user, pw, repoName);

		return geogigFetch;
	}
}
