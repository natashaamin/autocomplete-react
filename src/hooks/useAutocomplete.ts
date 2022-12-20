import { FormElement } from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import { Country } from "../ts/interfaces/Country.interface";
import useOutsideClick from "./useOutsideClick";

const useAutoComplete = (
  data: Country[],
  inputSearchRef: HTMLInputElement | null
) => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [activeSuggestions, setActiveSuggestion] = useState(0);

  useEffect(() => {
    if (inputSearchRef) {
      inputSearchRef.focus();
    }
  }, []);

  useOutsideClick(inputSearchRef, () => {
    setSearchValue("");
    setSuggestions([]);
  });

  const emptySearchBar = () => {
    setSearchValue("");
    setSuggestions([]);
    setSelectedSuggestion("");
    setActiveSuggestion(0);
  };

  const handleChange = (event: React.ChangeEvent<FormElement>): void => {
    if (event.target.value != "") {
      const filterSuggestions = data.filter((itemData) => {
        const value = event.target.value.toUpperCase();
        const name = itemData.name.common.toUpperCase();

        return value && name.startsWith(value) && name !== value;
      });
      setSearchValue(event.target.value);
      setSuggestions(filterSuggestions);
    } else {
      emptySearchBar();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "ArrowDown" && activeSuggestions < suggestions.length) {
      setActiveSuggestion(activeSuggestions + 1);
    } else if (event.key === "ArrowUp" && activeSuggestions > 1) {
      setActiveSuggestion(activeSuggestions - 1);
    } else if (event.key === "Enter" && activeSuggestions > 0) {
      setSearchValue(suggestions[activeSuggestions - 1].name.common);
      setSelectedSuggestion(suggestions[activeSuggestions - 1].name.common);
      setSuggestions([]);
      setActiveSuggestion(0);
    }
  };

  const handleClick = (value: string) => {
    setSearchValue(value);
    setSuggestions([]);
    setSelectedSuggestion(value);
    setActiveSuggestion(0);
  };

  return {
    searchValue,
    suggestions,
    selectedSuggestion,
    activeSuggestions,
    handleChange,
    handleKeyDown,
    handleClick,
  };
};

export default useAutoComplete;
