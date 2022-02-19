import { MdAccountCircle } from "react-icons/md";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";

function createData(
  batch: string,
  status: string,
  step: string,
) {
  return {
    batch,
    status,
    step,
  };
}

const rows = [
  createData(
    "#1",
    "Initiated",
    "1",
  ),
  createData(
    "#2",
    "Initiated",
    "1",
  ),
  createData(
    "#3",
    "Process",
    "2",
  ),
  createData(
    "#4",
    "Process",
    "2",
  ),
  createData(
    "#5",
    "Transfer",
    "3",
  ),
  createData(
    "#6",
    "Transfer",
    "3",
  ),
];

export default rows;
