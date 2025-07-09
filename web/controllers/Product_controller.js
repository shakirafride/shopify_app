import shopify from "../shopify.js";

const Createproduct = async (req, res) => {
  const { title, vendor, product_type } = req.body;

  try {
    const product = new shopify.api.rest.Product({
      session: res.locals.shopify.session,
    });

    product.title = title || "Test Product";
    product.vendor = vendor || "Burton";
    product.product_type = product_type || "Snowboard";

    product.images = [
      { src: "https://via.placeholder.com/400x400.png?text=Image+1" },
      { src: "https://via.placeholder.com/400x400.png?text=Image+2" },
      { src: "https://via.placeholder.com/400x400.png?text=Image+3" },
      { src: "https://via.placeholder.com/400x400.png?text=Image+4" },
      { src: "https://via.placeholder.com/400x400.png?text=Image+5" },
    ];

    await product.save({
      update: true,
    });

    res.status(200).json({
      message: "Product created successfully",
      success: true,
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const Getproduct = async (req, res) => {
  try {
       console.log("SESSION:", res.locals.shopify.session);
    const products = await shopify.api.rest.Product.all({
      session: res.locals.shopify.session,
       ids: "632910392,921728736", 
    });

    res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      products, // fixed this
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


export { Createproduct, Getproduct };
