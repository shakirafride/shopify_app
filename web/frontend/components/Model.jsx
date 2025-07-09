import React, { useState, useCallback } from "react";
import {
  AppProvider,
  Page,
  Button,
  Modal,
  FormLayout,
  TextField
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";


export default function Model() {
  const [active, setActive] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    vendor: "",
    product_type: "",
    image: ""
  });

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleSubmit = async () => {
    try {
      const body = {
        title: product.title,
        vendor: product.vendor,
        product_type: product.product_type,
        image: product.image
      };

      const response = await fetch('/api/Product/Createproduct', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Fetch error:", error);
    }

    toggleActive();
  };

  return <>
    <AppProvider i18n={{}}>
      <Page title="Polaris Modal Example">
        <Button onClick={toggleActive} primary>
          Open Modal
        </Button>

        <Modal
          open={active}
          onClose={toggleActive}
          title="Fill in the details"
          primaryAction={{
            content: "Submit",
            onAction: handleSubmit,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: toggleActive,
            },
          ]}
        >
          <Modal.Section>
            <FormLayout>
              <TextField
                label="Title"
                value={product.title}
                onChange={(value) =>
                  setProduct((prev) => ({ ...prev, title: value }))
                }
                autoComplete="off"
              />
              <TextField
                label="Vendor"
                value={product.vendor}
                onChange={(value) =>
                  setProduct((prev) => ({ ...prev, vendor: value }))
                }
                autoComplete="off"
              />
              <TextField
                label="Product Type"
                value={product.product_type}
                onChange={(value) =>
                  setProduct((prev) => ({ ...prev, product_type: value }))
                }
                autoComplete="off"
              />
              <TextField
                label="Image URL"
                value={product.image}
                onChange={(value) =>
                  setProduct((prev) => ({ ...prev, image: value }))
                }
                autoComplete="off"
              />
            </FormLayout>
          </Modal.Section>
        </Modal>
      </Page>
    </AppProvider>
    
  </>
  
}
