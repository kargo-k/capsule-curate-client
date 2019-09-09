import React from 'react';

const Upload = props => {

  const cloudName = 'kargostack';
  const unsignedUploadPreset = process.env.REACT_APP_CLOUD_PRESET

  const handleFiles = e => {
    let files = e.target.files;
    uploadFile(files[0])
  }

  const uploadFile = file => {
    // debugger
    let url = `https://api.cloudinary.com/v1_1/kargostack/image/upload`
    let xhr = new XMLHttpRequest()
    let fd = new FormData()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

    xhr.onreadystatechange = function (e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // file uplodaed successfully
        debugger
        let res = JSON.parse(xhr.responseText)
        let url = res.secure_url
        let tokens = url.split('/')
        tokens.splice(-2, 0, 'w_200,c_scale')
        let img = new Image()
        img.src = url
        img.alt = res.public_id
        document.getElementById('gallery').appendChild(img)
      }
    }

    fd.append('upload_preset', unsignedUploadPreset)
    fd.append('tags', 'browser_upload')
    fd.append('file', file)
    xhr.send(fd)

  }

  return (
    <div className='container'>
      <form>
        <h1>{process.env.REACT_APP_CLOUD_PRESET}</h1>
        <input type='file' id='fileUp' accept='image/*' onChange={handleFiles} />
      </form>

      <div id="gallery" />
    </div>
  )

}

export default Upload;