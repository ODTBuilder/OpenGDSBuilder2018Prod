package com.gitrnd.gdsbuilder.geogig;

import org.springframework.http.HttpStatus;

@SuppressWarnings("serial")
public class GeogigCommandException extends IllegalArgumentException {

	private HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

	public GeogigCommandException(String message, HttpStatus status) {
		super(message);
		this.status = status;
	}

	public HttpStatus getStatus() {	
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

}
