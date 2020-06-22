import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import SaveBtn from "../components/SaveBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    searchResults: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data, title: "", author: "", synopsis: "" }))
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const {  name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.getGoogleSearch(this.state.title)
        .then(res =>
          {this.setState({searchResults: res.data.items}, () => console.log(this.state.searchResults))
        })
        .catch(err => console.log(err));
    }
  };

  saveBook = (title, author, synopsis, image, link) => {
    API.saveBook({
      title,
      author,
      synopsis,
      image,
      link
    }).then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Find a Book</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn>Search</FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-6 sm-12">
          <List>
          {this.state.searchResults.map(book => (
            <ListItem key={book.id}>
            <a href={book.volumeInfo.infoLink} alt="link" target="_blank" rel="noopener noreferrer">
            <strong>
            {book.volumeInfo.title} by {book.volumeInfo.authors ? book.volumeInfo.authors[0]: "No Author Available"}
            </strong>
            </a>
            <SaveBtn onClick={() => this.saveBook(book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.description, book.volumeInfo.imageLinks.thumbnail, book.volumeInfo.infoLink)} />
            </ListItem>
            ))}
          </List>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;