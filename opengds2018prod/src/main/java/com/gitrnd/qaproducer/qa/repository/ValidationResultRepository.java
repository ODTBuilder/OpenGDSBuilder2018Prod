package com.gitrnd.qaproducer.qa.repository;

import java.util.ArrayList;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.gitrnd.qaproducer.qa.domain.ValidationResult;
import com.gitrnd.qaproducer.qa.mapper.ValidationResultMapper;

@Repository
public class ValidationResultRepository {

	@Autowired
	private ValidationResultMapper validationResultMapper;

	public LinkedList<ValidationResult> retrieveValidationResultByUidx(int idx) {
		return validationResultMapper.retrieveValidationResultByUidx(idx);
	}
	
	public ValidationResult retrieveValidationResultByPidx(int idx){
		return validationResultMapper.retrieveValidationResultByPidx(idx);
	}
	
	public boolean deleteValidationResult(ArrayList<ValidationResult> vrList) throws RuntimeException {
		boolean flag = false;
		
		int response = validationResultMapper.deleteValidationResult(vrList);
		if(response>0){
			flag = true;
		}
		return flag;
	}
}
