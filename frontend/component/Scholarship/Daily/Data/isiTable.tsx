import { MdAccountCircle } from "react-icons/md";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";

function createData(
  alias: string,
  scholarname: string,
  todaySLP: number,
  yesterdaySLP: number,
  averageSLP: number,
  mmr: number,
  icon: any,
  earningrate: string
) {
  return {
    alias,
    scholarname,
    todaySLP,
    yesterdaySLP,
    averageSLP,
    mmr,
    icon,
    earningrate,
  };
}

const rows = [
  createData(
    "Misch #1",
    "Fabian Habil",
    153,
    169,
    150,
    1230,
    <BsGenderMale style={{ color: "#2196f3" }} />,
    "High"
  ),
  createData(
    "Misch #2",
    "Fabian Habil 2",
    153,
    123,
    145,
    1230,
    <BsGenderMale style={{ color: "#2196f3" }} />,
    "High"
  ),
  createData(
    "Misch #3",
    "Fabian Habil 3",
    153,
    157,
    123,
    1230,
    <BsGenderMale style={{ color: "#2196f3" }} />,
    "High"
  ),
  createData(
    "Misch #4",
    "Fabian Habil 4",
    153,
    119,
    130,
    1230,
    <BsGenderMale style={{ color: "#2196f3" }} />,
    "High"
  ),
  createData(
    "Misch #5",
    "Fabian Habil 5",
    153,
    112,
    139,
    1230,
    <BsGenderMale style={{ color: "#2196f3" }} />,
    "High"
  ),
  createData(
    "Misch #6",
    "Fabian Habil 6",
    153,
    112,
    139,
    1230,
    <BsGenderMale style={{ color: "#2196f3" }} />,
    "High"
  ),
];

export default rows;
