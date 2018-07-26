import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";

import Login from "./component";
import { mapState, mapDispatch } from "./reduxMappers";
import styles from "./styles";

export default connect(mapState, mapDispatch)(withStyles(styles)(Login));
