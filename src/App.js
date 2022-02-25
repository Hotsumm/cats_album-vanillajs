import Breadcrumb from './components/Breadcrumb.js';
import Node from './components/Node.js';
import Loading from './components/Loading.js';
import { fetchRoot, fetchNodes } from './api/api.js';

const cache = {};

function App($app) {
  this.state = {
    isLoading: true,
    isRoot: true,
    depth: [],
    nodes: [],
    onClick: async (selectNode) => {
      if (
        !selectNode ||
        selectNode === this.state.depth[this.state.depth.length - 1]
      )
        return;

      const nextDepth = [...this.state.depth, selectNode];
      if (cache[selectNode.id]) {
        this.setState({
          ...this.state,
          isRoot: false,
          nodes: cache[selectNode.id],
          depth: nextDepth,
        });
        return;
      }
      await getSelectNode(selectNode, nextDepth);
    },
    onBackClick: async () => {
      if (this.state.depth.length === 1) {
        this.setState({
          ...this.state,
          isRoot: true,
          nodes: cache['root'],
          depth: [],
        });
        return;
      }

      const depth = [...this.state.depth];
      depth.pop();
      const nextDepth = depth;
      const nextNode = nextDepth[nextDepth.length - 1];

      if (cache[nextNode.id]) {
        this.setState({
          ...this.state,
          nodes: cache[nextNode.id],
          depth: nextDepth,
        });
        return;
      }
      await getSelectNode(nextNode, nextDepth);
    },
  };

  this.setState = (nextState) => {
    this.state = nextState;

    breadcrumb.setState({
      depth: this.state.depth,
    });

    node.setState({
      nodes: this.state.nodes,
      isRoot: this.state.isRoot,
    });

    loading.setState({
      isLoading: this.state.isLoading,
    });
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initState: { depth: this.state.depth },
  });

  const node = new Node({
    $app,
    initState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: this.state.onClick,
    onBackClick: this.state.onBackClick,
  });

  const loading = new Loading({
    $app,
    initState: {
      isLoading: this.state.isLoading,
    },
  });

  const init = async () => {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    try {
      const data = await fetchRoot();
      this.setState({
        ...this.state,
        nodes: data,
        isRoot: true,
        depth: [],
      });
      cache['root'] = data;
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  };

  const getSelectNode = async (selectNode, nextDepth) => {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    const isRoot = nextDepth.length < 1;
    try {
      const data = await fetchNodes(selectNode.id);
      this.setState({
        ...this.state,
        nodes: data,
        isRoot,
        depth: nextDepth,
      });
      if (!cache[selectNode.id]) cache[selectNode.id] = data;
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const imageViewer = document.querySelector('.ImageViewer');
      if (imageViewer) imageViewer.remove();
    }
  });

  init();
}

export default App;
