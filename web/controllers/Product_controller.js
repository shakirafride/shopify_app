import shopify from "../shopify.js";


const Createproduct = async (req, res) => {
    try {
        const collect = new shopify.rest.Collect({ session: session });
        collect.product_id = 921728736;
        collect.collection_id = 841564295;
        await collect.save({
            update: true,
        });
        res.status(200).json({
            messge:"Collect created",
            success:true
        })
    } catch (error) {
  console.log(error);
  res.status(500).json({
   messge:'interver errer',
   success:false
  })
    }
};



export { Createproduct }