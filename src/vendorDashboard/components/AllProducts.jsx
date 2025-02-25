import { useEffect, useState } from "react";
import { API_Path } from "../helpers/ApiPath";

function AllProducts() {
  const [products, setProducts] = useState([]);
  console.log(products);
  

  const productHandler = async () => {
    const firmId = localStorage.getItem("firmId");
    try {
      const response = await fetch(`${API_Path}/product/${firmId}/products`);
      const newProductsData = await response.json();
      setProducts(newProductsData.products);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  const deleteProductById = async (productId) => {
    try {
      const response = await fetch(`${API_Path}/product/${productId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((item) => item._id !== productId));
        confirm("Are u sure, you want to delete this product?");
        alert("Product deleted successfully");
      }
    } catch (err) {
      console.log(err);
      alert("Failed to delete product");
    }
  }
    return (
      <div className="productSection" style={{ marginTop: "-550px" }}>
        {
          !products ? ( <h1>No product Found</h1> ) : ( 
            <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <>
                  
                  <tr key={item._id}>
                    <td>{item.productName}</td>
                    <td>₹{item.price}</td>
                    <td>
                      {item.image && (
                        <img
                          src={`${API_Path}/uploads/${item.image}`}
                          alt={item.productName}
                          style={{ width: "50px", height: "50px" }}
                        />
                      )}
                    </td>
                    <td>
                      <button
                        className="deleteBtn"
                        onClick={() => deleteProductById(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                 
                </>
              );
            })}
          </tbody>
        </table>  
          )
        }
      </div>
    );
  };


export default AllProducts;
