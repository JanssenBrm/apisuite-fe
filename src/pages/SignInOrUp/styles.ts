import { makeStyles } from "@apisuite/fe-base";
import rocketMan from "assets/rocketMan.svg";

const useStyles = makeStyles((theme) => ({
  iconLogo: {
    color: theme.palette.primary.main,
    height: "auto",
    marginRight: "10px",
    width: "60px",
  },

  imageLogo: {
    width: 60,
    height: "auto",
    marginRight: 10,
    padding: 5,
  },

  imageSideContentContainer: {
    backgroundImage: "url(" + rocketMan + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 8.5% 100%)",
  },
}));

export default useStyles;
