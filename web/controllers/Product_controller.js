import shopify from "../shopify.js";


const Createproduct = async (req, res) => {
   const { title, vendor, product_type } = req.body;

    try {
        const product = new shopify.rest.Product({ session: session });
        product.title = title ||"Test Product";
        product.vendor = vendor ||"Burton";
        product.product_type = product_type || "Snowboard";
        product.images = [{ "attachment": "R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==\n" }]
        await product.save({
            update: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messge: 'interver errer',
            success: false
        })
    }
};


const Getproduct = async (req, res) => {
    try {
        await shopify.rest.Collect.all({
            session: session,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messge: 'interver errer',
            success: false
        })
    }
}


export { Createproduct, Getproduct }