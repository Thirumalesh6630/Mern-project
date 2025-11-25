import { Component } from "react"
import styled from "styled-components"
import SnippetCard from "./SnippetCard"

var ListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 20px;
`

var EmptyState = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: #6c757d;
`

var EmptyTitle = styled.h3`
    font-size: 20px;
    margin-bottom: 8px;
    color: #eaeaea;
`

var EmptyText = styled.p`
    font-size: 14px;
`

var LoadingText = styled.div`
    text-align: center;
    padding: 40px;
    color: #6c757d;
    font-size: 16px;
`

class SnippetList extends Component {
  render() {
    
    var snippets = this.props.snippets
    var loading = this.props.loading

    if (loading) {
      return <LoadingText>Loading snippets...</LoadingText>
    }

    if (!snippets || snippets.length === 0) {
      return (
        <EmptyState>
          <EmptyTitle>No snippets found</EmptyTitle>
          <EmptyText>Create your first snippet or adjust your filters</EmptyText>
        </EmptyState>
      )
    }

    return (
      <ListContainer>
        {snippets.map((snippet) => (
          <SnippetCard
            key={snippet._id}
            snippet={snippet}
            onView={() => {
              this.props.onView(snippet)
            }}
            onEdit={() => {
              this.props.onEdit(snippet)
            }}
            onDelete={() => {
              this.props.onDelete(snippet._id)
            }}
            onFork={() => {
              this.props.onFork(snippet._id)
            }}
          />
        ))}
      </ListContainer>
    )
  }
}

export default SnippetList
