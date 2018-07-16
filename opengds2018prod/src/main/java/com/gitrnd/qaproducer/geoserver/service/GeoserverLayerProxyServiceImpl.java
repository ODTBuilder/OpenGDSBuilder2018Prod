/*
 *  GeoServer-Manager - Simple Manager Library for GeoServer
 *  
 *  Copyright (C) 2007,2011 GeoSolutions S.A.S.
 *  http://www.geo-solutions.it
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

package com.gitrnd.qaproducer.geoserver.service;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.gitrnd.gdsbuilder.geoserver.service.DTGeoserverServiceManager;
import com.gitrnd.gdsbuilder.geoserver.service.en.EnGeoserverService;
import com.gitrnd.gdsbuilder.geoserver.service.impl.DTGeoserverServiceManagerImpl;
import com.gitrnd.gdsbuilder.geoserver.service.wfs.WFSGetFeature;
import com.gitrnd.gdsbuilder.geoserver.service.wms.WMSGetFeatureInfo;
import com.gitrnd.gdsbuilder.geoserver.service.wms.WMSGetLegendGraphic;
import com.gitrnd.gdsbuilder.geoserver.service.wms.WMSGetMap;
import com.gitrnd.qaproducer.common.security.LoginUser;

/**
 * 프록시서버 요청에 대한 요청을 처리하는 클래스
 * 
 * @author SG.Lee
 * @Date 2017. 5. 12. 오전 2:08:04
 */
@Service("proService")
public class GeoserverLayerProxyServiceImpl implements GeoserverLayerProxyService {

	private static final Logger LOGGER = LoggerFactory.getLogger(GeoserverLayerProxyServiceImpl.class);
	
