import {create} from 'zustand'

export const useProductStore = create((set)=> ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if (!newProduct.name?.trim() || !newProduct.price || !newProduct.image?.trim()) {
            return { success: false, message: "Please fill in all fields." };
        }
    
        try {
            const res = await fetch("https://special-robot-wj6vg6957wvhgx46-5000.app.github.dev/api/products", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify([newProduct]),
              });
              
              // Check full response
              const text = await res.text();
              console.log("Response status:", res.status);
              console.log("Response body:", text);
              
              if (!res.ok) {
                return { "success": false, "message": `Server error: ${res.status} - ${text}` };
              }
              
              const data = JSON.parse(text);
              return { "success": true, "message": "Product Created Successfully!", data };
              
        } catch (error) {
            console.error("Fetch Error:", error);
            return { "success": false, "message": "An error occurred. Please try again later." };
        }
    },
    fetchProducts: async () => {
      const res = await fetch("https://special-robot-wj6vg6957wvhgx46-5000.app.github.dev/api/products");
      const data = await res.json();
      set({ products: data.data });
    },
    deleteProduct: async (id)=>{
      const res = await fetch(`https://special-robot-wj6vg6957wvhgx46-5000.app.github.dev/api/products/${id}`,{
        method: "DELETE",

      })
      const data = await res.json()
      if(!data.success){
        return { "success": false, "message": data.message}
      }
      set(state => ({ products: state.products.filter(product => product.id !== id)}))
      return { "success": true, "message": data.message}

    }
    
}))