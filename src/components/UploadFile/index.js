import React from 'react'

const FileUpload = ({uploadValue, handleUpload}) => (
    <div>
        <progress value={uploadValue} max='100'></progress>
        <br />
        <input type='file' onChange={ev => handleUpload(ev)} />
    </div>
)


export default FileUpload