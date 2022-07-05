import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    recipeName: '',
    ingredients: '',
    instructions: '',
    servingSize: '',
    category: 'mainCourse',
    notes: '',
    modified: '',

  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    alert(this.state.category);
    fetch('http://localhost:3001/api/recipes', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipeName: this.state.recipeName,
        ingredients: this.state.ingredients,
        instructions: this.state.instructions,
        servingSize: this.state.servingSize,
        category: this.state.category,
        notes: this.state.notes
      })
    })
      .then(response => response.json())
      .then(item => {
        if(item) {
          this.props.addItemToState(item)
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(`http://localhost:3001/api/recipes/${this.state.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipeName: this.state.recipeName,
        ingredients: this.state.ingredients,
        instructions: this.state.instructions,
        servingSize: this.state.servingSize,
        category: this.state.category,
        notes: this.state.notes,
        id:this.state.id

      })
    })
      .then(response => response.json())
      .then(item => {
        if(item) {
          // console.log(item[0])
          alert(item.id)
          this.props.updateState(item)
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    if(this.props.item){
      const { id, recipeName, ingredients, instructions, servingSize, category, notes,modified } = this.props.item
      this.setState({ id,recipeName, ingredients, instructions, servingSize, category, notes,modified })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
         <FormGroup>
        <Label for="category">Category:</Label>
          <select name="category" value={this.state.category} onChange={this.onChange}>
            <option value="mainCourse">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="sides">Sides</option>
            <option value="drink">Drink</option>
          </select>
        </FormGroup>
        <FormGroup>
          <Label for="recipe name">Recipe Name</Label>
          <Input type="text" name="recipeName" id="recipeName" onChange={this.onChange} value={this.state.recipeName === null ? '' : this.state.recipeName} />
        </FormGroup>
        <FormGroup>
          <Label for="ingredients">Ingredients</Label>
          <Input type="textarea" name="ingredients" id="ingredients" onChange={this.onChange} value={this.state.ingredients === null ? '' : this.state.ingredients} />
        </FormGroup>
        <FormGroup>
           <Label for="instructions">Instructions</Label>
          <Input type="textarea"  name="instructions" id="instructions" onChange={this.onChange} value={this.state.instructions === null ? '' : this.state.instructions}  />
        </FormGroup>
        <FormGroup>
          <Label for="servingSize">Serving Size</Label>
          <Input type="text" name="servingSize" id="servingSize" onChange={this.onChange} value={this.state.servingSize === null ? '' : this.state.servingSize}   />
        </FormGroup>
       
        <FormGroup>
          <Label for="notes">Notes</Label>
          <Input type="textarea" name="notes" id="notes" onChange={this.onChange} value={this.state.notes}  />
        </FormGroup>
        <FormGroup>
          <Label for="modified">Modified</Label>
          <Input type="text" name="modified" id="modified" readonly="true" value={this.state.modified}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm