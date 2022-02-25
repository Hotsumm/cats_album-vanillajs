function Node({ $app, initState, onClick, onBackClick }) {
  this.state = initState;
  this.onClick = onClick;
  this.onBackClick = onBackClick;

  const $target = document.createElement('div');
  $target.className = 'Nodes';
  $app.appendChild($target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const handleNodesClick = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.nodeName !== 'IMG') return;
    const targetId = target.getAttribute('id');

    if (targetId === 'backImg') {
      this.onBackClick();
    } else {
      const selectNode = this.state.nodes.find((node) => node.id === targetId);
      if (selectNode.type === 'DIRECTORY') {
        this.onClick(selectNode);
      } else {
        handleFileClick(selectNode.filePath);
      }
    }
  };

  const handleFileClick = (filePath) => {
    const imageSrc = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${filePath}`;
    const $modal = document.createElement('div');
    $modal.className = 'Modal ImageViewer';
    $app.appendChild($modal);
    const modalTemplates = `<div class="Modal ImageViewer">
                <div class="content">
                <img src=${imageSrc}>
            </div>`;
    $modal.innerHTML = modalTemplates;
  };

  this.render = () => {
    const prevTemplates = `<div class='Node'>
              <img id="backImg" src='./assets/prev.png'>
          </div>`;

    const nodesTemplates =
      this.state.nodes.length < 1
        ? ''
        : this.state.nodes
            .map(
              (node) =>
                `<div class="Node">
                  <img id=${node.id} src=${
                  node.type === 'DIRECTORY'
                    ? './assets/directory.png'
                    : './assets/file.png'
                } />
                  <div>${node.name}</div>
              </div>`
            )
            .join('');
    console.log(nodesTemplates);
    $target.innerHTML = this.state.isRoot
      ? nodesTemplates
      : prevTemplates + nodesTemplates;

    $target.addEventListener('click', handleNodesClick);
  };

  this.render();
}

export default Node;
