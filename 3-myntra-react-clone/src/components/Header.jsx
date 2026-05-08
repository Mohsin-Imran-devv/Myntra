import { FaBagShopping } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { itemsActions } from "../store/itemsSlice";

const Header = () => {
  const bag = useSelector((store) => store.bag);
  const items = useSelector((store) => store.items);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();

  // Search functionality
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    // Search in all products
    const results = items.filter(item => 
      item.item_name.toLowerCase().includes(term.toLowerCase()) ||
      item.company.toLowerCase().includes(term.toLowerCase()) ||
      item.category.toLowerCase().includes(term.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    );
    
    setSearchResults(results.slice(0, 5)); // Show top 5 results
    setShowResults(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      alert("Please enter a search term");
      return;
    }
    
    const results = items.filter(item => 
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (results.length > 0) {
      alert(`Found ${results.length} product(s) matching "${searchTerm}"`);
      
      // Optionally: Navigate to search results page or filter items
      dispatch(itemsActions.addInitialItems(results));
    } else {
      alert(`No products found matching "${searchTerm}"`);
    }
    
    setShowResults(false);
    setSearchTerm("");
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header>
      <div className="logo_container">
        <Link to="/">
          <img
            className="myntra_home"
            src="images/myntra_logo.webp"
            alt="Myntra Home"
          />
        </Link>
      </div>
      <nav className="nav_bar">
        <NavLink to="/men" className={({isActive}) => isActive ? "active-nav-link" : ""}>Men</NavLink>
        <NavLink to="/women" className={({isActive}) => isActive ? "active-nav-link" : ""}>Women</NavLink>
        <NavLink to="/kids" className={({isActive}) => isActive ? "active-nav-link" : ""}>Kids</NavLink>
        <NavLink to="/home-living" className={({isActive}) => isActive ? "active-nav-link" : ""}>Home & Living</NavLink>
        <NavLink to="/beauty" className={({isActive}) => isActive ? "active-nav-link" : ""}>Beauty</NavLink>
        <NavLink to="/studio" className={({isActive}) => isActive ? "active-nav-link" : ""}>Studio <sup>New</sup></NavLink>
      </nav>
      
      <div className="search-container">
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: '#f5f5f6',
            borderRadius: '4px 0 0 4px',
            padding: '0 10px',
            height: '40px'
          }}>
            <FaSearch style={{ fontSize: '16px', color: '#696e79' }} />
          </div>
          <input
            className="search_input"
            placeholder="Search for products, brands and more"
            value={searchTerm}
            onChange={handleSearch}
            type="text"
            style={{
              flexGrow: 1,
              height: '40px',
              border: 'none',
              padding: '0 15px',
              outline: 'none',
              backgroundColor: '#f5f5f6',
              borderRadius: '0 4px 4px 0',
              fontSize: '14px',
              color: '#696e79',
              width: '100%'
            }}
          />
        </form>
        
        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="search-results-dropdown" style={{ width: '100%', left: '0' }}>
            <div className="search-results-header">
              <small>Search Results ({searchResults.length})</small>
            </div>
            {searchResults.map((product) => (
              <Link 
                to={`/${product.category}`} 
                key={product.id}
                onClick={() => setShowResults(false)}
                className="search-result-item"
              >
                <img src={product.image} alt={product.item_name} />
                <div className="search-result-info">
                  <div className="search-result-name">{product.item_name}</div>
                  <div className="search-result-company">{product.company}</div>
                  <div className="search-result-price">
                    ₹{product.current_price} <span className="original-price">₹{product.original_price}</span>
                  </div>
                </div>
              </Link>
            ))}
            <div className="search-results-footer">
              <button 
                className="view-all-results"
                onClick={handleSearchSubmit}
              >
                View all results for "{searchTerm}"
              </button>
            </div>
          </div>
        )}
        
        {/* No Results Message */}
        {showResults && searchResults.length === 0 && searchTerm.trim() !== "" && (
          <div className="search-results-dropdown" style={{ width: '100%', left: '0' }}>
            <div className="no-results">
              No products found for "{searchTerm}"
            </div>
          </div>
        )}
      </div>
      
      <div className="action_bar" style={{ marginTop: "0" }}>
        <Link className="action_container" to="/bag">
          <FaBagShopping style={{ fontSize: '20px', marginTop:"1.4rem" }} />
          <span className="action_name">Bag</span>
          <span className="bag-item-count">{bag.length}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;