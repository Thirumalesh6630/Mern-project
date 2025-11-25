"use client"

import React, { Component } from "react"
import styled, { createGlobalStyle } from "styled-components"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import SnippetList from "./components/SnippetList"
import SnippetForm from "./components/SnippetForm"
import SnippetView from "./components/SnippetView"
import ApiService from "./services/api"

var GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #1a1a2e;
        color: #eaeaea;
        min-height: 100vh;
    }
`

var AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

var MainContent = styled.div`
    display: flex;
    flex: 1;
`

var ContentArea = styled.main`
    flex: 1;
    padding: 24px;
    overflow-y: auto;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      snippets: [],
      collections: [],
      selectedSnippet: null,
      showForm: false,
      editingSnippet: null,
      filters: {
        language: "",
        tag: "",
        isPublic: "",
        search: "",
        collection: "",
      },
      loading: true,
    }
    this.loadSnippets = this.loadSnippets.bind(this)
    this.loadCollections = this.loadCollections.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleCreateSnippet = this.handleCreateSnippet.bind(this)
    this.handleEditSnippet = this.handleEditSnippet.bind(this)
    this.handleViewSnippet = this.handleViewSnippet.bind(this)
    this.handleCloseView = this.handleCloseView.bind(this)
    this.handleCloseForm = this.handleCloseForm.bind(this)
    this.handleSaveSnippet = this.handleSaveSnippet.bind(this)
    this.handleDeleteSnippet = this.handleDeleteSnippet.bind(this)
    this.handleForkSnippet = this.handleForkSnippet.bind(this)
    this.handleCreateCollection = this.handleCreateCollection.bind(this)
    this.handleDeleteCollection = this.handleDeleteCollection.bind(this)
  }

  componentDidMount() {
    this.loadSnippets()
    this.loadCollections()
  }

  loadSnippets() {
    
    this.setState({ loading: true })
    ApiService.getSnippets(this.state.filters)
      .then((data) => {
        this.setState({ snippets: data, loading: false })
      })
      .catch((err) => {
        console.log("Error loading snippets: " + err.message)
        this.setState({ loading: false })
      })
  }

  loadCollections() {
    
    ApiService.getCollections()
      .then((data) => {
        this.setState({ collections: data })
      })
      .catch((err) => {
        console.log("Error loading collections: " + err.message)
      })
  }

  handleFilterChange(filterName, value) {
    
    var newFilters = Object.assign({}, this.state.filters)
    newFilters[filterName] = value
    this.setState({ filters: newFilters }, () => {
      this.loadSnippets()
    })
  }

  handleCreateSnippet() {
    this.setState({ showForm: true, editingSnippet: null })
  }

  handleEditSnippet(snippet) {
    this.setState({ showForm: true, editingSnippet: snippet })
  }

  handleViewSnippet(snippet) {
    this.setState({ selectedSnippet: snippet })
  }

  handleCloseView() {
    this.setState({ selectedSnippet: null })
  }

  handleCloseForm() {
    this.setState({ showForm: false, editingSnippet: null })
  }

  handleSaveSnippet(snippetData) {
    
    var promise
    if (this.state.editingSnippet) {
      promise = ApiService.updateSnippet(this.state.editingSnippet._id, snippetData)
    } else {
      promise = ApiService.createSnippet(snippetData)
    }
    promise
      .then(() => {
        this.handleCloseForm()
        this.loadSnippets()
      })
      .catch((err) => {
        console.log("Error saving snippet: " + err.message)
      })
  }

  handleDeleteSnippet(id) {
    
    ApiService.deleteSnippet(id)
      .then(() => {
        this.loadSnippets()
      })
      .catch((err) => {
        console.log("Error deleting snippet: " + err.message)
      })
  }

  handleForkSnippet(id) {
    
    ApiService.forkSnippet(id)
      .then(() => {
        this.loadSnippets()
      })
      .catch((err) => {
        console.log("Error forking snippet: " + err.message)
      })
  }

  handleCreateCollection(collectionData) {
    
    ApiService.createCollection(collectionData)
      .then(() => {
        this.loadCollections()
      })
      .catch((err) => {
        console.log("Error creating collection: " + err.message)
      })
  }

  handleDeleteCollection(id) {
    
    ApiService.deleteCollection(id)
      .then(() => {
        this.loadCollections()
        this.loadSnippets()
      })
      .catch((err) => {
        console.log("Error deleting collection: " + err.message)
      })
  }

  render() {
    
    return (
      <React.Fragment>
        <GlobalStyle />
        <AppContainer>
          <Header
            onCreateSnippet={this.handleCreateSnippet}
            searchValue={this.state.filters.search}
            onSearchChange={(val) => {
              this.handleFilterChange("search", val)
            }}
          />
          <MainContent>
            <Sidebar
              collections={this.state.collections}
              filters={this.state.filters}
              onFilterChange={this.handleFilterChange}
              onCreateCollection={this.handleCreateCollection}
              onDeleteCollection={this.handleDeleteCollection}
            />
            <ContentArea>
              <SnippetList
                snippets={this.state.snippets}
                loading={this.state.loading}
                onView={this.handleViewSnippet}
                onEdit={this.handleEditSnippet}
                onDelete={this.handleDeleteSnippet}
                onFork={this.handleForkSnippet}
              />
            </ContentArea>
          </MainContent>
        </AppContainer>
        {this.state.showForm && (
          <SnippetForm
            snippet={this.state.editingSnippet}
            collections={this.state.collections}
            onSave={this.handleSaveSnippet}
            onClose={this.handleCloseForm}
          />
        )}
        {this.state.selectedSnippet && (
          <SnippetView
            snippet={this.state.selectedSnippet}
            onClose={this.handleCloseView}
            onFork={this.handleForkSnippet}
          />
        )}
      </React.Fragment>
    )
  }
}

export default App
