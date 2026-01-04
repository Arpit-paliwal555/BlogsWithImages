import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BlogList from './components/BlogList'
import { blogsList} from './utils/Blogs'
import type { IBlogpost } from './interfaces/IBlogPost'
function App() {
  const list:IBlogpost[] = blogsList;
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <BlogList list={list}></BlogList>
    </>
  )
}

export default App
