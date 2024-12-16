import { useEffect, useState } from 'react';
import axios from 'axios';

interface post {
  id: string
  authorId: string
  createdAt: string
  content: string
  author: {
    username: string
  }
}

function App() {
  const [thought, setThought] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [thoughts, setThoughts] = useState<post[]>([]);
  const [load,setLoad] = useState(false);

  useEffect(() => {
    ( async () => {
      const token = localStorage.getItem('TDC');
      await axios.get(`http://localhost:3000/getallposts`,{
        headers: {
          token: token
        }
      }).then((response) => {
        setLoad(true)
        // console.log(response)
        if(response.status == 200){
          setThoughts(response.data.posts.reverse())
        }
      }).catch((error) => {
        if(error.response.status == 401){
          window.location.href = '/signin'
        }
      })
    })()
  },[]);


  const postThought = (e:any) => {
    e.preventDefault()
    const token = localStorage.getItem('TDC');
    axios.post(`http://localhost:3000/createpost`, {
      content: thought,
      token: token
    }).then((response) => {
      // console.log(response)
      setThought("")
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleChange = (e: any) => {

    const inputText = e.target.value;
    const words = inputText.trim().split(/\s+/).filter(Boolean); // Split by spaces and filter out empty strings
    const wordLimit = 50;

    if (words.length <= wordLimit) {
      setThought(inputText);
      setWordCount(words.length);
    }
  }

  return (
    
      <div className="max-w-full p-4 bg-black">
        { load &&
        <div>

          <h1 className="text-3xl font-bold text-center text-gray-500 mb-6">ThoughtDrop</h1>

          {/* Thought Submission */}
          <form onSubmit={postThought} className="mb-6">
            <label className="block text-lg font-medium mb-2 text-white">Share your thought:</label>
            <textarea
              value={thought}
              onChange={ (e) => {
                handleChange(e)
              } }
              className="w-full p-3 border text-white border-gray-300 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Write your thought (max 50 words)"
            />
            <div className='text-white'>
              {`${wordCount}/50`}
            </div>
            <button
              type="submit"
              className="mt-4 w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Share Thought
            </button>
          </form>

          <div className="space-y-6">
            {thoughts.map((e) => (
              <div key={e.id} className="bg-gray-900 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-300">@{e.author.username}</span>
                  <span className="text-sm text-gray-200">{`${e.createdAt.split('T')[0]} ${e.createdAt.split('T')[1].split('Z')[0].split('.')[0]}`}</span>
                </div>
                <p className="text-gray-400">{e.content}</p>
              </div>
            ))}
          </div>
        </div>
        }
      </div>
  );
}

export default App;
