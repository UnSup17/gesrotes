import { JSX } from "react";

export type IFunctionModalProps = {
  label: string;
  modalName: string;
  component: () => JSX.Element;
}