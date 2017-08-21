import React from "react"

export default class BooksComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  deleteClick = (event) => {
    event.preventDefault()
    const { params: { i } } = this.props
    this.props.clickDeleteButton(i)
  }

  render() {
    const { params: { name, autor } } = this.props
    
    return (
       <div>
        <span>{ name }</span>
        <span> - </span>
        <span>{ autor }</span>
        <span>    </span>
        <button 
            onClick = {this.deleteClick}
            className = {"button is-warning"}
        >
            Delete
        </button> 
       </div>  
    )
  }
}