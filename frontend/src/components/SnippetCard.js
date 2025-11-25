"use client"

import { Component } from "react"
import styled from "styled-components"

var Card = styled.div`
    background-color: #16213e;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #0f3460;
    transition: transform 0.2s ease;
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
`

var CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
`

var Title = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #eaeaea;
    margin: 0;
`

var Badge = styled.span`
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    background-color: ${(props) => (props.isPublic ? "#28a745" : "#6c757d")};
    color: white;
`

var Description = styled.p`
    font-size: 14px;
    color: #adb5bd;
    margin-bottom: 12px;
    line-height: 1.5;
`

var CodePreview = styled.pre`
    background-color: #1a1a2e;
    padding: 14px;
    border-radius: 8px;
    font-size: 13px;
    font-family: 'Fira Code', 'Consolas', monospace;
    color: #8be9fd;
    overflow: hidden;
    max-height: 120px;
    margin-bottom: 14px;
`

var TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 14px;
`

var Tag = styled.span`
    padding: 4px 10px;
    background-color: #0f3460;
    color: #e94560;
    border-radius: 4px;
    font-size: 12px;
`

var LanguageTag = styled.span`
    padding: 4px 10px;
    background-color: #e94560;
    color: white;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
`

var CardFooter = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid #0f3460;
`

var ActionBtn = styled.button`
    flex: 1;
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    font-size: 13px;
    cursor: pointer;
    background-color: ${(props) => (props.primary ? "#e94560" : "#0f3460")};
    color: ${(props) => (props.danger ? "#e94560" : "#eaeaea")};
    &:hover {
        background-color: ${(props) => (props.primary ? "#d63447" : "#1a4a7a")};
    }
`

class SnippetCard extends Component {
  constructor(props) {
    super(props)
    this.truncateCode = this.truncateCode.bind(this)
  }

  truncateCode(code) {
    var lines = code.split("\n")
    if (lines.length > 5) {
      return lines.slice(0, 5).join("\n") + "\n..."
    }
    return code
  }

  render() {
    
    var snippet = this.props.snippet

    return (
      <Card>
        <CardHeader>
          <Title>{snippet.title}</Title>
          <Badge isPublic={snippet.isPublic}>{snippet.isPublic ? "Public" : "Private"}</Badge>
        </CardHeader>

        {snippet.description && <Description>{snippet.description}</Description>}

        <CodePreview>{this.truncateCode(snippet.code)}</CodePreview>

        <TagsContainer>
          <LanguageTag>{snippet.language}</LanguageTag>
          {snippet.tags && snippet.tags.map((tag, idx) => <Tag key={idx}>{tag}</Tag>)}
        </TagsContainer>

        <CardFooter>
          <ActionBtn primary onClick={this.props.onView}>
            View
          </ActionBtn>
          <ActionBtn onClick={this.props.onEdit}>Edit</ActionBtn>
          <ActionBtn onClick={this.props.onFork}>Fork</ActionBtn>
          <ActionBtn danger onClick={this.props.onDelete}>
            Delete
          </ActionBtn>
        </CardFooter>
      </Card>
    )
  }
}

export default SnippetCard
