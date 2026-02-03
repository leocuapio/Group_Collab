"use client";

import Image from "next/image";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Link,
} from "@mui/material";

export default function Hero() {
  return (
    <>
      {/* Hero Text & Input Section */}
      <Container
        maxWidth="lg"
        sx={{
          textAlign: "center",
          pt: 12,
          pb: 24,
        }}
      >
        {/* Title */}
        <Typography
          component="h1"
          variant="h2"
          sx={{
            mx: "auto",
            width: "100%",
            fontWeight: "bold",
            fontSize: { xs: "30px", lg: "48px" },
            lineHeight: { xs: "45px", lg: "60px" },
            maxWidth: { lg: "640px" },
          }}
        >
          Simplify Group Collaboration Platform
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="subtitle1"
          sx={{
            mx: "auto",
            mt: 4,
            mb: 4,
            width: { xs: "100%", lg: "83%" },
            px: { xs: 2, lg: 0 },
            color: "text.secondary",
          }}
        >
          Share files, designate tasks, set goals, deadlines, and more with your team.
        </Typography>

        {/* Input & Button */}
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            label="name@creative-tim.com"
            variant="outlined"
            sx={{ width: { xs: "100%", md: 320 } }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ width: { xs: "100%", md: "auto" }, flexShrink: 0 }}
          >
            Get Started
          </Button>
        </Box>

        {/* Small Text / Terms */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            See our{" "}
            <Link href="#" underline="hover">
              Terms and Conditions
            </Link>
          </Typography>
        </Box>
      </Container>

      {/* Hero Image */}
      <Box sx={{ width: "100%", maxWidth: { lg: "1024px" }, mx: "auto" }}>
        <Image
          width={1024}
          height={400}
          src="/team.jpg"

          alt="blog background"
          className="h-96 w-full rounded-lg object-cover lg:h-[21rem]"
        />
      </Box>
    </>
  );
}
