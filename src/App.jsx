import React from "react";
import { Box, Button, Text, Grommet } from "grommet";
import launchImage from "./assets/logo.png";
import buttonImage from "./assets/cta.gif";

// Configurable via environment variables
const TARGET_URL = import.meta.env.VITE_TARGET_URL || "https://example.com";
const BG_COLOR = import.meta.env.VITE_BG_COLOR || "#ffb524";
const TEXT_COLOR = import.meta.env.VITE_TEXT_COLOR || "#ff003c";

const theme = {
  global: {
    font: {
      family: "'Anta', sans-serif",
    },
  },
};

const handleLaunch = () => {
  window.location.href = TARGET_URL;
};

function App() {
  return (
    <Grommet theme={theme} full>
      <Box
        fill
        align="center"
        justify="center"
        gap="medium"
        pad="large"
        background={BG_COLOR}
      >
        <img
          src={launchImage}
          alt="TLS Bicho Peck logo"
          style={{ maxWidth: "400px", width: "70vw", display: "block" }}
        />

        <Button
          plain
          focusIndicator={false}
          onClick={handleLaunch}
          a11yTitle="Launch the TLS Bicho Peck experience"
        >
          <img
            src={buttonImage}
            alt="Launch TLS Bicho Peck"
            style={{ maxWidth: "300px", width: "50vw", display: "block", cursor: "pointer" }}
          />
        </Button>

        <Text size="large" textAlign="center" color={TEXT_COLOR}>
          Click on Peck to launch
        </Text>
      </Box>
    </Grommet>
  );
}

export default App;