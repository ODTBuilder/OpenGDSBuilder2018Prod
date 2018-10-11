package com.gitrnd.gdsbuilder.geoserver.converter.data;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

/**
 * {
		"layers":{
			"geoserver30":{
				"admin":[
					"geo_shp_37712012_A0010000_MULTIPOLYGON",
					"geo_shp_37712012_A0020000_MULTILINESTRING",
					"geo_shp_37712012_A0070000_MULTIPOLYGON",
					"geo_shp_37712012_B0010000_MULTIPOLYGON",
					"geo_shp_37712012_B0020000_MULTILINESTRING",
					"geo_shp_37712012_F0010000_MULTILINESTRING",
					"geo_shp_37712012_H0010000_MULTILINESTRING"
				],
				"shp":[
					"a0010000",
					"a0020000",
					"a0070000",
					"b0010000",
					"b0020000",
					"f0010000",
					"h0010000"
					]
				},
			"geoserver42":{
				"shp_workspace1":[
					"a0010000",
					"a0020000",
					"a0070000",
					"b0010000",
					"b0020000",
					"f0010000",
					"h0010000"
					]
				}
			}
	}
 * @Description 
 * @author SG.Lee
 * @Date 2018. 9. 28. 오후 5:25:38
 * */
public class GeoFileConvertInfo {
	private static final int BUFFER_SIZE = 4096;
	
	
	private final static String SERVICE = "WMS";
	private final static String REQUEST = "GetFeature";
	private final static String VERSION = "1.0.0";
	private final static String OUTPUTFORMAT = "SHAPE-ZIP";
	
	private final String serverURL;
	private final String workspace;
	private List<String> layerNames;
	private final String outputFolderPath;
	private final long categoryIdx;
	
	public GeoFileConvertInfo(String serverURL, String workspace, List<String> layerNames, long categoryIdx, String outputFolderPath){
		if(serverURL.isEmpty()||workspace.isEmpty()||layerNames==null||outputFolderPath.isEmpty()){
			throw new IllegalArgumentException("필수파라미터 입력안됨");
		}
		this.serverURL = serverURL;
		this.workspace = workspace;
		this.layerNames = layerNames;
		this.outputFolderPath = outputFolderPath;
		this.categoryIdx = categoryIdx;
	}
	

	public long getCategoryIdx() {
		return categoryIdx;
	}


	public String getWorkspace() {
		return workspace;
	}

	public String getServerURL() {
		return serverURL;
	}

	public List<String> getLayerNames() {
		return layerNames;
	}

	public void setLayerNames(List<String> layerNames) {
		this.layerNames = layerNames;
	}

	public String getOutputFolderPath() {
		return outputFolderPath;
	}


	public void start(){
		if(layerNames!=null){
			for(String layerName : layerNames){
				StringBuffer urlBuffer = new StringBuffer();
				urlBuffer.append(serverURL);
				urlBuffer.append("/"+workspace+"/ows?");
				urlBuffer.append("service="+ SERVICE);
				urlBuffer.append("&");
				urlBuffer.append("version="+ VERSION);
				urlBuffer.append("&");
				urlBuffer.append("request="+ REQUEST);
				urlBuffer.append("&");
				urlBuffer.append("typeName="+ workspace+":"+layerName);
				urlBuffer.append("&");
				urlBuffer.append("outputFormat="+ OUTPUTFORMAT);
				try {
					this.downloadFile(urlBuffer.toString(), outputFolderPath);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					System.err.println(layerName+ " 레이어 다운로드 에러");
				}
			}
		}else{
			throw new NullPointerException("레이어 리스트 NULL");
		}
	}
	
	 /**
     * Downloads a file from a URL
     * @param fileURL HTTP URL of the file to be downloaded
     * @param saveDir path of the directory to save the file
     * @throws IOException
     */
    private void downloadFile(String fileURL, String saveDir)
            throws IOException {
        URL url = new URL(fileURL);
        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        int responseCode = httpConn.getResponseCode();
 
        // always check HTTP response code first
        if (responseCode == HttpURLConnection.HTTP_OK) {
            String fileName = "";
            String disposition = httpConn.getHeaderField("Content-Disposition");
            String contentType = httpConn.getContentType();
            int contentLength = httpConn.getContentLength();
 
            if (disposition != null) {
                // extracts file name from header field
                int index = disposition.indexOf("filename=");
                if (index > 0) {
                    fileName = disposition.substring(index + 10,
                            disposition.length() - 1);
                }
            } else {
                // extracts file name from URL
                fileName = fileURL.substring(fileURL.lastIndexOf("/") + 1,
                        fileURL.length());
            }
 
            System.out.println("Content-Type = " + contentType);
            System.out.println("Content-Disposition = " + disposition);
            System.out.println("Content-Length = " + contentLength);
            System.out.println("fileName = " + fileName);
 
            // opens input stream from the HTTP connection
            InputStream inputStream = httpConn.getInputStream();
            String saveFilePath = saveDir + File.separator + fileName;
             
            // opens an output stream to save into file
            FileOutputStream outputStream = new FileOutputStream(saveFilePath);
 
            int bytesRead = -1;
            byte[] buffer = new byte[BUFFER_SIZE];
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
 
            outputStream.close();
            inputStream.close();
 
            System.out.println("File downloaded");
        } else {
            System.out.println("No file to download. Server replied HTTP code: " + responseCode);
        }
        httpConn.disconnect();
    }
}
