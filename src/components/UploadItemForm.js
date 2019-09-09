import React from 'react';

const UploadItemForm = props => {

  const cloudName = process.env.REACT_APP_CLOUD_NAME
  const unsignedUploadPreset = process.env.REACT_APP_CLOUD_PRESET

  const handleSubmit = e => {
    e.preventDefault()
    // debugger
    let files = e.target.fileUp.files;
    let item_name = e.target.item_name.value
    console.log('Uploading file...', item_name, files, '...');
    // uploadFile(files[0])
  }

  const uploadFile = file => {
    // debugger
    let url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    let xhr = new XMLHttpRequest()
    let fd = new FormData()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // file uplodaed successfully
        debugger
        let res = JSON.parse(xhr.responseText)
        let url = res.secure_url
        let tokens = url.split('/')
        tokens.splice(-2, 0, 'c_fill,g_center,h_453,w_362')
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
      <form onSubmit={handleSubmit}>
        <h1>Add A New Item</h1>

        <label>Name:
          <input type='text' name='item_name' placeholder='Item Name' />
        </label>

        <label>Brand:
          <input type='text' name='item_brand' placeholder='Brand Name' />
        </label>

        <label>Description:
        <input type='text' name='item_description' placeholder='Description' />
        </label>

        <label>Category:
        <select name='item_category'>
            <option disabled defaultValue>Select a Category </option>
            <option value="top">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="one piece">One Pieces</option>
            <option value="outerwear">Outwear</option>
          </select>
        </label>

        <label>Subcategory:
        <select name='item_category2'>
            <option disabled defaultValue>Select a Subcategory </option>
            <option value="denim">Denim</option>
            <option value="pants">Pants</option>
            <option value="shorts">Shorts</option>
            <option value="tee">Tees</option>
            <option value="top">Shirt/Blouse</option>
            <option value="sweater">Sweaters</option>
          </select>
        </label>

        <label>Add Image URL
          <input type='text' name='item_URL' placeholder='Item Image URL' />
        </label>

        <label>Or, Upload an Image File
          <input type='file' id='fileUp' accept='image/*' />
        </label>

        <input type='submit' value="Add Item" className='btn' />
      </form>

      <div id="gallery" />
    </div >
  )

}

export default UploadItemForm;