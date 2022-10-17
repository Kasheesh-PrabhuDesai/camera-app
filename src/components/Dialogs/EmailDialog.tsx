import { Grid, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface DialogProps {
  open: boolean;
  handleSendEmail: (data: { email: string }) => void;
  handleCloseEmailDialog: () => void;
}

//creating a schema for validating the email address entered in the dialog
const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Field cannot be left empty"),
});

const EmailDialog = ({
  open,
  handleSendEmail,
  handleCloseEmailDialog,
}: DialogProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(emailSchema),
  });

  return (
    <Grid container justifyContent="center">
      <Dialog open={open} onClose={handleCloseEmailDialog}>
        <form>
          <DialogTitle>{"Please enter your email address"}</DialogTitle>
          <DialogContent>
            <Controller
              control={control}
              name={"email"}
              render={({ field, fieldState: { error } }) => (
                <div style={{ position: "relative" }}>
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    required
                    error={!!error}
                  />
                  {error !== undefined && (
                    <Typography>{error.message}</Typography>
                  )}
                </div>
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEmailDialog} color="primary">
              Go Back
            </Button>
            <Button onClick={handleSubmit(handleSendEmail)} color="primary">
              Continue
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  );
};

export default EmailDialog;
