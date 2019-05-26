import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
  },
}));

function Person(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <Card className={classes.card}>
      <CardHeader
        title={props.person.name}
        action={
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreVertIcon />
            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={props.onEdit}>EDIT</MenuItem>
              <MenuItem onClick={props.onDelete}>DELETE</MenuItem>
            </Menu>
          </IconButton>
        }/>
      <CardContent>
        <Typography variant="h1">
          {props.person.balance} {props.person.currency}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="Add to favorites" onClick={() => props.onFavorite(props.person.id)}>
          <FavoriteIcon color={props.person.is_favorite ? 'error' : 'action'} />
        </IconButton>
        <a href={'mailto:' + props.person.email} >
        <Chip
          icon={<MailIcon />}
          label={props.person.email}
        />
        </a>
      </CardActions>
    </Card>
  )
}

export default Person
