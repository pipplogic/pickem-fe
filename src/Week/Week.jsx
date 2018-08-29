import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'

import Autorenew from '@material-ui/icons/Autorenew'
import Check from '@material-ui/icons/Check'
import Error from '@material-ui/icons/Error'
import Save from '@material-ui/icons/Save'

import cx from 'classnames'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import StatusPage from '../StatusPage'
import Game from '../Game'
import GameHeader from '../GameHeader'
import { idType, requireStrings } from '../propType'

class Week extends Component {
  componentDidMount () {
    this.loadWeek()
    this.loadPicks()
  }

  componentDidUpdate (prevProps) {
    const { weekNumber, poolId } = this.props
    if (weekNumber !== prevProps.weekNumber) {
      this.loadWeek()
      this.loadPicks()
    }

    if (poolId !== prevProps.poolId) {
      this.loadPicks()
    }
  }

  loadWeek () {
    const { weekNumber, loadWeek } = this.props
    loadWeek(weekNumber)
  }

  loadPicks () {
    const { poolId, weekNumber, loadPicks } = this.props
    if (poolId === 'MOCK_POOL') {
      return
    }
    loadPicks({ poolId, weekId: weekNumber })
  }

  render () {
    const {
      classes,
      className,
      error,
      loading,
      gameIds,
      savePicks,
      poolId,
      weekNumber,
      saving,
      saveError,
      modified
    } = this.props

    if (loading) {
      return <StatusPage className={className} status='loading' />
    }

    if (error) {
      return <StatusPage className={className} status='error' />
    }

    return (
      <React.Fragment>
        <List className={className}>
          <ListSubheader classes={{ root: classes.header }}>
            <GameHeader />
          </ListSubheader>
          {gameIds &&
            gameIds.map(gameId => (
              <React.Fragment key={gameId}>
                <ListItem>
                  <Game gameId={gameId} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
        </List>
        <div className={classes.actions}>
          <Button
            variant='raised'
            color='primary'
            disabled={!modified}
            onClick={savePicks({ poolId, weekId: weekNumber })}
          >
            Save
            {saving && (
              <Autorenew className={cx(classes.rightIcon, classes.load)} />
            )}
            {saveError && (
              <Error className={cx(classes.rightIcon, classes.error)} />
            )}
            {!saving && modified && <Save className={classes.rightIcon} />}
            {!saving && !modified && <Check className={classes.rightIcon} />}
          </Button>
        </div>
      </React.Fragment>
    )
  }
}

Week.propTypes = {
  weekNumber: idType.isRequired,
  className: PropTypes.string,
  classes: requireStrings('header', 'actions'),
  error: PropTypes.any,
  loading: PropTypes.bool,
  loadWeek: PropTypes.func.isRequired,
  gameIds: PropTypes.arrayOf(idType.isRequired).isRequired,
  poolId: idType.isRequired,
  loadPicks: PropTypes.func.isRequired,
  savePicks: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.bool.isRequired,
  modified: PropTypes.bool.isRequired
}

export default Week
