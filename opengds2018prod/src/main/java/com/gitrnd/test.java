package com.gitrnd;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.geotools.data.simple.SimpleFeatureCollection;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.gitrnd.gdsbuilder.fileread.shp.SHPFileWriter;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverManager;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverPublisher;
import com.gitrnd.gdsbuilder.geoserver.DTGeoserverReader;
import com.gitrnd.gdsbuilder.parse.impl.DataConvertorImpl;
import com.gitrnd.qaproducer.geoserver.service.GeoserverService;

public class test {

	
	@Autowired
	@Qualifier("geoService")
	private GeoserverService geoserverService;
	
	
	private static String workspace = "test";
	private static String layerName = "gis_osm_buildings2";
	private static String epsg = "EPSG:4326";
	
	public static void main(String[] args) throws IOException {
		
		DTGeoserverManager dtGeoManager = new DTGeoserverManager("http://175.116.181.30:9999/geoserver", "admin", "geoserver");
		DTGeoserverReader dtReader = dtGeoManager.getReader();
		DTGeoserverPublisher dtPublisher = dtGeoManager.getPublisher();
		                                                                                                                                                                                                            
		
		//파일 저장 임시경로
		long time = System.currentTimeMillis();

		SimpleDateFormat dayTime = new SimpleDateFormat("yyMMdd_HHmmss");
		String cTimeStr = dayTime.format(new Date(time));

		// temp file 적용 시작
		// Windows Temp기본 경로 : C:\Users\GIT\AppData\Local\Temp\
		String defaultTempPath = System.getProperty("java.io.tmpdir") + "geodt_upload";
		if (!new File(defaultTempPath).exists()) {
			new File(defaultTempPath).mkdirs();
		}
		
		
		Path tmpBasedir = Files.createTempDirectory(Paths.get(defaultTempPath), "upload_temp_");
		
		
		
		//레이어 중복체크
		//중복이 아닐때
		if (!dtReader.existsLayer(workspace, layerName, true)) {
			// TODO Auto-generated method stub
			JSONParser parser = new JSONParser();
			 
			try {
				Object obj = parser.parse(new FileReader("C:\\Users\\i\\Documents\\네이트온 받은 파일\\layerGeoJson.txt"));
				 
				JSONObject jsonObject = (JSONObject) obj;
				JSONObject attObject = (JSONObject) parser.parse("{\"osm_id\":\"String\",\"code\":\"Integer\",\"fclass\":\"String\",\"population\":\"Integer\",\"name\":\"String\"}");
				
				SimpleFeatureCollection simpleCollection = new DataConvertorImpl().geoJsonToSimpleFeatureCollecion(jsonObject,attObject);
				
				String savaPath = tmpBasedir+File.separator+layerName+".shp";
				
				SHPFileWriter.writeSHP(epsg, simpleCollection, savaPath);
				createZipFile(tmpBasedir.toString(), tmpBasedir.toString(), layerName+".zip");
				
		/*		
				SimpleFeatureIterator simpleFeatureIterator = simpleCollection.features();
		
				while (simpleFeatureIterator.hasNext()) {
					SimpleFeature simpleFeature = simpleFeatureIterator.next();
					List attList = simpleFeature.getAttributes();
					System.out.println("test");
					
				}*/
			}catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		}
		System.out.println("test");
	}
	
	/**
     * 디렉토리 및 파일을 압축한다.
     * @param path 압축할 디렉토리 및 파일
     * @param toPath 압축파일을 생성할 경로
     * @param fileName 압축파일의 이름
     */
    public static void createZipFile(String path, String toPath, String fileName) {
 
        File dir = new File(path);
        String[] list = dir.list();
        String _path;
 
        if (!dir.canRead() || !dir.canWrite())
            return;
 
        int len = list.length;
 
        if (path.charAt(path.length() - 1) != '/')
            _path = path + "/";
        else
            _path = path;
 
        try {
            ZipOutputStream zip_out = new ZipOutputStream(new BufferedOutputStream(new FileOutputStream(toPath+"/"+fileName), 2048));
 
            for (int i = 0; i < len; i++)
                zip_folder("",new File(_path + list[i]), zip_out);
 
            zip_out.close();
 
        } catch (FileNotFoundException e) {
//            Log.e("File not found", e.getMessage());
 
        } catch (IOException e) {
//            Log.e("IOException", e.getMessage());
        } finally {
 
 
        }
    }
 
    /**
     * ZipOutputStream를 넘겨 받아서 하나의 압축파일로 만든다.
     * @param parent 상위폴더명
     * @param file 압축할 파일
     * @param zout 압축전체스트림
     * @throws IOException
     */
    private static void zip_folder(String parent, File file, ZipOutputStream zout) throws IOException {
        byte[] data = new byte[2048];
        int read;
 
        if (file.isFile()) {
            ZipEntry entry = new ZipEntry(parent + file.getName());
            zout.putNextEntry(entry);
            BufferedInputStream instream = new BufferedInputStream(new FileInputStream(file));
 
            while ((read = instream.read(data, 0, 2048)) != -1)
                zout.write(data, 0, read);
 
            zout.flush();
            zout.closeEntry();
            instream.close();
        }
    }
}
