package com.gitrnd.gdsbuilder.geogig.type;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.gitrnd.gdsbuilder.geogig.type.GeogigRepositoryLog.Commit.ChangeType;

@XmlRootElement(name = "response")
public class GeogigLayerSimpleLog {

	private String success;

	private String error;

	private List<SimpleCommit> simpleCommits;

	@XmlElement(name = "error")
	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	@XmlElement(name = "success")
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

		private String commitId;

		private String authorName;

		private String date;

		private String message;

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

		public String getDate() {
			return date;
		}

		public void setDate(String date) {
			this.date = date;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}
	}
}
