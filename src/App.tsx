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

  useEffect(() => {
    ( async () => {
      const response = await axios.get(`http://localhost:3000/getallposts`)
      console.log(response.data.posts)
      setThoughts(response.data.posts)
    })()
  },[]);


  const postThought = () => {
    
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
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">ThoughtDrop</h1>

      {/* Thought Submission */}
      <form onSubmit={postThought} className="mb-6">
        <label className="block text-lg font-medium mb-2">Share your thought:</label>
        <textarea
          value={thought}
          onChange={ (e) => {
            handleChange(e)
          } }
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Write your thought (max 50 words)"
        />
        <div>
          {`${wordCount}/50`}
        </div>
        <button
          type="submit"
          className="mt-4 w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          Share Thought
        </button>
      </form>

          {/* <div>
            {
              thoughts.map((e) => {
                return <div key={e.id} className='flex flex-col border-y border-black py-2'>
                  <div className='font-bold text-lg'>
                    {`@${e.author.username}`}
                  </div>
                  <div className='ml-5'>
                    {e.content}
                  </div>
                  <div className='self-end mr-5 mt-2'>
                    {`${e.createdAt.split('T')[0]} ${e.createdAt.split('T')[1].split('Z')[0].split('.')[0]}`}
                  </div>
                </div>
              })
            }
          </div> */}

      <div className="space-y-6">
        {thoughts.map((e) => (
          <div key={e.id} className="bg-white p-6 rounded-lg shadow-md">
            {/* Username and Date/Time */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-800">{e.author.username}</span>
              <span className="text-sm text-gray-500">{`${e.createdAt.split('T')[0]} ${e.createdAt.split('T')[1].split('Z')[0].split('.')[0]}`}</span>
            </div>
            
            {/* Content */}
            <p className="text-gray-700">{e.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
