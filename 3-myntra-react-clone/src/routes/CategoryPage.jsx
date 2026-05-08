import HomeItem from "../components/HomeItem";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const { category } = useParams();
  const items = useSelector((store) => store.items);
  const [categoryData, setCategoryData] = useState({
    name: "",
    banner: "",
    description: "",
  });

  // Category-wise data
  const categoryDetails = {
    men: {
      name: "Men's Fashion",
      
      description: "Latest trends in men's clothing, footwear and accessories",
    },
    women: {
      name: "Women's Fashion",
      
      description: "Stylish women's wear, ethnic dresses and modern outfits",
    },
    kids: {
      name: "Kids Collection",
      
      description: "Cute and comfortable clothes for kids of all ages",
    },
    "home-living": {
      name: "Home & Living",
      
      description: "Home decor, bedding, furniture and living essentials",
    },
    beauty: {
      name: "Beauty Products",
      
      description: "Makeup, skincare, haircare and grooming products",
    },
    studio: {
      name: "Studio Collection",
      
      description: "Exclusive designer collections and premium products",
    },
  };

  useEffect(() => {
    if (category && categoryDetails[category]) {
      setCategoryData(categoryDetails[category]);
    } else {
      setCategoryData({
        name: category ? category.toUpperCase() : "All Products",
        description: "Explore our wide range of products",
      });
    }
  }, [category]);

  return (
    <main>
      {/* Products Section */}
      <section
        style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <h2
          className="category_heading"
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#3e4152",
          }}
        >
          {categoryData.name.toUpperCase()} COLLECTION
        </h2>

        <div className="items-container">
          {items.length > 0 ? (
            items.map((item) => <HomeItem key={item.id} item={item} />)
          ) : (
            <div
              style={{ textAlign: "center", width: "100%", padding: "50px" }}
            >
              <p style={{ fontSize: "18px", color: "#666" }}>
                Loading products for {categoryData.name}...
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;
