import React, { ChangeEvent, useState } from "react"
import { Button, Box, TextField, Typography } from "@mui/material"
import { FormData } from "../types/formTypes"
import { usePostPublishCarFormMutation } from "../store/api/carsApi"

const PublishCarForm = () => {
  const [postCar] = usePostPublishCarFormMutation()
  const [formData, setFormData] = useState<FormData>({
    price: "",
    description: "",
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    let finalValue = null

    if (name === "price") {
      finalValue = Number(value)
    } else {
      finalValue = value
    }

    setFormData(prevForm => ({
      ...prevForm,
      [name]: finalValue,
    }))
  }

  const handleSubmit = () => {
    // Aquí puedes manejar la lógica para enviar el formulario
    console.log("Enviar data:", formData)
    postCar(formData).then(resp => console.log(resp))
  }

  return (
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
          value={formData.price}
          required
          onChange={e => handleInputChange(e)}
        />
        <TextField
          label="Descripción"
          name="description"
          multiline
          required
          rows={4}
          value={formData.description}
          onChange={e => handleInputChange(e)}
        />
        <Button type="submit" variant="contained">
          Publicar
        </Button>
      </Box>
    </form>
  )
}

export default PublishCarForm
