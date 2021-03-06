import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import React from 'react'

function Footer ({ classes, className }) {
  return (
    <AppBar
      component='footer'
      position='static'
      classes={{ root: classes.root }}
      className={className}
    >
      <Typography variant='subheading' align='center'>
        Written by @PippLogic and @quadglacier
      </Typography>
    </AppBar>
  )
}

Footer.propTypes = {
  classes: PropTypes.shape({ root: PropTypes.string.isRequired }).isRequired,
  className: PropTypes.string
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    padding: `${theme.spacing.unit}px 0`
  }
})

export default withStyles(styles)(Footer)
