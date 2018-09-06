/**
 * 
 */
package com.gitrnd.gdsbuilder.geogig.tree;

import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.gitrnd.gdsbuilder.geogig.command.repository.FetchRepository;
import com.gitrnd.gdsbuilder.geogig.command.repository.branch.ListBranch;
import com.gitrnd.gdsbuilder.geogig.command.repository.remote.ListRemoteRepository;
import com.gitrnd.gdsbuilder.geogig.command.repository.remote.PingRemoteRepository;
import com.gitrnd.gdsbuilder.geogig.type.GeogigBranch;
import com.gitrnd.gdsbuilder.geogig.type.GeogigFetch;
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
		REMOTEREPOSITORY("remoteRepository"), REMOTEBRANCH("remoteBranch"), UNKNOWN(null);

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
			EnGeogigRemoteRepositoryTreeType type, String node, String local, boolean fetch) {
		this.build(dtGeoserver, serverName, type, node, local, fetch);
	}

	public GeogigRemoteRepositoryTree build(DTGeoserverManager dtGeoserver, String serverName,
			EnGeogigRemoteRepositoryTreeType type, String node, String local, boolean fetch) {

		// node : repos_postgress_master
		// local : geoserver32:fetchtest_postgres

		if (dtGeoserver == null || serverName == null || node == null) {
			JSONObject errorJSON = new JSONObject();
			errorJSON.put("id", 500);
			errorJSON.put("parent", "#");
			errorJSON.put("text", "요청이 잘못되었습니다.");
			errorJSON.put("type", "error");
			this.add(errorJSON);
			logger.warn("요청이 잘못되었습니다.");
		} else {
			if (dtGeoserver != null && type != null && node != null) {
				String baseURL = dtGeoserver.getRestURL() + "/geogig";
				String username = dtGeoserver.getUsername();
				String password = dtGeoserver.getPassword();

				String[] param = node.split(":");

				if (param.length > 0) {
					if (type == EnGeogigRemoteRepositoryTreeType.REMOTEREPOSITORY) {
						String repos = param[1];

						ListRemoteRepository listRemoteRepos = new ListRemoteRepository();
						GeogigRemoteRepository remoteRepos = listRemoteRepos.executeCommand(baseURL, username, password,
								repos, true);
						if (remoteRepos == null) {
							this.addDefaultRepo(repos);
						} else {
							List<Remote> remoteList = remoteRepos.getRemotes();
							if (remoteList == null) {
								this.addDefaultRepo(repos);
							} else {
								if (remoteList.size() < 0) {
									this.addDefaultRepo(repos);
								} else {
									ListBranch listBranch = new ListBranch();
									GeogigBranch branch = listBranch.executeCommand(baseURL, username, password, repos,
											true);
									for (Remote remote : remoteList) {
										String name = remote.getName();
										String url = remote.getUrl();

										// ping
										PingRemoteRepository pingRemote = new PingRemoteRepository();
										GeogigRemoteRepository pingRepos = pingRemote.executeCommand(baseURL, username,
												password, repos, name);
										String pingStr = pingRepos.getPing().getSuccess();

										boolean ping;
										if (pingStr.equalsIgnoreCase("true")) {
											ping = true;
										} else {
											ping = false;
										}
										String remoteId = node + ":" + name; // ex) repository:remoteRepository
										if (branch != null) {
											List<Branch> remoteBraches = branch.getRemoteBranchList();
											int branchSize = 0;
											for (Branch remoteBranch : remoteBraches) {
												if (name.equals(remoteBranch.getRemoteName())) {
													branchSize++;
												}
											}
											if (branchSize > 0) {
												this.addRemoteRepo(remoteId, name, url, true, ping);
											} else {
												this.addRemoteRepo(remoteId, name, url, false, ping);
											}
										} else {
											this.addRemoteRepo(remoteId, name, url, false, ping);
										}
									}
								}
							}
						}
					} else if (type == EnGeogigRemoteRepositoryTreeType.REMOTEBRANCH) {
						String remoteRepos = param[0];
						String[] localParams = local.split(":");
						String localRepos = localParams[1];

						ListBranch listBranch = new ListBranch();
						GeogigBranch branch = listBranch.executeCommand(baseURL, username, password, localRepos, true);
						List<Branch> remoteBraches = branch.getRemoteBranchList();
						for (Branch remoteBranch : remoteBraches) {
							if (remoteRepos.equals(remoteBranch.getRemoteName())) {
								String branchName = remoteBranch.getName();
								if (branch.equals("HEAD")) {
									continue;
								}
								String parent = local + ":" + node;
								String branchId = parent + ":" + branchName;
								this.addRemoteBranch(parent, branchId, branchName);
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
		}
		return this;

	}

	/**
	 * @param repo
	 */
	private void addDefaultRepo(String repo) {
		JSONObject repoJson = new JSONObject();
		repoJson.put("parent", "#");
		repoJson.put("id", repo);
		repoJson.put("text", "no remote repository");
		repoJson.put("type", "defalut");
		super.add(repoJson);
	}

	/**
	 * @param id
	 * @param text
	 * @param url
	 * @param children
	 * @param ping
	 */
	private void addRemoteRepo(String id, String text, String url, boolean children, boolean ping) {
		JSONObject remoteRepoJson = new JSONObject();
		remoteRepoJson.put("parent", "#");
		remoteRepoJson.put("id", id);
		remoteRepoJson.put("text", text);
		remoteRepoJson.put("url", url);
		remoteRepoJson.put("type", EnGeogigRemoteRepositoryTreeType.REMOTEREPOSITORY.getType());
		remoteRepoJson.put("children", children);
		remoteRepoJson.put("ping", ping);
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
		remoteBranchJson.put("type", EnGeogigRemoteRepositoryTreeType.REMOTEBRANCH.getType());
		remoteBranchJson.put("children", false);
		super.add(remoteBranchJson);
	}
}
