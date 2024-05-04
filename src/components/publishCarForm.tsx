import React, { ChangeEvent, useState } from "react"
import {
  Button,
  Box,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material"
import { DataForm } from "../types/formTypes"
import { styled } from "@mui/material/styles"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { usePostPublishCarFormMutation } from "../store/api/carsApi"

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

const PublishCarForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [postCar] = usePostPublishCarFormMutation()
  const [screenshot, setScreenshot] = useState<string>("")
  const formInitialState: DataForm = {
    price: "",
    description: "",
  }
  const [form, setForm] = useState(formInitialState)

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target

    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const showError = (payload: string) => {
    setError(payload)
    setTimeout(() => {
      setError("")
    }, 6000)
  }

  const handleSubmit = () => {
    setIsLoading(true)

    const formData = new FormData()
    // ====== ITERATE FLATLIST ======
    // for (let i = 0; i < form.images.length; i++) {
    //   const image = form.images[i]

    //   // Add every image to formData
    //   formData.append("images", image)
    // }

    // formData.append("images", form.images[0])
    postCar(form).then(resp => {
      setIsLoading(false)
      try {
        if (resp?.data) {
          setScreenshot(resp.data.image)
        } else {
          console.log(resp.error?.data.message)
          showError(resp.error?.data.message)
        }
      } catch (err) {
        console.log("Error: ", err.error?.data.message)
        showError(resp.error?.data.message)
      }
      resetInputs()
    })
  }

  const resetInputs = () => {
    setForm(formInitialState)
  }

  const handleFileChange = (event: { target: { files: any } }) => {
    const files = event.target.files
    // Aquí puedes manejar los archivos que el usuario ha seleccionado
    console.log("Archivos seleccionados:", files)
    setForm(prevForm => ({
      ...prevForm,
      ["images"]: files,
    }))
  }

  return (
    <Box display="row">
      <Box display="flex" justifyContent="center">
        <form
          onSubmit={e => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <Box
            width="100%"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: "400px",
              //   maxWidth: "800px",
            }}
          >
            <Typography mt={5} mb={2} fontWeight="600" fontSize="18px">
              Formulario para publicar un carro
            </Typography>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={form.price}
              required
              onChange={e => handleInputChange(e)}
            />
            <TextField
              label="Descripción"
              name="description"
              multiline
              required
              rows={4}
              value={form.description}
              onChange={e => handleInputChange(e)}
            />
            <Button
              component="label"
              variant="outlined"
              role={undefined}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Subir fotos
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                multiple
              />
            </Button>
            <Button type="submit" variant="contained">
              Publicar auto
            </Button>
          </Box>
        </form>
      </Box>
      {isLoading ? (
        <Box mt={5} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {screenshot && (
            <Box mt={5}>
              <img
                style={{ width: "100%", height: "100%" }}
                src={`data:image/png;base64,${screenshot}`}
                alt="Captura de pantalla"
                // className={classes.image}
              />
            </Box>
          )}
        </>
      )}
      {error !== "" && (
        <Box my={3}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </Box>
  )
}

export default PublishCarForm
