import { style } from "@vanilla-extract/css";

export const modal = style({
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#303030",
  padding: 20,
  width: 300,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 10,
  zIndex: 98,
});

export const label = style({
  color: "white",
});

export const trackedNpcList = style({
  margin: 0,
  padding: 0,
  width: "100%",
  marginTop: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const trackedNpcItem = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "white",
});
