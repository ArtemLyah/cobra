import React, { HTMLAttributes } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Node } from 'reactflow';

export interface NodeMenuProps{
  node: Node
}

export const ContextMenu = ({ node }: NodeMenuProps) => {
  console.log(node.sourcePosition);
  const content = node?.data.content;
  console.log(content);
  return ( 
    <div className='context-menu' style={{ zIndex: 10, height: '100%' }}>
      <div className='data-settings'>
        <div className="result-data-side">
          <h2 className='topic-title'>{content.topicTitle}</h2>
          <hr />
          <ReactMarkdown 
            skipHtml 
            remarkPlugins={[ remarkGfm ]}
            rehypePlugins={[ rehypeRaw ]}
            components={{
              code (props: HTMLAttributes<HTMLElement>) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                return match 
                  ? 
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    language={match[1]}
                    style={style}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                  : 
                  <code {...rest} className={className}>
                    {children}
                  </code>;
              },
            }}
          >{ content.markdownText }</ReactMarkdown>
        </div>
      </div>  
    </div>
  );
};

export default ContextMenu;