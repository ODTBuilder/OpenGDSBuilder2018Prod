package com.gitrnd.qaproducer.geoserver.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.gitrnd.qaproducer.common.security.LoginUser;


public interface GeoserverLayerProxyService {
	public void requestWMSLayer(LoginUser userVO, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException;
	public void requestGetFeature(LoginUser userVO, HttpServletRequest request, HttpServletResponse response);
	public void requestGetFeatureInfo(LoginUser userVO, HttpServletRequest request, HttpServletResponse response);
	public void requestWMSGetLegendGraphic(LoginUser userVO, HttpServletRequest request, HttpServletResponse response);
	public void requestGeoserverDataOutput(LoginUser userVO, HttpServletRequest request, HttpServletResponse response);
}
