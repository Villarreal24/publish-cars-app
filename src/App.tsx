import "./App.css"

// === ROBOTO FONTS IMPORT ===
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import { Typography, Container, Box } from "@mui/material"
import PublishCarForm from "./components/publishCarForm"

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Typography color="#FFF" fontWeight="700" variant="h4">
          Dashboard
        </Typography>
      </header>

      <Container maxWidth="xl">
        <Box p={3} display="flex" justifyContent="center">
          <PublishCarForm />
        </Box>
      </Container>
    </div>
  )
}

export default App
