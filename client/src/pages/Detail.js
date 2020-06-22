import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Details extends Component {
  state = {
    book: {}
  };

  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.book.title} by {this.state.book.author}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
       
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Synopsis</h1>
              <p>
                {this.state.book.synopsis}
              </p>
              <p>
                <a href={this.state.book.link} target="_blank" rel="noopener noreferrer">Link to Google Book Page</a>
              </p>
            </article>
          </Col>
          <Col size="md-1">
                <img src={this.state.book.image} alt="book"/>
          </Col>
        </Row>
        <Row>
          <Col size="md-4">
            <Link to="/savedBooks">Return to Saved Books</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Details;