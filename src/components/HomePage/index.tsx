import { Grid } from "@material-ui/core";
import { useState } from "react";
import CameraPage from "../Camera";
import InstructionsPage from "../Instructions";

const Home = () => {
  const [cameraPage, setCameraPage] = useState<boolean>(false);

  return (
    <Grid container justifyContent="center" alignItems="center">
      {!cameraPage && <InstructionsPage setCameraPage={setCameraPage} />}
      {cameraPage && <CameraPage setCameraPage={setCameraPage} />}
    </Grid>
  );
};

export default Home;
