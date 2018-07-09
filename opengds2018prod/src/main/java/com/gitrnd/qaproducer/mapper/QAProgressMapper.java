package com.gitrnd.qaproducer.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.gitrnd.qaproducer.domain.QAProgress;


@Mapper
public interface QAProgressMapper {

	public Integer insertQARequest(QAProgress progress);


}
