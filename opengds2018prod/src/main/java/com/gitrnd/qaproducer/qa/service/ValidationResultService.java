package com.gitrnd.qaproducer.qa.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gitrnd.qaproducer.filestatus.domain.FileStatus;
import com.gitrnd.qaproducer.filestatus.service.FileStatusService;
import com.gitrnd.qaproducer.qa.domain.ServerSideVO;
import com.gitrnd.qaproducer.qa.domain.ValidationResult;
import com.gitrnd.qaproducer.qa.repository.ValidationResultRepository;

@Service
@Transactional
public class ValidationResultService {

	private static final Logger LOGGER = LoggerFactory.getLogger(ValidationResultService.class);

	@Autowired
	private ValidationResultRepository validationResultRepository;

	@Autowired
	private FileStatusService fileStatusService;

	/**
	 * DataTable Server Side 요청 처리 Service
	 */
	@Transactional(readOnly = true)
	public JSONObject retrieveValidationResultByUidx(HashMap<String, Object> input, ServerSideVO serverSideVO, int idx) {
		// 반환할 데이터들
		JSONObject dataTable = new JSONObject();
		JSONArray rows = new JSONArray();
		
		int draw = serverSideVO.getDrawCount();
		int start = serverSideVO.getStartIndex();
		int length = serverSideVO.getDisplayLength();
		
		int count = validationResultRepository.countValidationResultByUidx(idx);
		rows = validationResultRepository.retrieveValidationResultByUidx(draw, start, length, idx);
		
		dataTable.put("draw", draw);
		dataTable.put("recordsTotal", count);
		dataTable.put("recordsFiltered", count);
		dataTable.put("data", rows);
		
		return dataTable;
	}

	/**
	 * tb_file 테이블과 tb_progress테이블이 조인 된 결과값에 대하여 인자값 pid에 일치하고 tb_file.fidx와
	 * tb_progress.fid가 일치하는 행을 반환한다.
	 * 
	 * @param idx
	 * @return com.gitrnd.qaproducer.domain.ValidationResult
	 * @Author hochul
	 * @Date 2018. 4. 10.
	 */
	@Transactional(readOnly = true)
	public ValidationResult retrieveValidationResultByPidx(int idx) {
		return validationResultRepository.retrieveValidationResultByPidx(idx);
	}

	/**
	 * 검수 작업 내용을 DB 테이블에서 삭제한다. 작업 내용을 삭제하기전 검수 원본 파일 이력 테이블에서 fid에 적합한 행을 삭제한 후 작업
	 * 내용을 삭제한다. 삭제할 작업 내용은 배열 형식으로 작업 내용 p_idx 데이터를 받아 삭제한다.
	 * 
	 * @param userId
	 * @param list
	 * @return
	 * @Author hochul
	 * @Date 2018. 4. 10.
	 */
	@Transactional
	public boolean deleteValidationResult(ArrayList<ValidationResult> vrList) {
		boolean flag = false;

		ArrayList<FileStatus> fsList = new ArrayList<FileStatus>();

		for (ValidationResult vr : vrList) {
			// fid값 검색
			ValidationResult result = validationResultRepository.retrieveValidationResultByPidx(vr.getPidx());

			FileStatus fs = new FileStatus();
			fs.setFid(result.getFidx());
			fs.setUidx(vr.getUidx());

			// fsList 배열에 추가
			fsList.add(fs);
		}

		try {
			// 검수 작업 내용 삭제
			flag = validationResultRepository.deleteValidationResult(vrList);
		} catch (RuntimeException e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
		}

		for (FileStatus temp : fsList) {
			// 검수 원본 파일 이력 테이블 삭제
			if (fileStatusService.deleteFileStatus(temp)) {
				LOGGER.info("fid({}) table delete success!", temp.getFid());
			} else {
				LOGGER.info("ERROR!: fid({}) table delete fail!", temp.getFid());
			}
		}

		return flag;
	}
}
