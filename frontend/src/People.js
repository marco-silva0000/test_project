import React, { useState } from 'react';
import update from 'immutability-helper';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Person from './Person';
import PersonEdit from './PersonEdit';

const demoPeople = [{"id":1,"name":"Marco Silva","age":21,"balance":50000,"email":"marcosilva0000@gmail.com","address":"","is_favorite":true}, {id:2, name: "marco2", age: "28", balance: 500000}]

const toggleFavorite = (id) => {
  return fetch('api/person/' + id + '/toggle-favorite/',
    {
      method: 'PUT',
      credentials: 'same-origin',
      headers: new Headers({
      'Content-Type': 'application/json'
      }),
    })
}

const createPerson = (body) => {
  return fetch('api/person/', 
    {
      method: 'POST',
      credentials: 'same-origin',
      headers: new Headers({
      'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body)
    })
}

const editPerson = (id, body) => {
  return fetch('api/person/' + id + '/',
    {
      method: 'PUT',
      credentials: 'same-origin',
      headers: new Headers({
      'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body)
    })
}

const deletePerson = (id) => {
  return fetch('api/person/' + id + '/', {method: 'DELETE'})
}

class People extends React.Component {
  constructor(props) {
    super(props);
    let people = props.people;
    this.state = {
      people: people ? people : [],
      open: false
    };
  }

  handleToggleFavorite = (index) => {
    toggleFavorite(this.state.people[index].id).then((response) => {
         const contentType = response.headers.get("content-type");
         if (contentType && contentType.indexOf("application/json") !== -1){
             response.json().then((data => {
             const people = update(this.state.people, {[index]: {$set: data}})
             this.setState({people})
           }))
         }
         else {
           this.setState({open: true});
         }
    })
  }

  handleDelete = (index) => {
    deletePerson(this.state.people[index].id).then((response) => {
         const contentType = response.headers.get("content-type");
         if (contentType && contentType.indexOf("application/json") !== -1){
           response.json().then((data => this.setState({people: data})))
         }
         else {
           this.setState({open: true});
         }
    })
  }

  handleEdit = (index) => {
    const people = update(this.state.people, {[index]: {isEdit: {$set: !this.state.people[index].isEdit}}})
    this.setState({people})
  }

  handleCreate = (data) => {
    createPerson(data).then((response) => {
         const contentType = response.headers.get("content-type");
         if (contentType && contentType.indexOf("application/json") !== -1){
           response.json().then((data => {
             const people = update(this.state.people, {$push: [data]})
             this.setState({people})
           }))
         }
         else {
           this.setState({open: true});
         }
    })
  }

  handleSave = (index, data) => {
    editPerson(this.state.people[index].id, data).then((response) => {
         const contentType = response.headers.get("content-type");
         if (contentType && contentType.indexOf("application/json") !== -1){
           response.json().then((data => {
             const people = update(this.state.people, {[index]: {$set: data}})
             this.setState({people})
           }))
         }
         else {
           this.setState({open: true});
         }
    })
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open: false});
  }

  componentDidMount() {
    if (this.state.people.length === 0){
      fetch('api/person/').then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1){
          response.json().then((data => this.setState({people: data})))
        }
        else {
          this.setState({people: demoPeople})
        }
      })
    }
  }

  render () {
  return (
  <Grid container spacing={2} justify="center">
      <Grid item xs={12} lg={4}>
        <PersonEdit
          isAdd
          person={{}}
          onSave={this.handleCreate}/>
      </Grid>
    {this.state.people.map((person, index) => (
      <Grid item xs={12} lg={4}>
        {!!person.isEdit ? (
        <PersonEdit
          person={person}
          onSave={(data) => this.handleSave(index, data)}/>
        ) : (
        <Person
          person={person}
          onFavorite={() => this.handleToggleFavorite(index)}
          onEdit={() => this.handleEdit(index)}
          onDelete={() => this.handleDelete(index)}/>
        )
        }
      </Grid>
    ))}
  <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Something went wrong</span>}
      />
    </Grid>
  )
  }
}

export default People
