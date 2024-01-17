export class DefaultNodeData<S=any> {
  label: string;
  settings?: S;
}

export class DataContent {
  topicTitle: string;
  markdownText: string;
}

export class DefaultNodeDataWithContent<S=any> extends DefaultNodeData<S> {
  content: DataContent;
}