import { screen, render, waitFor } from "@testing-library/react"
import PublishCarForm from "./publishCarForm"
// import { renderWithProviders } from "./utils/test-utils"

test("Form should be rendered, available and selected", () => {
  render(<PublishCarForm />)
})
