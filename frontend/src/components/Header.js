"use client"

import { Component } from "react"
import styled from "styled-components"

var HeaderContainer = styled.header`
    background-color: #16213e;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #0f3460;
`

var Logo = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: #e94560;
    cursor: pointer;
`

var SearchBox = styled.div`
    flex: 1;
    max-width: 500px;
    margin: 0 32px;
`

var SearchInput = styled.input`
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-radius: 8px;
    background-color: #1a1a2e;
    color: #eaeaea;
    font-size: 14px;
    outline: none;
    &::placeholder {
        color: #6c757d;
    }
    &:focus {
        box-shadow: 0 0 0 2px #e94560;
    }
`

var CreateButton = styled.button`
    padding: 12px 24px;
    background-color: #e94560;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #d63447;
    }
`

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: props.searchValue || "",
    }
    this.searchTimeout = null
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleSearchChange(e) {
    
    var value = e.target.value
    this.setState({ searchText: value })
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
    this.searchTimeout = setTimeout(() => {
      this.props.onSearchChange(value)
    }, 300)
  }

  render() {
    
    return (
      <HeaderContainer>
        <Logo>SnippetVault</Logo>
        <SearchBox>
          <SearchInput
            type="text"
            placeholder="Search snippets..."
            value={this.state.searchText}
            onChange={this.handleSearchChange}
          />
        </SearchBox>
        <CreateButton onClick={this.props.onCreateSnippet}>+ New Snippet</CreateButton>
      </HeaderContainer>
    )
  }
}

export default Header
