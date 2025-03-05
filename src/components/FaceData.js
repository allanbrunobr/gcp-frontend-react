import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const FaceData = ({ face }) => {
  return (
    <List>
      <ListItem>
        <ListItemText primary={`Joy: ${face.joyLikelihood}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Anger: ${face.angerLikelihood}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Sorrow: ${face.sorrowLikelihood}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Surprise: ${face.surpriseLikelihood}`} />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={`Detection Confidence: ${face.detectionConfidence.toFixed(
            2
          )}`}
        />
      </ListItem>
    </List>
  );
};

export default FaceData;
