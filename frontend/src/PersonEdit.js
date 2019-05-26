import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
  },
}));

function PersonEdit(props) {
  const classes = useStyles();
  const [person, setPerson] = React.useState(props.person);

  const handleChange = name => event => {
    setPerson({ ...person, [name]: event.target.value });
  };

  const isValid = () => {
    return !!person.name && person.name !== '' && !!person.email && person.email !== '' && !!person.age && person.age !== '' 
  }

  return (
    <Card className={classes.card}>
      <CardHeader title={props.isAdd ? 'Add Person' : ('Editing ' + props.person.name)} />
      <CardContent>
        <TextField
          id="name"
          label="Name"
          value={person.name}
          onChange={handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="age"
          label="Age"
          value={person.age}
          onChange={handleChange('age')}
          margin="normal"
          type="number"
          variant="outlined"
        />
        <TextField
          id="email"
          label="Email"
          value={person.email}
          onChange={handleChange('email')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="address"
          label="Address"
          value={person.address}
          onChange={handleChange('address')}
          margin="normal"
        />
        <TextField
          id="balance"
          label="Balance"
          value={person.balance !== undefined ? person.balance : 0}
          onChange={handleChange('balance')}
          margin="normal"
          type="number"
        />
      </CardContent>
      <CardActions>
        <Button disabled={!isValid()} aria-label="save" onClick={() => props.onSave(person)}>
          save
        </Button>
        <Button aria-label="cancel" onClick={props.onCancel}>
          cancel
        </Button>
      </CardActions>
    </Card>
  )
}

export default PersonEdit
