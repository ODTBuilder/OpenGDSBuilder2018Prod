/**
 * 
 */
package com.gitrnd.gdsbuilder.geogig.tree;

import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.gitrnd.gdsbuilder.geogig.command.repository.branch.ListBranch;
import com.gitrnd.gdsbuilder.geogig.command.repository.remote.ListRemoteRepository;
import com.gitrnd.gdsbuilder.geogig.type.GeogigBranch;
import com.gitrnd.gdsbuilder.geogig.type.GeogigBranch.Branch;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRemoteRepository;
import com.gitrnd.gdsbuilder.geogig.type.GeogigRemoteRepository.Remote;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;

/**
 * @author GIT
 *
 */
@SuppressWarnings("serial")
public class GeogigRemoteRepositoryTree extends JSONArray {
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	public enum EnGeogigRemoteRepositoryTreeType {
		REMOTE("remote"), REMOTEREPOSITORY("remooteRepository"), REMOTEBRANCH("remoteBanch"), UNKNOWN(null);

		String type;

		private EnGeogigRemoteRepositoryTreeType(String type) {
			this.type = type;
		}

		public static EnGeogigRemoteRepositoryTreeType getFromType(String type) {
			for (EnGeogigRemoteRepositoryTreeType tt : values()) {
				if (tt == UNKNOWN)
					continue;
				if (tt.type.equals(type))
					return tt;
			}
			return UNKNOWN;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}
	}

	public GeogigRemoteRepositoryTree(DTGeoserverManager dtGeoserver, String serverName,
			EnGeogigRemoteRepositoryTreeType type, String node) {
		this.build(dtGeoserver, serverName, type, node);
	}

	public GeogigRemoteRepositoryTree build(DTGeoserverManager dtGeoserver, String serverName,
			EnGeogigRemoteRepositoryTreeType type, String node) {

		String[] param = node.split(":"); // ex) serverName:repository

		if (dtGeoserver != null && type != null && param != null) {
			String baseURL = dtGeoserver.getRestURL() + "/geogig";
			String username = dtGeoserver.getUsername();
			String password = dtGeoserver.getPassword();

			if (type == EnGeogigRemoteRepositoryTreeType.REMOTE) {
				if (param.length > 0) {
					String repo = param[1];
					ListRemoteRepository listRemoteRepos = new ListRemoteRepository();
					GeogigRemoteRepository remoteRepos = listRemoteRepos.executeCommand(baseURL, username, password,
							repo, true);
					if (remoteRepos != null) {
						List<Remote> remoteList = remoteRepos.getRemotes();
						if (remoteList.size() > 0) {
							this.addRepo(repo, true);
						} else {
							this.addRepo(repo, false);
						}
					} else {
						this.addRepo(repo, false);
					}
				}
			} else if (type == EnGeogigRemoteRepositoryTreeType.REMOTEREPOSITORY) {
				if (param.length > 0) {
					String repo = param[1];
					ListRemoteRepository listRemoteRepos = new ListRemoteRepository();
					GeogigRemoteRepository remoteRepos = listRemoteRepos.executeCommand(baseURL, username, password,
							repo, true);
					List<Remote> remoteList = remoteRepos.getRemotes();
					ListBranch listBranch = new ListBranch();
					GeogigBranch branch = listBranch.executeCommand(baseURL, username, password, repo, true);
					for (Remote remote : remoteList) {
						String name = remote.getName();
						String url = remote.getUrl();
						String remoteId = node + ":" + name; // ex) server:repository:remoteRepository
						if (branch != null) {
							List<Branch> remoteBraches = branch.getRemoteBranchList();
							int branchSize = 0;
							for (Branch remoteBranch : remoteBraches) {
								if (name.equals(remoteBranch.getRemoteName())) {
									branchSize++;
								}
							}
							if (branchSize > 0) {
								this.addRemoteRepo(node, remoteId, name, url, true);
							} else {
								this.addRemoteRepo(node, remoteId, name, url, false);
							}
						} else {
							this.addRemoteRepo(node, remoteId, name, url, false);
						}
					}
				}
			} else if (type == EnGeogigRemoteRepositoryTreeType.REMOTEBRANCH) {
				if (param.length > 0) {
					String repo = param[1];
					String remoteRepo = param[2];
					ListBranch listBranch = new ListBranch();
					GeogigBranch branch = listBranch.executeCommand(baseURL, username, password, repo, true);
					List<Branch> remoteBraches = branch.getRemoteBranchList();
					for (Branch remoteBranch : remoteBraches) {
						if (remoteRepo.equals(remoteBranch.getRemoteName())) {
							String branchName = remoteBranch.getName();
							if (branch.equals("HEAD")) {
								continue;
							}
							String branchId = node + ":" + branchName;
							this.addRemoteBranch(node, branchId, branchName);
						}
					}
				}
			} else {
				JSONObject errorJSON = new JSONObject();
				errorJSON.put("id", 500);
				errorJSON.put("parent", "#");
				errorJSON.put("text", "요청이 잘못되었습니다.");
				errorJSON.put("type", "error");
				this.add(errorJSON);
				logger.warn("요청이 잘못되었습니다.");
			}
		} else {
			JSONObject errorJSON = new JSONObject();
			errorJSON.put("id", 500);
			errorJSON.put("parent", "#");
			errorJSON.put("text", "요청이 잘못되었습니다.");
			errorJSON.put("type", "error");
			this.add(errorJSON);
			logger.warn("요청이 잘못되었습니다.");
		}
		return this;
	}

	/**
	 * @param repo
	 * @param isTrue
	 */
	private void addRepo(String repo, boolean isTrue) {
		JSONObject repoJson = new JSONObject();
		repoJson.put("parent", "#");
		repoJson.put("id", repo);
		repoJson.put("text", repo);
		repoJson.put("type", "repository");
		repoJson.put("children", isTrue);
		super.add(repoJson);
	}

	/**
	 * @param parent
	 * @param id
	 * @param text
	 * @param url
	 * @param isTrue
	 */
	private void addRemoteRepo(String parent, String id, String text, String url, boolean isTrue) {
		JSONObject remoteRepoJson = new JSONObject();
		remoteRepoJson.put("parent", parent);
		remoteRepoJson.put("id", id);
		remoteRepoJson.put("text", text);
		remoteRepoJson.put("url", url);
		remoteRepoJson.put("type", "remoteRepository");
		remoteRepoJson.put("children", isTrue);
		super.add(remoteRepoJson);
	}

	/**
	 * @param parent
	 * @param id
	 * @param text
	 */
	private void addRemoteBranch(String parent, String id, String text) {
		JSONObject remoteBranchJson = new JSONObject();
		remoteBranchJson.put("parent", parent);
		remoteBranchJson.put("id", id);
		remoteBranchJson.put("text", text);
		remoteBranchJson.put("type", "remoteBranch");
		super.add(remoteBranchJson);
	}
}
