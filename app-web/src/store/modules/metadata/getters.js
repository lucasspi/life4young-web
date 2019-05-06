
export default {
  getMetadata: (state) => (model, key) => {
    if (model && model.hasOwnProperty('metadata') && Array.isArray(model.metadata)) {
      let metadataIndex = model.metadata.findIndex((metadata, idx, arr) => metadata.key === key);
      if (metadataIndex !== -1) {
        return model.metadata[metadataIndex]
      }
    }
    return null
  },
  getPicture: (state) => (model, width) => {
    if (model && model.hasOwnProperty('metadata') && Array.isArray(model.metadata)) {
      let metadataIndex = model.metadata.findIndex((metadata, idx, arr) => metadata.key.indexOf(`picture_${width}x`) !== -1);
      if (metadataIndex !== -1) {
        return model.metadata[metadataIndex]
      }
    }
    return null;
  },
  getMetadataImage: (state) => (model, key) => {
    let metadatas = model.hasOwnProperty('metadata_images') && Array.isArray(model.metadata_images) ? model.metadata_images : model.metadata;
    if (metadatas && Array.isArray(metadatas)) {
      let metadataIndex = metadatas.findIndex((metadata) => metadata.key === key);
      if (metadataIndex !== -1) {
        return metadatas[metadataIndex]
      }
    }
    return null;
  },
  getMetadataHtml: (state) => (model, key) => {
    if (model && model.hasOwnProperty('metadata') && Array.isArray(model.metadata)) {
      let metadataIndex = model.metadata.findIndex((metadata, idx, arr) => metadata.key === key);
      if (metadataIndex !== -1) {
        const metadata = model.metadata[metadataIndex];
        if (metadata) {
          const tmp = document.createElement("div");
          tmp.innerHTML = metadata.value;
          const metadataValueText = tmp.textContent || tmp.innerText || "";
          if (metadataValueText.trim()) {
            return model.metadata[metadataIndex]
          }
        }
      }
    }
    return null
  }
}
