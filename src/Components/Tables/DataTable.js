import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch(`http://localhost:3001/api/recipes/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.recipeName}</td>
          <td>{item.ingredients}</td>
          <td>{item.instructions}</td>
          <td>{item.servingSize}</td>
          <td>{item.category}</td>
          <td>{item.notes}</td>
          <td>{item.added}</td>
          <td>{item.modified}</td>
          
        
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
             <th>Recipe Name</th>
            <th>Ingredients</th>
            <th>Instructions</th>
            <th>Serving Size</th>
            <th>Category</th>
            <th>Notes</th>
            <th>Date Added</th>
            <th>Date Modified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable