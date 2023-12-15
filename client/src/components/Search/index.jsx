import React from "react";
import styles from "./Search.module.scss";
import search from "./search.svg";
import close from "./close.svg";
import debounce from "lodash.debounce";
import { setSearchVa } from "../../redux/slices/searchSlice";
import { useDispatch } from "react-redux";

const Search = () => {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();
  const inputRef = React.useRef(null); // Use useRef to create a function ref

  const onClickClear = () => {
    dispatch(setSearchVa(""));
    setValue("");
    inputRef.current.focus();
  };

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchVa(str));
    }, 1200),
    []
  );

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={search} alt="" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Search pizza..."
      />
      {value && (
        <img
          onClick={() => onClickClear()}
          className={styles.close}
          src={close}
          alt=""
        />
      )}
    </div>
  );
};

export default Search;
