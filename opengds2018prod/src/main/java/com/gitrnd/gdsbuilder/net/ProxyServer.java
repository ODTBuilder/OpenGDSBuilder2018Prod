package com.gitrnd.gdsbuilder.net;

import java.io.IOException;

import javax.servlet.ServletException;

/**
 * 프록시요청을 지원하는 클래스
 * 
 * @author SG.Lee
 * @since 2017. 5. 29. 오전 11:07:49
 */
public interface ProxyServer {
	/**
	 * 프록시서버에 대한 요청을 처리
	 * 
	 * @author SG.Lee
	 * @since 2017. 5. 29. 오전 11:07:54
	 * @throws ServletException {@link ServletException}
	 * @throws IOException      {@link IOException}
	 */
	public void requestProxyService() throws ServletException, IOException;
}
