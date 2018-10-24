package com.gitrnd.gdsbuilder.geogig.type;

import java.util.List;

public class GeogigRepositorySimpleLog {

	private String success;

	private String error;

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	private List<SimpleCommit> simpleCommits;

	public String getSuccess() {
		return success;
	}

	public void setSuccess(String success) {
		this.success = success;
	}

	public List<SimpleCommit> getSimpleCommits() {
		return simpleCommits;
	}

	public void setSimpleCommits(List<SimpleCommit> simpleCommits) {
		this.simpleCommits = simpleCommits;
	}

	public static class SimpleCommit {

		private int cIdx;

		private String commitId;

		private String authorName;

		private String timestamp;

		private String changeType;

		public int getcIdx() {
			return cIdx;
		}

		public void setcIdx(int cIdx) {
			this.cIdx = cIdx;
		}

		public String getCommitId() {
			return commitId;
		}

		public void setCommitId(String commitId) {
			this.commitId = commitId;
		}

		public String getAuthorName() {
			return authorName;
		}

		public void setAuthorName(String authorName) {
			this.authorName = authorName;
		}

		public String getTimestamp() {
			return timestamp;
		}

		public void setTimestamp(String timestamp) {
			this.timestamp = timestamp;
		}

		public String getChangeType() {
			return changeType;
		}

		public void setChangeType(String changeType) {
			this.changeType = changeType;
		}

	}
}
