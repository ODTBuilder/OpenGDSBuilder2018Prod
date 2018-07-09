package com.gitrnd.qaproducer.mapper;

import java.util.ArrayList;
import java.util.LinkedList;

import org.apache.ibatis.annotations.Mapper;

import com.gitrnd.qaproducer.domain.ValidationResult;

@Mapper
public interface ValidationResultMapper {

	LinkedList<ValidationResult> retrieveValidationResultByUidx(int idx);
	
	ValidationResult retrieveValidationResultByPidx(int idx);
	
	int deleteValidationResult(ArrayList<ValidationResult> vrList);
}
