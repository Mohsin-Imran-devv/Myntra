import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";

const Home = () => {
  const items = useSelector((store) => store.items);
  
  // Get featured items (first 8 items)
  const featuredItems = items.slice(0, 8);

  // Category data with images
  const categories = [
    { 
      name: 'Men', 
      path: 'men',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop'
    },
    { 
      name: 'Women', 
      path: 'women',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop'
    },
    { 
      name: 'Kids', 
      path: 'kids',
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=300&fit=crop'
    },
    { 
      name: 'Home & Living', 
      path: 'home-living',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    },
    { 
      name: 'Beauty', 
      path: 'beauty',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop'
    }
  ];

  return (
    <main>
      {/* Home Page Banner with Overlay Text */}
      <div className="banner_container">
        <img 
          className="banner_image" 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop" 
          alt="Myntra Home Banner" 
        />
        {/* Banner Overlay Text */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h1 className="mainHeading" style={{
            fontSize: '3.5rem',
            marginBottom: '15px',
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
            fontWeight: '700',
            letterSpacing: '1px'
          }}>
            MYNTRA CLONE
          </h1>
          <p className="mainPara" style={{
            fontSize: '1.5rem',
            maxWidth: '800px',
            textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
            fontWeight: '300',
            lineHeight: '1.4',
            marginBottom: '20px'
          }}>
            Fashion for everyone. Shop the latest trends in clothing, accessories and more.
          </p>
          <button className="mainButton" style={{
            backgroundColor: '#ff3f6c',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '4px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '10px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(255, 63, 108, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e63562';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 63, 108, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ff3f6c';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 63, 108, 0.3)';
          }}
          onClick={() => window.scrollTo({ top: document.querySelector('.category-section').offsetTop, behavior: 'smooth' })}
          >
            SHOP NOW
          </button>
        </div>
      </div>
      
      <section className="category-section" style={{margin: "0 auto"}}>
        <h2 className="category_heading">SHOP BY CATEGORY</h2>
        <div className="category-items">
          {categories.map((cat) => (
            <Link to={`/${cat.path}`} key={cat.name}>
              <div className="category-card">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="category-image"
                />
                <h3>{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-products">
        <h2 className="category_heading" style={{textAlign:"center"}}>FEATURED PRODUCTS</h2>
        <div className="items-container">
          {featuredItems.length > 0 ? (
            featuredItems.map((item) => (
              item && item.id ? <HomeItem key={item.id} item={item} /> : null
            ))
          ) : (
            <p>Loading featured products...</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;