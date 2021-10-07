import './styles.css';

import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts'
import { Button } from '../../components/Button';

class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts,
    } = this.state;
    const nextPage = page + postsPerPage;
    const nexPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nexPosts);

    this.setState({ posts, page: nextPage });
  }

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;


    return (
      <section className="container">
        <Posts posts={posts} />
        <div className="button-container">
          <Button
            text="Ver mais"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
        </div>
      </section>
    )
  }
}




// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Olá mundo!
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Home;
