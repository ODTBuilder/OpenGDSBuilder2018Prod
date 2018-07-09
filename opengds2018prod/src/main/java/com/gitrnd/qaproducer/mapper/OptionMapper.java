package com.gitrnd.qaproducer.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OptionMapper {
	public int updateVOption();
	public int deleteVOption();
	
}
