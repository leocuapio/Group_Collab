"use client";
import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

export default function ProjectForm() {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    projectType: "",
  });
  const [emails, setEmails] = useState<string[]>([]);
  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (!error) setUser(data.user);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return console.error("User not found");

    const { data, error } = await supabase.from("projects").insert([
      {
        name: formData.projectName,
        description: formData.projectDescription,
        created_by: user.id,
        project_type: formData.projectType
      },
    ]).select().single();

    const { data: data1, error: error1 } = await supabase.from("project_members").insert([
      {
        project_id: data.id,
        user_id: user.id,
        role: "owner",
      }
    ]).select().single();


    if (error || error1) {
      console.error(error);
    } else {

      console.log(emails);
      console.log(data);
      console.log(data1);
      alert("Project created successfully");
      if (data && data1) {
        router.push(
          `/protected/specific_project?project=${encodeURIComponent(data.id)}`
        );
      };
      setFormData({ projectName: "", projectDescription: "", projectType: "" });


      await fetch("/api/send_invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // important!
        },
        body: JSON.stringify({
          emails: emails, // must be an array
          project_id: data.id
        }),
      });
    }
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 520,
          borderRadius: 4,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box mb={3}>
            <Typography variant="h4" fontWeight={700}>
              New Project
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Set up your project details to get started.
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                sx: { borderRadius: 2 },
              }}
            />

            <TextField
              fullWidth
              label="Project Description"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
              InputProps={{
                sx: { borderRadius: 2 },
              }}
            />

            <Autocomplete
              multiple
              freeSolo
              options={["cuapioleonardo@gmail.com", "test@test.com"]} // Optional: list of existing users for suggestions
              value={emails}
              onChange={(event, newValue) => setEmails(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Invite Collaborators (Emails)"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <FormControl>
              <Select
                name="projectType"
                value={formData.projectType}
                onChange={handleSelectChange}
                displayEmpty
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"general"}>General</MenuItem>
                <MenuItem value={"software"}>Software</MenuItem>
                <MenuItem value={"notes"}>Notes</MenuItem>
                <MenuItem value={"case"}>Case</MenuItem>
                <MenuItem value={"tracker"}>Tracker</MenuItem>
              </Select>
            </FormControl>

            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.2,
                  fontWeight: 600,
                  borderRadius: 3,
                  textTransform: "none",
                }}
              >
                Create Project
              </Button>
            </Box>

          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
