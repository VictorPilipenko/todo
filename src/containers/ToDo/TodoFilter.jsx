import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";
import { setVisibilityFilter } from "./actions";

const filterValues = [
  { key: "All", value: "SHOW_ALL" },
  { key: "Completed", value: "SHOW_COMPLETED" },
  { key: "Active", value: "SHOW_ACTIVE" }
];

const mapStateToProps = state => {
  return {
    currentFilter: state.visibilityFilter
  }
};

const mapDispatchToProps = dispatch => ({
  changeFilter: event => {
    const filter = event.target.value;
    event.preventDefault();
    dispatch(setVisibilityFilter(filter));
  }
});

const TodoFilter = ({ currentFilter, changeFilter }) => {
  return (
    <FormControl style={{ width: "100%" }}>
      <InputLabel>Filter Todos</InputLabel>
      <Select value={currentFilter} onChange={changeFilter}>
        {filterValues.map(f => (
          <MenuItem key={uuidv1()} value={f.value}>
            {f.key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoFilter);
