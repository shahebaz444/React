import React,{useRef, useEffect} from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setSearchterm } = useGlobalContext();

  useEffect(() => {
    searchValue.current.focus()
    return () => {
    }
  }, []);

  const searchValue  = useRef('');

  const searchCockTail = () =>{
    setSearchterm(searchValue.current.value);
  }

  const handleSubmit =(e) =>{
    e.prevenDefault();
  }

  return (
    <section className="section-search">
      <div className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search you favourite cocktail</label>
          <input type="text" id='name' ref={searchValue} onChange={searchCockTail}/>
        </div>
      </div>
    </section>
  )
}

export default SearchForm