	@Override
	public void requestGeoserverDataOutput(LoginUser userVO, HttpServletRequest request, HttpServletResponse response) {
		String serviceType = "";

		serviceType = request.getParameter("serviceType");

		if (serviceType.toLowerCase().equals(EnGeoserverService.WFS.getStateName())) {
			this.requestGetFeature(userVO, request, response);
		} else if (serviceType.toLowerCase().equals(EnGeoserverService.WMS.getStateName())) {
			try {
				this.requestWMSLayer(userVO, request, response);
			} catch (ServletException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else
			LOGGER.error("다운로드 요청 실패");

		/*
		 * try { this.requestTestWMSLayer(request,response); } catch
		 * (ServletException e) { // TODO Auto-generated catch block
		 * e.printStackTrace(); } catch (IOException e) { // TODO Auto-generated
		 * catch block e.printStackTrace(); }
		 */
	}

	@Override
	public void requestWMSLayer(LoginUser userVO, HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		WMSGetMap wmsGetMap = this.createWMSGetMap(userVO, request);
		DTGeoserverServiceManager geoserverService = new DTGeoserverServiceManagerImpl(request, response);
		geoserverService.requestWMSGetMap(wmsGetMap);
	}

	private WMSGetMap createWMSGetMap(LoginUser userVO, HttpServletRequest request) {
//		String serverURL = this.URL + "/" + userVO.getId() + "/wms";
		String serverURL = "";
		String version = "";
		String format = "";
		String layers = "";
		String tiled = "";
		String transparent = "";
		String bgcolor = "";
		String crs = "";
		String bbox = "";
		int width = 0;
		int height = 0;
		String styles = "";
		String exceptions = "application/vnd.ogc.se_xml";
		String time = "";
		String sld = "";
		String sld_body = "";

		Enumeration paramNames = request.getParameterNames();
		while (paramNames.hasMoreElements()) {
			String key = paramNames.nextElement().toString();
			String value = request.getParameter(key);
			
			
			if (key.toLowerCase().equals("serverURL")) {
				serverURL = value;
			}else if (key.toLowerCase().equals("layers")) {
				layers = value;
			} else if (key.toLowerCase().equals("version")) {
				version = value;
			} else if (key.toLowerCase().equals("bbox")) {
				bbox = value;
			} else if (key.toLowerCase().equals("crs")) {
				crs = value;
			} else if (key.toLowerCase().equals("format")) {
				format = value;
			} else if (key.toLowerCase().equals("layers")) {
				layers = value;
			} else if (key.toLowerCase().equals("tiled")) {
				tiled = value;
			} else if (key.toLowerCase().equals("transparent")) {
				transparent = value;
			} else if (key.toLowerCase().equals("bgcolor")) {
				bgcolor = value;
			} else if (key.toLowerCase().equals("crs")) {
				crs = value;
			} else if (key.toLowerCase().equals("bbox")) {
				bbox = value;
			} else if (key.toLowerCase().equals("width")) {
				width = Integer.parseInt(value);
			} else if (key.toLowerCase().equals("height")) {
				height = Integer.parseInt(value);
			} else if (key.toLowerCase().equals("styles")) {
				styles = value;
			} else if (key.toLowerCase().equals("exceptions")) {
				exceptions = value;
			} else if (key.toLowerCase().equals("time")) {
				time = value;
			} else if (key.toLowerCase().equals("sld")) {
				sld = value;
			} else if (key.toLowerCase().equals("sld_body")) {
				sld_body = value;
			}
		}
		return new WMSGetMap(serverURL, version, format, layers, tiled, transparent, bgcolor, crs, bbox, width, height,
				styles, exceptions, time, sld, sld_body);
	}

	@Override
	public void requestGetFeature(LoginUser userVO, HttpServletRequest request, HttpServletResponse response) {
		// String urlParam = this.createGetFeatureInfoURL(request);
		WFSGetFeature wfsGetFeature = this.createWFSGetFeature(userVO, request);
		DTGeoserverServiceManager geoserverService = new DTGeoserverServiceManagerImpl(request, response);
		geoserverService.requestWFSGetFeature(wfsGetFeature);
	};

	@SuppressWarnings("unused")
	private WFSGetFeature createWFSGetFeature(LoginUser userVO, HttpServletRequest request) {
		String serverURL = "";
		String version = "";
		String typeName = "";
		int maxFeatures = 0;
		String bbox = "";
		String outputformat = "";
		String format_options = "";
		String featureID = "";

		Enumeration paramNames = request.getParameterNames();
		while (paramNames.hasMoreElements()) {
			String key = paramNames.nextElement().toString();
			String value = request.getParameter(key);

			
			if (key.equals("serverURL")) {
				serverURL = value;
			}else if (key.equals("version")) {
				version = value;
			} else if (key.equals("typeName")) {
				typeName = value;
			} else if (key.equals("bbox")) {
				bbox = value;
			} else if (key.equals("outputformat")) {
				outputformat = value;
			} else if (key.equals("maxFeatures")) {
				maxFeatures = Integer.parseInt(value);
			} else if (key.equals("format_options")) {
				format_options = value;
			} else if (key.equals("featureID")) {
				featureID = value;
			}
		}
		return new WFSGetFeature(serverURL, version, typeName, outputformat, maxFeatures, bbox, format_options,
				featureID);
	}

	@Override
	public void requestGetFeatureInfo(LoginUser userVO, HttpServletRequest request, HttpServletResponse response) {
		WMSGetFeatureInfo getFeatureInfo = this.getWMSGetFeatureInfo(userVO, request);
		DTGeoserverServiceManager geoserverService = new DTGeoserverServiceManagerImpl(request, response);
		geoserverService.requestWMSGetFeatureInfo(getFeatureInfo);
	}

	private WMSGetFeatureInfo getWMSGetFeatureInfo(LoginUser userVO, HttpServletRequest request) {
		String serverURL = "";
		String version = "1.0.0";
		String layers = "";
		String styles = "";
		String crs = "";
		String srs = "";
		String bbox = "";
		String format_options = "";
		int width = 0;
		int height = 0;
		String query_layers = "";
		String info_format = "application/json";
		int feature_count = 0;
		int x = 0;
		int y = 0;
		String exceptions = "application/vnd.ogc.se_xml";

		Enumeration paramNames = request.getParameterNames();
		while (paramNames.hasMoreElements()) {
			String key = paramNames.nextElement().toString();
			String value = request.getParameter(key);

			
			if (key.toLowerCase().equals("serverURL")) {
				serverURL = value;
			}else if (key.toLowerCase().equals("version")) {
				version = value;
			} else if (key.toLowerCase().equals("layers")) {
				layers = value;
			} else if (key.toLowerCase().equals("styles")) {
				styles = value;
			} else if (key.toLowerCase().equals("crs")) {
				crs = value;
			} else if (key.toLowerCase().equals("srs")) {
				srs = value;
			} else if (key.toLowerCase().equals("format_options")) {
				format_options = value;
			} 
			 else if (key.toLowerCase().equals("bbox")) {
				bbox = value;
			} else if (key.toLowerCase().equals("width")) {
				width = Integer.parseInt(value);
			} else if (key.toLowerCase().equals("height")) {
				height = Integer.parseInt(value);
			} else if (key.toLowerCase().equals("query_layers")) {
				query_layers = value;
			} else if (key.toLowerCase().equals("info_format")) {
				info_format = value;
			} else if (key.toLowerCase().equals("feature_count")) {
				feature_count = Integer.parseInt(value);
			} else if (key.toLowerCase().equals("x")) {
				x = Integer.parseInt(value);
			} else if (key.toLowerCase().equals("y")) {
				y = Integer.parseInt(value);
			} else if (key.toLowerCase().equals("exceptions")) {
				exceptions = value;
			}
		}
		return new WMSGetFeatureInfo(serverURL, version, layers, styles, srs, crs, bbox, width, height, query_layers,
				info_format, format_options, feature_count, x, y, exceptions);
	}
	
	
	@Override
	public void requestWMSGetLegendGraphic(LoginUser userVO, HttpServletRequest request, HttpServletResponse response) {
		WMSGetLegendGraphic getLegendGraphic = this.getWMSGetLegendGraphic(userVO, request);
		DTGeoserverServiceManager geoserverService = new DTGeoserverServiceManagerImpl(request, response);
		geoserverService.requestWMSGetLegendGraphic(getLegendGraphic);
	}

	private WMSGetLegendGraphic getWMSGetLegendGraphic(LoginUser userVO, HttpServletRequest request) {
		String serverURL = "";
		String version = "1.0.0";
		String format = "";
		String legend_options = "";
		String layer = "";
		int width = 0;
		int height = 0;
		int scale = 0;

		Enumeration paramNames = request.getParameterNames();
		while (paramNames.hasMoreElements()) {
			String key = paramNames.nextElement().toString();
			String value = request.getParameter(key);

			if (key.toLowerCase().equals("serverURL")) {
				serverURL = value;
			} else if (key.toLowerCase().equals("version")) {
				version = value;
			} else if (key.toLowerCase().equals("format")) {
				format = value;
			} else if (key.toLowerCase().equals("legend_options")) {
				legend_options = value;
			} else if (key.toLowerCase().equals("layer")) {
				layer = value;
			} else if (key.toLowerCase().equals("width")) {
				width = Integer.parseInt(value);
			} else if (key.toLowerCase().equals("height")) {
				height = Integer.parseInt(value);
			} else if (key.toLowerCase().equals("scale")) {
				scale = Integer.parseInt(value);
			}
		}
		return new WMSGetLegendGraphic(serverURL, version, format, width, height, layer, scale, legend_options);
	}
}
