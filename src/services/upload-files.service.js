import https from "../http-common";
import authHeader from "./auth-header";

class UploadFilesService {
  upload(file,createdBy,onUploadProgress) {
    let formData = new FormData()
    formData.append("file",file);
    formData.append("createdBy",createdBy)
    console.log(file);
    let headers = authHeader();
    headers['Content-Type'] = "multipart/form-data"
    //headers.append(onUploadProgress);
    return https.post("api/excel/upload", formData, headers);
  }
  getFiles(entity) {
    let headers = authHeader();
    headers.responseType = 'blob'
    return new Promise((resolve,reject) => {
      https.get(`api/excel/download/${entity}`,headers)
        .then(response => {
          console.log(response);
          let blob = new Blob([response.data])
          let fileName = `${entity}.xlsx`
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          a.click();
          console.log(a)
          resolve()
        },error => {
          console.log(error)
          reject(error)
        }
      );
    })
  }
}

export default new UploadFilesService();