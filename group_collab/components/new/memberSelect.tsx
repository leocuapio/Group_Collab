"use client";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/lib/types";

export default function MemberSelect({
  members,
  selected,
  setSelected,
  user
}: {
  members: Profile[];
  selected: string[];
  setSelected: (ids: string[]) => void;
  user: User | null;
}) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const { target: { value } } = event;
    setSelected(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ width: 300 }}>
      <InputLabel id="member-select-label">Select Members</InputLabel>
      <Select
        labelId="member-select-label"
        multiple
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label="Select Members" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected
              .filter(id => id !== user?.id)
              .map((id) => {
                const member = members.find(m => m.id === id);
                return (
                  <Chip
                    key={id}
                    label={member?.full_name}
                  />
                );
              })}
          </Box>
        )}
      >
        {members.filter(member => member.id !== user?.id).map((member) => (
          <MenuItem key={member.id} value={member.id}>
            {member.full_name} ({member.username})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
