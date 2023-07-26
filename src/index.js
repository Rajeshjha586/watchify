import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
// import StarRating from './components/StarRating';

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return <>
//   <StarRating color='blue' maxRating={10} onSetMovieRating={setMovieRating} />
//   <p>This movie was rated {movieRating} star</p>
//   </>
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <StarRating maxRating={5} message={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']} defaultRating={3} />
    <StarRating maxRating={10} color='red' size={24} />
    <Test /> */}
    <App />
  </React.StrictMode>
);
