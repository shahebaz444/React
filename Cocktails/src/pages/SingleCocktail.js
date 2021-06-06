import React,{useState, useEffect} from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getCocktail(){
      try {
        const response = await fetch(`${url}${id}`).then((data)=>data.json());
        if(response.drinks){
          const { strDrink:name, strDrinkThumb:image, strAlcoholic:info, strGlass:glass,
                  strCategory:category, strInstructions: instructions,strIngredient1,strIngredient2,
                   strIngredient3,strIngredient4,strIngredient5} = response.drinks[0];
          const ingredients = [strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5];

          const newCocktail = {name, image,info, glass, category, instructions, ingredients};
          setCocktail(newCocktail);
        }
        else{
          setCocktail(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
          setLoading(false);
      }
    }
    getCocktail();
    return () => {
      
    }
  }, [id])
  
  if(loading){
    return <Loading />
  }
  else if(!cocktail){
    return <h2 className="section-title">no cocktail to display</h2>
  }

  const {name, image,info, glass, category, instructions, ingredients} = cocktail;
  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>back home</Link>
      <h2 className='section-title'>{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p><span className='drink-data'>Name:</span>{name}</p>
          <p><span className='drink-data'>category:</span>{category}</p>
          <p><span className='drink-data'>info:</span>{info}</p>
          <p><span className='drink-data'>glass:</span>{glass}</p>
          <p><span className='drink-data'>instructions:</span>{instructions}</p>
          <p><span className='drink-data'>ingredients:</span>
          {ingredients.map((ingredient, index)=>{
              return ingredient? <span key={index}>{ingredient}</span>:null
          })}</p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
