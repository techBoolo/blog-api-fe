import { useSelector } from 'react-redux'
import Post from '../../components/Post/index.js'
const Home = (props) => {

  const { posts } = useSelector(state => state.post)

  return (
    <>
      {
        posts.map(post => (
          <Post key={post.id} post={post} />
        ))
      }
    </>
  );
};

export default Home
