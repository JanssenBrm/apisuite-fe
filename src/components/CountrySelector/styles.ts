import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  inputFields: {
    marginTop: "0px",
    maxWidth: "500px",
    width: "100%",

    // Text field's label styles
    "& > label": {
      color: theme.palette.label,
    },

    "& label.Mui-focused": {
      color: `${theme.palette.action.focus} !important`,
    },

    // Text field's input outline styles
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: `${theme.palette.grey[300]} !important`,
      },

      "&.Mui-focused fieldset": {
        borderColor: `${theme.palette.action.focus} !important`,
      },
    },

    // Text field's input text styles
    "& .MuiInputBase-root": {
      "& .MuiInputBase-input": {
        color: theme.palette.action.active,
      },
    },
  },
}));
