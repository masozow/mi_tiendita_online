const handleImageChange = (e, setImagePreview) => {
  const file = e.target.files[0];
  console.log("Archivo recibido en handleImageChange:", file);

  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log("Contenido leído por FileReader:", reader.result);
      setImagePreview(reader.result);
    };

    reader.onerror = (error) => {
      console.error("Error al leer el archivo:", error);
    };

    reader.readAsDataURL(file);
  } else {
    console.warn("No se seleccionó ningún archivo.");
  }
};

export default handleImageChange;
