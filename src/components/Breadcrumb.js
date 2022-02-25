function Breadcrumb({ $app, initState }) {
  this.state = initState;
  const $target = document.createElement('nav');
  $target.className = 'Breadcrumb';
  $app.appendChild($target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const breadcrumbTemplates =
      this.state.depth.length > 0
        ? this.state.depth.map((node) => `<div>${node.name}</div>`).join('')
        : '';
    const breadcrumb = `<div>root</div>${breadcrumbTemplates}`;

    $target.innerHTML = breadcrumb;
  };

  this.render();
}

export default Breadcrumb;
