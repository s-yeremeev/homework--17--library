import React from "react"
import BooksComponent from "./books"

export default class LibraryContainer extends React.Component {
  state = {
    library: []
  }

  constructor(props) {
    super(props)
    this.inputName = null
    this.inputAutor = null
  }

  /**
   * Reading data from a localstorage and writing them to an Array
   */
  componentDidMount() {
    this.setState({ library: this.readingBooksOfLibrary() })
  }

  /**
   * The process of updating data with form submissions
   */
  processingDataSubmitForm = (event) => {
    event.preventDefault()
    try {
      if (!this.inputName || !this.inputAutor) throw new Error("Input component is not defined!")
      
        if (this.inputName.value && this.inputAutor.value) {
        const library = this.readingBooksOfLibrary()
        library.unshift({
          name: "\"" + this.inputName.value + "\"",
          autor: "\"" + this.inputAutor.value + "\""
        })

        this.setState({ library }, () => { 
          this.addNewBookInLibrary(library)
          this.inputName.value = ""
          this.inputAutor.value = ""
        })
      }
    } catch ({ e }) {
      console.error(e)
    }
  }

  /** 
   * @return {library}
   * add data for localstorage 
   */
  addNewBookInLibrary(library) {
    localStorage.setItem("library", JSON.stringify(library))
    return this
  }

  /**
   * We take the data from localstorage
   * @return {dataLocalstorage}
   */
  readingBooksOfLibrary() {
    const dataLocalstorage = localStorage.getItem("library")
    return dataLocalstorage && JSON.parse(dataLocalstorage) || []
  }

  /**
   * When you click the delete button. 
   * This entry is deleted and re-formed by localstorage
   * and data on the page by books
   */
  clickDeleteButton = (id) => {
    const { library } = this.state
    const filtered = library.filter((el, i) => i != id)
    this.setState({ library: filtered }, () => this.addNewBookInLibrary(filtered))
  }

  /**
   * @return {React.Component}
   * Form for the input of new books and the table itself on the basis of localstorage
   */
  render() {
    const { library } = this.state
    return (
      <div>
        <form onSubmit = {this.processingDataSubmitForm}>
          <input 
                type = {"text"}
                ref = {(input) => this.inputName = input}
                placeholder={"Name..."}
                /* className = {"input is-primary"} */
          />
          <span>   </span>
          <input 
                type = {"text"}
                ref = {(input) => this.inputAutor = input}
                placeholder = {"Autor..."}
                /* className = {"input is-primary"} */
          />
          <span>   </span>
          <button 
                type = {"submit"}
                className = {"button is-primary"}
          >
                Add new books
          </button>
        </form>
         <div><font size="6" color="red">Database books ("Name book" - "Autor book")</font></div>
        <div id = "databooks">
          {library.map((el, i) => (<BooksComponent 
            key = {i} 
            clickDeleteButton = {this.clickDeleteButton}            
            params = {{...el, i}}
          />)) }
        </div>
      </div>      
    )
  }
}