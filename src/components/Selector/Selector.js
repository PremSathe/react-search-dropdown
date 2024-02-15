import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import "./selector.scss";
const Selector = () => {
  const [countries, setCountries] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);
  return (
    <div className="box">
      <div
        onClick={() => setOpen(!open)}
        className="select"
        style={{
          color: !selected && "#4a5568",
        }}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Search..."}
        <BiChevronDown
          size={20}
          style={{ transform: open && "rotate(180deg)" }}
        />
      </div>
      <ul
        className="dropdown"
        style={open ? { maxHeight: "15rem" } : { maxHeight: "0rem" }}
      >
        <div className="input">
          <AiOutlineSearch
            size={18}
            className="icons"
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter country name"
            className="list"
          />
        </div>
        {countries?.map((country) => (
          <li
            key={country?.name}
            className={`
        p-2
        text-sm
        hover:bg-sky-600
        hover:text-white
        ${
          country?.name?.toLowerCase() === selected?.toLowerCase() &&
          "bg-sky-600 text-white"
        }
        ${
          country?.name?.toLowerCase().startsWith(inputValue)
            ? "block"
            : "hidden"
        }
      `}
            onClick={() => {
              if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(country?.name);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {country?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
