"use client"

import { Component } from "react"
import styled from "styled-components"

var Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`

var Modal = styled.div`
    background-color: #16213e;
    border-radius: 16px;
    padding: 28px;
    width: 90%;
    max-width: 700px;
    max-height: 90vh;
    overflow-y: auto;
`

var ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`

var ModalTitle = styled.h2`
    font-size: 22px;
    color: #eaeaea;
    margin: 0;
`

var CloseBtn = styled.button`
    background: none;
    border: none;
    color: #6c757d;
    font-size: 28px;
    cursor: pointer;
    &:hover {
        color: #eaeaea;
    }
`

var FormGroup = styled.div`
    margin-bottom: 20px;
`

var Label = styled.label`
    display: block;
    font-size: 14px;
    color: #adb5bd;
    margin-bottom: 8px;
`

var Input = styled.input`
    width: 100%;
    padding: 12px 14px;
    background-color: #1a1a2e;
    color: #eaeaea;
    border: 1px solid #0f3460;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    &:focus {
        border-color: #e94560;
    }
`

var TextArea = styled.textarea`
    width: 100%;
    padding: 12px 14px;
    background-color: #1a1a2e;
    color: #eaeaea;
    border: 1px solid #0f3460;
    border-radius: 8px;
    font-size: 14px;
    font-family: 'Fira Code', 'Consolas', monospace;
    outline: none;
    resize: vertical;
    min-height: 200px;
    &:focus {
        border-color: #e94560;
    }
`

var Select = styled.select`
    width: 100%;
    padding: 12px 14px;
    background-color: #1a1a2e;
    color: #eaeaea;
    border: 1px solid #0f3460;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    &:focus {
        border-color: #e94560;
    }
`

var CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

var Checkbox = styled.input`
    width: 18px;
    height: 18px;
    cursor: pointer;
`

var CheckboxLabel = styled.span`
    font-size: 14px;
    color: #eaeaea;
`

var ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 24px;
`

var Button = styled.button`
    flex: 1;
    padding: 14px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    background-color: ${(props) => (props.primary ? "#e94560" : "#0f3460")};
    color: #eaeaea;
    &:hover {
        background-color: ${(props) => (props.primary ? "#d63447" : "#1a4a7a")};
    }
`

var languages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "cpp",
  "go",
  "rust",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "html",
  "css",
  "sql",
  "bash",
  "json",
]

class SnippetForm extends Component {
  constructor(props) {
    super(props)
    var snippet = props.snippet
    this.state = {
      title: snippet ? snippet.title : "",
      description: snippet ? snippet.description : "",
      code: snippet ? snippet.code : "",
      language: snippet ? snippet.language : "javascript",
      tags: snippet ? snippet.tags.join(", ") : "",
      isPublic: snippet ? snippet.isPublic : false,
      collection: snippet ? snippet.collection || "" : "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(field, value) {
    var update = {}
    update[field] = value
    this.setState(update)
  }

  handleSubmit() {
    
    var tagsArray = this.state.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    var snippetData = {
      title: this.state.title,
      description: this.state.description,
      code: this.state.code,
      language: this.state.language,
      tags: tagsArray,
      isPublic: this.state.isPublic,
      collection: this.state.collection || null,
    }
    this.props.onSave(snippetData)
  }

  render() {
    
    var isEditing = !!this.props.snippet
    var collections = this.props.collections

    return (
      <Overlay onClick={this.props.onClose}>
        <Modal
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <ModalHeader>
            <ModalTitle>{isEditing ? "Edit Snippet" : "Create New Snippet"}</ModalTitle>
            <CloseBtn onClick={this.props.onClose}>x</CloseBtn>
          </ModalHeader>

          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Enter snippet title"
              value={this.state.title}
              onChange={(e) => {
                this.handleChange("title", e.target.value)
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Input
              type="text"
              placeholder="Brief description"
              value={this.state.description}
              onChange={(e) => {
                this.handleChange("description", e.target.value)
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label>Language</Label>
            <Select
              value={this.state.language}
              onChange={(e) => {
                this.handleChange("language", e.target.value)
              }}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Code</Label>
            <TextArea
              placeholder="Paste your code here..."
              value={this.state.code}
              onChange={(e) => {
                this.handleChange("code", e.target.value)
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label>Tags (comma separated)</Label>
            <Input
              type="text"
              placeholder="react, hooks, api"
              value={this.state.tags}
              onChange={(e) => {
                this.handleChange("tags", e.target.value)
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label>Collection</Label>
            <Select
              value={this.state.collection}
              onChange={(e) => {
                this.handleChange("collection", e.target.value)
              }}
            >
              <option value="">No Collection</option>
              {collections.map((col) => (
                <option key={col._id} value={col._id}>
                  {col.name}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <CheckboxWrapper>
              <Checkbox
                type="checkbox"
                checked={this.state.isPublic}
                onChange={(e) => {
                  this.handleChange("isPublic", e.target.checked)
                }}
              />
              <CheckboxLabel>Make this snippet public</CheckboxLabel>
            </CheckboxWrapper>
          </FormGroup>

          <ButtonGroup>
            <Button onClick={this.props.onClose}>Cancel</Button>
            <Button primary onClick={this.handleSubmit}>
              {isEditing ? "Update Snippet" : "Create Snippet"}
            </Button>
          </ButtonGroup>
        </Modal>
      </Overlay>
    )
  }
}

export default SnippetForm
