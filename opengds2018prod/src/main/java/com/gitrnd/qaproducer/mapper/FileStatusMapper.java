package com.gitrnd.qaproducer.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.gitrnd.qaproducer.domain.FileStatus;

@Mapper
public interface FileStatusMapper {
	FileStatus retrieveFileStatusById(int fid);

	void createFileStatus(FileStatus fileStatus);

	void updateFileStatus(FileStatus fileStatus);
	
	int deleteFileStatus(FileStatus fs);
}
