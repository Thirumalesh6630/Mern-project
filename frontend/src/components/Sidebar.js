"use client"

import { Component } from "react"
import styled from "styled-components"

var SidebarContainer = styled.aside`
    width: 260px;
    background-color: #16213e;
    padding: 20px;
    border-right: 1px solid #0f3460;
    overflow-y: auto;
`

var Section = styled.div`
    margin-bottom: 28px;
`

var SectionTitle = styled.h3`
    font-size: 12px;
    text-transform: uppercase;
    color: #6c757d;
    margin-bottom: 12px;
    letter-spacing: 1px;
`

var FilterSelect = styled.select`
    width: 100%;
    padding: 10px 12px;
    background-color: #1a1a2e;
    color: #eaeaea;
    border: 1px solid #0f3460;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    margin-bottom: 10px;
    &:focus {
        border-color: #e94560;
    }
`

var CollectionItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    background-color: ${(props) => (props.active ? "#0f3460" : "transparent")};
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 4px;
    &:hover {
        background-color: #0f3460;
    }
`

var CollectionName = styled.span`
    font-size: 14px;
    color: #eaeaea;
`

var DeleteBtn = styled.button`
    background: none;
    border: none;
    color: #e94560;
    cursor: pointer;
    font-size: 16px;
    padding: 0;
    opacity: 0.7;
    &:hover {
        opacity: 1;
    }
`

var CollectionInput = styled.input`
    width: 100%;
    padding: 10px 12px;
    background-color: #1a1a2e;
    color: #eaeaea;
    border: 1px solid #0f3460;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    margin-bottom: 8px;
    &:focus {
        border-color: #e94560;
    }
`

var AddBtn = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #0f3460;
    color: #eaeaea;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        background-color: #1a4a7a;
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

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newCollectionName: "",
    }
    this.handleAddCollection = this.handleAddCollection.bind(this)
  }

  handleAddCollection() {
    
    if (this.state.newCollectionName.trim()) {
      this.props.onCreateCollection({
        name: this.state.newCollectionName.trim(),
      })
      this.setState({ newCollectionName: "" })
    }
  }

  render() {
    
    var filters = this.props.filters
    var collections = this.props.collections

    return (
      <SidebarContainer>
        <Section>
          <SectionTitle>Language</SectionTitle>
          <FilterSelect
            value={filters.language}
            onChange={(e) => {
              this.props.onFilterChange("language", e.target.value)
            }}
          >
            <option value="">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </FilterSelect>
        </Section>

        <Section>
          <SectionTitle>Visibility</SectionTitle>
          <FilterSelect
            value={filters.isPublic}
            onChange={(e) => {
              this.props.onFilterChange("isPublic", e.target.value)
            }}
          >
            <option value="">All Snippets</option>
            <option value="true">Public Only</option>
            <option value="false">Private Only</option>
          </FilterSelect>
        </Section>

        <Section>
          <SectionTitle>Collections</SectionTitle>
          <CollectionItem
            active={!filters.collection}
            onClick={() => {
              this.props.onFilterChange("collection", "")
            }}
          >
            <CollectionName>All Snippets</CollectionName>
          </CollectionItem>
          {collections.map((col) => (
            <CollectionItem
              key={col._id}
              active={filters.collection === col._id}
              onClick={() => {
                this.props.onFilterChange("collection", col._id)
              }}
            >
              <CollectionName>{col.name}</CollectionName>
              <DeleteBtn
                onClick={(e) => {
                  e.stopPropagation()
                  this.props.onDeleteCollection(col._id)
                }}
              >
                x
              </DeleteBtn>
            </CollectionItem>
          ))}

          <div style={{ marginTop: "12px" }}>
            <CollectionInput
              type="text"
              placeholder="New collection name"
              value={this.state.newCollectionName}
              onChange={(e) => {
                this.setState({ newCollectionName: e.target.value })
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  this.handleAddCollection()
                }
              }}
            />
            <AddBtn onClick={this.handleAddCollection}>Add Collection</AddBtn>
          </div>
        </Section>
      </SidebarContainer>
    )
  }
}

export default Sidebar
