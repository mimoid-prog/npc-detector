import { style } from "@vanilla-extract/css";

export const detectionAlertStyle = style({
  position: "fixed",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  border: "3px solid black",
  padding: 20,
  width: 300,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  zIndex: 99,
});
