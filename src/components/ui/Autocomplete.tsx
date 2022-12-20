import { useEffect, useMemo, useRef, useState } from "react";
import useAutoComplete from "../../hooks/useAutocomplete";
import { Country } from "../../ts/interfaces/Country.interface";
import { Card, Col, Input, Row, Text, User } from "@nextui-org/react";
import classes from "./ui.module.css";
import * as _ from "lodash";

interface Props {
  data: Country[];
}

const Autocomplete = ({ data }: Props) => {
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const {
    searchValue,
    selectedSuggestion,
    suggestions,
    activeSuggestions,
    handleChange,
    handleClick,
    handleKeyDown,
  } = useAutoComplete(data, inputSearchRef.current);

  useEffect(() => {
    if (inputSearchRef.current) {
      inputSearchRef.current.focus();
    }

    return () => {
      debounceChangeHandler.cancel();
    };
  }, []);

  const debounceChangeHandler = useMemo(
    () => _.debounce(handleChange, 300),
    [searchValue, selectedSuggestion, suggestions, activeSuggestions]
  );

  return (
    
    <div className={classes.autocomplete}>
      <Input
        bordered
        labelPlaceholder="Search your country"
        size="xl"
        value={searchValue}
        onChange={debounceChangeHandler}
        onKeyDown={handleKeyDown}
        ref={inputSearchRef}
        color="secondary"
      />
      <Card css={{ marginTop: "0.5rem" }}>
        <Card.Body css={{ padding: 0 }}>
          {!suggestions.length &&
          searchValue.length &&
          !selectedSuggestion.length ? (
            <Row className={classes.itemListNot}>
              <Col>
                <Text>Nothing to show</Text>
              </Col>
            </Row>
          ) : (
            <>
              {suggestions.map(({ name, flags }: Country, index) => (
                <Row
                  key={index}
                  className={`${classes.itemList} ${
                    index === activeSuggestions - 1 ? classes.activeItem : ""
                  }`}
                  onClick={() => handleClick(name.common)}
                >
                  <Col>
                    <User src={flags.svg} name={name.common} squared />
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Card.Body>
      </Card>
      <Text size="$xs">Country selected: {selectedSuggestion}</Text>
    </div>
  );
};

export default Autocomplete;
