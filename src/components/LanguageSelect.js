import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const LanguageSelect = ({ languages, targetLanguage, setTargetLanguage }) => {
  return (
    <FormControl fullWidth variant="outlined" margin="normal" required>
      <InputLabel>Choose the language</InputLabel>
      <Select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        label="Choose the language"
      >
        {languages.map((language, index) => (
          <MenuItem key={index} value={language}>
            {language}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
