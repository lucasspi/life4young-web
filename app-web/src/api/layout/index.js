import axios from 'axios'
import pages from './pages'

export default {
  pages,

  contents: {
    types: {
      heroBanner: 'hero-banner',
      chainOfKnowledge: 'chain-of-knowledge',
      chainOfKnowledgeRules: 'chain-of-knowledge-rules',
    }
  },

  fetchAllContents () {
    return axios.get(`layout/contents`).then(
      (response) => response.data.data
    );
  },

  fetchContent (contentSlugOrId) {
    return axios.get(`layout/contents/${contentSlugOrId}`).then(
      (response) => response.data.data
    )
  }
}
