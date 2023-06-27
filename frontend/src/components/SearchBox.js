import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <Form onSubmit={(e) => submitHandler(e)} className="d-flex  me-auto w-100">
      <InputGroup>
        <FormControl
          placeholder="Search for products"
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          aria-describedby="button-search"
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;