import React from "react"

/**
 * @class {BooksComponent}
 * Class for displaying stored data
 */
export default class BooksComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  /**
   * Delete of an entity
   */
  deleteClick = (event) => {
    event.preventDefault()
    const { params: { i } } = this.props
    this.props.clickDeleteButton(i)
  }

  render() {
    const { params: { name, author } } = this.props
    
    return (
      <div>
        <span>{ name }</span>
        <span> - </span>
        <span>{ author }</span>
        <span>    </span>
        <button 
            onClick = {this.deleteClick}
        >
            Delete this book
        </button> 
      </div>  
    )
  }
}