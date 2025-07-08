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

export default function Table() {
  // Modal open/close state
  const [active, setActive] = useState(false);

  // Form state
  const [product, setProduct] = useState({
    title: "",
    vendor: "",
    product_type: ""
  });

  // Toggle modal
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  // Handle form submit
  const handleSubmit = () => {
    console.log("Form data:", product);
    toggleActive(); // Close modal after submit
  };

  return (
    <AppProvider i18n={{}}>
      <Page title="Polaris Modal Example">
        {/* Button to open modal */}
        <Button onClick={toggleActive} primary>
          Open Modal
        </Button>

        {/* Modal */}
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
            </FormLayout>
          </Modal.Section>
        </Modal>
      </Page>
    </AppProvider>
  );
}
