function Loading({ $app, initState }) {
  this.state = initState;
  const $target = document.createElement('div');
  $target.className = 'Modal Loading';
  $app.appendChild($target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const loadingTemplates = `<div class="Modal Loading">
            <div class="content">
                <img src="./assets/nyan-cat.gif">
            </div>
        </div>`;
    $target.innerHTML = loadingTemplates;
    $target.style.display = this.state.isLoading ? 'block' : 'none';
  };

  this.render();
}

export default Loading;
