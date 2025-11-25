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
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
`

var ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
`

var TitleSection = styled.div`
    flex: 1;
`

var Title = styled.h2`
    font-size: 24px;
    color: #eaeaea;
    margin: 0 0 8px 0;
`

var Meta = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`

var Badge = styled.span`
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    background-color: ${(props) => (props.isPublic ? "#28a745" : "#6c757d")};
    color: white;
`

var LanguageBadge = styled.span`
    padding: 4px 12px;
    background-color: #e94560;
    color: white;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
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

var Description = styled.p`
    font-size: 15px;
    color: #adb5bd;
    margin-bottom: 20px;
    line-height: 1.6;
`

var CodeBlock = styled.div`
    position: relative;
    margin-bottom: 20px;
`

var CodeHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0f3460;
    padding: 10px 14px;
    border-radius: 8px 8px 0 0;
`

var CodeTitle = styled.span`
    font-size: 13px;
    color: #adb5bd;
`

var CopyBtn = styled.button`
    padding: 6px 14px;
    background-color: #e94560;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    &:hover {
        background-color: #d63447;
    }
`

var CodeContent = styled.pre`
    background-color: #1a1a2e;
    padding: 18px;
    border-radius: 0 0 8px 8px;
    font-size: 14px;
    font-family: 'Fira Code', 'Consolas', monospace;
    color: #8be9fd;
    overflow-x: auto;
    line-height: 1.6;
    margin: 0;
`

var TagsSection = styled.div`
    margin-bottom: 20px;
`

var SectionLabel = styled.span`
    font-size: 12px;
    color: #6c757d;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: block;
    margin-bottom: 10px;
`

var TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`

var Tag = styled.span`
    padding: 6px 12px;
    background-color: #0f3460;
    color: #e94560;
    border-radius: 4px;
    font-size: 13px;
`

var ExecuteSection = styled.div`
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #0f3460;
`

var ExecuteBtn = styled.button`
    padding: 12px 24px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 14px;
    &:hover {
        background-color: #218838;
    }
`

var OutputBlock = styled.pre`
    background-color: #1a1a2e;
    padding: 14px;
    border-radius: 8px;
    font-size: 13px;
    font-family: 'Fira Code', 'Consolas', monospace;
    color: #50fa7b;
    max-height: 150px;
    overflow-y: auto;
`

var ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 24px;
`

var ActionBtn = styled.button`
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

class SnippetView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      copied: false,
      output: "",
      hasExecuted: false,
    }
    this.handleCopy = this.handleCopy.bind(this)
    this.handleExecute = this.handleExecute.bind(this)
    this.handleFork = this.handleFork.bind(this)
  }

  handleCopy() {
    
    navigator.clipboard.writeText(this.props.snippet.code)
    this.setState({ copied: true })
    setTimeout(() => {
      this.setState({ copied: false })
    }, 2000)
  }

  handleExecute() {
    
    var snippet = this.props.snippet
    if (snippet.language === "javascript" || snippet.language === "typescript") {
      try {
        var logs = []
        var originalLog = console.log
        console.log = () => {
          var args = Array.prototype.slice.call(arguments)
          logs.push(args.join(" "))
        }
        eval(snippet.code)
        console.log = originalLog
        var result = logs.length > 0 ? logs.join("\n") : "Code executed successfully (no output)"
        this.setState({ output: result, hasExecuted: true })
      } catch (err) {
        this.setState({ output: "Error: " + err.message, hasExecuted: true })
      }
    } else {
      this.setState({
        output: "Execution only supported for JavaScript and TypeScript",
        hasExecuted: true,
      })
    }
  }

  handleFork() {
    
    this.props.onFork(this.props.snippet._id)
    this.props.onClose()
  }

  render() {
    
    var snippet = this.props.snippet
    var canExecute = snippet.language === "javascript" || snippet.language === "typescript"

    return (
      <Overlay onClick={this.props.onClose}>
        <Modal
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <ModalHeader>
            <TitleSection>
              <Title>{snippet.title}</Title>
              <Meta>
                <LanguageBadge>{snippet.language}</LanguageBadge>
                <Badge isPublic={snippet.isPublic}>{snippet.isPublic ? "Public" : "Private"}</Badge>
              </Meta>
            </TitleSection>
            <CloseBtn onClick={this.props.onClose}>x</CloseBtn>
          </ModalHeader>

          {snippet.description && <Description>{snippet.description}</Description>}

          <CodeBlock>
            <CodeHeader>
              <CodeTitle>{snippet.language}</CodeTitle>
              <CopyBtn onClick={this.handleCopy}>{this.state.copied ? "Copied!" : "Copy Code"}</CopyBtn>
            </CodeHeader>
            <CodeContent>{snippet.code}</CodeContent>
          </CodeBlock>

          {snippet.tags && snippet.tags.length > 0 && (
            <TagsSection>
              <SectionLabel>Tags</SectionLabel>
              <TagsContainer>
                {snippet.tags.map((tag, idx) => (
                  <Tag key={idx}>{tag}</Tag>
                ))}
              </TagsContainer>
            </TagsSection>
          )}

          {canExecute && (
            <ExecuteSection>
              <ExecuteBtn onClick={this.handleExecute}>Run Code</ExecuteBtn>
              {this.state.hasExecuted && <OutputBlock>{this.state.output}</OutputBlock>}
            </ExecuteSection>
          )}

          <ButtonGroup>
            <ActionBtn onClick={this.props.onClose}>Close</ActionBtn>
            <ActionBtn primary onClick={this.handleFork}>
              Fork Snippet
            </ActionBtn>
          </ButtonGroup>
        </Modal>
      </Overlay>
    )
  }
}

export default SnippetView
