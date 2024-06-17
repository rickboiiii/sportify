import axios from "axios";
import {Upload} from "@/components/Upload/UploadStyled";


export default function UploadComponent({id, upload_url, className, stateChanger}) {

    const onClick = (e) => {
        document.getElementById("imgData").click();
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const onChange = (e) => {
      let url = upload_url;
      let file = e.target.files[0];
      uploadFile(url, file);
    };

    const uploadFile = async (url, file) => {
        let formData = {
            "id": id,
            "picture_data": await toBase64(file),
            "picture_name": file.name
        }
        axios.put(url, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            stateChanger(formData.picture_data);
            fnSuccess(response);
        }).catch((error) => {
            fnFail(error);
        });
    };
    const fnSuccess = (response) => {
        console.log(response)
      //Add success handling
    };

    const fnFail = (error) => {
        console.log(error)
      //Add failed handling
    };

    return (
        <Upload className={className}>
            <input type="file" name="img_data" id="imgData" onChange={onChange} accept="image/" hidden />
            <i className="fas fa-upload" id="uploadImage" onClick={onClick}></i>
        </Upload>
    );
}