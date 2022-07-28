import { API } from './api';
import axiosInstance from '../services/axiosInstance';

const FileUpload = async (file, setLoading, setAlert, fileType) => {
  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percent = Math.floor((loaded * 100) / total);
      setLoading(percent);
    },
  };
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileType', fileType || 'user');

  try {
    const { data } = await axiosInstance.post(`${API.MEDIA_UPLOAD}`, formData, options, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    if (data?.status === 'success') {
      setLoading(0);
      return data?.data?.s3url;
    }
  } catch (err) {
    setLoading(0);
    setAlert('error', err?.response?.data?.message);
  }
  return null;
};

export default FileUpload;
