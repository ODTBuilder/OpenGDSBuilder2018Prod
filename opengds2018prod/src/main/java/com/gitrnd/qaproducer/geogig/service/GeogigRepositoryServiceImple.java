/**
 * 
 */
package com.gitrnd.qaproducer.geogig.service;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geogig.GeogigWebReader;
import com.gitrnd.gdsbuilder.geogig.type.GeogigPull;
import com.gitrnd.gdsbuilder.geogig.type.GeogigPush;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRemoteRepository;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRemoteRepository.Ping;

/**
 * @author GIT
 *
 */
@Service
public class GeogigRepositoryServiceImple implements GeogigRepositoryService {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.git.opengds.geogig.service.GeogigRepositoryService#listRemoteRepository()
	 */
	@Override
	public GeogigRemoteRepository listRemoteRepository(JSONObject param) {

		String repoName = (String) param.get("reooName");
		Boolean verbose = (Boolean) param.get("verbose");

		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		return reader.listRemoteRepository(repoName, verbose);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.git.opengds.geogig.service.GeogigRepositoryService#addRemoteRepository(
	 * org.json.simple.JSONObject)
	 */
	@Override
	public GeogigRemoteRepository addRemoteRepository(JSONObject param) {

		String repoName = (String) param.get("reooName");
		String remoteName = (String) param.get("remoteName");
		String remoteURL = (String) param.get("remoteURL");

		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
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
	 * @see
	 * com.git.opengds.geogig.service.GeogigRepositoryService#removeRemoteRepository
	 * (org.json.simple.JSONObject)
	 */
	@Override
	public GeogigRemoteRepository removeRemoteRepository(JSONObject param) {

		String repoName = (String) param.get("reooName");
		Boolean removeTrue = (Boolean) param.get("remove");
		String remoteName = (String) param.get("remoteName");

		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		return reader.removeRemoteRepository(repoName, remoteName, removeTrue);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.git.opengds.geogig.service.GeogigRepositoryService#pingRemoteRepository(
	 * org.json.simple.JSONObject)
	 */
	@Override
	public GeogigRemoteRepository pingRemoteRepository(JSONObject param) {

		String repoName = (String) param.get("reooName");
		String remoteName = (String) param.get("remoteName");

		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		return reader.pingRemoteRepository(repoName, remoteName);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.git.opengds.geogig.service.GeogigRepositoryService#pullRepository(org.
	 * json.simple.JSONObject)
	 */
	@Override
	public GeogigPull pullRepository(JSONObject param) {

		String repoName = (String) param.get("reooName");
		String transactionId = (String) param.get("transactionId");
		String remoteName = (String) param.get("remoteName");
		String branchName = (String) param.get("branchName");
		String remoteBranchName = (String) param.get("remoteBranchName");
		String authorName = (String) param.get("authorName");
		String authorEmail = (String) param.get("authorEmail");

		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		return reader.pullRepository(repoName, transactionId, remoteName, branchName, remoteBranchName, authorName,
				authorEmail);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.git.opengds.geogig.service.GeogigRepositoryService#pushRepository(org.
	 * json.simple.JSONObject)
	 */
	@Override
	public GeogigPush pushRepository(JSONObject param) {

		String repoName = (String) param.get("reooName");
		String remoteName = (String) param.get("remoteName");
		String branchName = (String) param.get("branchName");
		String remoteBranchName = (String) param.get("remoteBranchName");

		GeogigWebReader reader = new GeogigWebReader("http://localhost:9999/geoserver/geogig", "admin", "geoserver");
		return reader.pushRepository(repoName, remoteName, branchName, remoteBranchName);
	}
}
