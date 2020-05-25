import React from "react";
import {
  Avatar,
  SvgIcon,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { RecordState } from "../../../generated/globalTypes";
import { red, green, grey } from "@material-ui/core/colors";
import { Done, Close, Cancel } from "@material-ui/icons";

const QuestionMark = (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.94237 16.5263L12.27 16.5292L12.2671 18.892L9.93954 18.8893L9.94237 16.5263ZM11.5101 3.13837C15.6609 3.31661 17.4635 7.57203 14.9925 10.759C14.3475 11.5459 13.3073 12.0645 12.7944 12.7254C12.2737 13.3786 12.2728 14.1663 12.2719 14.9539L9.94426 14.9511C9.94579 13.6357 9.94715 12.5252 10.468 11.7382C10.981 10.9511 12.0212 10.4877 12.6657 9.96857C14.5455 8.20654 14.083 5.70915 11.5073 5.50128C10.89 5.50055 10.2976 5.74879 9.86058 6.19138C9.42352 6.63399 9.17759 7.23476 9.17683 7.86142L6.84923 7.85865C6.8507 6.60527 7.34261 5.40382 8.21673 4.51859C9.09078 3.63337 10.2755 3.13689 11.5101 3.13837Z"
      fill="black"
    />
  </svg>
);

interface Props {
  state: RecordState;
}

const StateIcon: React.FC<Props> = ({ state }) => {
  const classes = useStyles();
  let styles: string;
  let icon: JSX.Element | null;
  switch (state) {
    case RecordState.ACCEPTED:
      styles = classes.green;
      icon = <Done />;
      break;

    case RecordState.REJECTED:
      styles = classes.red;
      icon = <Cancel />;
      break;

    case RecordState.UNKNOWN:
      styles = classes.grey;
      icon = QuestionMark;
      break;
    default:
      styles = classes.lightGrey;
      icon = null;
      break;
  }

  return (
    <Avatar className={styles}>
      <SvgIcon>{icon}</SvgIcon>
    </Avatar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    green: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
    },
    red: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
    },
    grey: {
      color: theme.palette.getContrastText(grey[500]),
      backgroundColor: grey[500],
    },
    lightGrey: {
      color: theme.palette.getContrastText(grey[50]),
      backgroundColor: grey[50],
    },
  })
);

export default StateIcon;
