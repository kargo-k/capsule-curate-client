import React from 'react';
import { connect } from 'react-redux';
import { createItem } from '../actions';

const mapDispatchToProps = dispatch => {
  return { createItem: (payload) => dispatch(createItem(payload)) }
}

const mapStateToProps = state => {
  return { show_capsule: state.show_capsule }
}

const UploadItemForm = props => {

  const cloudName = process.env.REACT_APP_CLOUD_NAME
  const unsignedUploadPreset = process.env.REACT_APP_CLOUD_PRESET

  const handleSubmit = e => {
    e.preventDefault()
    // debugger
    let item_name = e.target.item_name.value
    let item_brand = e.target.item_brand.value
    let item_description = e.target.item_description.value
    let item_category2 = e.target.item_category2.value
    let item_category = e.target.item_category.value
    debugger
    let files = e.target.fileUp.files
    let image
    if (e.target.item_URL.value !== "") {
      // if the URL of the image is added
      debugger
      image = e.target.item_URL.value
    } else if (files !== []) {
      // if a file is selected for uploading
      console.log('Uploading file...', item_name, files, '...');
      // image = uploadFile(files[0])
    }

    let payload = {
      item: {
        name: item_name,
        brand: item_brand,
        description: item_description,
        category: item_category,
        category2: item_category2,
        capsule_id: props.show_capsule.id,
        image: image
      }
    }
    props.createItem(payload)

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
        // should add item to capsule's item container in the current view
        document.getElementById('items-container').appendChild(img)

        return url
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
        <select name='item_category2' defaultValue='Select a Category'>
            <option disabled>Select a Category </option>
            <option value="top">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="one piece">One Pieces</option>
            <option value="outerwear">Outwear</option>
          </select>
        </label>

        <label>Subcategory:
        <select name='item_category' defaultValue='Select a Subcategory'>
            <option disabled>Select a Subcategory </option>
            <option value="denim">Denim</option>
            <option value="pants">Pants</option>
            <option value="shorts">Shorts</option>
            <option value="tee">Tees</option>
            <option value="top">Shirt/Blouse</option>
            <option value="sweater">Sweaters</option>
            <option value="dress">Dresses</option>
            <option value="romper">Rompers</option>
            <option value="one piece">One Pieces</option>
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

    </div >
  )

}

export default connect(mapStateToProps, mapDispatchToProps)(UploadItemForm);