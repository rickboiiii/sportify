from pydantic import BaseModel


class UploadPicture(BaseModel):
    id: int
    picture_data: str
    picture_name: str