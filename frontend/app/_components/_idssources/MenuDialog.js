import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function handleSubmit(index, enabled) {
  if (enabled) {
    fetch(`http://159.223.47.93:5000/rules/enable/${index}`);
  } else {
    fetch(`http://159.223.47.93:5000/rules/disable/${index}`);
  }
}

export default function MenuDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [rule, setRule] = React.useState(props.data.rule);
  const [enabled, setEnabled] = React.useState(props.data.enabled);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Modify
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modify</DialogTitle>
        <DialogContent>
          <form
            id="modify-form"
            onSubmit={() => handleSubmit(props.data.index, enabled)}
          >
            <TextField
              label="Rule"
              value={rule}
              onChange={(e) => setRule(e.target.value)}
              required
              variant="outlined"
              fullWidth
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                  />
                }
                label="Enable?"
              />
            </FormGroup>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="modify-form" onClick={handleClose}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
